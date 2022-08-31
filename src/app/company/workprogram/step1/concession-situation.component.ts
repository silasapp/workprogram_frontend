import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import { CONCESSION_SITUATION } from '../../../models/step1-concession.model';

@Component({
  templateUrl: './concession-situation.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPConcessionSituationComponent implements OnInit {
  ConcessionSituationForm: FormGroup;
  concessionBody: CONCESSION_SITUATION = {} as CONCESSION_SITUATION;
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
    this.modalService.concessionSitu
    .subscribe(res => {
      this.getConcessionHeld();
    });
  }

  ngOnInit(): void {

    this.ConcessionSituationForm = new FormGroup(
      {
        year: new FormControl(this.concessionBody.year, [Validators.required]),
        concession_Held: new FormControl(this.concessionBody.concession_Held, [Validators.required]),
        companyName: new FormControl(this.concessionBody.companyName, [Validators.required, ]),
        area: new FormControl(this.concessionBody.area, [Validators.required]),
        contract_Type: new FormControl(this.concessionBody.contract_Type, [Validators.required,]),
        geological_location: new FormControl(this.concessionBody.geological_location, [Validators.required]),
        terrain: new FormControl(this.concessionBody.terrain, [Validators.required, ]),
        equity_distribution: new FormControl(this.concessionBody.equity_distribution, [Validators.required]),
        no_of_field_producing: new FormControl(this.concessionBody.no_of_field_producing, [Validators.required]),
        date_of_Grant_Expiration: new FormControl(this.concessionBody.date_of_Grant_Expiration, [Validators.required]),
        date_of_Expiration: new FormControl(this.concessionBody.date_of_Expiration,[Validators.required]),
        has_Signature_Bonus_been_paid: new FormControl(this.concessionBody.has_Signature_Bonus_been_paid, [Validators.required]),
        has_the_Concession_Rentals_been_paid: new FormControl(this.concessionBody.has_the_Concession_Rentals_been_paid, [Validators.required]),
        is_there_an_application_for_renewal: new FormControl(this.concessionBody.is_there_an_application_for_renewal, [Validators.required]),
        how_Much_Signature_Bonus_have_been_paid_USD: new FormControl(this.concessionBody.how_Much_Signature_Bonus_have_been_paid_USD, [Validators.required]),
        how_Much_Concession_Rental_have_been_paid_USD: new FormControl(this.concessionBody.how_Much_Concession_Rental_have_been_paid_USD, [Validators.required]),
        how_Much_Renewal_Bonus_have_been_paid_USD: new FormControl(this.concessionBody.how_Much_Renewal_Bonus_have_been_paid_USD, [Validators.required]),
        if_No_why_sig: new FormControl(this.concessionBody.if_No_why_sig, [Validators.required,]),
        if_No_why_concession: new FormControl(this.concessionBody.if_No_why_concession, [Validators.required]),
        if_No_why_renewal: new FormControl(this.concessionBody.if_No_why_renewal, [Validators.required]),
        no_of_discovered_field: new FormControl(this.concessionBody.no_of_discovered_field, [Validators.required]),
        has_Assignment_of_Interest_Fee_been_paid: new FormControl(this.concessionBody.has_Assignment_of_Interest_Fee_been_paid, [Validators.required]),
        proposed_budget_for_each_license_lease: new FormControl(this.concessionBody.proposed_budget_for_each_license_lease, [Validators.required]),
        five_year_proposal: new FormControl(this.concessionBody.five_year_proposal, [Validators.required]),
        did_you_meet_the_minimum_work_programme: new FormControl(this.concessionBody.did_you_meet_the_minimum_work_programme, [Validators.required]),
        relinquishment_retention: new FormControl(this.concessionBody.relinquishment_retention, [Validators.required]),
        area_in_square_meter_based_on_company_records: new FormControl(this.concessionBody.area_in_square_meter_based_on_company_records, [Validators.required]),
        comment: new FormControl(this.concessionBody.comment, [Validators.required])
      }, {});
      this.getConcessionHeld();
      //this.concessionBody = this.genk.concessionData;
      //this.concessionHeldList = this.genk.OMLList;
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

  // changeConcessionHeld() {
  //   this.workprogram.getFormOne(this.genk.OmlName, this.genk.wpYear)
  //   .subscribe((res) => {
  //       let conInfo = res.concessionSituation[0] as CONCESSION_SITUATION;
  //       this.genk.OmlName = conInfo.concession_Held;
  //       this.genk.wpYear = conInfo.year;
  //       conInfo.date_of_Grant_Expiration = this.genk.formDate(
  //         conInfo.date_of_Grant_Expiration
  //       );
  //       conInfo.date_of_Expiration = this.genk.formDate(
  //         conInfo.date_of_Expiration
  //       );
  //       this.concessionBody = conInfo;
  //       this.genk.concessionData = conInfo;
  //       this.cd.markForCheck();
  //       this.loadTable();
  //     });
  // }

  getConcessionHeld() {
    this.workprogram
      .getFormOne(this.genk.OmlName, this.genk.fieldName, this.genk.wpYear)
      .subscribe((res) => {
        let conInfo = res.concessionSituation[0] as CONCESSION_SITUATION;
        //console.log(conInfo);
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
        }
        else {
          conInfo.date_of_Grant_Expiration = this.genk.formDate(
            conInfo.date_of_Grant_Expiration
          );
          conInfo.date_of_Expiration = this.genk.formDate(
            conInfo.date_of_Expiration
          );
          this.concessionBody = conInfo;
          this.genk.concessionData = conInfo;
          this.cd.markForCheck();
          this.loadTable();
        }
      });
  }



  submit() {
    //debugger;
    //let salel = {} as CONCESSION_SITUATION;
    if (this.concessionBody.date_of_Expiration) {
      this.concessionBody.date_of_Expiration = this.concessionBody.date_of_Expiration.includes("T00:00:00") ? this.concessionBody.date_of_Expiration : this.concessionBody.date_of_Expiration + "T00:00:00";
    }
    if (this.concessionBody.date_of_Grant_Expiration) {
      this.concessionBody.date_of_Grant_Expiration = this.concessionBody.date_of_Grant_Expiration.includes("T00:00:00") ? this.concessionBody.date_of_Grant_Expiration : this.concessionBody.date_of_Grant_Expiration + "T00:00:00";
    }
    this.concessionBody.companyNumber = 0;
    this.concessionBody.no_of_discovered_field = this.concessionBody.no_of_discovered_field.toString();
    this.concessionBody.no_of_field_producing = this.concessionBody.no_of_field_producing.toString();
    this.concessionBody.area = this.concessionBody.area.toString();
    this.concessionBody.area_in_square_meter_based_on_company_records = this.concessionBody.area_in_square_meter_based_on_company_records.toString();
    //this.concessionBody.id =  0;
    this.concessionBody.year = this.wkpYear;
    this.concessionBody.concession_Held = this.concessionHeld;
    // for (let item in this.concessionBody) {
    //   //console.log(item);
    //   if (item != 'id' && item != 'field_ID' && item != 'field_ID' && item != 'field_ID' && item != 'field_ID' && item != 'field_ID' && item != 'field_ID') {
    //     salel[this.genk.upperText(item)] = this.concessionBody[item].toString() ?? '';
    //   }
    // }

    this.workprogram
      .concessionSituation(this.concessionBody, this.genk.wpYear, this.genk.OmlName)
      .subscribe();
  }
}
