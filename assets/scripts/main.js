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

