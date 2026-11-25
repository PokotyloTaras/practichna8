class Node{
    constructor(key){
        this.key = key;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class BinaryTree{
    constructor(){
        this.root = null;
    }

    insert(key){
        const newNode = new Node(key);

        if (!this.root){
            this.root = newNode
        } else{
            this.insertNode(this.root, newNode)
        }
        return this
    }
    insertNode(node, newNode){
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode
                newNode.parent = node
            } else{
                this.insertNode(node.left, newNode)
            }
        }
        if(newNode.key > node.key){
            if(node.right === null){
                node.right = newNode
                node.parent = node
           } else{
                this.insertNode(node.right, newNode)
           }    
        }
    }
    
}
function PrintTree(node, prefix = " ", isLeft = true){
        if(!node) return;
        if(node.right){
            PrintTree(node.right, prefix + (isLeft ? "|   " : "    "), false)
        }
        console.log(prefix + (isLeft ? "└── " : "┌── ") + node.key)
        if(node.left){
            PrintTree(node.left, prefix + (isLeft ? "   " : "|   "), true)
        }
    }

const tree = new BinaryTree();
tree.insert(14).insert(15).insert(151).insert(5)
PrintTree(tree.root)
