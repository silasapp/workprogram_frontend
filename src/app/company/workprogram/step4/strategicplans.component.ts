import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STRATEGIC_PLANS_ON_COMPANY_BASES } from '../../../models/step4-NCQ.model';
import {
  AuthenticationService,
  GenericService,
  IConcession,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';
import { updateFormValidity } from 'src/app/helpers/updateFormValidity';

@Component({
  templateUrl: './strategicplans.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPStrategicPlansComponent implements OnInit {
  public SBUTABLE = SBUTABLE;

  strategicplansBody: STRATEGIC_PLANS_ON_COMPANY_BASES =
    {} as STRATEGIC_PLANS_ON_COMPANY_BASES;

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
  public isStrategicplansFormSubmitted = false;
  activities = 'Appraisal Drilling (#)';
  //strategicplansoncompanybasesBody: STRATEGIC_PLANS_ON_COMPANY_BASES;

  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      this.getStrategicPlansOnCompanyBases();
    });
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP4';
    this.strategicplansForm = new FormGroup(
      {
        activities: new FormControl(this.strategicplansBody.activities, [
          Validators.required,
        ]),
        n_1_Q1: new FormControl(this.strategicplansBody.n_1_Q1, [
          Validators.required,
        ]),
        n_1_Q2: new FormControl(this.strategicplansBody.n_1_Q2, [
          Validators.required,
        ]),
        n_1_Q3: new FormControl(this.strategicplansBody.n_1_Q3, [
          Validators.required,
        ]),
        n_1_Q4: new FormControl(this.strategicplansBody.n_1_Q4, [
          Validators.required,
        ]),
        n_2_Q1: new FormControl(this.strategicplansBody.n_2_Q1, [
          Validators.required,
        ]),
        n_2_Q2: new FormControl(this.strategicplansBody.n_2_Q2, [
          Validators.required,
        ]),
        n_2_Q3: new FormControl(this.strategicplansBody.n_2_Q3, [
          Validators.required,
        ]),
        n_2_Q4: new FormControl(this.strategicplansBody.n_2_Q4, [
          Validators.required,
        ]),
        n_3_Q1: new FormControl(this.strategicplansBody.n_3_Q1, [
          Validators.required,
        ]),
        n_3_Q2: new FormControl(this.strategicplansBody.n_3_Q2, [
          Validators.required,
        ]),
        n_3_Q3: new FormControl(this.strategicplansBody.n_3_Q3, [
          Validators.required,
        ]),
        n_3_Q4: new FormControl(this.strategicplansBody.n_3_Q4, [
          Validators.required,
        ]),
        n_4_Q1: new FormControl(this.strategicplansBody.n_4_Q1, [
          Validators.required,
        ]),
        n_4_Q2: new FormControl(this.strategicplansBody.n_4_Q2, [
          Validators.required,
        ]),
        n_4_Q3: new FormControl(this.strategicplansBody.n_4_Q3, [
          Validators.required,
        ]),
        n_4_Q4: new FormControl(this.strategicplansBody.n_4_Q4, [
          Validators.required,
        ]),
        n_5_Q1: new FormControl(this.strategicplansBody.n_5_Q1, [
          Validators.required,
        ]),
        n_5_Q2: new FormControl(this.strategicplansBody.n_5_Q2, [
          Validators.required,
        ]),
        n_5_Q3: new FormControl(this.strategicplansBody.n_5_Q3, [
          Validators.required,
        ]),
        n_5_Q4: new FormControl(this.strategicplansBody.n_5_Q4, [
          Validators.required,
        ]),
      },
      {}
    );

    this.genk.Concession$.subscribe((con: IConcession) => {
      if (!con) {
        this.genk.disableForm = true;
        this.cd.markForCheck();
        return;
      }

      this.genk.disableForm =
        this.genk.Fields?.length > 0
          ? !this.genk.Field.isEditable
          : !con.isEditable;
      this.cd.markForCheck();
    });

    this.getStrategicPlansOnCompanyBases();
    this.cd.markForCheck();
  }

  public get a() {
    return this.strategicplansForm.controls;
  }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.genk.disableForm ? true : null;
  }

  getStrategicPlansOnCompanyBases() {
    this.workprogram.getStrategicPlans(this.genk.wpYear).subscribe((result) => {
      if (result.strategicPlans) {
        this.strategicData = result.strategicPlans;

        if (this.strategicData.length > 0) {
          this.strategicplansBody = { ...result.strategicPlans[0] };
        }
        if (result.strategicPlans.length > 0) {
          this.genk.isStep4 = true;
        }
      }
      this.cd.markForCheck();
    });
  }

  saveStrategicPlansOnCompanyBases() {
    console.log(this.strategicplansForm);
    this.isStrategicplansFormSubmitted = true;
    if (this.strategicplansForm.invalid) return;

    //console.log(this.strategicplansBody);
    this.strategicplansBody.activities = this.activities;
    this.strategicplansBody.id = 0;
    this.workprogram
      .saveStrategicPlans(this.strategicplansBody, this.genk.wpYear)
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.isStrategicplansFormSubmitted = false;
          // this.arbitrationBody = {} as LEGAL_ARBITRATION;
          this.strategicplansForm = updateFormValidity(this.strategicplansForm);
          this.getStrategicPlansOnCompanyBases();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  changeActivities(e) {
    // debugger;
    let activities = e.target.value;
    this.activities = activities;
    this.strategicplansBody = {} as STRATEGIC_PLANS_ON_COMPANY_BASES;

    console.log(this.strategicplansBody, this.strategicData);

    this.strategicplansBody =
      this.strategicData?.find((res) => {
        return res.activities == activities;
      }) ?? ({} as STRATEGIC_PLANS_ON_COMPANY_BASES);
    this.strategicplansBody.activities = activities;

    this.cd.markForCheck();
  }

  loadTable_StrategicPlan(data) {
    this.columnHeader = [];
    this.columnValue = [];

    if (data != null) {
      //data= this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.columnHeader.push(data[0]);
      this.columnValue.push(result);
    } else {
      for (let item1 in this.strategicplansForm.controls) {
        if (item1 != 'comment') {
          this.columnHeader.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.columnValue.push(this.strategicplansBody[item1]);
        }
      }
    }

    this.isTabVisible = true;
    this.cd.markForCheck();
  }

  Delete_StrategicPlan(event) {
    let info = this.strategicplansBody as STRATEGIC_PLANS_ON_COMPANY_BASES;

    this.workprogram
      .saveStrategicPlans(info, this.genk.wpYear)
      .subscribe((res) => {
        this.loadTable_StrategicPlan(res.data);
        this.modalService.logNotice('Success', res.message, 'success');
      });
  }
}
