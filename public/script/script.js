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

      //clear()
     // searchPoint()
    }

    searchPoint()
    clear()
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

function fazGet(urlb, body) {


  let request = new XMLHttpRequest()
  request.open("GET", urlb, true)
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer " + pegatoken)
  //request.responseType = "json"
  request.send()

  request.onload = function () {

    let emplan = request.response //variavel recebendo o response
    let nemplan = JSON.parse(request.response)//convertendo para json
    let tam2 = emplan.length
    //let tam = nemplan.length
    console.log(nemplan)
    console.log(nemplan.data.content[10].data)
    console.log(nemplan.data.totalElements)
    // console.log(tam2 + ' tamanho da variavel tam2 referenet a emplan')
    //console.log(tam)
    //console.log(nemplan.length)

    let tbody = document.getElementById('tbody')
    for (let i = 0; i < nemplan.data.totalElements; i++) {
      let tr = tbody.insertRow()

      let td_id = tr.insertCell()
      let td_data = tr.insertCell()
      let td_tipo = tr.insertCell()
      /*let td_INICIO_ALMOCO = tr.insertCell()
      let td_TERMINO_ALMOCO = tr.insertCell()
      let td_TERMINO_TRABALHO = tr.insertCell()*/
      let td_acoes = tr.insertCell()

      td_id.innerText = nemplan.data.content[i].id
      td_data.innerText = nemplan.data.content[i].data
      td_tipo.innerText = nemplan.data.content[i].tipo
      /*td_INICIO_ALMOCO.innerText = nemplan.data.content[i].tipo
      td_TERMINO_ALMOCO.innerText = nemplan.data.content[i].tipo
      td_TERMINO_TRABALHO.innerText = nemplan.data.content[i].tipo*/
      td_acoes.innerText = emplan[i].acoes
      td_id.classList.add('center')

    }



  }
  //console.log(empla)

}

function searchPoint() {
  let fid = document.getElementById("funcionarioId").value
  let urlb = "http://pinteligente.ddns.net:30100/api/lancamentos/funcionario/" + fid
  body = {}

  fazGet(urlb, body)

}




