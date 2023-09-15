import Database from "./Database.js";

const USUARIOS_TABLE = `
CREATE TABLE IF NOT EXISTS "USUARIOS" (
        "ID_USUARIO" INTEGER PRIMARY KEY AUTOINCREMENT,
        "NOME" varchar(255),
        "EMAIL" varchar(255),
        "TELEFONE" varchar(11)
    );
`

const ARTESAO_TABLE = `
CREATE TABLE IF NOT EXISTS "ARTESAO" (
        "NOME" varchar(255),
        "EMAIL_ARTESAO" varchar(255) PRIMARY KEY,
        "TELEFONE" varchar(11),
        "TIPODEARTE" varchar(255),
        "BIO" varchar(255)
    );
`

const PRODUTO_TABLE = `
CREATE TABLE IF NOT EXISTS "PRODUTO" (
        "ID_PRODUTO" INTEGER PRIMARY KEY AUTOINCREMENT,
        "NOME" varchar(255),
        "DESCRICAO" varchar(255),
        "PRECO" REAL,
        "QTDESTOQUE" INTEGER,
        "EMAIL_ARTESAO" varchar(255),
        FOREIGN KEY (EMAIL_ARTESAO) REFERENCES PRODUTO(EMAIL_ARTESAO)
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

    Database.run(ARTESAO_TABLE, (error) => {
        if (error) {
            console.log("Erro ao criar tabela de Artesão")
        } else {
            console.log("Tabela Artesão criada com sucesso!")
        }
    });

    Database.run(PRODUTO_TABLE, (error) => {
        if (error) {
            console.log("Erro ao criar tabela de Produtos")
        } else {
            console.log("Tabela Produtos criada com sucesso!")
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

// populando o banco de dados

const ADD_USUARIOS_DATA = `
INSERT INTO USUARIOS (NOME, EMAIL, TELEFONE)
VALUES 
    ('caroline', 'caroline_CA@bol.com.br', '2140028911'),
    ('dilnae', 'dilnae_RR@gmail.com', '1140028922'),
    ('yohan', 'yohan_brisa@yahoo.com', '3125214430')
`

const ADD_ARTESAO_DATA = `
INSERT INTO ARTESAO (NOME, EMAIL_ARTESAO, TELEFONE, TIPODEARTE, BIO)
VALUES
    ('lauren martins', 'lauren_martins@bol.com', '214837911', 'artesanato', ' Uma artesã talentosa que transforma sua criatividade em belas obras de arte. Seu amor pela arte se reflete em cada peça única que ela cria. Inspirada pela natureza e cores vibrantes, Lauren traz vida a objetos comuns por meio de seu dom artístico.'),
    ('pan conçalves', 'pan_conçalves@gmail.com', '4140028297', 'pintora', 'Uma pintora apaixonada por cores e formas, que utiliza sua paleta de cores para criar obras de arte que cativam e emocionam. Com traços expressivos e uma mente criativa, Pan explora os limites da pintura, trazendo à vida suas visões únicas e vibrantes em cada tela. Sua jornada artística é uma celebração da criatividade e da expressão pessoal.'),
    ('léo zeira', 'léo_zeira@yahoo.com', '2164214430', 'literatura', 'Um autor literário que desafia as convenções e mergulha profundamente nas águas da literatura experimental. Com sua prosa ousada e estilo narrativo não convencional, Léo Zeira cria histórias que desafiam as expectativas e convidam os leitores a explorar novos territórios literários. Sua abordagem única e corajosa para a escrita o torna um destaque na cena literária contemporânea, onde a inovação e a criatividade são valorizadas. Em suas palavras, a literatura se transforma em uma jornada intrigante e imprevisível, mantendo os leitores ansiosos por cada página.')
`

const ADD_PRODUTO_DATA = `
INSERT INTO PRODUTO (NOME, DESCRICAO, PRECO, QTDESTOQUE, EMAIL_ARTESAO)
VALUES
    ('Sinfonia de Cores', 'A pintura "Sinfonia de Cores" de Pan Gonçalves é uma explosão visual de criatividade e emoção. Nesta obra-prima, Pan combina uma rica paleta de cores vibrantes que dançam em harmonia no quadro. A pintura retrata uma paisagem abstrata que parece existir em um mundo além da realidade, onde a imaginação corre solta.

    Os traços ousados e os padrões intricados criam uma sensação de movimento e profundidade, convidando o espectador a se perder na composição. À medida que os olhos exploram a tela, diferentes formas e figuras emergem, revelando uma narrativa visual única para cada observador. "Sinfonia de Cores" é uma celebração da liberdade artística e da capacidade da arte de evocar emoções profundas e pessoais em quem a contempla. É uma obra que continua a inspirar e cativar aqueles que têm o privilégio de apreciá-la.', '268.65', '1', 'pan_conçalves@gmail.com'),
    ('Arte em Fios', ' "Arte em Fios" é uma coleção exclusiva de peças de artesanato criadas com paixão e habilidade pela talentosa artesã Lauren Martins. Cada item desta coleção é cuidadosamente confeccionado à mão, dando vida a uma variedade de produtos únicos que são verdadeiras obras de arte.', '159.45', '4', 'lauren_martins@bol.com'),
    ('Aventuras de Páginas', '"Aventuras de Páginas" é uma experiência literária única e envolvente que leva os leitores a mundos inexplorados por meio de histórias cativantes. Este conjunto exclusivo de romances escritos por Léo Zeira é uma jornada literária que combina criatividade, mistério e aventura em cada página.', '97.68', '68', 'léo_zeira@yahoo.com')
`

const ADD_ENDERECO_DATA = `
INSERT INTO ENDERECO (CEP, RUA, NUMERO, CIDADE, BAIRRO)
VALUES
    ('98765-432', 'Avenida das Cores', '456', 'Imaginópolis', 'Artístico'),
    ('12345-678', 'Rua das Artes', '136', ' Belaville', 'Centro')
`

const ADD_UNIDADE_DATA = `
INSERT INTO UNIDADE (NOME, ID_ENDERECO)
VALUES
    ('Galeria ArteViva', 2),
    ('DeltaArtes', 1)
`

function populaTabelas() {
    Database.run(ADD_USUARIOS_DATA, (error)=> {
       if (error) {
        console.log("Erro ao popular tabela de Usuários")
        }
        else {
            console.log("Tabela Usuários populada com sucesso!")
        }
    });

    Database.run(ADD_ARTESAO_DATA, (error)=> {
        if (error) {
         console.log("Erro ao popular tabela de Usuários")
         }
         else {
             console.log("Tabela Usuários populada com sucesso!")
         }
     });

     Database.run(ADD_PRODUTO_DATA, (error)=> {
        if (error) {
         console.log("Erro ao popular tabela de Usuários")
         }
         else {
             console.log("Tabela Usuários populada com sucesso!")
         }
     });

     Database.run(ADD_ENDERECO_DATA, (error)=> {
        if (error) {
         console.log("Erro ao popular tabela de Usuários")
         }
         else {
             console.log("Tabela Usuários populada com sucesso!")
         }
     });

     Database.run(ADD_UNIDADE_DATA, (error)=> {
        if (error) {
         console.log("Erro ao popular tabela de Usuários")
         }
         else {
             console.log("Tabela Usuários populada com sucesso!")
         }
     });
}

Database.serialize(()=>{
    criarTabelas();
    populaTabelas();
});