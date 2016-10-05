'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';

import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import Modal from '../components/modal/modal.service';
import Auth from '../components/auth/auth.module';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import camelcaseToHuman from '../components/camelcase-to-human/camelcase-to-human.filter';
import inputType from '../components/input-type/input-type.filter';
import calendar from './calendar/calendar.component';

import './app.scss';

angular.module('pandaApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap, navbar,
    footer, main, constants, util, Auth, Modal, camelcaseToHuman, inputType, calendar
  ])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['pandaApp'], {
      strictDi: false
    });
  });
