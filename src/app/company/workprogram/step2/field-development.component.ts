import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';
import {
  FIELD_DEVELOPMENT_PLAN,
  FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERf,
} from 'src/app/models/step2-FIPR.model';
import { OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION } from 'src/app/models/step2-FIPR.model';
import { AuthenticationService, ModalService } from 'src/app/services';
import { GenericService, IConcession } from 'src/app/services/generic.services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './field-development.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPFieldDevelopmentComponent implements OnInit {
  public disableForm: boolean = true;
  public SBUTABLE = SBUTABLE;

  public FieldDevelopmentForm: FormGroup;
  public FieldDevelopmeentExcessiveReserveForm: FormGroup;
  public UnitizationForm: FormGroup;
  public unitizationBody: OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION =
    new OIL_CONDENSATE_PRODUCTION_ACTIVITIES_UNITIZATION();

  public fielddevelopmentexcessivereserveBody: FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERf =
    new FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERf();

  public fielddevelopmentBody = new FIELD_DEVELOPMENT_PLAN();
  public approved_FDP_Document: any;
  public wkpYear: string;
  public wkpYearList = [];
  public concessionHeld: string;
  public concessionHeldList = [];
  public genk: GenericService;
  public submitted = false;
  public columnHeader = [];
  public columnValue = [];
  public isTabVisible = false;

  public FDPFile?: File = null;
  public UUOAFile?: File = null;
  public mediatype = 'doc';
  public FDPNewName: string;
  public UUOANameDoc: string;
  public UUOANewName: string;
  public FDPNameDoc: string;

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
      this.getFDP();
    });
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP2';
    this.FieldDevelopmentForm = new FormGroup({
      how_many_fields_in_concession: new FormControl(
        this.fielddevelopmentBody.how_many_fields_in_concession,
        [Validators.required]
      ),
      how_many_fields_have_approved_FDP: new FormControl(
        this.fielddevelopmentBody.how_many_fields_have_approved_FDP,
        [Validators.required]
      ),
      which_fields_do_you_plan_to_submit_an_FDP: new FormControl(
        this.fielddevelopmentBody.which_fields_do_you_plan_to_submit_an_FDP,
        [Validators.required]
      ),
      proposed_number_of_wells_from_approved_FDP: new FormControl(
        this.fielddevelopmentBody._proposed_number_of_wells_from_approved_FDP,
        [Validators.required]
      ),
      no_of_wells_drilled_in_current_year: new FormControl(
        this.fielddevelopmentBody._no_of_wells_drilled_in_current_year,
        [Validators.required]
      ),
      number_of_wells_proposed_in_the_FDP: new FormControl(
        this.fielddevelopmentBody.number_of_wells_proposed_in_the_FDP,
        [Validators.required]
      ),
      noof_Producing_Fields: new FormControl(
        this.fielddevelopmentBody._noof_Producing_Fields,
        [Validators.required]
      ),
      uploaded_approved_FDP_Document: new FormControl(
        this.fielddevelopmentBody.uploaded_approved_FDP_Document,
        [Validators.required]
      ),
      are_they_oil_or_gas_wells: new FormControl(
        this.fielddevelopmentBody.are_they_oil_or_gas_wells,
        [Validators.required]
      ),
      status: new FormControl(this.fielddevelopmentBody.status, [
        Validators.required,
      ]),
    });

    this.FieldDevelopmeentExcessiveReserveForm = new FormGroup({
      proposed_Development_well_name: new FormControl(
        this.fielddevelopmentexcessivereserveBody.proposed_Development_well_name,
        [Validators.required]
      ),
      field_Name: new FormControl(
        this.fielddevelopmentexcessivereserveBody.field_Name,
        [Validators.required]
      ),
      oil: new FormControl(this.fielddevelopmentexcessivereserveBody._oil, [
        Validators.required,
      ]),
      gas: new FormControl(this.fielddevelopmentexcessivereserveBody._gas, [
        Validators.required,
      ]),
      condensate: new FormControl(
        this.fielddevelopmentexcessivereserveBody._condensate,
        [Validators.required]
      ),
    });

    this.UnitizationForm = new FormGroup({
      is_any_of_your_field_straddling: new FormControl(
        this.unitizationBody.is_any_of_your_field_straddling,
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
      has_DPR_been_notified: new FormControl(
        this.unitizationBody.has_DPR_been_notified,
        [Validators.required]
      ),
      has_the_other_party_been_notified: new FormControl(
        this.unitizationBody.has_the_other_party_been_notified,
        [Validators.required]
      ),
    });
    this.getFDP();
    this.cd.markForCheck();
  }

  getFDP() {
    this.workprogram
      .getFDP(this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe((res) => {
        if (res.fdp) {
          this.fielddevelopmentBody = new FIELD_DEVELOPMENT_PLAN(res.fdp);
        }
        if (res.fdpExcessiveReserves) {
          this.fielddevelopmentexcessivereserveBody =
            new FIELD_DEVELOPMENT_PLAN_EXCESSIVE_RESERf(
              res.fdpExcessiveReserves
            );
        }
        if (res.unitization) {
          this.unitizationBody = res.unitization;
          this.unitizationBody.is_any_of_your_field_straddling = 'NO';
        }

        this.cd.markForCheck();
      });

    this.genk.Concession$.subscribe((con: IConcession) => {
      if (!con) {
        this.disableForm = true;
        this.cd.markForCheck();
        return;
      }

      this.disableForm =
        this.genk.Fields?.length > 0
          ? !this.genk.Field.isEditable
          : !con.isEditable;
      this.cd.markForCheck();
    });
  }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.disableForm ? true : null;
  }

  getConcessionHeld() {}

  saveFDPDoc(DeFile: any) {
    this.FDPFile = <File>DeFile.target.files[0];
    if (!this.FDPFile) {
      return;
    }
    if (this.UUOAFile.size < 1 || this.UUOAFile.size > 1024 * 1024 * 50) {
      this.UnitizationForm.controls['UUOAFile'].setErrors({ incorrect: true });
      this.UUOAFile = null;
      return;
    } else {
      this.FieldDevelopmentForm.controls['FDPFile'].setErrors(null);
    }
    this.UUOANewName = this.gen.getExpDoc(
      this.UUOAFile.name,
      this.UUOAFile.type
    );
    this.UUOANameDoc = this.UUOANewName;
    //let dockind = this.gen.getExt(this.discoveryFile.name);
  }

  saveFieldDevelopmentPlan() {
    const formData = new FormData();

    // formData.append(
    //   'id',
    //   this.fielddevelopmentexcessivereserveBody.id.toString()
    // );
    formData.append(
      'how_many_fields_in_concession',
      (
        this.FieldDevelopmentForm.get('how_many_fields_in_concession')
          .value as string
      ).replace(/,/g, '')
    );
    formData.append(
      'how_many_fields_have_approved_FDP',
      this.FieldDevelopmentForm.get('how_many_fields_have_approved_FDP').value
    );
    formData.append(
      'which_fields_do_you_plan_to_submit_an_FDP',
      this.FieldDevelopmentForm.get('which_fields_do_you_plan_to_submit_an_FDP')
        .value
    );
    formData.append(
      'proposed_number_of_wells_from_approved_FDP',
      (
        this.FieldDevelopmentForm.get(
          'proposed_number_of_wells_from_approved_FDP'
        ).value as string
      ).replace(/,/g, '')
    );
    formData.append(
      'no_of_wells_drilled_in_current_year',
      (
        this.FieldDevelopmentForm.get('no_of_wells_drilled_in_current_year')
          .value as string
      ).replace(/,/g, '')
    );
    formData.append(
      'number_of_wells_proposed_in_the_FDP',
      (
        this.FieldDevelopmentForm.get('number_of_wells_proposed_in_the_FDP')
          .value as string
      ).replace(/,/g, '')
    );
    formData.append(
      'noof_Producing_Fields',
      (
        this.FieldDevelopmentForm.get('noof_Producing_Fields').value as string
      ).replace(/,/g, '')
    );
    formData.append(
      'uploaded_approved_FDP_Document',
      this.approved_FDP_Document
    );
    formData.append(
      'are_they_oil_or_gas_wells',
      this.FieldDevelopmentForm.get('are_they_oil_or_gas_wells').value
    );
    formData.append('status', this.FieldDevelopmentForm.get('status').value);

    this.workprogram
      .saveFDP(
        formData as any,
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

  onFileChange(event: any) {
    this.approved_FDP_Document = event.target.files[0];
  }

  saveFieldDevelopmentExpectedReserves() {
    debugger;
    this.workprogram
      .saveFieldDevelopmentExpectedReserves(
        this.fielddevelopmentexcessivereserveBody,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe({
        next: (res) => {
          debugger;
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

  saveUnitization() {
    this.workprogram
      .saveUnitization(
        this.unitizationBody,
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
      formDat.append('FDPFile', this.FDPFile, this.FDPNewName);
    }

    this.workprogram
      .saveFDP(
        formDat as any,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName
      )
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.message, 'success');
      });
  }
}
