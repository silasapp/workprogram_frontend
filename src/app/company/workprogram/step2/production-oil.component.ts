import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NDR,
  OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION,
  OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED,
  OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity,
  OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION,
  OIL_CONDENSATE_PRODUCTION_ACTIVITy,
  OIL_CONDENSATE_PRODUCTION_ACTIVITY,
} from 'src/app/models/step2-FIPR.model';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './production-oil.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPProductionOilComponent implements OnInit {
  public disableForm: boolean = false;
  ProductionOilForm: FormGroup;
  productionoilBody: OIL_CONDENSATE_PRODUCTION_ACTIVITy =
    {} as OIL_CONDENSATE_PRODUCTION_ACTIVITy;
  monthlyActivityForm: FormGroup;
  monthlyactivityBody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity =
    {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity;
  monthlyactivityData: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity[];
  ProposedMonthlyForm: FormGroup;
  proposedmonthlyBody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED =
    {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED;
  UnitizationForm: FormGroup;
  unitizationBody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION =
    {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION;
  fiveYearForecastForm: FormGroup;
  fiveYearForecastBody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION =
    {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION;
  wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;
  proposedData: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED[];
  monthlyData: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED[];

  PUAFile?: File = null;
  YPFFile?: File = null;
  UUOAFile?: File = null;
  mediatype = 'doc';
  PUANewName: string;
  UUOANameDoc: string;
  UUOANewName: string;
  PUANameDoc: string;
  YPFNewName: string;
  YPFNameDoc: string;

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
    });
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP2';
    this.ProductionOilForm = new FormGroup({
      oil_Royalty_Payment: new FormControl(
        this.productionoilBody.oil_Royalty_Payment,
        [Validators.required]
      ),
      actual_year: new FormControl(this.productionoilBody.actual_year, [
        Validators.required,
      ]),
      deferment: new FormControl(this.productionoilBody.deferment, [
        Validators.required,
      ]),
      forecast: new FormControl(this.productionoilBody.forecast, [
        Validators.required,
      ]),
      cost_Barrel: new FormControl(this.productionoilBody.cost_Barrel, [
        Validators.required,
      ]),
      total_Reconciled_National_Crude_Oil_Production: new FormControl(
        this.productionoilBody.total_Reconciled_National_Crude_Oil_Production,
        [Validators.required]
      ),
      gas_AG: new FormControl(this.productionoilBody.gas_AG, [
        Validators.required,
      ]),
      gas_NAG: new FormControl(this.productionoilBody.gas_NAG, [
        Validators.required,
      ]),
      //total_Reconciled_National_Crude_Oil_Production: new FormControl(this.productionoilBody.total_Reconciled_National_Crude_Oil_Production,[Validators.required]),
    });

    this.monthlyActivityForm = new FormGroup({
      production_month: new FormControl(
        this.monthlyactivityBody.production_month,
        [Validators.required]
      ),
      production: new FormControl(this.monthlyactivityBody.production, [
        Validators.required,
      ]),
      avg_Daily_Production: new FormControl(
        this.monthlyactivityBody.avg_Daily_Production,
        [Validators.required]
      ),
      gas_AG: new FormControl(this.monthlyactivityBody.gas_AG, [
        Validators.required,
      ]),
      gas_NAG: new FormControl(this.monthlyactivityBody.gas_NAG, [
        Validators.required,
      ]),
    });

    this.ProposedMonthlyForm = new FormGroup({
      production_month: new FormControl(
        this.proposedmonthlyBody.production_month,
        [Validators.required]
      ),
      production: new FormControl(this.proposedmonthlyBody.production, [
        Validators.required,
      ]),
      avg_Daily_Production: new FormControl(
        this.proposedmonthlyBody.avg_Daily_Production,
        [Validators.required]
      ),
      gas_AG: new FormControl(this.proposedmonthlyBody.gas_AG, [
        Validators.required,
      ]),
      gas_NAG: new FormControl(this.proposedmonthlyBody.gas_NAG, [
        Validators.required,
      ]),
    });

    this.fiveYearForecastForm = new FormGroup({
      fiveyear_Timeline: new FormControl(
        this.fiveYearForecastBody.fiveyear_Timeline,
        [Validators.required]
      ),
      fiveyear_Oil: new FormControl(this.fiveYearForecastBody.fiveyear_Oil, [
        Validators.required,
      ]),
      fiveyear_Condensate: new FormControl(
        this.fiveYearForecastBody.fiveyear_Condensate,
        [Validators.required]
      ),
      fiveyear_AG: new FormControl(this.fiveYearForecastBody.fiveyear_AG, [
        Validators.required,
      ]),
      fiveyear_NAG: new FormControl(this.fiveYearForecastBody.fiveyear_NAG, [
        Validators.required,
      ]),
      YPFFile: new FormControl(this.YPFFile, [Validators.required]),
    });

    this.UnitizationForm = new FormGroup(
      {
        is_any_of_your_field_straddling: new FormControl(
          this.unitizationBody.is_any_of_your_field_straddling,
          [Validators.required]
        ),
        straddling_Field_OP: new FormControl(
          this.unitizationBody.straddling_Field_OP,
          [Validators.required]
        ),
        what_concession_field_straddling: new FormControl(
          this.unitizationBody.what_concession_field_straddling,
          [Validators.required]
        ),
        straddle_field_producing: new FormControl(
          this.unitizationBody.straddle_field_producing,
          [Validators.required]
        ),
        straddling_Fields_OC: new FormControl(
          this.unitizationBody.straddling_Fields_OC,
          [Validators.required]
        ),
        prod_Status_OC: new FormControl(this.unitizationBody.prod_Status_OC, [
          Validators.required,
        ]),
        prod_Status_OP: new FormControl(this.unitizationBody.prod_Status_OP, [
          Validators.required,
        ]),
        company_Name_OP: new FormControl(this.unitizationBody.company_Name_OP, [
          Validators.required,
        ]),
        how_many_fields_straddle: new FormControl(
          this.unitizationBody.how_many_fields_straddle,
          [Validators.required]
        ),
        has_DPR_been_notified: new FormControl(
          this.unitizationBody.has_DPR_been_notified,
          [Validators.required]
        ),
        has_the_other_party_been_notified: new FormControl(
          this.unitizationBody.has_the_other_party_been_notified,
          [Validators.required]
        ),
        has_the_CA_been_signed: new FormControl(
          this.unitizationBody.has_the_CA_been_signed,
          [Validators.required]
        ),
        committees_been_inaugurated: new FormControl(
          this.unitizationBody.committees_been_inaugurated,
          [Validators.required]
        ),
        participation_been_determined: new FormControl(
          this.unitizationBody.participation_been_determined,
          [Validators.required]
        ),
        is_there_a_Joint_Development: new FormControl(
          this.unitizationBody.is_there_a_Joint_Development,
          [Validators.required]
        ),
        has_the_PUA_been_signed: new FormControl(
          this.unitizationBody.has_the_PUA_been_signed,
          [Validators.required]
        ),
        has_the_UUOA_been_signed: new FormControl(
          this.unitizationBody.has_the_UUOA_been_signed,
          [Validators.required]
        ),
        PUAFormFile: new FormControl(this.PUAFile, [Validators.required]),
        UUOAFormFile: new FormControl(this.UUOAFile, [Validators.required]),
      },
      {}
    );

    this.getOilProduction();
  }

  get f() {
    return this.UnitizationForm.controls;
  }

  getOilProduction() {
    this.workprogram
      .getOilProduction(
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        if (res.oilCondensateProduction) {
          this.productionoilBody = res.oilCondensateProduction;
        }

        if (res.oilCondensateProductionMonthly) {
          this.monthlyactivityData = res.oilCondensateProductionMonthly;
          this.monthlyactivityBody = res.oilCondensateProductionMonthly[0];
        }

        if (res.oilCondensateProductionMonthlyProposed) {
          this.proposedmonthlyBody = res.oilCondensateProductionMonthlyProposed;
        }

        if (res.oilCondensateFiveYears) {
          this.fiveYearForecastBody = res.oilCondensateFiveYears;
        }
        this.cd.markForCheck();
      });
  }

  saveProduction() {
    this.productionoilBody.cost_Barrel =
      this.productionoilBody.cost_Barrel.replace(/,/g, '');
    this.workprogram
      .saveOilProduction(
        this.productionoilBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.popText, 'success');
      });
  }

  saveMonthlyActivity() {
    this.workprogram
      .saveMonthlyActivity(
        this.monthlyactivityBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.popText, 'success');
      });
  }

  saveProposedActivity() {
    this.proposedmonthlyBody.id = 0;
    this.workprogram
      .saveProposedActivity(
        this.proposedmonthlyBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.popText, 'success');
      });
  }

  savePUADoc(DeFile: any) {
    this.PUAFile = <File>DeFile.target.files[0];
    if (!this.PUAFile) {
      return;
    }
    if (this.PUAFile.size < 1 || this.PUAFile.size > 1024 * 1024 * 50) {
      this.UnitizationForm.controls['PUAFile'].setErrors({ incorrect: true });
      this.PUAFile = null;
      return;
    } else {
      this.UnitizationForm.controls['PUAFile'].setErrors(null);
    }
    this.PUANewName = this.gen.getExpDoc(this.PUAFile.name, this.PUAFile.type);
    this.PUANameDoc = this.PUANewName;
    //let dockind = this.gen.getExt(this.hydrocarbonFile.name);
  }

  saveUUAODoc(DeFile: any) {
    this.UUOAFile = <File>DeFile.target.files[0];
    if (!this.UUOAFile) {
      return;
    }
    if (this.UUOAFile.size < 1 || this.UUOAFile.size > 1024 * 1024 * 50) {
      this.UnitizationForm.controls['UUOAFile'].setErrors({ incorrect: true });
      this.UUOAFile = null;
      return;
    } else {
      this.UnitizationForm.controls['UUOAFile'].setErrors(null);
    }
    this.UUOANewName = this.gen.getExpDoc(
      this.UUOAFile.name,
      this.UUOAFile.type
    );
    this.UUOANameDoc = this.UUOANewName;
    //let dockind = this.gen.getExt(this.discoveryFile.name);
  }

  saveYPFDoc(DeFile: any) {
    this.YPFFile = <File>DeFile.target.files[0];
    if (!this.YPFFile) {
      return;
    }
    if (this.YPFFile.size < 1 || this.YPFFile.size > 1024 * 1024 * 50) {
      this.fiveYearForecastForm.controls['YPFFile'].setErrors({
        incorrect: true,
      });
      this.YPFFile = null;
      return;
    } else {
      this.fiveYearForecastForm.controls['YPFFile'].setErrors(null);
    }
    this.YPFNewName = this.gen.getExpDoc(this.YPFFile.name, this.YPFFile.type);
    this.YPFNameDoc = this.YPFNewName;
    //let dockind = this.gen.getExt(this.discoveryFile.name);
  }

  saveUnitization() {
    const formDat: FormData = new FormData();
    for (const key in this.unitizationBody) {
      if (this.unitizationBody[key]) {
        formDat.append(key.toString(), this.unitizationBody[key]);
      }
      if (key.toString() === 'id') {
        formDat.delete(key);
      }
    }

    if (this.UUOAFile) {
      formDat.append('UUOAfile', this.UUOAFile, this.UUOANewName);
    }

    if (this.PUAFile) {
      formDat.append('PUAfile', this.PUAFile, this.PUANewName);
    }
    //this.workprogram.saveUnitization(formDat, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName).subscribe(res => {});
  }

  saveFiveYearForecast() {
    const formDat: FormData = new FormData();
    for (const key in this.fiveYearForecastBody) {
      if (this.fiveYearForecastBody[key]) {
        formDat.append(key.toString(), this.fiveYearForecastBody[key]);
      }
      if (key.toString() === 'id') {
        formDat.delete(key);
      }
    }
    if (this.YPFFile) {
      formDat.append('YPFfile', this.YPFFile, this.YPFNewName);
    }

    //this.workprogram.saveFiveYearForecast(formDat, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName).subscribe(res => {});
  }

  changeProposedMonth(e) {
    //
    let month = e.target.value;
    this.proposedmonthlyBody =
      {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED;
    this.proposedmonthlyBody =
      this.proposedData.filter((res) => {
        return res.production_month === month;
      })[0] ??
      ({} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED);
    this.proposedmonthlyBody.production_month = month;
    this.cd.markForCheck();
  }
}
