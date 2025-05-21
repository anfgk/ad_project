// 현재 지원하는 언어 목록
const SUPPORTED_LANGUAGES = ["ko", "en", "ja"]; // 한국어, 영어, 일본어
const DEFAULT_LANGUAGE = "ko"; // 기본 언어는 한국어

// 언어 코드에 따른 언어 이름 매핑 객체 (UI에 표시용)
const LANGUAGE_NAMES = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};

// 번역 데이터를 저장할 객체 (언어별 JSON 데이터를 여기에 저장)
let translations = {};

// 현재 선택된 언어를 localStorage에서 가져옴 (없으면 기본 언어 사용)
function getCurrentLanguage() {
  return localStorage.getItem("language") || DEFAULT_LANGUAGE;
}

// 언어를 변경하는 함수
async function changeLanguage(lang) {
  // 지원하지 않는 언어는 무시
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    console.error("Unsupported language:", lang);
    return;
  }

  try {
    // 해당 언어의 번역 데이터가 없다면 서버에서 JSON 파일을 불러옴
    if (!translations[lang]) {
      const response = await fetch(`/translations/${lang}.json`);
      translations[lang] = await response.json();
    }

    // 선택한 언어를 localStorage에 저장
    localStorage.setItem("language", lang);

    // 페이지 내 모든 번역 가능한 요소를 업데이트
    updatePageContent(lang);

    // 언어 선택 버튼 상태 업데이트
    updateLanguageButtons(lang);

    // 현재 언어 코드(예: "EN")를 UI에 표시
    document.querySelector(".current-lang").textContent = lang.toUpperCase();

    // 언어 선택 드롭다운 메뉴 닫기
    document.querySelector(".language-selector").classList.remove("active");
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

// 페이지 내 콘텐츠를 번역된 내용으로 업데이트
function updatePageContent(lang) {
  const content = translations[lang]; // 해당 언어의 번역 데이터 가져오기
  if (!content) return;

  // 메타 데이터 (페이지 제목, 설명 등) 변경
  document.title = content.meta.title;
  document.querySelector('meta[name="description"]').content =
    content.meta.description;

  // 각 섹션별 업데이트 함수 호출
  updateNavigation(content.nav); // 내비게이션 메뉴
  updateAboutSection(content.about); // About 섹션
  updateYoutubeSection(content.youtube); // YouTube 섹션
  updateMemberSection(content.member); // 멤버 프로필 섹션
  updateAlbumSection(content.album); // 앨범 섹션
}

// 내비게이션 메뉴 텍스트 업데이트
function updateNavigation(nav) {
  const menuItems = document.querySelectorAll(".gnb li a");
  menuItems.forEach((item) => {
    const key = item.getAttribute("href").replace("#", "").toLowerCase(); // href에서 ID 추출
    if (nav[key]) {
      item.textContent = nav[key]; // 해당 키에 해당하는 번역 텍스트 삽입
    }
  });
}

// About 섹션 내용 업데이트
function updateAboutSection(about) {
  const aboutSection = document.querySelector("#about");
  if (!aboutSection) return;

  // 제목과 설명 업데이트
  aboutSection.querySelector("h1").textContent = about.title;
  aboutSection.querySelector("p").textContent = about.description;

  // 링크 텍스트도 있으면 업데이트
  const link = aboutSection.querySelector("a");
  if (link) link.textContent = about.link;
}

// YouTube 섹션 내용 업데이트
function updateYoutubeSection(youtube) {
  const youtubeSection = document.querySelector("#youtube");
  if (!youtubeSection) return;

  // 섹션 제목 업데이트
  youtubeSection.querySelector("h2").textContent = youtube.title;

  // 비디오 제목들 업데이트
  const videos = youtubeSection.querySelectorAll(".down-desc h3");
  const videoKeys = Object.keys(youtube.videos);
  videos.forEach((video, index) => {
    if (videoKeys[index]) {
      video.textContent = youtube.videos[videoKeys[index]];
    }
  });

  // "Explore" 버튼 텍스트 업데이트
  const exploreButtons = youtubeSection.querySelectorAll(".btn-explore");
  exploreButtons.forEach((button) => {
    const textNode = button.childNodes[0]; // 첫 번째 텍스트 노드
    if (textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent = youtube.explore + " ";
    }
  });
}

// 멤버 프로필 섹션 내용 업데이트
function updateMemberSection(member) {
  const memberSection = document.querySelector("#member");
  if (!memberSection) return;

  // 섹션 제목 업데이트
  memberSection.querySelector("h2").textContent = member.title;

  // 각 멤버 프로필 정보 업데이트
  const memberElements = memberSection.querySelectorAll(".twsmember");
  memberElements.forEach((el) => {
    const img = el.querySelector("img");

    // 이미지 파일 이름에서 멤버 키 추출
    const memberKey = img.src.split("/").pop().split(".")[0].toLowerCase(); // 이미지 파일명에서 이름 추출

    if (member.members[memberKey]) {
      const spans = el.querySelectorAll("span");
      spans[0].textContent = member.members[memberKey].name; // 이름
      spans[1].textContent = member.members[memberKey].birth; // 생년월일
    }
  });
}

// 앨범 섹션 내용 업데이트
function updateAlbumSection(album) {
  const albumSection = document.querySelector("#album");
  if (!albumSection) return;

  // 앨범 제목 업데이트
  albumSection.querySelector("h6").textContent = album.title;

  // 각 앨범 아이템에 대해 제목, 설명, 날짜 업데이트
  const albumItems = albumSection.querySelectorAll(".post_item");
  albumItems.forEach((item) => {
    const albumKey = item.getAttribute("data-album");
    if (album.albums[albumKey]) {
      const albumData = album.albums[albumKey];
      item.querySelector("h3").textContent = albumData.title;

      // 앨범 설명 텍스트만 변경
      const description = item.querySelector("p");
      const descriptionText = description.childNodes[0];
      if (descriptionText.nodeType === Node.TEXT_NODE) {
        descriptionText.textContent = albumData.description;
      }

      // 날짜 업데이트
      description.querySelector("span").textContent = albumData.date;
    }
  });
}

// 현재 선택된 언어 버튼에 active 클래스 추가/제거
function updateLanguageButtons(currentLang) {
  const buttons = document.querySelectorAll(".language-dropdown button");
  buttons.forEach((button) => {
    const lang = button.getAttribute("data-lang");
    button.classList.toggle("active", lang === currentLang);
  });
}

// 페이지 로드 시 언어 초기화 및 이벤트 리스너 등록
document.addEventListener("DOMContentLoaded", async () => {
  const currentLang = getCurrentLanguage();
  await changeLanguage(currentLang); // 초기 언어 설정

  // 언어 토글 버튼 클릭 시 드롭다운 열기/닫기
  const languageToggle = document.querySelector(".language-toggle");
  languageToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    document.querySelector(".language-selector").classList.toggle("active");
  });

  // 언어 버튼 클릭 시 언어 변경
  const languageButtons = document.querySelectorAll(
    ".language-dropdown button"
  );
  languageButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const lang = button.getAttribute("data-lang");
      changeLanguage(lang); // 선택된 언어로 변경
    });
  });

  // 드롭다운 외부 클릭 시 드롭다운 닫기
  document.addEventListener("click", () => {
    document.querySelector(".language-selector").classList.remove("active");
  });

  // 드롭다운 내부 클릭 시 이벤트 전파 중단
  document
    .querySelector(".language-dropdown")
    .addEventListener("click", (e) => {
      e.stopPropagation();
    });
});
