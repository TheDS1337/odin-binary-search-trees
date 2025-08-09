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

        if( left && right ) {
            const {node: successorNode, parent: successorParent} = Tree.#findInOrderSuccessor(node);

            node.data = successorNode.data;

            if( successorParent.left == successorNode )
                successorParent.left = null;
            else if( successorParent.right == successorNode )
                successorParent.right = null;
        } else if( left ) {
            if( !parent )
                this.root = left;
            else if( parent.left == node )
                parent.left = left;
            else if( parent.right == node )
                parent.right = left;
        } else if( right ) {
            if( !parent )
                this.root = right;
            else if( parent.left == node )
                parent.left = right;
            else if( parent.right == node )
                parent.right = right;
        } else {
            if( !parent )
                this.root = null;
            else if( parent.left == node )
                parent.left = null;
            else if( parent.right == node )
                parent.right = null;
        }
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