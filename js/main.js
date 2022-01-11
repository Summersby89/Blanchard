// burger menu
const burger = document.querySelector('.header__burger-menu');
const burgerMenu = document.querySelector('.header__menu');
const menuLink = document.querySelectorAll('.header__nav-link');
const body = document.body;

burger.addEventListener('click', () => {
  burger.classList.toggle('burger-menu_active');
  burgerMenu.classList.toggle('menu_active');
  body.classList.toggle('lock');
});

menuLink.forEach((el) => {
  el.addEventListener("click", () => {
    burger.classList.remove('burger-menu_active');
    burgerMenu.classList.remove('menu_active');
    body.classList.remove('lock');
  })
});

//lazyload
const lazyLoadInstance = new LazyLoad({});

// search

const btnSearch = document.querySelector('.btn-search-img');
const formSearch = document.querySelector('.search');
const closeSearch = document.querySelector('.btn-search-close');

btnSearch.addEventListener('click', (e) => {
  e.preventDefault();
  formSearch.classList.add('form-open')
});

closeSearch.addEventListener('click', (e) => {
  e.preventDefault();
  formSearch.classList.remove('form-open')
});

// dropdown
const arrow = document.querySelectorAll('.painting-style__arrow');
document.querySelectorAll(".header__dropdown-btn").forEach((el, i) => {
  el.addEventListener("click", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    fnCloseAllDropdown(ev.target.nextElementSibling);
    ev.target.nextElementSibling.classList.toggle("_show");
    arrow[i].classList.toggle("_up");
  });
});

document.addEventListener("click", (ev) => {
  if (ev.target.closest("._show")) return;
  ev.stopPropagation();
  fnCloseAllDropdown();
});

function fnCloseAllDropdown(obj) {
  document.querySelectorAll(".painting-style__dropdown").forEach((el, i) => {
    if (el != obj) {
      el.classList.remove("_show");
      arrow[i].classList.remove("_up");
    }
  });
}

// slider hero
const heroSlider = new Swiper('.hero__slider', {
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  loop: true,
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 30,
    slideShadows: false,
  },
  autoplay: {
    delay: 9000,
  },
});


// slider gallery
const gallerySlider = {
  slidesPerView: 1,
  slidesPerColumnFill: 'row',
  spaceBetween: 50,
  grid: {
    fill: 'row',
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    clickable: 'true',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    381: {
      grid: {
        rows: 2,
      },
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },

    1200: {
      grid: {
        rows: 2,
      },
      slidesPerGroup: 3,
      slidesPerView: 3,
    },

    1600: {
      grid: {
        rows: 2,
      },
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
  },
  a11y: {
    prevSlideMessage: 'Предыдущий',
    nextSlideMessage: 'Следующий',
  },
  on: {
    afterInit: (swiper) => {
      new LazyLoad({
        container: swiper.el,
        cancel_on_exit: false
      });
    }
  }
};

new LazyLoad({
  elements_selector: ".swiper-lazy",
  unobserve_entered: true,
  callback_enter: function (swiperElement) {
    new Swiper("#" + swiperElement.id, gallerySlider);
  }
});

// slider projects
const projectsSwiper = new Swiper('.projects__slider', {
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 9000,
  },
  navigation: {
    nextEl: '.projects__slider-button-next',
    prevEl: '.projects__slider-button-prev',
  },
  breakpoints: {
    668: {
      slidesPerView: 2,
      spaceBetween: 30,
    },

    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },

    1600: {
      slidesPerView: 3,
      spaceBetween: 50,
    }
  },
  a11y: {
    prevSlideMessage: 'Предыдущий',
    nextSlideMessage: 'Следующий',
  },
});

//slider events

const eventsSlider = document.querySelector('.events__slider');
let mySwiperEvents;

function mobileSlider() {
  if (window.innerWidth <= 650 && eventsSlider.dataset.mobile == 'false') {
    mySwiperEvents = new Swiper(eventsSlider, {
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      slidesPerView: 1,
      spaceBetween: 10,
      slideClass: 'events__list-item',
      pagination: {
        el: '.events__pagination',
        type: 'bullets',
        clickable: true,
      },
    });
    eventsSlider.dataset.mobile = 'true';
  }

  if (window.innerWidth > 650) {
    eventsSlider.dataset.mobile = 'false';
    if (eventsSlider.classList.contains('swiper-initialized')) {
      mySwiperEvents.destroy();
    }
  }
}

mobileSlider();

window.addEventListener('resize', () => {
  mobileSlider();
});

// slider publications
const publicSlider = document.querySelector('.publications__slider');
let mySwiperPublic;

function desctopPublicSlider() {
  if (window.innerWidth > 650 && publicSlider.dataset.desctop == 'true') {
    mySwiperPublic = new Swiper(publicSlider, {
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      slidesPerGroup: 1,
      slidesPerView: 1,

      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        clickable: 'true',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        650: {
          slidesPerView: 2,
          spaceBetween: 34,
        },

        1024: {
          spaceBetween: 49,
          slidesPerView: 2,
        },

        1200: {
          spaceBetween: 50,
          slidesPerView: 3,
        },

      },
      a11y: {
        prevSlideMessage: 'Предыдущий',
        nextSlideMessage: 'Следующий',
      },
    });
  }

  if (window.innerWidth <= 650) {
    if (publicSlider.classList.contains('swiper-initialized')) {
      mySwiperPublic.destroy();
    }
    publicSlider.dataset.desctop = 'false';
  }
}

desctopPublicSlider();

window.addEventListener('resize', () => {
  desctopPublicSlider();
});

// tooltips

const tooltip = tippy('[data-tippy-content]', {
  animation: 'scale',
  trigger: 'click',
  trigger: 'focusin',
  theme: 'blanchard',
  maxWidth: 264
});

// catalog accordion

$(".catalog__accordion-list").accordion({
  heightStyle: 'content',
  icons: {
    "header": "ui-icon-plus",
    "activeHeader": "ui-icon-plus"
  },
  animate: {
    duration: 200
  },
  collapsible: true
});

// transformations input

(() => {
  const checkBtn = document.querySelector('.publications__left-column-subheading');
  checkBtn.addEventListener('click', function () {
    this.classList.toggle('spoiler-active');
  });
})();

// catalog tabs

document.querySelectorAll(".catalog__tabs-btn").forEach(item => {
  item.addEventListener("click", function (e) {
    let path = e.currentTarget.dataset.path;
    document.querySelectorAll(".catalog__bottom-content").forEach(el => {
      el.classList.remove("active");
    });
    document.querySelectorAll(".catalog__tabs-btn").forEach(el => {
      el.classList.remove("active");
    });
    document.querySelector(`[data-target='${path}']`).classList.add("active")
    this.classList.add("active");
  });
});

document.querySelectorAll(".catalog__bottom-content").forEach(item => {
  let btns = item.querySelectorAll(".accordion__painter-btn");
  let articles = item.querySelectorAll(".catalog__left-column");
  btns.forEach(el => {
    el.addEventListener("click", function (e) {
      let path = e.currentTarget.dataset.path;
      let tabCont = item.querySelector(`[data-target='${path}']`);
      articles.forEach(el => {
        el.classList.remove("active")
      })
      btns.forEach(el => {
        el.classList.remove("painter-btn_active")
      })
      tabCont.classList.add("active")
      this.classList.add("painter-btn_active");
    });
  });
});

//  button "see more"

const btnMore = document.querySelector('.events__btn');
const eventsCard = document.querySelectorAll('.events__list-item:nth-child(3), .events__list-item:nth-child(4), .events__list-item:nth-child(5)');

btnMore.addEventListener('click', function () {
  eventsCard.forEach(el => {
    el.classList.add('_show');
  });
  btnMore.classList.add('_hidden');
});

// scroll

const navLinks = document.querySelectorAll('.header__nav-link[data-goto], .gallery__notice-link[data-goto], .catalog__accordion-empty-link[data-goto], .hero__btn[data-goto]');
if (navLinks.length > 0) {
  navLinks.forEach(navLink => {
    navLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const navLink = e.target;

    if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
      const gotoBlock = document.querySelector(navLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}

// custom select

const element = document.querySelector('.gallery__select');
const choices = new Choices(element, {
  searchEnabled: false,
  position: 'bottom',
  itemSelectText: ''
});

// form validation

const selector = document.querySelector("input[type='tel']");
const im = new Inputmask("+7 (999) 999-99-99");
im.mask(selector);

new window.JustValidate('.contacts__form', {
  colorWrong: '#d11616',
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 30
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },
  },
  messages: {
    name: {
      required: 'Как вас зовут?',
      minLength: 'Имя не должно быть меньше 2 знаков',
      maxLength: 'Имя не должно превышать 30 знаков'
    },
    tel: 'Укажите ваш телефон',
  },
  submitHandler: function (form, values, ajax) {
    ajax({
      url: '../mail.php',
      method: 'POST',
      data: values,
      async: true,
      callback: function () {
        Fancybox.show([{
          src: "<p>Заявка отправлена!</p>",
          type: "html",
        }, ], {
          mainClass: "popup-send",
        });
      }
    });
    form.reset();
  },
});

// скролл на мобилке к деятелю

const smoothLinks = document.querySelectorAll('.accordion__painter-btn');
const catalog = document.querySelector('.catalog');

function mobileScrollPainter() {

  if (window.innerWidth <= 990 && catalog.dataset.setmobile == 'false') {
    smoothLinks.forEach(smoothLink => {
      smoothLink.addEventListener('click', linkClick);
    });
    catalog.dataset.setmobile = 'true';
  }

  function linkClick() {

    const targets = document.querySelectorAll('.catalog__left-column.active');

    targets.forEach(target => {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  if (window.innerWidth > 990) {
    catalog.dataset.setmobile = 'false';
  }
}

mobileScrollPainter();

window.addEventListener('resize', () => {
  mobileScrollPainter();
});


let mapLoaded = false;
const DISTANCE_TO_LOADING = 500;

window.addEventListener('scroll', lazyLoadMap);

function lazyLoadMap() {
  let scrollY = window.scrollY;
  let viewHeight = document.documentElement.clientHeight;
  let mapOffset = document.querySelector("#map").getBoundingClientRect().top;

  if ((scrollY >= mapOffset - DISTANCE_TO_LOADING - viewHeight) && (!mapLoaded)) {
    ymaps.ready(function () {

      var myMap = new ymaps.Map('map', {
          center: [55.759927, 37.604098],
          zoom: 14
        }, {
          searchControlProvider: 'yandex#search'
        }),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Мы здесь',
          balloonContent: 'Леонтьевский переулок'
        }, {
          iconLayout: 'default#image',
          iconImageHref: 'img/icon-map.svg',
          iconImageSize: [20, 20],
          iconImageOffset: [-5, -38]
        });

      myMap.geoObjects.add(myPlacemark);
      myMap.controls.remove('searchControl');
      myMap.controls.remove('trafficControl');
      myMap.controls.remove('fullscreenControl');
      myMap.controls.remove('rulerControl');
      myMap.controls.remove('typeSelector');
      myMap.controls.remove('zoomControl');
    });
    mapLoaded = true;
  }
}
