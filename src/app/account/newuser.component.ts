import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, GenericService, ModalService } from '../services';

@Component({
    templateUrl: 'newuser.component.html',
    styleUrls: [ 'login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserComponent implements OnInit {
    newUserForm: FormGroup;
    companyCode: string;
    genk: GenericService;
    submitted = false;

    constructor(private gen: GenericService, 
        private auth: AuthenticationService, 
        private router: Router,
        private modal: ModalService) {
        this.genk = gen;
    }

    ngOnInit() {
        this.newUserForm = new FormGroup({
            'CompanyCode': new FormControl(this.companyCode, [Validators.required])
        }, {});
    }

    get f() {
        return this.newUserForm.controls;
     }

    submit() {
        this.submitted = true;
        if (this.newUserForm.invalid) {
            return;
        }
        this.auth.verifyCode(this.companyCode).subscribe(res => {
            if (res.isValid) {
                localStorage.setItem("NewCompanyCode", res.companyCode);
                localStorage.setItem("NewCompanyName", res.companyName);
                if (!res.isGuid) {
                    this.router.navigate(['/' + this.genk.account, 'changecompanycode']);
                }
                else {
                    this.router.navigate(['/' + this.genk.account, 'companyresource']);
                }
            } else {
                this.modal.logNotice("Error", res.errorText, 'error');
            }
        });
    }
}