import { gql} from "apollo-angular"

const GET_Cls = gql`
query {
     Clients{
        id
        username
        email
        name
        tel
        roles{name}
    }    
}
`;
export {GET_Cls}


const CREATE_CL = gql`
mutation insert($us : String, $na : String, $ps : String, $em :String, $tl :String, $ad : String) {
    client(c : {
                    username:$us,
                    name:$na,
                    password:$ps,
                    email:$em,
                    tel:$tl,
                    Address : $ad
    }){id,name,username,email}
}

`;
export {CREATE_CL}


const GET_CL = gql`
    query user($us : String){
        getC(username : $us){id,name,username,email,tel,commands{quantity,Id,product{name,img,price}}}
    }

`;
export {GET_CL}


const GET_CLid = gql`
    query user($id : Float){
        user(id : $id){id,name,username,email,tel,commands{quantity,Id,product{id,name,img,price}}}
    }

`;
export {GET_CLid}

const GET_CLs_username = gql`
    query by($us : String){
        byUsername(username : $us){id
            username
            email
            name
            tel
            roles{name}}
    }
`;
export {GET_CLs_username}

const update_quant = gql`
    mutation upd($id : Float, $qt : Float){
        updateI(id : $id, quantity : $qt)
    }
`;

export {update_quant}

const deleteI = gql`
    mutation del($id : Float){
        deleteI(id : $id)
    }
`;

export {deleteI}




const UPDATE_CL = gql`
    mutation update($id : Float, $us : String,$ad : String, $ps :String, $na : String, $em :String, $tl :String){
        updateC(id : $id, c : {
            username:$us,
            name:$na,
            address : $ad,
            password : $ps,
            email:$em,
            tel:$tl})
    }

`;
export {UPDATE_CL}

const UPDATE_CL_PASS = gql`
    mutation pass($id:Float, $old:String, $newP:String){
        ChangePassword(id:$id, old:$old, newPass:$newP)
    }
`;
export {UPDATE_CL_PASS}


const DELETE_CL = gql`
    mutation delete($id : Float){
        deleteC(id : $id)
    }

`;

export {DELETE_CL}



const ADDROLE_CL = gql`
    mutation role($id : Float){
        auth(id : $id){id}
    }

`;
export {ADDROLE_CL}




const GET_PRS = gql`
    query all{
        products {id,name,img,rating,description,price,category{name}}
    }
`;
export {GET_PRS}

const CREATE_PR = gql`
    mutation pro($na : String, $im : String, $ds : String, $ra : Float, $pr : Float, $cat : String){
        product (p : {name : $na, img : $im, Description : $ds, rating : $ra, price : $pr, category : $cat}){
            name
        }
    }
`;
export {CREATE_PR}


const GET_PRS_NA = gql`
    query pro($na : String){
        productsN(name : $na){id,name,img,rating,description,price}
    }
`;
export {GET_PRS_NA}

const GET_PR_id = gql`
    query pr($id : Float){
        prod(id : $id){id,name,img,rating,description,price,category{name}}
    }
`;
export {GET_PR_id}

const UPDATE_PR = gql`
    mutation upd($id : Float, $na : String, $img : String, $des : String, $rat : Float, $pr : Float, $cat : String){
        update(id : $id, p : {name : $na,
                                 img : $img,
                                  Description : $des,
                                   rating : $rat,
                                    price : $pr ,
                                     category : $cat})
    }
`;
export {UPDATE_PR}

const DELETE_PR = gql`
    mutation del($id : Float){
        delete(id : $id)
    }

`;
export {DELETE_PR}



const GET_E = gql`
    query {
        Earns
    }
`;

export {GET_E}

const GET_O = gql`
    query {
        numbO
    }
`;

export {GET_O}

const GET_U = gql`
    query {
        numbU
    }
`;

export {GET_U}


const GET_CATS = gql`
    query cg{
        categories{id,name}
    }
`;

export {GET_CATS}

const GET_P = gql`
    query {
        numbP
    }
`;

export {GET_P}


const CREATE_PAN = gql`
    mutation pan($idC : Float, $id : Float){
        panier(idC : $idC, id : $id){Id,quantity,product{name,price}}
    }
`;

export {CREATE_PAN}


const GET_PRS_BYname = gql`
    query g($na : String){
        productsByName(name : $na){id,name,img,rating,description,price,category{name}}
    }
`;
export {GET_PRS_BYname}

const GET_PANS = gql`
    query q{
        paniers{Id, quantity,product{name},client{username},timestamp,status}
    }
`;
export {GET_PANS}

const DELETE_OR = gql`
    mutation o($id : Float){
        deleteI(id : $id)
    }
`;
export {DELETE_OR}

const CREATE_CAT = gql`
    mutation cat($name : String){
        category(name : $name){name}
    }
`;

export {CREATE_CAT}

const UPDATE_CAT = gql`
    mutation up($id : Float, $name : String){
        updateCategory(id : $id, name : $name)
    }
`;

export {UPDATE_CAT}

const DELETE_CAT = gql`
    mutation del($id : Float){
        deleteCategory(id : $id)
    }
`;

export {DELETE_CAT}


const CATS_BYNAME = gql`
    query qs($name : String){
        categoryList(name : $name){id, name}
    }
`;

export {CATS_BYNAME}


const UPDATE_Or = gql`
    mutation up($id : Float, $qt : Float, $st : String){
        updateStatus(id : $id, quantity : $qt, status : $st)
    }
`;

export {UPDATE_Or}