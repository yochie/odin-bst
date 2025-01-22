import { Tree, Node } from "./BST.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
let t = new Tree([4, 4, 1, 2, 3]);
prettyPrint(t.root);
let t2 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 100]);
prettyPrint(t2.root);

t2.deleteItem(23);
prettyPrint(t2.root);

t2.deleteItem(8);
prettyPrint(t2.root);

t2.deleteItem(4);
prettyPrint(t2.root);

console.log(t2.find(67));
console.log(t2.find(55));

t2.levelOrder(console.log);

console.log("in order : ");
t2.inOrder(console.log);

console.log("pre order : ");
t2.preOrder(console.log);

console.log("post order : ");
t2.postOrder(console.log);

console.log("depth : ");
console.log("9: " + t2.depth(t2.find(9)));
console.log("3: " + t2.depth(t2.find(3)));
try {
  t2.depth(new Node());
} catch (e) {
  console.log(e);
}

prettyPrint(t2.root);
console.log(t2.isBalanced());
t2.insert(50);
prettyPrint(t2.root);
console.log(t2.isBalanced());
t2.insert(7000);
prettyPrint(t2.root);
console.log(t2.isBalanced());

t2.rebalance();
console.log("rebalanced :");
prettyPrint(t2.root);

console.log("Exercise tests : ");
let randomInts = generateRandomArray(10, 100);
let t3 = new Tree(randomInts);
prettyPrint(t3.root);
console.log(t3.isBalanced());
t3.levelOrder(console.log);
t3.inOrder(console.log);
t3.preOrder(console.log);
t3.postOrder(console.log);
t3.insert(101);
t3.insert(101);
t3.insert(102);
t3.insert(103);
prettyPrint(t3.root);
console.log(t3.isBalanced());
t3.rebalance();
console.log(t3.isBalanced());

console.log("lvl order:");
t3.levelOrder(console.log);
console.log("in order:");
t3.inOrder(console.log);
console.log("pre order:");
t3.preOrder(console.log);
console.log("post order:");
t3.postOrder(console.log);

function generateRandomArray(size, max) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}
