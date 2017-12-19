$(document).ready(function() {
  $('.main-menu .menu-item').hover(
    function() {
      var $submenu = $(this).find('.submenu')
        , offset =$(this).offset();

      if (offset.left + $submenu.width() + 68 > $(window).width()) {
        $(this).addClass('justify-right');
      }
    },
    function() {
      $('.main-menu .menu-item').removeClass('justify-right');
    }
  );

  $('.sitebar .menu > LI SPAN').on('click', function(e) {
    $(this).closest('LI').toggleClass('opened').children('.submenu').slideToggle();
  });


  // Homepage page top slider initialization
  new Swiper('#home-slider-1', {
    direction: 'horizontal',
    slidesPerView: 1,
    pagination: '#home-slider-1 .swiper-pagination',
    paginationClickable: true,
    autoplay: 3000,
    loop: true,
    spaceBetween: 0,
    mousewheelControl: false,
    speed: 1000
  });


  // Actual products slider initialization
  new Swiper('#home-slider-2', {
    direction: 'horizontal',
    slidesPerView: $('#home-slider-2').data('slides-per-view'),
    spaceBetween: 30,
    paginationClickable: true,
    loop: true,
    mousewheelControl: false,
    speed: 1000,
    nextButton: '#home-slider-2 .button-next',
    prevButton: '#home-slider-2 .button-prev'
  });


  // Product page slider initialization
  var productSlider = new Swiper('#product-slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    paginationClickable: true,
    loop: true,
    mousewheelControl: false,
    speed: 500,
    nextButton: '#product-slider .button-next',
    prevButton: '#product-slider .button-prev'
  });
  // Product page slider thumbs initialization
  new Swiper('#product-thumbs', {
    direction: 'horizontal',
    slidesPerView: 3,
    spaceBetween: 15,
    paginationClickable: true,
    loop: false,
    mousewheelControl: false,
    speed: 500,
    nextButton: '#product-thumbs ~ .button-next',
    prevButton: '#product-thumbs ~ .button-prev',
    onClick: function(swiper) {
      // var clickedSlide = (swiper.clickedIndex % swiper.loopedSlides) + 1;
      var clickedSlide = swiper.clickedIndex + 1;
      productSlider.slideTo(clickedSlide);
    }
  });


  // Category page sliders initialization
  $('.category-slider').each(function() {
    new Swiper($(this), {
      direction: 'horizontal',
      slidesPerView: 1,
      nextButton: $(this).find('.button-next'),
      prevButton: $(this).find('.button-prev'),
      paginationClickable: true,
      loop: true,
      spaceBetween: 0,
      mousewheelControl: false,
      speed: 1000
    });
  });


  $('#price-slider').jRange({
    from: 0,
    to: 70,
    step: 1,
    // scale: [0, 25, 50, 75, 100],
    scale: [],
    format: '%s',
    width: 'calc(100% - 5px)',
    showLabels: false,
    isRange : true,
    onstatechange: function(value) {
      var values = value.split(',');
      $('#price-slider-from').text(values[0]);
      $('#price-slider-to').text(values[1]);
    }
  });


  // Tabs
  $('.tabs .tab A').on('click', function(e) {
    e.preventDefault();

    $('.tabs .tab').removeClass('active');
    $(this).closest('.tab').addClass('active');
    var blockId = $(this).attr('href');
    $(this).closest('.tabs-wrapper').find('.tabs-content').hide(0, function() {
      $(blockId).show(0);
    });
  });
  $('.tabs .tab.active A').trigger('click');


  // Header change size on page scroll
  $(window).bind('scroll', function(e) {
    $(window).scrollTop() > 50
      ? $('body').addClass('small')
      : $('body').removeClass('small');
  });
});
