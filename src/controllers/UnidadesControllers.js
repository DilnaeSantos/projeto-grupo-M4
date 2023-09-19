import UnidadesModel from "../models/UnidadesModel.js";
import ValidacaoServices from "../services/ValidacaoServices.js";
import UnidadesDAO from "../DAO/UnidadesDAO.js";

class UnidadesController {
    /**
     * Método para centralização de rotas no controller
     * @param {Express} app 
     */
    static rotas(app) {
        // Rota para buscar todas as unidades
        app.get("/unidades", async (req, res) => {
            const unidades = await UnidadesDAO.buscarTodasAsUnidades();
            res.status(200).json(unidades);
        });

    // Rota para buscar uma unidade pelo ID
    app.get("/unidades/:id", async (req, res) => {
        const id = req.params.id;
        const isValid = await ValidacaoServices.validarExistenciaUnidade(id);

        if (isValid) {
            const unidade = await UnidadesDAO.buscarUnidadePorId(id);

            if (unidade) {
                res.status(200).json(unidade);
            } else {
                res.status(404).json({ error: true, message: `Unidade não encontrada para o id ${id}` });
            }
        } else {
            res.status(400).json({ error: true, message: `ID de unidade inválido: ${id}` });
        }
    });
    // Rota para deletar uma unidade pelo ID
    app.delete("/unidades/:id", async (req, res) => {
        const id = req.params.id;
        const isValid = await ValidacaoServices.validarExistenciaUnidade(id);

        if (isValid) {
            UnidadesDAO.deletarUnidadePorId(id);
            res.status(200).json({ error: false });
        } else {
            res.status(404).json({ error: true, message: `Unidade não encontrada para o id ${id}` });
        }
    });
    // Rota para inserir uma nova unidade
    app.post("/unidades", async (req, res) => {
        const body = Object.values(req.body)
        const isValid = ValidacaoServices.validaCamposUnidade(...body);
        if (isValid) {
            const unidadeModelada = new UnidadesModel(...body);

            try {
                await UnidadesDAO.inserirUnidade(unidadeModelada);
                res.status(201).json({ error: false, message: "Unidade criada com sucesso" });
            } catch (error) {
                res.status(503).json({ error: true, message: `Servidor indisponível no momento` });
            }
        } else {
            res.status(400).json({ error: true, message: `Campos inválidos` });
        }
    });
    // Rota para atualizar uma unidade pelo ID
    app.put("/unidades/:id", async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const exists = await ValidacaoServices.validarExistenciaUnidade(id);
        const isValid = ValidacaoServices.validaCamposUnidade(body.NOME, body.ID_ENDERECO);

        if (exists) {
            if (isValid) {
                const unidadeModelada = new UnidadesModel(body.NOME, body.ID_ENDERECO);
                UnidadesDAO.atualizarUnidadePorId(id, unidadeModelada);
                res.status(204).json();
            } else {
                res.status(400).json({ error: true, message: `Campos inválidos` });
            }
        } else {
            res.status(404).json({ error: true, message: `Unidade não encontrada para o id ${id}` });
        }
    });
}
}

export default UnidadesController;