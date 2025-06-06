# AD Project

## 🌈 프로젝트 소개
(투어스)아이돌 웹사이트는 한국어, 영어, 일본어 다국어 지원과 모던한 UI/UX를 제공하여 글로벌 팬들에게 멤버 소개, 유튜브 콘텐츠, 앨범 정보를 쉽게 접근할 수 있도록 구현한 반응형 웹사이트입니다.

## 🕰️ 개발기간
2024.10.4 ~ 2024.10.24

## 🌎 Tech
HTML, CSS, JS, JQuery(슬라이더 구현을 위한 Slick 라이브러리 사용)

## 🖥️ Other Skill
Netlify, GitHub

## 💡 문제점 / 해결 방법
1. 언어 선택기 토글 동작 문제
 - 원인: script.js와 language.js 두 파일에서 동일한 토글 기능이 중복 구현되어 있어 충돌이 발생
 - 해결: script.js에서 중복된 언어 선택기 관련 코드를 제거하고 language.js의 기능만 사용하도록 수정
   
2. 모바일 메뉴에서 언어 선택기 위치 문제
 - 원인: 모바일 메뉴에서 언어 선택기의 위치가 부적절하게 배치됨
 - 해결:
   order: -1을 추가하여 최상단에 배치
   align-self: flex-end로 오른쪽 정렬
   margin: 20px 5px 40px auto와 padding-left: 60px로 위치 미세 조정
   z-index: 1001을 추가하여 다른 요소들 위에 표시되도록 설정
   
3. 드롭다운 메뉴 표시 문제
 - 원인: 드롭다운 메뉴가 다른 요소들에 가려지는 문제
 - 해결:
   드롭다운에 z-index: 1002 추가
   배경색과 테두리 색상을 모바일 메뉴와 일치하도록 조정
   클릭 영역 확대를 위해 패딩 값 조정

## ✅ 느낀점/배운점
이번 프로젝트를 진행하면서 웹 개발에서 가장 중요한 것이 사용자 경험이라는 점을 다시 한 번 깨달았습니다. 
특히 다국어 지원을 구현하면서 글로벌 사용자들을 고려한 설계의 중요성을 체감했고, 이를 위해 JSON 파일을 활용한 체계적인 번역 관리 방법을 배울 수 있었습니다.
인상 깊었던 점은 작은 디테일 하나하나가 전체적인 사용자 경험에 큰 영향을 미친다는 것이었습니다. 
예를 들어, 모바일 메뉴에서 언어 선택기의 위치를 조정하는 과정에서 단순한 위치 변경이 아닌, 사용자의 접근성과 편의성을 모두 고려해야 했습니다.
이번 프로젝트를 통해 웹 개발에서는 기능 구현뿐만 아니라, 사용자 중심의 설계, 코드의 구조화, 그리고 성능 최적화가 균형있게 이루어져야 한다는 것을 배웠습니다.
