import Tree from "./tree.js"

const prettyPrint = (node, prefix = '', isLeft = true) =>
{
    if (node === null) {
        return;
    }

    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }

    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);

tree.insert(40);
prettyPrint(tree.root);

tree.deleteItem(7);
tree.deleteItem(7);
prettyPrint(tree.root);

console.log(tree.find(5));

console.log("Breadth-first level order transversal:");
tree.levelOrderForEach(node => console.log(`    ${node.data}`));

console.log("Depth-first in-order level transversal:");
tree.inOrderForEach(node => console.log(`    ${node.data}`));

console.log("Depth-first pre-order level transversal:");
tree.preOrderForEach(node => console.log(`    ${node.data}`));

console.log("Depth-first post-order level transversal:");
tree.postOrderForEach(node => console.log(`    ${node.data}`));