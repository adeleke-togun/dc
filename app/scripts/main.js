'use strict';
// TIMER CODE BLOCK
var deadLineDate = new Date(2015, 4, 27, 23, 59, 59); // May 27th, 23:59:59 PM

var timerId = countdown(deadLineDate, function(ts) {
  document.getElementById('clock-timer').innerHTML = ts.toHTML("span");
}, countdown.DEFAULTS);

// later on this timer may be  with the right condition
if (false) {
  window.clearInterval(timerId);
}
