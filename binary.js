class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  contains(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  remove(value) {
    this.root = this.KillNode(this.root, value);
  }

  KillNode(node, value) {
    if (node === null) return null;
    if (value < node.value) {
      node.left = this.KillNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this.KillNode(node.right, value);
      return node;
    } else {
      if (node.left === null && node.right === null) return null;
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      const minRightNode = this.findMinNode(node.right);
      node.value = minRightNode.value;
      node.right = this.KillNode(node.right, minRightNode.value);
      return node;
    }
  }

  findMinNode(node) {
    while (node.left !== null) node = node.left;
    return node;
  }

  findMin() {
    if (this.root === null) return null;
    return this.findMinNode(this.root).value;
  }

  findMax() {
    if (this.root === null) return null;
    let current = this.root;
    while (current.right !== null) current = current.right;
    return current.value;
  }

  size() {
    const countNodes = (node) => {
      if (node === null) return 0;
      return 1 + countNodes(node.left) + countNodes(node.right);
    };
    return countNodes(this.root);
  }

  printAll() {
    const result = [];
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        result.push(node.value);
        traverse(node.right);
      }
    };
    traverse(this.root);
    console.log(result.join(', '));
    return result;
  }

  printTree(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      if (node === this.root) console.log('(порожнє дерево)');
      return;
    }

    if (node.right !== null) {
      this.printTree(node.right, prefix + (isLeft ? '│   ' : '    '), false);
    }

    const connector = node === this.root ? '── ' : (isLeft ? '└── ' : '┌── ');
    console.log(prefix + connector + node.value);

    if (node.left !== null) {
      this.printTree(node.left, prefix + (isLeft ? '    ' : '│   '), true);
    }
  }
}

const bst = new BinarySearchTree();
[15, 10, 20, 8, 12, 17, 25, 6, 11].forEach(num => bst.insert(num));

console.log('Вигляд дерева:');
bst.printTree();
console.log('Максимальне', bst.findMax())
console.log('Мінімальне', bst.findMin())
console.log('Розмір', bst.size())
console.log('містить', bst.contains(15))
bst.remove(15);
console.log('\nПісля видалення числа:');
console.log(`містить число?`, bst.contains(15))
bst.printTree();
