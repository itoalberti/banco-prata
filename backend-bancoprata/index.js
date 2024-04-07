// NADAVER
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import rotaCliente from './Rotas/rotaCliente.js';
import rotaAgencia from './Rotas/rotaAgencia.js';
import rotaProduto from './Rotas/rotaProduto.js';
// import rotaLogin from './Rotas/rotaLogin.js';
// import { verificarAcesso } from './Seguranca/Autenticacao.js';

console.log('dotenv.config():');
dotenv.config();
console.log('process.env():');
console.log(process.env);

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   session({
//     secret: process.env.SEGREDO,
//     resave: false,
//     saveUninitialized: true,
//     maxAge: 1000 * 60 * 5,
//   })
// );

// app.use('/login', rotaLogin);
app.use('/agencia', /* verificarAcesso,*/ rotaAgencia);
app.use('/cliente', /*/verificarAcesso,*/ rotaCliente);
app.use('/produto', /*/verificarAcesso,*/ rotaProduto);

const hostname = '0.0.0.0';
const port = 3306;
// APÓS PROBLEMA NO CLOUDPANEL
// const port = 4001;

app.listen(port, hostname, () => {
  console.log(`Backend ouvindo em http://${hostname}:${port}`);
});

// AGÊNCIA:
// cadastrar, alterar, excluir e listar → OK!
