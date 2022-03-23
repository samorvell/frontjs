/*Author: Samuel Silva
  Version: 1.0*/

let pegatoken = localStorage.getItem('token')
let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')
let btn = document.querySelector('.fa-eye')
btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha')

  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

function fazPost(urllogin, body) {


  let request = new XMLHttpRequest()
  request.open("POST", urllogin, true)
  request.setRequestHeader("Content-Type", "application/json")
  request.send(JSON.stringify(body))



  request.onload = function () {
    let inputEmail = document.querySelector('#email')
    let emailLabel = document.querySelector('#emailLabel')
    let inputSenha = document.querySelector('#senha')
    let senhaLabel = document.querySelector('#senhaLabel')
    let validToken = null

    if (request.status == 401) {
      emailLabel.setAttribute('style', 'color: red')
      inputEmail.setAttribute('style', 'border-color: red')
      senhaLabel.setAttribute('style', 'color: red')
      inputSenha.setAttribute('style', 'border-color: red')
      msgError.setAttribute('style', 'display: block')
      msgError.innerHTML = 'Usuário ou senha incorretos'
      inputEmail.focus()

    } else {

      let datatoken = JSON.parse(this.responseText)//JSON.parse para converter json para strint literal
      validToken = (datatoken.data.token)
      localStorage.setItem('token', validToken)

      msgSuccess.setAttribute('style', 'display: block')
      msgSuccess.innerHTML = '<strong>Entrando...</strong>'
      msgError.setAttribute('style', 'display: none')
      msgError.innerHTML = ''
      let profile = localStorage.getItem('Profile')
      // window.location.href = 'cadastroFuncionario'

      if (profile == 'ROLE_ADMIN') {
        setTimeout(() => {
          window.location.href = 'cadastroFuncionario'
          getuser(email)
        }, 2000)

      } else {
        setTimeout(() => {
          window.location.href = 'lancamentofuncionario'
          getuser(email)
        }, 2000)

      }
    }
  }

  return request.status
}

function autenticaUsuario() {
  let urllogin = "http://localhost:4050/auth"
  let inputEmail = document.querySelector('#email')
  let emailLabel = document.querySelector('#emailLabel')
  let inputSenha = document.querySelector('#senha')
  let senhaLabel = document.querySelector('#senhaLabel')

  event.preventDefault()

  let email = document.getElementById("email").value
  let senha = document.getElementById("senha").value



  body = {

    "email": email,
    "senha": senha
  }

  if (email == '' || senha == '') {
    emailLabel.setAttribute('style', 'color: red')
    inputEmail.setAttribute('style', 'border-color: red')
    senhaLabel.setAttribute('style', 'color: red')
    inputSenha.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos'
    inputEmail.focus()

    setTimeout(() => {


      msgError.setAttribute('style', 'display: none')
    }, 3000)

  } else {

    fazPost(urllogin, body)
    getuser(email)
  }
}

function getuser(email) {
  let url = 'http://localhost:4050/api/funcionarios/' + email
  let request = new XMLHttpRequest()
  request.open("GET", url, true)
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer " + pegatoken)
  // request.setRequestHeader("companyId", companyId)
  //request.responseType = "json"
  // let emplan = request.response //variavel recebendo o response
  // console.log(emplan)
  request.send()
  request.onload = function () {
    let func = JSON.parse(request.response)
    let companyId = func.data.empresaId
    let profile = func.data.perfil
    let emplId = func.data.id
    console.log(func.data)
    console.log(func)
    localStorage.setItem('companyId', companyId)
    localStorage.setItem('Profile', profile)
    localStorage.setItem('EmployerId', emplId)
    //let teste = localStorage.getItem('Profile', profile)
    //console.log(teste)
  }
}