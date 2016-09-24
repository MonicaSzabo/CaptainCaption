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

    $('#searching').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) { 
        e.preventDefault();
        return false;
      }
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space