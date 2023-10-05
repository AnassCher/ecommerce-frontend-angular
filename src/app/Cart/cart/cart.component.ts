import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_CL, GET_CLid, GET_Cls, deleteI, update_quant } from 'src/app/Data/getClients';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private service : ServiceService, private apollo: Apollo,private router:Router){}
  data : any
  ngOnInit(): void {
    if(!this.service.isAuth){
      this.router.navigateByUrl("/login")
    }
    this.loadUserCommands();
  

    
  }

  loadUserCommands(){
    this.apollo.watchQuery<any>({
      query : GET_CLid,
      variables : {id : 1},
      pollInterval : 100,
    }).valueChanges.subscribe(res => {this.data = res.data.user.commands; 
      
        if(this.data.length == 0){
          this.router.navigateByUrl("/NotFound")
        }
      })
  }
  removeFromCart(id:Number){
    if(id != null){
      this.apollo.mutate<any>({
        mutation : deleteI,
        variables : {id : id},
      }).subscribe(() => this.loadUserCommands())    
    }
  }
  getPrice(id : number, id2 : number){
    
    return (id * id2);
  }
  getCount(){
    let sum = 0;
    for(let x = 0; x<this.data.length; x++){
      sum += this.data[x].quantity
    }
    return sum
  }
  getTotalPrice(){
    let sum = 0;
    for(let x = 0; x<this.data.length; x++){
      sum += this.getPrice(this.data[x].product.price, this.data[x].quantity)
    }
    return sum
  }
  updateQuantity(id : number, quantity : number){
    if(quantity > 0){
      this.apollo.mutate<any>({
        mutation : update_quant,
        variables : {id : id, qt : quantity},
      }).subscribe(res => this.loadUserCommands())
    }
  }
}
