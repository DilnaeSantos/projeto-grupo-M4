/**Modelo para artesões */

class ProdutoModel {
    /**
       * Construtor do model para artesãos
       * @param {string} nome 
       * @param {string} descricao 
       * @param {string} preco 
       * @param {string} qtDeEstoque
       * @param {string} emailArtesao
       */
        constructor (nome, descricao, preco, qtDeEstoque, emailArtesao){
            this.nome = nome
            this.descricao = descricao
            this.preco = preco
            this.qtDeEstoque = qtDeEstoque
            this.emailArtesao = emailArtesao
        }
    }
    
    export default ProdutoModel