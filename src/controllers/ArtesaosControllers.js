import ArtesaosDAO from "../DAO/ArtesaosDAO.js"
import ArtesaosModel from "../models/ArtesaoModel.js"
import ValidacaoServices from "../services/ValidacaoServices.js"


class ArtesaosController{
    /**
     * Método para centralização de rotas no controller
     * @param {Express} app 
     */
    static rotas(app){

        /**
         * Rota para inserir um novo artesão
         */
        app.post("/artesaos", async (req, res)=>{
          const body = Object.values(req.body)
          const isValid = ValidacaoServices.validaCamposArtesao(...body)
            if(isValid){
              const artesaoModelado = new ArtesaosModel(...body)
                  try {
                    await ArtesaosDAO.inserirArtesao(artesaoModelado)
                    res.status(201).json({
                        error: false,
                        message: "Artesão criado com sucesso"
                    })
                  } catch (error) {
                      res.status(503).json({error: true, message: `Servidor indisponível no momento`})
                  }
            } else {
                res.status(400).json({error: true, message: `Campos invalidos`})
            }
        })

        /**
         * Rota para buscar todos os artesãos
         */
        app.get("/artesaos", async (req, res)=>{
            const artesaos = await ArtesaosDAO.buscarTodosOsArtesaos()
            res.status(200).json(artesaos)
        })

        /**
         * Rota para buscar artesão pelo email
         */
        app.get("/artesaos/:email", async (req, res) => {
            const email = req.params.email;
            const isValid = await ValidacaoServices.validarExistenciaEmail(email); 
              if (isValid) {
                const resposta = await ArtesaosDAO.buscarArtesaoPorEmail(email);
                if (resposta) { 
                    res.status(200).json(resposta);
                  } else {
                    res.status(404).json({ error: true, message: `Usuário não encontrado para o id ${email}` });
                  }
              } else {
                  res.status(400).json({ error: true, message: `Email inválido: ${email}` });
              }
        })

        /**
         * Rota para deletar artesãos
         */
        app.delete("/artesaos/:email", async (req, res)=>{
          const email = req.params.email
          const isValid = await ValidacaoServices.validarExistenciaEmail(email)
            if(isValid){
                ArtesaosDAO.deletarArtesaoPorEmail(email)
                res.status(200).json({error: false})
            } else {
                res.status(404).json({error: true, message: `Usuário não encontrado para o email ${email}`})
            }
        })

        /**
         * Rota para atualizar um registro já existente na tabela artesãos
         */
        app.put("/artesaos/:email", async (req, res)=>{
          const email = req.params.email
          const body = req.body
          const exists = await ValidacaoServices.validarExistenciaEmail(email)
          const isValid = ValidacaoServices.validaCamposArtesao(body.NOME, body.EMAIL_ARTESAO, body.TELEFONE, body.TIPODEARTE, body.BIO)
            if(exists){
              if(isValid){
                const artesaoModelado = new ArtesaosModel(body.NOME, body.EMAIL_ARTESAO, body.TELEFONE, body.TIPODEARTE, body.BIO)
                ArtesaosDAO.atualizarArtesaoPorEmail(email, artesaoModelado)
                res.status(204).json()
              } else {
                res.status(400).json({error: true, message: `Campos invalidos`})
              }
                  
              } else {
                  res.status(404).json({error: true, message: `Usuário não encontrado para o email ${email}`})
              }
        })
    }
}

export default ArtesaosController