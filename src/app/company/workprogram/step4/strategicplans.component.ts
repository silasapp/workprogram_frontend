import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STRATEGIC_PLANS_ON_COMPANY_BASES  } from '../../../models/step4-NCQ.model';
import { AuthenticationService, GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './strategicplans.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SWPStrategicPlansComponent implements OnInit {
strategicplansBody: STRATEGIC_PLANS_ON_COMPANY_BASES = {} as STRATEGIC_PLANS_ON_COMPANY_BASES;

strategicData: STRATEGIC_PLANS_ON_COMPANY_BASES[];
wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;
  strategicplansForm: FormGroup;
  activities = 'Appraisal Drilling (#)';
  //strategicplansoncompanybasesBody: STRATEGIC_PLANS_ON_COMPANY_BASES;


  constructor(private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private modalService: ModalService
  )
{
  this.genk = gen;
    this.modalService.concessionSitu
    .subscribe(res => {
      this.getStrategicPlansOnCompanyBases();
    });
   }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP4';
    this.strategicplansForm = new FormGroup(
      {
        activities: new FormControl(this.strategicplansBody.activities),
        n_1_Q1: new FormControl(this.strategicplansBody.n_1_Q1, [Validators.required]),
        n_1_Q2: new FormControl(this.strategicplansBody.n_1_Q2, [Validators.required]),
        n_1_Q3: new FormControl(this.strategicplansBody.n_1_Q3, [Validators.required]),
        n_1_Q4: new FormControl(this.strategicplansBody.n_1_Q4, [Validators.required]),
        n_2_Q1: new FormControl(this.strategicplansBody.n_2_Q1, [Validators.required]),
        n_2_Q2: new FormControl(this.strategicplansBody.n_2_Q2, [Validators.required]),
        n_2_Q3: new FormControl(this.strategicplansBody.n_2_Q3, [Validators.required]),
        n_2_Q4: new FormControl(this.strategicplansBody.n_2_Q4, [Validators.required]),
        n_3_Q1: new FormControl(this.strategicplansBody.n_3_Q1, [Validators.required]),
        n_3_Q2: new FormControl(this.strategicplansBody.n_3_Q2, [Validators.required]),
        n_3_Q3: new FormControl(this.strategicplansBody.n_3_Q3, [Validators.required]),
        n_3_Q4: new FormControl(this.strategicplansBody.n_3_Q4, [Validators.required]),
        n_4_Q1: new FormControl(this.strategicplansBody.n_4_Q1, [Validators.required]),
        n_4_Q2: new FormControl(this.strategicplansBody.n_4_Q2, [Validators.required]),
        n_4_Q3: new FormControl(this.strategicplansBody.n_4_Q3, [Validators.required]),
        n_4_Q4: new FormControl(this.strategicplansBody.n_4_Q4, [Validators.required]),
        n_5_Q1: new FormControl(this.strategicplansBody.n_5_Q1, [Validators.required]),
        n_5_Q2: new FormControl(this.strategicplansBody.n_5_Q2, [Validators.required]),
        n_5_Q3: new FormControl(this.strategicplansBody.n_5_Q3, [Validators.required]),
        n_5_Q4: new FormControl(this.strategicplansBody.n_5_Q4, [Validators.required]),
      }, {});
      this.getStrategicPlansOnCompanyBases();
      this.cd.markForCheck();
  }

  getStrategicPlansOnCompanyBases() {
    this.workprogram.getStrategicPlans(this.genk.wpYear, this.genk.fieldName, this.genk.OmlName).subscribe(result => {
      if (result.strategicPlans) {
        this.strategicData = result.strategicPlans;
        this.strategicplansBody = result.strategicPlans[0];
        if (result.strategicPlans.length > 0) {
          this.genk.isStep4 = true;
        }
      }
      this.cd.markForCheck();
    });
  }

  saveStrategicPlansOnCompanyBases() {
    //console.log(this.strategicplansBody);
    this.strategicplansBody.id = 0;
    this.workprogram.saveStrategicPlans(this.strategicplansBody, this.genk.wpYear, this.genk.fieldName, this.genk.OmlName)
    .subscribe(result =>
    {
      this.modalService.logNotice("Success", "Data saved successfully!", 'success');
    }
    );
  }

  changeActivities(e) {
    debugger;
    let activities = e.target.value;
    this.strategicplansBody = {} as STRATEGIC_PLANS_ON_COMPANY_BASES;
    this.strategicplansBody = this.strategicData.filter(res => {
      return res.activities === activities;
    })[0] ?? {} as STRATEGIC_PLANS_ON_COMPANY_BASES;
    this.strategicplansBody.activities = activities;
    this.cd.markForCheck();
  }

  loadTable_StrategicPlan(data) {

    this.columnHeader=[];
    this.columnValue=[];

   if(data != null){
    //data= this.filter(data);
    var result = Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = value == null ? '' : value;
      return acc;
    }, {});

      this.columnHeader.push(data[0]);
      this.columnValue.push(result);


   }
   else{
    for (let item1 in this.strategicplansForm.controls) {
      if (item1 != 'comment') {
        this.columnHeader.push(this.genk.upperText(item1.replace(/_+/g, ' ')));
        this.columnValue.push(this.strategicplansBody[item1]);
      }
    }
    }

    this.isTabVisible = true;
    this.cd.markForCheck();
  }

   Delete_StrategicPlan(event){

    let info = this.strategicplansBody as STRATEGIC_PLANS_ON_COMPANY_BASES;
debugger;
    this.workprogram
      .saveStrategicPlans(info, this.genk.wpYear, this.genk.fieldName, this.genk.OmlName)
      .subscribe(res => {
        this.loadTable_StrategicPlan(res.data);
        this.modalService.logNotice("Success", res.message, 'success');
      })
  }
}
