import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CompanyService } from '../../services/company.service';
import Swal from 'sweetalert2';
import { CdkAriaLive } from '@angular/cdk/a11y';
import { CompanyDetails } from 'src/app/models/company-details';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss', '../company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailsComponent implements OnInit {
  companyDetailsForm: FormGroup;
  companyDetails: CompanyDetails;
  private d: any;
  auth: AuthenticationService;


  constructor(
    private fb: FormBuilder,
    private authenticate: AuthenticationService,
    private companyService: CompanyService,
    private cd: ChangeDetectorRef
  ) {
    this.auth = authenticate;
  }

  ngOnInit(): void {

    this.getCompanyDetails();

    this.companyService.opl().subscribe((res) => {
      console.log(res.data);
    });

   this.initForm();
    this.cd.markForCheck();
  }


  initForm() {

 // this.companyDetails = this.d as CompanyDetails;
    debugger;
    // this.companyDetailsForm = new FormGroup({
    //   companyId: new FormControl(
    //     this.auth.currentUserValue.companyId,
    //     [Validators.required]
    //   ),
    //   companyName: new FormControl(
    //     this.auth.currentUserValue.companyName,
    //     [Validators.required]
    //   ),
    //   companyEmail: new FormControl(
    //     this.auth.currentUserValue.companyEmail,
    //     [Validators.required]
    //   ),
    //   name_of_MD_CEO: new FormControl(
    //     this.companyDetails.name_of_MD_CEO,
    //     [Validators.required]
    //     ),
    //   phone_NO_of_MD_CEO: new FormControl(
    //     this.companyDetails.phone_NO_of_MD_CEO,
    //     [Validators.required]
    //     ),
    //     contact_Person: new FormControl(
    //       this.companyDetails.contact_Person,
    //     [Validators.required]
    //     ),

    //   phone_No: new FormControl(
    //     this.companyDetails.phone_No,
    //     [Validators.required]
    //     ),
    //   email_Address: new FormControl(
    //     this.companyDetails.email_Address,
    //      [Validators.required]
    //      ),

    // }, {});


    this.companyDetailsForm= this.fb.group({
      companyId: [this.auth.currentUserValue.companyId, Validators.required],
      companyName: [this.auth.currentUserValue.companyName, Validators.required],
      companyEmail: [this.auth.currentUserValue.companyEmail, Validators.required],
      name_of_MD_CEO: ['', Validators.required],
      phone_NO_of_MD_CEO: ['', Validators.required],
      contact_Person: ['', Validators.required],
      phone_No: ['', Validators.required],
      email_Address: ['', Validators.required],
    });

    this.cd.markForCheck();
  }



  get f() {
    return this.companyDetailsForm.controls;
  }

getCompanyDetails()
{
  this.companyService.getCompanyDetails()
  .subscribe((res) => {
    this.companyDetails = res.data;
    this.cd.markForCheck();
  });
}


  onSubmit() {
    this.companyDetails.companyName=this.auth.currentUserValue.companyName;
    this.companyDetails.companyEmail=this.auth.currentUserValue.companyEmail;
    this.companyDetails.companyId=this.auth.currentUserValue.companyId;

    this.companyService
      .editCompanyDetails(this.companyDetails)
      .subscribe(
        (res) => {
          debugger;
          if (res.statusCode == 200) {
            this.Alert('Success', 'Company Details successfully updated', 'success');
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
