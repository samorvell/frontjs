let btn = document.querySelector('.fa-eye')
let urlpj = 'http://pinteligente.ddns.net:30100/api/cadastrar-pj'
let urllogin = "http://pinteligente.ddns.net:30100/auth"


let btn = document.querySelector('#senha')
let btnConfirm = document.querySelector('#confirmSenha')
/*variaveis acima refernete ao mostrar e ocultar senha*/

let validData = false

let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validnome = false

let razaoSocial = document.querySelector('#razaoSocial')
let labelRazaoSocial = document.querySelector('#labelRazaoSocial')
let validRazaoSocial = false

let email = document.querySelector('#email')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false

let cpf = document.querySelector('#cpf')
let labelCpf = document.querySelector('#labelCpf')
let validCpf = false

let cnpj = document.querySelector('#cnpj')
let labelCnpj = document.querySelector('#labelCnpj')
let validCnpj = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let valorHora = document.querySelector('#valorHora')
let labelValorHora = document.querySelector('#labelValorHora')
let validValorHora = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 3) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
        nome.setAttribute('style', 'border-color: red')
        validnome = false
    } else {
        labelNome.setAttribute('style', 'color: green')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color: green')
        validnome = true
    }
})

razaoSocial.addEventListener('keyup', () => {
    if (razaoSocial.value.length <= 7) {
        labelRazaoSocial.setAttribute('style', 'color: red')
        labelRazaoSocial.innerHTML = 'Razão Social *Insira no minimo 7 caracteres'
        razaoSocial.setAttribute('style', 'border-color: red')
        validRazaoSocial = false
    } else {
        labelRazaoSocial.setAttribute('style', 'color: green')
        labelRazaoSocial.innerHTML = 'Razão Social'
        razaoSocial.setAttribute('style', 'border-color: green')
        validRazaoSocial = true
    }
})

senha.addEventListener('keyup', () => {
    if (senha.value.length <= 5) {
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
    } else {
        labelSenha.setAttribute('style', 'color: green')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: green')
        validSenha = true
    }
})

confirmSenha.addEventListener('keyup', () => {
    if (senha.value != confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color: red')
        labelConfirmSenha.innerHTML = 'Confirmar senha *Valores de senha não conferem'
        confirmSenha.setAttribute('style', 'border-color: red')
    } else {
        labelConfirmSenha.setAttribute('style', 'color: green')
        labelConfirmSenha.innerHTML = 'Confirmar senha'
        confirmSenha.setAttribute('style', 'border-color: green')
    }
})

let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

function autenticaUsuario() {

    event.preventDefault()

    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    body = {

        "email": email,
        "senha": senha

    }



    fazPost(urllogin, body)
}


function cadastrar() {
    if (validnome && validRazaoSocial &&
        validEmail && validCpf &&
        validCnpj && validSenha &&
        validConfirmSenha) {

           
       
         validData = true
         console.log(nome.value)
         msgSuccess.setAttribute('style', 'display: block')
         msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
         msgError.setAttribute('style', 'display:block')
         msgError.innerHTML = ''

         setTimeout(()=>{
            window.location.href = 'https://cdpn.io/thicode/debug/ZELzYxV/dXAqBaRyvwJk'
        }, 3000)

    } else {

        alert('Nãoooo deu bom')
         validData = false
         msgError.setAttribute('style', 'display: block')
         msgError.innerHTML = '<strong>Preencha todos os campos antes de cadastrar</strong>'
         msgSuccess.setAttribute('style', 'display: none')
         msgSuccess.innerHTML = ''
    }

    // event.preventDefault()


    //console.log(nome.value)
    //console.log(email.value)
    //console.log(senha.value)
    //console.log(cpf.value)
    //console.log(razaoSocial.value)
    //console.log(cnpj.value)


}





btn.addEventListener('click', () => {
    let Senha = document.querySelector('#senha')

    if (Senha.getAttribute('type') == 'password') {
        Senha.setAttribute('type', 'text')
    } else {
        Senha.setAttribute('type', 'password')
    }
})



btnConfirm.addEventListener('click', () => {
    let confirmSenha = document.querySelector('#confirmSenha')

    if (confirmSenha.getAttribute('type') == 'password') {
        confirmSenha.setAttribute('type', 'text')
    } else {
        confirmSenha.setAttribute('type', 'password')
    }
})

function fazPost(url, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))



    request.onload = function () {
        //console.log(this.responseText)
        let token
        localStorage.setItem(this.responseType)
        //console.log(token)
    }

    return request.responseText
}

function resendToken(e) {//armazenar token
    //e.preventDefault();
    document.getElementById("resendToken").addEventListener("click", resendToken)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    var token = JSON.parse(localStorage.getItem('token'));
    console.log(`Authorization=Bearer ${token}`)
    fetch('/users/me', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // window.location.href = 'http://localhost:3000/dashboard';
        })
        .catch(err => { console.log(err) })
}

