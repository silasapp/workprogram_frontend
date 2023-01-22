import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  budgetProposal,
  capexOpex,
} from 'src/app/models/step3-budget-proposal.model';
import { BudgetCapexOpexComponent } from 'src/app/reports/budget-capex-opex.component';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './budget-proposal.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPBudgetProposalComponent implements OnInit {
  budgetProposalForm: FormGroup;
  capexOpexForm: FormGroup;
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
    this.workprogram.getFormThreeBudget_2(this.genk.OmlName, this.genk.wpYear, this.genk.fieldName)
    //this.workprogram.getFormThreeBudget_2(this.genk.wpYear)
    .subscribe(res => {
      let budgetInfo = this.budgetProposalBody as budgetProposal;
      let capexInfo = this.capexOpexBody as capexOpex;

      if (
        res.budgetProposalComponents != null &&
        res.budgetProposalComponents.length > 0
      ) {
        budgetInfo = res.budgetProposalComponents[0] as budgetProposal;
        this.loadTable_Budget(res.budgetProposalComponents);
        this.genk.isStep3 = true;
      }
      if (res.budgetCapexOpex != null && res.budgetCapexOpex.length > 0) {
        capexInfo = res.budgetCapexOpex[0] as capexOpex;
        this.loadTable_Opex(res.budgetCapexOpex);
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
    this.capexOpexForm = new FormGroup({
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

    this.getBudgetData();
  }

  loadTable_Budget(data) {
    this.columnHeader = [];
    this.columnValue = [];

    if (data != null) {
      data = this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.columnHeader.push(data[0]);
      this.columnValue.push(result);
    } else {
      for (let item1 in this.budgetProposalForm.controls) {
        if (item1 != 'comment') {
          this.columnHeader.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.columnValue.push(this.budgetProposalBody[item1]);
        }
      }
    }
    this.isTabVisible = true;
    this.cd.markForCheck();
  }

  Delete_Budget(event) {
    let info = this.budgetProposalBody as budgetProposal;

    this.workprogram
    .post_BudgetProposal(info, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName, event.target.value, "DELETE")
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Budget(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  loadTable_Opex(data) {
    this.columnHeader_2 = [];
    this.columnValue_2 = [];

    if (data != null) {
      data = this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.columnHeader_2.push(data[0]);
      this.columnValue_2.push(result);
    } else {
      for (let item1 in this.capexOpexForm.controls) {
        if (item1 != 'comment') {
          this.columnHeader_2.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.columnValue_2.push(this.capexOpexBody[item1]);
        }
      }
    }
    this.isTabVisible_2 = true;
    this.cd.markForCheck();
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
          this.loadTable_Budget(res.data);
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

    this.workprogram.post_BudgetProposal(budgetInfo, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName, '','')
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Budget(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  saveOpex() {
    let budgetInfo = {} as capexOpex;
    //this.capexOpexBody.companyNumber = 0;
    this.capexOpexBody.id = 0;
    this.capexOpexBody.year_of_WP = this.genk.wpYear;
    //this.capexOpexBody.omL_Name= this.genk.OmlName;
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
          this.loadTable_Opex(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }
}
