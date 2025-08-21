# CupCycle 프론트엔드

### 🌳 프로젝트 소개

CupCycle은 **React** 기반의 모바일 반응형 웹으로, **포인트 적립** 및 **나무 키우기**를 통해 분리배출을 고취하고자 합니다.

---

### ⚙️ 요구사항

- **Node.js** 18 LTS 이상
- **npm** 9+ (또는 pnpm/yarn)

---

### 설치 및 실행

1. **패키지 설치**
   ```bash
   npm install
   ```
````

2. **개발 서버 실행**

   ```bash
   npm start
   ```

   실행 후 터미널에 표시되는 주소로 접속하면 됩니다.

   - **Local**: `http://localhost:3000`
   - **On Your Network**: `http://<내 IP>:3000` (동일 네트워크의 모바일/PC에서 접속 가능)

3. **프로덕션 빌드**

   ```bash
   npm run build
   ```

   `build/` 폴더가 생성되며, Netlify, Vercel, S3 등 정적 호스팅 서비스에 업로드하여 배포할 수 있습니다.

---

### 📂 주요 폴더 구조

```
src/
├─ assets/         # 이미지, 아이콘 등 정적 리소스
├─ components/     # 재사용 가능한 UI 컴포넌트
│  ├─ BadgeStrip.jsx
│  ├─ Button.jsx
│  ├─ Header.jsx
│  ├─ ...
├─ pages/          # 라우트 단위의 개별 페이지
│  ├─ Dashboard.jsx
│  ├─ LoginPage.jsx
│  ├─ Validating.jsx
│  ├─ ...
└─ styles/         # 전역 스타일 및 공통 CSS
```

- 각 `.jsx` 파일은 동일 이름의 `.css` 파일을 포함하여 컴포넌트별 스타일을 분리합니다.
- `react-router-dom`을 사용하여 `pages/` 내 컴포넌트들을 라우트에 연결합니다.

---

### 📄 주요 화면 (Pages)

- **Welcome**: 랜딩 및 프로젝트 소개 화면
- **LoginPage**: 로그인 폼
- **SignUp**: 회원가입 폼
- **Dashboard**: 사용자 정보, 포인트, 사용 기록 등을 요약하여 보여주는 메인 화면
- **TransactionDetail**: 포인트 적립/사용 상세 내역
- **Validating**: 정보 확인 중 로딩 화면 (3초 후 `ValidatedSuccess` 페이지로 이동)
- **ValidatedSuccess**: 검증 및 포인트 적립 완료 화면

---

### 공통 컴포넌트

- **Header**: 상단에 고정되는 타이틀 바
- **Button**: 재사용 가능한 공통 버튼
- **InputField**: 레이블과 에러 처리가 포함된 입력 필드
- **BadgeStrip**: 사용자의 상태나 요약 정보를 표시하는 배지 컴포넌트
- **TreeTeaser / TreeGarden**: 나무 및 숲 시각화 컴포넌트
