import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';
import { updateFormValidity } from 'src/app/helpers/updateFormValidity';
import {
  AuthenticationService,
  GenericService,
  IConcession,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import {
  LEGAL_ARBITRATION,
  LEGAL_LITIGATION,
} from '../../../models/step4-NCQ.model';

@Component({
  templateUrl: './legalproceedings.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPLegalProceedingsComponent implements OnInit {
  public SBUTABLE = SBUTABLE;

  letigationForm: FormGroup;
  arbitrationForm: FormGroup;

  public isLetigationFormSubmitted = false;
  public isArbitrationFormSubmitted = false;

  letigationBody: LEGAL_LITIGATION = {} as LEGAL_LITIGATION;
  arbitrationBody: LEGAL_ARBITRATION = {} as LEGAL_ARBITRATION;

  wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  fiveYearsBehind = [];
  public fiveYearsBehind$ = new BehaviorSubject<number[]>([]);
  public fiveYearsAhead$ = new BehaviorSubject<number[]>([]);
  fiveYearsAhead = [];
  isTabVisible = false;
  legalarbitrationBody: LEGAL_ARBITRATION;
  litigations: LEGAL_LITIGATION[] = [];
  arbitrations: LEGAL_ARBITRATION[] = [];

  litigationColHeaderDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'anyLitigation',
      header: 'ANY LITIGATION',
    },
    {
      columnDef: 'case_Number',
      header: 'CASE NO.',
    },
    {
      columnDef: 'names_of_Parties',
      header: 'NAME OF PARTIES',
    },
    {
      columnDef: 'jurisdiction',
      header: 'JURISDICTION',
    },
    {
      columnDef: 'name_of_Court',
      header: 'NAME OF COURT',
    },
    {
      columnDef: 'summary_of_the_case',
      header: 'SUMMARY OF CASES',
    },
    {
      columnDef: 'any_orders_made_so_far_by_the_court',
      header: 'ANY ORDERS MADE',
    },
    {
      columnDef: 'potential_outcome',
      header: 'POTENTIAL OUTCOME',
    },
  ];

  arbitrationColHeaderDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'anyArbitration',
      header: 'ANY ARBITRATION',
    },
    {
      columnDef: 'case_Number',
      header: 'CASE NO.',
    },
    {
      columnDef: 'names_of_Parties',
      header: 'NAME OF PARTIES',
    },
    {
      columnDef: 'jurisdiction',
      header: 'JURISDICTION',
    },
    {
      columnDef: 'name_of_Court',
      header: 'NAME OF COURT',
    },
    {
      columnDef: 'summary_of_the_case',
      header: 'SUMMARY OF CASES',
    },
    {
      columnDef: 'any_orders_made_so_far_by_the_court',
      header: 'ANY ORDERS MADE',
    },
    {
      columnDef: 'potential_outcome',
      header: 'POTENTIAL OUTCOME',
    },
  ];

  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      this.getLegalLegitation();
    });

    this.getFiveYearsAhead();
    this.getFiveYearsBehind();
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP4';
    this.letigationForm = new FormGroup(
      {
        anyLitigation: new FormControl(this.letigationBody.anyLitigation, [
          Validators.required,
        ]),
        case_Number: new FormControl(this.letigationBody.case_Number, [
          Validators.required,
        ]),
        year: new FormControl(this.letigationBody.year, [Validators.required]),
        names_of_Parties: new FormControl(
          this.letigationBody.names_of_Parties,
          [Validators.required]
        ),
        // name_of_Court: new FormControl(this.letigationBody.name_of_Court, [
        //   Validators.required,
        // ]),
        summary_of_the_case: new FormControl(
          this.letigationBody.summary_of_the_case,
          [Validators.required]
        ),
        any_orders_made_so_far_by_the_court: new FormControl(
          this.letigationBody.any_orders_made_so_far_by_the_court,
          [Validators.required]
        ),
        potential_outcome: new FormControl(
          this.letigationBody.potential_outcome,
          [Validators.required]
        ),
        jurisdiction: new FormControl(this.letigationBody.jurisdiction, [
          Validators.required,
        ]),
      },
      {}
    );

    this.arbitrationForm = new FormGroup(
      {
        case_Number: new FormControl(this.arbitrationBody.case_Number, [
          Validators.required,
        ]),
        names_of_Parties: new FormControl(
          this.arbitrationBody.names_of_Parties,
          [Validators.required]
        ),
        // name_of_Court: new FormControl(this.arbitrationBody.name_of_Court, [
        //   Validators.required,
        // ]),
        summary_of_the_case: new FormControl(
          this.arbitrationBody.summary_of_the_case,
          [Validators.required]
        ),
        // any_orders_made_so_far_by_the_court: new FormControl(
        //   this.arbitrationBody.any_orders_made_so_far_by_the_court,
        //   [Validators.required]
        // ),
        potential_outcome: new FormControl(
          this.arbitrationBody.potential_outcome,
          [Validators.required]
        ),
        jurisdiction: new FormControl(this.arbitrationBody.jurisdiction, [
          Validators.required,
        ]),
        anyLitigation: new FormControl(this.arbitrationBody.anyArbitration, [
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

    //this.concessionBody = this.genk.concessionData;
    //this.concessionHeldList = this.genk.OMLList;

    this.getLegalLegitation();
    this.cd.markForCheck();
  }

  public get l() {
    return this.letigationForm.controls;
  }

  public get a() {
    return this.arbitrationForm.controls;
  }

  getFiveYearsAhead() {
    this.fiveYearsAhead = [];
    var num: number = 5;
    var i: number;
    for (i = 0; i < num; i++) {
      this.fiveYearsAhead[i] = this.genk.wkProposedYear + i;
      //this.fiveYearsValues.push(++this.genk.wkProposedYear);
    }

    this.fiveYearsBehind$.next(this.fiveYearsAhead);
  }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.genk.disableForm ? true : null;
  }

  getFiveYearsBehind() {
    this.fiveYearsBehind = [];
    var num: number = 5;
    var i: number;
    for (i = num; i >= 0; i--) {
      this.fiveYearsBehind[num - i] = this.genk.wkProposedYear - i;
      //this.fiveYearsValues.push(++this.genk.wkProposedYear);
    }

    this.fiveYearsBehind$.next(this.fiveYearsBehind);
  }

  loadTable() {
    for (let item1 in this.letigationForm.controls) {
      if (item1 != 'comment') {
        this.columnHeader.push(this.genk.upperText(item1.replace(/_+/g, ' ')));
        this.columnValue.push(this.letigationBody[item1]);
      }
    }
    this.isTabVisible = true;
    this.cd.markForCheck();
  }

  getLegalLegitation() {
    this.workprogram
      .getlegalLitigation(this.genk.wpYear)
      .subscribe((result) => {
        if (result.legalLitigation) {
          this.litigations = this.genk.addCommaBody(result.legalLitigation);
        }
        if (result.legalArbitration) {
          this.arbitrations = this.genk.addCommaBody(result.legalArbitration);
        }

        this.cd.markForCheck();
        let rel = 'Hello';
      });
  }

  saveLitigation() {
    console.log(this.letigationForm);
    this.isLetigationFormSubmitted = true;
    if (this.letigationForm.invalid) return;
    this.genk.removeCommaBody(this.letigationBody);

    this.workprogram
      .saveLegalLitigation(this.letigationBody, this.genk.wpYear)
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.isLetigationFormSubmitted = false;
          this.letigationBody = {} as LEGAL_LITIGATION;
          this.letigationForm = updateFormValidity(this.letigationForm);
          this.getLegalLegitation();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  saveArbitration() {
    console.log(this.arbitrationForm);
    this.isArbitrationFormSubmitted = true;
    if (this.arbitrationForm.invalid) return;
    this.genk.removeCommaBody(this.arbitrationBody);

    //this.arbitrationBody.anyArbitration = "YES";
    this.workprogram
      .saveArbitration(this.arbitrationBody, this.genk.wpYear)
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.isArbitrationFormSubmitted = false;
          this.arbitrationBody = {} as LEGAL_ARBITRATION;
          this.arbitrationForm = updateFormValidity(this.arbitrationForm);
          this.getLegalLegitation();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  deleteLitigation(row: any) {
    this.workprogram
      .deleteLitigation(row, this.genk.wpYear)
      .subscribe((result) => {
        this.modalService.logNotice(
          'Deletion was successful!',
          'Successfully!',
          'success'
        );
        this.getLegalLegitation();
      });
  }

  deleteArbitration(row: any) {
    this.workprogram
      .deleteArbitration(row, this.genk.wpYear)
      .subscribe((result) => {
        this.modalService.logNotice(
          'Deletion was successful!',
          'Successfully!',
          'success'
        );

        this.getLegalLegitation();
      });
  }

  Submit_WorkProgram() {
    let y = this.genk.wpYear;
    let o = this.genk.OmlName;
    let f = this.genk.fieldName;

    this.modalService.logCover('Submitting Form...', true);
    this.workprogram
      .post_WorkProgram(
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe({
        next: (res) => {
          this.modalService.togCover();
          this.modalService.logNotice('Success', res.message, 'success');

          this.getLegalLegitation();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }
}
