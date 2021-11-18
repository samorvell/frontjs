const express = require ('express')
const app = express()
const path = require('path')
const porta = 8082


app.get("/", function(req, res){
    res.sendFile(__dirname + "/src/index.html")
})

app.get("/cadastroEmpresa", function(req, res){
    res.sendFile(__dirname + "/src/cadastroEmpresa.html")
})

app.get("/cadastroFuncionario", function(req, res){
    res.sendFile(__dirname + "/src/cadastroFuncionario.html")
})

app.use(express.static(path.join(__dirname,"public")));


app.listen(porta, () => {
    console.log(`Servidor execultando na porta: ${porta}`)
})