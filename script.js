// Navigation Module - 내비게이션 메뉴 관련 기능들을 관리하는 객체
const navigation = {
  // 초기화 함수: 스크롤 핸들링과 모바일 메뉴 핸들링 기능을 실행
  init() {
    this.handleScroll();
    this.handleMobileMenu();
  },

  // 스크롤 시 header에 active 클래스 추가/제거 (배경색 등 스타일 변화용)
  handleScroll() {
    window.addEventListener("scroll", () => {
      const header = document.querySelector("header");
      if (window.scrollY > 0) {
        // 스크롤 위치가 0보다 크면 active 클래스 추가
        header.classList.add("active");
      } else {
        // 스크롤 맨 위로 올라가면 active 클래스 제거
        header.classList.remove("active");
      }
    });
  },

  // 모바일 메뉴 열고 닫는 기능, 메뉴 클릭 시 닫기
  handleMobileMenu() {
    const trigger = document.querySelector(".trigger"); // 햄버거 버튼
    const menuGroup = document.querySelector(".menu-group"); // 메뉴 전체를 감싸는 그룹
    const header = document.querySelector("header");

    // 햄버거 버튼 클릭 시 메뉴 열기/닫기
    trigger?.addEventListener("click", () => {
      trigger.classList.toggle("active");
      menuGroup.classList.toggle("active");

      // 메뉴가 열렸을 때 body 스크롤 방지
      if (menuGroup.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // 메뉴 항목 클릭 시 메뉴 닫고 스크롤 다시 가능하도록 설정
    const menuItems = document.querySelectorAll(".gnb a");
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        trigger.classList.remove("active");
        menuGroup.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  },
};

// Slider Module - 슬라이더(캐러셀) 기능을 담당하는 객체
const slider = {
  // 초기화 함수: 메인 슬라이더와 앨범 슬라이더 초기화
  init() {
    this.initMainSlider();
    this.initAlbumSlider();
  },

  // 메인 슬라이더 초기화 - 외부 slick 라이브러리를 동적으로 로드
  initMainSlider() {
    import(
      "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
    ).then(() => {
      // .myslider 클래스가 붙은 요소에 슬라이더 적용
      $(".myslider").slick({
        slidesToShow: 3, // 한 번에 보이는 슬라이드 개수
        slidesToScroll: 1, // 한 번에 넘기는 슬라이드 수
        autoplay: true, // 자동 슬라이드
        autoplaySpeed: 2000, // 2초 간격
        responsive: [
          {
            breakpoint: 770, // 화면 너비가 770px 이하일 때
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    });
  },

  // 앨범 슬라이더 초기화 (이미 slick이 로드되었을 것으로 가정)
  initAlbumSlider() {
    $(".slider").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  },
};

// Scroll Module - 스크롤 관련 기능 (부드러운 스크롤, 맨 위로 가기 버튼 등)
const scroll = {
  // 초기화 함수: 부드러운 스크롤, 맨 위로 이동 기능 실행
  init() {
    this.handleSmoothScroll();
    this.handleGoToTop();
  },

  // 부드러운 스크롤: 내비게이션 링크 클릭 시 해당 섹션으로 부드럽게 이동
  handleSmoothScroll() {
    const gnbLinks = document.querySelectorAll(".gnb a");
    gnbLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); // 기본 클릭 동작(순간이동) 방지
        const target = link.getAttribute("href"); // 예: #section1
        if (target.startsWith("#")) {
          // 해당 섹션으로 부드럽게 스크롤
          document.querySelector(target).scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  },

  // "맨 위로" 버튼 제어
  handleGoToTop() {
    const gotoTop = document.querySelector(".gototop");

    // 스크롤이 500px 이상이면 버튼 표시
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        gotoTop.classList.add("active");
      } else {
        gotoTop.classList.remove("active");
      }
    });

    // 버튼 클릭 시 화면 맨 위로 부드럽게 이동
    gotoTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  },
};

// 페이지 로드 완료 시 모든 모듈 초기화
document.addEventListener("DOMContentLoaded", () => {
  navigation.init(); // 내비게이션 초기화
  scroll.init(); // 스크롤 관련 기능 초기화

  // 슬라이더는 약간의 지연 후 초기화하여 초기 렌더링 최적화
  setTimeout(() => {
    slider.init();
  }, 100);
});
