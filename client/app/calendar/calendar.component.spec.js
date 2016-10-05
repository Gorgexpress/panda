'use strict';

describe('Component: calendar', function() {
  // load the component's module
  beforeEach(module('pandatestApp.calendar'));

  var calendarComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    calendarComponent = $componentController('calendar', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
