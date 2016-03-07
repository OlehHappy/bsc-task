import angular from 'angular';
import uiRouter from 'angular-ui-router';
import noteFactory from 'factories/note-factory';
import notesController from 'controllers/notes';

const app = angular.module('app', [uiRouter, noteFactory.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            template: require('html/notes.html'),
            controller: notesController
        });

    $locationProvider.html5Mode(true);
});

export default app;
