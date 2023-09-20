import ArtesaoModel from "../models/ArtesaoModel.js";
import DAO from "./DAO.js";

class ArtesaosDAO extends DAO{
    /**
     * Método de inserção de dados da tabela Artesao
     * @param {ArtesaoModel} data 
     */
    static async inserirArtesao(data){
        const dataValues = Object.values(data)
        const query = `
        INSERT INTO ARTESAO (NOME, EMAIL_ARTESAO, TELEFONE, TIPODEARTE, BIO) VALUES (?,?,?,?,?)
        `
        const result = await this.inserir(query, dataValues)
        return result
    }

    /**
     * Método que retorna todos os registros da tabela Artesao
     * @returns {Array<ArtesaoModel>}
     */
    static async buscarTodosOsArtesaos() {
      const query = `
      SELECT * FROM ARTESAO
      `;
      const result = await this.buscar(query);
      return result;
    }


    /**
      * Método de busca de registros específicos na tabela Artesao  através de um identificador
      * @param {string} email
      * @returns {ArtesaoModel}
      */
    static async buscarArtesaoPorEmail(email) {
      const query = `
      SELECT * FROM ARTESAO WHERE EMAIL_ARTESAO = ? 
      `
      const result = await this.buscarPorEmail(query, email);
      return result;
  }

    /**
      * Método de deleção de registros específicos na tabela Artesao através de um identificador
      * @param {string} email
      */
    static async deletarArtesaoPorEmail(email) {
      const query = `
      DELETE FROM ARTESAO WHERE EMAIL_ARTESAO = ?
      `;
      await this.deletarPorEmail(query, [email]);
    }


    /**
     * Atualiza um registro específico da tabela Artesao através de um identificador
     * @param {string} email
     * @param {any} data 
    */
    static async atualizarArtesaoPorEmail(email, data) {
      const query = `
      UPDATE ARTESAO SET NOME = ?, EMAIL_ARTESAO = ?, TELEFONE = ?, TIPODEARTE = ?, BIO = ?  WHERE EMAIL_ARTESAO = ?
      `;
      const values = [data.nome, data.email, data.telefone, data.tipoDeArte, data.bio, email];
      await this.atualizarPorEmail(query, values);
}

}

export default ArtesaosDAO;