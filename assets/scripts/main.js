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
      responsive: 200,
      scrollingSpeed: 1000,
      afterResize: function() {
        $('section .wrapper').each(function() {
          dc.centerContent($(this));
        });
      },
      onLeave: function(index, nextIndex, direction) {
        console.log('on leave', index, nextIndex);
        dc.checkInview(index, nextIndex, direction);
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
  countdown: function() {
    $('.countdown').downCount({
      date: '5/27/2015 23:59:59',
      offset: +0
    }, function() {
      alert('Sorry, we are no longer accepting others right now!');
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
$(document).ready(dc.init);


/* Modal Form Stuff */
$(document).ready(function(){

  var $progressView = $('#progressView');
  var $successView = $('#successView');
  var $formView = $('#formView');

  $progressView.hide();
  $successView.hide();

  var appForm = $("#applicationForm");

  $("#applyBtn").on('click', function(e){
    e.preventDefault();
    appForm.openModal();
  });

  appForm.on('submit', function(e){
    e.preventDefault();
    var $this = $(this);
    var formData = {
      'entry.568454251'    : $.trim($(this).find('#name').val()),
      'entry.1388249163'   : $.trim($(this).find('#email').val()),
      'entry.1125549394'   : $.trim($(this).find('#phone').val()),
      'entry.1862649055' : $.trim($(this).find('#details').val()),
      draftResponse:[,,"6241827102495986109"],
      pageHistory:0,
      fbzx:6241827102495986109
    };

    var formUrl = 'https://docs.google.com/forms/d/16f27i_hMbetjTq-jtwkyyQNtfmMAEomoPzpWd00WkIk/formResponse';

    $.ajax({
      type: 'POST',
      url: formUrl,
      data: formData,
      beforeSend: function(){
        $this.find('button').hide();
        $formView.fadeOut('fast', function(){
          $progressView.fadeIn('fast');
        });
      },
      complete: function(data){
        $progressView.fadeOut('fast', function(){
          $successView.fadeIn('slow', function(){
            $this.show().delay(2000).fadeIn('fast', function(){

              // clear form
              $formView.find('#name').val('');
              $formView.find('#email').val('');
              $formView.find('#phone').val('');
              $formView.find('#details').val('');

              // close all modal and reset all views
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
