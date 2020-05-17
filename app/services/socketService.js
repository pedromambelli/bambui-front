/*==========================================================
Author      : Ranjithprabhu K
Date Created: 27 Dec 2015
Description : This service is to communicate with server for CRUD Operaions

Change Log
s.no      date    author     description
===========================================================*/

app.service('socketService', ['$http', '$q', 'appSettings', function ($http, $q, appSettings) {

  // console.log('heeeeeey');

  var socketService = io.connect(appSettings.socketServer)






  return socketService;

}]);
