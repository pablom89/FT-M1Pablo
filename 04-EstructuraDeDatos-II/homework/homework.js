"use strict";
// Implementa la clase LinkedList
// tiene metodos `add`, `remove`, y `search`
// add: Agrega un nuevo nodo en el final de la lista
// Ej:      Head --> null
// add(1):  Head --> 1 --> null
// add(2):  Head --> 1 --> 2 --> null
// remove:  Elimina el último nodo de la lista y devuelve su valor. (Tener en cuenta el caso particular de una lista de un solo nodo y de una lista vacía)
// Ej:         Head --> 1
// remove():   Head --> null y devuelve 1
// search: Busca un valor dentro de la lista. Puede recibir un valor o una función. Si no hubiera resultados, devuelve null.

function LinkedList() {
  this._lenght = 0;
  this.head = null;
}

function Node(value) {
  this.value = value;
  this.next = null;
}

LinkedList.prototype.add = function (x) {
  if (!this.head) {
    this.head = new Node(x);
  } else {
    var res = this.head;
    while (res.next) {
      res = res.next;
    }
    res.next = new Node(x);
  }
  this._lenght++;
};

LinkedList.prototype.remove = function (x) {
  if (!this.head) return null;
  if (this._lenght === 1) {
    let res = this.head.value;
    this.head = null;
    this._lenght--;
    return res;
  }
  var res = this.head.next;
  var prev = this.head;
  if (typeof x === "array") {
    while (res) {
      if (res.value[0] === x) {
        prev.next = null;
        this._lenght--;
        return prev.value;
      }
      res = res.next;
      prev = prev.next;
    }
    prev.next = null;
    this._lenght--;
    return prev.value;
  }
  while (res) {
    res = res.next;
    prev = prev.next;
  }
  prev.next = null;
  this._lenght--;
  return prev.value;
};

LinkedList.prototype.search = function (x) {
  if (!this.head) return null;
  var res = this.head;
  while (res) {
    if (res.value === x) return x;
    if (typeof x === "function") {
      if (x(res.value)) return res.value;
    }
    res = res.next;
  }
  return null;
};

// Hash Table( ver información en: https://es.wikipedia.org/wiki/Tabla_hash)
// Una Hash table contiene un arreglo de "contenedores" o buckets donde puede guardar información.
// Para este ejercicio, generar 35 buckets para la Hash Table, y realizar los métodos, get, hasKey
// Para almacenar un valor asociado a una key (string):
//    - Se pasa ese valor a la función hash(Pista: usar la función charCodeAt), que determina la posición en que debe ir en el arreglo.
//    - Luego el elemento se inserta(llamando al método set) en la posición(índice) devuelta.
// Para buscar el valor por su key:
//    - Sólo habrá que pasarle a la función hash la clave del elemento a buscar y ésta determinará la posición
//      en que se encuentra.
//    - Usar el número obtenido, para buscar(llamando al método get) el contenedor o bucket donde está el valor.
//    - Retornar dicho valor.

function HashTable() {
  this.table = new Array(35);
  this.numBuckets = this.table.length;
}

HashTable.prototype.hash = function (key) {
  var hash = 0;
  for (var i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % this.table.length;
};

HashTable.prototype.set = function (x, y) {
  if (typeof x !== "string") throw new TypeError("Keys must be strings");
  let indice = this.hash(x);
  let pos = this.table[indice];
  if (pos) {
    if (pos.searchNew(x)) {
      this.table[indice].remove(x);
      this.table[indice].add([x, y]);
    }
    this.table[indice].add([x, y]);
    return;
  }
  let lista = new LinkedList();
  lista.add([x, y]);
  this.table[indice] = lista;
};

HashTable.prototype.get = function (key) {
  let res = this.table[this.hash(key)];
  if (res) return res.searchNew(key);
  return res;
};

HashTable.prototype.hasKey = function (key) {
  let res = this.table[this.hash(key)];
  if (res) return !!res.searchNew(key);
};

LinkedList.prototype.searchNew = function (x) {
  if (!this.head) return null;
  var res = this.head;
  while (res) {
    if (res.value[0] === x) return res.value[1];
    if (typeof x === "function") {
      if (x(res.value[0])) return res.value[1];
    }
    res = res.next;
  }
  return null;
};

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  Node,
  LinkedList,
  HashTable,
};
