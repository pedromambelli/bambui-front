/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 24 Dec 2015
    Description : Base for Dashboard Application module

    Change Log
    s.no      date    author     description


 ===========================================================*/

var dashboard = angular.module('dashboard', ['ui.router', 'ngAnimate','ngMaterial']);


dashboard.config(["$stateProvider", function ($stateProvider) {

    //Atendentes home page state
    $stateProvider.state('app.atendentes', {
        url: '/atendentes',
        templateUrl: 'app/modules/dashboard/views/atendentes.html',
        controller: 'AtendentesController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Atendentes'
        }
    });

    //Clientes page state
    $stateProvider.state('app.clientes', {
        url: '/',
        templateUrl: 'app/modules/dashboard/views/clientes.html',
        controller: 'ClientesController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Clientes'
        }
    });

    //Serviços page state
    $stateProvider.state('app.pontos', {
        url: '/pontos',
        templateUrl: 'app/modules/dashboard/views/pontos.html',
        controller: 'PontosController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Pontos'
        }
    });

    //Contratos page state
    $stateProvider.state('app.premios', {
        url: '/premios',
        templateUrl: 'app/modules/dashboard/views/premios.html',
        controller: 'PremiosController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Premios'
        }
    });

   



}]);
