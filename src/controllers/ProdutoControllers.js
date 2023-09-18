import ProdutoModel from "../models/ProdutoModel.js";
import ValidacaoServices from "../services/ValidacaoServices.js";
import ProdutoDAO from "../DAO/ProdutoDAO.js";

class ProdutoController {
    static rotas(app) {
        app.get("/produtos", async (req, res) => {
            const produtos = await ProdutoDAO.buscarTodosOsProdutos();
            res.status(200).json(produtos);
        });

        app.get("/produtos/:id", async (req, res) => {
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

        app.post("/produtos", async (req, res) => {
            const body = req.body;
            const isValid = ValidacaoServices.validaCamposProduto(body.NOME, body.DESCRICAO, body.PRECO, body.QTDEESTOQUE, body.EMAILARTESAO);

            if (isValid) {
                const produtoModelado = new ProdutoModel(body.NOME, body.DESCRICAO, body.PRECO, body.QTDEESTOQUE, body.EMAILARTESAO);

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

        app.put("/produtos/:id", async (req, res) => {
            const id = req.params.id;
            const body = req.body;
            const exists = await ValidacaoServices.validarExistenciaProduto(id);
            const isValid = ValidacaoServices.validaCamposProduto(body.NOME, body.DESCRICAO, body.PRECO, body.QTDEESTOQUE, body.EMAILARTESAO);

            if (exists) {
                if (isValid) {
                    const produtoModelado = new ProdutoModel(body.NOME, body.DESCRICAO, body.PRECO, body.QTDEESTOQUE, body.EMAILARTESAO);
                    ProdutoDAO.atualizarProdutoPorId(id, produtoModelado);
                    res.status(204).json();
                } else {
                    res.status(400).json({ error: true, message: `Campos inválidos` });
                }
            } else {
                res.status(404).json({ error: true, message: `Produto não encontrado para o id ${id}` });
            }
        })
    }
}

export default ProdutoController;
