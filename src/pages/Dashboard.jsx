import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import TreeGarden from "../components/TreeGarden";
import BadgeStrip from "../components/BadgeStrip";

// ---------------- helpers ----------------
function getUser() {
  const raw = localStorage.getItem("demo_user");
  return raw ? JSON.parse(raw) : null;
}
function setUser(u) { localStorage.setItem("demo_user", JSON.stringify(u)); }

function getGlobal() {
  const raw = localStorage.getItem("global_stats");
  return raw ? JSON.parse(raw) : { totalUses: 0, totalPoints: 0 };
}
function setGlobal(g) { localStorage.setItem("global_stats", JSON.stringify(g)); }

function nowStr() {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2,"0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
const todayKey = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2,"0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
};
const dailyKeyFor = (user) => `uses_by_date_${user?.name || "guest"}`;

// ---------------- component ----------------
export default function Dashboard({ bin }) {
  const [user, setUserState] = useState(getUser());
  const [global, setGlobalState] = useState(getGlobal());

  // 일일 사용 기록
  const [todayUses, setTodayUses] = useState(0);

  // 초기 일일 카운트 로드
  useEffect(() => {
    if (!user) return;
    const mapRaw = localStorage.getItem(dailyKeyFor(user));
    const map = mapRaw ? JSON.parse(mapRaw) : {};
    setTodayUses(map[todayKey()] || 0);
  }, [user]);

  useEffect(() => {
    if (!user) {
      // 비로그인 상태라면 웰컴(또는 로그인 페이지)로 유도 가능
    }
  }, [user]);

  const perTree = 100;
  const treesCommunity = useMemo(() => Math.floor(global.totalUses / perTree), [global.totalUses]);
  const treesPersonal  = useMemo(() => Math.floor((user?.uses || 0) / perTree), [user]);

  // 다음 나무까지 개인 진행률
  const personalProgress = (user?.uses || 0) % perTree;
  const personalPct = Math.min(100, Math.round((personalProgress / perTree) * 100));

  const useOnce = () => {
    if (!user) { window.location.href = "/signup"; return; }

    const newUser = { ...user, uses: user.uses + 1, points: user.points + 4 };
    const newGlobal = {
      totalUses: global.totalUses + 1,
      totalPoints: global.totalPoints + 4,
    };

    // 저장
    setUser(newUser); setUserState(newUser);
    setGlobal(newGlobal); setGlobalState(newGlobal);

    // 오늘 사용 로그 업데이트
    const k = dailyKeyFor(newUser);
    const raw = localStorage.getItem(k);
    const map = raw ? JSON.parse(raw) : {};
    const tk = todayKey();
    map[tk] = (map[tk] || 0) + 1;
    localStorage.setItem(k, JSON.stringify(map));
    setTodayUses(map[tk]);

    // 최근 트랜잭션
    const txn = {
      time: nowStr(),
      bin: bin || "BIN-001",
      pointsGained: 4,
      userName: newUser.name,
    };
    sessionStorage.setItem("last_txn", JSON.stringify(txn));

    // 유효성 페이지로 이동
    window.location.href = "/validating";
  };

  const resetDemo = () => {
    if (window.confirm("데모 데이터를 초기화할까요?")) {
      localStorage.removeItem("demo_user");
      localStorage.removeItem("global_stats");
      sessionStorage.removeItem("last_txn");
      if (user) localStorage.removeItem(dailyKeyFor(user));
      setUserState(null);
      setGlobalState({ totalUses: 0, totalPoints: 0 });
      setTodayUses(0);
    }
  };

  return (
    <div>
      <Header title="대시보드" />
      <main style={{ maxWidth: 768, padding: 16, margin: "0 auto 64px" }}>
        <section style={{
          background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
        }}>
          <div style={{ fontSize: 18, fontWeight: 900 }}>
            {user ? `${user.name}님 반가워요!` : "로그인이 필요합니다"}
          </div>
          <p style={{ color: "var(--sub)", marginTop: 8 }}>
            {user
              ? <>쓰레기통 사용 시마다 포인트가 +4 적립됩니다.</>
              : <>회원가입 또는 로그인 후 사용 기록/포인트 확인이 가능합니다.</>}
          </p>

          {/* 숫자 카드 */}
          <div style={{
            display: "grid", gap: 12, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", marginTop: 12
          }}>
            <div style={{ background: "#F8FFF9", border: "1px solid #E6F8EC", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 12, color: "#737B7D", fontWeight: 700 }}>나의 사용 횟수</div>
              <div style={{ fontWeight: 900, fontSize: 22 }}>{user?.uses ?? 0}</div>
            </div>
            <div style={{ background: "#F8FFF9", border: "1px solid #E6F8EC", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 12, color: "#737B7D", fontWeight: 700 }}>나의 포인트</div>
              <div style={{ fontWeight: 900, fontSize: 22 }}>{user?.points ?? 0}</div>
            </div>
            <div style={{ background: "#F6FBFF", border: "1px solid #E6F0F8", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 12, color: "#737B7D", fontWeight: 700 }}>전체 사용 횟수</div>
              <div style={{ fontWeight: 900, fontSize: 22 }}>{global.totalUses}</div>
            </div>
            <div style={{ background: "#F6FBFF", border: "1px solid #E6F0F8", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 12, color: "#737B7D", fontWeight: 700 }}>전체 포인트</div>
              <div style={{ fontWeight: 900, fontSize: 22 }}>{global.totalPoints}</div>
            </div>
          </div>

          {/* 오늘 성장 로그 */}
          <div style={{ marginTop: 8, color: "var(--sub)", fontSize: 13 }}>
            {user ? (
              <>오늘 <b style={{ color: "var(--brand)" }}>{todayUses}</b>회 이용으로 개인 나무가 <b style={{ color: "var(--brand)" }}>{personalPct}%</b>까지 성장했어요.</>
            ) : (
              <>로그인하면 오늘 성장 로그가 표시됩니다.</>
            )}
          </div>

          {/* 숲 시각화 */}
          <div style={{ marginTop: 16, display: "grid", gap: 16 }}>
            <TreeGarden uses={user?.uses ?? 0} perTree={perTree} label="나의 숲" />
            <BadgeStrip trees={treesPersonal} />
            <TreeGarden uses={global.totalUses} perTree={perTree} label="우리 모두의 숲" maxColumns={8} />
          </div>

          {/* 안내 문구 */}
          <div style={{ marginTop: 16, color: "var(--sub)" }}>
            <strong style={{ color: "var(--text)" }}>
              {user?.name || "여러분"}님과 사이트 사용자들이{" "}
              <span style={{ color: "var(--brand)" }}>{treesCommunity}</span> 그루의 나무를 살렸습니다.
            </strong>
            <div style={{ fontSize: 12, marginTop: 4 }}>(개인 기준: {treesPersonal} 그루 / 100회당 1그루 환산)</div>
          </div>

          {/* CTA */}
          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            <Button onClick={useOnce}>{user ? "쓰레기통 사용하기 (+1)" : "로그인/가입 후 이용"}</Button>
            <Button variant="outline" onClick={resetDemo}>데모 데이터 초기화</Button>
          </div>

          {bin && (
            <div style={{ marginTop: 12, fontSize: 12, color: "#737B7D" }}>
              현재 QR로 전달된 쓰레기통 ID: <strong style={{ color: "var(--brand)" }}>{bin}</strong>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
