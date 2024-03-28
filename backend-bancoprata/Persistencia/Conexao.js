export default async function conectar() {
  if (global.conexao && global.conexao.state != 'disconnected') {
    return global.conexao;
  }

  const conn = mysql.createPool({
    // CLOUDPANEL:
    // database: bancoprataDB
    // user: usuario
    // password: senha123
    host: '129.146.68.51',
    user: 'usuario',
    password: 'senha123',
    database: 'bancoprataDB',
    waitForConnections: true,
  });

  global.conexao = conn;
  return conn;
}
