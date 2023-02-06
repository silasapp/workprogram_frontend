import { AuthenticationService, ModalService } from 'src/app/services';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-presentation',
  templateUrl: './upload-presentation.component.html',
  styleUrls: [
    './upload-presentation.component.scss',
    '../../company.component.scss',
  ],
})
export class UploadPresentationComponent implements OnInit {
  public uploadPresentationForm: FormGroup;
  public wkYearForm: FormGroup;

  presentations: IPresentation[] = [];
  private d;
  YearsList = [];
  public currentYear = new Date().getFullYear();
  public selectedYear = this.currentYear.toString();

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private companyService: CompanyService,
    private modalService: ModalService,
    private cd: ChangeDetectorRef
  ) {
    this.d = companyService.currentCompanyValue;
  }

  preColHeaderDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
  ];

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

    this.wkYearForm = this.fb.group({
      year: [this.selectedYear, Validators.required],
    });

    this.getPresentations();
    this.cd.markForCheck();
  }

  get f() {
    return this.uploadPresentationForm.controls;
  }

  downloadMyFile(src) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', src);
    link.setAttribute('download', `products.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  getPresentations() {
    this.modalService.logCover('loading', true);
    this.companyService.getPresentations(this.selectedYear).subscribe({
      next: (res) => {
        if (res.data) this.presentations = res.data;
        else this.presentations = [];

        this.modalService.togCover();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.modalService.logNotice('Error', error.message, 'error');
        this.modalService.togCover();
        this.cd.markForCheck();
      },
    });
  }

  deletePresentation(row: IPresentation) {
    this.modalService.logCover('loading', true);
    this.companyService.deletePresentation(row.year_of_WP).subscribe({
      next: (res) => {
        this.getPresentations();
        this.modalService.togCover();
        this.modalService.logNotice('Success', res.message, 'success');
        this.cd.markForCheck();
      },
      error: (error) => {
        this.modalService.logNotice('Error', error.message, 'error');
        this.modalService.togCover();
        this.cd.markForCheck();
      },
    });
  }

  onSubmit() {
    var file: File = this.f['source'].value;
    var formData: FormData = new FormData();
    formData.append('document', file, file.name);

    this.modalService.logCover();
    this.companyService
      .uploadPresentation(this.f['year'].value, formData)
      .subscribe({
        next: (res) => {
          this.getPresentations();
          this.modalService.togCover();
          this.modalService.logNotice('Success', res.message, 'success');
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.togCover();
          this.modalService.logNotice('Error', error.message, 'error');
          this.cd.markForCheck();
        },
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

export interface IPresentation {
  check_status: string;
  companY_ID: string;
  companyName: string;
  companyNumber: string;
  companyemail: string;
  consession_Type: string;
  contract_Type: string;
  created_by: string;
  date_Created: string;
  date_Updated: string;
  field_ID: string;
  id: 539;
  omL_ID: string;
  omL_Name: string;
  original_filemane: string;
  terrain: string;
  updated_by: string;
  upload_extension: string;
  uploaded_presentation: string;
  year_of_WP: string;
}
