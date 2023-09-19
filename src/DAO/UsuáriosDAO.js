import UsuarioModel from "../models/UsuarioModel.js";
import DAO from "./DAO.js";

class UsuarioDAO extends DAO {
    /**
     * Método de inserção de dados da tabela Usuários
     * @param {UsuarioModel} data 
     */
    static async inserirUsuario(data) {
        const dataValues = Object.values(data);
        const query = `
        INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES (?,?,?)
        `;
        const result = await this.inserir(query, dataValues);
        return result;
    }

    /**
     * Método que retorna todos os registros da tabela Usuários
     * @returns {Array<UsuarioModel>}
     */
    static async buscarTodosOsUsuarios() {
        const query = `
        SELECT * FROM USUARIOS
        `;
        const result = await this.buscar(query);
        return result;
    }

    /**
     * Método de busca de registros na tabela Usuários através de um identificador
     * @param {string} id 
     * @returns {UsuarioModel}
     */
    static async buscarUsuarioPorId(id) {
        const query = `
        SELECT * FROM USUARIOS WHERE ID_USUARIO = ?
        `;
        const result = await this.buscarPorId(query, [id]);
        return result;
    }

    /**
     * Método de deleção de registros  na tabela Usuários através de um identificador
     * @param {string} id 
     */
    static async deletarUsuarioPorId(id) {
        const query = `
        DELETE FROM USUARIOS WHERE ID_USUARIO = ?
        `;
        await this.deletarPorId(query, [id]);
    }

    /**
     * Atualiza um registro da tabela Usuários através de um identificador
     * @param {string} id 
     * @param {any} data 
     */
    static async atualizarUsuarioPorId(id, data) {
        const query = `
        UPDATE USUARIOS SET NOME = ?, EMAIL = ?, SENHA = ? WHERE ID_USUARIO = ?
        `;
        const values = [data.nome, data.email, data.senha, id];
        await this.atualizarPorId(query, values);
    }
}

export default UsuarioDAO;
