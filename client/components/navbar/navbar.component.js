'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  Auth;
  Modal;

  menu = [{
    title: 'Settings',
    state: 'main',
  }, {
    title: 'Calendar',
    state: 'calendar'
  }];
  isCollapsed = true;

  /*@ngInject*/
  constructor(Auth, Modal) {
    this.Auth = Auth;
    this.Modal = Modal;
  }

  login() {
    this.Modal.input.login(response => {
      if(!response.success)
        this.Modal.confirm.error()(response.message);
    })();
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
