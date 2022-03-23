/*Author: Samuel Silva
  Version: 1.0*/

let url = "http://localhost:4050/api/cadastrar-pj"

let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')

let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

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

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

//valida campo nome quantidade de caracteres
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

//valida campo razão social quantidade de caracteres
razaoSocial.addEventListener('keyup', () => {
    if (razaoSocial.value.length <= 4) {
        labelRazaoSocial.setAttribute('style', 'color: red')
        labelRazaoSocial.innerHTML = 'Razão Social *Insira no minimo 5 caracteres'
        razaoSocial.setAttribute('style', 'border-color: red')
        validRazaoSocial = false
    } else {
        labelRazaoSocial.setAttribute('style', 'color: green')
        labelRazaoSocial.innerHTML = 'Razão Social'
        razaoSocial.setAttribute('style', 'border-color: green')
        validRazaoSocial = true
    }
})

//valida campo cnpj quantidade de caracteres
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

//valida campo cpf quantidade de caracteres
cpf.addEventListener('keyup', () => {
    if (cpf.value.length <= 10 || cpf.length >= 11) {
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

//valida senha senha quantidade de caracteres
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

//valida campo confirma senha quantidade de caracteres
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

//fazPost
function fazPost(url, body) {

    //cria variavel request passando a classe XMLHttpRequest
    let request = new XMLHttpRequest()
    //abrindo a request do tipo post passando variavel url
    request.open("POST", url, true)
    //informa no cabeçalho o tipo de aplicação do objeto json
    request.setRequestHeader("Content-Type", "application/json")
    //envia request convertendo para json
    request.send(JSON.stringify(body))

    request.onload = function () {
        let returnCademp = JSON.parse(request.response)

        //validando a resposta da api 
        if (request.status == 400) {
            let cont = returnCademp.errors.length

            for (let i = 0; i < cont; i++) {
                let log = returnCademp.errors[i]

                if (log == 'CPF inválido' || log == 'CNPJ inválido')
                    cpf.setAttribute('style', 'border-color: red')
                cnpj.setAttribute('style', 'border-color: red')
                msgError.setAttribute('style', 'display: block')
                msgError.innerHTML = 'CPNJ ou CPF invalidos, verifique!'
                cpf.focus()
                setTimeout(() => {

                    msgError.setAttribute('style', 'display: none')
                }, 3000)

            }



        } else {

            setTimeout(() => {
                window.location.href = 'login'
            }, 3000)
        }

    }

    return request.responseText
}

//cadastraEmpresa
function cadastraEmpresa() {

    event.preventDefault()
    //validação dos campos
    if (validNome && validRazaoSocial &&
        validSenha && validConfirmSenha && validCnpj) {

        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = '<strong>Cadastrando empresa...</strong>'
        msgError.setAttribute('style', 'display: none')
        msgError.innerHTML = ''

        let nome = document.getElementById("nome").value
        let email = document.getElementById("email").value
        let senha = document.getElementById("senha").value
        let cpf = document.getElementById("cpf").value
        let razaoSocial = document.getElementById("razaoSocial").value
        let cnpj = document.getElementById("cnpj").value

        //criando o json para envio
        body = {

            "nome": nome,
            "email": email,
            "senha": senha,
            "cpf": cpf,
            "razaoSocial": razaoSocial,
            "cnpj": cnpj
        }
        fazPost(url, body)

        setTimeout(() => {
            msgSuccess.setAttribute('style', 'display: none')
        }, 2000)


    } else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
        msgSuccess.innerHTML = ''
        msgSuccess.setAttribute('style', 'display: none')
        setTimeout(() => {
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