/*Author: Samuel Silva
  Version: 1.0*/

let url = "http://localhost:4050/api/lancamentos"
let pegatoken = localStorage.getItem('token')
let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')
let btn = document.querySelector('.fa-eye')
let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
var timer = setInterval(dataFixa, 1000);

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
      setTimeout(() => {
        // window.location.href = 'login'
        msgError.setAttribute('style', 'display: none')
      }, 3000)

    } else {

    }

    searchPoint()

    // clear()
  }

}

function registerPoint() {
  dataFixa()
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
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Atualizando lançamentos...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    setTimeout(() => {
      // window.location.href = 'login'
      msgSuccess.setAttribute('style', 'display: none')
      fazPost(url, body)
    }, 3000)
  }
}

function clear() {
  document.getElementById("funcionarioId").value = ''
  document.getElementById("descricao").value = ''

}

function fazGet(urlb, body) {
  let companyId = localStorage.getItem('companyId')
  let request = new XMLHttpRequest()
  request.open("GET", urlb, true)
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer " + pegatoken)
  request.setRequestHeader("companyId", companyId)
  //request.responseType = "json"
  // let emplan = request.response //variavel recebendo o response
  // console.log(emplan)
  request.send()
  request.onload = function () {
    if (request.status == 400) {

      funcionarioId.setAttribute('style', 'border-color: red')
      msgError.setAttribute('style', 'display: block')
      msgError.innerHTML = 'Lançamentos não encontrado para o id, verifque!'
      funcionarioId.focus()
      setTimeout(() => {

        msgError.setAttribute('style', 'display: none')
        funcionarioId.setAttribute('style', 'border-color: #4038a0')
        //funcionarioId.setAttribute('style', 'display: none')
      }, 3000)
    }

    if (request.status == 401) {

      funcionarioId.setAttribute('style', 'border-color: red')
      msgError.setAttribute('style', 'display: block')
      msgError.innerHTML = 'Por favor efetuar login novamente!'
      funcionarioId.focus()
      setTimeout(() => {

        msgError.setAttribute('style', 'display: none')
      }, 3000)

    } else {
      let nemplan = JSON.parse(request.response)//convertendo para json response api
      console.log(nemplan)

      let tbody = document.getElementById('tbody')
      tbody.innerText = ' '
      data = ' '//nemplan.data.content[0].data.substring(0, 11)

      let date = nemplan.data.content[0].data.substring(0, 11)
      let time = nemplan.data.content[0].data.substring(11, 19)

      console.log(date + '' + time)



      for (let i = 0; i < nemplan.data.totalElements; i++) {




        /*let tr = tbody.insertRow()
        let td_data = tr.insertCell()
        let td_hora = tr.insertCell()
        let td_tipo = tr.insertCell()
        //let td_id = tr.insertCell()
        let td_acoes = tr.insertCell()
        let data = nemplan.data.content[i].data.substring(0, 11)
        let hora = nemplan.data.content[i].data.substring(11, 19)
        let tipo = nemplan.data.content[i].tipo
        let id = nemplan.data.content[i].id
        //  td_id.innerText = id
        td_data.innerText = data
        td_hora.innerText = hora
        td_tipo.innerText = tipo
        //td_acoes.innerText = ''
        //td_entrada.innerText = hora //nemplan.data.content[i].data.substring(11,19)//hora
        // td_acoes.innerText = emplan[i].acoes
        let imgEdit = document.createElement('img')
        let imgDelet = document.createElement('img')
        imgEdit.src = 'img/editar.svg'
        imgDelet.src = 'img/excluir.svg'
        imgDelet.setAttribute("onclick", "remover(" + id + ")")
        td_acoes.appendChild(imgEdit)
        td_acoes.appendChild(imgDelet)*/


      }
    }
  }
}



function remover(id) {

  let durl = 'http://localhost:4050/api/lancamentos/' + id
  //.log(durl)

  body = ''
  fazdelete(durl, body)

  function fazdelete(durl) {
    let request = new XMLHttpRequest()
    request.open("DELETE", durl, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.setRequestHeader("Authorization", "Bearer " + pegatoken)
    request.send()

    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Removendo lançamento' + id + '...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    setTimeout(() => {
      // window.location.href = 'login'
      msgSuccess.setAttribute('style', 'display: none')
      searchPoint(id)
    }, 2000)

    // clear()
  }

  //  searchPoint()
  //window.alert("deletar " + id)

}

function searchPoint() {
  let id = document.getElementById("funcionarioId").value
  let urlb = "http://localhost:4050/api/lancamentos/funcionario/" + id
  body = {}
  if (urlb == 'http://localhost:4050/api/lancamentos/funcionario/') {

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

      fazGet(urlb, body)
      getName(id)
    }, 2000)


  }

  function getName(id) {
    let companyId = localStorage.getItem('companyId')
    //let id = document.getElementById("funcionarioId").value
    let urlb = "http://localhost:4050/api/funcionarios/funcionario/" + id
    body = {}

    let request = new XMLHttpRequest()
    request.open("GET", urlb, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.setRequestHeader("Authorization", "Bearer " + pegatoken)
    request.setRequestHeader("companyId", companyId)
    // request.responseType = "json"
    //let peganome = request.response    
    // let emplan = request.response //variavel recebendo o response
    // console.log(emplan)
    request.send()
    request.onload = function () {
      if (request.status == 400) {

        funcionarioId.setAttribute('style', 'border-color: red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Lançamentos não encontrado para o id, verifque!'
        funcionarioId.focus()
        setTimeout(() => {

          msgError.setAttribute('style', 'display: none')
          funcionarioId.setAttribute('style', 'border-color: #4038a0')
          //funcionarioId.focus()
        }, 3000)
      } else {
        let nameGet = JSON.parse(request.response)//convertendo para json 
        let emprGet = nameGet.data.nameEmpresa

        //    console.log(emplId)
        nameGet = nameGet.data.nome
        //emprGet = nameGet.data.nameEmpresa
        document.getElementById("nome").value = nameGet
        document.getElementById("nomeEmpresa").value = emprGet

        setTimeout(() => {

          msgError.setAttribute('style', 'display: none')
        }, 3000)
      }
    }
  }
}

let empId = localStorage.getItem('EmployerId')
let perfil = localStorage.getItem('Profile')
window.onload = function () {
  if (perfil != 'ROLE_ADMIN') {
    document.getElementById("funcionarioId").value = empId
  }


  //localStorage.getItem('Profile', profile)
  //console.log(perfil)

}