import ArtesaosDAO from "../DAO/ArtesaosDAO.js";
import EnderecosDAO from "../DAO/EnderecoDAO.js"
import ProdutosDAO from "../DAO/ProdutoDAO.js";
import UnidadesDAO from "../DAO/UnidadeDAO.js";
import UsuariosDAO from "../DAO/UsuariosDAO.js";

class ValidacaoServices{
    /*
     * Método que valida a existencia do usuário na base de dados
     * @param {string} id 
     * @returns {boolean}
     */
    static async validarExistencia(id) {
        const usuario = await UsuariosDAO.buscarUsuarioPorId(id);
        return usuario ;
    }

    /**
     * Método que valida a existencia do produto na base de dados
     * @param {string} id 
     * @returns {boolean}
     */
    static async validarExistenciaProduto(id) {
        const produto = await ProdutosDAO.buscarProdutoPorId(id);
        return produto ;
    }

    /**
     * Método que valida a existencia do endereço na base de dados
     * @param {string} id 
     * @returns {boolean}
     */
    static async validarExistenciaEndereco(id) {
        const endereco = await EnderecosDAO.buscarEnderecoPorId(id);
        return endereco ;
    }
    
    /**
     * Método que valida a existencia do usuário na base de dados
     * @param {string} id 
     * @returns {boolean}
     */
    static async validarExistenciaUnidade(id) {
        const unidade = await UnidadesDAO.buscarUnidadePorId(id);
        return unidade ;
    }

    /**
     * Método que valida a existencia do artesão na base de dados
     * @param {string} email
     * @returns {boolean}
     */
    static async validarExistenciaEmail(email) {
        const artesao = await ArtesaosDAO.buscarArtesaoPorEmail(email);
        return artesao ;
    }

    /**
     * Método que valida a existencia do produto pelo email do artesao na base de dados
     * @param {string} email
     * @returns {boolean}
     */
    static async validarExistenciaEmailArtesaoEmProduto(email) {
        const artesao = await ProdutosDAO.buscarProdutoPorArtesao(email);
        return artesao ;
    }

    /**
     * Método de validação de nome
     * @param {string} nome 
     * @returns {boolean}
     */

    static validaNome(nome){
        if (typeof nome !== "string") return false;
        
        const trimmedName = nome.trim();
    
        // Verifica se o nome tem um tamanho adequado (por exemplo, entre 3 e 50 caracteres)
        if (trimmedName.length < 3 || trimmedName.length > 50) return false;
    
        // Verifica se o nome contém apenas caracteres alfabéticos e espaços
        const regex = /^[a-zA-ZáÁéÉíÍóÓúÚàÀèÈìÌòÒùÙçÇãõÃÕâêôÂÊÔ ]+$/;
        return regex.test(trimmedName);
    }
    


    /**
     * Método para validação de email
     * @param {string} email 
     * @returns {boolean}
     */
    static validaEmail(email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return typeof email === "string" && email.length > 2 && emailRegex.test(email);
    }

    /**
     * Método para validação de telefone
     * @param {string} telefone 
     * @returns {boolean}
     */
    static validaTelefone(telefone){
        // Verifica se é uma string
        if (typeof telefone !== "string") return false;

        // Remove caracteres de formatação comuns
        const limpo = telefone.replace(/[-() ]/g, '');

        // Verifica se depois de remover caracteres de formatação, a string só tem dígitos
        if (!limpo.split('').every(char => char >= '0' && char <= '9')) return false;

        // Verifica se tem um tamanho válido (por exemplo, entre 10 e 11 dígitos para telefones brasileiros)
        return limpo.length >= 10 && limpo.length <= 11;
    }

    /**
     * Método para validação de todos os campos fornecidos pelo cliente na entidade usuário
     * @param {string} nome 
     * @param {string} email 
     * @param {string} telefone 
     * @returns 
     */
    static validaCamposUsuario(nome, email, telefone){
        const isValid = this.validaNome(nome) && this.validaEmail(email) && this.validaTelefone(telefone)
        return isValid
    }

    static validaCamposArtesao(nome, email, telefone, tipoDeArte, bio){
        const isValid = this.validaNome(nome) && this.validaEmail(email) && this.validaTelefone(telefone) && tipoDeArte != undefined && bio != undefined
        return isValid
    }

    static validaCamposProduto(nome, descricao, preco, qtdestoque, emailArtesao){
        const isValid = this.validaNome(nome) && descricao != undefined && preco != undefined && qtdestoque != undefined && this.validaEmail(emailArtesao)
        return isValid
    }

    static validaCamposEndereco(cep, rua, numero, cidade, bairro){
        const isValid = cep != undefined && rua != undefined && numero != undefined && cidade != undefined && bairro != undefined
        return isValid
    }

    static validaCamposUnidade(nome, idEndereco){
        const isValid = this.validaNome(nome) && idEndereco != undefined 
        return isValid
    }
}

export default ValidacaoServices