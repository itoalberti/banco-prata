DROP TABLE Produto;
DROP TABLE Cliente;
DROP TABLE Agencia;
DROP TABLE Associacao;
DROP TABLE Contratacao;
COMMIT;

CREATE TABLE Agencia(
    cod_ag INT NOT NULL AUTO_INCREMENT,
    endereco_ag VARCHAR(60) NOT NULL,
    cidade_ag VARCHAR(40) NOT NULL,
    uf_ag VARCHAR(2) NOT NULL,
    CONSTRAINT pk_agencia PRIMARY KEY(cod_ag)
);

CREATE TABLE Cliente(
	cod_cli INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(60) NOT NULL,
	cpf VARCHAR(14) NOT NULL,
	dataNasc VARCHAR(10) NOT NULL,
	endereco VARCHAR(80) NOT NULL,
	cidade VARCHAR(60) NOT NULL,
	uf VARCHAR(2) NOT NULL,
	email VARCHAR(50) NOT NULL,
	telefone VARCHAR(15) NOT NULL,
    cod_ag INT NOT NULL,
    CONSTRAINT pk_cliente PRIMARY KEY(cod_cli),
    CONSTRAINT fk_agencia FOREIGN KEY(cod_ag) REFERENCES Agencia(cod_ag)
);

CREATE TABLE Produto(
	cod_prod INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(60),
    CONSTRAINT pk_produto PRIMARY KEY(cod_prod)
);

CREATE TABLE Contratacao(
	cod_cli INT NOT NULL,
    cod_prod INT NOT NULL,
    FOREIGN KEY (cod_cli) REFERENCES Cliente(cod_cli),
    FOREIGN KEY (cod_prod) REFERENCES Produto(cod_prod)
);

CREATE TABLE Associacao(
    cod_ag INT NOT NULL,
    cod_prod INT NOT NULL,
    FOREIGN KEY (cod_ag) REFERENCES Agencia(cod_ag),
    FOREIGN KEY (cod_prod) REFERENCES Produto(cod_prod)
)

-- -----------------------------------
SELECT *
FROM Cliente
INNER JOIN Contratacao
ON Cliente.cod_cli=Contratacao.cod_cli;