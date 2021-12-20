let urllogin = "http://ec2-3-139-73-212.us-east-2.compute.amazonaws.com:4050/auth"
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
      window.location.href = 'cadastroFuncionario'
    }

  }

  return request.status
}

function autenticaUsuario() {

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

  } else {

    fazPost(urllogin, body)
  }
}