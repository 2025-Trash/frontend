import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./TreeTeaser.css";

// 단계 이미지
import stage1 from "../assets/trees/tree-1.png"; // 새싹
import stage2 from "../assets/trees/tree-2.png"; // 중간
import stage3 from "../assets/trees/tree-3.png"; // 완성

function getGlobal() {
  try {
    const raw = localStorage.getItem("global_stats");
    return raw ? JSON.parse(raw) : { totalUses: 0, totalPoints: 0 };
  } catch {
    return { totalUses: 0, totalPoints: 0 };
  }
}

export default function TreeTeaser({ perTree = 100, maxTiles = 6 }) {
  const [globalStats, setGlobalStats] = useState({ totalUses: 0, totalPoints: 0 });

  useEffect(() => {
    setGlobalStats(getGlobal());

    const handleStorageChange = () => {
      setGlobalStats(getGlobal());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const totalUses = Number(globalStats.totalUses || 0);

  const trees = Math.floor(totalUses / perTree);
  const progress = totalUses % perTree;
  const pct = Math.min(100, Math.round((progress / perTree) * 100));
  const leftToNext = perTree - progress === perTree ? 0 : perTree - progress;

  const tiles = useMemo(() => {
    const numTrees = Math.floor(totalUses / perTree);
    const progress = totalUses % perTree;
    
    const completedTrees = Math.min(maxTiles - 1, numTrees);
    const showGrowingTree = numTrees < maxTiles || progress > 0;
    
    const tileArray = Array(completedTrees).fill(stage3);
    
    if (showGrowingTree) {
        const stage = progress >= perTree * 0.67 ? stage3 : progress >= perTree * 0.34 ? stage2 : stage1;
        tileArray.push(stage);
    }

    return tileArray;
  }, [totalUses, perTree, maxTiles]);

  return (
    <section className="forest-teaser" aria-labelledby="forest-teaser-title">
      <div className="forest-head">
        <div className="forest-eyebrow">우리 모두의 숲</div>
        <h3 id="forest-teaser-title">
          함께 키운 나무{" "}
          <b className="forest-strong" aria-live="polite" aria-atomic="true">
            {trees.toLocaleString()}
          </b>그루
        </h3>
        <p className="forest-sub">
          다음 나무까지 <b className="forest-strong">{leftToNext}</b>회
        </p>
      </div>

      <div className="forest-grid" aria-hidden="true">
        {tiles.map((src, i) => (
          <div key={i} className="forest-cell">
            <img src={src} alt="" />
          </div>
        ))}
      </div>

      <div
        className="forest-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="다음 나무까지 진행률"
      >
        <div className="forest-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="forest-cta">
        <Link to="/dashboard" className="forest-link">숲 보러가기</Link>
      </div>
    </section>
  );
}