let url = "http://192.168.100.14:4050/api/cadastrar-pf"

let pegatoken = localStorage.getItem('token')

let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')

let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let valorHora = document.querySelector('#valorHora')
let labelValorHora = document.querySelector('#labelValorHora')
let validValorHora = false

let email = document.querySelector('#email')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false

let cnpj = document.querySelector('#cnpj')
let labelCnpj = document.querySelector('#labelCnpj')
let validCnpj = false

let cpf = document.querySelector('#cpf')
let labelCpf = document.querySelector('#labelCpf')
let validCpf = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
        nome.setAttribute('style', 'border-color: red')
        validNome = false
    } else {
        labelNome.setAttribute('style', 'color: green')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color: green')
        validNome = true
    }
})

email.addEventListener('keyup', () => {
    if (email.value.length <= 6) {
        labelEmail.setAttribute('style', 'color: red')
        labelEmail.innerHTML = 'E-mail *Insira no minimo 7 caracteres'
        email.setAttribute('style', 'border-color: red')
        validEmail = false
    } else {
        labelEmail.setAttribute('style', 'color: green')
        labelEmail.innerHTML = 'E-mail'
        email.setAttribute('style', 'border-color: green')
        validEmail = true
    }
})

cpf.addEventListener('keyup', () => {
    if (cpf.value.length <= 10) {
        labelCpf.setAttribute('style', 'color: red')
        labelCpf.innerHTML = 'CPF *Insira os 11 caracteres'
        cpf.setAttribute('style', 'border-color: red')
        validCpf = false
    } else {
        labelCpf.setAttribute('style', 'color: green')
        labelCpf.innerHTML = 'CPF'
        cpf.setAttribute('style', 'border-color: green')
        validCpf = true
    }
})

cnpj.addEventListener('keyup', () => {
    if (cnpj.value.length <= 13) {
        labelCnpj.setAttribute('style', 'color: red')
        labelCnpj.innerHTML = 'CNPJ *Insira os 14 caracteres'
        cnpj.setAttribute('style', 'border-color: red')
        validCnpj = false
    } else {
        labelCnpj.setAttribute('style', 'color: green')
        labelCnpj.innerHTML = 'CNPJ'
        cnpj.setAttribute('style', 'border-color: green')
        validCnpj = true
    }
})

valorHora.addEventListener('keyup', () => {
    if (valorHora.value.length <= 1) {
        labelValorHora.setAttribute('style', 'color: red')
        //labelValorHora.innerHTML = 'Razão Social *Insira no minimo 5 caracteres'
        valorHora.setAttribute('style', 'border-color: red')
        validValorHora = false
    } else {
        labelValorHora.setAttribute('style', 'color: green')
        labelValorHora.innerHTML = 'Valor hora'
        valorHora.setAttribute('style', 'border-color: green')
        validValorHora = true
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
        labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
        confirmSenha.setAttribute('style', 'border-color: red')
        validConfirmSenha = false
    } else {
        labelConfirmSenha.setAttribute('style', 'color: green')
        labelConfirmSenha.innerHTML = 'Confirmar Senha'
        confirmSenha.setAttribute('style', 'border-color: green')
        validConfirmSenha = true
    }
})

function clear() {
    document.getElementById("nome").value = ''
    document.getElementById("email").value = ''
    document.getElementById("senha").value = ''
    document.getElementById("cpf").value = ''
    document.getElementById("valorHora").value = ''
    document.getElementById("cnpj").value = ''
    document.getElementById("confirmSenha").value = ''


}

function fazPost(url, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.setRequestHeader("Authorization", "Bearer " + pegatoken)
    request.send(JSON.stringify(body))



    request.onload = function () {
        console.log(this.responseText)
    }

    clear()
    return request.responseText
}

function regfunc() {
    //let url = "http://localhost:4050/api/cadastrar-pj"
    event.preventDefault()

    let nome = document.getElementById("nome").value
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    let cpf = document.getElementById("cpf").value
    let valorHora = document.getElementById("valorHora").value
    let cnpj = document.getElementById("cnpj").value

    body = {

        "nome": nome,
        "email": email,
        "senha": senha,
        "cpf": cpf,
        "valorHora": valorHora,
        "cnpj": cnpj
    }

    if (validNome && validValorHora &&
        validSenha && validConfirmSenha && validCnpj &&
        validEmail && validCpf) {
        //window.alert("deu bom");

        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = '<strong>Funcionario Cadastrado...</strong>'
        msgError.setAttribute('style', 'display: none')
        msgError.innerHTML = ''

        setTimeout(() => {
             window.location.href = 'listaLancamento'
        }, 4000)

        fazPost(url, body)


    } else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
        msgSuccess.innerHTML = ''
        msgSuccess.setAttribute('style', 'display: none')
        setTimeout(() => {
            // window.location.href = 'login'
            msgError.setAttribute('style', 'display: none')
         }, 3000)
    }



}

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

btnConfirm.addEventListener('click', () => {
    let inputConfirmSenha = document.querySelector('#confirmSenha')

    if (inputConfirmSenha.getAttribute('type') == 'password') {
        inputConfirmSenha.setAttribute('type', 'text')
    } else {
        inputConfirmSenha.setAttribute('type', 'password')
    }
})