import ProdutoModel from "../models/ProdutoModel.js";
import ValidacaoServices from "../services/ValidacaoServices.js";
import ProdutoDAO from "../DAO/ProdutoDAO.js";

class ProdutoController {
    /**
     * Método para centralização de rotas no controller
     * @param {Express} app 
     */
    static rotas(app) {
        // Rota para buscar todos os produtos
        app.get("/produtos", async (req, res) => {
            const produtos = await ProdutoDAO.buscarTodosOsProdutos();
            res.status(200).json(produtos);
        });

        // Rota para buscar um produto pelo ID
        app.get("/produto/:id", async (req, res) => {
            const id = req.params.id;
            const isValid = await ValidacaoServices.validarExistenciaProduto(id);

            if (isValid) {
                const produto = await ProdutoDAO.buscarProdutoPorId(id);

                if (produto) {
                    res.status(200).json(produto);
                } else {
                    res.status(404).json({ error: true, message: `Produto não encontrado para o id ${id}` });
                }
            } else {
                res.status(400).json({ error: true, message: `ID de produto inválido: ${id}` });
            }
        });

        // Rota para buscar produtos pelo artesao

        app.get("/produtos/:email", async (req, res) => {
            const email = req.params.email;
            const isValid = await ValidacaoServices.validarExistenciaEmailArtesaoEmProduto(email); 
                if (isValid) {
                    const resposta = await ProdutoDAO.buscarProdutoPorArtesao(email);
                        if (resposta) { 
                            res.status(200).json(resposta);
                        } else {
                            res.status(404).json({ error: true, message: `Produto não encontrado para o email ${email}` });
                        }
                } else {
                    res.status(400).json({ error: true, message: `Email inválido: ${email}` });
                }
        })


        // Rota para deletar um produto pelo ID
        app.delete("/produtos/:id", async (req, res) => {
            const id = req.params.id;
            const isValid = await ValidacaoServices.validarExistenciaProduto(id);

            if (isValid) {
                ProdutoDAO.deletarProdutoPorId(id);
                res.status(200).json({ error: false });
            } else {
                res.status(404).json({ error: true, message: `Produto não encontrado para o id ${id}` });
            }
        });

        // Rota para inserir um novo produto
        app.post("/produtos", async (req, res) => {
            const body = Object.values(req.body)
            const isValid = ValidacaoServices.validaCamposProduto(...body);

            if (isValid) {
                const produtoModelado = new ProdutoModel(...body);

                try {
                    await ProdutoDAO.inserirProduto(produtoModelado);
                    res.status(201).json({
                        error: false,
                        message: "Produto criado com sucesso"
                    });
                } catch (error) {
                    res.status(503).json({ error: true, message: `Servidor indisponível no momento` });
                }
            } else {
                res.status(400).json({ error: true, message: `Campos inválidos` });
            }
        });

        // Rota para atualizar um produto pelo ID
        app.put("/produtos/:id", async (req, res) => {
            const id = req.params.id;
            const body = req.body;
            const exists = await ValidacaoServices.validarExistenciaProduto(id);
            const isValid = ValidacaoServices.validaCamposProduto(body.NOME, body.DESCRICAO, body.PRECO, body.QTDESTOQUE, body.EMAIL_ARTESAO);

            if (exists) {
                if (isValid) {
                    const produtoModelado = new ProdutoModel(body.NOME, body.DESCRICAO, body.PRECO, body.QTDEESTOQUE, body.EMAIL_ARTESAO);
                    ProdutoDAO.atualizarProdutoPorId(id, produtoModelado);
                    res.status(204).json();
                } else {
                    res.status(400).json({ error: true, message: `Campos inválidos` });
                }
            } else {
                res.status(404).json({ error: true, message: `Produto não encontrado para o id ${id}` });
            }
        });
    }
}

export default ProdutoController;


