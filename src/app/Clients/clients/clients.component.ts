import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ADDROLE_CL, CATS_BYNAME, CREATE_CAT, CREATE_CL, CREATE_PR, DELETE_CAT, DELETE_CL, DELETE_OR, DELETE_PR, GET_CATS, GET_CL, GET_CLs_username, GET_Cls, GET_E, GET_O, GET_P, GET_PANS, GET_PRS, GET_PRS_BYname, GET_PR_id, GET_U, UPDATE_CAT, UPDATE_CL, UPDATE_Or, UPDATE_PR } from 'src/app/Data/getClients';
import { Client } from 'src/app/Modules/Client';
import { Subscription} from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{
  constructor(private apollo : Apollo, private fb : FormBuilder){}
  private querySubscription : Subscription;
  clients : any;
  Products : any;
  Paniers : any
  categories : any;
  id : Number;
  O_id : number;
  username : String;
  client : any
  formLogin : FormGroup
  formLoginO : FormGroup
  formLoginP : FormGroup
  formLoginPC : FormGroup
  formLoginCg : FormGroup
  formLoginCg2 : FormGroup
  loading : boolean;
  showForm : boolean = false;
  showFormP : boolean = false;
  showFormO : boolean = false;
  showFormPC : boolean = false;
  showFormCg : boolean = false;
  showFormCg2 : boolean = false;
  formAlert : boolean
  formAlertP : boolean
  formAlertO : boolean
  formAlertCg : boolean
  formRole : boolean = false
  earns : any
  us : any
  pr : any
  or : any
  searchPrime : any = "";
  searchOrder : any = "";
  searchCategory : any = "";
  searchPrimeP : any = "";
  pr_id : number;
  AllStatus : any[] = ["Pending","Processing","Completed","Cancelled","Shipped"]
  
  
  
  
  ngOnInit(): void {
    this.loadUsers()
    this.loadProducts()
    this.getPaniers()
    this.getEarns()
    this.choose(1)
    this.getO()
    this.getP()
    this.getU()
    this.loadCategories()
    

    this.formLoginPC = this.fb.group({
      
      nameP : this.fb.control(""),
      imgP : this.fb.control(""),
      descriptionP : this.fb.control(""),
      priceP : this.fb.control(""),
      ratingP : this.fb.control(""),
      categoryP : this.fb.control("1")
    })

    this.formLoginCg = this.fb.group({
      
      name : this.fb.control("")
    })

    this.formLoginCg2 = this.fb.group({
      id : this.fb.control(""),
      name : this.fb.control("")
    })

    this.formLoginO = this.fb.group({
      
      Id : this.fb.control(""),
      owner : this.fb.control(""),
      prodName : this.fb.control(""),
      quantity : this.fb.control(""),
      Status : this.fb.control("")
    })

      this.formLogin = this.fb.group({
        id : this.fb.control(""),
        nom : this.fb.control(""),
        username : this.fb.control(""),
        password : this.fb.control(""),
        email : this.fb.control("",Validators.email),
        tel : this.fb.control("")
      })

      this.formLoginP = this.fb.group({
        id : this.fb.control(""),
        name : this.fb.control(""),
        img : this.fb.control(""),
        description : this.fb.control(""),
        price : this.fb.control(""),
        rating : this.fb.control(""),
        category : this.fb.control("")
      })
   this.formLoginP.get("category").setValue(this.categories[0]?.name)
  }

  loadCategories(){
    this.apollo.watchQuery<any>({
      query : GET_CATS,
      pollInterval : 200,
    }).valueChanges.subscribe(data =>{
      this.categories = data.data.categories
    })
  }
  loadUsers(){
    this.apollo
    .watchQuery<any>({
      query: GET_Cls,
      pollInterval : 500,
    })
    .valueChanges.subscribe(({data, loading}) => {
      this.loading = loading
      this.clients = data.Clients;
      //console.log(this.clients)
    });
  }
  loadProducts(){
    this.apollo
    .watchQuery<any>({
      query: GET_PRS,
      pollInterval : 200,
    })
    .valueChanges.subscribe(({data, loading}) => {
      this.loading = loading
      this.Products = data.products;
      
      //console.log(this.clients)
    });
  }
  form(username : String){}

  showAlert(id :Number){}

  updateForm(Username : String){
    //this.username = username
    this.showForm=true
    this.getC(Username).subscribe(({data,loading}) => {
      this.client = data.getC
      this.formLogin.patchValue({
        id : this.client.id,
        username : this.client.username,
        nom : this.client.name,
        email : this.client.email,
        tel : this.client.tel
      })
    });
    
   
  }
  
  update(){
    this.showForm = false;
    this.apollo.mutate({
      mutation : UPDATE_CL,
      variables : {
        id : this.client.id,
        us : this.formLogin.value.username,
        na : this.formLogin.value.name,
        ps : "",
        em : this.formLogin.value.email,
        tl : this.formLogin.value.tel
      },
    }).subscribe(() => this.loadUsers())
    
  }

  removeForm(id : Number){
    this.id = id;
    this.formAlert = true
  }
  remove(){
    this.apollo.mutate({
      mutation : DELETE_CL,
      variables :{ id : this.id},
    }).subscribe(res =>{this.loadUsers(); this.formAlert = false})  
  }

  showRole(id : Number){
    this.id = id;
    this.formRole = true

  }
  addRole(){
    this.apollo.mutate({
      mutation : ADDROLE_CL,
      variables : {id : this.id},
    }).subscribe((res)=> { this.loadUsers();this.formRole = false} )
  }

  getC(Username : String){
    return this.apollo.watchQuery<any>({
      query : GET_CL,
      variables : {
        us : Username},
    }).valueChanges;
  }

  getEarns(){
    return this.apollo.watchQuery<any>({
      query : GET_E,
    }).valueChanges.subscribe(res => this.earns = res.data.Earns)
  }
  getP(){
    return this.apollo.watchQuery<any>({
      query : GET_P,
    }).valueChanges.subscribe(res => this.pr = res.data.numbP)
  }
  getU(){
    return this.apollo.watchQuery<any>({
      query : GET_U,
    }).valueChanges.subscribe(res => this.us = res.data.numbU)
  }
  getO(){
    return this.apollo.watchQuery<any>({
      query : GET_O,
    }).valueChanges.subscribe(res => this.or = res.data.numbO)
  }

  choose(section : number){
    let cls = document.getElementById("Clients");
    let prs = document.getElementById("Products");
    let pans = document.getElementById("Orders");
    let catgs = document.getElementById("Categories")
    if(section == 1){
      cls.style.visibility = "visible"
      prs.style.visibility = "hidden"
      pans.style.visibility = "hidden"
      catgs.style.visibility = "hidden"
    }
    if(section == 2){
      cls.style.visibility = "hidden"
      prs.style.visibility = "visible"
      pans.style.visibility = "hidden"
      catgs.style.visibility = "hidden"
    }
    if(section == 3){
      prs.style.visibility = "hidden"
      cls.style.visibility = "hidden"
      pans.style.visibility = "visible"
      catgs.style.visibility = "hidden"
      
    }
    if(section == 4){
      prs.style.visibility = "hidden"
      cls.style.visibility = "hidden"
      pans.style.visibility = "hidden"
      catgs.style.visibility = "visible"
    }


  }
  search(){
     this.apollo.watchQuery<any>({
      query : GET_CLs_username,
      variables : {us : this.searchPrime},
      pollInterval : 200,
     }).valueChanges.subscribe(({data, loading}) =>{
        this.clients = data.byUsername
        this.searchPrime = ""
     })
  }
  searchP(){
    this.apollo.watchQuery<any>({
      query : GET_PRS_BYname,
      variables : {na : this.searchPrimeP},
      pollInterval : 200,
     }).valueChanges.subscribe(({data, loading}) =>{
        this.Products = data.productsByName
        this.searchPrimeP = ""
     })
 }
  updateProduct(id : number){
    this.pr_id = id
    this.showFormP = true
   
    this.apollo.watchQuery<any>({
      query : GET_PR_id,
      variables : {id : id},
      pollInterval : 200,
    }).valueChanges.subscribe(data =>{
      
      this.formLoginP.get("category").setValue(data.data.prod.category.name)
      
      this.formLoginP.patchValue({
        id : data.data.prod.id,
        name : data.data.prod.name,
        img : data.data.prod.img,
        price : data.data.prod.price,
        rating : data.data.prod.rating,
        description : data.data.prod.description,
        
        
      })
      this.formLoginP.get("category").setValue(data.data.prod.category.name)
      
    })
    
  }

  removeProduct(id : number){
    this.pr_id = id;
    this.formAlertP =true
  }

  updateP(){
    let price = parseFloat(this.formLoginP.value.price);
    let rating = parseFloat(this.formLoginP.value.rating)
    this.apollo.mutate<any>({
      mutation : UPDATE_PR,
      variables : {id : this.pr_id,
        na : this.formLoginP.value.name,
        img : this.formLoginP.value.img,
        des : this.formLoginP.value.description,
        rat : rating,
        pr : price,
        cat : this.formLoginP.value.category
      },
    }).subscribe(data =>{
      
      this.showFormP = false
    })
  }
  removeP(){
    this.apollo.mutate<any>({
      mutation : DELETE_PR,
      variables : {id : this.pr_id},
    }).subscribe(data => this.formAlertP = false)
  }

  cancel(){
    this.showFormP = false;
    this.formLoginP.reset()
  }
  createP(){
    let url : String = this.formLoginPC.value.imgP
    
    let url2 = url.replace("C:\\fakepath\\","\\assets\\")
    let rate : number= parseFloat(this.formLoginPC.value.ratingP);
    if(url2.includes("assets") && rate <= 5 ){
      
      this.apollo.mutate<any>({
      mutation : CREATE_PR,
      variables : {na : this.formLoginPC.value.nameP,
                    im : url2,
                    ds : this.formLoginPC.value.descriptionP,
                    ra : rate,
                    pr : parseFloat(this.formLoginPC.value.priceP),
                    cat : this.formLoginPC.value.categoryP, },
      }).subscribe(({data,loading})=> {this.loadProducts();this.showFormPC =false});
    }
    
  }


  getPaniers(){
    this.apollo.watchQuery<any>({
      query : GET_PANS,
      pollInterval : 200,
    }).valueChanges.subscribe(({data,loading})=>{this.Paniers = data.paniers;})
  }

  removeO(id : number){
    this.formAlertO = true
    this.O_id = id
  }

  removeOr(){
    let btn = document.getElementById("cancel2");
    this.apollo.mutate<any>({
      mutation : DELETE_OR,
      variables : {id : this.O_id}
    }).subscribe(()=> {this.Paniers();
      })
      btn.click()
      this.O_id = undefined;
      
  }

  updateO(id : number){
    this.showFormO = true
    this.O_id = id
    let panier:any;
    for (let index = 0; index < this.Paniers.length; index++) {
      if(this.Paniers[index].Id == id){
        panier = this.Paniers[index]
      }
    }
    
    if(panier != null){
      console.log(panier)
      this.formLoginO.patchValue({
        Id : panier.Id,
        owner : panier.client.username,
        prodName : panier.product.name,
        quantity : panier.quantity,
        Status : panier.status
      })
    }
   
  }

  updateOr(){
    this.apollo.mutate<any>({
      mutation : UPDATE_Or,
      variables : {id : this.formLoginO.value.Id,
                  qt : this.formLoginO.value.quantity,
                  st : this.formLoginO.value.Status}
    }).subscribe(()=>this.getPaniers())
    this.showFormO = false
  }

  searchO(){
    let Result : any[] = []
    for (let index = 0; index < this.Paniers.length; index++) {
      let name:String = this.Paniers[index].client.username;
      let status : String = this.Paniers[index].status
      console.log(name +""+ status+""+this.searchOrder)
      if(name.toLocaleLowerCase().includes(this.searchOrder.toLocaleLowerCase()) ){ //||status.toLocaleLowerCase().includes(this.searchOrder.toLocaleLowerCase()
        Result.push(this.Paniers[index])
        
      }
      
    }
   
    this.Paniers = Result;
  }
  C_id : number;
  createCg(){
    this.apollo.mutate<any>({
      mutation : CREATE_CAT,
      variables : {name : this.formLoginCg.value.name},
    }).subscribe(() => this.loadCategories())
    this.showFormCg = false
  }
  updateC(id : number){
    this.showFormCg2 = true
    if(id != undefined){
      for (let index = 0; index < this.categories.length; index++) {
        if(this.categories[index].id == id){
          this.formLoginCg2.patchValue({
            id : this.categories[index].id,
            name : this.categories[index].name
          })
          break
        } 
      }
    }
  }
  updateCg(){
    this.apollo.mutate<any>({
      mutation : UPDATE_CAT,
      variables : {id : this.formLoginCg2.value.id, name : this.formLoginCg2.value.name},
    }).subscribe(()=> this.loadCategories())
    this.showFormCg2 = false
  }

  deleteC(id : number){
    this.C_id = id
    this.formAlertCg = true
  }
  deleteCg(){
    this.apollo.mutate<any>({
      mutation : DELETE_CAT,
      variables : {id : this.C_id},
    }).subscribe(() => this.loadCategories())
    this.formAlertCg =false
  }

  searchCat(){
    this.apollo.watchQuery<any>({
      query : CATS_BYNAME,
      variables : {name : this.searchCategory},
    }).valueChanges.subscribe(({data,loading})=>this.categories = data.categoryList)
    this.searchCategory = ""
  }

  StatusColor(status : String){
    let backgroundColor = '';
    let color = '';

    switch (status) {
      case 'Pending':
        backgroundColor = 'black';
        color = 'white'
        break;
      case 'Processing':
        backgroundColor = 'blue';
        color = 'white'
        break;
      case 'Completed':
        backgroundColor = 'violet';
        color = 'black'
        break;
      case 'Cancelled':
        backgroundColor = 'red';
        color = 'white'
        break;
      case 'Shipped':
        backgroundColor = 'green';
        color = 'white'
        break;  
    
      default:
        backgroundColor = 'gray';
        break;
    }
    
    return {'background-color':backgroundColor, 'color':color};
    
  }
}

/* let date = this.formLogin.value;
    this.apollo.mutate({
      mutation : CREATE_CL,
      variables : {
        us : date.username,
        na : date.name,
        ps : date.password,
        em : date.email,
        tl : date.tel
      },
    }).subscribe(res => this.loadUsers())
    console.log(date)*/