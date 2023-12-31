import Database from "../database/Database.js";

class DAO{
    /**
     * Método de inserção de dados
     * @param {string} query 
     * @param {Array<any>} data 
     */
    static inserir(query, data){
        return new Promise((resolve, reject)=>{
            Database.run(query, data, (error)=>{
                if(error){
                    console.log(error)
                    reject(error)
                }
                resolve({error:false})
            })
        })
    }

    /**
     * Método de busca de dados
     * @param {string} query
     * @returns {any}
     */
    static buscar(query){
        return new Promise((resolve, reject)=>{
            Database.all(query, (error, rows)=>{
                if(error){
                    console.log(error)
                    reject(error)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    /**
     * Método de busca de dados específicos através de um identificador
     * @param {string} query - A consulta SQL
     * @param {id} id - Parâmetros da consulta
     * @returns {any}
     */
    static buscarPorId(query, id) {
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
     * Método de busca de dados específicos através de um identificador
     * @param {string} query - A consulta SQL
     * @param {string} email- Parâmetros da consulta
     * @returns {any}
     */
    static buscarPorEmail(query, email) {
        return new Promise((resolve, reject) => {
        //   const query = "SELECT * FROM ARTESAO WHERE EMAIL_ARTESAO = ?";
            Database.get(query, email, (error, row) => {
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
     * Método de busca de dados específicos através de um identificador
     * @param {string} query - A consulta SQL
     * @param {string} email- Parâmetros da consulta
     * @returns {any}
     */
    static buscarProdutoPorEmailArtesao(query, email) {
      return new Promise((resolve, reject) => {
            Database.all(query, email, (error, rows) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
      }

    /**
     * Método de deleção de dados específicos
     * @param {string} query - A consulta SQL
     * @param {id} id - Parâmetros da consulta
     * @returns {Promise<void>}
     */
    static deletarPorId(query, id) {
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
     * Método de deleção de dados específicos
     * @param {string} query - A consulta SQL
     * @param {email} email - Parâmetros da consulta
     * @returns {Promise<void>}
     */
        static deletarPorEmail(query, email) {
          return new Promise((resolve, reject) => {
              Database.run(query, email, function (error) {
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
     * Atualiza um registro específico na base de dados
     * @param {string} query - A consulta SQL
     * @param {string} id - Parâmetros da consulta
     * @returns {Promise<void>}
     */
    static atualizarPorId(query, id) {
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
     * Atualiza um registro específico na base de dados
     * @param {string} query - A consulta SQL
     * @param {string} email - Parâmetros da consulta
     * @returns {Promise<void>}
     */
        static atualizarPorEmail(query, email) {
          return new Promise((resolve, reject) => {
              Database.run(query, email, function (error) {
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