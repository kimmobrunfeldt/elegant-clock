'use strict';

jQuery.fn.rotate = function(degrees) {
  $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
               '-moz-transform' : 'rotate('+ degrees +'deg)',
               '-ms-transform' : 'rotate('+ degrees +'deg)',
               'transform' : 'rotate('+ degrees +'deg)'});
};

angular.module('elegantClockApp')
  .controller('MainCtrl', function ($scope) {

    var Clock = (function() {

      var timer;
      var time = moment().unix();

      function render(animate) {
        var now = moment.unix(time);

        var hour = parseInt(now.format('h'), 10);
        setHourPointer(hour, animate);
        setMinutePointer(now.minute(), animate);
        setSecondPointer(now.second(), animate);
      }

      function setHourPointer(hour, animate) {
        // Hour is in 24 format, must be converted to 0 - 12
        var rotation = hour / 12 * 360 - 180;
        if (animate) {
          $('.clock-hour-pointer').stop().transition({rotate: rotation});
        } else {
          $('.clock-hour-pointer').rotate(rotation);
        }
      }

      function setMinutePointer(minute, animate) {
        var rotation = minute / 60 * 360 - 180;
        if (animate) {
          $('.clock-minute-pointer').stop().transition({rotate: rotation});
        } else {
          $('.clock-minute-pointer').rotate(rotation);
        }
      }

      function setSecondPointer(second, animate) {
        var rotation = second / 60 * 360 - 180;
        if (animate) {
          $('.clock-second-pointer').stop().transition({rotate: rotation});
        } else {
          $('.clock-second-pointer').rotate(rotation);
        }
      }

      return {
        start: function() {
          timer = setInterval(function() {
            time += 1;
            render(true);
          }, 1000);
        },
        render: render,
        stop: function() {
          if (timer) {
            clearInterval(timer);
          }
        }
      };
    })();

    $scope.init = function() {
      Clock.start();
    };
  });
