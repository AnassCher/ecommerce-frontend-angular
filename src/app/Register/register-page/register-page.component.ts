import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CREATE_CL } from 'src/app/Data/getClients';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{
  formRegister : FormGroup
  error : String = ""
  constructor(private fb : FormBuilder, private apollo : Apollo, private router : Router,
    private clientService:ServiceService){}
  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name : this.fb.control(""),
      address : this.fb.control(""),
      email : this.fb.control(""),
      password : this.fb.control(""),
      tel : this.fb.control(""),
      username : this.fb.control("")
    })
  }
  register(){
    //console.log(this.formRegister.value)
    this.clientService.createClient(this.formRegister.value).subscribe(res=>{this.router.navigateByUrl("/login")}
                            ,(error)=>this.error="*username already used");
    /*this.apollo.mutate<any>({
      mutation : CREATE_CL,
      variables : {
        na : this.formRegister.value.name,
        ad : this.formRegister.value.address,
        us : this.formRegister.value.username,
        tl : this.formRegister.value.phone,
        em : this.formRegister.value.email,
        ps : this.formRegister.value.password
      },
    }).subscribe(({ data }) => {
            this.router.navigateByUrl("/login")

      
        },
        (error) => {
            this.error = error.message
        })*/
  }

}
