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