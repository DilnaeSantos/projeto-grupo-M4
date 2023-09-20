import UnidadesModel from "../models/UnidadesModel.js"
import DAO from "./DAO.js"

class UnidadesDAO extends DAO {

    /**
     * Método de inserção de dados da tabela Usuários
     * @param {UsuariosModel} data 
     */
    static async inserirUnidade(data) {
        const dataValues = Object.values(data)
        const query = `
        INSERT INTO UNIDADE (NOME, ID_ENDERECO) VALUES (?,?)
        `
        const result = await this.inserir(query, dataValues)
        return result
    }

    /**
     * Método que retorna todos os registros da tabela Unidades
     * @returns {Array<UnidadesModel>}
     */
    static async buscarTodasAsUnidades() {
        const query = `
        SELECT * FROM UNIDADE 
        `;
        const result = await this.buscar(query);
        return result;
    }

    /**
      * Método de busca de registros específicos na tabela Unidade através de um identificador
      * @param {string} id 
      * @returns {UsuariosModel}
      */
    static async buscarUnidadePorId(id) {
        const query = `
        SELECT * FROM UNIDADE WHERE ID_UNIDADE = ?
        `;
        const result = await this.buscarPorId(query, [id]);
        return result;
    }

    /**
      * Método de deleção de registros específicos na tabela Unidades através de um identificador
      * @param {string} id 
      */
    static async deletarUnidadePorId(id) {
        const query = `
        DELETE FROM UNIDADE WHERE ID_UNIDADE = ?
        `;
        await this.deletarPorId(query, [id]);
    }

    /**
     * Atualiza um registro específico da tabela Usuários através de um identificador
     * @param {string} id 
     * @param {any} data 
    */
    static async atualizarUnidadePorId(id, data) {
        const query = `
        UPDATE UNIDADE SET NOME = ?, ID_ENDERECO = ? WHERE ID_UNIDADE = ?
        `;
        const values = [data.nome, data.idEndereco, id];
        await this.atualizarPorId(query, values);
    }

}

export default UnidadesDAO