import { AthurService } from './../../../service/authr/athur.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: any = FormGroup;
  registerFormGroup: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private userSer: AthurService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.changeClassContent()
    this.createFormFields()
    this.createSignUpFormFields()
  }


  // Open Login and Signup
  changeClassContent() {
    const wrapper: any = document.querySelector(".wrapper"),
      signupHeader: any = document.querySelector(".signup header"),
      loginHeader: any = document.querySelector(".login header");
    loginHeader.addEventListener("click", () => {
      wrapper.classList.add("active");
    });
    signupHeader.addEventListener("click", () => {
      wrapper.classList.remove("active");
    });
  }

  createFormFields() {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }


  createSignUpFormFields() {
    this.registerFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }


  async signuHandle() {
    console.log(this.registerFormGroup.value)
    try {
      if (this.registerFormGroup.invalid) {
        return alert('please fill all the fields');
      }
      const result: any = await this.userSer.createUser(this.registerFormGroup.value)
      console.log(result);
      if (result.status === '1') {
        this.registerFormGroup.reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: result.message,
          showConfirmButton: false,
          timer: 1500
        })
        const wrapper: any = document.querySelector(".wrapper");
          wrapper.classList.add("active");
      }
    } catch (error:any) {
      console.error(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  async loginHandle() {
    console.log(this.loginFormGroup.value)
    try {
      if (this.loginFormGroup.invalid) {
        return alert('please fill all the fields');
      }
      const result: any = await this.userSer.loginUser(this.loginFormGroup.value)
      console.log(result);
      if(result.status === '1'){
        localStorage.setItem('userName', this.loginFormGroup.value.email)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully Login',
          showConfirmButton: false,
          timer: 1500
        })
        this.loginFormGroup.reset()
        this.router.navigate(['/verfiy'])
      }
    } catch (error:any) {
      console.error(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
