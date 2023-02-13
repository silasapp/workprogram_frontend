import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';
import {
  budgetProposal,
  CAPEX,
  capexOpex,
  OPEX,
} from 'src/app/models/step3-budget-proposal.model';
import { BudgetCapexOpexComponent } from 'src/app/reports/budget-capex-opex.component';
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
  public budgetCapexOpexComponents: capexOpex[] = [];

  // public capexBody = {} as CAPEX;
  // public opexBody = {} as OPEX;


  capexBody: capexOpex = {} as capexOpex;
  opexBody: capexOpex = {} as capexOpex;
  capexBdy: capexOpex = {} as capexOpex;
  opexBdy: capexOpex = {} as capexOpex;


  budgetProposalForm: FormGroup;
  capexForm: FormGroup;
  OpexForm: FormGroup;
  budgetProposalBody: budgetProposal = {} as budgetProposal;
  capexOpexBody: capexOpex = {} as capexOpex;
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



  coColHeaderDef = [
    {
      columnDef: 'item_Type',
      header: 'Item Type',
    },
    {
      columnDef: 'item_Description',
      header: 'Description',
    },
    {
      columnDef: 'naira',
      header: 'Naira (NGN)',
    },
    {
      columnDef:
        'dollar',
      header: 'Dollars (USD)',
    },
    {
      columnDef:
        'dollar_equivalent',
      header: '(USD) EQUIVALENT (OFF. EXG RATE)',
    },
    {
      columnDef:
        'remarks',
      header: 'Remark',
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
      total_Company_Expenditure_Dollars: new FormControl(
        this.budgetProposalBody.total_Company_Expenditure_Dollars,
        Validators.required
      ),
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


    this.capexForm = new FormGroup({
      item_Description: new FormControl(
        this.capexBdy.item_Description,
        Validators.required
      ),
      naira: new FormControl(
        this.capexBdy.naira,
        Validators.required
      ),
      dollar: new FormControl(
        this.capexBdy.dollar,
        Validators.required
      ),
      dollar_equivalent: new FormControl(
        this.capexBdy.dollar_equivalent,
        Validators.required
      ),
      pex_Type: new FormControl(
        this.capexBdy.item_Type,
        Validators.required
      ),
      remarks: new FormControl(
        this.capexBdy.remarks,
        Validators.required
      ),

    });


    this.OpexForm = new FormGroup({
      item_Description: new FormControl(
        this.opexBdy.item_Description,
        Validators.required
      ),
      naira: new FormControl(
        this.opexBdy.naira,
        Validators.required
      ),
      dollar: new FormControl(
        this.opexBdy.dollar,
        Validators.required
      ),
      dollar_equivalent: new FormControl(
        this.opexBdy.dollar_equivalent,
        Validators.required
      ),
      remarks: new FormControl(
        this.opexBdy.remarks,
        Validators.required
      ),

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
    //this.getCapexItems();
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
        let capexInfo = this.capexOpexBody as capexOpex;

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
          //capexInfo = res.budgetCapexOpex[0] as capexOpex;
          this.budgetCapexOpexComponents = res.budgetCapexOpex as capexOpex[];
          this.genk.isStep3 = true;
        }

        this.budgetProposalBody = budgetInfo;
        this.capexOpexBody = {} as capexOpex;
        this.cd.markForCheck();
      });
  }

  // getCapexItems() {
  //

  //   this.modalService.logCover('loading', true);
  //   this.workprogram
  //     .get_Capex(this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
  //     .subscribe({
  //       next: (res) => {
  //         if (res.budgetCapex) {
  //           this.capexBody = res.budgetCapex[0];
  //         }
  //         this.modalService.togCover();
  //       },
  //       error: (error) => {
  //         this.modalService.togCover();
  //         this.modalService.logNotice('Error', error.message, 'error');
  //       },
  //     });
  // }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.genk.disableForm ? true : null;
  }

  Delete_Budget(id) {
    let info = this.budgetProposalBody as budgetProposal;

    this.workprogram
      .post_BudgetProposal(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          //this.getBudgetData();
          this.ngOnInit();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_Opex(id) {

   let info = this.capexOpexBody as capexOpex

    this.workprogram
      .post_Opex(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        id,
        'DELETE'
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.modalService.logNotice('Success', res.message, 'success');
          this.ngOnInit();
        }
      });
  }

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

    let budgetInfo = {} as budgetProposal;
    this.genk.removeCommaBody(this.budgetProposalBody);
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
          this.ngOnInit();
        }
      });
  }

  saveOpex() {

    let budgetInfo = {} as capexOpex;
    this.genk.removeCommaBody(this.capexOpexBody);
    //this.opexBody.companyNumber = 0;
    if (this.opexBdy.item_Description != undefined && this.opexBdy.item_Description != null && this.opexBdy.item_Description != "") {
      this.capexOpexBody = this.opexBdy;

      this.opexBdy = {} as capexOpex;
      this.capexOpexBody.item_Type = "Opex";

    }
    else if (this.capexBdy.item_Description != undefined && this.capexBdy.item_Description != null && this.capexBdy.item_Description != "") {

      this.capexOpexBody = this.capexBdy;
      this.capexBdy = {} as capexOpex;
      this.capexOpexBody.item_Type = "Capex";
    }
    else { return; }
    this.capexOpexBody.id = 0;
    this.capexOpexBody.year_of_WP = this.genk.wpYear;

    this.capexOpexBody.omL_Name = this.genk.OmlName;
    for (let item in this.capexOpexBody) {
      if (item != 'id' && item != 'field_ID') {
        budgetInfo[item] = this.capexOpexBody[item]?.toString() ?? '';
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
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.modalService.logNotice('Success', res.message, 'success');

          this.capexOpexBody = {} as capexOpex;
          this.capexForm.reset();
          this.OpexForm.reset();
          this.ngOnInit();
        }
      });
  }

  //   saveCapex() {
  //     let budgetInfo = {} as capexOpex;
  //     //this.capexOpexBody.companyNumber = 0;
  //     this.capexBody.id = 0;
  //     this.capexBody.year_of_WP = this.genk.wpYear;
  //     //this.capexOpexBody.omL_Name= this.genk.OmlName;
  //     for (let item in this.capexBody) {
  //       if (item != 'id' && item != 'field_ID') {
  //         budgetInfo[item] = this.capexBody[item]?.toString() ?? '';
  //       }
  //     }
  //     budgetInfo.companyNumber = 0;

  //     this.workprogram
  //       .post_Capex(
  //         budgetInfo,
  //         this.genk.wpYear,
  //         this.genk.OmlName,
  //         this.genk.fieldName,
  //         '',
  //         ''
  //       )
  //       .subscribe({
  //         next: (res) => {
  //           this.getCapexItems();
  //           this.modalService.logNotice('Success', res.message, 'success');
  //         },
  //         error: (error) => {
  //           this.modalService.logNotice('Error', error.message, 'error');
  //         },
  //       });
  //   }
}
