import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PresentationScheduleService } from 'src/app/services/presentation-schedule.service';


@Component({
  selector: 'app-update-reps',
  templateUrl: './update-reps.component.html',
  styleUrls: ['./update-reps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateRepsComponent implements OnInit {
  repsForm:FormGroup
  companyRepsList: any = [];
  companyRep: any;
  id: string;
  constructor(private pss: PresentationScheduleService, 
    private cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<UpdateRepsComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { 
      this.repsForm =  this.initForm();
      this.getCompanyRepsList();
      this.id = data.id
    }

  ngOnInit(): void {

  }

  get f(){
    return this.repsForm.controls
  }
getCompanyRepsList(){
  this.pss.getCompanyRepsList().subscribe(
    (res) =>{
      this.companyRepsList = res;
      this.cd.markForCheck()

    }
  )
}
getCompanyRep(id:string){
  this.pss.getCompanyRep(id).subscribe(
    (res) => {
      this.companyRep = res.data
      this.cd.markForCheck();
    }
    )
}
initForm() : FormGroup{
return this.fb.group({
  id: [''],
  representative: ['test', Validators.required],
  division: [{value: '', disabled: true}],
  representativE_EMAIL: [{value: '', disabled: true}, Validators.required],
})
}
onSubmit(){
  this.pss.updateCompanyRep(this.repsForm.getRawValue(), this.id).subscribe(
    (res) =>{
      //console.log(res)
    }

  )
}
onNoClick(){
  return null
}
submit() {
  // emppty stuff
}
setCompanyRep(ob){
  const value = ob.value;
  var rep = this.companyRepsList.filter(function(company_rep){
    return company_rep.id == value;
  });
  this.repsForm.patchValue({
    representative: rep[0].diV_REP_NAME,
    division: rep[0].division,
    representativE_EMAIL: rep[0].diV_REP_EMAIL
  })
}
}
