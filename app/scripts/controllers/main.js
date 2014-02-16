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

      function render() {
        var hour = moment().hour();
        setHourPointer(hour);

        var minute = moment().minute();
        setMinutePointer(minute);

        var second = moment().second();
        setSecondPointer(second);
      }

      function setHourPointer(hour) {
        var rotation = hour / 23 * 360;
        $('.clock-hour-pointer').rotate(rotation);
      }

      function setMinutePointer(minute) {
        var rotation = minute / 59 * 360;
        $('.clock-minute-pointer').rotate(rotation);
      }

      function setSecondPointer(second) {
        var rotation = second / 59 * 360;
        $('.clock-second-pointer').rotate(rotation);
      }

      return {
        start: function() {
          timer = setInterval(function() {
            render();
          }, 1000);
        },
        stop: function() {
          if (timer) {
            clearInterval(timer);
          }
        }
      };
    })();

    Clock.start();

    $scope.lol = 'test';
  });
