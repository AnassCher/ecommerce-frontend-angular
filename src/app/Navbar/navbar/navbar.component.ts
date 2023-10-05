import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private hear:ActivatedRoute, private router : Router, private service: ServiceService){}
  searchTerm : String = "";
  Auth : boolean 
  Role : boolean
  ngOnInit(): void {
    this.Role = this.service.role
    this.Auth = this.service.isAuth
    this.hear.params.subscribe(res => {
      if(res["searchTerm"]){
        this.searchTerm = res["searchTerm"];
      }
    })
  }
  search():void {
    if(this.searchTerm)
      //console.log(this.searchTerm)
      this.router.navigateByUrl('/search/'+this.searchTerm);
      this.searchTerm="";
  }
}
