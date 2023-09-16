/**Modelo para artesões */

class ArtesaoModel {
/**
   * Construtor do model para artesãos
   * @param {string} nome 
   * @param {string} email 
   * @param {string} telefone 
   * @param {string} tipoDeArte
   * @param {string} bio
   */
    constructor (nome, email, telefone, tipoDeArte, bio){
        this.nome = nome
        this.email = email
        this.telefone = telefone
        this.tipoDeArte = tipoDeArte
        this.bio = bio
    }
}

export default ArtesaoModel