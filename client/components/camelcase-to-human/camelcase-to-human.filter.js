'use strict';
const angular = require('angular');

/*@ngInject*/
export function camelcaseToHumanFilter() {
  return function(input) {
    let output = [];
    if(input.length > 0) {
      output.push(input[0].toUpperCase());
      for(let i = 1; i < input.length; i++) {
        if(input[i].toUpperCase() === input[i])
          output.push(' ');
        output.push(input[i]);
      }
    }
    return output.join('');
  };
}


export default angular.module('pandatestApp.camelcaseToHuman', [])
  .filter('camelcaseToHuman', camelcaseToHumanFilter)
  .name;
