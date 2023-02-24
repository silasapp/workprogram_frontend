import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from '../services';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { IAuthData, Staff } from '../models/application-details';
import { User } from '../models/user';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public elpsBase: string;
  public appid: string;

  public userId: string;
  public isLoading$ = new BehaviorSubject<boolean>(false);

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
  authenticationService: AuthenticationService;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locate: Location,
    private cd: ChangeDetectorRef,
    private gen: GenericService,
    private auth: AuthenticationService,
    private modalService: ModalService
  ) {
    this.elpsBase = environment.elpsBase;
    this.appid = environment.appid;
    this.genk = gen;
    this.authenticationService = auth;
    if (this.authenticationService.currentUserValue) {
      // this.genk.isAdmin =
      //   this.authenticationService.currentUserValue.companyName === 'Admin';

     // console.log('curren', this.authenticationService.currentUserValue);
      this.genk.setAdminSubject.next(
        this.authenticationService.currentUserValue.companyName === 'Admin'
      );

      // console.log(
      //   'checking....',
      //   this.genk.isAdmin,
      //   this.authenticationService.currentUserValue
      // );
      this.router.navigate(['/' + this.genk.company, 'dashboard']);
    }
    //alert(this.authenticationService.currentUserValue.companyId);
  }

  ngOnInit() {
    // this.loginForm = new FormGroup(
    //   {
    //     email: new FormControl(this.email, [Validators.required]),
    //     password: new FormControl(this.password, [Validators.required]),
    //   },
    //   {}
    // );
    // console.log('test', environment.elpsBase, environment.appid);
    // // this.authenticationService.currentUserValue.
    // // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

    if (this.auth.isLoggedIn_) {
      const user = JSON.parse(localStorage.getItem('currentUser'));

      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

      if (user.userType === UserType.Company)
        this.router.navigate([returnUrl || '/company/dashboard']);
      else this.router.navigate([returnUrl || '/admin']);
      return;
    }

    this.route.queryParams.subscribe((params) => {
      // this.email = params['email'];
      this.userId = params['id'];
     // console.log('id', this.userId);
      if (!this.auth.isLoggedIn_ && this.userId) {
        this.isLoading$.next(true);
        this.modalService.logCover('loading...', true);

        this.auth
          .login(
            // this.email, ''
            this.userId
          )
          .subscribe((user: User) => {
            debugger;
            if (user) {
              let returnUrl =
                this.route.snapshot.queryParamMap.get('returnUrl');

              if (user.companyName === UserType.Admin) {
                this.router.navigate([returnUrl || '/admin/dashboard']);
              } else {
                this.router.navigate([returnUrl || '/company/dashboard']);
              }
            }

            this.isLoading$.next(false);
            this.modalService.togCover();
          });
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  // submit() {
  //   this.isSpinner = true;
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   // if (this.loginForm.invalid) {
  //   //     this.cd.markForCheck();
  //   //     return;
  //   // }
  //   //alert('my email' + this.email + '  ' + this.password);
  //   this.isSpinner = true;
  //   this.authenticationService
  //     .login(this.email, this.password)
  //     .subscribe((data) => {
  //       switch (data.code) {
  //         case 0:
  //           this.isSpinner = false;
  //           this.togLoginModal();
  //           break;
  //         case 2:
  //           this.passwordError = 'Password is incorrect';
  //           this.usernameError = '';
  //           this.isSpinner = false;
  //           this.cd.markForCheck();
  //           break;
  //         case 3:
  //           this.usernameError = 'This email is not on our record';
  //           this.passwordError = '';
  //           this.isSpinner = false;
  //           this.cd.markForCheck();
  //           break;
  //         default:
  //           this.isSpinner = false;
  //           this.cd.markForCheck();
  //           const comp_url = '/company/dashboard';
  //           const admin_url = '/admin/dashboard';

  //           this.returnUrl = '';
  //           if (
  //             this.authenticationService.currentUserValue.companyName ===
  //             'Admin'
  //           ) {
  //             this.locate.replaceState(admin_url);
  //           } else {
  //             this.locate.replaceState(comp_url);
  //           }
  //           window.location.reload();

  //         // this.clearForm();
  //         // this.router.navigate([url]);
  //       }
  //     });
  // }

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

export enum UserType {
  Company = 'Company',
  Admin = 'Admin',
  Staff = 'Staff',
}
