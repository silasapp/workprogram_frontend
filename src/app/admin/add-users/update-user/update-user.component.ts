import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUserComponent implements OnInit {
  repsForm:FormGroup
  userList: any = [];
  id: string;
  user: any
  constructor(private adminService: AdminService,
    private cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.repsForm =  this.initForm();
      this.getUser(data.id)
      this.id = data.id;
    }

  ngOnInit(): void {

  }

  get f(){
    return this.repsForm.controls
  }
getUser(id:string){
  this.adminService.getUser(id).subscribe(
    (res) => {
      this.user = res.data
      this.setUser();
      this.cd.markForCheck();
    }
    )
}
initForm() : FormGroup{
return this.fb.group({
  id: [''],
  companY_NAME: [{value: '', disabled: true}, Validators.required],
  email: [{value: '', disabled: true}, Validators.required],
  statuS_: [{value: '',}, Validators.required],

})
}
onSubmit(){
  this.adminService.updateUser(this.repsForm.getRawValue(), this.id).subscribe(
    (res) =>{
     // console.log(res)
    }

  )
}
onNoClick(){
  return null
}
submit() {
  // emppty stuff
}
setUser(){
  this.repsForm.patchValue({
    companY_NAME: this.user.companY_NAME,
    email: this.user.email,
    statuS_: this.user.statuS_,
    passwords: this.user.passwords
  })
}

closeDialog(){
  this.dialogRef.close();
}

}
