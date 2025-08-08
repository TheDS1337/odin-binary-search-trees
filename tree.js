class Node 
{
    data
    left;
    righr;

    constructor(data)
    {
        this.data = data;
    }
}

export default class Tree
{
    root;

    constructor(array)
    {
        this.root = Tree.buildTree(array.sort());
    }

    insert(value)
    {
    }

    deleteItem(value)
    {
    }

    static buildTree(array)
    {
        const len = array.length;

        if( len < 1 )
            return null;

        const mid = Math.floor(len / 2);
        let root = new Node(array[mid]);
        
        root.left = Tree.buildTree(array.slice(0, mid));
        root.right = Tree.buildTree(array.slice(mid + 1));

        return root;
    }
}