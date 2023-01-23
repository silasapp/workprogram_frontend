import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { PLANNING_MINIMUM_REQUIREMENT } from 'src/app/models/step5_sdcp.model';
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
  public disableForm: boolean = false;
  ReserveUpdatePreceedingForm: FormGroup;
  ReserveUpdateCurrentForm: FormGroup;
  ReserveUpdateFiveYearProjectionForm: FormGroup;
  reserveUpdateOilCondensateCompanyAnnualProductionForm;
  reserveupdateOilCondensateReservesAdditionForm: FormGroup;
  reserveUpdateOilCondensateReservesDeclineForm: FormGroup;
  reserveReplacementRatioForm: FormGroup;
  reserveUpdateDepletionRateForm: FormGroup;
  reserveUpdateLifeIndexForm: FormGroup;

  public planningMinimumRequirementForm: FormGroup;

  public planningMinimumRequirementBody: PLANNING_MINIMUM_REQUIREMENT =
    {} as PLANNING_MINIMUM_REQUIREMENT;

  reserveUpdateLifeIndexBody = new RESERVES_UPDATES_LIFE_INDEX();
  reserveUpdateDepletionRateBody = new RESERVES_UPDATES_DEPLETION_RATE();
  reserveReplacementRatioBody = new POST_RESERVES_REPLACEMENT_RATIO();
  reserveUpdateOilCondensateReservesDeclineBody =
    new RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE();
  reserveUpdateOilCondensateReservesAdditionBody =
    new RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition();
  reserveUpdateOilCondensateCompanyAnnualProductionBody =
    new RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION();
  statusOfReservesPreceeding =
    new RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE();
  statusOfReservesCurrent =
    new RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE();

  reserveupdateBody: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE =
    {} as RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE;
  reserveupdatefiveyearprojectionBody =
    new RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection();
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
      this.getSWPR();
      // this.getReserveUpdateDepletionRate();
    });
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP2';
    this.ReserveUpdatePreceedingForm = new FormGroup({
      year_of_WP: new FormControl(this.statusOfReservesPreceeding.year_of_WP, [
        Validators.required,
      ]),
      company_Reserves_Oil: new FormControl(
        this.statusOfReservesPreceeding._company_Reserves_Oil,
        [Validators.required]
      ),
      company_Reserves_Condensate: new FormControl(
        this.statusOfReservesPreceeding._company_Reserves_Condensate,
        [Validators.required]
      ),
      company_Reserves_AG: new FormControl(
        this.statusOfReservesPreceeding._company_Reserves_AG,
        [Validators.required]
      ),
      company_Reserves_NAG: new FormControl(
        this.statusOfReservesPreceeding._company_Reserves_NAG,
        [Validators.required]
      ),
      company_Reserves_AnnualOilProduction: new FormControl(
        this.statusOfReservesPreceeding._company_Reserves_AnnualOilProduction,
        [Validators.required]
      ),
      company_Reserves_AnnualCondensateProduction: new FormControl(
        this.statusOfReservesPreceeding._company_Reserves_AnnualCondensateProduction,
        [Validators.required]
      ),
      company_Reserves_AnnualGasAGProduction: new FormControl(
        this.statusOfReservesPreceeding._company_Reserves_AnnualGasAGProduction,
        [Validators.required]
      ),
      company_Reserves_AnnualGasNAGProduction: new FormControl(
        this.statusOfReservesPreceeding._company_Reserves_AnnualGasNAGProduction,
        [Validators.required]
      ),
    });

    this.ReserveUpdateCurrentForm = new FormGroup({
      year_of_WP: new FormControl(this.statusOfReservesCurrent.year_of_WP, [
        Validators.required,
      ]),
      company_Reserves_Oil: new FormControl(
        this.statusOfReservesCurrent._company_Reserves_Oil,
        [Validators.required]
      ),
      company_Reserves_Condensate: new FormControl(
        this.statusOfReservesCurrent._company_Reserves_Condensate,
        [Validators.required]
      ),
      company_Reserves_AG: new FormControl(
        this.statusOfReservesCurrent._company_Reserves_AG,
        [Validators.required]
      ),
      company_Reserves_NAG: new FormControl(
        this.statusOfReservesCurrent._company_Reserves_NAG,
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
        this.reserveUpdateOilCondensateCompanyAnnualProductionBody._company_Annual_Oil,
        [Validators.required]
      ),
      company_Annual_Condensate: new FormControl(
        this.reserveUpdateOilCondensateCompanyAnnualProductionBody._company_Annual_Condensate,
        [Validators.required]
      ),
      company_Annual_AG: new FormControl(
        this.reserveUpdateOilCondensateCompanyAnnualProductionBody._company_Annual_AG,
        [Validators.required]
      ),
      company_Annual_NAG: new FormControl(
        this.reserveUpdateOilCondensateCompanyAnnualProductionBody._company_Annual_AG,
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
        this.reserveUpdateOilCondensateReservesAdditionBody._reserves_Addition_Oil,
        [Validators.required]
      ),
      reserves_Addition_Condensate: new FormControl(
        this.reserveUpdateOilCondensateReservesAdditionBody._reserves_Addition_Condensate,
        [Validators.required]
      ),
      reserves_Addition_AG: new FormControl(
        this.reserveUpdateOilCondensateReservesAdditionBody._reserves_Addition_AG,
        [Validators.required]
      ),
      reserves_Addition_NAG: new FormControl(
        this.reserveUpdateOilCondensateReservesAdditionBody._reserves_Addition_NAG,
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
        this.reserveUpdateOilCondensateReservesDeclineBody._reserves_Decline_Oil,
        [Validators.required]
      ),
      reserves_Decline_Condensate: new FormControl(
        this.reserveUpdateOilCondensateReservesDeclineBody._reserves_Decline_Condensate,
        [Validators.required]
      ),
      reserves_Decline_AG: new FormControl(
        this.reserveUpdateOilCondensateReservesDeclineBody._reserves_Decline_AG,
        [Validators.required]
      ),
      reserves_Decline_NAG: new FormControl(
        this.reserveUpdateOilCondensateReservesDeclineBody._reserves_Decline_NAG,
        [Validators.required]
      ),
    });

    this.reserveReplacementRatioForm = new FormGroup({
      trend_Year: new FormControl(this.reserveReplacementRatioBody.trend_Year, [
        Validators.required,
      ]),
      reserveS_REPLACEMENT_RATIO_VALUE: new FormControl(
        this.reserveReplacementRatioBody._reserveS_REPLACEMENT_RATIO_VALUE,
        [Validators.required]
      ),
    });

    this.reserveUpdateDepletionRateForm = new FormGroup({
      oIL: new FormControl(this.reserveUpdateDepletionRateBody._oil, [
        Validators.required,
      ]),
      cONDENSATE: new FormControl(
        this.reserveUpdateDepletionRateBody._condensate,
        [Validators.required]
      ),
      nAG: new FormControl(this.reserveUpdateDepletionRateBody._nag, [
        Validators.required,
      ]),
    });

    this.reserveUpdateLifeIndexForm = new FormGroup({
      oIL: new FormControl(this.reserveUpdateLifeIndexBody._oil, [
        Validators.required,
      ]),
      cONDENSATE: new FormControl(this.reserveUpdateLifeIndexBody._condensate, [
        Validators.required,
      ]),
      nAG: new FormControl(this.reserveUpdateLifeIndexBody._nag, [
        Validators.required,
      ]),
      aG: new FormControl(this.reserveUpdateLifeIndexBody._ag, [
        Validators.required,
      ]),
    });

    this.planningMinimumRequirementForm = new FormGroup(
      {
        reservesRevenue_GrossProduction: new FormControl(
          this.planningMinimumRequirementBody.reservesRevenue_GrossProduction,
          [Validators.required]
        ),
        reservesRevenue_RemainingReserves: new FormControl(
          this.planningMinimumRequirementBody.reservesRevenue_RemainingReserves,
          [Validators.required]
        ),
      },
      {}
    );

    this.getReserveUpdate();
    this.getSWPR();
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
          this.statusOfReservesPreceeding =
            new RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE(
              res.statusOfReservesPreceeding
            );
        }
        if (res.statusOfReservesCurrent) {
          this.statusOfReservesCurrent =
            new RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE(
              res.statusOfReservesCurrent
            );
        }
        if (res.fiveYearProjection) {
          this.reserveupdatefiveyearprojectionBody =
            new RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection(
              res.fiveYearProjection
            );
        }
        if (res.companyAnnualProduction) {
          this.reserveUpdateOilCondensateCompanyAnnualProductionBody =
            new RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION(
              res.companyAnnualProduction
            );
        }
        if (res.reservesAddition) {
          this.reserveUpdateOilCondensateReservesAdditionBody =
            new RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition(
              res.reservesAddition
            );
        }
        if (res.reservesDecline) {
          this.reserveUpdateOilCondensateReservesDeclineBody =
            new RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE(
              res.reservesDecline
            );
        }
        if (res.reservesReplacementRatio) {
          this.reserveReplacementRatioBody =
            new POST_RESERVES_REPLACEMENT_RATIO(res.reservesReplacementRatio);
        }
        if (res.reserveDepletionRate) {
          this.reserveUpdateDepletionRateBody =
            new RESERVES_UPDATES_DEPLETION_RATE(res.reserveDepletionRate);
        }
        if (res.reserveLifeIndices) {
          this.reserveUpdateLifeIndexBody = new RESERVES_UPDATES_LIFE_INDEX(
            res.reserveLifeIndices
          );
        }
        this.cd.markForCheck();
      });
  }

  getReserveUpdateDepletionRate() {
    this.workprogram
      .getReserveUpdateDepletionRate(
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
            'Something went wrong while trying to fetch data.',
            'Error',
            'error'
          );
        },
      });
  }

  saveReserveUpdatePreceeding() {
    console.log('proceeding', this.statusOfReservesPreceeding);
    this.workprogram
      .saveReserveUpdatePreceeding(
        this.statusOfReservesPreceeding,
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

  saveReserveUpdateCurrent() {
    this.workprogram
      .saveReserveUpdateCurrent(
        this.statusOfReservesCurrent,
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

  getSWPR() {
    if (
      this.genk.OmlName === undefined ||
      this.genk.wpYear === undefined
      // this.genk.fieldName === undefined
    )
      return;

    this.workprogram
      .getFormFiveSWPR(this.genk.OmlName, this.genk.wpYear, this.genk.fieldName)
      .subscribe((res) => {
        if (res[0]) {
          this.planningMinimumRequirementBody = res[0].data;
        }
        this.cd.markForCheck();
      });
  }

  Submit_planningMinimumRequirement() {
    this.workprogram
      .post_planningMinimumRequirement(
        this.planningMinimumRequirementBody,
        this.genk.wpYear,
        this.genk.OmlName,
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSWPR();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  onSubmit() {
    return null;
  }
}
