import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    templateUrl: 'resetpassword.component.html',
    styleUrls: [ '../../account/login.component.scss', '../company.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordForm: FormGroup;
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    onSubmit() {

    }
}