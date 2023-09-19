import ProdutoModel from "../models/ProdutoModel.js";
import DAO from "./DAO.js";

class ProdutoDAO extends DAO {
    /**
     * Método de inserção de dados da tabela Produtos
     * @param {ProdutoModel} data 
     */
    static async inserirProduto(data) {
        const dataValues = Object.values(data);
        const query = `
        INSERT INTO PRODUTOS (NOME, PRECO, CATEGORIA) VALUES (?,?,?)
        `;
        const result = await this.inserir(query, dataValues);
        return result;
    }

    /**
     * Método que retorna todos os registros da tabela Produtos
     * @returns {Array<ProdutoModel>}
     */
    static async buscarTodosOsProdutos() {
        const query = `
        SELECT * FROM PRODUTOS
        `;
        const result = await this.buscar(query);
        return result;
    }

    /**
     * Método de busca de registros específicos na tabela Produtos através de um identificador
     * @param {string} id 
     * @returns {ProdutoModel}
     */
    static async buscarProdutoPorId(id) {
        const query = `
        SELECT * FROM PRODUTOS WHERE ID_PRODUTO = ?
        `;
        const result = await this.buscarPorId(query, [id]);
        return result;
    }

    /**
     * Método de deleção de registros específicos na tabela Produtos através de um identificador
     * @param {string} id 
     */
    static async deletarProdutoPorId(id) {
        const query = `
        DELETE FROM PRODUTOS WHERE ID_PRODUTO = ?
        `;
        await this.deletarPorId(query, [id]);
    }

    /**
     * Atualiza um registro específico da tabela Produtos através de um identificador
     * @param {string} id 
     * @param {any} data 
     */
    static async atualizarProdutoPorId(id, data) {
        const query = `
        UPDATE PRODUTOS SET NOME = ?, PRECO = ?, CATEGORIA = ? WHERE ID_PRODUTO = ?
        `;
        const values = [data.nome, data.preco, data.categoria, id];
        await this.atualizarPorId(query, values);
    }
}

export default ProdutoDAO;
