const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome: 'Isabelly Pacheco',
        imagem: 'https://web.whatsapp.com/4778b803-18d4-43ab-bf1f-194b2e0f7fde',
        minibio: 'Estudante de programação, apaixonada pela tecnologia e animais' 
    })
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)