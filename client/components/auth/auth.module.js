'use strict';

import angular from 'angular';
import {
  AuthService
} from './auth.service';

export default angular.module('pandaApp.auth', [])
  .factory('Auth', AuthService)
  .name;
