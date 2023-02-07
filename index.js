// Prints the binary tree to the console. 
// This function was written by The Odin Project
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}


// My code starts here

class Node {
  
  constructor(data) {
    this.data = data || null;
    this.left = null;
    this.right = null;
  }

}

class Tree {
  
  constructor(array) {
    // Creates a binary tree out of the sorted set
    this.array = [... new Set(array.sort((a, b) => a - b))];
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  };

  buildTree(array, start, end) {
    // Creates a binary tree from a sorted set

    // Assign null to the leaf nodes of the tree
    if (start > end) return null;

    // Create a mid point for the array, and then create a node with the data
    let mid = (start + end) / 2;
    let node = new Node(array[mid]);

    // Assign a new node to the current node's left & right values recursively
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  };

  insert(value, root = this.root) {
    // Insert a node into the tree recursively
    
    // Base case
    if (root === null) return;
    
    // Recursively find where the value should be inserted in the tree
    if (value < root.data) {
      this.insert(value, root.left);
    } else if (value > root.data) {
      this.insert(value, root.right);
    };

    let newNode = new Node(value);
    
    // Assign the node to the correct spot in the tree
    if (value < root.data && root.left === null) {
      root.left = newNode;
    } else if (value > root.data && root.right === null) {
      root.right = newNode;
    };
  };

  delete(value, root = this.root) {
    // Delete a node from the tree recursively

    // Base case
    if (root === null) return root;

    // Recursively find the node to be deleted
    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      // Once the node with the correct value is found, reassign pointers
      // depending on how many children the node has
      if (root.left === null){
        return root.right;
      } else if (root.right === null){
        return root.left;
      }
      // If the node to be deleted has 2 children, this code will fire off
      // We assign the next highest value to the current node, and then assign
      // the current node's right pointer recursively to take over the branches of
      // the deleted node
      root.data = this.minValue(root.right);
      root.right = this.delete(root.data, root.right);
    }
    return root;
  }

  minValue(root) {
    // Find the minimum value of the left subtree of the root
    let min = root.data;
      while (root.left !== null) {
        min = root.left.data;
        root = root.left;
      }
    return min;
  }

  find(value, root = this.root) {
    // Find a node in the tree recursively, and return the node
    
    // If the value is found, return the node
    if (root.data === value) return root;

    // Recursively search for the node
    if (value < root.data && root.left !== null) {
      return this.find(value, root.left);
    } else if (value > root.data && root.right !== null) {
      return this.find(value, root.right);
    }
  }

  levelOrder(callback = (node) => {return node.data}) {
    // Goes through the tree nodes in level order and applies supplied
    // callback function to each value. Returns a new array

    let queue = [this.root];
    let returnArray = [];
    // While there is still a node in the queue, take the next node in the queue
    // and apply the callback function. Push into the new array
    while (queue.length > 0) {
      let node = queue.shift();
      returnArray.push(callback(node));
      // If the node isn't a leaf node, add its children to the queue
      if(node.left) queue.push(node.left);
      if(node.right) queue.push(node.right);
    }
    if (returnArray.length > 0) return returnArray;
  }

  preOrder(callback = (node) => {return node.data}, root = this.root, returnArr = []) {
    // Recursively create an array of pre-order sorted values from the tree
    // Applies a callback function to each value before being pushed to the return array
    // Pre-order is sorted in sequence of <root> <left> <right>

    if (root === null) return;

    returnArr.push(callback(root));
    if (root.left) this.preOrder(callback, root.left, returnArr);
    if (root.right) this.preOrder(callback, root.right, returnArr);
    return returnArr;
  }

  inOrder(callback = (node) => {return node.data}, root = this.root, returnArr = []) {
    // Recursively create an array of in-order sorted values from the tree
    // Applies a callback function to each value before being pushed to the return array
    // In-order is sorted in sequence of <left> <root> <right>

    if (root === null) return;

    if (root.left) this.inOrder(callback, root.left, returnArr);
    returnArr.push(callback(root));
    if (root.right) this.inOrder(callback, root.right, returnArr);
    return returnArr;
  }

  postOrder(callback = (node) => {return node.data}, root = this.root, returnArr = []) {
    // Recursively create an array of post-order sorted values from the tree.
    // Applies a callback function to each value before being pushed to the return array
    // Post-order is sorted in sequence of <left> <right> <root>

    if (root === null) return;

    if (root.left) this.postOrder(callback, root.left, returnArr);
    if (root.right) this.postOrder(callback, root.right, returnArr);
    returnArr.push(callback(root));
    return returnArr;
  }

  depth(node, root = this.root, count = 0) {
    // Recursively takes in a node and increments the depth count before returning it
    
    if (node === null) return "Not found";

    if (node.data < root.data) {
      count++;
      return this.depth(node, root.left, count);
    } else if (node.data > root.data) {
      count++;
      return this.depth(node, root.right, count);
    } else {
      return count;
    }
  }

  height(node = this.root) {
    // Recursively takes in a node and returns the height of that node in the tree

    if (node === null) return 0;

    let leftSubtreeHeight = this.height(node.left);
    let rightSubtreeHeight = this.height(node.right);

    return Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;
  }

  isBalanced(root = this.root) {
    // Returns true if the tree is balanced (the difference in height between the left and right subtrees is <= 1)
    
    if (root === null) return true;

    if (Math.abs((this.height(root.left) - this.height(root.right)) <= 1) &&
      this.isBalanced(root.left) && 
      this.isBalanced(root.right)) {
        return true;
    }
    return false;
  }

  rebalance() {
    // Recreates the entire tree by creating a new sorted array from the elements
    // This will create a new root node and thus everything will be rebalanced

    let newArr = [... new Set(this.inOrder().sort((a, b) => a - b))];
    return this.root = this.buildTree(newArr, 0, newArr.length - 1);
  }

}

// Driver

const tree = new Tree([2, 15453, 656, 6, 34, 656, 54, 23948, 54]);

console.log(tree.array);
console.log(tree.root);

prettyPrint(tree.root);

tree.insert(5);
tree.insert(1);
tree.insert(4);
tree.insert(1234);
tree.insert(55);

prettyPrint(tree.root);

tree.delete(2);

tree.insert(3);
tree.insert(53);
tree.insert(52);

prettyPrint(tree.root);

tree.delete(34);

prettyPrint(tree.root);

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
console.log(tree.depth(tree.root.right.left.right.right));
console.log(tree.height(tree.root.right.left.right.right));
prettyPrint(tree.root);

tree.insert(4324);
tree.insert(4325);
tree.isBalanced() ? console.log("Balanced") : console.log("Imbalanced");
prettyPrint(tree.root);

tree.rebalance();
tree.isBalanced() ? console.log("Balanced") : console.log("Imbalanced");
prettyPrint(tree.root);