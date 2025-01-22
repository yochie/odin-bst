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

  deleteItem(value) {
    let q = [{ node: this.root, parent: null, isLeftChild: false }];

    while (q.length > 0) {
      let { node, parent, isLeftChild } = q.shift();
      if (node === null) {
        return;
      }
      let left = node.left;
      let right = node.right;
      if (node.val === value) {
        this.removeNode(node, parent, isLeftChild);
      } else {
        if (value < node.val) {
          q.push({ node: left, parent: node, isLeftChild: true });
        } else {
          q.push({ node: right, parent: node, isLeftChild: false });
        }
      }
    }
  }

  removeNode(node, parent, isLeftChild) {
    if (!node.left && !node.right) {
      //no child, just remove from parent
      if (parent === null) {
        this.root = null;
        return;
      }
      if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if ((node.left && !node.right) || (!node.left && node.right)) {
      //single child, replace in parent with child
      if (parent === null) {
        this.root = node.left ? node.left : node.right;
        return;
      }
      if (isLeftChild) {
        parent.left = node.left ? node.left : node.right;
      } else {
        parent.right = node.left ? node.left : node.right;
      }
    } else {
      //two children, replace with smallest of right
      let {
        node: replacement,
        parent: rParent,
        isLeftChild: rIsLeftChild,
      } = Tree.smallest(node.right, node, false);
      this.removeNode(replacement, rParent, rIsLeftChild);
      replacement.left = node.left;
      replacement.right = node.right;

      if (parent === null) {
        this.root = replacement;
        return;
      }
      if (isLeftChild) {
        parent.left = replacement;
      } else {
        parent.right = replacement;
      }
    }
  }

  static smallest(baseNode, baseParent, baseIsLeftChild) {
    if (baseNode === null) {
      return null;
    }
    let node = baseNode;
    let parent = baseParent;
    let isLeftChild = baseIsLeftChild;
    while (node.left != null) {
      parent = node;
      isLeftChild = true;
      node = node.left;
    }
    return { node, parent, isLeftChild };
  }

  find(value) {
    let current = this.root;
    while (current != null) {
      if (value == current.val) {
        return current;
      } else if (value < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback required");
    }

    let q = [this.root];
    while (q.length > 0) {
      let current = q.shift();
      if (current === null) {
        continue;
      }
      callback(current);
      q.push(current.left);
      q.push(current.right);
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback required");
    }
    this.inOrderRecursion(callback, this.root);
  }

  inOrderRecursion(cb, node) {
    if (node === null) {
      return;
    }
    this.inOrderRecursion(cb, node.left);
    cb(node);
    this.inOrderRecursion(cb, node.right);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback required");
    }

    this.preOrderRecursion(callback, this.root);
  }

  preOrderRecursion(cb, node) {
    if (node === null) {
      return;
    }
    cb(node);
    this.preOrderRecursion(cb, node.left);
    this.preOrderRecursion(cb, node.right);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback required");
    }
    this.postOrderRecursion(callback, this.root);
  }

  postOrderRecursion(cb, node) {
    if (node === null) {
      return;
    }
    this.postOrderRecursion(cb, node.left);
    this.postOrderRecursion(cb, node.right);
    cb(node);
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
