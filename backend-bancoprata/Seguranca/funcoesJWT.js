// JWT é um token que é gerado a partir de um payload e uma chave secret
// funções para gerar token de acesso (ingresso válido para API)

export function assinar(usuario) {
  const token = jwt.sign({ usuario }, process.env.SEGREDO, { expiresIn: '1h' });

  return token;
}
export function verificarAssinatura() {}

import jwt from 'jsonwebtoken';

// Função para assinar o token
export function assinar(usuario) {
  return token;
}

// Função para verificar a assinatura do token
export function verificarAssinatura(token) {
  return jwt.verify(token, process.env.SEGREDO);
}
