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

  public capexBody = {} as CAPEX;
  public opexBody = {} as OPEX;

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

  getBudgetData() {
    this.workprogram
      .getFormThreeBudget_2(
        this.genk.OmlName,
        this.genk.wpYear,
        this.genk.fieldName
      )
      //this.workprogram.getFormThreeBudget_2(this.genk.wpYear)
      .subscribe((res) => {
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
          capexInfo = res.budgetCapexOpex[0] as capexOpex;
          this.genk.isStep3 = true;
        }

        this.budgetProposalBody = budgetInfo;
        this.capexOpexBody = capexInfo;
        this.cd.markForCheck();
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
    this.OpexForm = new FormGroup({
      item_Description: new FormControl(
        this.capexOpexBody.item_Description,
        Validators.required
      ),
      naira: new FormControl(this.capexOpexBody.naira, Validators.required),
      dollar: new FormControl(this.capexOpexBody.dollar, Validators.required),
      dollar_equivalent: new FormControl(
        this.capexOpexBody.dollar_equivalent,
        Validators.required
      ),
      remarks: new FormControl(this.capexOpexBody.remarks, Validators.required),
    });
    this.capexForm = new FormGroup({
      item_Description: new FormControl(
        this.capexOpexBody.item_Description,
        Validators.required
      ),
      naira: new FormControl(this.capexOpexBody.naira, Validators.required),
      dollar: new FormControl(this.capexOpexBody.dollar, Validators.required),
      dollar_equivalent: new FormControl(
        this.capexOpexBody.dollar_equivalent,
        Validators.required
      ),
      remarks: new FormControl(this.capexOpexBody.remarks, Validators.required),
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

  Delete_Opex(event) {
    let info = this.capexOpexBody as capexOpex;

    this.workprogram
      .post_Opex(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        event.target.value,
        'DELETE'
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.modalService.logNotice('Success', res.message, 'success');
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
    let budgetInfo = {} as capexOpex;
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
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  saveCapex() {
    let budgetInfo = {} as capexOpex;
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
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }
}
