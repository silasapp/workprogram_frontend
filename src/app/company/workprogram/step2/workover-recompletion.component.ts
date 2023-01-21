import { ValueAxis } from '@amcharts/amcharts5/xy';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WORKOVERS_RECOMPLETION_JOB1 } from 'src/app/models/step2-initial';
import { GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './workover-recompletion.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPWorkoverRecompletionComponent implements OnInit {
  WorkoverForm: FormGroup;
  workoverBody: WORKOVERS_RECOMPLETION_JOB1 = {} as WORKOVERS_RECOMPLETION_JOB1;
  genk: GenericService;

  quaterIWOneData: WORKOVERS_RECOMPLETION_JOB1;
  quaterIWTwoData: WORKOVERS_RECOMPLETION_JOB1;
  quaterIWThreeData: WORKOVERS_RECOMPLETION_JOB1;
  quaterIWFourData: WORKOVERS_RECOMPLETION_JOB1;

  quaterIWOne = false;
  quaterIWTwo = false;
  quaterIWThree = false;
  quaterIWFour = false;

  currentIWQuater = 1;

  constructor(
    private cd: ChangeDetectorRef,
    private gen: GenericService,
    private modalService: ModalService,
    private workprogram: WorkProgramService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {});
    this.cd.markForCheck();
  }

  ngOnInit() {
    this.genk.activeStep = 'STEP2';
    this.WorkoverForm = new FormGroup(
      {
        current_year_Actual_Number_data: new FormControl(
          this.workoverBody.current_year_Actual_Number_data,
          [Validators.required]
        ),
        proposed_year_data: new FormControl(
          this.workoverBody.proposed_year_data,
          [Validators.required]
        ),
        budeget_Allocation_NGN: new FormControl(
          this.workoverBody.budeget_Allocation_NGN,
          [Validators.required]
        ),
        budeget_Allocation_USD: new FormControl(
          this.workoverBody.budeget_Allocation_USD,
          [Validators.required]
        ),
        oil_or_gas_wells: new FormControl(this.workoverBody.oil_or_gas_wells, [
          Validators.required,
        ]),
        do_you_have_approval_for_the_workover_recompletion: new FormControl(
          this.workoverBody.do_you_have_approval_for_the_workover_recompletion,
          [Validators.required]
        ),
        remarks: new FormControl(this.workoverBody.remarks, [
          Validators.required,
        ]),
        daysForCompletion: new FormControl(
          this.workoverBody.daysForCompletion,
          [Validators.required]
        ),
        completionWellName: new FormControl(
          this.workoverBody.completionWellName,
          [Validators.required]
        ),
        proposed_workover_Date: new FormControl(
          this.workoverBody.proposed_workover_Date,
          [Validators.required]
        ),
      },
      {}
    );
    this.getWorkover();
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
      this.workoverBody = this.quaterIWOneData;
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 1");
    }
    if (quater === 2) {
      this.currentIWQuater = 2;
      btn.textContent = 'Save Quarter 2';
      this.workoverBody = this.quaterIWTwoData;
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 2");
    }
    if (quater === 3) {
      this.currentIWQuater = 3;
      this.workoverBody = this.quaterIWThreeData;
      btn.textContent = 'Save Quarter 3';
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 3");
    }
    if (quater === 4) {
      this.currentIWQuater = 4;
      this.workoverBody = this.quaterIWFourData;
      btn.textContent = 'Save Quarter 4';
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 4");
    }
    this.cd.markForCheck();
  }

  getWorkover() {
    this.workprogram
      .getWorkover(this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe((res) => {
        if (!res.workoverRecompletion) {
          this.quaterIWOneData = {
            oil_or_gas_wells: 'GAS WELL',
          } as WORKOVERS_RECOMPLETION_JOB1;
          this.quaterIWTwoData = {
            oil_or_gas_wells: 'GAS WELL',
          } as WORKOVERS_RECOMPLETION_JOB1;
          this.quaterIWThreeData = {
            oil_or_gas_wells: 'GAS WELL',
          } as WORKOVERS_RECOMPLETION_JOB1;
          this.quaterIWFourData = {
            oil_or_gas_wells: 'GAS WELL',
          } as WORKOVERS_RECOMPLETION_JOB1;
          this.workoverBody = this.quaterIWOneData;
          this.genk.fieldWell = 'GAS WELL';
          this.cd.markForCheck();
          return;
        }

        if (res.workoverRecompletion.length > 0) {
          this.genk.isStep2 = true;
          this.cd.markForCheck();
        }

        this.quaterIWOneData =
          res.workoverRecompletion.filter((res) => {
            return res.quater === 'QUARTER 1';
          })[0] ?? new WORKOVERS_RECOMPLETION_JOB1();
        this.quaterIWOne = this.quaterIWOneData.omL_Name ? true : false;

        this.quaterIWTwoData =
          res.workoverRecompletion.filter((res) => {
            this.quaterIWTwo = res.quater === 'QUARTER 2' ? true : false;
            return res.quater === 'QUARTER 2';
          })[0] ?? new WORKOVERS_RECOMPLETION_JOB1();
        this.quaterIWTwo = this.quaterIWTwoData.omL_Name ? true : false;

        this.quaterIWThreeData =
          res.workoverRecompletion.filter((res) => {
            this.quaterIWThree = res.quater === 'QUARTER 3' ? true : false;
            return res.quater === 'QUARTER 3';
          })[0] ?? new WORKOVERS_RECOMPLETION_JOB1();
        this.quaterIWThree = this.quaterIWThreeData.omL_Name ? true : false;

        this.quaterIWFourData =
          res.workoverRecompletion.filter((res) => {
            this.quaterIWFour = res.quater === 'QUARTER 4' ? true : false;
            return res.quater === 'QUARTER 4';
          })[0] ?? new WORKOVERS_RECOMPLETION_JOB1();
        this.quaterIWFour = this.quaterIWFourData.omL_Name ? true : false;
        this.workoverBody = this.quaterIWOneData;
        this.cd.markForCheck();
      });
  }

  submit() {
    this.cd.markForCheck();
    this.workoverBody.id = 0;
    this.workoverBody.qUATER = 'QUARTER ' + this.currentIWQuater;
    this.workoverBody.budeget_Allocation_NGN =
      this.workoverBody.budeget_Allocation_NGN.replace(/,/g, '');
    this.workoverBody.budeget_Allocation_USD =
      this.workoverBody.budeget_Allocation_USD.replace(/,/g, '');
    let sail: WORKOVERS_RECOMPLETION_JOB1 = {} as WORKOVERS_RECOMPLETION_JOB1;
    sail = this.genk.stringArray(
      this.workoverBody
    ) as WORKOVERS_RECOMPLETION_JOB1;
    this.workprogram
      .saveWorkover(
        sail,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.popText, 'success');
      });
  }

  getFieldWell(event) {
    this.genk.fieldWell = event.target.value;
    this.cd.markForCheck();
  }
}
