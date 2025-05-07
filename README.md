# AD Project

## 🌈 프로젝트 소개
아이돌 그룹 투어스를 홍보하는 홈페이지를 제작한 프로젝트입니다.

## 🕰️ 개발기간

## 🌎 Tech
HTML, CSS, JS

## 🖥️ Other Skill
Netlify

## 🥺 문제점
아이돌 페이지에서 Slick Slider를 활용해 멤버 및 앨범 소개 섹션을 구현하려 했으나,
- 슬라이드가 정상적으로 동작하지 않음
- 특정 화면 크기에서 슬라이드 개수가 자동으로 조정되지 않음
- 모바일 환경에서 슬라이드가 겹치거나 레이아웃이 깨지는 문제 발생

## 💡 해결한 방법
1. CSS 문제 해결
- `slick.css`와 `slick-theme.css`가 올바르게 적용되지 않아 스타일이 깨졌던 문제를 확인 후, 아래와 같이 명시적으로 임포트
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
2. 반응형 설정 추가
- `responsive` 옵션을 활용해 화면 크기에 따라 `slidesToShow` 값을 조정

## ✅ 느낀점/배운점
- Slick Slider의 `responsive` 옵션을 활용해 반응형을 적용하는 방법을 익힘
- 스타일이 적용되지 않는 문제 발생 시, CSS 파일 로딩 여부를 먼저 점검하는 것이 중요함
- 화면 크기 변경 시 UI가 정상적으로 적용되지 않을 경우, 리렌더링을 고려해야 함
