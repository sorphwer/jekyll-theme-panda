window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload()
  }
};

function pageLoaded() {
  $('body').imagesLoaded( function() {
    $('body').addClass('js-loaded');
    // $('main,footer,.menu').removeClass('js-fadeOut');
  });
}

// fadeout page on link clicked
// https://digipress.digi-state.com/tech/page-transition-effect-how-to/
function pageTransition() {
  $('a:not([href^="#"]):not([href^="javascript:void(0);"]):not([target]):not(.js-no-transition)').on('click', function(e){
    // $('html, body').stop().animate({ scrollTop: 0 }, 400, 'easeInOutSine');
    e.preventDefault(); 
    url = $(this).attr('href'); 
    if (url !== '') {
      $('main,.menu').addClass('js-fadeOut');
      setTimeout(function(){
        window.location = url; 
      }, 600);
    }
    return false;
  });
}

// fadein animation
function fadeinAnime() {
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).innerHeight();
  var windowBottom = scroll + windowHeight;
  $('.js-fadein').each(function(){
    var fadeinPos = $(this).offset().top - 1;
    if ( fadeinPos < windowBottom ) {
      $(this).addClass('js-fadein-anime');
    }
  });
}

// title animation
function titleAnimeSetting() {
  $('.js-ttl').children().addBack().contents().each(function(){
    if (this.nodeType == 3) {
      var $this = $(this);
      $this.replaceWith($this.text().replace(/(\S)/g, '<span>$&</span>'));
    }
  });
  $('.js-ttl').each(function(){
    dataDelay = 200;
    $('span', this).each(function(){
      $(this).attr('data-delay',dataDelay);
      dataDelay=dataDelay+25;
    });
  });
}
function titleAnime() {
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).innerHeight();
  var windowBottom = scroll + windowHeight;
  $('.js-ttl').each(function(){
    var fadeinPos = $(this).offset().top - 1;
    if ( fadeinPos < windowBottom ) {
      $(this).addClass('js-ttl-anime');
    }
  });
}

//  on scroll
// function parallaxEffect() {
//   windowWidth = $(window).width();
//   if( windowWidth >= 768) {
//     var s = skrollr.init({
//       forceHeight: false,
//     });
//   }
// }

// smooth scroll
function smoothScroll() {
  $('a[href^="#"]').on('click', function(){
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('html, body').stop().animate({ scrollTop: position }, 600, 'easeInOutSine');
    return false;
  });
}

// header stick
function headerStick() {
  if ( !$('body').hasClass('is-menu-active') ) {
    var scrollPos = $(window).scrollTop();
    var headerPos = 20;
    if ( scrollPos < headerPos ) {
      $('body').removeClass('js-header-stick');
    } else {
      $('body').addClass('js-header-stick');
    }
  }
}

// header navi hover
function headerNaviHover() {
  $('.header__navi ul li a').hover(function(){
    $(this).parent('li').addClass('is-active');
  },function(){
    $(this).parent('li').removeClass('is-active');
  });
}

// header lang navi hover
function headerNaviLangHover() {
  $('.js-lang .navi__langLink').hover(function(){
    $('.navi__langLink,.navi__langList').addClass('js-active');
    $('.navi__langLink,.navi__langList').hover(function(){
      $('.navi__langLink,.navi__langList').addClass('js-active');
    },function(){
      $('.navi__langLink,.navi__langList').removeClass('js-active');
    });
  },function(){
    $('.navi__langLink,.navi__langList').removeClass('js-active');
  });
}

// about mission slider
function aboutMissionSlider() {
  $('.js-about-mission-slider').slick({
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: 'linear',
    speed: 1000,
    slidesToShow: 1,
    infinite: true,
  });
}



// menu for sp
function sp__menu() {

  $('.menuBtn a').on('click', function(){
    $('.menu').addClass('js-active');//important
    scrollpos = $(window).scrollTop();
    $('body').attr('data-scroll',scrollpos);
    $('body').addClass('is-menu-active').css({'top': -scrollpos});
    //is-menu-active => position 
  });

  $('.menu_closeBtn').on('click', function(){
    $('.menu').removeClass('js-active');
    var scrollPos = $('body').attr('data-scroll');
    $('body').removeClass('is-menu-active').css({'top': '0'});
    window.scrollTo( 0 , scrollPos );
  });
}

function makeMulti (string) {
  let l = new String(string)
  l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"))
  return l
}



$(function(){
  pageTransition();
  titleAnimeSetting();
  smoothScroll();
  headerNaviHover();
  headerNaviLangHover();
  aboutMissionSlider();
  sp__menu();
  // console.clear();

  const string = function () {
/*$$$$$$$\  $$\ $$\                      $$$$$$\  $$\   $$\                $$$$$$\  
$$  __$$\ \__|\__|                    $$  __$$\ \__|  $$ |              $$ ___$$\ 
$$ |  $$ |$$\ $$\ $$$$$$$\   $$$$$$\  $$ /  \__|$$\ $$$$$$\    $$$$$$\  \_/   $$ |
$$$$$$$  |$$ |$$ |$$  __$$\ $$  __$$\ \$$$$$$\  $$ |\_$$  _|  $$  __$$\   $$$$$ / 
$$  __$$< $$ |$$ |$$ |  $$ |$$ /  $$ | \____$$\ $$ |  $$ |    $$$$$$$$ |  \___$$\ 
$$ |  $$ |$$ |$$ |$$ |  $$ |$$ |  $$ |$$\   $$ |$$ |  $$ |$$\ $$   ____|$$\   $$ |
$$ |  $$ |$$ |$$ |$$ |  $$ |\$$$$$$  |\$$$$$$  |$$ |  \$$$$  |\$$$$$$$\ \$$$$$$  |
\__|  \__|\__|\__|\__|  \__| \______/  \______/ \__|   \____/  \_______| \______/ 
                                                                                  
                                                                                 */
  }
  console.log(makeMulti(string));
  console.log('🌈Welcome to RiinoSite 3.0');
  console.log('🌈We are looking for cooperators!');
}); // ready

$(window).on('load', function(){
  pageLoaded();
}); // load

// $(window).on('load resize', function(){
//   parallaxEffect();
// }); // load resize

$(window).on('load scroll', function(){
  fadeinAnime();
  titleAnime();
}); // load scroll

$(window).on('load resize scroll', function(){
  headerStick();
}); // load resize scroll
