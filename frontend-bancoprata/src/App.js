// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TelaInicial from './telas/TelaInicial';
import Tela404 from './telas/Tela404.jsx';
import TelaCadastrarAgencia from './telas/TelaCadastrarAgencia';
import TelaCadastrarCliente from './telas/TelaCadastrarCliente.jsx';
import TelaCadastrarProduto from './telas/TelaCadastrarProduto.jsx';
import TelaExibirAgencias from './tabelas/TelaExibirAgencias.jsx';
import TelaExibirClientes from './tabelas/TelaExibirClientes.jsx';
import TelaExibirProdutos from './tabelas/TelaExibirProdutos.jsx';

function App() {
  return (
    // <div className='App'>
    //   <header className='App-header'>
    //     <img src={logo} className='App-logo' alt='logo' />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
      <BrowserRouter>
        <Routes>
          {/* HOME */}
          <Route path='/' element={<TelaInicial />} />

          {/* AGÊNCIAS */}
          <Route path='/cadastraragencia' element={<TelaCadastrarAgencia />} />
          {/* <Route path='/alteraragencia' element={<TelaAlterarAgencia />} /> */}
          <Route path='/exibiragencias' element={<TelaExibirAgencias />} />

          {/* CLIENTES */}
          <Route path='/cadastrarcliente' element={<TelaCadastrarCliente />} />
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
