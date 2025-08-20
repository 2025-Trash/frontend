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
      {/* 'Validating'을 '정보 확인 중'으로 변경 */}
      <Header title="정보 확인 중" />
      <main className="validating-main">
        <h2 className="validating-heading">잠시 기다려주세요</h2>
        <p className="validating-message">직원에 의한 데이터 검증이 진행 중입니다</p>

        {/* 애니메이션 로딩 스피너 */}
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>

        {/* Fun Fact 섹션 */}
        <div className="fun-fact-card">
          {/* '환경뉴스 살펴보기'를 더 자연스럽게 변경 */}
          <h3 className="fun-fact-title">잠깐, 환경 상식!</h3>
          <p className="fun-fact-text">
            {/* 오존홀에 대한 내용을 더 정확하게 번역 */}
            지구의 오존 구멍이 점점 줄어들고 있다는 사실, 알고 계셨나요? 이는 몬트리올 의정서 덕분입니다.
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
            <img src="https://www.usatoday.com/gcdn/authoring/2022/09/25/USAT/ghg0p4-ozone.jpg?width=660&height=401&fit=crop&format=pjpg&auto=webp" alt="오존홀" />
          </div>
          <div className="news-content">
            <p className="news-category">국제</p>
            {/* 뉴스 제목을 자연스럽게 번역 */}
            <h4 className="news-title">인류가 오존층 구멍을 치유했습니다. 기후 변화도 가능할까요?</h4>
            {/* 뉴스 출처와 날짜를 한국어 스타일로 변경 */}
            <p className="news-source">USA Today · 2022년 9월 25일...</p>
          </div>
        </a>
      </main>
    </div>
  );
}