'use strict';
//@flow

import angular from 'angular';

/**
 * The Util service is for thin, globally reusable, utility functions
 */
export function AuthService($http) {
  'ngInject';
  var currentUser = null;
  var Auth = {
    login({email, password}, callback?: Function) {
      return $http.post('/auth/panda', {email, password})
        .then(res => {
          currentUser = res.data.user;
        })
        .catch(err => {
          currentUser = null;
        });
    },

    logout() {
      currentUser = null;
    },

    isLoggedIn() {
      return currentUser !== null;
    }
  };

  return Auth;
}
