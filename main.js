import Tree from "./tree.js"

const prettyPrint = (node, prefix = '', type = 0) =>
{
    if (node === null) {
        return;
    }

    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${type == 2 ? '│   '  : type == 1 ? '    ' : ''}`, 1);
    }

    console.log(`${prefix}${type == 2 ? '└── ' : type == 1 ? '┌── ' : ''}${node.data}`);

    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${type == 2 ? '    ' : type ==  1 ? '│   ' : ''}`, 2);
    }
};
/*
let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);

tree.insert(40);
prettyPrint(tree.root);

tree.rebalance();
prettyPrint(tree.root);

tree.deleteItem(7);
tree.deleteItem(7);
prettyPrint(tree.root);

console.log(tree.find(5));

let levelOrder = [];
tree.levelOrderForEach(node => levelOrder.push(node.data));
console.log(`Breadth-first level order transversal: ${levelOrder}`);

let inOrder = [];
tree.inOrderForEach(node => inOrder.push(node.data));
console.log(`Depth-first in-order level transversal: ${inOrder}`);

let preOrder = [];
tree.preOrderForEach(node => preOrder.push(node.data));
console.log(`Depth-first pre-order level transversal: ${preOrder}`);

let postOrder = [];
tree.postOrderForEach(node => postOrder.push(node.data));
console.log(`Depth-first post-order level transversal: ${postOrder}`);

console.log(tree.height(23));
console.log(tree.depth(4));
console.log(tree.isBalanced());
*/

let tree2 = new Tree(Array.from({ length: 32 }, () => Math.floor(Math.random() * 100)));

prettyPrint(tree2.root);
console.log(`Is tree balanced?: ${tree2.isBalanced()}`);

tree2.insert(149);
tree2.insert(424);
tree2.insert(111);
tree2.insert(193);

prettyPrint(tree2.root);
console.log(`Is tree balanced after adding numbers?: ${tree2.isBalanced()}`);


console.log("rebalancing...")
tree2.rebalance();

prettyPrint(tree2.root);
console.log(`Is tree balanced after adding rebalancing?: ${tree2.isBalanced()}`);