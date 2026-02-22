"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import targetImage from "~~/utils/targetImage.json";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useWriteContract, useAccount, usePublicClient, useWatchContractEvent } from "wagmi";

const GRID_SIZE = 100;
const CLICK_COOLDOWN_MS = 500;

// Color index → hex
const INDEX_TO_COLOR: Record<number, string> = {
    0: "#3a332c",
    1: "#b0814f",
    2: "#b0594f",
    3: "#618c9e",
    4: "#4e707e",
    5: "#c09a72",
    6: "#8d473f",
    7: "#998066",
    8: "#81a3b1",
    9: "#90806f",
};

// Hex → color index for writing
const HEX_TO_INDEX: Record<string, number> = {
    "#b0814f": 1,
    "#b0594f": 2,
    "#618c9e": 3,
    "#4e707e": 4,
    "#c09a72": 5,
    "#8d473f": 6,
    "#998066": 7,
    "#81a3b1": 8,
    "#90806f": 9,
};

type PixelCanvasProps = {
    onPixelUpdate: (pixelId: number, color: string) => void;
    collisionPixels: Set<number>;
    onCollision: (pixelId: number) => void;
};

export default function PixelCanvas({ onPixelUpdate, collisionPixels, onCollision }: PixelCanvasProps) {
    const [pixelColors, setPixelColors] = useState<Record<number, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [loadedCount, setLoadedCount] = useState(0);
    const { data: contractInfo } = useDeployedContractInfo("Canvas");
    const { writeContractAsync } = useWriteContract();
    const { address } = useAccount();
    const publicClient = usePublicClient();
    const canvasRef = useRef<HTMLDivElement>(null);
    const lastClickTime = useRef<number>(0);
    const pendingTx = useRef<boolean>(false);

    // ─── Load existing canvas state from chain on mount ───
    useEffect(() => {
        if (!contractInfo?.address || !publicClient) return;

        const loadCanvasState = async () => {
            try {
                setIsLoading(true);
                const currentBlock = await publicClient.getBlockNumber();

                // Monad RPC limits eth_getLogs to 100 blocks per request
                // Fetch recent events (last 100 blocks) for current canvas state
                const fromBlock = currentBlock > 100n ? currentBlock - 100n : 0n;

                const logs = await publicClient.getLogs({
                    address: contractInfo.address,
                    event: {
                        type: "event",
                        name: "PixelUpdated",
                        inputs: [
                            { type: "uint256", name: "pixelId", indexed: true },
                            { type: "uint8", name: "color", indexed: false },
                        ],
                    },
                    fromBlock,
                    toBlock: currentBlock,
                });

                const colors: Record<number, string> = {};
                for (const log of logs) {
                    const pixelId = Number(log.args.pixelId);
                    const colorIdx = Number(log.args.color);
                    colors[pixelId] = INDEX_TO_COLOR[colorIdx] || "#3a332c";
                }

                setPixelColors(colors);
                setLoadedCount(Object.keys(colors).length);
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to load canvas state:", err);
                setIsLoading(false);
            }
        };

        loadCanvasState();
    }, [contractInfo?.address, publicClient]);

    // ─── Listen for new PixelUpdated events via WebSocket (eth_subscribe) ───
    useWatchContractEvent({
        address: contractInfo?.address,
        abi: contractInfo?.abi,
        eventName: "PixelUpdated",
        onLogs: (logs) => {
            logs.forEach((log: any) => {
                const pixelId = Number(log.args?.pixelId ?? 0);
                const colorIdx = Number(log.args?.color ?? 0);
                const color = INDEX_TO_COLOR[colorIdx] || "#3a332c";
                setPixelColors(prev => ({ ...prev, [pixelId]: color }));
                onPixelUpdate(pixelId, color);
            });
        },
        enabled: !!contractInfo?.address && !isLoading,
    });

    // ─── Listen for StateCollision events via WebSocket (eth_subscribe) ───
    useWatchContractEvent({
        address: contractInfo?.address,
        abi: contractInfo?.abi,
        eventName: "StateCollision",
        onLogs: (logs) => {
            logs.forEach((log: any) => {
                const pixelId = Number(log.args?.pixelId ?? 0);
                onCollision(pixelId);
            });
        },
        enabled: !!contractInfo?.address && !isLoading,
    });

    // ─── Click handler with throttle ───
    const handlePixelClick = useCallback(
        async (x: number, y: number) => {
            if (!contractInfo?.address || !address) return;

            const now = Date.now();
            if (now - lastClickTime.current < CLICK_COOLDOWN_MS) return;
            if (pendingTx.current) return;
            lastClickTime.current = now;

            const pixelId = x * 100 + y;
            const key = `${x}${y}`;
            const targetColor = (targetImage as Record<string, string>)[key] || "#b0814f";
            const colorIndex = HEX_TO_INDEX[targetColor] || 1;

            // Optimistic update
            setPixelColors(prev => ({ ...prev, [pixelId]: targetColor }));
            onPixelUpdate(pixelId, targetColor);

            pendingTx.current = true;
            try {
                await writeContractAsync({
                    address: contractInfo.address,
                    abi: contractInfo.abi,
                    functionName: "drawPixel",
                    args: [BigInt(x), BigInt(y), colorIndex],
                });
            } catch (err) {
                console.error("drawPixel tx failed:", err);
                setPixelColors(prev => {
                    const copy = { ...prev };
                    delete copy[pixelId];
                    return copy;
                });
            } finally {
                pendingTx.current = false;
            }
        },
        [contractInfo, writeContractAsync, address, onPixelUpdate],
    );

    // Pixel color resolver
    const getPixelColor = (pixelId: number): string => {
        if (collisionPixels.has(pixelId)) return "#b0594f";
        return pixelColors[pixelId] || "#27383f";
    };

    return (
        <div className="canvas-wrapper">
            {isLoading && (
                <div className="canvas-loading">
                    Loading canvas state from chain... ({loadedCount} pixels found)
                </div>
            )}
            <div ref={canvasRef} className="pixel-grid" role="grid" aria-label="100x100 pixel canvas">
                {Array.from({ length: GRID_SIZE }, (_, x) =>
                    Array.from({ length: GRID_SIZE }, (_, y) => {
                        const pixelId = x * 100 + y;
                        const color = getPixelColor(pixelId);
                        const isTarget = `${x}${y}` in (targetImage as Record<string, string>);
                        return (
                            <div
                                key={pixelId}
                                className={`pixel ${isTarget ? "pixel-target" : ""}`}
                                style={{ backgroundColor: color }}
                                onClick={() => handlePixelClick(x, y)}
                                role="gridcell"
                                aria-label={`Pixel ${x},${y}`}
                            />
                        );
                    }),
                )}
            </div>
        </div>
    );
}
