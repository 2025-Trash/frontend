// src/pages/ValidatedSuccess.jsx
import React from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 import
import Header from "../components/Header";
import Button from "../components/Button";
import "./ValidatedSuccess.css"; // CSS 파일 import

export default function ValidatedSuccess() {
  return (
    <div className="success-container">
      <Header title="성공" />
      <main className="success-main">
        {/* 애니메이션이 적용된 체크 아이콘 */}
        <div className="success-icon-wrapper">
          <div className="success-icon">✓</div>
        </div>

        <h2 className="success-heading">
          데이터 검증 성공!
        </h2>

        <p className="success-message">
          포인트가 성공적으로 적립되었어요.
        </p>

        <div className="success-cta-buttons">
          {/* Button 컴포넌트의 `as` prop으로 Link 렌더링 */}
          <Button as={Link} to="/transaction" variant="outline" block>
            상세 보기
          </Button>
          <Button as={Link} to="/dashboard" variant="primary" block>
            대시보드로 이동
          </Button>
        </div>
      </main>
    </div>
  );
}