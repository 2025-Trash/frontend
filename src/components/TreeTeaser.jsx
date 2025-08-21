import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./TreeTeaser.css";

// 단계 이미지
import stage1 from "../assets/trees/tree-1.png"; // 새싹
import stage2 from "../assets/trees/tree-2.png"; // 중간
import stage3 from "../assets/trees/tree-3.png"; // 완성

/* -------- storage helpers -------- */
function safeParse(json, fallback) {
  try { return JSON.parse(json); } catch { return fallback; }
}
function readGlobal() {
  const raw = localStorage.getItem("global_stats");
  const obj = safeParse(raw, { totalUses: 0, totalPoints: 0 });
  return {
    totalUses: Number(obj.totalUses || 0),
    totalPoints: Number(obj.totalPoints || 0),
  };
}

/**
 * TreeTeaser
 * - 커뮤니티 기준: perTree=30회 => 1그루
 * - maxTiles: 썸네일 격자에 보여줄 최대 그루 수 (나머지는 +N으로 요약)
 */
export default function TreeTeaser({ perTree = 30, maxTiles = 12 }) {
  const [stats, setStats] = useState(() => readGlobal());

  // 실시간 동기화: storage(다른 탭), 폴링(같은 탭), visibilitychange
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "global_stats") setStats(readGlobal());
    };
    const onVisibility = () => {
      if (!document.hidden) setStats(readGlobal());
    };
    const poll = setInterval(() => setStats(readGlobal()), 1500);

    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(poll);
    };
  }, []);

  const totalUses = stats.totalUses;

  // 그루/진행도 계산
  const trees = Math.floor(totalUses / perTree);
  const progress = totalUses % perTree;               // 다음 그루까지 남은 회수 계산의 기준
  const leftToNext = progress === 0 ? 0 : perTree - progress;
  const pct = Math.round((progress / perTree) * 100);

  // 격자에 표시할 타일: 완성 그루 + 성장중 1개
  const { tiles, overflowCount } = useMemo(() => {
    const fullCount = Math.min(trees, Math.max(0, maxTiles)); // 완성 그루 타일
    const remainTiles = Math.max(0, maxTiles - fullCount);

    // 성장중 타일을 표시할지 결정: progress > 0 이고, 보여줄 칸이 남았을 때
    const showGrowing = progress > 0 && remainTiles > 0;

    // 완성 타일들
    const arr = Array(fullCount).fill(stage3);

    if (showGrowing) {
      const stage =
        progress >= perTree * 0.67 ? stage3 :
        progress >= perTree * 0.34 ? stage2 : stage1;
      arr.push(stage);
    }

    const totalShown = arr.length;
    const totalTreesToRepresent = trees + (progress > 0 ? 1 : 0);
    const overflow = Math.max(0, totalTreesToRepresent - totalShown);

    return { tiles: arr, overflowCount: overflow };
  }, [trees, progress, perTree, maxTiles]);

  return (
    <section className="forest-teaser" aria-labelledby="forest-teaser-title">
      <div className="forest-head">
        <div className="forest-eyebrow">우리 모두의 숲</div>
        <h3 id="forest-teaser-title" className="forest-title">
          함께 키운 나무{" "}
          <b className="forest-strong" aria-live="polite" aria-atomic="true">
            {trees.toLocaleString()}
          </b>
          그루
        </h3>
        <p className="forest-sub">
          다음 나무까지 <b className="forest-strong">{leftToNext}</b>회
        </p>
      </div>

      <div className="forest-grid">
        {tiles.map((src, i) => (
          <div key={i} className="forest-cell" aria-hidden="true">
            <img src={src} alt="" />
          </div>
        ))}
        {overflowCount > 0 && (
          <div className="forest-cell more" aria-label={`추가 나무 ${overflowCount}그루`}>
            +{overflowCount.toLocaleString()}
          </div>
        )}
      </div>

      <div
        className="forest-progress"
        role="progressbar"
        aria-label="다음 나무까지 진행률"
        aria-valuemin={0}
        aria-valuemax={perTree}
        aria-valuenow={progress}
      >
        <div className="forest-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="forest-cta">
        <Link to="/dashboard" className="forest-link">숲 보러가기</Link>
      </div>
    </section>
  );
}
