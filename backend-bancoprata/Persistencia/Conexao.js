// NADAVER
import mysql from 'mysql2/promise';

export default async function conectar() {
  // if (global.conexao && global.conexao.state !== 'disconnected') {
  //   return global.conexao;
  // }
  const pool = mysql.createPool({
    // PARA USAR O BANCO LOCAL:
    // host: '129.146.68.51',
    host: 'localhost',
    user: process.env.USUARIO_BD,
    password: process.env.SENHA_BD,
    // database: 'bancoprata',
    // PROBLEMA CLOUDPANEL:
    database: 'bancoteste',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  // global.conexao = conn;
  // return conn;
  return await pool.getConnection();
}
