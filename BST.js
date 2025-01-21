class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  root;
  constructor(arr) {
    this.root = Tree.buildTree(arr);
  }

  insert(value) {
    let q = [this.root];
    while (q.length > 0) {
      let current = q.shift();
      if (value <= current.val) {
        if (current.left === null) {
          current.left = new Node(value);
          return;
        } else {
          q.push(current.left);
        }
      } else {
        if (current.right === null) {
          current.right = new Node(value);
          return;
        } else {
          q.push(current.right);
        }
      }
    }
    throw new Error("Insertion failed...");
  }

  static buildTree(arr) {
    let set = new Set(arr);
    let uniqueArr = Array.from(set);
    let sorted = uniqueArr.toSorted((a, b) => a - b);
    let q = [];
    q.push({ parent: null, range: [0, sorted.length - 1] });
    let root;
    while (q.length > 0) {
      let { parent, range } = q.shift();
      let [start, end] = range;
      if (start > end) {
        continue;
      }
      let mid = start + Math.floor((end - start) / 2);
      let current = new Node(sorted[mid]);
      if (parent !== null) {
        if (parent.val >= current.val) {
          parent.left = current;
        } else {
          parent.right = current;
        }
      } else {
        root = current;
      }

      q.push({ parent: current, range: [start, mid - 1] });
      q.push({ parent: current, range: [mid + 1, end] });
    }
    return root;
  }
}

export { Tree };
