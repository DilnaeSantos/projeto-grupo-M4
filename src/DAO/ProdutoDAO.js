import ProdutoModel from "../models/ProdutoModel.js"
import DAO from "./DAO.js"

class ProdutosDAO extends DAO {
    /**
     * Método de inserção de dados da tabela Produto
     * @param {ProdutoModel} data 
     */
    static async inserirProduto(data) {
        const dataValues = Object.values(data)
        const query = `
        INSERT INTO PRODUTO (NOME, DESCRICAO, PRECO, QTDESTOQUE, EMAIL_ARTESAO) VALUES (?,?,?,?,?)
        `
        const result = await this.inserir(query, dataValues)
        return result
    }

    /**
     * Método que retorna todos os registros da tabela Produtos
     * @returns {Array<ProdutosModel>}
     */
    static async buscarTodosOsProdutos() {
        const query = `
      SELECT * FROM PRODUTO
      `;
        const result = await this.buscar(query);
        return result;
    }

    /**
      * Método de busca de registros específicos na tabela Produtos através de um identificador
      * @param {string} id 
      * @returns {ProdutosModel}
      */
    static async buscarProdutoPorId(id) {
        const query = `
        SELECT * FROM PRODUTO WHERE ID_PRODUTO = ?
        `;
        const result = await this.buscarPorId(query, [id]);
        return result;
    }

    /**
      * Método de busca de registros específicos na tabela Produtos através do Artesao
      * @param {string} email
      * @returns {ProdutosModel}
      */
    static async buscarProdutoPorArtesao(email) {
        const query = `
        SELECT * FROM PRODUTO WHERE EMAIL_ARTESAO = ?
      `;
        const result = await this.buscarProdutoPorEmailArtesao(query, [email]);
        return result;
    }

    /**
      * Método de deleção de registros específicos na tabela Produtos através de um identificador
      * @param {string} id 
      */
    static async deletarProdutoPorId(id) {
        const query = `
        DELETE FROM PRODUTO WHERE ID_PRODUTO = ?
      `;
        await this.deletarPorId(query, [id]);
    }

    /**
     * Atualiza um registro específico da tabela Produto através de um identificador
     * @param {string} id 
     * @param {any} data 
    */
    static async atualizarProdutoPorId(id, data) {
        const query = `
      UPDATE PRODUTO SET NOME = ?, DESCRICAO = ?, PRECO = ?, QTDESTOQUE = ?, EMAIL_ARTESAO = ? WHERE ID_PRODUTO = ?
      `;
        const values = [data.nome, data.descricao, data.preco, data.qtdEstoque, data.emailArtesao, id];
        await this.atualizarPorId(query, values);
    }

}

export default ProdutosDAO