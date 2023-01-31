import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    debugger;
    this.companyService.getCompanyDetails().subscribe((res) => {
      debugger;
      
      this.d = res.data;
      this.companyDetails = this.d;
      debugger;
    });
    debugger;
    //  this.d = this.companyService.currentCompanyValue;
    this.initForm();
    this.companyService.opl().subscribe((res) => {
      console.log(res.data);
    });
    debugger;
   
    this.cd.markForCheck();
  }


  initForm() {
    debugger;
   // this.companyDetails = this.d as CompanyDetails;
    //console.log(d.address_of_Company);
    // this.companyDetailsForm = this.fb.group({
    //   companyId: [
    //     { value: this.auth.currentUserValue.companyId, disabled: true },
    //     Validators.required,
    //   ],
    //   companyName: [
    //     { value: this.auth.currentUserValue.companyName, disabled: true },
    //     Validators.required,
    //   ],
    //   companyEmail: [
    //     { value: this.auth.currentUserValue.companyEmail, disabled: true },
    //     Validators.required,
    //   ],
    //   opeN_DATE: [''],
    //   closE_DATE: [''],
    //   my_open_date: [''],
    //   my_close_date: [''],
    //   address_of_Company: [d.address_of_Company, Validators.required],
    //   contact_Person: [d.contact_Person || '', Validators.required],
    //   phone_No: [d.phone_No, Validators.required],
    //   email_Address: [d.email_Address, Validators.required],
    //   name_of_MD_CEO: [d.name_of_MD_CEO, Validators.required],
    //   phone_NO_of_MD_CEO: [d.phone_NO_of_MD_CEO, Validators.required],
    //   alternate_Contact_Person: [''],
    //   phone_No_alt: [''],
    //   email_Address_alt: [''],
    //   system_date_year: [''],
    //   system_date: [''],
    //   system_date_proposed_year: [''],
    // });





    this.companyDetailsForm = new FormGroup({
      companyId: new FormControl(
        this.auth.currentUserValue.companyId,
        [Validators.required]
      ),
      companyName: new FormControl(
        this.auth.currentUserValue.companyName, 
        [Validators.required]
      ),
      companyEmail: new FormControl(
        this.auth.currentUserValue.companyEmail,
        [Validators.required]
      ),
      name_of_MD_CEO: new FormControl(
        this.companyDetails.name_of_MD_CEO, 
        [Validators.required]
        ),
      phone_NO_of_MD_CEO: new FormControl(
        this.companyDetails.phone_NO_of_MD_CEO, 
        [Validators.required]
        ),
        contact_Person: new FormControl(
          this.companyDetails.contact_Person, 
        [Validators.required]
        ), 

      phone_No: new FormControl(
        this.companyDetails.phone_No, 
        [Validators.required]
        ),
      email_Address: new FormControl(
        this.companyDetails.email_Address,
         [Validators.required]
         ),

    }, {});
    this.cd.markForCheck();
  }

 

  get f() {
    return this.companyDetailsForm.controls;
  }



  onSubmit() {
    debugger;
    //var ii = this.companyDetailsForm.getRawValue();
    debugger;
    this.companyDetails.companY_NAME=this.auth.currentUserValue.companyName;
    this.companyDetails.companyEmail=this.auth.currentUserValue.companyEmail;
    this.companyDetails.companyId=this.auth.currentUserValue.companyId;
    debugger;
    this.companyService
      .editCompanyDetails(this.companyDetails)
      .subscribe(
        (res) => {
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
