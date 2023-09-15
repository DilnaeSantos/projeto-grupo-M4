import UsuariosModel from "../models/UsuariosModel.js";
import DAO from "./DAO.js";

// const USUARIOS_TABELA = "USUARIOS"

class UsuariosDAO extends DAO{
    /**
     * Método de inserção de dados da tabela Usuários
     * @param {UsuariosModel} data 
     */
    static async inserirUsuario(data){
        const dataValues = Object.values(data)
        const query = `
        INSERT INTO USUARIOS (NOME, EMAIL, TELEFONE) VALUES (?,?,?)
        `
        const result = await this.inserir(query, dataValues)
        return result
    }

    /**
     * Método que retorna todos os registros da tabela Usuários
     * @returns {Array<UsuariosModel>}
     */
    static async buscarTodosOsUsuarios() {
      const query = `
      SELECT * FROM USUARIOS
      `;
      const result = await this.buscar(query);
      return result;
    }


    /**
      * Método de busca de registros específicos na tabela Usuários através de um identificador
      * @param {string} id 
      * @returns {UsuariosModel}
      */
    static async buscarUsuarioPorId(id) {
      const query = `
      SELECT * FROM USUARIOS WHERE ID_USUARIO = ?
      `;
      const result = await this.buscarPorId(query, [id]);
      return result;
    }

    /**
      * Método de deleção de registros específicos na tabela Usuários através de um identificador
      * @param {string} id 
      */
    static async deletarUsuarioPorId(id) {
      const query = `
      DELETE FROM USUARIOS WHERE ID_USUARIO = ?
      `;
      await this.deletarPorId(query, [id]);
    }


    /**
     * Atualiza um registro específico da tabela Usuários através de um identificador
     * @param {string} id 
     * @param {any} data 
    */
    static async AtualizarUsuarioPorId(id, data) {
      const query = `
      UPDATE USUARIOS SET NOME = ?, EMAIL = ?, TELEFONE = ? WHERE ID_USUARIO = ?
      `;
      const values = [data.nome, data.email, data.telefone, id];
      await this.atualizarPorId(query, values);
}

}

export default UsuariosDAO;