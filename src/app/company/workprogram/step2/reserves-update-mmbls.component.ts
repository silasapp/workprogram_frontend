import { object } from '@amcharts/amcharts5';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';
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
import { STRATEGIC_PLANS_ON_COMPANY_BASES } from 'src/app/models/step4-NCQ.model';
import { PLANNING_MINIMUM_REQUIREMENT } from 'src/app/models/step5_sdcp.model';
import {
  AuthenticationService,
  GenericService,
  IConcession,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './reserves-update-mmbls.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPReserveUpdateComponent implements OnInit {
  public SBUTABLE = SBUTABLE;

  ReserveUpdatePreceedingForm: FormGroup;
  ReserveUpdateCurrentForm: FormGroup;
  ReserveUpdateFiveYearProjectionForm: FormGroup;
  reserveUpdateOilCondensateCompanyAnnualProductionForm;
  reserveupdateOilCondensateReservesAdditionForm: FormGroup;
  reserveUpdateOilCondensateReservesDeclineForm: FormGroup;
  reserveReplacementRatioForm: FormGroup;
  reserveUpdateDepletionRateForm: FormGroup;
  reserveUpdateLifeIndexForm: FormGroup;
  preceedingYearsValues: any[];
  CurrentYearsValues: any[];
  FiveYearReservesProjectionValues: any[];

  public isReserveUpdatePreceedingFormSubmitted = false;
  public isReserveUpdateCurrentFormSubmitted = false;
  public isReserveUpdateFiveYearProjectionFormSubmitted = false;
  public isReserveupdateOilCondensateReservesAdditionForm = false;
  public isReserveUpdateOilCondensateReservesDeclineFormSubmitted = false;
  public isReserveReplacementRatioFormSubmitted = false;
  public isReserveUpdateDepletionRateFormSubmitted = false;
  public isReserveUpdateLifeIndexFormSubmitted = false;
  public isPlanningMinimumRequirementFormSubmitted = false;

  public planningMinimumRequirementForm: FormGroup;

  public planningMinimumRequirementBody: PLANNING_MINIMUM_REQUIREMENT ={} as PLANNING_MINIMUM_REQUIREMENT;
  reserveUpdateLifeIndexBody = new RESERVES_UPDATES_LIFE_INDEX();
  reserveUpdateDepletionRateBody = new RESERVES_UPDATES_DEPLETION_RATE();
  reserveReplacementRatioBody = new POST_RESERVES_REPLACEMENT_RATIO();
  reserveUpdateOilCondensateReservesDeclineBody = new RESERVES_UPDATES_OIL_CONDENSATE_Reserves_DECLINE();
  reserveUpdateOilCondensateReservesAdditionBody = new RESERVES_UPDATES_OIL_CONDENSATE_Reserves_Addition();
  reserveUpdateOilCondensateCompanyAnnualProductionBody = new RESERVES_UPDATES_OIL_CONDENSATE_Company_Annual_PRODUCTION();
  statusOfReservesPreceeding = new RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE();
  statusOfReservesCurrent = new RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE();

  reserveupdateBody: RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE = {} as RESERVE_UPDATES_OIL_CONDENSATE_STATUS_OF_RESERVE;
  reserveupdatefiveyearprojectionBody = new RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection();

  reservesProjection = new RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection();

  wkpYear: string;
  _wkpYear: number;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;
  projectionYear : string;

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
      company_Reserves_Year: new FormControl(
        this.statusOfReservesPreceeding.company_Reserves_Year,
        [Validators.required]
      ),
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
      // company_Reserves_AnnualOilProduction: new FormControl(
      //   this.statusOfReservesPreceeding._company_Reserves_AnnualOilProduction,
      //   [Validators.required]
      // ),
      // company_Reserves_AnnualCondensateProduction: new FormControl(
      //   this.statusOfReservesPreceeding._company_Reserves_AnnualCondensateProduction,
      //   [Validators.required]
      // ),
      // company_Reserves_AnnualGasAGProduction: new FormControl(
      //   this.statusOfReservesPreceeding._company_Reserves_AnnualGasAGProduction,
      //   [Validators.required]
      // ),
      // company_Reserves_AnnualGasNAGProduction: new FormControl(
      //   this.statusOfReservesPreceeding._company_Reserves_AnnualGasNAGProduction,
      //   [Validators.required]
      // ),
    });

    this.ReserveUpdateCurrentForm = new FormGroup({
      company_Reserves_Year: new FormControl(
        this.statusOfReservesCurrent.company_Reserves_Year,
        [Validators.required]
      ),
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
    if (this.genk.wpYear !== undefined)
      this._wkpYear = parseInt(this.genk.wpYear);
    this.getReserveUpdate();
    this.getSWPR();
    this.getPreceedsdingYearsValues();
    this.getCurrentYearsValues();
    this.getFiveProjectionYearsValues();
    this.getPlanningRequirement();
    this.cd.markForCheck();
  }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.genk.disableForm ? true : null;
  }

  public get ru() {
    return this.ReserveUpdatePreceedingForm.controls;
  }

  public get rc() {
    return this.ReserveUpdateCurrentForm.controls;
  }

  public get rf() {
    return this.ReserveUpdateFiveYearProjectionForm.controls;
  }

  public get ra() {
    return this.reserveupdateOilCondensateReservesAdditionForm.controls;
  }

  public get rd() {
    return this.reserveUpdateOilCondensateReservesDeclineForm.controls;
  }

  public get rr() {
    return this.reserveReplacementRatioForm.controls;
  }

  public get rdr() {
    return this.reserveUpdateDepletionRateForm.controls;
  }

  public get rli() {
    return this.reserveUpdateLifeIndexForm.controls;
  }

  public get p() {
    return this.planningMinimumRequirementForm.controls;
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
            this.ReserveUpdateFiveYearProjectionForm.controls['fiveyear_Projection_Year'].setValue(res.fiveYearProjection.fiveyear_Projection_Year)

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
          console.log(
            this.reserveUpdateOilCondensateReservesDeclineBody,
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

  getPreceedsdingYearsValues() {
    this.preceedingYearsValues = [];
    let year = this._wkpYear - 2;
    var num: number = 3;
    var i: number;
    for (i = 0; i < num; i++) {
      this.preceedingYearsValues[i] = year + i;
      //this.fiveYearsValues.push(++this.genk.wkProposedYear);
    }
  }

  getCurrentYearsValues() {
    this.CurrentYearsValues = [];
    let year = this._wkpYear;
    var num: number = 3;
    var i: number;
    for (i = 0; i < num; i++) {
      this.CurrentYearsValues[i] = this._wkpYear + i;
      //this.fiveYearsValues.push(++this.genk.wkProposedYear);
    }
  }

  getFiveProjectionYearsValues() {
    let year = this._wkpYear;
    this.FiveYearReservesProjectionValues = [];
    var num: number = 5;
    var i: number;
    for (i = 0; i < num; i++) {
      this.FiveYearReservesProjectionValues[i] = year + i + 1;
      //this.fiveYearsValues.push(++this.genk.wkProposedYear);
    }
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
    this.isReserveUpdatePreceedingFormSubmitted = true;
    if (this.ReserveUpdatePreceedingForm.invalid) return;
    this.genk.removeComma(this.ReserveUpdatePreceedingForm);
    this.workprogram
      .saveReserveUpdatePreceeding(
        this.ReserveUpdatePreceedingForm.value,
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
    console.log(this.ReserveUpdateCurrentForm);
    this.isReserveUpdateCurrentFormSubmitted = true;
    if (this.ReserveUpdateCurrentForm.invalid) return;
    this.genk.removeComma(this.ReserveUpdateCurrentForm);
    this.workprogram
      .saveReserveUpdateCurrent(
        this.ReserveUpdateCurrentForm.value,
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
    debugger;
    this.isReserveUpdateFiveYearProjectionFormSubmitted = false;
    if (this.ReserveUpdateFiveYearProjectionForm.invalid) return;
    this.genk.removeComma(this.ReserveUpdateFiveYearProjectionForm);
    this.workprogram
      .saveReserveUpdateFiveYearPorjection(
        this.ReserveUpdateFiveYearProjectionForm.value,
        this.ReserveUpdateFiveYearProjectionForm.controls['fiveyear_Projection_Year'].value,
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
    this.isReserveUpdateOilCondensateReservesDeclineFormSubmitted = true;
    this.isReserveupdateOilCondensateReservesAdditionForm = true;

    if (
      this.reserveUpdateOilCondensateReservesDeclineForm.invalid ||
      this.reserveupdateOilCondensateReservesAdditionForm.invalid
    )
      return;

      this.genk.removeComma(this.reserveupdateOilCondensateReservesAdditionForm);
      this.genk.removeComma(this.reserveUpdateOilCondensateReservesDeclineForm);
    forkJoin([
      this.workprogram.saveReserveUpdateOilCondensateCompanyAnnualProduction(
        this.reserveUpdateOilCondensateCompanyAnnualProductionForm.value,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      ),
      this.workprogram.saveUpdateOilCondensateReservesAddition(
        this.reserveupdateOilCondensateReservesAdditionForm.value,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      ),
      this.workprogram.saveUpdateOilCondensateReservesDecline(
        this.reserveUpdateOilCondensateReservesDeclineForm.value,
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
    this.isReserveReplacementRatioFormSubmitted = true;
    if (this.reserveReplacementRatioForm.invalid) return;
    this.genk.removeComma(this.reserveReplacementRatioForm);

    this.workprogram
      .saveReserveReplacementRatio(
        this.reserveReplacementRatioForm.value,
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
    this.isReserveUpdateDepletionRateFormSubmitted = true;
    if (this.reserveUpdateDepletionRateForm.invalid) return;
    this.genk.removeComma(this.reserveUpdateDepletionRateForm);
    this.workprogram
      .saveReserveUpdateDepletionRate(
        this.reserveUpdateDepletionRateForm.value,
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
    this.isReserveUpdateLifeIndexFormSubmitted = true;
    if (this.reserveUpdateLifeIndexForm.invalid) return;
    this.genk.removeComma(this.reserveUpdateLifeIndexForm);
    this.workprogram
      .saveReserveUpdateLifeIndex(
        this.reserveUpdateLifeIndexForm.value,
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
    this.isPlanningMinimumRequirementFormSubmitted = true;
    if (this.planningMinimumRequirementForm.invalid) return;
    this.genk.removeComma(this.planningMinimumRequirementForm);

    this.workprogram
      .post_planningMinimumRequirement(
        this.planningMinimumRequirementForm.value,
        this.genk.wpYear,
        this.genk.OmlName,
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getPlanningRequirement();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  getPlanningRequirement() {
    this.workprogram
      .getFormFiveSWPR(this.genk.OmlName, this.genk.wpYear, this.genk.fieldName)
      .subscribe((res) => {
        this.planningMinimumRequirementBody = res.data;
        console.log(this.planningMinimumRequirementBody, res);
        this.cd.markForCheck();
      });
  }

  onSubmit() {
    return null;
  }


  changeFiveYearProjection(e) {
    let activities = e.target.value;
    this.projectionYear = activities;
    this.reservesProjection = {} as RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection;
    this.workprogram.getReservesFiveYearProjection(this.projectionYear, this.genk.OmlName, this.genk.fieldName)
    .subscribe(res => {
      debugger;
      if (res.fiveYearProjection) {
        this.reserveupdatefiveyearprojectionBody._fiveyear_Projection_NAG = res.fiveYearProjection.fiveyear_Projection_NAG;
        this.reserveupdatefiveyearprojectionBody._fiveyear_Projection_AG = res.fiveYearProjection.fiveyear_Projection_AG;
        this.reserveupdatefiveyearprojectionBody._fiveyear_Projection_Oil = res.fiveYearProjection.fiveyear_Projection_Oil;
        this.reserveupdatefiveyearprojectionBody._fiveyear_Projection_Condensate = res.fiveYearProjection.fiveyear_Projection_Condensate;
        this.cd.markForCheck();
      } else {
        this.reserveupdatefiveyearprojectionBody = {} as RESERVE_UPDATES_OIL_CONDENSATE_Five_year_Projection;
        this.cd.markForCheck();
      }
    });
    //this.strategicplansBody = this.strategicData.filter((res) => {return res.activities === activities;})[0] ?? ({} as STRATEGIC_PLANS_ON_COMPANY_BASES);
    //this.strategicplansBody.activities = activities;
    this.cd.markForCheck();
  }
}
