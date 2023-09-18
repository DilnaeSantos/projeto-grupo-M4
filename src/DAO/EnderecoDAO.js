import EnderecoModel from "../models/EnderecoModel.js";
import DAO from "./DAO.js";

class EnderecoDAO extends DAO {
    /**
     * Método de inserção de dados da tabela Endereços
     * @param {EnderecoModel} data 
     */
    static async inserirEndereco(data) {
        const dataValues = Object.values(data);
        const query = `
        INSERT INTO ENDERECOS (RUA, CIDADE, CEP) VALUES (?,?,?)
        `;
        const result = await this.inserir(query, dataValues);
        return result;
    }

    /**
     * Método que retorna todos os registros da tabela Endereços
     * @returns {Array<EnderecoModel>}
     */
    static async buscarTodosOsEnderecos() {
        const query = `
        SELECT * FROM ENDERECOS
        `;
        const result = await this.buscar(query);
        return result;
    }

    /**
     * Método de busca de registros na tabela Endereços através de um identificador
     * @param {string} id 
     * @returns {EnderecoModel}
     */
    static async buscarEnderecoPorId(id) {
        const query = `
        SELECT * FROM ENDERECOS WHERE ID_ENDERECO = ?
        `;
        const result = await this.buscarPorId(query, [id]);
        return result;
    }

    /**
     * Método de deleção de registros na tabela Endereços através de um identificador
     * @param {string} id 
     */
    static async deletarEnderecoPorId(id) {
        const query = `
        DELETE FROM ENDERECOS WHERE ID_ENDERECO = ?
        `;
        await this.deletarPorId(query, [id]);
    }

    /**
     * Atualiza um registro da tabela Endereços através de um identificador
     * @param {string} id 
     * @param {any} data 
     */
    static async atualizarEnderecoPorId(id, data) {
        const query = `
        UPDATE ENDERECOS SET RUA = ?, CIDADE = ?, CEP = ? WHERE ID_ENDERECO = ?
        `;
        const values = [data.rua, data.cidade, data.cep, id];
        await this.atualizarPorId(query, values);
    }
}

export default EnderecoDAO;
