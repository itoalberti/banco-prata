DROP TABLE Agencia_Produto;
DROP TABLE Cliente_Produto;
DROP TABLE Agencia;
DROP TABLE Cliente;
DROP TABLE Produto;
COMMIT;


CREATE TABLE Agencia(
    cod_ag INT NOT NULL AUTO_INCREMENT,
    endereco VARCHAR(60) NOT NULL,
    cidade VARCHAR(40) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    CONSTRAINT cod_ag PRIMARY KEY(cod_ag)
);

CREATE TABLE Produto(
	cod_prod INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(60),
    CONSTRAINT cod_prod PRIMARY KEY(cod_prod)
);

CREATE TABLE Cliente(
	cod_cli INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(60) NOT NULL,
	cpf NUMERIC(11) NOT NULL,
	dataNasc DATE NOT NULL,
	endereco VARCHAR(80) NOT NULL,
	cidade VARCHAR(60) NOT NULL,
	uf VARCHAR(2) NOT NULL,
	email VARCHAR(50) NOT NULL,
	telefone VARCHAR(15) NOT NULL,
    cod_ag INT NOT NULL,
    FOREIGN KEY (cod_ag) REFERENCES Agencia(cod_ag),
    CONSTRAINT cod_cli PRIMARY KEY(cod_cli)
);

CREATE TABLE Cliente_Produto(
	cod_cli INT NOT NULL,
    cod_prod INT NOT NULL,
    FOREIGN KEY (cod_cli) REFERENCES Cliente(cod_cli),
    FOREIGN KEY (cod_prod) REFERENCES Produto(cod_prod)
);

CREATE TABLE Agencia_Produto(
    cod_ag INT NOT NULL,
    cod_prod INT NOT NULL,
    FOREIGN KEY (cod_ag) REFERENCES Agencia(cod_ag),
    FOREIGN KEY (cod_prod) REFERENCES Produto(cod_prod)
)

-- -----------------------------------
SELECT *
FROM Cliente
INNER JOIN Cliente_Produto
ON Cliente.cod_cli=Cliente_Produto.cod_cli;