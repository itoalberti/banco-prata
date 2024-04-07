import { Alert, Col, Button } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';

export default function Tela404(props) {
  return (
    <Pagina>
      <Alert className='text-center' variant='danger'>
        <h3>A página que você tentou acessar não existe!</h3>
      </Alert>
      <Col xs='auto'>
        <LinkContainer to='/'>
          <Button variant='secondary'>Voltar à página inicial</Button>
        </LinkContainer>
      </Col>
    </Pagina>
  );
}
