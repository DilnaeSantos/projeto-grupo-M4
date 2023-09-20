import EnderecoModel from "../models/EnderecoModel.js"
import DAO from "./DAO.js"

class EnderecosDAO extends DAO {
    /**
     * Método de inserção de dados da tabela Endereco
     * @param {EnderecoModel} data 
     */
    static async inserirEndereco(data) {
        const dataValues = Object.values(data)
        const query = `
          INSERT INTO ENDERECO (CEP, RUA, NUMERO, CIDADE, BAIRRO) VALUES (?,?,?,?,?)
          `
        const result = await this.inserir(query, dataValues)
        return result
    }

    /**
     * Método que retorna todos os registros da tabela Endereços
     * @returns {Array<EnderecosModel>}
     */
    static async buscarTodosOsEnderecos() {
        const query = `
      SELECT * FROM ENDERECO
      `;
        const result = await this.buscar(query);
        return result;
    }

    /**
      * Método de busca de registros específicos na tabela endereço através de um identificador
      * @param {string} id 
      * @returns {UsuariosModel}
      */
    static async buscarEnderecoPorId(id) {
        const query = `
        SELECT * FROM ENDERECO WHERE ID_ENDERECO = ?
        `;
        const result = await this.buscarPorId(query, [id]);
        return result;
    }

    /**
      * Método de deleção de registros específicos na tabela Endereco através de um identificador
      * @param {string} id 
      */
    static async deletarEnderecoPorId(id) {
        const query = `
        DELETE FROM ENDERECO WHERE ID_ENDERECO = ?
          `;
        await this.deletarPorId(query, [id]);
    }

    /**
     * Atualiza um registro específico da tabela Endereco através de um identificador
     * @param {string} id 
     * @param {any} data 
    */
    static async atualizarEnderecoPorId(id, data) {
        const query = `
      UPDATE ENDERECO SET CEP = ?, RUA = ?, NUMERO = ?, CIDADE = ?, BAIRRO = ?WHERE ID_ENDERECO = ?
          `;
        const values = [data.cep, data.rua, data.numero, data.cidade, data.bairro, id];
        await this.atualizarPorId(query, values);
    }

}

export default EnderecosDAO