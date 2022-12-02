import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthenticationService, GenericService } from 'src/app/services';
import Swal from 'sweetalert2';
import { CompanyService } from 'src/app/services/company.service';

@Component({
    templateUrl: 'resetpassword.component.html',
    styleUrls: ['../../account/login.component.scss', '../company.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {
    cdr: ChangeDetectorRef;
    auth: AuthenticationService;
    genk: GenericService;
    company: CompanyService;

    resetPasswordForm: FormGroup;


    constructor(private fb: FormBuilder, private authenticationService: AuthenticationService,
        private companyService: CompanyService,
        private cd: ChangeDetectorRef,
        private gen: GenericService) {
        this.cdr = cd;
        this.auth = authenticationService;
        this.company=companyService;
        this.genk = gen;
    }

    ngOnInit(): void {
        this.resetPasswordForm = this.fb.group({
            currentPassword: ["", Validators.required],
            newPassword: ["", Validators.required]
        })
    }

    onSubmit() {
this.company.changePassword(this.resetPasswordForm.getRawValue()).subscribe(
    (res)=>{
        debugger;
           if(res.statusCode==200){
             this.Alert("Success", res.message, "success")
          
           }
           else{
             this.Alert("Error", res.message, "error")
           }
           
         }
)
    }


    Alert(title: string, text: string, icon: any) {
        Swal.fire({
          title: title,
          text: text,
          icon: icon,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Okay'
        })
      }
}