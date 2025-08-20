// src/components/TreeTeaser.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "./TreeTeaser.css";

// 단계 이미지 (src/assets/trees/ 에 저장)
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
  const global = getGlobal();
  const totalUses = Number(global.totalUses || 0);

  const trees = Math.floor(totalUses / perTree);
  const progress = totalUses % perTree;
  const pct = Math.min(100, Math.round((progress / perTree) * 100));
  const leftToNext = perTree - progress === perTree ? 0 : perTree - progress;

  const tiles = useMemo(() => {
    const count = Math.min(maxTiles, Math.max(1, trees || 1));
    const arr = Array.from({ length: count }, () => stage3);
    const stage = pct >= 67 ? stage3 : pct >= 34 ? stage2 : stage1;

    if (trees === 0) {
      arr[0] = stage; // 첫 그루 전이면 성장중만 1칸
      return arr;
    }
    // 다음 그루가 진행 중이면 마지막 칸에 성장 단계로 표시
    if (progress > 0) {
      arr[arr.length - 1] = stage;
    }
    return arr;
  }, [trees, progress, pct, maxTiles]);

  return (
    <section className="forest-teaser" aria-labelledby="forest-teaser-title">
      <div className="forest-head">
        <div className="forest-eyebrow">우리 모두의 숲</div>
        <h3 id="forest-teaser-title" className="forest-title" aria-live="polite">
          함께 키운 나무 <b className="forest-strong">{trees.toLocaleString()}</b>그루
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
