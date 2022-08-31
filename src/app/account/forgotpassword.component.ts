import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService, GenericService, ModalService } from '../services';

@Component({
    templateUrl: 'forgotpassword.component.html',
    styleUrls: [ 'login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    companyCode: string;
    companyName: string;
    email: string;
    genk: GenericService;
    submitted = false;

    constructor(private gen: GenericService,
        private auth: AuthenticationService, 
        private router: Router,
        private cd: ChangeDetectorRef,
        private modal: ModalService) {
        this.genk = gen;
    }

    ngOnInit() {
        this.forgotPasswordForm = new FormGroup({
            'Email': new FormControl(this.email, [Validators.required])
        }, {});
    }

    get f() {
        return this.forgotPasswordForm.controls;
    }

    submit() {
        this.submitted = true;
        if (this.forgotPasswordForm.invalid) {
            return;
        }
        this.auth.returnPasswordInfo(this.email).subscribe(res => {
            if (res.isValid) {
                this.modal.logNotice("Success", res.popText, 'success');
                this.cd.markForCheck();
            } else {
                this.modal.logNotice("Error", res.popText, 'error');
                this.cd.markForCheck();
            }
        });
    }

}
