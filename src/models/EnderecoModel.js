/**Modelo para endereço */

class EnderecoModel {
    /**
       * Construtor do model para endereço
       * @param {string} cep 
       * @param {string} rua 
       * @param {string} numero 
       * @param {string} cidade
       * @param {string} bairro
       */
        constructor (cep, rua, numero, cidade, bairro){
            this.cep = cep
            this.rua = rua
            this.numero = numero
            this.cidade = cidade
            this.bairro = bairro
        }
    }
    
    export default EnderecoModel