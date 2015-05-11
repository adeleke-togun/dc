'use strict';

var dc = {
  getBrowserWindow: function () {
    var width = $(window).width();
    window.onresize = function() {
      width = $(window).width();
      console.log(width);
    };
  },

  scrollFire: function(){
		var options = [
	    {selector: '#staggered-test', offset: 400, callback: 'Materialize.showStaggeredList("#staggered-test")' },
	    {selector: '#image-test', offset: 500, callback: 'Materialize.fadeInImage("#image-test")' }
	  ];
	  Materialize.scrollFire(options);
  },

  fullpage: function () {
    $('#fullpage').fullpage({
      sectionsColor: ['transparent', 'transparent', 'transparent'],
      anchors: ['firstPage', 'secondPage', '3rdPage'],
      menu: '#menu',
      scrollingSpeed: 600
    });
  },

  init: function () {
    dc.getBrowserWindow();
    dc.scrollFire();
    dc.fullpage();
  }
};

$(document).ready(dc.init);
