// src/pages/Validating.jsx
import { useEffect } from "react";
import Header from "../components/Header";
import "./Validating.css"; // CSS 파일 import

export default function Validating(){
  useEffect(() => {
    const t = setTimeout(() => {
      // 실제 앱에서는 데이터 검증 API 호출 후 성공 시 이동
      window.location.href = "/validated";
    }, 3000); // 3초로 대기 시간 늘림
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="validating-container">
      <Header title="Validating" />
      <main className="validating-main">
        <h2 className="validating-heading">잠시 기다려주세요</h2>
        <p className="validating-message">직원에 의한 데이터 검증이 진행 중입니다</p>

        {/* 애니메이션 로딩 스피너 */}
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>

        {/* Fun Fact 섹션 */}
        <div className="fun-fact-card">
          <h3 className="fun-fact-title">Fun Fact #1</h3>
          <p className="fun-fact-text">
            Did you know, Earth's ozone hole is getting smaller, the impact of the ban on the use of CFC gas
          </p>
          <p className="fun-fact-source">- eea europa</p>
        </div>

        {/* 관련 뉴스 섹션 */}
        <a href="https://www.usatoday.com/story/opinion/2022/09/25/humanity-healed-ozone-hole-can-we-do-the-same-climate/8118080002/" 
           className="news-link-card"
           target="_blank"
           rel="noopener noreferrer"
        >
          <div className="news-thumbnail">
            {/* 뉴스 썸네일 이미지 */}
            <img src="https://www.usatoday.com/gcdn/authoring/2022/09/25/USAT/ghg0p4-ozone.jpg?width=660&height=401&fit=crop&format=pjpg&auto=webp" alt="Ozone Hole" />
          </div>
          <div className="news-content">
            <p className="news-category">International</p>
            <h4 className="news-title">Humanity healed the ozone hole. Can we do the same for...</h4>
            <p className="news-source">USA Today · 25 September 2022...</p>
          </div>
        </a>
      </main>
    </div>
  );
}