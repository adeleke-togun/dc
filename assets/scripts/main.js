'use strict';
var dc = {
  getBrowserWindow: function() {
    var width = $(window).width();
    window.onresize = function() {
      width = $(window).width();
    };
  },
  scrollFire: function() {
    var options = [{
      selector: '#staggered-test',
      offset: 400,
      callback: 'Materialize.showStaggeredList("#staggered-test")'
    }, {
      selector: '#image-test',
      offset: 500,
      callback: 'Materialize.fadeInImage("#image-test")'
    }];
    Materialize.scrollFire(options);
  },
  fullpage: function() {
    $('#fullpage').fullpage({
      sectionsColor: ['#434343'],
      anchors: ['firstPage', 'secondPage', '3rdPage'],
      menu: '#header',
      scrollingSpeed: 1000,
      scrollOverflow: true,
      keyboardScrolling: true,
      animateAnchor: true,
      recordHistory: true,
      navigation: true,
      navigationPosition: 'right',

      afterResize: function() {
        $('section .wrapper').each(function() {
          dc.centerContent($(this));
        });
      },
      onLeave: function(index, nextIndex, direction) {
        dc.checkInview(index, nextIndex, direction);
        dc.checkNav(index, nextIndex, direction);
        var count = 0;

        if (nextIndex === 3) {
          var ids = ['#we-are', '#we-will', '#we-give'];
          $(ids[count]).addClass('fadeUp');
          count += 1;
          $(ids[count]).hide();
          $(ids[count + 1]).hide();
          $('#companies').hide();

          var intervalId = setInterval(function() {
            if (count === 3) {
              $('#companies').show();
              $('#companies').addClass('fadeFromRight');
              clearInterval(intervalId);
            } else {
              $(ids[count]).show();
              $(ids[count]).addClass('fadeUp');
            }
            count++;
          }, 1000);
        } else {
          $('#we-are').removeClass('fadeUp');
        }
      }
    });
  },
  centerContent: function($container) {
    var winH = $(window).height();
    var containerH = $container.height();
    var padding = (winH - containerH) / 2;
    $container.css({
      'padding-top': padding
    });
  },
  checkInview: function(index, nextIndex, direction) {
    $('.inview').css("-webkit-transition-delay", '0ms').css("-o-transition-delay", '0ms').css("transition-delay", '0ms');
    $('.inview').removeClass('inview');
    var $section = $('.section').eq(nextIndex - 1);
    var delayData = $section.attr('data-delay');
    $section.find('.check-inview').each(function(i) {
      var delay = delayData * (i + 1);
      console.log('delay', delay);
      $(this).css("-webkit-transition-delay", delay + 'ms').css("-o-transition-delay", delay + 'ms').css("transition-delay", delay + 'ms');
      $(this).addClass('inview');
    });
  },
  checkNav: function(index, nextIndex, direction) {
    if (index == 2 && direction == 'down') {
      $('#header').removeClass('top');
    } else if (nextIndex == 2) {
      $('#header').addClass('top');
    }
  },
  countdown: function() {
    $('.countdown').downCount({
      date: '5/27/2015 23:59:59',
      offset: +0
    }, function() {
      alert('Sorry, we are no longer accepting orders right now!');
    });
  },
  init: function() {
    dc.getBrowserWindow();
    dc.scrollFire();
    dc.fullpage();
    $('section .wrapper').each(function() {
      dc.centerContent($(this));
    });
    dc.countdown();
  }
};

/* Modal Form Stuff */
$(document).ready(function() {

  dc.init();

  $('div.slimScrollBar').slimScroll({
      width: '300px',
      size: '50px',
      position: 'left',
      color: '#ffcc00',
      railVisible: false,
      railColor: '#222',
  });

  var $progressView = $('#progressView');
  var $successView = $('#successView');
  var $formView = $('#formView');

  $progressView.hide();
  $successView.hide();

  var appForm = $("#applicationForm");
  $("#applyBtn").on('click', function(e) {
    e.preventDefault();
    appForm.openModal();
  });
  appForm.on('submit', function(e) {
    e.preventDefault();
    var $this = $(this);
    var phone = $(this).find('#phone');
    var formData = {
      'entry.568454251'    : $.trim($(this).find('#name').val()),
      'entry.1388249163'   : $.trim($(this).find('#email').val()),
      'entry.1125549394'   : $.trim(phone.val()) ,
      'entry.1862649055' : $.trim($(this).find('#details').val()),
      draftResponse:[,,"6241827102495986109"],
      pageHistory:0,
      fbzx:6241827102495986109
    };

    //validate phone number
    if(!/^\+?[\d]+$/.test($.trim(phone.val()))){
      $('#errAlert').fadeIn('fast').delay(2500).fadeOut('fast');
      phone.focus();
      exit();
    }

    var formUrl = 'https://docs.google.com/forms/d/16f27i_hMbetjTq-jtwkyyQNtfmMAEomoPzpWd00WkIk/formResponse';

    $.ajax({
      type: 'POST',
      url: formUrl,
      data: formData,
      beforeSend: function() {
        $this.find('button').hide();
        $formView.fadeOut('fast', function() {
          $progressView.fadeIn('fast');
        });
      },
      complete: function(data) {
        $progressView.fadeOut('fast', function() {
          $successView.fadeIn('slow', function() {
            $this.show().delay(2000).fadeIn('fast', function() {

              // clear form
              $formView.find('#name').val('');
              $formView.find('#email').val('');
              $formView.find('#phone').val('');
              $formView.find('#details').val('');

              // close all modal and reset all views
              appForm.find('button').show();
              appForm.closeModal();
              $successView.hide();
              $formView.show();

            });
          });
        });
      }
    });
  });
});
