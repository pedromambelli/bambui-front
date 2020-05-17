angular.module('dashboard').controller('ClientesController', ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$mdDialog',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $mdDialog) {
  var vm = this;

  vm.clientesList = [
    {
      nome: 'Ana Paula de Jó',
      cpf: '321.654.987-01',
      email: 'anapaula@mail.com',
      phone: '(35) 99988- 7654',
      sumPontos: 100,
      historicoPontos: [
        {
          data: '25/01/2020',
          pontos: 25
        },
        {
          data: '25/02/2020',
          pontos: 30
        },
        {
          data: '23/03/2020',
          pontos: 25
        },
        {
          data: '04/04/2020',
          pontos: -20
        }
      ]
    },
    {
      nome: 'Isaías Ribeiro',
      cpf: '321.654.987-05',
      email: 'isaias@mail.com',
      phone: '(35) 99988- 7654',
      sumPontos: 150,
      historicoPontos: [
        {
          data: '25/01/2020',
          pontos: 125
        },
        {
          data: '25/02/2020',
          pontos: -30
        },
        {
          data: '23/03/2020',
          pontos: 25
        },
        {
          data: '04/04/2020',
          pontos: 20
        }
      ]
    },
    {
      nome: 'Paulo Serafim',
      cpf: '321.654.987-09',
      email: 'paulo@mail.com',
      phone: '(35) 99988- 7654',
      sumPontos: 75,
      historicoPontos: [
        {
          data: '25/02/2020',
          pontos: 30
        },
        {
          data: '23/03/2020',
          pontos: -25
        },
        {
          data: '04/04/2020',
          pontos: 20
        }
      ]
    },
    {
      nome: 'Jaqueline Solange',
      cpf: '321.654.987-13',
      email: 'ja.queline@mail.com',
      phone: '(35) 99988- 7654',
      sumPontos: 120,
      historicoPontos: [
        {
          data: '10/01/2020',
          pontos: 25
        },
        {
          data: '25/02/2020',
          pontos: 50
        },
        {
          data: '23/03/2020',
          pontos: -25
        },
        {
          data: '04/04/2020',
          pontos: 20
        }
      ]
    }
  ]

  vm.form = {
    visible: false,
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
    count: vm.clientesList.length,
    sumPontos: vm.clientesList.reduce((acc, el) => 
      acc + el.sumPontos
    , 0) ,
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
  vm.subtable = {
    order: 'nome',
    filter: '',
    selectedRows: []
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
        vm.clientesList.push(this.target)
      }
      this.clear()
      vm.form.visible = false
      vm.table.count = vm.clientesList.length
    },
    setToDelete(target) {
      vm.crud.toDelete = vm.clientesList.indexOf(target)

      console.log('i', vm.crud.toDelete)
      setTimeout(this.deleteSelected(), 100)
    },
    deleteSelected() {
      const confirmation = confirm('Deseja remover: ' + vm.clientesList[vm.crud.toDelete].nome)
      if (confirmation) {
        vm.clientesList.splice(vm.crud.toDelete, 1)

        vm.table.count = vm.clientesList.length
      }
      else {
        this.clear()
      }
    }
  }
  




  console.log("coming to Clientes controller");
  // console.log(socketService);


}]);
