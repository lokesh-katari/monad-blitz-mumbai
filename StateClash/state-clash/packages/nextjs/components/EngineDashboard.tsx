"use client";

import { useEffect, useRef, useState } from "react";

type LogEntry = {
    id: number;
    type: "parallel" | "collision";
    pixelId: number;
    timestamp: number;
};

type EngineDashboardProps = {
    cleanCount: number;
    collisionCount: number;
};

export default function EngineDashboard({ cleanCount, collisionCount }: EngineDashboardProps) {
    const [fastLanePulse, setFastLanePulse] = useState(false);
    const [bottleneckPulse, setBottleneckPulse] = useState(false);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const logIdRef = useRef(0);
    const prevClean = useRef(0);
    const prevCollision = useRef(0);

    // Detect new events and trigger pulse + log
    useEffect(() => {
        if (cleanCount > prevClean.current) {
            const diff = cleanCount - prevClean.current;
            setFastLanePulse(true);
            for (let i = 0; i < diff; i++) {
                const entry: LogEntry = {
                    id: logIdRef.current++,
                    type: "parallel",
                    pixelId: 0,
                    timestamp: Date.now(),
                };
                setLogs(prev => [entry, ...prev].slice(0, 50));
            }
        }
        prevClean.current = cleanCount;
    }, [cleanCount]);

    useEffect(() => {
        if (collisionCount > prevCollision.current) {
            const diff = collisionCount - prevCollision.current;
            setBottleneckPulse(true);
            for (let i = 0; i < diff; i++) {
                const entry: LogEntry = {
                    id: logIdRef.current++,
                    type: "collision",
                    pixelId: 0,
                    timestamp: Date.now(),
                };
                setLogs(prev => [entry, ...prev].slice(0, 50));
            }
        }
        prevCollision.current = collisionCount;
    }, [collisionCount]);

    // Reset pulses
    useEffect(() => {
        if (fastLanePulse) {
            const t = setTimeout(() => setFastLanePulse(false), 600);
            return () => clearTimeout(t);
        }
    }, [fastLanePulse]);

    useEffect(() => {
        if (bottleneckPulse) {
            const t = setTimeout(() => setBottleneckPulse(false), 600);
            return () => clearTimeout(t);
        }
    }, [bottleneckPulse]);

    const totalTx = cleanCount + collisionCount;
    const parallelRate = totalTx > 0 ? ((cleanCount / totalTx) * 100).toFixed(1) : "0.0";

    return (
        <div className="engine-dashboard">
            <h2 className="dashboard-title">
                <span className="title-icon">⚡</span>
                Monad Execution Engine
            </h2>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <span className="stat-value">{totalTx}</span>
                    <span className="stat-label">Total Txns</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{parallelRate}%</span>
                    <span className="stat-label">Parallel Rate</span>
                </div>
            </div>

            <div className="dashboard-lanes">
                {/* Fast Lane */}
                <div className={`lane lane-fast ${fastLanePulse ? "lane-pulse-fast" : ""}`}>
                    <div className="lane-header">
                        <div className="lane-indicator lane-indicator-fast" />
                        <h3 className="lane-title">Parallel Execution (Fast Lane)</h3>
                    </div>
                    <p className="lane-description">Independent state access — executed in parallel</p>
                    <div className="lane-counter">
                        <span className="counter-value counter-fast">{cleanCount}</span>
                        <span className="counter-label">Clean Transactions</span>
                    </div>
                    <div className="lane-bar">
                        <div
                            className="lane-bar-fill lane-bar-fast"
                            style={{ width: totalTx > 0 ? `${(cleanCount / totalTx) * 100}%` : "0%" }}
                        />
                    </div>
                </div>

                {/* Bottleneck Lane */}
                <div className={`lane lane-bottleneck ${bottleneckPulse ? "lane-pulse-bottleneck" : ""}`}>
                    <div className="lane-header">
                        <div className="lane-indicator lane-indicator-bottleneck" />
                        <h3 className="lane-title">State Contention (Sequential Bottleneck)</h3>
                    </div>
                    <p className="lane-description">Same-block state collision — forced sequential re-execution</p>
                    <div className="lane-counter">
                        <span className="counter-value counter-bottleneck">{collisionCount}</span>
                        <span className="counter-label">Collisions Detected</span>
                    </div>
                    <div className="lane-bar">
                        <div
                            className="lane-bar-fill lane-bar-bottleneck"
                            style={{ width: totalTx > 0 ? `${(collisionCount / totalTx) * 100}%` : "0%" }}
                        />
                    </div>
                </div>
            </div>

            {/* Live event log */}
            <div className="event-log">
                <h3 className="log-title">Live Event Feed</h3>
                <div className="log-entries">
                    {logs.length === 0 && (
                        <div className="log-empty">Click pixels to see events here...</div>
                    )}
                    {logs.map(entry => (
                        <div
                            key={entry.id}
                            className={`log-entry ${entry.type === "collision" ? "log-entry-collision" : "log-entry-parallel"}`}
                        >
                            <span className="log-dot" />
                            <span className="log-text">
                                {entry.type === "parallel"
                                    ? `✅ Parallel execution confirmed`
                                    : `🔴 STATE COLLISION detected`}
                            </span>
                            <span className="log-time">
                                {new Date(entry.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
