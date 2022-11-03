import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FIELD_DEVELOPMENT_PLAN, FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE } from 'src/app/models/step2-FIPR.model';
import { OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION } from 'src/app/models/step2-FIPR.model';
import { AuthenticationService, ModalService } from 'src/app/services';
import { GenericService } from 'src/app/services/generic.services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './field-development.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SWPFieldDevelopmentComponent implements OnInit {
  FieldDevelopmentForm: FormGroup;
  FieldDevelopmeentExcessiveReserveForm: FormGroup;
  UnitizationForm: FormGroup;
  unitizationBody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION = {} as OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION;

  fielddevelopmentexcessivereserveBody: FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE = {} as FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERVE;
  fielddevelopmentBody: FIELD_DEVELOPMENT_PLAN = {} as FIELD_DEVELOPMENT_PLAN;
  wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;

  FDPFile?: File = null;
  UUOAFile?: File = null;
  mediatype = 'doc';
  FDPNewName: string;
  UUOANameDoc: string;
  UUOANewName: string;
  FDPNameDoc: string;

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
        this.getFDP();
      });
  }


  ngOnInit(): void {
    this.genk.activeStep = 'STEP2';
    this.FieldDevelopmentForm = new FormGroup(
      {
        how_many_fields_in_concession: new FormControl(this.fielddevelopmentBody.how_many_fields_in_concession, [Validators.required]),
        how_many_fields_have_approved_FDP: new FormControl(this.fielddevelopmentBody.how_many_fields_have_approved_FDP, [Validators.required]),
        which_fields_do_you_plan_to_submit_an_FDP: new FormControl(this.fielddevelopmentBody.which_fields_do_you_plan_to_submit_an_FDP, [Validators.required]),
        proposed_number_of_wells_from_approved_FDP: new FormControl(this.fielddevelopmentBody.proposed_number_of_wells_from_approved_FDP, [Validators.required]),
        no_of_wells_drilled_in_current_year: new FormControl(this.fielddevelopmentBody.no_of_wells_drilled_in_current_year, [Validators.required]),
        number_of_wells_proposed_in_the_FDP: new FormControl(this.fielddevelopmentBody.number_of_wells_proposed_in_the_FDP, [Validators.required]),
        noof_Producing_Fields: new FormControl(this.fielddevelopmentBody.noof_Producing_Fields, [Validators.required]),
        'FDPFile': new FormControl(this.FDPFile),
        are_they_oil_or_gas_wells: new FormControl(this.fielddevelopmentBody.are_they_oil_or_gas_wells, [Validators.required]),
        status: new FormControl(this.fielddevelopmentBody.status, [Validators.required]),

      }, {});

    this.FieldDevelopmeentExcessiveReserveForm = new FormGroup(
      {
        proposed_Development_well_name: new FormControl(this.fielddevelopmentexcessivereserveBody.proposed_Development_well_name, [Validators.required]),
        field_Name: new FormControl(this.fielddevelopmentexcessivereserveBody.field_Name, [Validators.required]),
        oil: new FormControl(this.fielddevelopmentexcessivereserveBody.oil, [Validators.required]),
        gas: new FormControl(this.fielddevelopmentexcessivereserveBody.gas, [Validators.required]),
        condensate: new FormControl(this.fielddevelopmentexcessivereserveBody.condensate, [Validators.required]),
      }, {});

    this.FieldDevelopmeentExcessiveReserveForm = new FormGroup(
      {
        proposed_Development_well_name: new FormControl(this.fielddevelopmentexcessivereserveBody.proposed_Development_well_name, [Validators.required]),
        field_Name: new FormControl(this.fielddevelopmentexcessivereserveBody.field_Name, [Validators.required]),
        oil: new FormControl(this.fielddevelopmentexcessivereserveBody.oil, [Validators.required]),
        gas: new FormControl(this.fielddevelopmentexcessivereserveBody.gas, [Validators.required]),
        condensate: new FormControl(this.fielddevelopmentexcessivereserveBody.condensate, [Validators.required]),
      }, {});

    this.getFDP();

    this.UnitizationForm = new FormGroup(
      {
        is_any_of_your_field_straddling: new FormControl(this.unitizationBody.is_any_of_your_field_straddling, [Validators.required]),
        what_concession_field_straddling: new FormControl(this.unitizationBody.what_concession_field_straddling, [Validators.required]),
        straddle_field_producing: new FormControl(this.unitizationBody.straddle_field_producing, [Validators.required]),
        has_DPR_been_notified: new FormControl(this.unitizationBody.has_DPR_been_notified, [Validators.required]),
        has_the_other_party_been_notified: new FormControl(this.unitizationBody.has_the_other_party_been_notified, [Validators.required]),
      }, {});
  }

  getFDP() {
    this.workprogram.getFDP(this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe(res => {
        if (res.fdp) {
          this.fielddevelopmentBody = res.fdp;
        }

        if (res.fdpExcessiveReserves) {
          this.fielddevelopmentexcessivereserveBody = res.fdpExcessiveReserves;
        }
        if (res.unitization) {
          this.unitizationBody = res.unitization;
        }


        this.cd.markForCheck();
      });
  }

  saveFDPDoc(DeFile: any) {
    this.FDPFile = <File>DeFile.target.files[0];
    if (!this.FDPFile) {
      return;
    }
    if (this.FDPFile.size < 1 || this.FDPFile.size > 1024 * 1024 * 50) {
      this.FieldDevelopmentForm.controls['FDPFile'].setErrors({ 'incorrect': true });
      this.FDPFile = null;
      return;
    } else {
      this.FieldDevelopmentForm.controls['FDPFile'].setErrors(null);
    }
    this.UUOANewName = this.gen.getExpDoc(this.FDPFile.name, this.FDPFile.type);
    this.FDPNameDoc = this.FDPNewName;
    //let dockind = this.gen.getExt(this.discoveryFile.name);
  }


  fdpSubmit() {
    const formDat: FormData = new FormData();
    for (const key in this.fielddevelopmentBody) {
      if (this.fielddevelopmentBody[key]) {
        formDat.append(key.toString(), this.fielddevelopmentBody[key]);
      }
      if (key.toString() === 'id') {
        formDat.delete(key);
      }
    }

    if (this.FDPFile) {
      formDat.append("FDPFile", this.FDPFile, this.FDPNewName);
    }

    this.workprogram.saveFDP(formDat, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName).subscribe(res => {
      this.modalService.logNotice("Success", res.message, 'success');
    });

  }

}
