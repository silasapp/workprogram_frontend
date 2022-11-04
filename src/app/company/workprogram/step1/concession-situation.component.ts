import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import { CONCESSION_SITUATION } from '../../../models/step1-concession.model';
import { Royalty } from '../../../models/step1-royalty.model';

@Component({
  templateUrl: './concession-situation.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPConcessionSituationComponent implements OnInit {
  ConcessionSituationForm: FormGroup;
  concessionBody: CONCESSION_SITUATION = {} as CONCESSION_SITUATION;
  RoyaltyForm: FormGroup;
  royaltyBody: Royalty = {} as Royalty;
  wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;

  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      this.getConcessionHeld();
      this.getRoyaltyHeld();
    });
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP1';
    this.ConcessionSituationForm = new FormGroup(
      {
        year: new FormControl(this.concessionBody.year, [Validators.required]),
        concession_Held: new FormControl(this.concessionBody.concession_Held, [
          Validators.required,
        ]),
        companyName: new FormControl(this.concessionBody.companyName, [
          Validators.required,
        ]),
        area: new FormControl(this.concessionBody.area, [Validators.required]),
        contract_Type: new FormControl(this.concessionBody.contract_Type, [
          Validators.required,
        ]),
        geological_location: new FormControl(
          this.concessionBody.geological_location,
          [Validators.required]
        ),
        terrain: new FormControl(this.concessionBody.terrain, [
          Validators.required,
        ]),
        equity_distribution: new FormControl(
          this.concessionBody.equity_distribution,
          [Validators.required]
        ),
        no_of_field_producing: new FormControl(
          this.concessionBody.no_of_field_producing,
          [Validators.required]
        ),
        date_of_Grant_Expiration: new FormControl(
          this.concessionBody.date_of_Grant_Expiration,
          [Validators.required]
        ),
        date_of_Expiration: new FormControl(
          this.concessionBody.date_of_Expiration,
          [Validators.required]
        ),
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
        has_Assignment_of_Interest_Fee_been_paid: new FormControl(
          this.concessionBody.has_Assignment_of_Interest_Fee_been_paid,
          [Validators.required]
        ),
        proposed_budget_for_each_license_lease: new FormControl(
          this.concessionBody.proposed_budget_for_each_license_lease,
          [Validators.required]
        ),
        five_year_proposal: new FormControl(
          this.concessionBody.five_year_proposal,
          [Validators.required]
        ),
        did_you_meet_the_minimum_work_programme: new FormControl(
          this.concessionBody.did_you_meet_the_minimum_work_programme,
          [Validators.required]
        ),
        relinquishment_retention: new FormControl(
          this.concessionBody.relinquishment_retention,
          [Validators.required]
        ),
        area_in_square_meter_based_on_company_records: new FormControl(
          this.concessionBody.area_in_square_meter_based_on_company_records,
          [Validators.required]
        ),
        comment: new FormControl(this.concessionBody.comment, [
          Validators.required,
        ]),
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
          Validators.required,
        ]),
      },
      {}
    );

    this.getConcessionHeld();
    //
    this.getRoyaltyHeld();
    this.cd.markForCheck();
  }

  loadTable() {
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
    this.workprogram
      .getFormOne(this.genk.OmlName, this.genk.fieldName, this.genk.wpYear)
      .subscribe((res) => {
        let conInfo = res.concessionSituation[0] as CONCESSION_SITUATION;

        if (!conInfo) {
          conInfo = {} as any;
          conInfo.companyName = res.concessionInfo[0].companyName;
          conInfo.area = res.concessionInfo[0].area;
          conInfo.equity_distribution =
            res.concessionInfo[0].equity_distribution;
          conInfo.contract_Type = res.concessionInfo[0].contract_Type;
          conInfo.geological_location =
            res.concessionInfo[0].geological_location;
          conInfo.date_of_Grant_Expiration = this.genk.formDate(
            conInfo.date_of_Grant_Expiration
          );

          conInfo.date_of_Expiration = this.genk.formDate(
            conInfo.date_of_Expiration
          );
          this.concessionBody = conInfo;
          this.genk.concessionData = conInfo;

          this.cd.markForCheck();
        } else {
          conInfo.date_of_Grant_Expiration = this.genk.formDate(
            conInfo.date_of_Grant_Expiration
          );
          conInfo.date_of_Expiration = this.genk.formDate(
            conInfo.date_of_Expiration
          );
          this.concessionBody = conInfo;
          this.genk.concessionData = conInfo;
          this.genk.isStep1 = true;
          this.cd.markForCheck();
          console.log(this.concessionBody.companyName);
          this.loadTable();
        }

        this.getRoyaltyHeld();
      });
  }

  getRoyaltyHeld() {
    this.workprogram
      .getRoyalty(this.genk.OmlName, this.genk.wpYear)
      .subscribe((res) => {
        this.royaltyBody = res.royalty[0] as Royalty;
        this.cd.markForCheck();

        this.genk.isStep1 = true;
        this.cd.markForCheck();
        console.log(this.royaltyBody.royalty_ID);

        this.loadTable();
      });
  }

  submitroyalty() {
    this.workprogram
      .saveRoyalty(
        this.RoyaltyForm.getRawValue(),
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        //this.RoyaltyForm.reset();
        this.modalService.logNotice('Success', res.message, 'success');
      });
  }

  submit() {
    if (this.concessionBody.date_of_Expiration) {
      this.concessionBody.date_of_Expiration =
        this.concessionBody.date_of_Expiration.includes('T00:00:00')
          ? this.concessionBody.date_of_Expiration
          : this.concessionBody.date_of_Expiration + 'T00:00:00';
    }
    if (this.concessionBody.date_of_Grant_Expiration) {
      this.concessionBody.date_of_Grant_Expiration =
        this.concessionBody.date_of_Grant_Expiration.includes('T00:00:00')
          ? this.concessionBody.date_of_Grant_Expiration
          : this.concessionBody.date_of_Grant_Expiration + 'T00:00:00';
    }
    this.concessionBody.companyNumber = 0;
    this.concessionBody.no_of_discovered_field =
      this.concessionBody.no_of_discovered_field.toString();
    this.concessionBody.no_of_field_producing =
      this.concessionBody.no_of_field_producing.toString();
    this.concessionBody.area = this.concessionBody.area.toString();
    this.concessionBody.area_in_square_meter_based_on_company_records =
      this.concessionBody.area_in_square_meter_based_on_company_records.toString();

    this.concessionBody.year = this.wkpYear;
    this.concessionBody.concession_Held = this.concessionHeld;

    console.log(this.concessionBody);
    this.workprogram
      .concessionSituation(
        this.concessionBody,
        this.genk.wpYear,
        this.genk.OmlName
      )
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.message, 'success');
      });
  }
}
