import Database from "../database/Database.js";

class DAO {
    /**
     * Método de inserção de Unidades
     * @param {string} query 
     * @param {Array<any>} data 
     */
    static inserirUnidade(query, data) {
        return new Promise((resolve, reject) => {
            Database.run(query, data, (error) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve({ error: false });
            });
        });
    }

    /**
     * Método de busca de Unidades
     * @param {string} query
     * @returns {any}
     */
    static buscarUnidades(query) {
        return new Promise((resolve, reject) => {
            Database.all(query, (error, rows) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Método de busca de Unidade específica através de um identificador
     * @param {string} query - A consulta SQL
     * @param {id} id - Parâmetros da consulta
     * @returns {any}
     */
    static buscarUnidadePorId(query, id) {
        return new Promise((resolve, reject) => {
            Database.get(query, id, (error, row) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    resolve(row);
                }
            });
        });
    }

    /**
     * Método de deleção de Unidade específica
     * @param {string} query - A consulta SQL
     * @param {id} id - Parâmetros da consulta
     * @returns {Promise<void>}
     */
    static deletarUnidadePorId(query, id) {
        return new Promise((resolve, reject) => {
            Database.run(query, id, function (error) {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Atualiza um registro específico de Unidade na base de dados
     * @param {string} query - A consulta SQL
     * @param {string} id - Parâmetros da consulta
     * @returns {Promise<void>}
     */
    static atualizarUnidadePorId(query, id) {
        return new Promise((resolve, reject) => {
            Database.run(query, id, function (error) {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}

export default DAO;
