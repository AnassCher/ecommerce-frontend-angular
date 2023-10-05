import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CREATE_PAN, GET_PRS, GET_PRS_BYname, GET_PRS_NA } from 'src/app/Data/getClients';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products : any
  constructor(private apollo : Apollo, private hear:ActivatedRoute, private router : Router,
    private service : ServiceService){}

  ngOnInit(): void {
    this.loadProducts();
    
    
  }
  loadProducts(){
    this.hear.params.subscribe(res => {
      
      if(res["searchTerm"]){
        this.service.getProductsByName(res["searchTerm"]).subscribe(res=>{this.products=res});
        console.log(res["searchTerm"])
        
      }else{
        this.service.getProducts().subscribe(res => this.products=res)
        
      }
    })
    
  }

  details(id : Number){
    if(id != null){
      this.router.navigateByUrl("/product/"+id);
    }
  }

  buy(id : number){
   this.service.addToCart(id);
  }
}
/*this.apollo.watchQuery<any>({
          query : GET_PRS_BYname,
          variables : {na : res["searchTerm"]},
          
        }).valueChanges.subscribe(({data,loading}) => {this.products = data.productsByName ; });
        
        this.apollo.watchQuery<any>({
          query : GET_PRS,
          pollInterval : 500,
        }).valueChanges.subscribe(({data,loading}) => {this.products = data.products});
        */