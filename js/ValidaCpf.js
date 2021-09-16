function validaCpf(cpfEnviado) {
  Object.defineProperty(this, 'cpfLimpo', {
    enumerable: true,
    get: function(){
      return cpfEnviado.replace(/\D+/g, '')
    }
  });
};

validaCpf.prototype.valida = function(){
  if(typeof this.cpfLimpo === 'undefined') return false;
  if(this.cpfLimpo.length !== 11) return false;
  if(this.isNumRepeat()) return false;

  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const digito1 = this.criaDigito(cpfParcial);
  const digito2 = this.criaDigito(cpfParcial + digito1);

  const novoCpf = cpfParcial + digito1 + digito2;

  return novoCpf === this.cpfLimpo;
};

validaCpf.prototype.isNumRepeat = function(){
  const numRepeat = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
  return numRepeat === this.cpfLimpo;
}


validaCpf.prototype.criaDigito = function(cpfParcial) {
  const cpfArray = Array.from(cpfParcial);
  let regressivo = cpfArray.length + 1;
  let total = cpfArray.reduce((ac, val) => {
    ac += (regressivo * Number(val));
    regressivo--;
    return ac;
  }, 0);
  const digito = 11 - (total % 11);
  return digito > 9 ? '0' : String(digito);
};


const validacao = function(){
  let cpfRecebido = document.getElementById("campo").value;

  const cpf = new validaCpf(cpfRecebido);

 if(cpf.valida()){
  alert('CPF Válido!')
} else {
  alert('CPF Inválido!')
};
};
