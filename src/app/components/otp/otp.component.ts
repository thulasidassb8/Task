import Swal from 'sweetalert2';
import { AthurService } from './../../service/authr/athur.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  optFormGroup: any = FormGroup;

  constructor(
    private fb:FormBuilder,
    private userSer:AthurService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createSignUpFormFields()
  }

  createSignUpFormFields() {
    this.optFormGroup = this.fb.group({
      email: [''],
      otp: ['', [Validators.required]]
    })
  }


  async otpHandle(){
    console.log(this.optFormGroup.value)
    try {
      if (this.optFormGroup.invalid) {
        return alert('please fill all the fields');
      }
      this.optFormGroup.value.email = localStorage.getItem('userName');
      const result: any = await this.userSer.loginVerifyUser(this.optFormGroup.value)
      console.log(result);
      if(result.status === '1'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Verfied Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.optFormGroup.reset()
        this.router.navigate(['/dashboard'])
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
