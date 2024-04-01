class NodeData{
    constructor(elem){
        this.element = elem
        this.nextleft = null
        this.nextright = null
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null

    }

    addRecursive(current,elem){
        if(current == null){
            return new NodeData(elem)
        }
        if(elem < current.element){
            current.nextleft = this.addRecursive(current.nextleft,elem)
        }
        else if(elem > current.element){
            current.nextright = this.addRecursive(current.nextright,elem)
        }
        else{
            return current
        }
        return current
    }
    
    add(elem){
        this.root = this.addRecursive(this.root,elem)
    }

    inOrder(n,str){
        if(n != null){
            str = this.inOrder(n.nextleft,str)
            str = str+n.element+" "
            str = this.inOrder(n.nextright,str)
        }
        return str
    }

    postOrder(n,str){
        if(n != null){
            str = this.postOrder(n.nextleft,str)
            str = this.postOrder(n.nextright,str)
            str = str+n.element+" "
        }
        return str
    }
}

let n = document.getElementById("noo")
let r = document.getElementById("res")
let a = document.getElementById("aes")
let bst = new BinarySearchTree()
let dato = []
let str = ""

//join ช่วยรวบรวมข้อมูลในarray or linklist จะทำให้ข้อมูลเป็นstrรวบรวมข้อมูลได้ง่ายขึ้น

function addInput(){
    let value = parseInt(n.value);
    bst.add(value);
    dato.push(value)
    n.value = ""
    es = dato.join(", ")
    r.innerHTML = "Data = "+ es
}

function deleteInput(){
    let value = parseInt(n.value);

    // เรียกใช้ฟังก์ชันลบโหนดจาก Binary Search Tree
    bst.root = deleteNode(bst.root, value);

    // นำค่าออกจาก array
    dato = dato.filter(item => item !== value);

    // แสดงข้อมูลใหม่
    es = dato.join(", ");
    r.innerHTML = "Data = " + es;
}

function deleteNode(root, key){
    // กรณีหากไม่พบโหนดที่ต้องการลบ ให้คืนค่า root ออกไปโดยไม่เปลี่ยนแปลง
    if(root === null) return root;

    // หาโหนดที่ต้องการลบ และเรียกใช้ฟังก์ชันลบโหนดในส่วนย่อย
    if(key < root.element){
        root.nextleft = deleteNode(root.nextleft, key);
    } else if(key > root.element){
        root.nextright = deleteNode(root.nextright, key);
    } else {
        // หากพบโหนดที่ต้องการลบ

        // กรณีโหนดไม่มีลูก หรือมีลูกเพียงตัวเดียวหรือไม่มีลูกเลย
        if(root.nextleft === null){
            let temp = root.nextright;
            root = null;
            return temp;
        } else if(root.nextright === null){
            let temp = root.nextleft;
            root = null;
            return temp;
        }

        // กรณีโหนดมีทั้งลูกซ้ายและลูกขวา
        // หาโหนดที่มากที่สุดในส่วนลูกซ้าย หรือโหนดที่น้อยที่สุดในส่วนลูกขวามาแทนที่
        let temp = minValueNode(root.nextright);

        // กําหนดค่าของโหนดที่จะแทนที่โหนดที่ต้องการลบ
        root.element = temp.element;

        // ลบโหนดที่มากที่สุดในส่วนลูกขวา หรือโหนดที่น้อยที่สุดในส่วนลูกซ้าย
        root.nextright = deleteNode(root.nextright, temp.element);
    }

    return root;
}

function minValueNode(node){
    let current = node;
    while(current.nextleft !== null){
        current = current.nextleft;
    }
    return current;
}


function inOr(){
    aes.innerHTML ="inorder : " + bst.inOrder(bst.root,str);
}

function postOr(){
    aes.innerHTML ="PostOrder : "+ bst.postOrder(bst.root,str)
}
