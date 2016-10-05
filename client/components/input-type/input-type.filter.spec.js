'use strict';

describe('Filter: inputType', function() {
  // load the filter's module
  beforeEach(module('pandatestApp.inputType'));

  // initialize a new instance of the filter before each test
  var inputType;
  beforeEach(inject(function($filter) {
    inputType = $filter('inputType');
  }));

  it('should return the input prefixed with "inputType filter:"', function() {
    var text = 'angularjs';
    expect(inputType(text)).to.equal('inputType filter: ' + text);
  });
});
