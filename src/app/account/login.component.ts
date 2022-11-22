import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthenticationService, GenericService } from '../services';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: [ 'login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    email: string;
    password: string;
    submitted = false;
    returnUrl: string;
    loginModal = false;
    passwordError: string;
    usernameError: string;
    genk: GenericService;
    isSpinner = false;
    authenticationService: AuthenticationService

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private locate: Location,
        private cd: ChangeDetectorRef,
        private gen: GenericService,
        private auth: AuthenticationService
    ) {
        this.genk = gen;
        this.authenticationService = auth;
        if (this.authenticationService.currentUserValue) {
            this.genk.isAdmin = this.authenticationService.currentUserValue.companyName === 'Admin';
            this.router.navigate(['/' + this.genk.company, 'dashboard']);
        }
        //alert(this.authenticationService.currentUserValue.companyId);
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            'email': new FormControl(this.email, [Validators.required]),
            'password': new FormControl(this.password, [Validators.required])
        }, {});

        // this.authenticationService.currentUserValue.
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
     }

     submit() {
         this.isSpinner = true;
        this.submitted = true;
        // stop here if form is invalid
        // if (this.loginForm.invalid) {
        //     this.cd.markForCheck();
        //     return;
        // }
        //alert('my email' + this.email + '  ' + this.password);
        this.isSpinner = true;
            this.authenticationService.login(this.email, this.password).subscribe(
                data => {
                    switch (data.code) {
                      case 0:
                        this.isSpinner = false;
                        this.togLoginModal();
                        break;
                      case 2:
                        this.passwordError = 'Password is incorrect';
                        this.usernameError = '';
                        this.isSpinner = false;
                        this.cd.markForCheck();
                        break;
                      case 3:
                        this.usernameError = 'This email is not on our record';
                        this.passwordError = '';
                        this.isSpinner = false;
                        this.cd.markForCheck();
                        break;
                      default:
                        this.isSpinner = false;
                        this.cd.markForCheck();
                        const url = '/company/dashboard';
                        this.returnUrl = '';
                        this.locate.replaceState(url);
                        window.location.reload();

                        // this.clearForm();
                        // this.router.navigate([url]);
                    }
                }
            );
     }

     togLoginModal() {
        if (this.loginModal) {
            this.loginModal = false;
            this.cd.markForCheck();
        } else {
            this.loginModal = true;
            this.cd.markForCheck();
        }
    }

    clearForm() {
        this.email = '';
        this.password = '';
    }
}
