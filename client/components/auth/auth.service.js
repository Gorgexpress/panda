'use strict';
//@flow

import angular from 'angular';

/**
 * The Util service is for thin, globally reusable, utility functions
 */
export function AuthService($http, $q) {
  'ngInject';
  var currentUser = null;
  var Auth = {
    login({email, password}, callback?: Function) {
      return $http.post('/auth', {email, password})
        .then(res => {
          currentUser = res.data;
          return {
            success: true,
            userInfo: res.data
          };
        })
        .catch(err => $q.reject({
          success: false,
          message: err.data
        }));
    },

    logout() {
      currentUser = null;
    },

    isLoggedIn() {
      return currentUser !== null;
    },

    getUser() {
      return Object.assign({}, currentUser);
    },
    setUser(user) {
      console.log(user);
      currentUser = user;
    }
  };

  return Auth;
}
