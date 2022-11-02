import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GEOPHYSICAL_ACTIVITIES_ACQUISITION, GEOPHYSICAL_ACTIVITIES_PROCESSING } from 'src/app/models/step1-geophysical.model';
import { AuthenticationService, GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './geophysical-activities.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SWPGeophysicalActivitiesComponent implements OnInit {
  AcquisitionForm: FormGroup;
  ProcessingForm: FormGroup;
  quarterACOneData: GEOPHYSICAL_ACTIVITIES_ACQUISITION;
  quarterACTwoData: GEOPHYSICAL_ACTIVITIES_ACQUISITION;
  quarterACThreeData: GEOPHYSICAL_ACTIVITIES_ACQUISITION;
  quarterACFourData: GEOPHYSICAL_ACTIVITIES_ACQUISITION;

  quarterPROneData: GEOPHYSICAL_ACTIVITIES_PROCESSING;
  quarterPRTwoData: GEOPHYSICAL_ACTIVITIES_PROCESSING;
  quarterPRThreeData: GEOPHYSICAL_ACTIVITIES_PROCESSING;
  quarterPRFourData: GEOPHYSICAL_ACTIVITIES_PROCESSING;

  acquisitionBody: GEOPHYSICAL_ACTIVITIES_ACQUISITION = {} as GEOPHYSICAL_ACTIVITIES_ACQUISITION;
  processingBody: GEOPHYSICAL_ACTIVITIES_PROCESSING = {} as GEOPHYSICAL_ACTIVITIES_PROCESSING;
  genk: GenericService;
  quarterACOne = false;
  quarterACTwo = false;
  quarterACThree = false;
  quarterACFour = false;

  quarterPROne = false;
  quarterPRTwo = false;
  quarterPRThree = false;
  quarterPRFour = false;
  submitted = false;
  currentACQuarter = 1;
  currentPRQuarter = 1;

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
        const rel = "QUARTER " + this.currentACQuarter;
        this.getGeophysical(rel);
      });
    this.cd.markForCheck();
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP1';
    this.getGeophysical("QUARTER 1");

    this.AcquisitionForm = new FormGroup(
      {
        actual_year_aquired_data: new FormControl(this.acquisitionBody.actual_year_aquired_data, [Validators.required]),
        proposed_year_data: new FormControl(this.acquisitionBody.proposed_year_data, [Validators.required]),
        budeget_Allocation_NGN: new FormControl(this.acquisitionBody.budeget_Allocation_NGN, [Validators.required]),
        budeget_Allocation_USD: new FormControl(this.acquisitionBody.budeget_Allocation_USD, [Validators.required]),
        geo_acquired_geophysical_data: new FormControl(this.acquisitionBody.geo_acquired_geophysical_data, [Validators.required]),
        geo_area_of_coverage: new FormControl(this.acquisitionBody.geo_area_of_coverage, [Validators.required]),
        geo_method_of_acquisition: new FormControl(this.acquisitionBody.geo_method_of_acquisition, [Validators.required]),
        quantum_Planned: new FormControl(this.acquisitionBody.quantum_Planned, [Validators.required]),
        quantum: new FormControl(this.acquisitionBody.quantum, [Validators.required]),
        quantum_Approved: new FormControl(this.acquisitionBody.quantum_Approved, [Validators.required]),
        quantum_carry_forward: new FormControl(this.acquisitionBody.quantum_carry_forward, [Validators.required]),
        no_of_Folds: new FormControl(this.acquisitionBody.no_of_Folds, [Validators.required]),
        name_of_Contractor: new FormControl(this.acquisitionBody.name_of_Contractor, [Validators.required]),
        geo_type_of_data_acquired: new FormControl(this.acquisitionBody.geo_type_of_data_acquired, [Validators.required]),
        geo_Record_Length_of_Data: new FormControl(this.acquisitionBody.geo_Record_Length_of_Data, [Validators.required]),
        geo_Completion_Status: new FormControl(this.acquisitionBody.geo_Completion_Status, [Validators.required]),
        geo_Activity_Timeline: new FormControl(this.acquisitionBody.geo_Activity_Timeline, [Validators.required]),
        remarks: new FormControl(this.acquisitionBody.remarks, [Validators.required])
      }, {});

    this.ProcessingForm = new FormGroup(
      {
        processed_Actual: new FormControl(this.processingBody.processed_Actual, [Validators.required]),
        processed_Proposed: new FormControl(this.processingBody.processed_Proposed, [Validators.required]),
        reprocessed_Actual: new FormControl(this.processingBody.reprocessed_Actual, [Validators.required]),
        reprocessed_Proposed: new FormControl(this.processingBody.reprocessed_Proposed, [Validators.required]),
        type_of_Processing: new FormControl(this.processingBody.type_of_Processing, [Validators.required]),
        // interpreted_Actual: new FormControl(this.processingBody.interpreted_Actual, [Validators.required]),
        // interpreted_Proposed: new FormControl(this.processingBody.interpreted_Proposed, [Validators.required]),
        geo_Any_Ongoing_Processing_Project: new FormControl(this.processingBody.geo_Any_Ongoing_Processing_Project, [Validators.required]),
        quantum_Planned: new FormControl(this.processingBody.quantum_Planned, [Validators.required]),
        geo_Quantum_of_Data: new FormControl(this.processingBody.geo_Quantum_of_Data, [Validators.required]),
        quantum_Approved: new FormControl(this.processingBody.quantum_Approved, [Validators.required]),
        geo_Quantum_of_Data_carry_over: new FormControl(this.processingBody.geo_Quantum_of_Data_carry_over, [Validators.required]),
        geo_Activity_Timeline: new FormControl(this.processingBody.geo_Activity_Timeline, [Validators.required]),
        budeget_Allocation_NGN: new FormControl(this.processingBody.budeget_Allocation_NGN, [Validators.required]),
        budeget_Allocation_USD: new FormControl(this.processingBody.budeget_Allocation_USD, [Validators.required]),
        geo_Completion_Status: new FormControl(this.processingBody.geo_Completion_Status, [Validators.required]),
        name_of_Contractor: new FormControl(this.processingBody.name_of_Contractor, [Validators.required]),
        geo_Type_of_Data_being_Processed: new FormControl(this.processingBody.geo_Type_of_Data_being_Processed, [Validators.required]),
        remarks: new FormControl(this.processingBody.remarks, [Validators.required]),
      }, {});

    //console.log(this.acquisitionBody);
    this.cd.markForCheck();
  }

  get quarterACClassOne() {
    let list = '';
    if (this.quarterACOne) {
      if (this.currentACQuarter === 1) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
      //list = 'currfilled currquarter';
    } else {
      if (this.currentACQuarter === 1) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list
  }

  get quarterACClassTwo() {
    let list = '';
    if (this.quarterACTwo) {
      if (this.currentACQuarter === 2) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentACQuarter === 2) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list
  }

  get quarterACClassThree() {
    let list = '';
    if (this.quarterACThree) {
      if (this.currentACQuarter === 3) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentACQuarter === 3) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list
  }

  get quarterACClassFour() {
    let list = '';
    if (this.quarterACFour) {
      if (this.currentACQuarter === 4) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentACQuarter === 4) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list
  }


  get quarterPRClassOne() {
    let list = '';
    if (this.quarterPROne) {
      if (this.currentPRQuarter === 1) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
      //list = 'currfilled currquarter';
    } else {
      if (this.currentPRQuarter === 1) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list
  }

  get quarterPRClassTwo() {
    let list = '';
    if (this.quarterPRTwo) {
      if (this.currentPRQuarter === 2) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentPRQuarter === 2) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list
  }

  get quarterPRClassThree() {
    let list = '';
    if (this.quarterPRThree) {
      if (this.currentPRQuarter === 3) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentPRQuarter === 3) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list
  }

  get quarterPRClassFour() {
    let list = '';
    if (this.quarterPRFour) {
      if (this.currentPRQuarter === 4) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }
    } else {
      if (this.currentPRQuarter === 4) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list
  }


  changeACQuarter(quarter: number, btn: HTMLButtonElement) {
    if (quarter === 1) {
      this.currentACQuarter = 1;
      btn.textContent = "Save Quarter 1";
      this.acquisitionBody = this.quarterACOneData;
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 1");
    }
    if (quarter === 2) {
      this.currentACQuarter = 2;
      btn.textContent = "Save Quarter 2";
      this.acquisitionBody = this.quarterACTwoData;
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 2");
    }
    if (quarter === 3) {
      this.currentACQuarter = 3;
      this.acquisitionBody = this.quarterACThreeData;
      btn.textContent = "Save Quarter 3";
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 3");
    }
    if (quarter === 4) {
      this.currentACQuarter = 4;
      this.acquisitionBody = this.quarterACFourData;
      btn.textContent = "Save Quarter 4";
      this.cd.markForCheck();
      //this.getGeophysical("QUARTER 4");
    }
    this.cd.markForCheck();
  }

  changePRQuarter(quarter: number, btn: HTMLButtonElement) {
    if (quarter === 1) {
      this.currentPRQuarter = 1;
      btn.textContent = "Save Quarter 1";
      this.processingBody = this.quarterPROneData;
      this.cd.markForCheck();

    }
    if (quarter === 2) {
      this.currentPRQuarter = 2;
      btn.textContent = "Save Quarter 2";
      this.processingBody = this.quarterPRTwoData
      this.cd.markForCheck();
    }
    if (quarter === 3) {
      this.currentPRQuarter = 3;
      btn.textContent = "Save Quarter 3";
      this.processingBody = this.quarterPRThreeData;
      this.cd.markForCheck();

    }
    if (quarter === 4) {
      this.currentPRQuarter = 4;
      btn.textContent = "Save Quarter 4";
      this.processingBody = this.quarterPRFourData;
      this.cd.markForCheck();

    }
    this.cd.markForCheck();
  }

  getGeophysical(quaterText: string) {

    this.workprogram.getFormOneGeoPhysical(this.genk.OmlName, this.genk.fieldName, this.genk.wpYear)
      .subscribe(res => {
        //debugger;
        this.quarterACOneData = res.geoActivitiesAcquisition.filter(res => {
          return res.quater === quaterText;
        })[0];
        this.quarterACOne = this.quarterACOneData ? true : false;

        this.quarterACTwoData = res.geoActivitiesAcquisition.filter(res => {
          this.quarterACTwo = res.quarter === "QUARTER 2" ? true : false;
          return res.quarter === "QUARTER 2";
        })[0];
        this.quarterACTwo = this.quarterACTwoData ? true : false;

        this.quarterACThreeData = res.geoActivitiesAcquisition.filter(res => {
          this.quarterACThree = res.quarter === "QUARTER 3" ? true : false;
          return res.quarter === "QUARTER 3";
        })[0];
        this.quarterACThree = this.quarterACThreeData ? true : false;

        this.quarterACFourData = res.geoActivitiesAcquisition.filter(res => {
          this.quarterACFour = res.quater === "QUARTER 4" ? true : false;
          return res.quater === "QUARTER 4";
        })[0];
        this.quarterACFour = this.quarterACFourData ? true : false;
        this.acquisitionBody = this.quarterACOneData;




        this.quarterPROneData = res.geoActivitiesProcessing.filter(res => {
          return res.quater === quaterText;
        })[0];
        this.quarterPROne = this.quarterPROneData ? true : false;

        this.quarterPRTwoData = res.geoActivitiesProcessing.filter(res => {
          this.quarterPRTwo = res.quater === "QUARTER 2" ? true : false;
          return res.quater === "QUARTER 2";
        })[0];
        this.quarterPRTwo = this.quarterPRTwoData ? true : false;

        this.quarterPRThreeData = res.geoActivitiesProcessing.filter(res => {
          this.quarterPRThree = res.quater === "QUARTER 3" ? true : false;
          return res.quater === "QUARTER 3";
        })[0];
        this.quarterPRThree = this.quarterPRThreeData ? true : false;

        this.quarterPRFourData = res.geoActivitiesProcessing.filter(res => {
          this.quarterPRFour = res.quater === "QUARTER 4" ? true : false;
          return res.quater === "QUARTER 4";
        })[0];
        this.quarterPRFour = this.quarterPRFourData ? true : false;

        this.processingBody = this.quarterPROneData;
        //console.log(this.quaterOneData[0]);
        this.cd.markForCheck();
      });
    this.cd.markForCheck();
  }

  saveQuarterAcquisition() {
    debugger;
    this.acquisitionBody.qUARTER = "QUARTER " + this.currentACQuarter;
    this.acquisitionBody.budeget_Allocation_NGN = this.acquisitionBody.budeget_Allocation_NGN.replace(/,/g, '');
    this.acquisitionBody.budeget_Allocation_USD = this.acquisitionBody.budeget_Allocation_USD.replace(/,/g, '');
    let sail: GEOPHYSICAL_ACTIVITIES_ACQUISITION = {} as GEOPHYSICAL_ACTIVITIES_ACQUISITION;
    sail = this.genk.stringArray(this.acquisitionBody) as GEOPHYSICAL_ACTIVITIES_ACQUISITION;
    debugger;
    this.workprogram.saveQuarterAcquisition(sail, this.genk.wpYear, this.genk.OmlName)
      .subscribe(res => {
        this.modalService.logNotice("Success", res.popText, 'success');
      })
  }

  saveQuarterProcessing() {
    debugger;
    this.processingBody.qUARTER = "QUARTER " + this.currentACQuarter;
    this.processingBody.budeget_Allocation_NGN = this.processingBody.budeget_Allocation_NGN.replace(/,/g, '');
    this.processingBody.budeget_Allocation_USD = this.processingBody.budeget_Allocation_USD.replace(/,/g, '');
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
    debugger;
    let sail: GEOPHYSICAL_ACTIVITIES_PROCESSING = {} as GEOPHYSICAL_ACTIVITIES_PROCESSING;
    sail = this.genk.stringArray(this.processingBody) as GEOPHYSICAL_ACTIVITIES_PROCESSING;
    debugger;
    this.workprogram.saveQuarterProcessing(sail, this.genk.wpYear, this.genk.OmlName)
      .subscribe(res => {
        this.modalService.logNotice("Success", res.popText, 'success');
      })
  }

  goToTop() {
    window.scrollTo(0, 0);
  }

}
