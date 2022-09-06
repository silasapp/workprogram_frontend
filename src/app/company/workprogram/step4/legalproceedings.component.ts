import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import { LEGAL_ARBITRATION, LEGAL_LITIGATION } from './step4-NCQ.model';

@Component({
  templateUrl: './legalproceedings.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SWPLegalProceedingsComponent implements OnInit {
letigationForm: FormGroup;
letigationBody: LEGAL_LITIGATION = {} as LEGAL_LITIGATION;
arbitrationBody: LEGAL_LITIGATION = {} as LEGAL_LITIGATION;
arbitrationForm: FormGroup;

wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;
  legalarbitrationBody: LEGAL_ARBITRATION;



  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu
    .subscribe(res => {
      this.getLegalLegitation();
    });
  }

ngOnInit(): void {
  this.genk.activeStep = 'STEP4';
  this.letigationForm = new FormGroup(
    {
      anyLitigation: new FormControl(this.letigationBody.anyLitigation, [Validators.required]),
      case_Number: new FormControl(this.letigationBody.case_Number, [Validators.required]),
      names_of_Parties: new FormControl(this.letigationBody.names_of_Parties, [Validators.required]),
      name_of_Court: new FormControl(this.letigationBody.name_of_Court, [Validators.required]),
      summary_of_the_case: new FormControl(this.letigationBody.summary_of_the_case, [Validators.required]),
      any_orders_made_so_far_by_the_court: new FormControl(this.letigationBody.any_orders_made_so_far_by_the_court, [Validators.required]),
      potential_outcome: new FormControl(this.letigationBody.potential_outcome, [Validators.required]),
      jurisdiction: new FormControl(this.letigationBody.jurisdiction, [Validators.required]),
    },{});

    this.arbitrationForm = new FormGroup(
      {
        case_Number: new FormControl(this.arbitrationBody.case_Number, [Validators.required]),
        names_of_Parties: new FormControl(this.arbitrationBody.names_of_Parties, [Validators.required]),
        name_of_Court: new FormControl(this.arbitrationBody.name_of_Court, [Validators.required]),
        summary_of_the_case: new FormControl(this.arbitrationBody.summary_of_the_case, [Validators.required]),
        any_orders_made_so_far_by_the_court: new FormControl(this.arbitrationBody.any_orders_made_so_far_by_the_court, [Validators.required]),
        potential_outcome: new FormControl(this.arbitrationBody.potential_outcome, [Validators.required]),
        jurisdiction: new FormControl(this.arbitrationBody.jurisdiction, [Validators.required]),
        anyLitigation: new FormControl(this.arbitrationBody.anyLitigation, [Validators.required]),
      }, {});
      //this.concessionBody = this.genk.concessionData;
      //this.concessionHeldList = this.genk.OMLList;
    this.cd.markForCheck();
  }


      loadTable() {
        for (let item1 in this.letigationForm .controls) {
          if (item1 != 'comment') {
            this.columnHeader.push(this.genk.upperText(item1.replace(/_+/g, ' ')));
            this.columnValue.push(this.letigationBody[item1]);
          }
        }
        this.isTabVisible = true;
        this.cd.markForCheck();
      }

  getLegalLegitation() {
    this.workprogram.getlegalLitigation(this.genk.wpYear, this.genk.fieldName, this.genk.OmlName,).subscribe(result => {
      if (result.legalLitigation) {this.letigationBody = result.legalLitigation;}
      if (result.legalArbitration) {this.arbitrationBody = result.legalArbitration;}

      this.cd.markForCheck();
      let rel = "Hello";
    });
  }


    saveLitigation() {
      this.workprogram.saveLegalLitigation(this.letigationBody, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName).subscribe(result => {
        this.modalService.logNotice("Success", "Data saved successfully!", 'success');
      });
    }

    saveArbitration() {
      this.workprogram.saveArbitration(this.arbitrationBody, this.genk.wpYear, this.genk.OmlName).subscribe(result => {
        this.modalService.logNotice("Success", "Data saved successfully!", 'success');
      });
    }

  }



