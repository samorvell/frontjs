let url = "http://pinteligente.ddns.net:30100/api/lancamentos"
let data = new Date
let pegatoken = localStorage.getItem('token')
let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')
function dataFixa() {
  var data = new Date(),
    day = data.getDate().toString().padStart(2, '0'),
    mouth = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
    year = data.getFullYear(),
    hour = data.getHours(),
    minute = data.getMinutes(),
    second = data.getSeconds();

  if (second <= 9) {
    second = "0" + second
  } else {
    second = second
    minute = minute
  }
  if (minute <= 9) {
    minute = "0" + minute
  } else {
    minute = minute
  }
  if (hour <= 9) {
    hour = "0" + hour
  } else {
    hour = hour
  }
  if (day <= 9) {
    day = "0" + day
  } else {
    day = day
  }
  if (minute <= 9) {
    mouth = "0" + mouth
  } else {
    mouth = mouth
  }
  ftdate = year + '-' + mouth + '-' + day + " " + hour + ':' + minute + ':' + second

  document.getElementById("data").value = ftdate
}
dataFixa()

function fazPost(url, body) {


  let request = new XMLHttpRequest()
  request.open("POST", url, true)
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer " + pegatoken)
  request.send(JSON.stringify(body))
  


  request.onload = function () {
    let inputFuncionarioId = document.querySelector('#funcionarioId')
    let labelFuncionarioId = document.querySelector('#labelFuncionarioId')
    let inputDescricao = document.querySelector('#descricao')
    let labelDescricao = document.querySelector('#labelDescricao')
    let selectTipo = document.querySelector('#tipo')

    // console.log(this.responseText)
    //console.log(request.status)
    if (request.status == 401) {
      labelFuncionarioId.setAttribute('style', 'color: red')
      inputFuncionarioId.setAttribute('style', 'border-color: red')
      inputDescricao.setAttribute('style', 'color: red')
      labelDescricao.setAttribute('style', 'border-color: red')
      selectTipo.setAttribute('style', 'border-color: red')
      msgError.setAttribute('style', 'display: block')
      msgError.innerHTML = 'Por favor fazer login novamente'
      inputFuncionarioId.focus()

    } else {

      //let datatoken = JSON.parse(this.responseText)//JSON.parse para converter json para strint literal
      //console.log(tokenl)
      //validToken = (datatoken.data.token)

      clear()
    }


  }
}

function registerPoint() {
  let inputFuncionarioId = document.querySelector('#funcionarioId')
  let labelFuncionarioId = document.querySelector('#labelFuncionarioId')
  let inputDescricao = document.querySelector('#descricao')
  let labelDescricao = document.querySelector('#labelDescricao')
  let selectTipo = document.querySelector('#tipo')

  event.preventDefault()

  let funcionarioId = document.getElementById("funcionarioId").value
  let descricao = document.getElementById("descricao").value
  let data = document.getElementById("data").value
  let tipo = document.getElementById("tipo").value



  body = {
    "data": data,
    "tipo": tipo,
    "descricao": descricao,
    "funcionarioId": funcionarioId
  }

  if (funcionarioId == '' || tipo == '' || descricao == '') {
    labelFuncionarioId.setAttribute('style', 'color: red')
    inputFuncionarioId.setAttribute('style', 'border-color: red')
    labelDescricao.setAttribute('style', 'color: red')
    inputDescricao.setAttribute('style', 'border-color: red')
    selectTipo.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Por favor informe todos os campos corretamente'
    inputFuncionarioId.focus()

  } else {

    fazPost(url, body)
  }


}

function clear() {
  document.getElementById("funcionarioId").value = ''
  document.getElementById("descricao").value = ''

}

function listTable() {
  let tbody = documet.getElementById('tbody')


}




