import Database from "./Database";

const USUARIOS_TABLE = `
CREATE TABLE IF NOT EXISTS "USUARIOS" (
        "ID_USUARIO" INTEGER PRIMARY KEY AUTOINCREMENT,
        "NOME" varchar(255),
        "EMAIL" varchar(255),
        "TELEFONE" varchar(11)
    );
`

const PRODUTO_TABLE = `
CREATE TABLE IF NOT EXISTS "PRODUTO" (
        "ID_PRODUTO" INTEGER PRIMARY KEY AUTOINCREMENT,
        "NOME" varchar(255),
        "DESCRICAO" varchar(255),
        "PRECO" REAL,
        "QTDESTOQUE" INTEGER
    );
`

const ARTESAO_TABLE = `
CREATE TABLE IF NOT EXISTS "ARTESAO" (
        "NOME" varchar(255),
        "EMAIL" varchar(255) PRIMARY KEY,
        "TELEFONE" varchar(11),
        "TIPODEARTE" varchar(255),
        "BIO" varchar(255),
        "ID_PRODUTO" INTEGER,
        FOREIGN KEY (ID_PRODUTO) REFERENCES PRODUTO(ID_PRODUTO)
    );
`

const ENDERECO_TABLE = `
CREATE TABLE IF NOT EXISTS "ENDERECO" (
        "ID_ENDERECO" INTEGER PRIMARY KEY AUTOINCREMENT,
        "CEP" varchar(255),
        "RUA" varchar(255),
        "NUMERO" varchar(255),
        "CIDADE" varchar(255),
        "BAIRRO" varchar(255)
    );
`

const UNIDADE_TABLE = `
CREATE TABLE IF NOT EXISTS "UNIDADE" (
        "ID_UNIDADE" INTEGER PRIMARY KEY AUTOINCREMENT,
        "NOME" varchar(255),
        "ID_ENDERECO",
        FOREIGN KEY (ID_ENDERECO) REFERENCES ENDERECO(ID_ENDERECO)
    );
`

function criarTabelas() {
    Database.run(USUARIOS_TABLE, (error) => {
        if (error) {
            console.log("Erro ao criar tabela de Usuários")
        } else {
            console.log("Tabela Usuários criada com sucesso!")
        }
    });

    Database.run(PRODUTO_TABLE, (error) => {
        if (error) {
            console.log("Erro ao criar tabela de Produtos")
        } else {
            console.log("Tabela Produtos criada com sucesso!")
        }
    });

    Database.run(ARTESAO_TABLE, (error) => {
        if (error) {
            console.log("Erro ao criar tabela de Artesão")
        } else {
            console.log("Tabela Artesão criada com sucesso!")
        }
    });

    Database.run(ENDERECO_TABLE, (error) => {
        if (error) {
            console.log("Erro ao criar tabela de Endereço")
        } else {
            console.log("Tabela Endereço criada com sucesso!")
        }
    });

    Database.run(UNIDADE_TABLE, (error) => {
        if (error) {
            console.log("Erro ao criar tabela de Unidade")
        } else {
            console.log("Tabela Unidade criada com sucesso!")
        }
    });
};

Database.serialize(()=>{
    criarTabelas();
    //populaTabelaUsuarios();
});
