import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';
import { updateFormValidity } from 'src/app/helpers/updateFormValidity';
import {
  budgetProposal,
  CAPEX,
  OPEX,
} from 'src/app/models/step3-budget-proposal.model';
import {
  AuthenticationService,
  GenericService,
  IConcession,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './budget-proposal.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPBudgetProposalComponent implements OnInit {
  public SBUTABLE = SBUTABLE;

  public budgetProposalComponents: budgetProposal[] = [];

  public capexBody = {} as CAPEX;
  public opexBody = {} as OPEX;

  budgetProposalForm: FormGroup;
  capexForm: FormGroup;
  OpexForm: FormGroup;
  budgetProposalBody: budgetProposal = {} as budgetProposal;
  capexOpexBody: CAPEX = {} as CAPEX;

  public isbudgetProposalFormSubmitted = false;
  public isCapexFormSubmitted = false;
  public isOpexFormSubmitted = false;

  wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;
  columnHeader_2 = [];
  columnValue_2 = [];
  isTabVisible_2 = false;

  //#region table header definitions
  pcColHeaderDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'budget_for_other_Activities_Naira',
      header: 'Budget for other Activities(Naira)',
    },
    {
      columnDef: 'budget_for_other_Activities_Dollars',
      header: 'Budget for other Activities(Dollar)',
    },
    {
      columnDef:
        'budget_for_Direct_Exploration_and_Production_Activities_Naira',
      header: 'Budget for Direct Exploration and Production Activities(Naira)',
    },
    {
      columnDef:
        'budget_for_Direct_Exploration_and_Production_Activities_Dollars',
      header: 'Budget for Direct Exploration and Production Activities(Dollar)',
    },
  ];
  //#endregion
  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      this.getBudgetData();
    });
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP3';
    this.budgetProposalForm = new FormGroup({
      budget_for_Direct_Exploration_and_Production_Activities_Naira:
        new FormControl(
          this.budgetProposalBody.budget_for_Direct_Exploration_and_Production_Activities_Naira,
          Validators.required
        ),
      budget_for_Direct_Exploration_and_Production_Activities_Dollars:
        new FormControl(
          this.budgetProposalBody.budget_for_Direct_Exploration_and_Production_Activities_Dollars,
          Validators.required
        ),
      budget_for_other_Activities_Naira: new FormControl(
        this.budgetProposalBody.budget_for_other_Activities_Naira,
        Validators.required
      ),
      budget_for_other_Activities_Dollars: new FormControl(
        this.budgetProposalBody.budget_for_other_Activities_Dollars,
        Validators.required
      ),
      // total_Company_Expenditure_Dollars: new FormControl(
      //   this.budgetProposalBody.total_Company_Expenditure_Dollars,
      //   Validators.required
      // ),
    });

    // this.OpexForm = new FormGroup({
    //   variable_cost: new FormControl(
    //     this.opexBody.variable_cost,
    //     Validators.required
    //   ),
    //   fixed_cost: new FormControl(
    //     this.opexBody.fixed_cost,
    //     Validators.required
    //   ),
    //   overheads: new FormControl(this.opexBody.overheads, Validators.required),
    //   repairs_and_maintenance_cost: new FormControl(
    //     this.opexBody.repairs_and_maintenance_cost,
    //     Validators.required
    //   ),
    //   general_expenses: new FormControl(
    //     this.opexBody.general_expenses,
    //     Validators.required
    //   ),
    // });

    // this.capexForm = new FormGroup({
    //   acquisition: new FormControl(
    //     this.capexBody.acquisition,
    //     Validators.required
    //   ),
    //   processing: new FormControl(
    //     this.capexBody.processing,
    //     Validators.required
    //   ),
    //   reprocessing: new FormControl(
    //     this.capexBody.reprocessing,
    //     Validators.required
    //   ),
    //   exploratory_Well_Drilling: new FormControl(
    //     this.capexBody.exploratory_Well_Drilling,
    //     Validators.required
    //   ),
    //   appraisal_Well_Drilling: new FormControl(
    //     this.capexBody.appraisal_Well_Drilling,
    //     Validators.required
    //   ),
    //   development_Well_Drilling: new FormControl(
    //     this.capexBody.development_Well_Drilling,
    //     Validators.required
    //   ),
    //   workover_Operations: new FormControl(
    //     this.capexBody.workover_Operations,
    //     Validators.required
    //   ),
    //   completions: new FormControl(
    //     this.capexBody.completions,
    //     Validators.required
    //   ),

    //   flowlines: new FormControl(this.capexBody.flowlines, Validators.required),
    //   pipelines: new FormControl(this.capexBody.pipelines, Validators.required),
    //   generators: new FormControl(
    //     this.capexBody.generators,
    //     Validators.required
    //   ),
    //   turbines_Compressors: new FormControl(
    //     this.capexBody.turbines_Compressors,
    //     Validators.required
    //   ),

    //   buildings: new FormControl(this.capexBody.buildings, Validators.required),
    //   other_Equipment: new FormControl(
    //     this.capexBody.other_Equipment,
    //     Validators.required
    //   ),
    //   civil_Works: new FormControl(
    //     this.capexBody.civil_Works,
    //     Validators.required
    //   ),
    //   other_Costs: new FormControl(
    //     this.capexBody.other_Costs,
    //     Validators.required
    //   ),
    // });

    this.OpexForm = new FormGroup({
      item_Description: new FormControl(
        this.opexBody.item_Description,
        Validators.required
      ),
      naira: new FormControl(this.opexBody.naira, Validators.required),
      dollar: new FormControl(this.opexBody.dollar, Validators.required),
      dollar_equivalent: new FormControl(
        this.opexBody.dollar_equivalent,
        Validators.required
      ),
      remarks: new FormControl(this.opexBody.remarks, Validators.required),
    });

    this.capexForm = new FormGroup({
      item_Description: new FormControl(
        this.capexBody.item_Description,
        Validators.required
      ),
      naira: new FormControl(this.capexBody.naira, Validators.required),
      dollar: new FormControl(this.capexBody.dollar, Validators.required),
      dollar_equivalent: new FormControl(
        this.capexBody.dollar_equivalent,
        Validators.required
      ),
      remarks: new FormControl(this.capexBody.remarks, Validators.required),
    });

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

    this.getBudgetData();
    this.getCapexItems();
    this.getOpexItems();
  }

  public get bp() {
    return this.budgetProposalForm.controls;
  }

  public get c() {
    return this.capexForm.controls;
  }

  public get o() {
    return this.OpexForm.controls;
  }

  getBudgetData() {
    this.workprogram
      .getFormThreeBudget_2(
        this.genk.OmlName,
        this.genk.wpYear,
        this.genk.fieldName
      )
      //this.workprogram.getFormThreeBudget_2(this.genk.wpYear)
      .subscribe((res) => {
        console.log('ress....', res);

        let budgetInfo = this.budgetProposalBody as budgetProposal;
        let capexInfo = this.capexOpexBody as CAPEX;
        let capexBody = this.capexBody;
        let opexBody = this.opexBody;

        if (
          res.budgetProposalComponents != null &&
          res.budgetProposalComponents.length > 0
        ) {
          this.budgetProposalComponents = res.budgetProposalComponents;
          budgetInfo = res.budgetProposalComponents[0] as budgetProposal;
          this.genk.isStep3 = true;
        } else {
          this.budgetProposalComponents = [];
          budgetInfo = new budgetProposal();
        }

        if (res.budgetCapexOpex != null && res.budgetCapexOpex.length > 0) {
          capexInfo = res.budgetCapexOpex[0] as CAPEX;
          this.genk.isStep3 = true;
        }

        if (res.budgetCapex != null && res.budgetCapex.length > 0) {
          capexBody = res.budgetCapex[0] as CAPEX;
          this.genk.isStep3 = true;
        }

        if (res.budgetOpex != null && res.budgetOpex.length > 0) {
          opexBody = res.budgetOpex[0] as CAPEX;
          this.genk.isStep3 = true;
        }

        this.budgetProposalBody = budgetInfo;
        this.capexOpexBody = capexInfo;
        this.capexBody = capexBody;
        this.opexBody = opexBody;
        this.cd.markForCheck();
      });
  }

  getCapexItems() {
    this.modalService.logCover('loading', true);
    this.workprogram
      .get_Capex(this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe({
        next: (res) => {
          if (res.budgetCapex && res.budgetCapex.length > 0) {
            this.capexBody = res.budgetCapex[0];
          }
          this.modalService.togCover();
        },
        error: (error) => {
          this.modalService.togCover();
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  getOpexItems() {
    this.modalService.logCover('loading', true);
    this.workprogram
      .get_Opex(this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe({
        next: (res) => {
          if (res.budgetOpex && res.budgetOpex.length > 0) {
            this.opexBody = res.budgetOpex[0];
          }
          this.modalService.togCover();
        },
        error: (error) => {
          this.modalService.togCover();
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.genk.disableForm ? true : null;
  }

  Delete_Budget(row) {
    let info = this.budgetProposalBody as budgetProposal;

    this.workprogram
      .post_BudgetProposal(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.getBudgetData();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  // Delete_Opex(event) {
  //   let info = this.capexOpexBody as capexOpex;

  //   this.workprogram
  //     .post_Opex(
  //       info,
  //       this.genk.wpYear,
  //       this.genk.OmlName,
  //       this.genk.fieldName,
  //       event.target.value,
  //       'DELETE'
  //     )
  //     .subscribe((res) => {
  //       if (res.statusCode == 300) {
  //         this.modalService.logNotice('Error', res.message, 'error');
  //       } else {
  //         this.modalService.logNotice('Success', res.message, 'success');
  //       }
  //     });
  // }

  filter(data) {
    const resultArray = Object.keys(data).map((index) => {
      let person = data[index];
      return person;
    });
    resultArray.forEach((element) => {
      delete element['companY_ID'];
      delete element['companyNumber'];
      delete element['companyName'];
      delete element['companyemail'];
      delete element['consession_Type'];
      delete element['contract_Type'];
      delete element['created_by'];
      delete element['date_Updated'];
      delete element['omL_ID'];
      delete element['omL_Name'];
      delete element['terrain'];
      delete element['updated_by'];
      delete element['year_of_WP'];
    });
    return resultArray;
  }
  saveBudgetProposal() {
    console.log(this.budgetProposalForm);

    this.isbudgetProposalFormSubmitted = true;
    if (this.budgetProposalForm.invalid) return;

    let budgetInfo = {} as budgetProposal;
    this.budgetProposalBody.id = 0;
    this.budgetProposalBody.year_of_WP = this.genk.wpYear;
    this.budgetProposalBody.omL_Name = this.genk.OmlName;

    for (let item in this.budgetProposalBody) {
      if (
        item != 'id' &&
        item != 'field_ID' &&
        item.toLocaleLowerCase() != 'date_created'
      ) {
        budgetInfo[this.genk.upperText(item)] =
          this.budgetProposalBody[item]?.toString() ?? '';
      }
    }
    budgetInfo.companyNumber = 0;

    this.workprogram
      .post_BudgetProposal(
        budgetInfo,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  saveOpex() {
    console.log(this.OpexForm);
    this.isOpexFormSubmitted = true;
    if (this.OpexForm.invalid) return;

    let budgetInfo = {} as OPEX;
    //this.opexBody.companyNumber = 0;
    this.opexBody.id = 0;
    this.opexBody.year_of_WP = this.genk.wpYear;
    //this.opexBody.omL_Name= this.genk.OmlName;
    for (let item in this.opexBody) {
      if (item != 'id' && item != 'field_ID') {
        budgetInfo[item] = this.opexBody[item]?.toString() ?? '';
      }
    }
    budgetInfo.companyNumber = 0;

    this.workprogram
      .post_Opex(
        budgetInfo,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.isOpexFormSubmitted = false;
          this.opexBody = {} as OPEX;
          this.OpexForm = updateFormValidity(this.OpexForm);
          this.getOpexItems();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  saveCapex() {
    console.log(this.capexForm);
    this.isCapexFormSubmitted = true;
    if (this.capexForm.invalid) return;

    let budgetInfo = {} as CAPEX;
    //this.capexOpexBody.companyNumber = 0;
    this.capexBody.id = 0;
    this.capexBody.year_of_WP = this.genk.wpYear;
    //this.capexOpexBody.omL_Name= this.genk.OmlName;
    for (let item in this.capexBody) {
      if (item != 'id' && item != 'field_ID') {
        budgetInfo[item] = this.capexBody[item]?.toString() ?? '';
      }
    }
    budgetInfo.companyNumber = 0;

    this.workprogram
      .post_Capex(
        budgetInfo,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.isCapexFormSubmitted = false;
          this.capexBody = {} as CAPEX;
          this.capexForm = updateFormValidity(this.capexForm);
          this.getCapexItems();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }
}
