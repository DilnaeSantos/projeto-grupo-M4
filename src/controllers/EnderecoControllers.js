import EnderecoModel from "../models/EnderecoModel.js";
import EnderecosDAO from "../DAO/EnderecosDAO.js";
import ValidacaoServices from "../services/ValidacaoServices.js";

class EnderecoController {
    /**
     * Método para centralização de rotas no controller
     * @param {Express} app 
     */
    static rotas(app) {
        // Rota para buscar todos os endereços
        app.get("/enderecos", async (req, res) => {
            const enderecos = await EnderecosDAO.buscarTodosOsEnderecos();
            res.status(200).json(enderecos);
        });

        // Rota para buscar um endereço pelo ID
        app.get("/enderecos/:id", async (req, res) => {
            const id = req.params.id;
            const isValid = await ValidacaoServices.validarExistenciaEndereco(id);

            if (isValid) {
                const endereco = await EnderecosDAO.buscarEnderecoPorId(id);

                if (endereco) {
                    res.status(200).json(endereco);
                } else {
                    res.status(404).json({ error: true, message: `Endereço não encontrado para o id ${id}` });
                }
            } else {
                res.status(400).json({ error: true, message: `ID de endereço inválido: ${id}` });
            }
        });

        // Rota para deletar um endereço pelo ID
        app.delete("/enderecos/:id", async (req, res) => {
            const id = req.params.id;
            const isValid = await ValidacaoServices.validarExistenciaEndereco(id);

            if (isValid) {
                EnderecosDAO.deletarEnderecoPorId(id);
                res.status(200).json({ error: false });
            } else {
                res.status(404).json({ error: true, message: `Endereço não encontrado para o id ${id}` });
            }
        });

        // Rota para inserir um novo endereço
        app.post("/enderecos", async (req, res) => {
            const { cep, rua, numero, cidade, bairro } = req.body;
            const isValid = ValidacaoServices.validaCamposEndereco(...body)

            if (isValid) {
                const enderecoModelado = new EnderecoModel(...body)

                try {
                    await EnderecosDAO.inserirEndereco(enderecoModelado);
                    res.status(201).json({ error: false, message: "Endereço criado com sucesso" });
                } catch (error) {
                    res.status(503).json({ error: true, message: `Servidor indisponível no momento` });
                }
            } else {
                res.status(400).json({ error: true, message: `Campos inválidos` });
            }
        });

        // Rota para atualizar um endereço pelo ID
        app.put("/enderecos/:id", async (req, res) => {
            const id = req.params.id;
            const { cep, rua, numero, cidade, bairro } = req.body;
            const exists = await ValidacaoServices.validarExistenciaEndereco(id);
            const isValid = ValidacaoServices.validaCamposEndereco(body.CEP, body.RUA, body.NUMERO, body.CIDADE, body.BAIRRO);

            if (exists) {
                if (isValid) {
                    const enderecoModelado = new EnderecoModel(body.CEP, body.RUA, body.NUMERO, body.CIDADE, body.BAIRRO);
                    EnderecosDAO.atualizarEnderecoPorId(id, enderecoModelado);
                    res.status(204).json();
                } else {
                    res.status(400).json({ error: true, message: `Campos inválidos` });
                }
            } else {
                res.status(404).json({ error: true, message: `Endereço não encontrado para o id ${id}` });
            }
        });
    }
}

export default EnderecoController;
