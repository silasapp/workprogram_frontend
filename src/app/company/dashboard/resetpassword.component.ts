import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { Location } from '@angular/common';
import { AuthenticationService, GenericService } from 'src/app/services';
import Swal from 'sweetalert2';
import { CompanyService } from 'src/app/services/company.service';
import { PasswordConfirmationValidatorService } from 'src/app/services/password-confirmation-validator.service';
import { ResetPasswordDto } from 'src/app/models/auth.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: 'resetpassword.component.html',
  styleUrls: [
    '../../account/login.component.scss',
    '../company.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  cdr: ChangeDetectorRef;
  auth: AuthenticationService;
  genk: GenericService;
  company: CompanyService;

  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;

  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private companyService: CompanyService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private gen: GenericService,
    private passConfValidator: PasswordConfirmationValidatorService
  ) {
    this.cdr = cd;
    this.auth = authenticationService;
    this.company = companyService;
    this.genk = gen;
  }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl(''),
    });

    this.resetPasswordForm
      .get('confirmNewPassword')
      .setValidators([
        Validators.required,
        this.passConfValidator.validateConfirmPassword(
          this.resetPasswordForm.get('newPassword')
        ),
      ]);
  }

  public validateControl = (controlName: string) => {
    return (
      this.resetPasswordForm.get(controlName).invalid &&
      this.resetPasswordForm.get(controlName).touched
    );
  };

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.get(controlName).hasError(errorName);
  };

  public resetPassword = (resetPasswordFormValue) => {
    this.showError = this.showSuccess = false;
    const resetPass = { ...resetPasswordFormValue };

    const resetPassDto: ResetPasswordDto = {
      currentPassword: resetPass.currentPassword,
      newPassword: resetPass.newPassword,
    };

    this.company.changePassword(resetPassDto).subscribe((res) => {
      if (res.statusCode == 200) {
        this.Alert('Success', res.message, 'success');
        this.showSuccess = true;
        this.authenticationService.logout();
        this.router.navigate(['/' + 'login']);
      } else {
        this.Alert('Error', res.message, 'error');
        this.showError = true;
        this.errorMessage = res.message;
      }
    });
  };

  onSubmit() {
    this.company
      .changePassword(this.resetPasswordForm.getRawValue())
      .subscribe((res) => {
        if (res.statusCode == 200) {
          this.Alert('Success', res.message, 'success');
          this.authenticationService.logout();
          this.router.navigate(['/' + 'login']);
        } else {
          this.Alert('Error', res.message, 'error');
        }
      });
  }

  Alert(title: string, text: string, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okay',
    });
  }
}
