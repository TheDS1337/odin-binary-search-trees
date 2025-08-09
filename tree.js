class Node 
{
    constructor(data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export default class Tree
{
    constructor(array)
    {
        this.root = Tree.buildTree(array.sort((a, b) => a - b));
    }

    insert(value)
    {
        let node = this.root
        
        while( node  )
        {
            const left = node.left;
            const right = node.right;

            if( node.data >= value ) {
                if( left )
                    node = left;
                else {
                    node.left = new Node(value);
                    break;
                }
            } else {
                if( right )
                    node = right;
                else {
                    node.right = new Node(value);
                    break;
                }
            }
        }
    }

    deleteItem(value)
    {
        let {node, parent} = Tree.#findInOrder(this.root, value);

        const left = node.left;
        const right = node.right;

        let child = left ?? right ?? null;

        if( left && right ) {
            const {node: successorNode, parent: successorParent} = Tree.#findInOrderSuccessor(node);

            if( successorParent.left == successorNode )
                successorParent.left = null;
            else if( successorParent.right == successorNode )
                successorParent.right = null;

            successorNode.left = node.left;
            successorNode.right = node.right;

            child = successorNode;        
        }

        if( !parent )
            this.root = child;
        else if( parent.left == node )
            parent.left = child;
        else if( parent.right == node )
            parent.right = child;
    }

    find(value)
    {
        let {node} = Tree.#findInOrder(this.root, value);
        return node; 
    }

    levelOrderForEach(callback, node = this.root)
    {
        if( !callback )
            throw new Error("No callback was provided");

        let queue = [node];

        while( queue.length > 0 ) {
            node = queue.shift();

            if( !node )
                continue;

            callback(node);

            queue.push(node.left);
            queue.push(node.right);
        }        
    }

    inOrderForEach(callback, node = this.root)
    {
        if( !callback )
            throw new Error("No callback was provided");

        if( !node )
            return;

        this.inOrderForEach(callback, node.left);
        callback(node);
        this.inOrderForEach(callback, node.right);
    }

    preOrderForEach(callback, node = this.root)
    {
        if( !callback )
            throw new Error("No callback was provided");

        if( !node )
            return;

        callback(node);
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
    }

    postOrderForEach(callback, node = this.root)
    {
        if( !callback )
            throw new Error("No callback was provided");

        if( !node )
            return;

        this.postOrderForEach(callback, node.left);
        this.postOrderForEach(callback, node.right);
        callback(node);
    }

    height(value)
    {
        let startNode = this.find(value);

        if( !startNode )
            return null;


    }

    depth(value)
    {
        let endNode = this.find(value);

        if( !endNode )
            return null;
    }

    isBalanced()
    {
    }

    static buildTree(array)
    {
        const len = array.length;

        if( len < 1 )
            return null;

        const mid = Math.floor((len - 1) / 2);
        let root = new Node(array[mid]);
        
        root.left = Tree.buildTree(array.slice(0, mid));
        root.right = Tree.buildTree(array.slice(mid + 1));

        return root;
    }

    static #findInOrder(node, value, parent = null)
    {
        if( !node )
            return null;

        let leftNode = Tree.#findInOrder(node.left, value, node);
        if( leftNode && leftNode.node.data == value )
            return leftNode;
        
        if( node.data == value )
            return {node, parent};

        let rightNode = Tree.#findInOrder(node.right, value, node);
        if( rightNode && rightNode.node.data == value )
            return rightNode;
    }

    static #findInOrderSuccessor(node) 
    {
        let parent = node;
        node = node.right;

        while( node.left ) {
            parent = node;
            node = node.left;
        }

        return {node, parent};
    }
}