// export default async function conectar() {
//   if (global.conexao && global.conexao.state != 'disconnected') {
//     return global.conexao;
//   }

//   const conn = mysql.createPool({
//     // CLOUDPANEL:
//     // database: bancoprata
//     // user: aluno25pfsii
//     // password: aluno25pfsii

//     host: '129.146.68.51',
//     user: 'aluno25pfsii',
//     password: 'aluno25pfsii',
//     database: 'bancoprata',
//     waitForConnections: true,
//   });

//   global.conexao = conn;
//   return conn;
// }

// NOVO CÓDIGO

// ► ► ► ► ► ► ► ► ► ►  OK ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄
import mysql from 'mysql2/promise';

export default async function conectar() {
  // if (global.conexao && global.conexao.state !== 'disconnected') {
  //   return global.conexao;
  // }
  const conn = mysql.createPool({
    // PARA USAR O BANCO LOCAL:
    // database: bancoprata
    // user: aluno25pfsii
    // senha: aluno25pfsii
    host: '129.146.68.51',
    user: process.env.USUARIO_BD,
    password: process.env.SENHA_BD,
    database: 'bancoprata',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    // port: 3306,
  });

  // global.conexao = conn;
  // return conn;
  return await conn.getConnection();
}
