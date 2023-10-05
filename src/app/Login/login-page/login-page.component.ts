import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  formLogin : FormGroup
  error : any = ""
  constructor(private fb : FormBuilder, private http : HttpClient, private service : ServiceService, private router: Router){}
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }
  login(){
    //console.log(this.formLogin.value)
    const loginData = {username:this.formLogin.value.username,
                        password : this.formLogin.value.password};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });                    
    this.http.post<any>("http://localhost:85/Rest/login",loginData,{headers}).subscribe(res =>{
      window.localStorage.setItem("token",'Bearer '+res["access_token"]);
      this.service.isAuth = true
      window.location.href="/"+this.service.LastPath;
      //this.router.navigateByUrl("/"+this.service.LastPath)
    },
    error => {
      this.formLogin.reset();
      this.error = "( username or password is incorrect please try again)"
    });

    
  }
}
