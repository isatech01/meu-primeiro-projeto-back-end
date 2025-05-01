const express = require("express")
const router = express.Router()
const app = express()
const porta = 3333

const mulheres = [
    {
        nome: 'isabelly Pacheco',
        imagem: 'c:\Users\isapa\OneDrive\Imagens\isabelly.jpg',
        minibio: 'Estudante de programação, apaixonada pela tecnologia e animais'
    },
    {
        nome: 'Gisele Salmin',
        imagem: 'c:\Users\isapa\OneDrive\Imagens\gisele.jpg',
        minibio: 'Farmacêutica, mãe da isabelly e do Pedro',
    },
    {
        nome: 'Marie Curie',
        imagem: 'https://nexo-uploads-beta.s3.amazonaws.com/wp-content/uploads/images/2023/12/22063205/25220939766_10b821f7c7_o_binary_234061.jpg',
        minibio: 'Física e Química, primeira mulher a ganhar o prêmio Nobel',
    }
]

function mostramulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

router.get('/mulheres', mostramulheres)
app.use(router)

app.listen(porta, mostraPorta)