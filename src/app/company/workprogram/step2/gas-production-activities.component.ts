import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FIELD_DEVELOPMENT_PLAN,
  GAS_PRODUCTION_ACTIVITY,
} from 'src/app/models/step2-FIPR.model';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './gas-production-activities.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPGasProductionComponent implements OnInit {
  public disableForm: boolean = false;
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
    this.GasProductionForm = new FormGroup(
      {
        current_Actual_Year: new FormControl(
          this.gasproductionBody.current_Actual_Year,
          [Validators.required]
        ),
        utilized: new FormControl(this.gasproductionBody.utilized, [
          Validators.required,
        ]),
        flared: new FormControl(this.gasproductionBody.flared, [
          Validators.required,
        ]),
        proposed_production: new FormControl(
          this.gasproductionBody.proposed_production,
          [Validators.required]
        ),
        proposed_utilization: new FormControl(
          this.gasproductionBody.proposed_utilization,
          [Validators.required]
        ),
        proposed_flaring: new FormControl(
          this.gasproductionBody.proposed_flaring,
          [Validators.required]
        ),
        no_of_gas_well_planned: new FormControl(
          this.gasproductionBody.no_of_gas_well_planned,
          [Validators.required]
        ),
        no_of_gas_well_drilled: new FormControl(
          this.gasproductionBody.no_of_gas_well_drilled,
          [Validators.required]
        ),
        is_there_a_gas_plant: new FormControl(
          this.gasproductionBody.is_there_a_gas_plant,
          [Validators.required]
        ),
        domestic_gas_obligation: new FormControl(
          this.gasproductionBody.domestic_gas_obligation,
          [Validators.required]
        ),
        no_of_plannned_projects: new FormControl(
          this.gasproductionBody.no_of_plannned_projects,
          [Validators.required]
        ),
        is_there_a_license_to_operate_a_gas_plant: new FormControl(
          this.gasproductionBody.is_there_a_license_to_operate_a_gas_plant,
          [Validators.required]
        ),
        gas_flare_Royalty_payment: new FormControl(
          this.gasproductionBody.gas_flare_Royalty_payment,
          [Validators.required]
        ),
        gas_Sales_Royalty_Payment: new FormControl(
          this.gasproductionBody.gas_Sales_Royalty_Payment,
          [Validators.required]
        ),
        number_of_gas_wells_completed: new FormControl(
          this.gasproductionBody.number_of_gas_wells_completed,
          [Validators.required]
        ),
        number_of_gas_wells_tested: new FormControl(
          this.gasproductionBody.number_of_gas_wells_tested,
          [Validators.required]
        ),
        domestic_Gas_Supply_DSO: new FormControl(
          this.gasproductionBody.domestic_Gas_Supply_DSO,
          [Validators.required]
        ),
        projects_planned_for_Domestic_supply_Gas_to_power_industries_etc:
          new FormControl(
            this.gasproductionBody.projects_planned_for_Domestic_supply_Gas_to_power_industries_etc,
            [Validators.required]
          ),
        domestic_Gas_obligation_met: new FormControl(
          this.gasproductionBody.domestic_Gas_obligation_met,
          [Validators.required]
        ),
        remarks_: new FormControl(this.gasproductionBody.remarks_, [
          Validators.required,
        ]),
      },
      {}
    );

    this.getGasProduction();
  }

  getGasProduction() {
    this.workprogram
      .getGasProduction(
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        if (res.gasProductionActivity) {
          this.gasproductionBody = res.gasProductionActivity;
        }
        this.cd.markForCheck();
      });
  }

  saveGasProduction() {
    this.workprogram
      .saveGasProduction(
        this.gasproductionBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.popText, 'success');
      });
  }
}
