'use strict';

describe('Filter: camelcaseToHuman', function() {
  // load the filter's module
  beforeEach(module('pandatestApp.camelcase-to-human'));

  // initialize a new instance of the filter before each test
  var camelcaseToHuman;
  beforeEach(inject(function($filter) {
    camelcaseToHuman = $filter('camelcaseToHuman');
  }));

  it('should return the input prefixed with "camelcaseToHuman filter:"', function() {
    var text = 'angularjs';
    expect(camelcaseToHuman(text)).to.equal('camelcaseToHuman filter: ' + text);
  });
});
