import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../_services/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public router: Router, private authService: AuthServiceService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  loginProcess() {
    let result = false;
    if (this.loginForm.valid) {
      // this.authService.login(this.loginForm.value).subscribe(result=>{
      //   if(result.success){
      //     console.log("success",result)
      //   }
      //   else{
      //     console.log("Failed",result)
      //   }
      // })
      result = this.authService.login(this.loginForm.value);
      if (result){
        this.router.navigate(["/opentrips"]);
        localStorage.setItem("userLoggedIn","true");
      }
      else
        document.getElementById("wrongCred").innerHTML = "Wrong credentials entered, please try again."
    }
  }

}
