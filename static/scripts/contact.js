(function($){
  $(function(){

    // setup
    var answer;
    var seconds;
    var timer;
    function generateCaptcha() {
      var addend = Math.floor(Math.random() * 10);
      var augend = Math.floor(Math.random() * 10);
      answer = addend + augend;
      question = 'What is ' + addend + ' + ' + augend + ' =  * ?';
      $('#question').text(question);
      $('#answer').val('').blur();
    }

    // page init
    $('.button-collapse').sideNav();
    $('#message').trigger('autoresize');
    $('#modal').modal();
    generateCaptcha();

    // global
    var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    // handle count down
    function onTick() {
      if (seconds) {
        seconds--;
        $('#seconds').text(seconds);
      } else {
        clearInterval(timer);
        document.location = '/';
      }
    }

    // init redirect
    function initRedirect() {
      seconds = 5;
      var timer = setInterval(onTick, 1000);
    }

    // handle submission
    $('#submit').click(function() {

      // get field values
      var firstName = $('#first_name').val();
      var lastName = $('#last_name').val();
      var email = $('#email').val();
      var message = $('#message').val();
      var $answer = $('#answer').val();

      console.log('firstname', firstName);
      console.log('lastname', lastName);
      console.log('email', email);
      console.log('message', message);

      // check for empty fields
      if (!firstName || !lastName || !email || !message) {
        console.log('empty fields');
        Materialize.toast('Please fill out all form fields!', 5000);
        generateCaptcha();
        return false;
      } else if (!emailRegex.test(email)) {
        console.log('invalid email');
        Materialize.toast('Invalid email address', 5000);
        generateCaptcha();
      } else if (answer != $answer.trim()) {
        console.log('invalid captcha');
        Materialize.toast('You\'ve failed to answer the CAPTCHA correctly!', 5000);
        generateCaptcha();
      } else {
        // submit via ajax
        console.log('form is valid');
        // notify user
        $('#modal').modal('open');
        // redirect
        initRedirect();
      }

      return false
    });
  });
})(jQuery);
