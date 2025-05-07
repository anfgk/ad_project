// 스크롤 시 header 및 'go to top' 버튼 스타일 변경
window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  const header = document.querySelector("header");
  const gototop = document.querySelector(".gototop");

  if (scroll > 50) {
    // 스크롤이 50px 이상이면 header와 gototop에 active 클래스 추가
    header.classList.add("active");
    gototop.classList.add("active");
  } else {
    // 스크롤이 50px 이하이면 active 클래스 제거
    header.classList.remove("active");
    gototop.classList.remove("active");
  }
});

// 모바일 메뉴 토글
const trigger = document.querySelector(".trigger");
const gnb = document.querySelector(".gnb");
const gnbLinks = gnb.querySelectorAll("a");

trigger.addEventListener("click", function () {
  // 메뉴 클릭 시 메뉴 열림/닫힘 토글
  this.classList.toggle("active");
  gnb.classList.toggle("active");
});

// 메뉴 클릭 시 모바일 메뉴 닫기
gnbLinks.forEach((link) => {
  link.addEventListener("click", () => {
    trigger.classList.remove("active");
    gnb.classList.remove("active");
  });
});

// 멤버 프로필 슬라이더(slick) 초기화
$(".myslider").slick({
  dots: false,
  infinite: true, // 무한 반복
  autoplay: true, // 자동 재생
  speed: 1000, // 전환 속도
  slidesToShow: 3, // 한 번에 보여줄 슬라이드 수
  slidesToScroll: 3, // 한 번에 넘길 슬라이드 수
  responsive: [
    {
      breakpoint: 1024, // 1024px 이하
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600, // 600px 이하
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480, // 480px 이하
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

// 메뉴 및 top 버튼 클릭 시 부드럽게 스크롤 이동
$(".gototop, .gnb a").click(function () {
  $.scrollTo(this.hash || 0, 800); // 대상 요소로 0.8초간 부드럽게 이동
});

// 앨범 섹션 슬라이더 (모바일에서만 작동)
$(document).ready(function () {
  function initSlider() {
    if ($(window).width() <= 390) {
      // 390px 이하일 때만 slick 적용 (초기화되지 않았을 때만)
      if (!$(".slider").hasClass("slick-initialized")) {
        $(".slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
          infinite: true, // 무한 반복
          autoplay: true, // 자동 재생
          autoplaySpeed: 3000, // 자동 재생 속도 (3초)
        });
      }
    } else {
      // 390px 초과일 경우 slick 해제
      if ($(".slider").hasClass("slick-initialized")) {
        $(".slider").slick("unslick");
      }
    }
  }

  // 페이지 로드 시 슬라이더 초기화
  initSlider();

  // 창 크기 변경 시 슬라이더 다시 설정
  $(window).on("resize", function () {
    initSlider();
  });
});
