import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  CONCESSION_SITUATION,
  EquityDistribution,
} from '../../../models/step1-concession.model';
import { Royalty } from '../../../models/step1-royalty.model';

@Component({
  templateUrl: './concession-situation.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPConcessionSituationComponent implements OnInit {
  public SBUTABLE = SBUTABLE;

  ConcessionSituationForm: FormGroup;
  RoyaltyForm: FormGroup;
  EquityForm: FormGroup;

  public isConcessionSituationFormSubmitted = false;
  public isRoyaltyFormSubmitted = false;
  public isEquityFormSubmitted = false;

  concessionBody: CONCESSION_SITUATION = {} as CONCESSION_SITUATION;
  equityBody: EquityDistribution = {} as EquityDistribution;
  royaltyBody: Royalty = {} as Royalty;
  wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  csfSubmitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;
  fieldValue: string;
  field: string;
  boolValue = true;
  public boolValue$ = new BehaviorSubject<boolean>(true);
  isAddEquity = false;
  equitySubmitted = false;

  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      this.getConcessionHeld();
      this.getRoyaltyHeld();
      this.getBoolValue();
      cd.markForCheck();
    });
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP1';
    this.ConcessionSituationForm = new FormGroup(
      {
        // year: new FormControl(this.concessionBody.year, [Validators.required]),
        // concession_Held: new FormControl(this.concessionBody.concession_Held, [
        //   Validators.required,
        // ]),
        companyName: new FormControl(this.concessionBody.companyName, [
          Validators.required,
        ]),
        area: new FormControl(this.concessionBody.area, [Validators.required]),
        contract_Type: new FormControl(this.concessionBody.contract_Type, [
          Validators.required,
        ]),
        // geological_location: new FormControl(
        //   this.concessionBody.geological_location,
        //   [Validators.required]
        // ),
        geological_location: new FormControl(
          this.concessionBody.geological_location,
          [Validators.required]
        ),
        equity_distribution: new FormControl(
          this.concessionBody.equity_distribution,
          [Validators.required]
        ),
        // no_of_field_producing: new FormControl(
        //   this.concessionBody.no_of_field_producing,
        //   [Validators.required]
        // ),
        // date_of_Grant_Expiration: new FormControl(
        //   this.concessionBody.date_of_Grant_Expiration,
        //   [Validators.required]
        // ),
        // date_of_Expiration: new FormControl(
        //   this.concessionBody.date_of_Expiration,
        //   [Validators.required]
        // ),
        has_Signature_Bonus_been_paid: new FormControl(
          this.concessionBody.has_Signature_Bonus_been_paid,
          [Validators.required]
        ),
        has_the_Concession_Rentals_been_paid: new FormControl(
          this.concessionBody.has_the_Concession_Rentals_been_paid,
          [Validators.required]
        ),
        is_there_an_application_for_renewal: new FormControl(
          this.concessionBody.is_there_an_application_for_renewal,
          [Validators.required]
        ),
        how_Much_Signature_Bonus_have_been_paid_USD: new FormControl(
          this.concessionBody.how_Much_Signature_Bonus_have_been_paid_USD,
          [Validators.required]
        ),
        how_Much_Concession_Rental_have_been_paid_USD: new FormControl(
          this.concessionBody.how_Much_Concession_Rental_have_been_paid_USD,
          [Validators.required]
        ),
        how_Much_Renewal_Bonus_have_been_paid_USD: new FormControl(
          this.concessionBody.how_Much_Renewal_Bonus_have_been_paid_USD,
          [Validators.required]
        ),
        if_No_why_sig: new FormControl(this.concessionBody.if_No_why_sig, [
          Validators.required,
        ]),
        if_No_why_concession: new FormControl(
          this.concessionBody.if_No_why_concession,
          [Validators.required]
        ),
        if_No_why_renewal: new FormControl(
          this.concessionBody.if_No_why_renewal,
          [Validators.required]
        ),
        no_of_discovered_field: new FormControl(
          this.concessionBody.no_of_discovered_field,
          [Validators.required]
        ),
        // has_Assignment_of_Interest_Fee_been_paid: new FormControl(
        //   this.concessionBody.has_Assignment_of_Interest_Fee_been_paid,
        //   [Validators.required]
        // ),
        // proposed_budget_for_each_license_lease: new FormControl(
        //   this.concessionBody.proposed_budget_for_each_license_lease,
        //   [Validators.required]
        // ),
        five_year_proposal: new FormControl(
          this.concessionBody.five_year_proposal,
          [Validators.required]
        ),
        did_you_meet_the_minimum_work_programme: new FormControl(
          this.concessionBody.did_you_meet_the_minimum_work_programme,
          [Validators.required]
        ),
        // relinquishment_retention: new FormControl(
        //   this.concessionBody.relinquishment_retention,
        //   [Validators.required]
        // ),
        // area_in_square_meter_based_on_company_records: new FormControl(
        //   this.concessionBody.area_in_square_meter_based_on_company_records,
        //   [Validators.required]
        // ),
        comment: new FormControl(this.concessionBody.comment),
      },
      {}
    );

    this.RoyaltyForm = new FormGroup(
      {
        crude_Oil_Royalty: new FormControl(this.royaltyBody.crude_Oil_Royalty, [
          Validators.required,
        ]),
        gas_Sales_Royalty: new FormControl(this.royaltyBody.gas_Sales_Royalty, [
          Validators.required,
        ]),
        gas_Flare_Payment: new FormControl(this.royaltyBody.gas_Flare_Payment, [
          Validators.required,
        ]),
        //concession_Rentals: new FormControl(this.royaltyBody.concession_Rentals, [Validators.required]),
        miscellaneous: new FormControl(this.royaltyBody.miscellaneous, [
          // Validators.required,
          Validators.minLength(2),
        ]),
        last_Qntr_Royalty: new FormControl(this.royaltyBody.last_Qntr_Royalty, [
          Validators.required,
        ]),
      },
      {}
    );

    this.EquityForm = new FormGroup(
      {
        companyOne: new FormControl(this.equityBody.companyOne, [
          Validators.required,
        ]),
        equityOne: new FormControl(this.equityBody.equityOne, [
          Validators.required,
        ]),
      },
      {}
    );

    this.boolValue$.subscribe((v: boolean) => {
      if (v) {
        this.getNo_of_discovered_field.enable();
        this.getDid_you_meet_the_minimum_work_programme.enable();
      } else {
        this.getDid_you_meet_the_minimum_work_programme.disable();
        this.getNo_of_discovered_field.disable();
      }
    });

    this.getHas_Signature_Bonus_been_paid.valueChanges.subscribe(
      (c: 'YES' | 'NO') => {
        if (c === 'YES') {
          this.getIf_No_why_sig.disable();
          this.getHow_Much_Signature_Bonus_have_been_paid_USD.enable();
        } else {
          this.getHow_Much_Signature_Bonus_have_been_paid_USD.disable();
          this.getIf_No_why_sig.enable();
        }
      }
    );

    this.getHas_the_Concession_Rentals_been_paid.valueChanges.subscribe(
      (c: 'YES' | 'NO') => {
        if (c === 'YES') {
          this.getIf_No_why_concession.disable();
          this.getHow_Much_Concession_Rental_have_been_paid_USD.enable();
        } else {
          this.getHow_Much_Concession_Rental_have_been_paid_USD.disable();
          this.getIf_No_why_concession.enable();
        }
      }
    );

    this.getIs_there_an_application_for_renewal.valueChanges.subscribe(
      (c: 'YES' | 'NO') => {
        if (c === 'YES') {
          this.getIf_No_why_renewal.disable();
          this.getHow_Much_Renewal_Bonus_have_been_paid_USD.enable();
        } else {
          this.getHow_Much_Renewal_Bonus_have_been_paid_USD.disable();
          this.getIf_No_why_renewal.enable();
        }
      }
    );

    this.genk.Concession$.subscribe((con: IConcession) => {
     // console.log('called....', con);
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

    this.getConcessionHeld();
    //
    this.getRoyaltyHeld();
    this.getBoolValue();
    this.cd.markForCheck();
  }

  public get getIs_there_an_application_for_renewal() {
    return this.ConcessionSituationForm.controls[
      'is_there_an_application_for_renewal'
    ];
  }

  public get getHow_Much_Renewal_Bonus_have_been_paid_USD() {
    return this.ConcessionSituationForm.controls[
      'how_Much_Renewal_Bonus_have_been_paid_USD'
    ];
  }

  public get getIf_No_why_renewal() {
    return this.ConcessionSituationForm.controls['if_No_why_renewal'];
  }

  public get getHas_the_Concession_Rentals_been_paid() {
    return this.ConcessionSituationForm.controls[
      'has_the_Concession_Rentals_been_paid'
    ];
  }

  public get getHow_Much_Concession_Rental_have_been_paid_USD() {
    return this.ConcessionSituationForm.controls[
      'how_Much_Concession_Rental_have_been_paid_USD'
    ];
  }

  public get getIf_No_why_concession() {
    return this.ConcessionSituationForm.controls['if_No_why_concession'];
  }

  public get getHas_Signature_Bonus_been_paid() {
    return this.ConcessionSituationForm.controls[
      'has_Signature_Bonus_been_paid'
    ];
  }

  public get getHow_Much_Signature_Bonus_have_been_paid_USD() {
    return this.ConcessionSituationForm.controls[
      'how_Much_Signature_Bonus_have_been_paid_USD'
    ];
  }

  public get getIf_No_why_sig() {
    return this.ConcessionSituationForm.controls['if_No_why_sig'];
  }

  public get getDid_you_meet_the_minimum_work_programme() {
    return this.ConcessionSituationForm.controls[
      'did_you_meet_the_minimum_work_programme'
    ];
  }

  public get getNo_of_discovered_field() {
    return this.ConcessionSituationForm.controls['no_of_discovered_field'];
  }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.genk.disableForm ? true : null;
  }

  get f() {
    return this.RoyaltyForm.controls;
  }

  get csf() {
    return this.ConcessionSituationForm.controls;
  }

  get eqt() {
    return this.EquityForm.controls;
  }

  getBoolValue() {
    this.fieldValue = this.genk.OmlName.trim().slice(0, 3).toUpperCase();
    if (this.fieldValue === 'OML' || this.fieldValue === 'PML') {
      this.boolValue = false;
      this.boolValue$.next(false);
    } else {
      this.boolValue = true;
      this.boolValue$.next(true);
    }
  }

  loadTable() {
    this.columnHeader = [];
    this.columnValue = [];

    for (let item1 in this.ConcessionSituationForm.controls) {
      if (item1 != 'comment') {
        this.columnHeader.push(this.genk.upperText(item1.replace(/_+/g, ' ')));
        this.columnValue.push(this.concessionBody[item1]);
      }
    }
    this.isTabVisible = true;
    this.cd.markForCheck();
  }

  getConcessionHeld() {
    // this.concessionBody = new CONCESSION_SITUATION();
    this.ConcessionSituationForm.reset();
    this.modalService.logCover('loading', true);
    this.workprogram
      .getFormOne(this.genk.OmlName, this.genk.fieldName, this.genk.wpYear)
      .subscribe((res) => {
        // if (!res.concessionSituation || res.concessionSituation.length === 0)
        //   return;
        if (res.concessionSituation[0]) {
          res.concessionSituation[0] = this.genk.addCommaBody(
            res.concessionSituation[0]
          );
        }
        if (res.concessionInfo[0]) {
          res.concessionInfo[0] = this.genk.addCommaBody(res.concessionInfo[0]);
        }

        let conInfo = res.concessionSituation[0] as CONCESSION_SITUATION;
        // conInfo.companyName = conInfo.companyName.toLowerCase();
        // conInfo.companyName = conInfo.companyName.replace(
        //   /(^\w{1})|(\s+\w{1})/g,
        //   (letter) => letter.toUpperCase()
        //);
        if (!conInfo) {
          conInfo = {} as any;
          conInfo.companyName = res.concessionInfo[0]?.companyName;
          conInfo.area = res.concessionInfo[0]?.area;
          conInfo.equity_distribution =
            res.concessionInfo[0]?.equity_distribution;
          conInfo.contract_Type = res.concessionInfo[0]?.contract_Type;
          conInfo.geological_location =
            res.concessionInfo[0]?.geological_location;
          conInfo.date_of_Grant_Expiration = this.genk.formDate(
            conInfo.date_of_Grant_Expiration
          );

          conInfo.date_of_Expiration = this.genk.formDate(
            conInfo.date_of_Expiration
          );
          this.concessionBody = conInfo;
          this.genk.concessionData = conInfo;
        } else {
          conInfo.companyName = res.concessionInfo[0]?.companyName;
          conInfo.area = res.concessionInfo[0]?.area;
          conInfo.equity_distribution =
            res.concessionInfo[0]?.equity_distribution;
          conInfo.contract_Type = res.concessionInfo[0]?.contract_Type;
          conInfo.geological_location =
            res.concessionInfo[0]?.geological_location;
          conInfo.date_of_Grant_Expiration = this.genk.formDate(
            conInfo.date_of_Grant_Expiration
          );

          conInfo.date_of_Expiration = this.genk.formDate(
            conInfo.date_of_Expiration
          );

          this.concessionBody = {} as CONCESSION_SITUATION;
          this.concessionBody = conInfo;
          this.genk.concessionData = conInfo;
          this.genk.isStep1 = true;
         // console.log(this.concessionBody.companyName);

          setTimeout(() => {
            this.loadTable();
          }, 2000);
        }

        if (this.genk.fieldName) {
          this.field = 'Field';
        }

        // this.fieldValue = this.genk.OmlName.trim().slice(0, 3).toUpperCase();

        // if (
        //   this.fieldValue === 'OEL' ||
        //   this.fieldValue === 'PPL' ||
        //   this.fieldValue === 'OPL' ||
        //   this.fieldValue === 'PEL'
        // ) {
        //   this.boolValue = 'block';
        // }

        this.modalService.togCover();
        this.getRoyaltyHeld();
        this.cd.markForCheck();
      });
  }

  // this.genk.OmlName.

  getRoyaltyHeld() {
    //

    this.RoyaltyForm.reset();
    this.workprogram
      .getRoyalty(this.genk.OmlName, this.genk.fieldName, this.genk.wpYear)
      .subscribe((res) => {
        if (res?.royalty) {
          this.royaltyBody = res.royalty as Royalty;
        //  console.log(this.royaltyBody.royalty_ID);
        } else {
          this.royaltyBody = {} as Royalty;
        }
        this.genk.isStep1 = true;
        this.modalService.togCover();
        this.cd.markForCheck();
      });
  }

  submitroyalty() {
   // console.log(this.RoyaltyForm);
    this.isRoyaltyFormSubmitted = true;
    if (this.RoyaltyForm.invalid) return;
    this.genk.removeComma(this.RoyaltyForm);

    if (this.RoyaltyForm.invalid) {
      this.cd.markForCheck();
      return;
    }
    this.workprogram
      .saveRoyalty(
        this.RoyaltyForm.getRawValue(),
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.isRoyaltyFormSubmitted = false;
          // this.royaltyBody = {} as Royalty;
          this.RoyaltyForm = updateFormValidity(this.RoyaltyForm);
          this.getRoyaltyHeld();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  submit() {
   // console.log(this.ConcessionSituationForm);
    this.isConcessionSituationFormSubmitted = true;
    if (this.ConcessionSituationForm.invalid) return;
    this.genk.removeCommaBody(this.concessionBody);

    // if (!this.boolValue) {
    //   this.ConcessionSituationForm.controls[
    //     'did_you_meet_the_minimum_work_programme'
    //   ].disable();

    //   this.ConcessionSituationForm.controls['no_of_discovered_field'].disable();
    //   this.ConcessionSituationForm.controls[
    //     'no_of_discovered_field'
    //   ].updateValueAndValidity();
    // }

    // console.log('checking...', this.ConcessionSituationForm);
    // if (this.ConcessionSituationForm.invalid) {
    //   this.cd.markForCheck();
    //   return;
    // }

    // if (this.concessionBody.date_of_Expiration) {
    //   this.concessionBody.date_of_Expiration =
    //     this.concessionBody.date_of_Expiration.includes('T00:00:00')
    //       ? this.concessionBody.date_of_Expiration
    //       : this.concessionBody.date_of_Expiration + 'T00:00:00';
    // }
    // if (this.concessionBody.date_of_Grant_Expiration) {
    //   this.concessionBody.date_of_Grant_Expiration =
    //     this.concessionBody.date_of_Grant_Expiration.includes('T00:00:00')
    //       ? this.concessionBody.date_of_Grant_Expiration
    //       : this.concessionBody.date_of_Grant_Expiration + 'T00:00:00';
    // }
    this.concessionBody.companyNumber = 0;
    this.concessionBody.no_of_discovered_field =
      this.concessionBody?.no_of_discovered_field?.toString();
    //this.concessionBody.no_of_field_producing =
    //this.concessionBody?.no_of_field_producing.toString();
    this.concessionBody.area = this.concessionBody?.area?.toString();
    this.concessionBody.area_in_square_meter_based_on_company_records =
      this.concessionBody?.area_in_square_meter_based_on_company_records?.toString();

    this.concessionBody.year = this.wkpYear;
    this.concessionBody.concession_Held = this.concessionHeld;

    this.workprogram
      .concessionSituation(
        this.concessionBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.isConcessionSituationFormSubmitted = false;
          this.ConcessionSituationForm = updateFormValidity(
            this.ConcessionSituationForm
          );
          this.getRoyaltyHeld();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  addEquity(companyName: string, percentEquity) {
    if (companyName && percentEquity) {
      this.equitySubmitted = true;
      if (this.EquityForm.invalid) {
        this.cd.markForCheck();
        return;
      }
      if (!this.concessionBody.equity_distribution) {
        this.concessionBody.equity_distribution = `${companyName.toUpperCase()} - ${percentEquity}%. `;
      } else {
        this.concessionBody.equity_distribution =
          this.concessionBody.equity_distribution +
          `${companyName.toUpperCase()} - ${percentEquity}%. `;
      }
      this.isAddEquity = false;
      this.cd.markForCheck();
    }
  }

  showEquity() {
    if (this.isAddEquity) {
      this.isAddEquity = false;
      this.cd.markForCheck();
    } else {
      this.isAddEquity = true;
      this.cd.markForCheck();
    }
  }

  clearEquity() {
    this.concessionBody.equity_distribution = '';
    this.cd.markForCheck();
  }
}
