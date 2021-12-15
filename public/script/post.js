function fazPost(url, body){
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))
    


    request.onload = function(){
        console.log(this.responseText)
    }

    return request.responseText
}

function autenticaUsuario(){
    event.preventDefault()
    let url = "http://ec2-3-139-73-212.us-east-2.compute.amazonaws.com:4050/auth"
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    

    console.log(email)
    console.log(senha)

    body = {

        "email": email,    
        "senha": senha
    
    }
    
    

    fazPost(url, body)    
}

function cadastraEmpresa(){
    event.preventDefault()
let url = "http://ec2-3-139-73-212.us-east-2.compute.amazonaws.com:4050/api/cadastrar-pj"
let nome = document.getElementById("nome").value
let email = document.getElementById("email").value
let senha = document.getElementById("senha").value
let cpf = document.getElementById("cpf").value
let razaoSocial = document.getElementById("razaoSocial").value
let cnpj = document.getElementById("cnpj").value

console.log(nome)
console.log(email)
console.log(senha)
console.log(cpf)
console.log(razaoSocial)
console.log(cnpj)

body ={

    "nome":nome,    
    "email":email,    
    "senha":senha,    
    "cpf":cpf,    
    "razaoSocial":razaoSocial,    
    "cnpj":cnpj    
}

fazPost(url, body)
}


function resendToken(e) {
    e.preventDefault();
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