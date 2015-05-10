<<<<<<< HEAD
'use strict'

var dc = {
  getBrowserWindow: function () {
    var width = $(window).width();
    window.onresize = function() {
      width = $(window).width();
      console.log(width);
    };
  },

  init: function () {
    dc.getBrowserWindow();
  }
};

$(document).ready(dc.init);

=======
$(document).ready(function(){
	var options = [
    {selector: '#staggered-test', offset: 400, callback: 'Materialize.showStaggeredList("#staggered-test")' },
    {selector: '#image-test', offset: 500, callback: 'Materialize.fadeInImage("#image-test")' }
  ];
  Materialize.scrollFire(options);
});
>>>>>>> link components
