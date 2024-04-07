import { useState } from 'react';

export default function TelaAlterarAgencia() {
  const [validado, setValidado] = useState(false);
  const [agencia, setAgencia] = useState({
    cod_ag: '',
    endereco: '',
    cidade: '',
    uf: '',
  });

  function manipulaMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setAgencia({ ...agencia, [id]: valor });
  }
}
