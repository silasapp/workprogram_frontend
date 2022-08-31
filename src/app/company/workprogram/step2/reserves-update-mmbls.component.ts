import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection, RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE } from 'src/app/models/step2-FIPR.model';
import { AuthenticationService, GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './reserves-update-mmbls.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SWPReserveUpdateComponent implements OnInit {
  ReserveUpdatePreceedingForm: FormGroup;
  ReserveUpdateCurrentForm: FormGroup;
  ReserveUpdateFiveYearProjectionForm: FormGroup;
  statusOfReservesPreceeding: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE = {} as RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE;
  statusOfReservesCurrent: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE = {} as RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE;


  reserveupdateBody: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE = {} as RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE;
  reserveupdatefiveyearprojectionBody: RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection = {} as RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection;
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
      // this.getConcessionHeld();
    });

   }

  ngOnInit(): void {
    this.ReserveUpdatePreceedingForm = new FormGroup(
      {
        year_of_WP: new FormControl(this.statusOfReservesPreceeding.year_of_WP,[Validators.required]),
        company_Reserves_Oil: new FormControl(this.statusOfReservesPreceeding.company_Reserves_Oil,[Validators.required]),
        company_Reserves_Condensate: new FormControl(this.statusOfReservesPreceeding.company_Reserves_Condensate,[Validators.required]),
        company_Reserves_AG: new FormControl(this.statusOfReservesPreceeding.company_Reserves_AG,[Validators.required]),
        company_Reserves_NAG: new FormControl(this.statusOfReservesPreceeding.company_Reserves_NAG,[Validators.required]),
        company_Reserves_AnnualOilProduction: new FormControl(this.statusOfReservesPreceeding.company_Reserves_AnnualOilProduction,[Validators.required]),
        company_Reserves_AnnualCondensateProduction: new FormControl(this.statusOfReservesPreceeding.company_Reserves_AnnualCondensateProduction,[Validators.required]),
        company_Reserves_AnnualGasAGProduction: new FormControl(this.statusOfReservesPreceeding.company_Reserves_AnnualGasAGProduction,[Validators.required]),
        company_Reserves_AnnualGasNAGProduction: new FormControl(this.statusOfReservesPreceeding.company_Reserves_AnnualGasNAGProduction,[Validators.required]),
      })

      this.ReserveUpdateCurrentForm = new FormGroup(
        {
          year_of_WP: new FormControl(this.statusOfReservesCurrent.year_of_WP,[Validators.required]),
          company_Reserves_Oil: new FormControl(this.statusOfReservesCurrent.company_Reserves_Oil,[Validators.required]),
          company_Reserves_Condensate: new FormControl(this.statusOfReservesCurrent.company_Reserves_Condensate,[Validators.required]),
          company_Reserves_AG: new FormControl(this.statusOfReservesCurrent.company_Reserves_AG,[Validators.required]),
          company_Reserves_NAG: new FormControl(this.statusOfReservesCurrent.company_Reserves_NAG,[Validators.required]),
          company_Reserves_AnnualOilProduction: new FormControl(this.statusOfReservesCurrent.company_Reserves_AnnualOilProduction,[Validators.required]),
          company_Reserves_AnnualCondensateProduction: new FormControl(this.statusOfReservesCurrent.company_Reserves_AnnualCondensateProduction,[Validators.required]),
          company_Reserves_AnnualGasAGProduction: new FormControl(this.statusOfReservesCurrent.company_Reserves_AnnualGasAGProduction,[Validators.required]),
          company_Reserves_AnnualGasNAGProduction: new FormControl(this.statusOfReservesCurrent.company_Reserves_AnnualGasNAGProduction,[Validators.required]),
        })

      // this.ReserveUpdateFiveYearProjectionForm = new FormGroup(
      //   {
      //   year_of_WP: new FormControl(this.reserveupdatefiveyearprojectionBody.year_of_WP,[Validators.required]),
      //   // year_of_WP: new FormControl(this.reserveupdatefiveyearprojectionBody.,[Validators.required]),
      //   // year_of_WP: new FormControl(this.reserveupdatefiveyearprojectionBody.year_of_WP,[Validators.required]),
      //   // year_of_WP: new FormControl(this.reserveupdatefiveyearprojectionBody.year_of_WP,[Validators.required]),
      //   // year_of_WP: new FormControl(this.reserveupdatefiveyearprojectionBody.year_of_WP,[Validators.required]),
      //   })

        this.getReserveUpdate();
        this.cd.markForCheck();
  }

  getReserveUpdate() {
    this.workprogram.getReservesUpdate(this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe(res => {
        if (res.statusOfReservesPreceeding) {
          this.statusOfReservesPreceeding = res.statusOfReservesPreceeding;
        }
        if (res.statusOfReservesCurrent) {
          this.statusOfReservesCurrent = res.statusOfReservesCurrent;
        }
        this.cd.markForCheck();
      });
  }

  saveReserveUpdatePreceeding() {
    this.workprogram.saveReserveUpdatePreceeding(this.statusOfReservesPreceeding, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
    .subscribe(res => {
      this.modalService.logNotice("Success", res.popText, 'success');
    });
  }

  saveReserveUpdateCurrent() {
    this.workprogram.saveReserveUpdateCurrent(this.statusOfReservesCurrent, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
    .subscribe(res => {
      this.modalService.logNotice("Success", res.popText, 'success');
    });
  }


  onSubmit(){
    return null;
  }

}
