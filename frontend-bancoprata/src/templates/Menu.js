import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

export default function Menu() {
  return (
    <Navbar className='m-2' bg='light' expand='lg'>
      <Container className='m-0'>
        <Navbar.Brand href='/'>HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavDropdown title='AGÊNCIAS' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/cadastraragencia'>Cadastrar agência</NavDropdown.Item>
              <NavDropdown.Item href='/exibiragencias'>Exibir agências</NavDropdown.Item>
              {/* <NavDropdown.Item href='/alteraragencia'>Alterar agência</NavDropdown.Item> */}
              {/* <NavDropdown.Item href='/excluiragencia'>Excluir agência</NavDropdown.Item> */}
            </NavDropdown>
            <NavDropdown title='CLIENTES' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/cadastrarcliente'>Cadastrar cliente</NavDropdown.Item>
              <NavDropdown.Item href='/exibirclientes'>Exibir clientes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='PRODUTOS' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/cadastrarproduto'>Cadastrar produto</NavDropdown.Item>
              <NavDropdown.Item href='/exibirprodutos'>Exibir produtos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
