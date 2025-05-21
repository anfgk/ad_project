// Navigation Module
const navigation = {
  init() {
    this.handleScroll();
    this.handleMobileMenu();
  },

  handleScroll() {
    window.addEventListener("scroll", () => {
      const header = document.querySelector("header");
      if (window.scrollY > 0) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    });
  },

  handleMobileMenu() {
    const trigger = document.querySelector(".trigger");
    const gnb = document.querySelector(".gnb");

    trigger?.addEventListener("click", () => {
      trigger.classList.toggle("active");
      gnb.classList.toggle("active");
    });
  },
};

// Slider Module
const slider = {
  init() {
    this.initMainSlider();
    this.initAlbumSlider();
  },

  initMainSlider() {
    // Lazy load the slick slider script
    import(
      "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
    ).then(() => {
      $(".myslider").slick({
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
    });
  },

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

// Scroll Module
const scroll = {
  init() {
    this.handleSmoothScroll();
    this.handleGoToTop();
  },

  handleSmoothScroll() {
    const gnbLinks = document.querySelectorAll(".gnb a");
    gnbLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("href");
        if (target.startsWith("#")) {
          document.querySelector(target).scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  },

  handleGoToTop() {
    const gotoTop = document.querySelector(".gototop");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        gotoTop.classList.add("active");
      } else {
        gotoTop.classList.remove("active");
      }
    });

    gotoTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  },
};

// Initialize all modules when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  navigation.init();
  scroll.init();
  // Initialize slider after a small delay to improve initial page load
  setTimeout(() => {
    slider.init();
  }, 100);
});
