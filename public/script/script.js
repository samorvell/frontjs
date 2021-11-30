let urllogin = "http://pinteligente.ddns.net:30100/auth"
let btn = document.querySelector('.fa-eye')
//let validToken = ''
let data = new Date
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
/*btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha')

  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

function fazPost(urllogin, body) {

  console.log("Body=", body)
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

    // console.log(this.responseText)
    console.log(request.status)
    if (request.status == 401) {
      emailLabel.setAttribute('style', 'color: red')
      inputEmail.setAttribute('style', 'border-color: red')
      senhaLabel.setAttribute('style', 'color: red')
      inputSenha.setAttribute('style', 'border-color: red')
      msgError.setAttribute('style', 'display: block')
      msgError.innerHTML = 'Usuário ou senha incorreto'
      inputEmail.focus()

    } else {

      let datatoken = JSON.parse(this.responseText)//JSON.parse para converter json para strint literal
      //console.log(tokenl)
      validToken = (datatoken.data.token)
      localStorage.setItem('token', validToken)
      console.log(validToken)
      //window.location.href = 'cadastroFuncionario'
    }




    //if(request.status)

  }




  return request.status*/
