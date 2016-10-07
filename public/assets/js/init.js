(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

    //Scrolls down on Learn More button in top navbar
    $(".learnMore").click(function() {
      $('html, body').animate({
          scrollTop: $("#aboutUs").offset().top
      }, 900);
    });

    //Click bottom logo, goes to top of the page
    $("#bottomCapLogo").click(function() {
      window.scrollTo(0, 0);
    });


    //On closing a modal, the videos will stop running
    $('.modal-trigger').leanModal({
        complete: function() { 
          $("#watchvideo0 iframe").attr("src", $("#watchvideo0 iframe").attr("src"));
          $("#watchvideo1 iframe").attr("src", $("#watchvideo1 iframe").attr("src"));
          $("#watchvideo2 iframe").attr("src", $("#watchvideo2 iframe").attr("src"));
          $("#watchvideo3 iframe").attr("src", $("#watchvideo3 iframe").attr("src"));
          $("#watchvideo4 iframe").attr("src", $("#watchvideo4 iframe").attr("src"));
          $("#watchvideo5 iframe").attr("src", $("#watchvideo5 iframe").attr("src"));
        }
      }
    );

    //Submit button on email modal, posts message to mongo
    $("#submitEmailButton").click(function() {
      var name = $('#name').val().trim();
      var email = $('#email').val().trim();
      var comments = $('#comments').val().trim();

      var isValid = isValidEmail(email);

      if(!name) {
        Materialize.toast("Please enter your name", 4000);
      }
      if(!isValid) {
        Materialize.toast("Please enter a valid email address", 4000);
      }
      if(!comments) {
        Materialize.toast("Please enter your comments", 4000);
      }

      if(name && isValid && comments) {

        // axios.post('/api/message/saved', {name: name, email: email, comments: comments})
        // .then(function(results){

        //   console.log("Posted to MongoDB");
        //   return(results);
        // })

        Materialize.toast("Message Sent", 4000);
        $('#name').val("");
        $('#comments').val("");
        $('#email').val("");

        $('#emailMe').closeModal();
      }
    });

    
    //Prevents enter from doing anything in form
    $('#searching').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) { 
        e.preventDefault();
        return false;
      }
    });

   function isValidEmail(emailAddress) {
      var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      return pattern.test(emailAddress);
    };

  }); // end of document ready
})(jQuery); // end of jQuery name space