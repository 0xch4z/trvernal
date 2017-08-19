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
      question = 'Answer: ' + addend + ' + ' + augend + ' =  *';
      document.getElementById('question').innerText = question;
      document.getElementById('answer').innerText = '';
    }

    // page init
    $('.button-collapse').sideNav();
    $('#message').trigger('autoresize');
    $('#modal').modal();
    generateCaptcha();

    // globals
    var form = document.getElementById('contact');
    var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    // handle count down
    function onTick() {
      if (seconds) {
        seconds--;
        $('#seconds').text(seconds);
      } else {
        clearInterval(timer);
        document.location = 'index.html';
      }
    }

    // init redirect
    function initRedirect() {
      seconds = 5;
      var timer = setInterval(onTick, 1000);
    }

    // handle submission
    contact.addEventListener('submit', function(e) {
      e.preventDefault();

      console.dir(e);

      var firstName = document.getElementById('first_name').value.trim();
      var lastName = document.getElementById('last_name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value;
      var $answer = document.getElementById('answer').value.trim();

      if (!firstName || !lastName || !email || !message) {
        Materialize.toast('Please fill out all form fields!', 5000);
        generateCaptcha();
      } else if (!emailRegex.test(email)) {
        Materialize.toast('Invalid email address', 5000);
        generateCaptcha();
      } else if (answer != $answer) {
        Materialize.toast('You\'ve failed to answer the CAPTCHA correctly!');
        generateCaptcha();
      } else {
        // submit via ajax
        console.log('form is valid');

        // notify user
        $('#modal').modal('open');

        // redirect
        initRedirect();
      }
    });
  });
})(jQuery);
