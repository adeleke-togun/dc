'use strict'

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

  init: function () {
    dc.getBrowserWindow();
    dc.scrollFire();
  }
};

// TIMER CODE BLOCK
var deadLineDate = new Date(2015, 4, 27, 23, 59, 59); // May 27th, 23:59:59 PM

var timerId = countdown(deadLineDate, function(ts) {
  document.getElementById('clock-timer').innerHTML = ts.toHTML("span");
}, countdown.DEFAULTS);

// later on this timer may be  with the right condition
if (false) {
  window.clearInterval(timerId);
}

$(document).ready(dc.init);