import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';
import { CompanyComponent } from '../../company.component';

@Component({
  selector: 'app-upload-presentation',
  templateUrl: './upload-presentation.component.html',
  styleUrls: [
    './upload-presentation.component.scss',
    '../../company.component.scss',
  ],
})
export class UploadPresentationComponent implements OnInit {
  uploadPresentationForm: FormGroup;

  uploadPresentations: any = [];
  private d;
  YearsList = [];
  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private companyService: CompanyService
  ) {
    this.d = companyService.currentCompanyValue;
  }

  ngOnInit(): void {
    this.getThreeYearsBehindAndAfter();

    this.uploadPresentationForm = this.fb.group({
      companyId: [
        { value: this.auth.currentUserValue.companyId, disabled: true },
        Validators.required,
      ],
      companyName: [
        { value: this.auth.currentUserValue.companyName, disabled: true },
        Validators.required,
      ],
      companyEmail: [
        { value: this.auth.currentUserValue.companyEmail, disabled: true },
        Validators.required,
      ],
      year: ['', Validators.required],
      document: ['', Validators.required],
      source: ['', Validators.required],
    });
  }

  get f() {
    return this.uploadPresentationForm.controls;
  }

  onSubmit() {
    var file: File = this.f['source'].value;
    var formData: FormData = new FormData();
    formData.append('document', file, file.name);
    this.companyService
      .uploadPresentation(this.f['year'].value, formData)
      .subscribe((res) => {
        if (res.statusCode == 200) {
          this.Alert('Message', res.message, 'success');
        } else if (res.statusCode == 300) {
          this.Alert('Message', res.message, 'warning');
        }
        console.log(res);
      });
  }

  getThreeYearsBehindAndAfter() {
    this.YearsList = [];
    var num: number = 2;
    var i: number;
    for (i = num; i > 0; i--) {
      this.YearsList[num - i] = this.currentYear - i;
      //this.fiveYearsValues.push(++this.genk.wkProposedYear);
    }

    for (i = 0; i < num; i++) {
      this.YearsList[num + i] = this.currentYear + i;
      //this.fiveYearsValues.push(++this.genk.wkProposedYear);
    }
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

  fileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadPresentationForm.get('source').patchValue(file);
    }
  }
}
