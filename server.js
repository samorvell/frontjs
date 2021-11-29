const express = require ('express')
const app = express()
const path = require('path')
const porta = 8082


app.get("/", function(req, res){
    res.sendFile(__dirname + "/src/home.html")
})

app.get("/listaLancamento", function(req, res){
    res.sendFile(__dirname + "/src/listaLancamento.html")
})

app.get("/login", function(req, res){
    res.sendFile(__dirname + "/src/login.html")
})

app.get("/cadastroEmpresa", function(req, res){
    res.sendFile(__dirname + "/src/cadastroEmpresa.html")
})

app.get("/cadastroFuncionario", function(req, res){
    res.sendFile(__dirname + "/src/cadastroFuncionario.html")
})

app.get("/home", function(req, res){
    res.sendFile(__dirname + "/src/home.html")
})

app.get("/aplicativo", function(req, res){
    res.sendFile(__dirname + "/src/aplicativo.html")
})

app.get("/sobre", function(req, res){
    res.sendFile(__dirname + "/src/sobre.html")
})


app.use(express.static(path.join(__dirname,"public")));


app.listen(porta, () => {
    console.log(`Servidor execultando em: http://localhost:${porta}`)
})