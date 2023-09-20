import express from "express";

import UsuariosController from "./src/controllers/UsuariosControllers.js";
import ArtesaosController from "./src/controllers/ArtesaosControllers.js";
import ProdutosController from "./src/controllers/ProdutoControllers.js";
import EnderecoController from "./src/controllers/EnderecoControllers.js";
import UnidadesController from "./src/controllers/UnidadesControllers.js";

/**
 * Instancia do express
 * (inicialização do que foi importado)
 */
const app = express()

/**
 * Váriável de alocação de porta
 */
const port = process.env.port || 3000

/**
 * Levante do servidor da API.
 */
app.listen(port, ()=>{
    console.log(`Servidor disponível em http://localhost:${port}`)
})

/**
 * Middleware para reconhecimento do formato JSON para a aplicação
 */
app.use(express.json())

/** 
 * Chamada das rotas do controller
*/
UsuariosController.rotas(app)
ArtesaosController.rotas(app)
ProdutosController.rotas(app)
EnderecoController.rotas(app)
UnidadesController.rotas(app)