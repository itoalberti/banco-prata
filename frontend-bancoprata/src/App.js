// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import TelaInicial from './telas/TelaInicial';
import Tela404 from './telas/Tela404.jsx';
import TelaCadastrarAgencia from './telas/TelaCadastrarAgencia';
import TelaAlterarAgencia from './telas/TelaAlterarAgencia.jsx';
import TelaCadastrarCliente from './telas/TelaCadastrarCliente.jsx';
import TelaAlterarCliente from './telas/TelaAlterarCliente.jsx';
import TelaCadastrarProduto from './telas/TelaCadastrarProduto.jsx';
import TelaExibirAgencias from './tabelas/TelaExibirAgencias.jsx';
import TelaExibirClientes from './tabelas/TelaExibirClientes.jsx';
import TelaExibirProdutos from './tabelas/TelaExibirProdutos.jsx';
import TelaAssociarProdutoAgencia from './telas/___TelaAssociarProdutoAgencia.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* HOME */}
          <Route path='/' element={<TelaInicial />} />

          {/* AGÊNCIAS */}
          <Route path='/cadastraragencia' element={<TelaCadastrarAgencia />} />
          <Route path='/alteraragencia' element={<TelaAlterarAgencia />} />
          <Route path='/exibiragencias' element={<TelaExibirAgencias />} />
          <Route path='/associarprodutoagencia' element={<TelaAssociarProdutoAgencia />} />

          {/* CLIENTES */}
          <Route path='/cadastrarcliente' element={<TelaCadastrarCliente />} />
          <Route path='/alterarcliente' element={<TelaAlterarCliente />} />
          <Route path='/exibirclientes' element={<TelaExibirClientes />} />

          {/* PRODUTOS */}
          <Route path='/cadastrarproduto' element={<TelaCadastrarProduto />} />
          <Route path='/exibirprodutos' element={<TelaExibirProdutos />} />

          <Route path='*' element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
