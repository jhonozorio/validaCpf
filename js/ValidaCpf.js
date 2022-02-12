class ValidaCpf {
  //recebemos o cpf e substituimos qualquer caractere especial, ou letras por uma string vazia por meio de uma espressão regular
  constructor(cpfEnviado){
  Object.defineProperty(this, 'cpfLimpo', {
    writable: false,
    enumerable: true,
    configurable: false,
    value: cpfEnviado.replace(/\D+/g, '')
  })
};
//recebemos os 9 primeiros digitos, para formar um novo cpf valido e posteriormente comparar com o cpf recebido
geraNovoCpf() {
  const semDigitos = this.cpfLimpo.slice(0, -2);
  const digito1 = this.geraDigito(semDigitos);
  const digito2 = this.geraDigito(semDigitos + digito1);
  this.novoCpf = semDigitos + digito1 + digito2;
}

geraDigito(semDigitos) {
  let total = 0;
  let reverso = semDigitos.length + 1;

  for(let stringNum of semDigitos) {
    total += reverso * Number(stringNum);
    reverso--;
  }
  const digito = 11 - (total % 11);
  return digito <= 9 ? String(digito) : '0';
}

validar() {
  if(! this.cpfLimpo) return false;
  if(typeof this.cpfLimpo !== 'string') return false;
  if(this.cpfLimpo.length !== 11) return false;
  if(this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo) return false;
  this.geraNovoCpf();
  return this.novoCpf === this.cpfLimpo;
}

};


const validaCpf = () => {
  let cpfRecebido = document.getElementById("campo").value;
  let resultado = document.getElementById('result');

  const cpf = new ValidaCpf(cpfRecebido);

 if(cpf.validar()){
  resultado.innerHTML = 'CPF Válido!';
  resultado.style.color = '#2ecc71';

} else {
    resultado.innerHTML = 'CPF Inválido!';
    resultado.style.color = '#c0392b';

};
};
