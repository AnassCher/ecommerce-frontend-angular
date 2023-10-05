import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { UPDATE_CL, UPDATE_CL_PASS } from 'src/app/Data/getClients';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user : any
  showForm : boolean = false
  showFormPass : boolean = false
  updateForm : FormGroup
  updatePassword : FormGroup
  error : any 
  error1 : any 
  constructor(private service : ServiceService, private fb : FormBuilder, private apollo : Apollo, private router :Router){}
  ngOnInit(): void {
    if(!this.service.isAuth){
      this.router.navigateByUrl("/login")
    }
    this.loadUser()
    this.updateForm = this.fb.group({
      name : this.fb.control(""),
      address : this.fb.control(""),
      tel : this.fb.control(""),
      email : this.fb.control(""),
      username : this.fb.control("")
    })
    this.updatePassword = this.fb.group({
      old_pass : this.fb.control(""),
      new_pass : this.fb.control(""),
      confirm : this.fb.control("")
    })
   
  }
  loadUser(){
    if(this.service.username != undefined){
      this.service.getProfile(this.service.username).subscribe(res => this.user = res)
    }
    
  }
  showform(){
    this.showForm = true
    this.updateForm.patchValue({
      name : this.user.name,
      address : this.user.address,
      tel : this.user.tel,
      email : this.user.email,
      username : this.user.username
    })
  }
  update(){
    this.apollo.mutate<any>({
      mutation : UPDATE_CL,
      variables : {id : this.user.id,
                    us : this.updateForm.value.username,
                    na : this.updateForm.value.name,
                    ps : "",
                    em : this.updateForm.value.email,
                    tl : this.updateForm.value.tel,
                    ad : this.updateForm.value.address
                  },
    }).subscribe(data =>{
      this.loadUser()
      this.showForm = false
    },
    error =>{
      this.error = "username already used"
    })
  }


  updatePasswordF(){
    let newPas :String = this.updatePassword.value.new_pass
    let conf : String = this.updatePassword.value.confirm
    if(newPas === conf){
      console.log("hi")
      this.apollo.mutate<any>({
        mutation:UPDATE_CL_PASS,
        variables : {id:this.user.id,
                      old : this.updatePassword.value.old_pass,
                    newP : newPas}
      }).subscribe(data =>{this.loadUser(); this.showFormPass = false; },
        error =>{this.error1 = "old password is incorrect"})
    }else{
      this.error1 = "password incorrect"
    }
    this.updatePassword.reset()
  }
}
 