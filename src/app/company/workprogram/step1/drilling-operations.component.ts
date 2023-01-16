import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DRILLING_EACH_WELL_COST, DRILLING_EACH_WELL_COST_PROPOSED, DRILLING_OPERATIONS_CATEGORIES_OF_WELL } from 'src/app/models/step1-drilling.model';
import { AuthenticationService, GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './drilling-operations.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SWPDrillingOperationsComponent implements OnInit {
  CategoryForm: FormGroup;
  CostForm: FormGroup;
  CostProposedForm: FormGroup;
  categoryBody: DRILLING_OPERATIONS_CATEGORIES_OF_WELL = {} as DRILLING_OPERATIONS_CATEGORIES_OF_WELL;
  costBody: DRILLING_EACH_WELL_COST = {} as DRILLING_EACH_WELL_COST;
  costProposedBody: DRILLING_EACH_WELL_COST_PROPOSED = {} as DRILLING_EACH_WELL_COST_PROPOSED;
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;

  quaterACOne = false;
  quaterACTwo = false;
  quaterACThree = false;
  quaterACFour = false;
  currentACQuater = 1;

  quaterACOneData: DRILLING_OPERATIONS_CATEGORIES_OF_WELL;
  quaterACTwoData: DRILLING_OPERATIONS_CATEGORIES_OF_WELL;
  quaterACThreeData: DRILLING_OPERATIONS_CATEGORIES_OF_WELL;
  quaterACFourData: DRILLING_OPERATIONS_CATEGORIES_OF_WELL;

  quaterCWOneData: DRILLING_EACH_WELL_COST;
  quaterCWTwoData: DRILLING_EACH_WELL_COST;
  quaterCWThreeData: DRILLING_EACH_WELL_COST;
  quaterCWFourData: DRILLING_EACH_WELL_COST;

  quaterCPOneData: DRILLING_EACH_WELL_COST_PROPOSED;
  quaterCPTwoData: DRILLING_EACH_WELL_COST_PROPOSED;
  quaterCPThreeData: DRILLING_EACH_WELL_COST_PROPOSED;
  quaterCPFourData: DRILLING_EACH_WELL_COST_PROPOSED;

  discoveryFile?: File = null;
  hydrocarbonFile?: File = null;
  mediatype = 'doc';
  hydroNewName: string;
  hydroNameDoc: string;
  discoveryNewName: string;
  discoveryNameDoc: string;

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
        const rel = "QUARTER " + this.currentACQuater;
        this.getDrilling(rel);
      });
    this.cd.markForCheck();
  }
  ngOnInit(): void {
    this.genk.activeStep = 'STEP1';
    this.getDrilling("QUARTER 1");
    this.CategoryForm = new FormGroup(
      {
        wellName: new FormControl(this.categoryBody.wellName, [Validators.required]),
        actual_Proposed: new FormControl(this.categoryBody.actual_Proposed, [Validators.required]),
        category: new FormControl(this.categoryBody.category),
        well_type: new FormControl(this.categoryBody.well_type, [Validators.required]),
        well_trajectory: new FormControl(this.categoryBody.well_trajectory, [Validators.required]),
        spud_date: new FormControl(this.categoryBody.spud_date, [Validators.required]),
        cored: new FormControl(this.categoryBody.cored, [Validators.required]),
        core_Depth_Interval: new FormControl(this.categoryBody.core_Depth_Interval, [Validators.required]),
        core_Cost_USD: new FormControl(this.categoryBody.core_Cost_USD, [Validators.required]),
        any_New_Discoveries: new FormControl(this.categoryBody.any_New_Discoveries, [Validators.required]),
        state_the_field_where_Discovery_was_made: new FormControl(this.categoryBody.state_the_field_where_Discovery_was_made, [Validators.required]),
        hydrocarbon_Counts: new FormControl(this.categoryBody.hydrocarbon_Counts, [Validators.required]),
        fieldDiscoveryUploadFilePath: new FormControl(this.categoryBody.fieldDiscoveryUploadFilePath, [Validators.required]),
        hydrocarbonCountUploadFilePath: new FormControl(this.categoryBody.hydrocarbonCountUploadFilePath, [Validators.required]),
        well_cost: new FormControl(this.categoryBody.well_cost, [Validators.required]),
        processing_Fees_Paid: new FormControl(this.categoryBody.processing_Fees_Paid, [Validators.required]),
        number_of_Days_to_Total_Depth: new FormControl(this.categoryBody.number_of_Days_to_Total_Depth, [Validators.required]),
        terrain: new FormControl(this.categoryBody.terrain_Drill, [Validators.required]),
        water_depth: new FormControl(this.categoryBody.water_depth, [Validators.required]),
        true_vertical_depth: new FormControl(this.categoryBody.true_vertical_depth, [Validators.required]),
        measured_depth: new FormControl(this.categoryBody.measured_depth, [Validators.required]),
        depth_refrence: new FormControl(this.categoryBody.depth_refrence, [Validators.required]),
        rig_type: new FormControl(this.categoryBody.rig_type, [Validators.required]),
        rig_Name: new FormControl(this.categoryBody.rig_Name, [Validators.required]),
        target_reservoir: new FormControl(this.categoryBody.target_reservoir, [Validators.required]),
        location_name: new FormControl(this.categoryBody.location_name, [Validators.required]),
        basin: new FormControl(this.categoryBody.basin, [Validators.required]),
        propose_well_names: new FormControl(this.categoryBody.propose_well_names, [Validators.required]),
        actual_wells_name: new FormControl(this.categoryBody.actual_wells_name, [Validators.required]),
        comments: new FormControl(this.categoryBody.comments, [Validators.required]),
        surface_cordinates_for_each_well_in_degrees:new FormControl(this.categoryBody.surface_cordinates_for_each_well_in_degrees, [Validators.required]),
        'discoveryFile': new FormControl(this.discoveryFile),
        'hydrocarbonFile': new FormControl(this.hydrocarbonFile)
      }, {});


    this.CostForm = new FormGroup(
      {
        well_name: new FormControl(this.costBody.well_name, [Validators.required]),
        well_cost: new FormControl(this.categoryBody.well_cost, [Validators.required]),
        surface_cordinates_for_each_well_in_degrees: new FormControl(this.categoryBody.surface_cordinates_for_each_well_in_degrees, [Validators.required]),
      }, {});

    this.CostProposedForm = new FormGroup(
      {
        well_name: new FormControl(this.costProposedBody.well_name, [Validators.required]),
        well_cost: new FormControl(this.costProposedBody.well_cost, [Validators.required]),
        surface_cordinates_for_each_well_in_degrees: new FormControl(this.costProposedBody.surface_cordinates_for_each_well_in_degrees, [Validators.required]),
      }, {});
  }

  get f() {
    return this.CategoryForm.controls;
  }


  get quaterACClassOne() {
    let list = '';
    if (this.quaterACOne) {
      if (this.currentACQuater === 1) {
        list = 'currfilled curractive';
      } else {
        list = 'currfilled';
      }

    } else {
      if (this.currentACQuater === 1) {
        list = 'currquarter';
      } else {
        list = '';
      }
    }
    return list
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
    return list
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
    return list
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
    return list
  }

  changeACQuater(quater: number, btn: HTMLButtonElement) {
    if (quater === 1) {
      this.currentACQuater = 1;
      btn.textContent = "Save Quarter 1";
      // btn2.textContent = "Save Quarter 1";
      // btn2.textContent = "Save Quarter 1";
      this.categoryBody = this.quaterACOneData ? this.quaterACOneData : {} as DRILLING_OPERATIONS_CATEGORIES_OF_WELL;
      this.costBody = this.quaterCWOneData ? this.quaterCWOneData : new DRILLING_EACH_WELL_COST();
      this.costProposedBody = this.quaterCPOneData ? this.quaterCPOneData : new DRILLING_EACH_WELL_COST_PROPOSED();
      this.cd.markForCheck();

    }
    if (quater === 2) {
      this.currentACQuater = 2;
      btn.textContent = "Save Quarter 2";
      // btn2.textContent = "Save Quarter 2";
      // btn2.textContent = "Save Quarter 2";
      this.categoryBody = this.quaterACTwoData ? this.quaterACTwoData : {} as DRILLING_OPERATIONS_CATEGORIES_OF_WELL;
      this.costBody = this.quaterCWTwoData ? this.quaterCWTwoData : {} as DRILLING_EACH_WELL_COST;
      this.costProposedBody = this.quaterCPTwoData ? this.quaterCPTwoData : {} as DRILLING_EACH_WELL_COST_PROPOSED;
      this.cd.markForCheck();

    }
    if (quater === 3) {
      this.currentACQuater = 3;
      btn.textContent = "Save Quarter 3";
      // btn2.textContent = "Save Quarter 3";
      // btn2.textContent = "Save Quarter 3";
      this.categoryBody = this.quaterACThreeData ? this.quaterACThreeData : {} as DRILLING_OPERATIONS_CATEGORIES_OF_WELL;
      this.costBody = this.quaterCWThreeData ? this.quaterCWThreeData : {} as DRILLING_EACH_WELL_COST;
      this.costProposedBody = this.quaterCPThreeData ? this.quaterCPThreeData : {} as DRILLING_EACH_WELL_COST_PROPOSED;
      this.cd.markForCheck();
    }

    if (quater === 4) {
      this.currentACQuater = 4;
      btn.textContent = "Save Quarter 4";
      // btn2.textContent = "Save Quarter 4";
      // btn2.textContent = "Save Quarter 4";
      this.categoryBody = this.quaterACFourData ? this.quaterACFourData : {} as DRILLING_OPERATIONS_CATEGORIES_OF_WELL;
      this.costBody = this.quaterCWFourData ? this.quaterCWFourData : {} as DRILLING_EACH_WELL_COST;
      this.costProposedBody = this.quaterCPFourData ? this.quaterCPFourData : {} as DRILLING_EACH_WELL_COST_PROPOSED;
      this.cd.markForCheck();
    }
    this.cd.markForCheck();
  }

  saveWellCost() {
    debugger;
    this.costBody.id = 0;
    this.costBody.qUATER = "QUARTER " + this.currentACQuater;
    this.workprogram.saveWellCostQuarter(this.costBody, this.genk.wpYear, this.genk.OmlName).subscribe(res => {
      this.modalService.logNotice("Success", res.message, 'success');
    });
  }
  saveCostProposed() {
    this.costProposedBody.id = 0;
    this.costProposedBody.qUATER = "QUARTER " + this.currentACQuater;
    this.workprogram.saveCostProposedQuarter(this.costProposedBody, this.genk.wpYear, this.genk.OmlName).subscribe(res => {
      this.modalService.logNotice("Success", res.message, 'success');
    });
  }
  getDrilling(quaterText: string) {

    this.workprogram.getDrilling(this.genk.OmlName, this.genk.fieldName, this.genk.wpYear)
      .subscribe(res => {
        debugger;
        if (res.drillOperationCategoriesWell) {
          this.quaterACOneData = res.drillOperationCategoriesWell.filter(res => {
            return res.quater === quaterText;
          })[0];
          if (this.quaterACOneData || this.quaterACOneData !== undefined) {
            this.quaterACOneData.spud_date = this.genk.formDate(this.quaterACOneData?.spud_date);
            this.quaterACOne = true;
          } else {
            this.quaterACOne = false;
            this.quaterACOneData = this.quaterACOneData ?? new DRILLING_OPERATIONS_CATEGORIES_OF_WELL();
          }


          this.quaterACTwoData = res.drillOperationCategoriesWell.filter(res => {
            this.quaterACTwo = res.quater === "QUARTER 2" ? true : false;
            return res.quater === "QUARTER 2";
          })[0];
          if (this.quaterACTwoData || this.quaterACTwoData !== undefined) {
            this.quaterACTwoData.spud_date = this.genk.formDate(this.quaterACTwoData.spud_date);
            this.quaterACTwo = this.quaterACTwoData ? true : false;
          } else {
            this.quaterACTwo = false;
            this.quaterACTwoData = this.quaterACTwoData ?? new DRILLING_OPERATIONS_CATEGORIES_OF_WELL();
          }

          this.quaterACThreeData = res.drillOperationCategoriesWell.filter(res => {
            this.quaterACThree = res.quater === "QUARTER 3" ? true : false;
            return res.quater === "QUARTER 3";
          })[0];
          if (this.quaterACThreeData || this.quaterACThreeData !== undefined) {
            this.quaterACThreeData.spud_date = this.genk.formDate(this.quaterACThreeData.spud_date);
            this.quaterACThree = this.quaterACThreeData ? true : false;
          } else {
            this.quaterACThree = false;
            this.quaterACThreeData = this.quaterACThreeData ?? new DRILLING_OPERATIONS_CATEGORIES_OF_WELL();
          }

          this.quaterACFourData = res.drillOperationCategoriesWell.filter(res => {
            this.quaterACFour = res.quater === "QUARTER 4" ? true : false;
            return res.quater === "QUARTER 4";
          })[0];
          if (this.quaterACFourData || this.quaterACFourData !== undefined) {
            this.quaterACFourData.spud_date = this.genk.formDate(this.quaterACFourData.spud_date);
            this.quaterACFour = this.quaterACFourData ? true : false;
          } else {
            this.quaterACFour = false;
            this.quaterACFourData = this.quaterACFourData ?? new DRILLING_OPERATIONS_CATEGORIES_OF_WELL();
          }
          this.categoryBody = this.quaterACOneData;



          this.quaterCPOneData = res.drillEachCostProposed.filter(res => {
            return res.quater === quaterText;
          })[0] ?? new DRILLING_EACH_WELL_COST_PROPOSED();

          this.quaterCPTwoData = res.drillEachCostProposed.filter(res => {
            return res.quater === "QUARTER 2";
          })[0] ?? new DRILLING_EACH_WELL_COST_PROPOSED();

          this.quaterCPThreeData = res.drillEachCostProposed.filter(res => {
            return res.quater === "QUARTER 3";
          })[0] ?? new DRILLING_EACH_WELL_COST_PROPOSED();

          this.quaterCPFourData = res.drillEachCostProposed.filter(res => {
            return res.quater === "QUARTER 4";
          })[0] ?? new DRILLING_EACH_WELL_COST_PROPOSED();
          this.costProposedBody = this.quaterCPOneData;


          this.quaterCWOneData = res.drillEachCost.filter(res => {
            return res.quater === quaterText;
          })[0] ?? new DRILLING_EACH_WELL_COST();

          this.quaterCWTwoData = res.drillEachCost.filter(res => {
            return res.quater === "QUARTER 2";
          })[0] ?? new DRILLING_EACH_WELL_COST();

          this.quaterCWThreeData = res.drillEachCost.filter(res => {
            return res.quater === "QUARTER 3";
          })[0] ?? new DRILLING_EACH_WELL_COST();

          this.quaterCWFourData = res.drillEachCost.filter(res => {
            return res.quater === "QUARTER 4";
          })[0] ?? new DRILLING_EACH_WELL_COST();

          this.costBody = this.quaterCWOneData;
          this.cd.markForCheck();
        }
        });
    this.cd.markForCheck();
  }

  saveHydroDoc(DeFile: any) {
    this.hydrocarbonFile = <File>DeFile.target.files[0];
    if (!this.hydrocarbonFile) {
      return;
    }
    if (this.hydrocarbonFile.size < 1 || this.hydrocarbonFile.size > 1024 * 1024 * 50) {
      this.CategoryForm.controls['hydrocarbonFile'].setErrors({ 'incorrect': true });
      this.hydrocarbonFile = null;
      return;
    } else {
      this.CategoryForm.controls['hydrocarbonFile'].setErrors(null);
    }
    this.hydroNewName = this.gen.getExpDoc(this.hydrocarbonFile.name, this.hydrocarbonFile.type);
    this.hydroNameDoc = this.hydroNewName;

  }

  saveDiscoveryDoc(DeFile: any) {
    this.discoveryFile = <File>DeFile.target.files[0];
    if (!this.discoveryFile) {
      return;
    }
    if (this.discoveryFile.size < 1 || this.discoveryFile.size > 1024 * 1024 * 50) {
      this.CategoryForm.controls['discoveryFile'].setErrors({ 'incorrect': true });
      this.discoveryFile = null;
      return;
    } else {
      this.CategoryForm.controls['discoveryFile'].setErrors(null);
    }
    this.discoveryNewName = this.gen.getExpDoc(this.discoveryFile.name, this.discoveryFile.type);
    this.discoveryNameDoc = this.discoveryNewName;
  }

  saveCategoryQuarter() {
    const formDat: FormData = new FormData();
    this.categoryBody.qUATER = "QUARTER " + this.currentACQuater;
    for (const key in this.categoryBody) {
      if (this.categoryBody[key]) {
        formDat.append(key.toString(), this.categoryBody[key]);
      }
      if (key.toString() === 'id') {
        formDat.delete(key);
      }

    }
    if (this.discoveryFile) {
      formDat.append("discoveryfile", this.discoveryFile, this.discoveryNewName);
    }
    if (this.hydrocarbonFile) {
      formDat.append("hydrofile", this.hydrocarbonFile, this.hydroNewName);
    }

    this.workprogram.saveCategoryQuarter(formDat, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName).subscribe(res => {
      this.modalService.logNotice("Success", res.message, 'success');
    });

  }

}
