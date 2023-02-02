import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  GEOPHYSICAL_ACTIVITIES_ACQUISITION,
  GEOPHYSICAL_ACTIVITIES_PROCESSING,
} from 'src/app/models/step1-geophysical.model';
import {
  AuthenticationService,
  GenericService,
  IConcession,
  IField,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './geophysical-activities.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPGeophysicalActivitiesComponent implements OnInit {
  public SBUTABLE = SBUTABLE;

  AcquisitionForm: FormGroup;
  ProcessingForm: FormGroup;
  quaterACOneData: GEOPHYSICAL_ACTIVITIES_ACQUISITION;
  quaterACTwoData: GEOPHYSICAL_ACTIVITIES_ACQUISITION;
  quaterACThreeData: GEOPHYSICAL_ACTIVITIES_ACQUISITION;
  quaterACFourData: GEOPHYSICAL_ACTIVITIES_ACQUISITION;

  quaterPROneData: GEOPHYSICAL_ACTIVITIES_PROCESSING;
  quaterPRTwoData: GEOPHYSICAL_ACTIVITIES_PROCESSING;
  quaterPRThreeData: GEOPHYSICAL_ACTIVITIES_PROCESSING;
  quaterPRFourData: GEOPHYSICAL_ACTIVITIES_PROCESSING;

  acquisitionBody: GEOPHYSICAL_ACTIVITIES_ACQUISITION =
    {} as GEOPHYSICAL_ACTIVITIES_ACQUISITION;
  processingBody: GEOPHYSICAL_ACTIVITIES_PROCESSING =
    {} as GEOPHYSICAL_ACTIVITIES_PROCESSING;
  genk: GenericService;
  quaterACOne = false;
  quaterACTwo = false;
  quaterACThree = false;
  quaterACFour = false;

  quaterPROne = false;
  quaterPRTwo = false;
  quaterPRThree = false;
  quaterPRFour = false;
  submitted = false;
  pSubmitted = false;
  currentACQuater = 1;
  currentPRQuater = 1;

  columnHeader = [];
  columnValue = [];
  isTabVisible = false;

  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      const rel = 'QUARTER ' + this.currentACQuater;
      this.getGeophysical(rel);
    });
    this.cd.markForCheck();
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP1';
    this.getGeophysical('QUARTER 1');

    this.AcquisitionForm = new FormGroup(
      {
        // actual_year_aquired_data: new FormControl(
        //   this.acquisitionBody.actual_year_aquired_data,
        //   [Validators.required]
        // ),
        // proposed_year_data: new FormControl(
        //   this.acquisitionBody.proposed_year_data,
        //   [Validators.required]
        // ),
        budeget_Allocation_NGN: new FormControl(
          this.acquisitionBody.budeget_Allocation_NGN,
          [Validators.required]
        ),
        budeget_Allocation_USD: new FormControl(
          this.acquisitionBody.budeget_Allocation_USD,
          [Validators.required]
        ),
        // geo_acquired_geophysical_data: new FormControl(
        //   this.acquisitionBody.geo_acquired_geophysical_data,
        //   [Validators.required]
        // ),
        geo_area_of_coverage: new FormControl(
          this.acquisitionBody.geo_area_of_coverage,
          [Validators.required]
        ),
        geo_method_of_acquisition: new FormControl(
          this.acquisitionBody.geo_method_of_acquisition,
          [Validators.required]
        ),
        quantum_Planned: new FormControl(this.acquisitionBody.quantum_Planned, [
          Validators.required,
        ]),
        quantum: new FormControl(this.acquisitionBody.quantum, [
          Validators.required,
        ]),
        quantum_Approved: new FormControl(
          this.acquisitionBody.quantum_Approved,
          [Validators.required]
        ),
        // quantum_carry_forward: new FormControl(
        //   this.acquisitionBody.quantum_carry_forward,
        //   [Validators.required]
        // ),
        no_of_Folds: new FormControl(this.acquisitionBody.no_of_Folds, [
          Validators.required,
        ]),
        name_of_Contractor: new FormControl(
          this.acquisitionBody.name_of_Contractor,
          [Validators.required]
        ),
        geo_type_of_data_acquired: new FormControl(
          this.acquisitionBody.geo_type_of_data_acquired,
          [Validators.required]
        ),
        geo_Record_Length_of_Data: new FormControl(
          this.acquisitionBody.geo_Record_Length_of_Data,
          [Validators.required]
        ),
        // geo_Completion_Status: new FormControl(
        //   this.acquisitionBody.geo_Completion_Status,
        //   [Validators.required]
        // ),
        // geo_Activity_Timeline: new FormControl(
        //   this.acquisitionBody.geo_Activity_Timeline,
        //   [Validators.required]
        // ),
        remarks: new FormControl(this.acquisitionBody.remarks, []),
      },
      {}
    );
    this.cd.markForCheck();

    this.ProcessingForm = new FormGroup(
      {
        processed_Actual: new FormControl(
          this.processingBody.processed_Actual,
          [Validators.required]
        ),
        processed_Proposed: new FormControl(
          this.processingBody.processed_Proposed,
          [Validators.required]
        ),
        reprocessed_Actual: new FormControl(
          this.processingBody.reprocessed_Actual,
          [Validators.required]
        ),
        reprocessed_Proposed: new FormControl(
          this.processingBody.reprocessed_Proposed,
          [Validators.required]
        ),
        type_of_Processing: new FormControl(
          this.processingBody.type_of_Processing,
          [Validators.required]
        ),
        // interpreted_Actual: new FormControl(this.processingBody.interpreted_Actual, [Validators.required]),
        // interpreted_Proposed: new FormControl(this.processingBody.interpreted_Proposed, [Validators.required]),
        geo_Any_Ongoing_Processing_Project: new FormControl(
          this.processingBody.geo_Any_Ongoing_Processing_Project,
          [Validators.required]
        ),
        quantum_Planned: new FormControl(this.processingBody.quantum_Planned, [
          Validators.required,
        ]),
        geo_Quantum_of_Data: new FormControl(
          this.processingBody.geo_Quantum_of_Data,
          [Validators.required]
        ),
        quantum_Approved: new FormControl(
          this.processingBody.quantum_Approved,
          [Validators.required]
        ),
        geo_Quantum_of_Data_carry_over: new FormControl(
          this.processingBody.geo_Quantum_of_Data_carry_over,
          [Validators.required]
        ),
        geo_Activity_Timeline: new FormControl(
          this.processingBody.geo_Activity_Timeline,
          [Validators.required]
        ),
        budeget_Allocation_NGN: new FormControl(
          this.processingBody.budeget_Allocation_NGN,
          [Validators.required]
        ),
        budeget_Allocation_USD: new FormControl(
          this.processingBody.budeget_Allocation_USD,
          [Validators.required]
        ),
        // geo_Completion_Status: new FormControl(
        //   this.processingBody.geo_Completion_Status,
        //   [Validators.required]
        // ),
        name_of_Contractor: new FormControl(
          this.processingBody.name_of_Contractor,
          [Validators.required]
        ),
        geo_Type_of_Data_being_Processed: new FormControl(
          this.processingBody.geo_Type_of_Data_being_Processed,
          [Validators.required]
        ),
        remarks: new FormControl(this.processingBody.remarks, [
          Validators.required,
        ]),
      },
      {}
    );

    this.genk.Concession$.subscribe((con: IConcession) => {
      console.log('deb', con, this.genk.Fields, this.genk.Field);
      if (!con) {
        this.genk.disableForm = true;
        this.cd.markForCheck();
        return;
      }

      this.genk.disableForm = con.isEditable ? false : true;
      this.cd.markForCheck();
    });

    this.genk.Field$.subscribe((field: IField) => {
      console.log('deb', field, this.genk.Fields);
      if (!field) {
        this.genk.disableForm = true;
        this.cd.markForCheck();
        return;
      }

      this.genk.disableForm = field.isEditable ? false : true;
      this.cd.markForCheck();
    });

    //console.log(this.acquisitionBody);
    this.cd.markForCheck();
  }

  test() {
    console.log('valida...', this.AcquisitionForm);
  }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.genk.disableForm ? true : null;
  }

  get f() {
    return this.AcquisitionForm.controls;
  }

  get pf() {
    return this.ProcessingForm.controls;
  }

  get quaterACClassOne() {
    let list = '';
    if (this.quaterACOne) {
      if (this.currentACQuater === 1) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
      //list = 'currfilled currquarter';
    } else {
      if (this.currentACQuater === 1) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  get quaterACClassTwo() {
    let list = '';
    if (this.quaterACTwo) {
      if (this.currentACQuater === 2) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentACQuater === 2) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  get quaterACClassThree() {
    let list = '';
    if (this.quaterACThree) {
      if (this.currentACQuater === 3) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentACQuater === 3) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  get quaterACClassFour() {
    let list = '';
    if (this.quaterACFour) {
      if (this.currentACQuater === 4) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentACQuater === 4) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  get quaterPRClassOne() {
    let list = '';
    if (this.quaterPROne) {
      if (this.currentPRQuater === 1) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
      //list = 'currfilled currquarter';
    } else {
      if (this.currentPRQuater === 1) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  get quaterPRClassTwo() {
    let list = '';
    if (this.quaterPRTwo) {
      if (this.currentPRQuater === 2) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentPRQuater === 2) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  get quaterPRClassThree() {
    let list = '';
    if (this.quaterPRThree) {
      if (this.currentPRQuater === 3) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentPRQuater === 3) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  get quaterPRClassFour() {
    let list = '';
    if (this.quaterPRFour) {
      if (this.currentPRQuater === 4) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentPRQuater === 4) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list;
  }

  changeACQuater(quater: number, btn: HTMLButtonElement) {
    if (quater === 1) {
      this.currentACQuater = 1;
      btn.textContent = 'Save Quarter 1';
      this.acquisitionBody = this.quaterACOneData;
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 1");
    }
    if (quater === 2) {
      this.currentACQuater = 2;
      btn.textContent = 'Save Quarter 2';
      this.acquisitionBody = this.quaterACTwoData;
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 2");
    }
    if (quater === 3) {
      this.currentACQuater = 3;
      this.acquisitionBody = this.quaterACThreeData;
      btn.textContent = 'Save Quarter 3';
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 3");
    }
    if (quater === 4) {
      this.currentACQuater = 4;
      this.acquisitionBody = this.quaterACFourData;
      btn.textContent = 'Save Quarter 4';
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 4");
    }
    this.cd.markForCheck();
  }

  changePRQuater(quater: number, btn: HTMLButtonElement) {
    if (quater === 1) {
      this.currentPRQuater = 1;
      btn.textContent = 'Save Quarter 1';
      this.processingBody = this.quaterPROneData;
      this.cd.markForCheck();
    }
    if (quater === 2) {
      this.currentPRQuater = 2;
      btn.textContent = 'Save Quarter 2';
      this.processingBody = this.quaterPRTwoData;
      this.cd.markForCheck();
    }
    if (quater === 3) {
      this.currentPRQuater = 3;
      btn.textContent = 'Save Quarter 3';
      this.processingBody = this.quaterPRThreeData;
      this.cd.markForCheck();
    }
    if (quater === 4) {
      this.currentPRQuater = 4;
      btn.textContent = 'Save Quarter 4';
      this.processingBody = this.quaterPRFourData;
      this.cd.markForCheck();
    }
    this.cd.markForCheck();
  }

  getGeophysical(quaterText: string) {
    this.workprogram
      .getFormOneGeoPhysical(
        this.genk.OmlName,
        this.genk.fieldName,
        this.genk.wpYear
      )
      .subscribe((res) => {
        if (res.geoActivitiesAcquisition) {
          this.quaterACOneData = res.geoActivitiesAcquisition.filter(
            (result) => {
              return result.quater === quaterText;
            }
          )[0];
          this.quaterACOne = this.quaterACOneData ? true : false;
          this.quaterACOneData =
            this.quaterACOneData ?? new GEOPHYSICAL_ACTIVITIES_ACQUISITION();

          this.quaterACTwoData = res.geoActivitiesAcquisition.filter(
            (result) => {
              this.quaterACTwo = result.quater === 'QUARTER 2' ? true : false;
              return result.quater === 'QUARTER 2';
            }
          )[0];
          this.quaterACTwo = this.quaterACTwoData ? true : false;
          this.quaterACTwoData =
            this.quaterACTwoData ?? new GEOPHYSICAL_ACTIVITIES_ACQUISITION();

          this.quaterACThreeData = res.geoActivitiesAcquisition.filter(
            (res) => {
              this.quaterACThree = res.quater === 'QUARTER 3' ? true : false;
              return res.quater === 'QUARTER 3';
            }
          )[0];
          this.quaterACThree = this.quaterACThreeData ? true : false;
          this.quaterACThreeData =
            this.quaterACThreeData ?? new GEOPHYSICAL_ACTIVITIES_ACQUISITION();

          this.quaterACFourData = res.geoActivitiesAcquisition.filter((res) => {
            this.quaterACFour = res.quater === 'QUARTER 4' ? true : false;
            return res.quater === 'QUARTER 4';
          })[0];
          this.quaterACFour = this.quaterACFourData ? true : false;
          this.quaterACFourData =
            this.quaterACFourData ?? new GEOPHYSICAL_ACTIVITIES_ACQUISITION();
          this.acquisitionBody = this.quaterACOneData;

          this.quaterPROneData = res.geoActivitiesProcessing.filter((res) => {
            return res.quater === quaterText;
          })[0];
          this.quaterPROne = this.quaterPROneData ? true : false;
          this.quaterPROneData =
            this.quaterPROneData ?? new GEOPHYSICAL_ACTIVITIES_PROCESSING();

          this.quaterPRTwoData = res.geoActivitiesProcessing.filter((res) => {
            this.quaterPRTwo = res.quater === 'QUARTER 2' ? true : false;
            return res.quater === 'QUARTER 2';
          })[0];
          this.quaterPRTwo = this.quaterPRTwoData ? true : false;
          this.quaterPRTwoData =
            this.quaterPRTwoData ?? new GEOPHYSICAL_ACTIVITIES_PROCESSING();

          this.quaterPRThreeData = res.geoActivitiesProcessing.filter((res) => {
            this.quaterPRThree = res.quater === 'QUARTER 3' ? true : false;
            return res.quater === 'QUARTER 3';
          })[0];
          this.quaterPRThree = this.quaterPRThreeData ? true : false;
          this.quaterPRThreeData =
            this.quaterPRThreeData ?? new GEOPHYSICAL_ACTIVITIES_PROCESSING();

          this.quaterPRFourData = res.geoActivitiesProcessing.filter((res) => {
            this.quaterPRFour = res.quater === 'QUARTER 4' ? true : false;
            return res.quater === 'QUARTER 4';
          })[0];
          this.quaterPRFour = this.quaterPRFourData ? true : false;
          this.quaterPRFourData =
            this.quaterPRFourData ?? new GEOPHYSICAL_ACTIVITIES_PROCESSING();

          this.processingBody = this.quaterPROneData;
          //console.log(this.quaterOneData[0]);
          this.cd.markForCheck();
        }
      });
    this.cd.markForCheck();
  }

  saveQuarterAcquisition() {
    this.submitted = true;

    let ree = this.currentACQuater;
    this.acquisitionBody.qUATER = 'QUARTER ' + this.currentACQuater;
    this.acquisitionBody.budeget_Allocation_NGN =
      this.acquisitionBody?.budeget_Allocation_NGN.replace(/,/g, '');
    this.acquisitionBody.budeget_Allocation_USD =
      this.acquisitionBody?.budeget_Allocation_USD.replace(/,/g, '');
    let sail: GEOPHYSICAL_ACTIVITIES_ACQUISITION =
      {} as GEOPHYSICAL_ACTIVITIES_ACQUISITION;
    sail = this.genk.stringArray(
      this.acquisitionBody
    ) as GEOPHYSICAL_ACTIVITIES_ACQUISITION;
    this.workprogram
      .saveQuarterAcquisition(sail, this.genk.wpYear, this.genk.OmlName)
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.popText, 'success');
      });
  }

  saveQuarterProcessing() {
    this.pSubmitted = true;
    this.processingBody.qUATER = 'QUARTER ' + this.currentPRQuater;
    this.processingBody.budeget_Allocation_NGN =
      this.processingBody.budeget_Allocation_NGN.replace(/,/g, '');
    this.processingBody.budeget_Allocation_USD =
      this.processingBody.budeget_Allocation_USD.replace(/,/g, '');
    // var key, keys = Object.keys(this.processingBody);
    // var n = keys.length;
    // var newobj = {}
    // while (n--) {
    //   key = keys[n];
    //   if (this.processingBody[key]) {
    //     let val =  this.processingBody[key];
    //     newobj[key] = val.toString();
    //   }
    // }

    let sail: GEOPHYSICAL_ACTIVITIES_PROCESSING =
      {} as GEOPHYSICAL_ACTIVITIES_PROCESSING;
    sail = this.genk.stringArray(
      this.processingBody
    ) as GEOPHYSICAL_ACTIVITIES_PROCESSING;

    this.workprogram
      .saveQuarterProcessing(sail, this.genk.wpYear, this.genk.OmlName)
      .subscribe((res) => {
        this.modalService.logNotice('Success', res.popText, 'success');
      });
  }

  goToTop() {
    window.scrollTo(0, 0);
  }
}
