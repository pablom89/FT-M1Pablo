"use strict";
// resolve estos ejercicios usando recursión

// Binary Seach Tree
// 'tiene metodos llamados `insert`, `contains`, `depthFirstForEach`, 'breadthFirstForEach' y 'size'
// corre depth-first (en recorrido "in-order") cuando depthFirstForEach() es ejecutado sin ninguna opcion o con la opcion "in-order
// corre depth-first (en recorrido "pre-order") cuando depthFirstForEach() es ejecutado con la opcion "pre-order"
// corre depth-first (en recorrido "post-order" cuando depthFirstForEach() es ejecutado con la opcion "post-order"
// corre breadth-first cuando breadthFirstForEach() es ejecutado
// Observar imagen de la carpeta "homework" llamada "bst.png". Allí encontraran dibujado el arbol utilizado para los tests

function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.insert = function (v, r) {
  if (!r) var r = this;
  if (v < this.value) {
    if (this.left === null) {
      this.left = new BinarySearchTree(v);
    } else {
      this.left.insert(v, r);
    }
  }
  if (v >= this.value) {
    if (this.right === null) {
      this.right = new BinarySearchTree(v);
    } else {
      this.right.insert(v, r);
    }
  }
  return this;
};

BinarySearchTree.prototype.contains = function (s) {
  if (this.value === s) {
    return true;
  }
  if (s <= this.value && this.left !== null) {
    return this.left.contains(s);
  } else if (s > this.value && this.right !== null) {
    return this.right.contains(s);
  } else {
    return false;
  }
};

BinarySearchTree.prototype.size = function () {
  if (!this.left && !this.right) {
    return 1;
  } else {
    if (this.left && !this.right) {
      return this.left.size() + 1;
    } else if (!this.left && this.right) {
      return this.right.size() + 1;
    } else {
      return this.left.size() + this.right.size() + 1;
    }
  }
};

BinarySearchTree.prototype.breadthFirstForEach = function (cb) {
  var current = [this];
  while (current.length > 0) {
    var next = [];
    for (var node of current) {
      cb(node.value);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    current = next;
  }
};

BinarySearchTree.prototype.depthFirstForEach = function (cb, s) {
  if (!s || s === "in-order") {
    if (this.left) {
      this.left.depthFirstForEach(cb, s);
      cb(this.value);
    } else {
      cb(this.value);
    }
    if (this.right) {
      this.right.depthFirstForEach(cb, s);
    }
  } else if (s === "pre-order") {
    cb(this.value);
    if (this.left) {
      this.left.depthFirstForEach(cb, s);
    }
    if (this.right) {
      this.right.depthFirstForEach(cb, s);
    }
    if (!this.left && !this.right) {
      return;
    }
  } else if (s === "post-order") {
    if (this.left) {
      this.left.depthFirstForEach(cb, s);
    }
    if (this.right) {
      this.right.depthFirstForEach(cb, s);
    }
    if (!this.left && !this.right) {
      return cb(this.value);
    }
    return cb(this.value);
  }
};

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  BinarySearchTree,
};
