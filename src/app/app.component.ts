import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ServiceService } from './services/service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'EcommeFront';
  token : String
  constructor(private service: ServiceService, private router : Router){}
ngOnInit(): void {
  this.token = window.localStorage.getItem("token")
  const decoded : any = jwtDecode(this.token.replace("Bearer ",""))
  const expirationDate = new Date(decoded.exp * 1000)
  const date = new Date()
  let roles : String = decoded.scope
  
  if(roles.includes("ADMIN")){
    this.service.role = true
  }
  if(date > expirationDate){
    console.log("Token Expired")
    
  }else{
    this.service.isAuth = true
    this.service.username = decoded.sub
    console.log("Token good")
  }
}

}
