$(document).ready(function(){

  $('[data-fancybox="gallery"]').fancybox({
    hash : true
})

$('.burger').click(function(){
  $(this).toggleClass('active');
  $('.sidebar').toggleClass('active');
  $('.sidebar__layout').toggleClass('active');
  $('html').toggleClass('fixed');
})

$('.sidebar__layout').click(function(){
  $(this).toggleClass('active');
  $('.sidebar').toggleClass('active');
  $('.burger').toggleClass('active');
  $('html').toggleClass('fixed');
})

$('.header-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
  });

  $('.steps-sliders__slide').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
  });

  $('.portfolio-sliders__slide').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
  });

  $('.reviews__slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          variableWidth: true
        }
      }
    ]
  });

  $('.steps-trigger__item').click(function (e) {
    e.preventDefault();
    $('.steps-trigger__item').removeClass('active');
    $('.steps-sliders__tabs').removeClass('active');

    $(this).addClass('active');
    $($(this).attr('href')).addClass('active');
    $('.steps-sliders__slide').slick("setPosition");
  });

  $('.steps-trigger__item:first').click();


  $('.portfolio-trigger__item').click(function (e) {
    e.preventDefault();
    $('.portfolio-trigger__item').removeClass('active');
    $('.portfolio-sliders__tabs').removeClass('active');

    $(this).addClass('active');
    $($(this).attr('href')).addClass('active');
    $('.portfolio-sliders__slide').slick("setPosition");
  });

  $('.portfolio-trigger__item:first').click();


  const defaultSelect = () => {
    const element = document.querySelectorAll('.select-item');
      element.forEach(el => {
        const choices = new Choices(el, {
          searchEnabled: false,
          itemSelectText: ''
        });
      });
  };
  defaultSelect();

  $(".price__card-price-btn").on("click", function () {
    var id = $(this).attr("data-n");
    $("#select-2")
     .find("[value=" + id + "]")
     .prop("selected", true);
  });
  
  const num = document.getElementById('num');
  const rng = document.getElementById('range');
  const set = val => {
    num.value = val;
    rng.value = val;
}
  rng.addEventListener('input', () => set(rng.value));
  num.addEventListener('change', () => set(num.value));
});


function percentIncrease() {
  let selectType = document.getElementById("select-2").value;
  let inputSquare = document.getElementById("num").value;
  let resultPrice = selectType * inputSquare;
  let howMany = resultPrice / 5000;

  document.getElementById("mainresults").innerHTML = resultPrice;
  document.getElementById("how-many").innerHTML = howMany;
}


$(function() {
  $('.acc__title').click(function(j) {
    
    var dropDown = $(this).closest('.acc__card').find('.acc__panel');
    $(this).closest('.acc').find('.acc__panel').not(dropDown).slideUp();
    
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).closest('.acc').find('.acc__title.active').removeClass('active');
      $(this).addClass('active');
    }
    
    dropDown.stop(false, true).slideToggle();
    j.preventDefault();
  });
});

(function () {

  const smoothScroll = function (targetEl, duration) {
      const headerElHeight =  document.querySelector('.header').clientHeight;
      let target = document.querySelector(targetEl);
      let targetPosition = target.getBoundingClientRect().top - headerElHeight;
      let startPosition = window.pageYOffset;
      let startTime = null;
  
      const ease = function(t,b,c,d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
      };
  
      const animation = function(currentTime){
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, targetPosition, duration);
          window.scrollTo(0,run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);

  };

  const scrollTo = function () {
      const links = document.querySelectorAll('.js-scroll');
      links.forEach(each => {
          each.addEventListener('click', function () {
              const currentTarget = this.getAttribute('href');
              smoothScroll(currentTarget, 1000);
              $('.sidebar').removeClass('active');
              $('.burger').removeClass('active');
              $('html').removeClass('fixed');
              $('.sidebar__layout').removeClass('active');
          });
      });
  };
  scrollTo();
}());

(function () {
  const header = document.querySelector('.header');
  window.onscroll = () => {
      if (window.pageYOffset > 150) {
          header.classList.add('active');
      } else {
          header.classList.remove('active');
      }
  };
}());

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.navigation__link').forEach((link) => {
        link.classList.toggle('active', 
          link.getAttribute('href').replace('#', '') === entry.target.id
        );
      });
    }
  });
}, {
  threshold: 0.7
})

document.querySelectorAll('.section').forEach((section) => {
  observer.observe(section)
})


$(window).on('load resize', function() {
  if ($(window).width() < 992) {
    $('.price__cards:not(.slick-initialized)').slick({
      centerMode: true,
      dots: false,
      arrows: false,
      infinite: true,
      speed: 100,
      slidesToShow: 2,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            centerMode: true,
            variableWidth: true
          }
        }, {
          breakpoint: 580,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            infinite: false,
            variableWidth: true,
            dots: false
          }
        },
      ]
    });

  } else {
    $(".price__cards.slick-initialized").slick("unslick");
  }
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  $('.steps-sliders__slide').slick('setPosition');
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  $('.portfolio-sliders__slide').slick('setPosition');
});


$('.price__card-more').click(function() {
  $(this).closest(".price__card").find('.price__card-hidden').addClass('active');
  $(this).closest(".price__card").find('.price__card-visible').removeClass('active');
});
$('.price__card-hidden span').click(function() {
  $(this).closest(".price__card").find('.price__card-hidden').removeClass('active');
  $(this).closest(".price__card").find('.price__card-visible').addClass('active');
});

$(window).on('load resize', function() {
  if ($(window).width() < 992) {
    $('.steps-trigger__wrapper:not(.slick-initialized)').slick({
      // centerMode: true,
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 2
    });
  } else {
    $(".steps-trigger__wrapper.slick-initialized").slick("unslick");
  }
});

$(window).on('load resize', function() {
  if ($(window).width() < 992) {
    $('.portfolio-triggers__layout:not(.slick-initialized)').slick({
      // centerMode: true,
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1
    });
  } else {
    $(".portfolio-triggers__layout.slick-initialized").slick("unslick");
  }
});

// Вызов модального окна
$('.popup-btn').click( function() {
	$('.popup').addClass('active');
  $('html').addClass('fixed');
});

$('.popup__close').click( function() {
	$('.popup').removeClass('active');
  $('html').removeClass('fixed');
});
$('.popup-layout').click( function() {
	$('.popup').removeClass('active');
  $('html').removeClass('fixed');
});