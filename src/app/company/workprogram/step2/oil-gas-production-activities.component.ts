import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NDR, OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION, OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED, OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity, OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION, OIL_CONDENSATE_PRODUCTION_ACTIVITy, OIL_CONDENSATE_PRODUCTION_ACTIVITY } from 'src/app/models/step2-FIPR.model';
import { FIELD_DEVELOPMENT_PLAN, GAS_PRODUCTION_ACTIVITY } from 'src/app/models/step2-FIPR.model';
import { AuthenticationService, GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: 'oil-gas-production-activities.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OilGasProductionActivitiesComponent implements OnInit {
  Oil_ProductionForm: FormGroup;
  productionoilBody: OIL_CONDENSATE_PRODUCTION_ACTIVITy = {} as OIL_CONDENSATE_PRODUCTION_ACTIVITy;
  monthlyActivityForm: FormGroup;
  monthlyactivityBody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity = {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity;
  monthlyactivityData: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity[];
  ProposedMonthlyForm: FormGroup;
  proposedmonthlyBody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED = {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED;
  proposedmonthlyData: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED[];
  fiveYearData: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION[];
  fiveYearForecastForm: FormGroup;
  fiveYearForecastBody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION = {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION;


  GasProductionForm: FormGroup;
  gasproductionBody: GAS_PRODUCTION_ACTIVITY = {} as GAS_PRODUCTION_ACTIVITY;

  wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;

YPFFile?: File = null;
mediatype = 'doc';
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
    this.modalService.concessionSitu
    .subscribe(res => {
      // this.getConcessionHeld();
    });

   }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP2';

    this.Oil_ProductionForm = new FormGroup({
      oil_Royalty_Payment: new FormControl(this.productionoilBody.oil_Royalty_Payment,[Validators.required]),
      deferment: new FormControl(this.productionoilBody.deferment,[Validators.required]),
      forecast: new FormControl(this.productionoilBody.forecast,[Validators.required]),
      cost_Barrel: new FormControl(this.productionoilBody.cost_Barrel,[Validators.required]),
      total_Reconciled_National_Crude_Oil_Production: new FormControl(this.productionoilBody.total_Reconciled_National_Crude_Oil_Production,[Validators.required]),
      gas_AG: new FormControl(this.productionoilBody.gas_AG,[Validators.required]),
      gas_NAG: new FormControl(this.productionoilBody.gas_NAG,[Validators.required]),
      //total_Reconciled_National_Crude_Oil_Production: new FormControl(this.productionoilBody.total_Reconciled_National_Crude_Oil_Production,[Validators.required]),
  });

  this.monthlyActivityForm = new FormGroup({
    production_month: new FormControl(this.monthlyactivityBody.production_month,[Validators.required]),
    production: new FormControl(this.monthlyactivityBody.production,[Validators.required]),
    avg_Daily_Production: new FormControl(this.monthlyactivityBody.avg_Daily_Production,[Validators.required]),
    gas_AG: new FormControl(this.monthlyactivityBody.gas_AG,[Validators.required]),
    gas_NAG: new FormControl(this.monthlyactivityBody.gas_NAG,[Validators.required])
});

this.ProposedMonthlyForm = new FormGroup({
  production_month: new FormControl(this.proposedmonthlyBody.production_month,[Validators.required]),
    production: new FormControl(this.proposedmonthlyBody.production,[Validators.required]),
    avg_Daily_Production: new FormControl(this.proposedmonthlyBody.avg_Daily_Production,[Validators.required]),
    gas_AG: new FormControl(this.proposedmonthlyBody.gas_AG,[Validators.required]),
    gas_NAG: new FormControl(this.proposedmonthlyBody.gas_NAG,[Validators.required])
});

this.fiveYearForecastForm = new FormGroup({
  fiveyear_Timeline: new FormControl(this.fiveYearForecastBody.fiveyear_Timeline,[Validators.required]),
  fiveyear_Oil: new FormControl(this.fiveYearForecastBody.fiveyear_Oil,[Validators.required]),
  fiveyear_Condensate: new FormControl(this.fiveYearForecastBody.fiveyear_Condensate,[Validators.required]),
  fiveyear_AG: new FormControl(this.fiveYearForecastBody.fiveyear_AG,[Validators.required]),
  fiveyear_NAG: new FormControl(this.fiveYearForecastBody.fiveyear_NAG,[Validators.required]),
  'YPFFile': new FormControl(this.YPFFile, [Validators.required])
});

    this.GasProductionForm = new FormGroup(
      {
        current_Actual_Year: new FormControl(this.gasproductionBody.current_Actual_Year, [Validators.required]),
        utilized: new FormControl(this.gasproductionBody.utilized, [Validators.required]),
        flared: new FormControl(this.gasproductionBody.flared,[Validators.required]),
        proposed_production: new FormControl(this.gasproductionBody.proposed_production, [Validators.required]),
        proposed_utilization: new FormControl(this.gasproductionBody.proposed_utilization, [Validators.required]),
        proposed_flaring: new FormControl(this.gasproductionBody.proposed_flaring, [Validators.required]),
        no_of_gas_well_planned: new FormControl(this.gasproductionBody.no_of_gas_well_planned, [Validators.required]),
        no_of_gas_well_drilled: new FormControl(this.gasproductionBody.no_of_gas_well_drilled, [Validators.required]),
        is_there_a_gas_plant: new FormControl(this.gasproductionBody.is_there_a_gas_plant, [Validators.required]),
        domestic_gas_obligation: new FormControl(this.gasproductionBody.domestic_gas_obligation, [Validators.required]),
        no_of_plannned_projects: new FormControl(this.gasproductionBody.no_of_plannned_projects, [Validators.required]),
        is_there_a_license_to_operate_a_gas_plant: new FormControl(this.gasproductionBody.is_there_a_license_to_operate_a_gas_plant, [Validators.required]),
        gas_flare_Royalty_payment: new FormControl(this.gasproductionBody.gas_flare_Royalty_payment, [Validators.required]),
        gas_Sales_Royalty_Payment: new FormControl(this.gasproductionBody.gas_Sales_Royalty_Payment, [Validators.required]),
        number_of_gas_wells_completed: new FormControl(this.gasproductionBody.number_of_gas_wells_completed, [Validators.required]),
        number_of_gas_wells_tested: new FormControl(this.gasproductionBody.number_of_gas_wells_tested, [Validators.required]),
        domestic_Gas_Supply_DSO: new FormControl(this.gasproductionBody.domestic_Gas_Supply_DSO, [Validators.required]),
        projects_planned_for_Domestic_supply_Gas_to_power_industries_etc: new FormControl(this.gasproductionBody.projects_planned_for_Domestic_supply_Gas_to_power_industries_etc, [Validators.required]),
        domestic_Gas_obligation_met: new FormControl(this.gasproductionBody.domestic_Gas_obligation_met, [Validators.required]),
        remarks_: new FormControl(this.gasproductionBody.remarks_, [Validators.required])
      }, {});

      this.getOilProduction();
      this.getGasProduction();
  }

  get f() {
    return this.fiveYearForecastForm.controls;
  }

    getGasProduction() {
      this.workprogram.getGasProduction(this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe(res => {
        if (res.gasProductionActivity) {
          this.gasproductionBody = res.gasProductionActivity;
        }
        this.cd.markForCheck();
      });
    }

    saveGasProduction() {
      this.workprogram.saveGasProduction(this.gasproductionBody, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe(res => {
        this.modalService.logNotice("Success", res.popText, 'success');
      });
    }

    getOilProduction() {
      this.workprogram.getOilProduction(this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
        .subscribe(res => {
          if (res.oilCondensateProduction) {
            this.productionoilBody = res.oilCondensateProduction;
          }

          if (res.oilCondensateProductionMonthly) {
            this.monthlyactivityData = res.oilCondensateProductionMonthly;
            this.monthlyactivityBody = res.oilCondensateProductionMonthly[0];
          }

          if (res.oilCondensateProductionMonthlyProposed) {
            this.proposedmonthlyData = res.oilCondensateProductionMonthlyProposed;
            this.proposedmonthlyBody = res.oilCondensateProductionMonthlyProposed[0];
          }

          if (res.oilCondensateFiveYears) {
            this.fiveYearData = res.oilCondensateFiveYears;
            this.fiveYearForecastBody = res.oilCondensateFiveYears[0];
          }
          this.cd.markForCheck();
        });
    }

    saveProduction() {
      this.productionoilBody.id = 0;
      this.productionoilBody.cost_Barrel = this.productionoilBody.cost_Barrel.replace(/,/g, '');
      this.workprogram.saveOilProduction(this.productionoilBody, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe(res => {
        this.modalService.logNotice("Success", res.popText, 'success');
      });
    }

    saveMonthlyActivity() {
      this.monthlyactivityBody.id = 0;
      this.workprogram.saveMonthlyActivity(this.monthlyactivityBody, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe(res => {
        this.modalService.logNotice("Success", res.popText, 'success');
      });
    }

    saveProposedActivity() {
      this.proposedmonthlyBody.id = 0;
      this.workprogram.saveProposedActivity(this.proposedmonthlyBody, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe(res => {
        this.modalService.logNotice("Success", res.popText, 'success');
      });
    }

    changeActualMonth(e) {
      //debugger;
      let month = e.target.value;
      this.monthlyactivityBody = {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity;
      this.monthlyactivityBody = this.monthlyactivityData.filter(res => {
        return res.production_month === month;
      })[0] ?? {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activity;
      this.monthlyactivityBody.production_month = month;
      this.cd.markForCheck();
    }

    changeProposedMonth(e) {
      //debugger;
      let month = e.target.value;
      this.proposedmonthlyBody = {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED;
      this.proposedmonthlyBody = this.proposedmonthlyData.filter(res => {
        return res.production_month === month;
      })[0] ?? {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_PROPOSED;
      this.proposedmonthlyBody.production_month = month;
      this.cd.markForCheck();
    }

    changeFiveYearProjection(e) {
      //debugger;
      let year = e.target.value;
      this.fiveYearForecastBody = {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION;
      this.fiveYearForecastBody = this.fiveYearData.filter(res => {
        return res.fiveyear_Timeline === year;
      })[0] ?? {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_FIVE_YEAR_PROJECTION;
      this.fiveYearForecastBody.fiveyear_Timeline = year;
      this.cd.markForCheck();
    }

    saveYPFDoc(DeFile: any) {
      debugger;
      this.YPFFile = <File>DeFile.target.files[0];
      if (!this.YPFFile) {
        return;
      }
      if (this.YPFFile.size < 1 || this.YPFFile.size > 1024 * 1024 * 50) {
        this.fiveYearForecastForm.controls['YPFFile'].setErrors({ 'incorrect': true });
        this.YPFFile = null;
        return;
      } else {
        this.fiveYearForecastForm.controls['YPFFile'].setErrors(null);
      }
      this.YPFNewName = this.gen.getExpDoc(this.YPFFile.name, this.YPFFile.type);
      this.YPFNameDoc = this.YPFNewName;
      //let dockind = this.gen.getExt(this.discoveryFile.name);
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
        formDat.append("YPFfile", this.YPFFile, this.YPFNewName);
      }

      this.workprogram.saveFiveYearForecast(formDat, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName).subscribe(res => {
        this.modalService.logNotice("Success", res.popText, 'success');
      });
    }
  }
