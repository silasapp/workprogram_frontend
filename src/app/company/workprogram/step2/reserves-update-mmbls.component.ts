import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import {
  POST_RESERVES_REPLACEMENT_RATIO,
  RESERVES_UPDATES_DEPLETION_RATE,
  RESERVES_UPDATES_LIFE_INDEX,
  RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION,
  RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition,
  RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE,
  RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection,
  RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE,
} from 'src/app/models/step2-FIPR.model';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './reserves-update-mmbls.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPReserveUpdateComponent implements OnInit {
  ReserveUpdatePreceedingForm: FormGroup;
  ReserveUpdateCurrentForm: FormGroup;
  ReserveUpdateFiveYearProjectionForm: FormGroup;
  reserveUpdateOilCondensateCompanyAnnualProductionForm;
  reserveupdateOilCondensateReservesAdditionForm: FormGroup;
  reserveUpdateOilCondensateReservesDeclineForm: FormGroup;
  reserveReplacementRatioForm: FormGroup;
  reserveUpdateDepletionRateForm: FormGroup;
  reserveUpdateLifeIndexForm: FormGroup;

  reserveUpdateLifeIndexBody: RESERVES_UPDATES_LIFE_INDEX =
    {} as RESERVES_UPDATES_LIFE_INDEX;
  reserveUpdateDepletionRateBody: RESERVES_UPDATES_DEPLETION_RATE =
    {} as RESERVES_UPDATES_DEPLETION_RATE;
  reserveReplacementRatioBody: POST_RESERVES_REPLACEMENT_RATIO =
    {} as POST_RESERVES_REPLACEMENT_RATIO;
  reserveUpdateOilCondensateReservesDeclineBody: RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE =
    {} as RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE;
  reserveUpdateOilCondensateReservesAdditionBody: RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition =
    {} as RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition;
  reserveUpdateOilCondensateCompanyAnnualProductionBody: RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION =
    {} as RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION;
  statusOfReservesPreceeding: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE =
    {} as RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE;
  statusOfReservesCurrent: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE =
    {} as RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE;

  reserveupdateBody: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE =
    {} as RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE;
  reserveupdatefiveyearprojectionBody: RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection =
    {} as RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection;
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
      // this.getConcessionHeld();
      this.getReserveUpdate();
    });
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP2';
    this.ReserveUpdatePreceedingForm = new FormGroup({
      year_of_WP: new FormControl(this.statusOfReservesPreceeding.year_of_WP, [
        Validators.required,
      ]),
      company_Reserves_Oil: new FormControl(
        this.statusOfReservesPreceeding.company_Reserves_Oil,
        [Validators.required]
      ),
      company_Reserves_Condensate: new FormControl(
        this.statusOfReservesPreceeding.company_Reserves_Condensate,
        [Validators.required]
      ),
      company_Reserves_AG: new FormControl(
        this.statusOfReservesPreceeding.company_Reserves_AG,
        [Validators.required]
      ),
      company_Reserves_NAG: new FormControl(
        this.statusOfReservesPreceeding.company_Reserves_NAG,
        [Validators.required]
      ),
      company_Reserves_AnnualOilProduction: new FormControl(
        this.statusOfReservesPreceeding.company_Reserves_AnnualOilProduction,
        [Validators.required]
      ),
      company_Reserves_AnnualCondensateProduction: new FormControl(
        this.statusOfReservesPreceeding.company_Reserves_AnnualCondensateProduction,
        [Validators.required]
      ),
      company_Reserves_AnnualGasAGProduction: new FormControl(
        this.statusOfReservesPreceeding.company_Reserves_AnnualGasAGProduction,
        [Validators.required]
      ),
      company_Reserves_AnnualGasNAGProduction: new FormControl(
        this.statusOfReservesPreceeding.company_Reserves_AnnualGasNAGProduction,
        [Validators.required]
      ),
    });

    this.ReserveUpdateCurrentForm = new FormGroup({
      year_of_WP: new FormControl(this.statusOfReservesCurrent.year_of_WP, [
        Validators.required,
      ]),
      company_Reserves_Oil: new FormControl(
        this.statusOfReservesCurrent.company_Reserves_Oil,
        [Validators.required]
      ),
      company_Reserves_Condensate: new FormControl(
        this.statusOfReservesCurrent.company_Reserves_Condensate,
        [Validators.required]
      ),
      company_Reserves_AG: new FormControl(
        this.statusOfReservesCurrent.company_Reserves_AG,
        [Validators.required]
      ),
      company_Reserves_NAG: new FormControl(
        this.statusOfReservesCurrent.company_Reserves_NAG,
        [Validators.required]
      ),
      company_Reserves_AnnualOilProduction: new FormControl(
        this.statusOfReservesCurrent.company_Reserves_AnnualOilProduction,
        [Validators.required]
      ),
      company_Reserves_AnnualCondensateProduction: new FormControl(
        this.statusOfReservesCurrent.company_Reserves_AnnualCondensateProduction,
        [Validators.required]
      ),
      company_Reserves_AnnualGasAGProduction: new FormControl(
        this.statusOfReservesCurrent.company_Reserves_AnnualGasAGProduction,
        [Validators.required]
      ),
      company_Reserves_AnnualGasNAGProduction: new FormControl(
        this.statusOfReservesCurrent.company_Reserves_AnnualGasNAGProduction,
        [Validators.required]
      ),
    });

    this.ReserveUpdateFiveYearProjectionForm = new FormGroup({
      fiveyear_Projection_Year: new FormControl(
        this.reserveupdatefiveyearprojectionBody.fiveyear_Projection_Year,
        [Validators.required]
      ),
      fiveyear_Projection_Oil: new FormControl(
        this.reserveupdatefiveyearprojectionBody.fiveyear_Projection_Oil,
        [Validators.required]
      ),
      fiveyear_Projection_Condensate: new FormControl(
        this.reserveupdatefiveyearprojectionBody.fiveyear_Projection_Condensate,
        [Validators.required]
      ),
      fiveyear_Projection_AG: new FormControl(
        this.reserveupdatefiveyearprojectionBody.fiveyear_Projection_AG,
        [Validators.required]
      ),
      fiveyear_Projection_NAG: new FormControl(
        this.reserveupdatefiveyearprojectionBody.fiveyear_Projection_NAG,
        [Validators.required]
      ),
    });

    this.reserveUpdateOilCondensateCompanyAnnualProductionForm = new FormGroup({
      company_Annual_Year: new FormControl(
        this.reserveUpdateOilCondensateCompanyAnnualProductionBody.company_Annual_Year,
        [Validators.required]
      ),
      company_Annual_Oil: new FormControl(
        this.reserveUpdateOilCondensateCompanyAnnualProductionBody.company_Annual_Oil,
        [Validators.required]
      ),
      company_Annual_Condensate: new FormControl(
        this.reserveUpdateOilCondensateCompanyAnnualProductionBody.company_Annual_Condensate,
        [Validators.required]
      ),
      company_Annual_AG: new FormControl(
        this.reserveUpdateOilCondensateCompanyAnnualProductionBody.company_Annual_AG,
        [Validators.required]
      ),
      company_Annual_NAG: new FormControl(
        this.reserveUpdateOilCondensateCompanyAnnualProductionBody.company_Annual_AG,
        [Validators.required]
      ),
    });

    this.reserveupdateOilCondensateReservesAdditionForm = new FormGroup({
      reserves_Addition_Was_there_any_Reserve_Addition: new FormControl(
        this.reserveUpdateOilCondensateReservesAdditionBody.reserves_Addition_Was_there_any_Reserve_Addition,
        [Validators.required]
      ),
      reserves_Addition_Reason_for_Addition: new FormControl(
        this.reserveUpdateOilCondensateReservesAdditionBody.reserves_Addition_Reason_for_Addition,
        [Validators.required]
      ),
      reserves_Addition_Oil: new FormControl(
        this.reserveUpdateOilCondensateReservesAdditionBody.reserves_Addition_Oil,
        [Validators.required]
      ),
      reserves_Addition_Condensate: new FormControl(
        this.reserveUpdateOilCondensateReservesAdditionBody.reserves_Addition_Condensate,
        [Validators.required]
      ),
      reserves_Addition_AG: new FormControl(
        this.reserveUpdateOilCondensateReservesAdditionBody.reserves_Addition_AG,
        [Validators.required]
      ),
      reserves_Addition_NAG: new FormControl(
        this.reserveUpdateOilCondensateReservesAdditionBody.reserves_Addition_NAG,
        [Validators.required]
      ),
    });

    this.reserveUpdateOilCondensateReservesDeclineForm = new FormGroup({
      reserves_Decline_Was_there_a_decline_in_reserve: new FormControl(
        this.reserveUpdateOilCondensateReservesDeclineBody.reserves_Decline_Was_there_a_decline_in_reserve,
        [Validators.required]
      ),
      reserves_Decline_Reason_for_Decline: new FormControl(
        this.reserveUpdateOilCondensateReservesDeclineBody.reserves_Decline_Reason_for_Decline,
        [Validators.required]
      ),
      reserves_Decline_Oil: new FormControl(
        this.reserveUpdateOilCondensateReservesDeclineBody.reserves_Decline_Oil,
        [Validators.required]
      ),
      reserves_Decline_Condensate: new FormControl(
        this.reserveUpdateOilCondensateReservesDeclineBody.reserves_Decline_Condensate,
        [Validators.required]
      ),
      reserves_Decline_AG: new FormControl(
        this.reserveUpdateOilCondensateReservesDeclineBody.reserves_Decline_AG,
        [Validators.required]
      ),
      reserves_Decline_NAG: new FormControl(
        this.reserveUpdateOilCondensateReservesDeclineBody.reserves_Decline_NAG,
        [Validators.required]
      ),
    });

    this.reserveReplacementRatioForm = new FormGroup({
      trend_Year: new FormControl(this.reserveReplacementRatioBody.trend_Year, [
        Validators.required,
      ]),
      reserveS_REPLACEMENT_RATIO_VALUE: new FormControl(
        this.reserveReplacementRatioBody.reserveS_REPLACEMENT_RATIO_VALUE,
        [Validators.required]
      ),
    });

    this.reserveUpdateDepletionRateForm = new FormGroup({
      oIL: new FormControl(this.reserveUpdateDepletionRateBody.oIL, [
        Validators.required,
      ]),
      cONDENSATE: new FormControl(
        this.reserveUpdateDepletionRateBody.cONDENSATE,
        [Validators.required]
      ),
      nAG: new FormControl(this.reserveUpdateDepletionRateBody.nAG, [
        Validators.required,
      ]),
    });

    this.reserveUpdateLifeIndexForm = new FormGroup({
      oIL: new FormControl(this.reserveUpdateLifeIndexBody.oIL, [
        Validators.required,
      ]),
      cONDENSATE: new FormControl(this.reserveUpdateLifeIndexBody.cONDENSATE, [
        Validators.required,
      ]),
      nAG: new FormControl(this.reserveUpdateLifeIndexBody.nAG, [
        Validators.required,
      ]),
      aG: new FormControl(this.reserveUpdateLifeIndexBody.aG, [
        Validators.required,
      ]),
    });

    this.getReserveUpdate();
    this.cd.markForCheck();
  }

  getReserveUpdate() {
    this.workprogram
      .getReservesUpdate(
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        if (res.statusOfReservesPreceeding) {
          this.statusOfReservesPreceeding = res.statusOfReservesPreceeding;
        }
        if (res.statusOfReservesCurrent) {
          this.statusOfReservesCurrent = res.statusOfReservesCurrent;
        }
        if (res.fiveYearProjection) {
          this.reserveupdatefiveyearprojectionBody = res.fiveYearProjection;
        }
        if (res.companyAnnualProduction) {
          this.reserveUpdateOilCondensateCompanyAnnualProductionBody =
            res.companyAnnualProduction;
        }
        if (res.reservesAddition) {
          this.reserveUpdateOilCondensateReservesAdditionBody =
            res.reservesAddition;
        }
        if (res.reservesDecline) {
          this.reserveUpdateOilCondensateReservesDeclineBody =
            res.reservesDecline;
        }
        if (res.reservesReplacementRatio) {
          this.reserveReplacementRatioBody = res.reservesReplacementRatio;
        }
        // if(res.)
        this.cd.markForCheck();
      });
  }

  saveReserveUpdatePreceeding() {
    this.workprogram
      .saveReserveUpdatePreceeding(
        this.statusOfReservesPreceeding,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.popText, 'success');
      });
  }

  saveReserveUpdateCurrent() {
    this.workprogram
      .saveReserveUpdateCurrent(
        this.statusOfReservesCurrent,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.popText, 'success');
      });
  }

  saveReserveUpdateFiveYearProjection() {
    this.workprogram
      .saveReserveUpdateFiveYearPorjection(
        this.reserveupdatefiveyearprojectionBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.popText, 'success');
        },
        error: (error) => {
          this.modalService.logNotice(
            'Something went wrong while trying to save form.',
            'Error',
            'error'
          );
        },
      });
  }

  saveReserveUpdateOilCondensateCompanyAnnualProduction() {
    forkJoin([
      this.workprogram.saveReserveUpdateOilCondensateCompanyAnnualProduction(
        this.reserveUpdateOilCondensateCompanyAnnualProductionBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      ),
      this.workprogram.saveUpdateOilCondensateReservesAddition(
        this.reserveUpdateOilCondensateReservesAdditionBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      ),
      this.workprogram.saveUpdateOilCondensateReservesDecline(
        this.reserveUpdateOilCondensateReservesDeclineBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      ),
    ]).subscribe({
      next: (res) => {
        this.modalService.logNotice('Success', 'Success', 'success');
      },
      error: (error) => {
        this.modalService.logNotice(
          'Something went wrong while trying to save form.',
          'Error',
          'error'
        );
      },
    });
  }

  saveReserveReplacementRatio() {
    this.workprogram
      .saveReserveReplacementRatio(
        this.reserveReplacementRatioBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.popText, 'success');
        },
        error: (error) => {
          this.modalService.logNotice(
            'Something went wrong while trying to save form.',
            'Error',
            'error'
          );
        },
      });
  }

  saveReserveUpdateDepletionRate() {
    this.workprogram
      .saveReserveUpdateDepletionRate(
        this.reserveUpdateDepletionRateBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.popText, 'success');
        },
        error: (error) => {
          this.modalService.logNotice(
            'Something went wrong while trying to save form.',
            'Error',
            'error'
          );
        },
      });
  }

  saveReserveUpdateLifeIndex() {
    this.workprogram
      .saveReserveUpdateLifeIndex(
        this.reserveUpdateLifeIndexBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.popText, 'success');
        },
        error: (error) => {
          this.modalService.logNotice(
            'Something went wrong while trying to save form.',
            'Error',
            'error'
          );
        },
      });
  }

  onSubmit() {
    return null;
  }
}
