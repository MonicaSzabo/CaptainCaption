(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

    $('.modal-trigger').leanModal();

    $(".learnMore").click(function() {
      $('html, body').animate({
          scrollTop: $("#aboutUs").offset().top
      }, 900);
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space