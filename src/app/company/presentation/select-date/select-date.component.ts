import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss', '../../company.component.scss', "./style.css"]
})
export class SelectDateComponent implements OnInit {
  selectDateForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private companyService: CompanyService) {
    this.initForm();
   }

  ngOnInit(): void {
  }
  initForm(){
    this.selectDateForm = this.fb.group({
      date: ["", Validators.required],
      time: ["", Validators.required],
      companyId:[{value:this.auth.currentUserValue.companyId, disabled:true}, Validators.required],
      companyName:[{value:this.auth.currentUserValue.companyName, disabled: true}, Validators.required],
      companyEmail:[{value:this.auth.currentUserValue.companyEmail, disabled: true}, Validators.required],
      
    })
  }

  get f() {
    return this.selectDateForm.controls;
  }
onSubmit(){
  this.companyService.schedulePresentation(this.f['time'].value, this.f['date'].value).subscribe(
    (res) =>{
      if(res.statusCode === 200){
        this.Alert('Success', res.message, 'success')
      }
      else{
        this.Alert('Error', res.message, 'error')
      }
    }
  )
}

Alert(title: string, text: string, icon: any){
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Okay'
  })
}
}
