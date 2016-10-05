'use strict';
const angular = require('angular');

/*@ngInject*/
export function inputTypeFilter() {
  return function(input) {
    input = input.toLowerCase();
    if(input.includes('email'))
      return 'email';
    if(input.includes('password'))
      return 'password';
    return 'text';
  };
}


export default angular.module('pandatestApp.inputType', [])
  .filter('inputType', inputTypeFilter)
  .name;
