let url = "http://pinteligente.ddns.net:30100/api/lancamentos"
let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
//let data = new Date
let pegatoken = localStorage.getItem('token')
let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')
function dataFixa() {
  let data = new Date(),
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
  /*if (day <= 9) {
    day = "0" + day
  } else {
    day = day
  }*/
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

      //clear()
      // searchPoint()
    }

    searchPoint()
    clear()
  }

}

let validFuncionarioId = false

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
    validFuncionarioId = false
    labelFuncionarioId.setAttribute('style', 'color: red')
    inputFuncionarioId.setAttribute('style', 'border-color: red')
    labelDescricao.setAttribute('style', 'color: red')
    inputDescricao.setAttribute('style', 'border-color: red')
    selectTipo.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Por favor informe todos os campos corretamente'
    inputFuncionarioId.focus()
    setTimeout(() => {
      // window.location.href = 'login'
      msgError.setAttribute('style', 'display: none')
    }, 3000)

  } else {
    validFuncionarioId = true

    fazPost(url, body)
  }


}

function clear() {
  document.getElementById("funcionarioId").value = ''
  document.getElementById("descricao").value = ''

}

function fazGet(urlb, body) {


  let request = new XMLHttpRequest()
  request.open("GET", urlb, true)
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer " + pegatoken)
  //request.responseType = "json"
  request.send()

  //ler o json, converter os dados para criar a primeira linha, preencher, depois fazer isso com as demais linhas
  request.onload = function () {

    let emplan = request.response //variavel recebendo o response
    let nemplan = JSON.parse(request.response)//convertendo para json      

    let tbody = document.getElementById('tbody')
    tbody.innerText = ' '
    data = ' '//nemplan.data.content[0].data.substring(0, 11)
    //console.log(data)

    for (let i = 0; i < nemplan.data.totalElements; i++) {

      let tr = tbody.insertRow()
      let td_data = tr.insertCell()
      let td_hora = tr.insertCell()
      let td_tipo = tr.insertCell()
      //let td_id = tr.insertCell()
      //let td_acoes = tr.insertCell()
      let data = nemplan.data.content[i].data.substring(0, 11)
      let hora = nemplan.data.content[i].data.substring(11, 19)
      let tipo = nemplan.data.content[i].tipo
      //  td_id.innerText = id
      td_data.innerText = data
      td_hora.innerText = hora
      td_tipo.innerText = tipo
      //td_acoes.innerText = ''
      //td_entrada.innerText = hora //nemplan.data.content[i].data.substring(11,19)//hora
      // td_acoes.innerText = emplan[i].acoes


    }



  }


}

function searchPoint() {
  let fid = document.getElementById("funcionarioId").value
  let urlb = "http://pinteligente.ddns.net:30100/api/lancamentos/funcionario/" + fid
  body = {}
  if (fid == '' && urlb == 'http://pinteligente.ddns.net:30100/api/lancamentos/funcionario/') {

    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Informe Id do funcionario</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
    setTimeout(() => {
      // window.location.href = 'login'
      msgError.setAttribute('style', 'display: none')
    }, 3000)

  } else {

    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Buscando lançamento...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    setTimeout(() => {
      // window.location.href = 'login'
      msgSuccess.setAttribute('style', 'display: none')
    }, 3000)

    fazGet(urlb, body)
  }
}




