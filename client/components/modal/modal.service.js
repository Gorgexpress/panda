'use strict';

import angular from 'angular';

export function Modal($rootScope, $uibModal, Auth) {
  /**
   * Opens a modal
   * @param  {Object} scope      - an object to be merged with modal's scope
   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
   * @return {Object}            - the instance $uibModal.open() returns
   */
  function openModal(scope = {}, modalClass = 'modal-default') {
    var modalScope = $rootScope.$new();

    angular.extend(modalScope, scope);

    return $uibModal.open({
      template: require('./modal.html'),
      windowClass: modalClass,
      scope: modalScope
    });
  }

  // Public API here
  return {

    /* Confirmation modals */
    confirm: {

      /**
       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      delete(del = angular.noop) {
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function() {
          var args = Array.prototype.slice.call(arguments);
          var name = args.shift();
          var deleteModal;

          deleteModal = openModal({
            modal: {
              dismissable: true,
              title: 'Confirm Delete',
              html: `<p>Are you sure you want to delete <strong>${name}</strong> ?</p>`,
              buttons: [{
                classes: 'btn-danger',
                text: 'Delete',
                click(e) {
                  deleteModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click(e) {
                  deleteModal.dismiss(e);
                }
              }]
            }
          }, 'modal-danger');

          deleteModal.result.then(function(event) {
            del.apply(event, args);
          });
        };
      },

      edit(ed = angular.noop) {

        return function() {
          var args = Array.prototype.slice.call(arguments);
          var name = args.shift();
          var editModal;

          editModal = openModal({
            modal: {
              dismissable: true,
              title: 'Confirm Delete',
              html: `<p>Are you sure you want to make these changes ?</p>`,
              buttons: [{
                classes: 'btn-default',
                text: 'Yes',
                click(e) {
                  editModal.close(e);
                }
              }, {
                classes: 'btn-danger',
                text: 'No',
                click(e) {
                  editModal.dismiss(e);
                }
              }]
            }
          }, 'modal-danger');

          editModal.result.then(function(event) {
            ed(args);
          });

        };
      },
      error(err = angular.noop) {
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function() {
          var args = Array.prototype.slice.call(arguments);
          var name = args.shift();
          var errorModal;

          errorModal = openModal({
            modal: {
              dismissable: true,
              title: 'Error',
              html: `<p>${name}</p>`,
              buttons: [{
                classes: 'btn-danger',
                text: 'OK',
                click(e) {
                  errorModal.close(e);
                }
              }]
            }
          }, 'modal-danger');

          errorModal.result.then(function(event) {
            err(args);
          });
        };
      },
      success(succ = angular.noop) {
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function() {
          var args = Array.prototype.slice.call(arguments);
          var message = args.shift();
          var successModal;

          successModal = openModal({
            modal: {
              dismissable: true,
              title: 'Success',
              html: `<p>${message}</p>`,
              buttons: [{
                classes: 'btn-primary',
                text: 'OK',
                click(e) {
                  successModal.close(e);
                }
              }]
            }
          }, 'modal-primary');

          successModal.result.then(function(event) {
            succ(args);
          });
        };
      },
    },

    input: {
      login(log = angular.noop) {
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function() {
          var args = Array.prototype.slice.call(arguments);
          var name = args.shift();
          var loginModal;
          var modalData = {}; 
          loginModal = openModal({
            modal: {
              data: modalData,
              form: true,
              dismissable: true,
              title: 'Login',
              html: `<p>Enter credentials</p>`,
              buttons: [{
                classes: 'btn-default',
                text: 'Login',
                click(e) {
                  loginModal.close(e);
                }
              }, {
                classes: 'btn-danger',
                text: 'Cancel',
                click(e) {
                  loginModal.dismiss(e);
                }
              }]
            }
          }, 'modal-primary');

          loginModal.result.then(function(event) {
            Auth.login({email: modalData.email, password: modalData.password})
              .then(response => log(response))
              .catch(err => log(err));
          });
        };

      }
    }
  };
}

export default angular.module('pandaApp.Modal', [])
  .factory('Modal', Modal)
  .name;
