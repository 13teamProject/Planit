# Planit:

## ✨ 프로젝트 소개

<img src="https://github.com/13teamProject/Planit/assets/98534731/fcc30b3f-c6b7-44d2-90c4-a57d3d177880" alt="logo_blue" width="20%"><br>

바쁘디 바쁜 현대사회 속에서 사용자와 팀원들의 효율적인 일정관리를 돕는 서비스입니다.<br>
대시보드를 생성하여 일정을 관리하고 팀원들을 대시보드에 초대하여 함께 일정을 관리할 수 있습니다.

#### 서비스 배포 주소
https://planit-xi.vercel.app/

## 🧑‍💻 개발자 소개(Sprint 6기 Part3 13팀)

| <img src="https://avatars.githubusercontent.com/u/98534731?v=4"> | <img src="https://avatars.githubusercontent.com/u/120254101?v=4"> | <img src="https://avatars.githubusercontent.com/u/50002974?v=4"> | <img src="https://avatars.githubusercontent.com/u/123517278?v=4"> | <img src="https://avatars.githubusercontent.com/u/102004889?v=4"> |
| :--------------------------------------------------------------: | :---------------------------------------------------------------: | :--------------------------------------------------------------: | :---------------------------------------------------------------: | :---------------------------------------------------------------: |
|                          FE_6기 고재성                           |                           FE_6기 곽서연                           |                          FE_6기 김혜선                           |                           FE_6기 조현지                           |                           FE_6기 천권희                           |
| • 공용 컴포넌트<br>• 대시보드 상세화면<br>• 드래그앤 드롭 기능 적용 |           • 헤더<br>• 사이드 바<br>• 대시보드                           | • 랜딩페이지<br>• 에러페이지<br>• 계정관리<br>• 대시보드 관리<br>• 프레이머 모션 적용 | • 인증인가<br>• 할 일 카드 모달<br>• 다크모드 적용 | • 공용 컴포넌트<br>• 카드 생성, 수정<br>• 컬럼 생성, 수정<br>• 웹 소켓 적용 |

## 🗓️ 진행 일정 및 진행 방식
### 개발 기간: 2024.0619.~2024.07.07
![image](https://github.com/13teamProject/Planit/assets/98534731/9f43298d-cf10-4409-a2b2-96edaf3f602c)

### 진행 방식
- 매일 데일리 스크럼 시간을 가져서 각자의 Done, To do, 어려웠던 점, 추가 안건을 공유
- 14:00~17:00 코어 타임 시간
- github issue를 활용하여 맡은 작업에 대한 브랜치를 생성하여 개발 진행

## 🛠️ 기술 스택

#### 프레임워크

<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">

#### 라이브러리

<img src="https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"> <img src="https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"> <img src="https://img.shields.io/badge/Yup-2E7EEA?style=for-the-badge&logo=yup&logoColor=white"> <img src="https://img.shields.io/badge/WebSocket-4E4E4E?style=for-the-badge&logo=websocket&logoColor=white"> <img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white">

#### UI

<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"> <img src="https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue"> <img src="https://img.shields.io/badge/React%20Spinner-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/React%20Toastify-FF4154?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Classnames-007ACC?style=for-the-badge&logo=classnames&logoColor=white">

#### 코드 포매터 및 검사 도구

<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"> <img src="https://img.shields.io/badge/Husky-000000?style=for-the-badge&logo=husky&logoColor=white">

#### 협업툴

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white">

#### 배포

<img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white">

## 📂 폴더구조
```
src
├── app
│   ├── (auth)
│   ├── (dashboard)
│   ├── api
│   ├── layout.tsx
│   ├── mypage
│   ├── not-found.tsx
│   └── page.tsx
├── components
│   ├── auth
│   ├── commons
│   ├── dashboard
│   ├── editdashboard
│   ├── home
│   ├── mydashboard
│   └── mypage
├── constants
├── context
├── hooks
├── middleware.ts
├── service
├── store
├── styles
└── utils
```

## 💻 주요 기능
1. **실시간 협업**
   - WebSocket을 활용한 실시간 데이터 동기화
   - 초대된 팀원들과 즉각적인 작업 상태 공유

2. **사용자 인증 및 보안**
   - 쿠키 기반의 토큰 관리로 보안성 강화
   - Zustand의 persist 기능을 활용한 사용자 세션 유지
   - Next.js 미들웨어를 통한 인증된 사용자만의 대시보드 접근 제어

3. **사용자 인터페이스**
   - Framer Motion을 이용한 부드러운 애니메이션과 전환 효과
   - 사용자 선호에 따른 라이트/다크 테마 전환 기능
   - 사이드 바 토글 기능으로 화면 UI 개선

4. **할 일 관리**
   - 사용자 정의 컬럼 및 카드 생성, 수정, 삭제 가능
   - 작업에 관련된 태그 추가 및 마감일 관리
   - 할 일 카드 상세 모달의 댓글 무한 스크롤 적용
   - 별도의 라이브러리 없이 구현한 드래그 앤 드롭으로 할 일의 컬럼 변경
     

## 시연영상

https://github.com/user-attachments/assets/4a6052ac-b150-4755-8eea-95abd65303ec



