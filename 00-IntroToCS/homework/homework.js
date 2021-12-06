'use strict'

function BinarioADecimal(num) {
  // tu codigo aca
  var res = 0;
  var arreglo = num.split("").reverse();
  for (var i = 0; i < arreglo.length; i++) {
    res = res + Number(arreglo[i]) * Math.pow(2, i);
  }
  return res;

}

function DecimalABinario(num) {
  // tu codigo aca
  var binario = (num % 2).toString();
  while (num > 1) {
    num = parseInt(num / 2);
    binario = (num % 2) + binario;
  }
  return binario;

}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}