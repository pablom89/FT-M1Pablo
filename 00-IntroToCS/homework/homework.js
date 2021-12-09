'use strict'

function BinarioADecimal(num) {
  // tu codigo aca
  var res = 0, pos = 0;
  for (var i = num.length-1; i >= 0; i--) {
    res += num[i] * 2 ** pos;
    pos++;
  }
  return res;

}

function DecimalABinario(num) {
  // tu codigo aca
  var binario = (num % 2).toString();
  while (num > 1) {
    num = Math.floor(num / 2);
    binario = (num % 2) + binario;
  }
  return binario;

}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}