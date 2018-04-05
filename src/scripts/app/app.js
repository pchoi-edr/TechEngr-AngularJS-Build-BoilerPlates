'use strict';

(function (window, angular) {
  require('./controllers/_loader');
  require('./directives/_loader');
  require('./services/_loader');

  console.log('hello');
  /**
   * Register main angular app
   */
  angular.module('edrapp', ['ngSanitize', 'ui.router', 'mCtrls', 'mDirectives', 'mServices'])
    .config(function () {

    });

})(window, window.angular);
