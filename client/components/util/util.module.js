'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('pandaApp.util', [])
  .factory('Util', UtilService)
  .name;
