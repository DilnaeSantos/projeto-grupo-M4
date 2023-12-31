import UsuariosModel from "../models/UsuariosModel.js"
import ValidacaoServices from "../services/ValidacaoServices.js"
import UsuariosDAO from "../DAO/UsuariosDAO.js"

class UsuariosController {
    /**
     * Método para centralização de rotas no controller
     * @param {Express} app 
     */
    static rotas(app) {
        /**
         * Rota para buscar todos os usuários
         */
        app.get("/usuarios", async (req, res) => {
            const usuarios = await UsuariosDAO.buscarTodosOsUsuarios()
            res.status(200).json(usuarios)
        })

        /**
         * Rota para buscar usuários pelo id
         */
        app.get("/usuarios/:id", async (req, res) => {
            const id = req.params.id;
            const isValid = await ValidacaoServices.validarExistencia(id); // verifica se o ID é válido
            if (isValid) {
                const resposta = await UsuariosDAO.buscarUsuarioPorId(id);
                if (resposta) { // verifica se um usuário foi encontrado com esse ID
                    res.status(200).json(resposta);
                } else {
                    res.status(404).json({ error: true, message: `Usuário não encontrado para o id ${id}` });
                }
            } else {
                res.status(400).json({ error: true, message: `ID inválido: ${id}` });
            }
        });

        /**
         * Rota para deletar usuário
         */
        app.delete("/usuarios/:id", async (req, res) => {
            const id = req.params.id
            const isValid = await ValidacaoServices.validarExistencia(id)
            if (isValid) {
                UsuariosDAO.deletarUsuarioPorId(id)
                res.status(200).json({ error: false })
            } else {
                res.status(404).json({ error: true, message: `Usuário não encontrado para o id ${id}` })
            }
        })

        /**
         * Rota para inserir um novo usuário
         */
        app.post("/usuarios", async (req, res) => {
            const body = Object.values(req.body)
            const isValid = ValidacaoServices.validaCamposUsuario(...body)
            if (isValid) {
                const usuarioModelado = new UsuariosModel(...body)
                try {
                    await UsuariosDAO.inserirUsuario(usuarioModelado)
                    res.status(201).json({
                        error: false,
                        message: "Usuário criado com sucesso"
                    })
                } catch (error) {
                    res.status(503).json({ error: true, message: `Servidor indisponível no momento` })
                }
            } else {
                res.status(400).json({ error: true, message: `Campos invalidos` })
            }
        })

        /**
         * Rota para atualizar um registro já existente na tabela usuários
         */
        app.put("/usuarios/:id", async (req, res) => {
            const id = req.params.id
            const body = req.body
            const exists = await ValidacaoServices.validarExistencia(id)
            const isValid = ValidacaoServices.validaCamposUsuario(body.NOME, body.EMAIL, body.TELEFONE)
            if (exists) {
                if (isValid) {
                    const usuarioModelado = new UsuariosModel(body.NOME, body.EMAIL, body.TELEFONE)
                    UsuariosDAO.AtualizarUsuarioPorId(id, usuarioModelado)
                    res.status(204).json()
                } else {
                    res.status(400).json({ error: true, message: `Campos invalidos` })
                }

            } else {
                res.status(404).json({ error: true, message: `Usuário não encontrado para o id ${id}` })
            }
        })
    }
}

export default UsuariosController
