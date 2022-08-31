import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, GenericService, ModalService } from '../services';

@Component({
    templateUrl: 'companyresource.component.html',
    styleUrls: [ 'login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyResourceComponent implements OnInit {
    companyResourceForm: FormGroup;
    companyCode: string;
    companyName: string;
    name: string;
    designation: string;
    phone: string;
    email: string;
    password: string;
    genk: GenericService;
    submitted = false;
    infodata: any[];
    isEmpty = true;

    constructor(private gen: GenericService,
        private auth: AuthenticationService, 
        private router: Router,
        private cd: ChangeDetectorRef,
        private modal: ModalService) {
        this.genk = gen;
    }

    ngOnInit() {
        this.companyResourceForm = new FormGroup({
            'Name': new FormControl(this.name, [Validators.required]),
            'Designation': new FormControl(this.designation, [Validators.required]),
            'Phone': new FormControl(this.phone, [Validators.required]),
            'Email': new FormControl(this.email, [Validators.required]),
            'Password': new FormControl(this.password, [Validators.required])
        }, {});

        this.companyCode = localStorage.getItem("NewCompanyCode");
        this.companyName = localStorage.getItem("NewCompanyName");

        this.getCompanyResource();
    }

    get f() {
        return this.companyResourceForm.controls;
    }

    getCompanyResource() {
        this.auth.getCompanyResource(this.companyCode)
        .subscribe((res: any[]) => {
            this.infodata = res;
            if (res.length === 0) {
                this.isEmpty = true;
            } else {
                this.isEmpty = false;
            }
            this.cd.markForCheck();
        });
    }

    deleteCompanyResource(id: string) {
        this.auth.deleteCompanyResource(id, this.companyCode)
        .subscribe(res => {
            this.infodata = res;
            if (res.length === 0) {
                this.isEmpty = true;
            } else {
                this.isEmpty = false;
            }
            this.cd.markForCheck();
        });
    }

    submit() {
        this.submitted = true;
        if (this.companyResourceForm.invalid) {
            return;
        }
        this.auth.createUser(this.companyName, this.companyCode, this.name, this.designation, this.phone, this.email, this.password).subscribe(res => {
            if (res.isValid) {
                this.modal.logNotice("Success", res.popText, 'success');
                this.infodata = res.data;
                if (res.data.length === 0) {
                        this.isEmpty = true;
                } else {
                    this.isEmpty = false;
                }
                this.cd.markForCheck();
            } else {
                this.modal.logNotice("Error", res.popText, 'error');
            }
        });
    }
}