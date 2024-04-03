// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TelaAlterarAgencia from './telas/TelaAlterarAgencia.jsx';
import TelaInicial from './telas/TelaInicial';
import Tela404 from './telas/Tela404.jsx';
import TelaExibirAgencias from './telas/TelaExibirAgencias.jsx';
import TelaCadastrarAgencia from './telas/TelaCadastrarAgencia';
import TelaCadastrarCliente from './telas/TelaCadastrarCliente.jsx';
import TelaExibirClientes from './telas/TelaExibirClientes.jsx';

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

          <Route path='*' element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
