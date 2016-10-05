'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('calendar', {
    url: '/calendar',
    template: '<calendar></calendar>'
  });
}
