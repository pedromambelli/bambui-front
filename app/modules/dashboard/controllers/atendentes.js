angular.module('dashboard').controller('AtendentesController', ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state, $location, dashboardService, Flash) {
  var vm = this;

  vm.atendentesList = [
    {
      nome: 'Maria Aparecida',
      cpf: '123.456.789-10',
      pontosDistribuidos: 500,
      email: 'email@exemplo.com'
    }, {
      nome: 'Lucas Antônio',
      cpf: '123.456.789-11',
      pontosDistribuidos: 200,
      email: 'email@exemplo.com'
    }, {
      nome: 'Anderson Marques',
      cpf: '123.456.789-12',
      pontosDistribuidos: 350,
      email: 'email@exemplo.com'
    }, {
      nome: 'Rogéria Joana',
      cpf: '123.456.789-13',
      pontosDistribuidos: 800,
      email: 'email@exemplo.com'
    }, {
      nome: 'Jefferson Rodrigo',
      cpf: '123.456.789-14',
      pontosDistribuidos: 600,
      email: 'email@exemplo.com'
    },
  ]

  vm.form = {
    visible : false,
    show() {
      vm.crud.target.isNew = true
      vm.form.visible = true
    },
    hide() {
      vm.crud.clear()
      vm.form.visible = false
    }
  }

  vm.table = {
    order: 'nome',
    filter: '',
    selectedRows: [],
    count: vm.atendentesList.length,
    onRowSelect(target) {
      vm.crud.target = target
      vm.form.visible = true

      target.isNew = false
    },
    onRowDeselect() {
      vm.crud.target = {}
      vm.form.visible = false
      this.selectedRows = []
    }
  }
  vm.crud = {
    target: {},
    clear() {
      vm.table.selectedRows = []
      console.log("clear");
      this.target = {}
      
    },
    add() {
      console.log('add');
      if (this.target.isNew) {
        this.target.pontosDistribuidos = 0
        vm.atendentesList.push(this.target)
      }
      this.clear()
      vm.form.visible = false
      vm.table.count = vm.atendentesList.length
    },
    setToDelete(target) {
      vm.crud.toDelete = vm.atendentesList.indexOf(target)

      console.log('i', vm.crud.toDelete)
      setTimeout(this.deleteSelected(), 100)
    },
    deleteSelected() {
      const confirmation = confirm('Deseja remover: ' + vm.atendentesList[vm.crud.toDelete].nome)
      if (confirmation) {
        vm.atendentesList.splice(vm.crud.toDelete, 1)

        vm.table.count = vm.atendentesList.length
      }
      else {
        this.clear()
      }
    }
  }

  console.log("coming to Atendentes controller");
  

}]);
