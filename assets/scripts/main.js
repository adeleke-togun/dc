'use strict'

var dc = {
  getBrowserWindow: function () {
    var width = $(window).width();
    window.onresize = function() {
      width = $(window).width();
      console.log(width);
    };
  },

  /*scrollFire: function(){
		var options = [
	    {selector: '#staggered-test', offset: 400, callback: 'Materialize.showStaggeredList("#staggered-test")' },
	    {selector: '#image-test', offset: 500, callback: 'Materialize.fadeInImage("#image-test")' }
	  ];
	  Materialize.scrollFire(options);
  },*/

  fullpage: function () {
    $('#fullpage').fullpage({
      anchors: ['firstPage', 'secondPage', '3rdPage'],
      menu: '#menu',
      sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
      navigation: true,
      navigationPosition: 'right'
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

  init: function () {
    dc.getBrowserWindow();
    //dc.scrollFire();
    dc.fullpage();
    dc.countdown();
  }
};

$(document).ready(dc.init);
