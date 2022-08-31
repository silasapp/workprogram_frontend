import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, GenericService, ModalService } from '../services';

@Component({
    templateUrl: 'changecompanycode.component.html',
    styleUrls: [ 'login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeCompanyCodeComponent implements OnInit {
    changeCodeForm: FormGroup;
    companyCode: string;
    email: string;
    newCompanyCode: string;
    genk: GenericService;
    submitted = false;

    constructor(private gen: GenericService, 
        private router: Router,
        private auth: AuthenticationService, 
        private modal: ModalService) {
        this.genk = gen;
    }

    ngOnInit() {
        this.changeCodeForm = new FormGroup({
            'CompanyCode': new FormControl(this.companyCode, [Validators.required]),
            'Email': new FormControl(this.companyCode, [Validators.required]),
            'NewCompanyCode': new FormControl(this.companyCode, [Validators.required])
        }, {});
    }

    get f() {
        return this.changeCodeForm.controls;
     }

    submit() {
        this.submitted = true;
        if (this.changeCodeForm.invalid) {
            return;
        }
        this.auth.changeCode(this.companyCode, this.email, this.newCompanyCode).subscribe(res => {
            if (res.isValid) {
                localStorage.setItem("NewCompanyCode", res.companyCode);
                localStorage.setItem("NewCompanyName", res.companyName);
                this.modal.logNotice("Success", res.popText, 'success');
                this.router.navigate(['/' + this.genk.account, 'companyresource']);
            } else {
                this.modal.logNotice("Error", res.popText, 'error');
            }
        });
    }
}