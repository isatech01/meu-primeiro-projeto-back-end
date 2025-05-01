const express = require("express") //aqui estou iniciando o express
const router = express.Router() //aqui estou  configurando a primeira parte do meu servidor
const cors = require('cors')//aqui estou importando o pacote cors que permite consumir essa API no front end
const conectaBancoDeDados = require('./bancoDeDados')//aqui estou ligando ao arquivo bancoDeDados.js
conectaBancoDeDados()//estou cgamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //aqui estou iniciando o app
const porta = 3333 //aqui estou defininco a porta que o meu servidor vai rodar e o nome dela
app.use(express.json()) 
app.use(cors())

//GET
async function mostramulheres(request, response) {
    try{
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    }catch (erro) {
        console.log(erro)
    }
}

//POST
 async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao 
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}   

//PATCH
async function corrigeMulher(request, response) {
 try {
    const mulherEncontrada = await Mulher.findById(request.params.id)
   
    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    }

    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
    }

    if (request.body.citacao) {
        mulherEncontrada.citacao = request.body.citacao
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

    response.json(mulherEncontrada)
 } catch (erro) {
    console.log(erro)
 }

}

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}


//DELETE
async function deletaMulher(request, response) {
  try{
await Mulher.findByIdAndDelete(request.params.id)
response.status(200).json({ mensagem: 'mulher deletada com sucesso'})
  } catch(erro) {
    console.log(erro)
  }
}


router.get('/mulheres', mostramulheres)//aqui configureia rota GET /mulheres
router.post('/mulheres', criaMulher)//aqui configurei a rota POST/mulheres
router.patch('/mulheres/:id', corrigeMulher)//aqui configurei a rota PATCH/mulheres
router.delete('/mulheres/:id', deletaMulher)//aqui configurei a nossa rota DELETE/mulheres
app.use(router)

app.listen(porta, mostraPorta) //aqui meu servidor esta ouvindo a porta