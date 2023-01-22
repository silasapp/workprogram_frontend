import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CompanyService } from '../../services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss', '../company.component.scss'],
})
export class CompanyDetailsComponent implements OnInit {
  companyDetailsForm: FormGroup;
  companyDetails: any;
  private d: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanyDetails().subscribe((res) => {
      this.d = res.data;
    });
    this.d = this.companyService.currentCompanyValue;
    this.initForm();
    this.companyService.opl().subscribe((res) => {
      console.log(res.data);
    });
  }
  initForm() {
    const d = this.d;
    //console.log(d.address_of_Company);
    this.companyDetailsForm = this.fb.group({
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
      opeN_DATE: [''],
      closE_DATE: [''],
      my_open_date: [''],
      my_close_date: [''],
      address_of_Company: [d.address_of_Company, Validators.required],
      contact_Person: [d.contact_Person || '', Validators.required],
      phone_No: [d.phone_No, Validators.required],
      email_Address: [d.email_Address, Validators.required],
      name_of_MD_CEO: [d.name_of_MD_CEO, Validators.required],
      phone_NO_of_MD_CEO: [d.phone_NO_of_MD_CEO, Validators.required],
      alternate_Contact_Person: [''],
      phone_No_alt: [''],
      email_Address_alt: [''],
      system_date_year: [''],
      system_date: [''],
      system_date_proposed_year: [''],
    });
  }

  get f() {
    return this.companyDetailsForm.controls;
  }

  //
  // getCompanyDetails(){
  //
  //   //const details = this.auth.currentUserValue
  //   this.companyService.getCompanyDetails().subscribe(
  //     (res) => {
  //
  //       this.companyDetails = res.data;
  //     }
  //   );
  //  }
  onSubmit() {
    this.companyService
      .editCompanyDetails(this.companyDetailsForm.getRawValue())
      .subscribe(
        (res) => {
          this.Alert(
            'Success',
            'Company Details successfully updated',
            'success'
          );
        },
        (error) => {
          this.Alert('Error', 'An error occurred', 'error');
        }
      );
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
