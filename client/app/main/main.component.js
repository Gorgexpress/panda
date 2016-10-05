import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  Modal;
  Auth;
  awesomeThings = [];


  /*@ngInject*/
  constructor($http, Modal, Auth) {
    this.$http = $http;
    this.Modal = Modal;
    this.Auth = Auth;
    this.editEnabled = false;
    this.userInfo = {};
    this.editPassword = false;
  }

  $onInit() {
    this.$http.get('/api/init')
      .then(response => {
        if(response.data){
          this.Auth.setUser(response.data);
          this.userInfo = response.data;
        }
      });
  }

  login() {
    this.Modal.input.login(response => {
      if(!response.success)
        this.Modal.confirm.error()(response.message);
      else
        this.userInfo = response.userInfo;
    })();
  }

  toggleEditMode() {
    if(!this.editEnabled)
      this.editEnabled = true;
    else {
      this.editEnabled = false;
      this.editPassword = false;
      this.userInfo = this.Auth.getUser();
    }
  }

  toggleEditPassword() {
    this.editPassword = !this.editPassword;
  }

  edit(isValid) {
    if(isValid)
      this.Modal.confirm.edit(args => {
        this.$http.put('/api/edit', this.userInfo)
          .then(response => {
            this.Auth.setUser(response.data);
            this.userInfo = response.data;
            this.toggleEditMode();
            this.Modal.confirm.success()('Account successfully updated!');
          })
          .catch(err => {
            this.Modal.confirm.error()(err.data)
          });
      })();
    else
      this.Modal.confirm.error()('form invalid');
  }
}

export default angular.module('pandaApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
