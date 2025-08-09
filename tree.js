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
}