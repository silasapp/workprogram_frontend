import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INITIAL_WELL_COMPLETION_JOB1 } from 'src/app/models/step2-initial';
import { GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './initial-well-completion.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPInitialWellCompletionComponent implements OnInit {
  InitialForm: FormGroup;
  initialBody: INITIAL_WELL_COMPLETION_JOB1 =
    {} as INITIAL_WELL_COMPLETION_JOB1;
  quaterIWOneData: INITIAL_WELL_COMPLETION_JOB1;
  quaterIWTwoData: INITIAL_WELL_COMPLETION_JOB1;
  quaterIWThreeData: INITIAL_WELL_COMPLETION_JOB1;
  quaterIWFourData: INITIAL_WELL_COMPLETION_JOB1;

  quaterIWOne = false;
  quaterIWTwo = false;
  quaterIWThree = false;
  quaterIWFour = false;

  currentIWQuater = 1;
  genk: GenericService;

  constructor(
    private cd: ChangeDetectorRef,
    private gen: GenericService,
    private modalService: ModalService,
    private workprogram: WorkProgramService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      const rel = 'QUARTER ' + this.currentIWQuater;
      this.getInitialCompletion();
    });
    this.cd.markForCheck();
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP2';
    this.InitialForm = new FormGroup(
      {
        current_year_Actual_Number: new FormControl(
          this.initialBody.current_year_Actual_Number,
          [Validators.required]
        ),
        proposed_year_data: new FormControl(
          this.initialBody.proposed_year_data,
          [Validators.required]
        ),
        proposed_initial_name: new FormControl(
          this.initialBody.proposed_initial_name,
          [Validators.required]
        ),
        budeget_Allocation_NGN: new FormControl(
          this.initialBody.budeget_Allocation_NGN,
          [Validators.required]
        ),
        budeget_Allocation_USD: new FormControl(
          this.initialBody.budeget_Allocation_USD,
          [Validators.required]
        ),
        oil_or_gas_wells: new FormControl(this.initialBody.oil_or_gas_wells, [
          Validators.required,
        ]),
        actual_Completion_Date: new FormControl(
          this.initialBody.actual_Completion_Date,
          [Validators.required]
        ),
        proposed_completion_days: new FormControl(
          this.initialBody.proposed_completion_days,
          [Validators.required]
        ),
        remarks: new FormControl(this.initialBody.remarks, [
          Validators.required,
        ]),
      },
      {}
    );
    this.getInitialCompletion();
  }

  get quaterIWClassOne() {
    let list = '';
    if (this.quaterIWOne) {
      if (this.currentIWQuater === 1) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
      //list = 'currfilled currquarter';
    } else {
      if (this.currentIWQuater === 1) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  get quaterIWClassTwo() {
    let list = '';
    if (this.quaterIWTwo) {
      if (this.currentIWQuater === 2) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentIWQuater === 2) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  get quaterIWClassThree() {
    let list = '';
    if (this.quaterIWThree) {
      if (this.currentIWQuater === 3) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentIWQuater === 3) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  get quaterIWClassFour() {
    let list = '';
    if (this.quaterIWFour) {
      if (this.currentIWQuater === 4) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentIWQuater === 4) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  changeIWQuater(quater: number, btn: HTMLButtonElement) {
    if (quater === 1) {
      this.currentIWQuater = 1;
      btn.textContent = 'Save Quarter 1';
      this.initialBody = this.quaterIWOneData;
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 1");
    }
    if (quater === 2) {
      this.currentIWQuater = 2;
      btn.textContent = 'Save Quarter 2';
      this.initialBody = this.quaterIWTwoData;
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 2");
    }
    if (quater === 3) {
      this.currentIWQuater = 3;
      this.initialBody = this.quaterIWThreeData;
      btn.textContent = 'Save Quarter 3';
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 3");
    }
    if (quater === 4) {
      this.currentIWQuater = 4;
      this.initialBody = this.quaterIWFourData;
      btn.textContent = 'Save Quarter 4';
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 4");
    }
    this.cd.markForCheck();
  }

  getInitialCompletion() {
    this.workprogram
      .getInitialWellCompletion(
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        //
        this.quaterIWOneData =
          res.initialWellCompletion.filter((res) => {
            return res.quater === 'QUARTER 1';
          })[0] ?? new INITIAL_WELL_COMPLETION_JOB1();
        if (this.quaterIWOneData) {
          this.quaterIWOneData.actual_Completion_Date = this.genk.formDate(
            this.quaterIWOneData.actual_Completion_Date
          );
          this.quaterIWOneData.proposed_Completion_Date = this.genk.formDate(
            this.quaterIWOneData.proposed_Completion_Date
          );
        }
        this.quaterIWOne = this.quaterIWOneData.omL_Name ? true : false;

        this.quaterIWTwoData =
          res.initialWellCompletion.filter((res) => {
            this.quaterIWTwo = res.quater === 'QUARTER 2' ? true : false;
            return res.quater === 'QUARTER 2';
          })[0] ?? new INITIAL_WELL_COMPLETION_JOB1();
        if (this.quaterIWTwoData) {
          this.quaterIWTwoData.actual_Completion_Date = this.genk.formDate(
            this.quaterIWTwoData.actual_Completion_Date
          );
          this.quaterIWTwoData.proposed_Completion_Date = this.genk.formDate(
            this.quaterIWTwoData.proposed_Completion_Date
          );
        }
        this.quaterIWTwo = this.quaterIWTwoData.omL_Name ? true : false;

        this.quaterIWThreeData =
          res.initialWellCompletion.filter((res) => {
            this.quaterIWThree = res.quater === 'QUARTER 3' ? true : false;
            return res.quater === 'QUARTER 3';
          })[0] ?? new INITIAL_WELL_COMPLETION_JOB1();
        if (this.quaterIWThreeData) {
          this.quaterIWThreeData.actual_Completion_Date = this.genk.formDate(
            this.quaterIWThreeData.actual_Completion_Date
          );
          this.quaterIWThreeData.proposed_Completion_Date = this.genk.formDate(
            this.quaterIWThreeData.proposed_Completion_Date
          );
        }
        this.quaterIWThree = this.quaterIWThreeData.omL_Name ? true : false;

        this.quaterIWFourData =
          res.initialWellCompletion.filter((res) => {
            this.quaterIWFour = res.quater === 'QUARTER 4' ? true : false;
            return res.quater === 'QUARTER 4';
          })[0] ?? new INITIAL_WELL_COMPLETION_JOB1();
        if (this.quaterIWFourData) {
          this.quaterIWFourData.actual_Completion_Date = this.genk.formDate(
            this.quaterIWFourData.actual_Completion_Date
          );
          this.quaterIWFourData.proposed_Completion_Date = this.genk.formDate(
            this.quaterIWFourData.proposed_Completion_Date
          );
        }
        this.quaterIWFour = this.quaterIWFourData.omL_Name ? true : false;
        this.initialBody = this.quaterIWOneData;
        this.cd.markForCheck();
      });
  }

  submit() {
    this.cd.markForCheck();
    this.initialBody.id = 0;
    this.initialBody.qUATER = 'QUARTER ' + this.currentIWQuater;
    this.initialBody.budeget_Allocation_NGN =
      this.initialBody.budeget_Allocation_NGN.replace(/,/g, '');
    this.initialBody.budeget_Allocation_USD =
      this.initialBody.budeget_Allocation_USD.replace(/,/g, '');
    let sail: INITIAL_WELL_COMPLETION_JOB1 = {} as INITIAL_WELL_COMPLETION_JOB1;
    sail = this.genk.stringArray(
      this.initialBody
    ) as INITIAL_WELL_COMPLETION_JOB1;
    this.workprogram
      .saveInitialWellCompletion(sail, this.genk.wpYear, this.genk.OmlName)
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.popText, 'success');
      });
  }
}
