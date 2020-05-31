angular.module('dashboard').controller('PontosController', ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state, $location, dashboardService, Flash) {
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

    return gerarCPF()
  }

  const makeDateDaysAgo = (days) => {
    var ourDate = new Date()

    //Change it so that it is 7 days in the past.
    var pastDate = ourDate.getDate() - days
    ourDate.setDate(pastDate);
    return ourDate.toLocaleString("pt-BR").split(' ')[0]
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
        const data = faker.date.between(makeDateDaysAgo(60), new Date()).toLocaleString("pt-BR").split(' ')[0]
        const op = {
          data,
          pontos: faker.random.number({ min: 10, max: 200 })
        }
        historico.push(op)
      }
      cliente.historico = historico
      list.push(cliente)
    }
    console.log(list)
    return list
  }
  const makeHistoricoPontos = (clientesList) => {
    const list = []
    for (let cliente of clientesList) {
      for (const op of cliente.historico) {
        const newOp = Object.assign({}, op, { nomeCliente: cliente.nome})
        list.push(newOp)
      }
    }
    console.log(list)
    return list
  }

  const makeLineData = (input) => {
    const sumary = {}
    for (const el of input) {
      if (sumary[el.data]) {
        sumary[el.data].total += el.pontos
      } else {
        sumary[el.data] = {
          total : el.pontos
        }
      }
    }
    let data = []
    for (const date in sumary) {
      if (sumary.hasOwnProperty(date)) {
        const el = sumary[date];
        data.push({
          date: parseDate(date).getTime(),
          value: el.total
        })
      }
    }
    return data
  }

  const makeOpcoesVigencia = () => {
    return [
      {
        name: 'Diário',
        dateFrom: makeDateDaysAgo(1)
      },
      {
        name: 'Semanal',
        dateFrom: makeDateDaysAgo(7)
      },
      {
        name: 'Mensal',
        dateFrom: makeDateDaysAgo(31)
      }
    ]
     
  }

  vm.opcoesVigencia = makeOpcoesVigencia()
  vm.historico = makeHistoricoPontos(makeClientesList())
 

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
    order: 'data',
    filter: '',
    selectedRows: [],
    count: vm.historico.length,
    sumPontos: vm.historico.reduce((acc, el) =>
      acc + el.sumPontos
      , 0),
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
      console.log("clear")
      this.target = {}

    },
    add() {
      console.log('add')
      if (this.target.isNew) {
        this.target.pontosDistribuidos = 0
        vm.historico.push(this.target)
      }
      this.clear()
      vm.form.visible = false
      vm.table.count = vm.historico.length
    },
    setToDelete(target) {
      vm.crud.toDelete = vm.historico.indexOf(target)

      console.log('i', vm.crud.toDelete)
      setTimeout(this.deleteSelected(), 100)
    },
    deleteSelected() {
      const confirmation = confirm('Deseja remover: ' + vm.historico[vm.crud.toDelete].nome)
      if (confirmation) {
        vm.historico.splice(vm.crud.toDelete, 1)

        vm.table.count = vm.historico.length
      }
      else {
        this.clear()
      }
    }
  }
  vm.vigencia = vm.opcoesVigencia[0]
  vm.selectedDate = vm.vigencia.dateFrom.toString()
  vm.setDateFrom = () => {
    vm.dateFrom = parseDate(vm.selectedDate)
  }

  $scope.startPontosChart = () => {
    new Morris.Line({
      // ID of the element in which to draw the chart.
      element: 'pontosChart',
      // Chart data records -- each entry in this array corresponds to a point on
      // the chart.
      data: makeLineData(vm.historico).filter((x) => {
        return new Date(x.date).getTime() > parseDate(makeDateDaysAgo(30)).getTime()
      }),
      // The name of the data record attribute that contains x-values.
      xkey: 'date',
      // A list of names of data record attributes that contain y-values.
      ykeys: ['value'],
      // Labels for the ykeys -- will be displayed when you hover over the
      // chart.
      labels: ['Pontos'],
      hideHover: true,
      dateFormat: (x) => {
        return new Date(x).toLocaleString("pt-BR").split(' ')[0]
      }
    });
  }
  



  vm.dateFrom = parseDate(makeDateDaysAgo(1))
  vm.dateTo = new Date()
  console.log("coming to Pontos controller");

}]);

function parseDate(input) {
  var parts = input.split('/')

  return new Date(parts[2], parts[1] - 1, parts[0])
}

angular.module('dashboard').filter("dateFilter", function () {
  return function (items, from, to) {
    console.log('items', items)
    console.log('from', from)
    console.log('to', to)
    var result = []
    for (var i = 0; i < items.length; i++) {
      var date = parseDate(items[i].data)
      if (date > from && date < to) {
        result.push(items[i])
      }
    }

    console.log('result', result)
    return result
  }
})
