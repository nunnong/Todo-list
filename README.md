# Todo List

할 일을 관리할 수 있는 Todo List 애플리케이션입니다.

🔗 **배포 주소**: https://todo-list-sable-phi-93.vercel.app/

## 기술 스택

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**

## 주요 기능

### 할 일 목록 페이지 (`/`)
- 진행 중인 할 일과 완료된 할 일을 나누어 조회
- 할 일 추가 (입력 후 버튼 클릭 또는 Enter)
- 체크박스 클릭으로 완료/진행 상태 토글

### 할 일 상세 페이지 (`/items/{itemId}`)
- 할 일 이름 수정
- 완료 상태 변경
- 메모 추가
- 이미지 첨부 (영문 파일명, 5MB 이하)
- 할 일 삭제

## 시작하기

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 프로젝트 구조

```
src/
├── api/           # API 함수
├── app/           # 페이지
│   ├── page.tsx   # 메인 페이지
│   └── items/     # 상세 페이지
└── components/    # 공용 컴포넌트
    ├── Button/
    ├── AddButton/
    ├── EditButton/
    ├── CheckList/
    ├── CheckListDetail/
    ├── GNB/
    └── Search/
```
