import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';
import { INITIAL_WELL_COMPLETION_JOB1 } from 'src/app/models/step2-initial';
import { GenericService, IConcession, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './initial-well-completion.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPInitialWellCompletionComponent implements OnInit {
  public SBUTABLE = SBUTABLE;

  InitialForm: FormGroup;
  initialBody: INITIAL_WELL_COMPLETION_JOB1 =
    {} as INITIAL_WELL_COMPLETION_JOB1;
  _initialBody: INITIAL_WELL_COMPLETION_JOB1[] =
    {} as INITIAL_WELL_COMPLETION_JOB1[];
  // quaterIWOneData: INITIAL_WELL_COMPLETION_JOB1;
  _quaterIWOneData: INITIAL_WELL_COMPLETION_JOB1[] = [];

  quaterIWTwoData: INITIAL_WELL_COMPLETION_JOB1[] = [];
  quaterIWThreeData: INITIAL_WELL_COMPLETION_JOB1[] = [];
  quaterIWFourData: INITIAL_WELL_COMPLETION_JOB1[] = [];
  show = false;
  quaterIWOne = false;
  quaterIWTwo = false;
  quaterIWThree = false;
  quaterIWFour = false;
  proposed_well_number: number = 0;
  currentIWQuater = 1;
  genk: GenericService;
  cdr: ChangeDetectorRef;

  wellCount: number = 0;
  iwList: any[];
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];

  public isInitialFormSubmitted = false;

  iwccolumn = [
    {
      columnDef: 'proposed_Initial_Name',
      header: 'INITIAL WELL COMPLETION NAME',
    },
    {
      columnDef: 'proposed_Completion_Days',
      header: 'DAYS FOR COMPLETION',
    },
    {
      columnDef: 'proposed_Completion_Date',
      header: 'COMPLETION DATE',
    },

    {
      columnDef: 'budeget_Allocation_NGN',
      header: 'BUDGET ALLOCATION (NGN)',
    },
    {
      columnDef: 'budeget_Allocation_USD',
      header: 'BUDGET ALLOCATION (USD)',
    },
    {
      columnDef: 'oil_or_gas_wells',
      header: 'WELL PURPOSE',
    },
    {
      columnDef: 'remarks',
      header: 'REMARKS',
    },
  ];

  constructor(
    private cd: ChangeDetectorRef,
    private gen: GenericService,
    private modalService: ModalService,
    private workprogram: WorkProgramService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      const rel = 'QUARTER ' + this.currentIWQuater;
      debugger;
      this.getInitialCompletion();
      this.cdr = cd;
    });
    debugger;
    this.ngOnInit();
    this.getInitialCompletion();
    this.cd.markForCheck();
    this.genk.sizePerPage = this.genk.sizeten;
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP2';
    this.InitialForm = new FormGroup(
      {
        proposed_well_number: new FormControl(this.proposed_well_number),
        // current_year_Actual_Number: new FormControl(
        //   this.initialBody.current_year_Actual_Number,
        //   [Validators.required]
        // ),
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
        proposed_Completion_Date: new FormControl(
          this.initialBody.proposed_Completion_Date,
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

    this.genk.Concession$.subscribe((con: IConcession) => {
      if (!con) {
        this.genk.disableForm = true;
        this.InitialForm.reset;
        this.cd.markForCheck();
        return;
      }

      this.genk.disableForm =
        this.genk.Fields?.length > 0
          ? !this.genk.Field.isEditable
          : !con.isEditable;
      this.cd.markForCheck();
    });

    this.getInitialCompletion();
    this.cd.markForCheck();
    // this.InitialForm.reset();
  }

  public get f() {
    return this.InitialForm.controls;
  }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.genk.disableForm ? true : null;
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
    this.show = true;

    if (quater === 1) {
      this.currentIWQuater = 1;
      btn.textContent = 'Add Initial Well For Quarter 1';
      // this.initialBody = this.quaterIWOneData;
      this._initialBody = this._quaterIWOneData;
      this.proposed_well_number = this._initialBody.length;
      this.quaterIWOne = this._quaterIWOneData[0].omL_Name ? true : false;
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 1");
    }
    if (quater === 2) {
      this.currentIWQuater = 2;
      btn.textContent = 'Add Initial Well For Quarter 2';
      this._initialBody = this.quaterIWTwoData;
      this.proposed_well_number = this._initialBody.length;
      this.quaterIWTwo = this.quaterIWTwoData[0].omL_Name ? true : false;
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 2");
    }
    if (quater === 3) {
      this.currentIWQuater = 3;
      this._initialBody = this.quaterIWThreeData;
      btn.textContent = 'Add Initial Well For Quarter 3';
      this.proposed_well_number = this._initialBody.length;
      this.quaterIWThree = this.quaterIWThreeData[0].omL_Name ? true : false;

      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 3");
    }
    if (quater === 4) {
      this.currentIWQuater = 4;
      this._initialBody = this.quaterIWFourData;
      btn.textContent = 'Add Initial Well For Quarter 4';
      this.proposed_well_number = this._initialBody.length;
      this.quaterIWFour = this.quaterIWFourData[0].omL_Name ? true : false;
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 4");
    }

    this.selectedPage = 1;
    this.assignDataRows();
    this.assignPageNum();
    this.cd.markForCheck();
  }

  public get pageIndex(): number {
    return (this.selectedPage - 1) * this.genk.sizePerPage;
  }

  assignPageNum() {
    this.pagenum = Math.ceil(
      this._quaterIWOneData.length / this.genk.sizePerPage
    );
  }

  assignDataRows() {
    this.arrayRows = this._quaterIWOneData.slice(
      this.pageIndex,
      this.pageIndex + this.genk.sizePerPage
    );
    this.cd.markForCheck();
  }

  getInitialCompletion() {
    debugger;
    this.workprogram
      .getInitialWellCompletion(
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        // this.quaterIWOneData =
        //   res.initialWellCompletion.filter((res) => {
        //     return res.quater === 'QUARTER 1';
        //   })[0] ?? new INITIAL_WELL_COMPLETION_JOB1();
        // if (this.quaterIWOneData) {
        //
        //   this.quaterIWOneData.actual_Completion_Date = this.genk.formDate(
        //     this.quaterIWOneData.actual_Completion_Date
        //   );
        //   this.quaterIWOneData.proposed_Completion_Date = this.genk.formDate(
        //     this.quaterIWOneData.proposed_Completion_Date
        //   );
        // }
        // this.quaterIWOne = this.quaterIWOneData.omL_Name ? true : false;

        this._quaterIWOneData =
          res.initialWellCompletion.filter((res) => {
            return res.quater === 'QUARTER 1';
          }) ?? ({} as INITIAL_WELL_COMPLETION_JOB1[]);

        if (this._quaterIWOneData) {
          for (let qIWOneData of this._quaterIWOneData) {
            if (qIWOneData) {
              qIWOneData.actual_Completion_Date = this.genk.formDate(
                qIWOneData.actual_Completion_Date
              );
              qIWOneData.proposed_Completion_Date = this.genk.formDate(
                qIWOneData.proposed_Completion_Date
              );
            }
          }

          this.quaterIWOne = this._quaterIWOneData[0]?.omL_Name ? true : false;
          // this._initialBody = this
          // ._quaterIWOneData as INITIAL_WELL_COMPLETION_JOB1[];
          // this.proposed_well_number = this._initialBody.length;
          // this.selectedPage = 1;
          // this.assignDataRows();
          // this.assignPageNum();
          this.cd.markForCheck();
        }

        this.quaterIWTwoData =
          res.initialWellCompletion.filter((res) => {
            this.quaterIWTwo = res.quater === 'QUARTER 2' ? true : false;
            return res.quater === 'QUARTER 2';
          }) ?? ({} as INITIAL_WELL_COMPLETION_JOB1[]);

        if (this.quaterIWTwoData) {
          for (let Q2data of this.quaterIWTwoData) {
            if (Q2data) {
              Q2data.actual_Completion_Date = this.genk.formDate(
                Q2data.actual_Completion_Date
              );
              Q2data.proposed_Completion_Date ==
                this.genk.formDate(Q2data.actual_Completion_Date);
            }
          }

          this.quaterIWTwo = this.quaterIWTwoData[0]?.omL_Name ? true : false;
          this.cd.markForCheck();
        }

        this.quaterIWThreeData =
          res.initialWellCompletion.filter((res) => {
            this.quaterIWThree = res.quater === 'QUARTER 3' ? true : false;
            return res.quater === 'QUARTER 3';
          }) ?? ({} as INITIAL_WELL_COMPLETION_JOB1[]);

        if (this.quaterIWThreeData) {
          for (let Q3data of this.quaterIWThreeData) {
            if (Q3data) {
              Q3data.actual_Completion_Date = this.genk.formDate(
                Q3data.actual_Completion_Date
              );
              Q3data.proposed_Completion_Date ==
                this.genk.formDate(Q3data.actual_Completion_Date);
            }
          }
          this.quaterIWThree = this.quaterIWThreeData[0]?.omL_Name
            ? true
            : false;
          this.cd.markForCheck();
        }

        this.quaterIWFourData =
          res.initialWellCompletion.filter((res) => {
            this.quaterIWFour = res.quater === 'QUARTER 4' ? true : false;
            return res.quater === 'QUARTER 4';
          }) ?? ({} as INITIAL_WELL_COMPLETION_JOB1[]);

        if (this.quaterIWFourData) {
          for (let Q4data of this.quaterIWFourData) {
            if (Q4data) {
              Q4data.actual_Completion_Date = this.genk.formDate(
                Q4data.actual_Completion_Date
              );
              Q4data.proposed_Completion_Date ==
                this.genk.formDate(Q4data.actual_Completion_Date);
            }
          }
          this.quaterIWFour = this.quaterIWFourData[0]?.omL_Name ? true : false;
          this.cd.markForCheck();
        }      
        this.getList(this.currentIWQuater);
        this.cd.markForCheck();
      });
  }

  submit() {
    console.log('tre...', this.InitialForm);
    this.isInitialFormSubmitted = true;
    if (this.InitialForm.invalid) return;

    this.cd.markForCheck();
    this.initialBody.id = 0;
    this.initialBody.proposed_well_number = this.proposed_well_number;
    this.initialBody.qUATER = 'QUARTER ' + this.currentIWQuater;
    this.initialBody.budeget_Allocation_NGN =
      this.initialBody.budeget_Allocation_NGN.replace(/,/g, '');
    this.initialBody.budeget_Allocation_USD =
      this.initialBody.budeget_Allocation_USD.replace(/,/g, '');

    let sail: INITIAL_WELL_COMPLETION_JOB1 = {} as INITIAL_WELL_COMPLETION_JOB1;
    sail = this.genk.stringArray(
      this.initialBody
    ) as INITIAL_WELL_COMPLETION_JOB1;

    // sail.proposed_well_number = this._quaterIWOneData.length;

    this.workprogram
      .saveInitialWellCompletion(
        sail,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.popText, 'success');
         this.initialBody ={} as INITIAL_WELL_COMPLETION_JOB1;
        this.InitialForm.reset();
        this.isInitialFormSubmitted = false;
        this.InitialForm.get('proposed_year_data').patchValue(
          this.proposed_well_number
        );
        this.InitialForm.updateValueAndValidity();
        //this.getInitialCompletion();
        this.ngOnInit();
        this.cd.markForCheck();
      });
  }

  updateFormValidity(form: FormGroup) {
    const _form = form;

    form.updateValueAndValidity({ onlySelf: true, emitEvent: false });

    for (const control in form.controls) {
      form.controls[control].updateValueAndValidity({
        onlySelf: true,
        emitEvent: false,
      });
    }
  }

  getList(quater: number) {
    debugger;
    if (quater === 1) {
      this._initialBody = this._quaterIWOneData;
      this.proposed_well_number = this._initialBody.length;
      this.quaterIWOne = this._quaterIWOneData[0].omL_Name ? true : false;
      //this.getGeophysical("QUARTER 1");
    }
    if (quater === 2) {
      this._initialBody = this.quaterIWTwoData;
      this.proposed_well_number = this._initialBody.length;
      this.quaterIWTwo = this.quaterIWTwoData[0].omL_Name ? true : false;
      //this.getGeophysical("QUARTER 2");
    }
    if (quater === 3) {
      this._initialBody = this.quaterIWThreeData;
      this.proposed_well_number = this._initialBody.length;
      this.quaterIWThree = this.quaterIWThreeData[0].omL_Name ? true : false;
      //this.getGeophysical("QUARTER 3");
    }
    if (quater === 4) {
      this._initialBody = this.quaterIWFourData;
      this.proposed_well_number = this._initialBody.length;
      this.quaterIWFour = this.quaterIWFourData[0].omL_Name ? true : false;
      //this.getGeophysical("QUARTER 4");
    }

    this.selectedPage = 1;
    this.assignDataRows();
    this.assignPageNum();
  
  }
}
