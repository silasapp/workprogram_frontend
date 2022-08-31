import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-mom',
  templateUrl: './upload-mom.component.html',
  styleUrls: ['./upload-mom.component.scss']
})
export class UploadMomComponent implements OnInit {

  validatingForm: FormGroup;

  constructor() {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
  }
ngOnInit(): void {
  
}
  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }
}

