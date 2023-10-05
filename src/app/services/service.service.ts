import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_PAN } from '../Data/getClients';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  data :any
  isAuth : boolean;
  role : boolean
  LastPath : any
  username : any
  constructor(private apollo : Apollo, private router : Router, private http: HttpClient) { }

  addToCart(id : number){
    if(!this.isAuth){
      this.LastPath = this.router.url
      this.router.navigateByUrl("/login")
      
    }else{
      this.apollo.mutate<any>({
        mutation : CREATE_PAN,
        variables : {idC : 1, id:id},
      }).subscribe(res => {
        window.location.href = "/cart"
        
      })
    }
    
  }

  getProducts(){
    return this.http.get<any>("http://localhost:85/Rest/products");
  }

  getProductsByName(name:String){
    return this.http.get<any>("http://localhost:85/Rest/searchProductsByName/"+name);
  }

  getProductsByCategory(name:String){
    return this.http.get<any>("http://localhost:85/Rest/getProductsByCategory/"+name);
  }

  getProductsById(id:number){
    return this.http.get<any>("http://localhost:85/Rest/getProductById/"+id);
  }

  createClient(client:any){
    return this.http.post<any>("http://localhost:85/Rest/createClient",client);
  }

  getProfile(name : String){
    return this.http.get<any>("http://localhost:85/Rest/userProfile/"+name);
  }

}
