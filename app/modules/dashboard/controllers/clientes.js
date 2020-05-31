angular.module('dashboard').controller('ClientesController', ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$mdDialog',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $mdDialog) {
  var vm = this;
  faker.locale = 'pt_BR'

  const makeCpf = () => {
    function randomiza(n) {
      var ranNum = Math.round(Math.random() * n)
      return ranNum
    }

    function mod(dividendo, divisor) {
      return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor))
    }

    function gerarCPF() {
      comPontos = true // TRUE para ativar e FALSE para desativar a pontuação.

      var n = 9
      var n1 = randomiza(n)
      var n2 = randomiza(n)
      var n3 = randomiza(n)
      var n4 = randomiza(n)
      var n5 = randomiza(n)
      var n6 = randomiza(n)
      var n7 = randomiza(n)
      var n8 = randomiza(n)
      var n9 = randomiza(n)
      var d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10
      d1 = 11 - (mod(d1, 11))
      if (d1 >= 10) d1 = 0
      var d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11
      d2 = 11 - (mod(d2, 11))
      if (d2 >= 10) d2 = 0
      retorno = ''
      if (comPontos) cpf = '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2
      else cpf = '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2

      return cpf
    }

    return gerarCPF();
  }

  const makeClientesList = (size = 10, historicoSize = 20) => {
    const list = []
    for (let index of Array(size).keys()) {
      const nome = faker.name.findName()
      const email = nome.toLowerCase().split(" ").join('') + "@mail.com"
      const cliente = {
        nome,
        cpf: makeCpf(),
        email,
        phone: faker.phone.phoneNumber(),
        sumPontos: faker.random.number()
      }
      const historico = []
      for (const jindex of Array(historicoSize)) {
        const op = {
          data: faker.date.between('2020-01-01', '2020-04-30').toLocaleString("pt-BR").split(',')[0],
          pontos: faker.random.number({min: 10, max: 200})
        }
        historico.push(op)
      }
      cliente.historico = historico
      list.push(cliente)
    }
    console.log(list)
    return list
  }

  vm.clientesList = makeClientesList(50,10)

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
      console.log(target)
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
