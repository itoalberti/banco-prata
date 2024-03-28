CREATE TABLE Agencia(
    cod_ag INT NOT NULL AUTO_INCREMENT,
    endereco VARCHAR(60) NOT NULL,
    cidade VARCHAR(40) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    CONSTRAINT pk_agencia PRIMARY KEY(cod_ag)
);

CREATE TABLE Produto(
	cod_prod INT NOT NULL AUTO_INCREMENT KEY,
    nome VARCHAR(60)
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
    FOREIGN KEY (cod_ag) REFERENCES Agencia(cod_ag)
    FOREIGN KEY (cod_prod) REFERENCES Produto(cod_prod)
)

DROP TABLE Agencia;
DROP TABLE Cliente;
DROP TABLE Produto;
DROP TABLE Agencia_Produto;
DROP TABLE Cliente_Produto;
COMMIT;

SELECT *
FROM Cliente
INNER JOIN Cliente_Produto
ON Cliente.cod_cli=Cliente_Produto.cod_cli;

CREATE TABLE Agencia(
    cod_ag INT NOT NULL AUTO_INCREMENT,
    endereco VARCHAR(60) NOT NULL,
    cidade VARCHAR(40) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    CONSTRAINT pk_agencia PRIMARY KEY(cod_ag)
);

CREATE TABLE Produto(
	cod_prod INT NOT NULL AUTO_INCREMENT KEY,
    nome VARCHAR(60)
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
    CONSTRAINT pk_cliente PRIMARY KEY(cod_cli)
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
);