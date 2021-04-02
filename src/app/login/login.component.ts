import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../_services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm :  FormGroup;
  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  loginProcess(){
    if(this.loginForm.valid){
      console.log("valid form");
      this.authService.login(this.loginForm.value).subscribe(result=>{
        if(result.success){
          console.log("success",result)
        }
        else{
          console.log("Failed",result)
        }
      })
    }
  }

}
