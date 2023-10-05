import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_PRS_NA, GET_PR_id } from 'src/app/Data/getClients';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  data : any;
  products : any
  constructor(private apollo : Apollo, private hear : ActivatedRoute, private router: Router,
     private service : ServiceService){}
  ngOnInit(): void {
    this.loadProduct()
  }
  loadProduct(){
    this.hear.params.subscribe(res =>{
      if(res["id"]){
        this.service.getProductsById(res["id"]).subscribe(res => {this.data = res; 
                                                
                                                this.service.getProductsByCategory(this.data.category.name).subscribe(res =>{
                                                  this.products = res
                                                })})
        
      }
    })
  }


  addToCart(id : number){
    this.service.addToCart(id);
  }

}

/*this.apollo.watchQuery<any>({
          query : GET_PR_id,
          variables : {id : idd},
        }).valueChanges.subscribe(({data,loading}) =>{
            this.data = data.prod;
            console.log(this.data.category)
            this.apollo.watchQuery<any>({
              query : GET_PRS_NA,
              variables : {na : data.prod.category.name},
            }).valueChanges.subscribe(({data,loading}) => this.products = data.productsN);
        } )*/
