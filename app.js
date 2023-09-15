import express from "express";

import UsuariosController from "./src/controllers/UsuariosControllers.js";

const app = express()

const port = process.env.port || 3000

app.listen(port, ()=>{
    console.log(`Servidor disponível em http://localhost:${port}`)
})

app.use(express.json())

/** 
 * Chamada das rotas do controller
*/
UsuariosController.rotas(app)