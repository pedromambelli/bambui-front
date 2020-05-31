angular.module('dashboard').controller('PremiosController', ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash',
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

  const makeDescription = (name) => {
    return `${name} é maravilhoso
    imagine aqui uma linda descrição
    `
  }

  const makeFakeImageList = (size = 3) => {
    let images = []
    for (let index of Array(size).keys()) {
      images.push(faker.image.imageUrl())
    }
    return images
  }
 
  const makePremiosList = (size = 10, pointsRate = 5) => {
    const list = []
    for (let index of Array(size).keys()) {
      const nome = faker.commerce.productName()
      const email = nome.toLowerCase().split(" ").join('') + "@mail.com"
      const custoLoja = faker.random.number({ min: 5, max: 200 })
      const premio = {
        nome,
        images: makeFakeImageList(faker.random.number({ min: 2, max: 5 })),
        custoCliente: custoLoja * pointsRate,
        custoLoja,
        quantidadeResgatada: faker.random.number({ min: 0, max: 20 }),
        descricao: makeDescription(nome)
      }
      
      list.push(premio)
    }
    console.log(list)
    return list
  }

  vm.premiosList = makePremiosList()

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
    count: vm.premiosList.length,
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
    removeImage(index) {
      this.target.images.splice(index, 1)
    },
    clear() {
      vm.table.selectedRows = []
      console.log("clear")
      this.target = {
        images: [],
        custoLoja: 0
      }

    },
    add() {
      console.log('add')
      if (this.target.isNew) {
        this.target.pontosDistribuidos = 0
        vm.premiosList.push(this.target)
      }
      this.clear()
      vm.form.visible = false
      vm.table.count = vm.premiosList.length
    },
    setToDelete(target) {
      vm.crud.toDelete = vm.premiosList.indexOf(target)

      console.log('i', vm.crud.toDelete)
      setTimeout(this.deleteSelected(), 100)
    },
    deleteSelected() {
      const confirmation = confirm('Deseja remover: ' + vm.premiosList[vm.crud.toDelete].nome)
      if (confirmation) {
        vm.premiosList.splice(vm.crud.toDelete, 1)

        vm.table.count = vm.premiosList.length
      }
      else {
        this.clear()
      }
    }
  }
  
  $scope.imageUpload = function (event) {
    var files = event.target.files //FileList object

    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      var reader = new FileReader()
      reader.onload = $scope.imageIsLoaded
      reader.readAsDataURL(file)
    }
  }

  $scope.imageIsLoaded = function (e) {
    $scope.$apply(function () {
      if (vm.crud.target.images.length < 5)
        vm.crud.target.images.push(e.target.result)
    })
  }
  $(document).ready(function () {
    $('.image-carousel').slick({
      items: 1
    })
    
  })
  console.log("coming toPremios controller");

}]);
