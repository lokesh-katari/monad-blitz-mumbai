"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PixelCanvas from "~~/components/PixelCanvas";
import EngineDashboard from "~~/components/EngineDashboard";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [collisionPixels, setCollisionPixels] = useState<Set<number>>(new Set());
  const [cleanCount, setCleanCount] = useState(0);
  const [collisionCount, setCollisionCount] = useState(0);
  const collisionTimers = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const handleCollision = useCallback((pixelId: number) => {
    setCollisionCount(prev => prev + 1);

    // Flash the pixel for 1 second
    setCollisionPixels(prev => {
      const next = new Set(prev);
      next.add(pixelId);
      return next;
    });

    const existing = collisionTimers.current.get(pixelId);
    if (existing) clearTimeout(existing);

    const timer = setTimeout(() => {
      setCollisionPixels(prev => {
        const next = new Set(prev);
        next.delete(pixelId);
        return next;
      });
      collisionTimers.current.delete(pixelId);
    }, 1000);

    collisionTimers.current.set(pixelId, timer);
  }, []);

  const handlePixelUpdate = useCallback((_pixelId: number, _color: string) => {
    setCleanCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    return () => {
      collisionTimers.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="state-clash-container">
      {/* Hero */}
      <div className="hero-section">
        <div className="hero-badge">MONAD TESTNET</div>
        <h1 className="hero-title">
          State<span className="hero-title-accent">Clash</span>
        </h1>
        <p className="hero-subtitle">
          A collaborative 100×100 pixel canvas visualizing Monad&apos;s Optimistic Parallel EVM in real-time.
          <br />
          <span className="hero-hint">Click any pixel to paint — watch the engine dashboard react live.</span>
        </p>
      </div>

      {/* Canvas */}
      <PixelCanvas
        onPixelUpdate={handlePixelUpdate}
        collisionPixels={collisionPixels}
        onCollision={handleCollision}
      />

      {/* Engine Dashboard — purely prop-driven, no event watchers */}
      <EngineDashboard cleanCount={cleanCount} collisionCount={collisionCount} />
    </div>
  );
};

export default Home;
