import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  facilitiesProjectPerformance,
  newTechnologyAndConformityAssessment,
  oilAndGasFacilityMaintenanceProject,
} from 'src/app/models/step3-budget-facility-maintenance.model';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './oil-and-gas-facility-maintenance.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPOilAndGasFacilityMaintenanceComponent implements OnInit {
  public disableForm: boolean = false;
  oilAndGasForm: FormGroup;
  newTechnologyForm: FormGroup;
  facilitiesProjectPerformanceForm: FormGroup;

  oilAndGasBody: oilAndGasFacilityMaintenanceProject =
    {} as oilAndGasFacilityMaintenanceProject;
  newTechnologyBody: newTechnologyAndConformityAssessment =
    {} as newTechnologyAndConformityAssessment;
  facilitiesProjectPerformanceBody: facilitiesProjectPerformance =
    {} as facilitiesProjectPerformance;

  wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;
  columnHeader_2 = [];
  columnValue_2 = [];
  isTabVisible_2 = false;
  columnHeader_3 = [];
  columnValue_3 = [];
  isTabVisible_3 = false;

  //#region document object declarations
  EvidenceOfDesignSafetyCaseApprovalFile?: File = null;
  EvidenceOfDesignSafetyCaseApprovalNewName: string;
  EvidenceOfDesignSafetyCaseApprovalNameDoc: string;
  //#endregion

  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      this.getBudgetData();
    });
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP3';
    this.oilAndGasForm = new FormGroup({
      major_Projects: new FormControl(
        this.oilAndGasBody.major_Projects,
        Validators.required
      ),
      name: new FormControl(this.oilAndGasBody.name, Validators.required),
      objective_Drivers_: new FormControl(
        this.oilAndGasBody.objective_Drivers_,
        Validators.required
      ),
      approval_License_Permits: new FormControl(
        this.oilAndGasBody.approval_License_Permits,
        Validators.required
      ),
      capeX_Oversight: new FormControl(
        this.oilAndGasBody.capeX_Oversight,
        Validators.required
      ),
      budget_Performance: new FormControl(
        this.oilAndGasBody.budget_Performance,
        Validators.required
      ),
      completion_Status: new FormControl(
        this.oilAndGasBody.completion_Status,
        Validators.required
      ),
      conceptual: new FormControl(
        this.oilAndGasBody.conceptual,
        Validators.required
      ),
      feed: new FormControl(this.oilAndGasBody.feed, Validators.required),
      detailed_Engineering: new FormControl(
        this.oilAndGasBody.detailed_Engineering,
        Validators.required
      ),
      construction_Commissioning_: new FormControl(
        this.oilAndGasBody.construction_Commissioning_,
        Validators.required
      ),
      production_Product_Offtakers: new FormControl(
        this.oilAndGasBody.production_Product_Offtakers,
        Validators.required
      ),
      challenges: new FormControl(
        this.oilAndGasBody.challenges,
        Validators.required
      ),
      project_Timeline: new FormControl(
        this.oilAndGasBody.project_Timeline,
        Validators.required
      ),
      conformity_Assessment: new FormControl(
        this.oilAndGasBody.conformity_Assessment,
        Validators.required
      ),
      new_Technology_: new FormControl(
        this.oilAndGasBody.new_Technology_,
        Validators.required
      ),
      has_it_been_adopted_by_DPR_: new FormControl(
        this.oilAndGasBody.has_it_been_adopted_by_DPR_,
        Validators.required
      ),
      comment_: new FormControl(
        this.oilAndGasBody.comment_,
        Validators.required
      ),
      planned_ongoing_and_routine_maintenance: new FormControl(
        this.oilAndGasBody.planned_ongoing_and_routine_maintenance,
        Validators.required
      ),
      actual_capital_expenditure_Current_year_NGN: new FormControl(
        this.oilAndGasBody.actual_capital_expenditure_Current_year_NGN,
        Validators.required
      ),
      actual_capital_expenditure_Current_year_USD: new FormControl(
        this.oilAndGasBody.actual_capital_expenditure_Current_year_USD,
        Validators.required
      ),
      proposed_Capital_Expenditure_NGN: new FormControl(
        this.oilAndGasBody.proposed_Capital_Expenditure_NGN,
        Validators.required
      ),
      proposed_Capital_Expenditure_USD: new FormControl(
        this.oilAndGasBody.proposed_Capital_Expenditure_USD,
        Validators.required
      ),
      project_Stage: new FormControl(
        this.oilAndGasBody.project_Stage,
        Validators.required
      ),
      nigerian_Content_Value: new FormControl(
        this.oilAndGasBody.nigerian_Content_Value,
        Validators.required
      ),
      product_Off_takers: new FormControl(
        this.oilAndGasBody.product_Off_takers,
        Validators.required
      ),
      actual_Proposed: new FormControl(
        this.oilAndGasBody.actual_Proposed,
        Validators.required
      ),
    });
    this.newTechnologyForm = new FormGroup({
      name: new FormControl(this.newTechnologyBody.name, Validators.required),
      objective: new FormControl(
        this.newTechnologyBody.objective,
        Validators.required
      ),
      existing_Alternatives: new FormControl(
        this.newTechnologyBody.existing_Alternatives,
        Validators.required
      ),
      dpR_Consent: new FormControl(
        this.newTechnologyBody.dpR_Consent,
        Validators.required
      ),
      cost: new FormControl(this.newTechnologyBody.cost, Validators.required),
      benefits: new FormControl(
        this.newTechnologyBody.benefits,
        Validators.required
      ),
      challenges: new FormControl(
        this.newTechnologyBody.challenges,
        Validators.required
      ),
      timeline: new FormControl(
        this.newTechnologyBody.timeline,
        Validators.required
      ),
    });
    this.facilitiesProjectPerformanceForm = new FormGroup({
      list_of_Projects: new FormControl(
        this.facilitiesProjectPerformanceBody.list_of_Projects,
        Validators.required
      ),
      planned_completion: new FormControl(
        this.facilitiesProjectPerformanceBody.planned_completion,
        Validators.required
      ),
      actual_completion: new FormControl(
        this.facilitiesProjectPerformanceBody.actual_completion,
        Validators.required
      ),
      areThereEvidenceOfDesignSafetyCaseApproval: new FormControl(
        this.facilitiesProjectPerformanceBody.areThereEvidenceOfDesignSafetyCaseApproval,
        Validators.required
      ),
      evidenceOfDesignSafetyCaseApprovalFilename: new FormControl(
        this.facilitiesProjectPerformanceBody.evidenceOfDesignSafetyCaseApprovalFilename,
        Validators.required
      ),
      reasonForNoEvidence: new FormControl(
        this.facilitiesProjectPerformanceBody.reasonForNoEvidence,
        Validators.required
      ),
    });

    this.getBudgetData();
  }

    getBudgetData() {
      this.workprogram.getFormThreeBudget_3(this.genk.OmlName, this.genk.wpYear, this.genk.fieldName)
      .subscribe(res => {
        let oilInfo = this.oilAndGasBody as oilAndGasFacilityMaintenanceProject;
        let techInfo = this.newTechnologyBody as newTechnologyAndConformityAssessment;
        let facInfo = this.facilitiesProjectPerformanceBody as facilitiesProjectPerformance;

      if (res.oilAndGasProjects != null && res.oilAndGasProjects.length > 0) {
        oilInfo = res
          .oilAndGasProjects[0] as oilAndGasFacilityMaintenanceProject;
        this.loadTable_OilGas(res.oilAndGasProjects);
      }
      if (
        res.oilCondensateTechnologyAssessment != null &&
        res.oilCondensateTechnologyAssessment.length > 0
      ) {
        techInfo = res
          .oilCondensateTechnologyAssessment[0] as newTechnologyAndConformityAssessment;
        this.loadTable_Technology(res.oilCondensateTechnologyAssessment);
      }
      if (
        res.facilitiesProjetPerformance != null &&
        res.facilitiesProjetPerformance.length > 0
      ) {
        facInfo = res
          .facilitiesProjetPerformance[0] as facilitiesProjectPerformance;
        this.loadTable_Facility(res.facilitiesProjetPerformance);
      }
      this.oilAndGasBody = oilInfo;
      this.newTechnologyBody = techInfo;
      this.facilitiesProjectPerformanceBody = facInfo;
    });
  }

  loadTable_OilGas(data) {
    this.columnHeader = [];
    this.columnValue = [];

    if (data != null) {
      data = this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.columnHeader.push(data[0]);
      this.columnValue.push(result);
    } else {
      for (let item1 in this.oilAndGasForm.controls) {
        if (item1 != 'comment') {
          this.columnHeader.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.columnValue.push(this.oilAndGasBody[item1]);
        }
      }
    }
    this.isTabVisible = true;
    this.cd.markForCheck();
  }

  Delete_OilGas(event) {
    let info = this.oilAndGasBody as oilAndGasFacilityMaintenanceProject;

    this.workprogram
      .post_OilGas(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        event.target.value,
        'DELETE'
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_OilGas(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  loadTable_Technology(data) {
    this.columnHeader_2 = [];
    this.columnValue_2 = [];

    if (data != null) {
      data = this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.columnHeader_2.push(data[0]);
      this.columnValue_2.push(result);
    } else {
      for (let item1 in this.newTechnologyForm.controls) {
        if (item1 != 'comment') {
          this.columnHeader_2.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.columnValue_2.push(this.newTechnologyBody[item1]);
        }
      }
    }
    this.isTabVisible_2 = true;
    this.cd.markForCheck();
  }

  Delete_Technology(event) {
    let info = this.newTechnologyBody as newTechnologyAndConformityAssessment;
      this.workprogram
      .post_Technology(info, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName, event.target.value, "DELETE")
        .subscribe(res => {
          if(res.statusCode == 300){
            this.modalService.logNotice("Error", res.message, 'error');
          }
          else{
          this.loadTable_Technology(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  loadTable_Facility(data) {
    this.columnHeader_3 = [];
    this.columnValue_3 = [];

    if (data != null) {
      data = this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.columnHeader_3.push(data[0]);
      this.columnValue_3.push(result);
    } else {
      for (let item1 in this.facilitiesProjectPerformanceForm.controls) {
        if (item1 != 'comment') {
          this.columnHeader_3.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.columnValue_3.push(this.facilitiesProjectPerformanceBody[item1]);
        }
      }
    }
    this.isTabVisible_3 = true;
    this.cd.markForCheck();
  }

  Delete_Facility(event) {
    let info = this.facilitiesProjectPerformanceBody as facilitiesProjectPerformance;
      this.workprogram
      .post_FacilityProject(info, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName, event.target.value, "DELETE")
        .subscribe(res => {
          debugger;
          if(res.statusCode == 300){
            this.modalService.logNotice("Error", res.message, 'error');
          }
          else{
          this.loadTable_Facility(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  filter(data) {
    const resultArray = Object.keys(data).map((index) => {
      let person = data[index];
      return person;
    });
    resultArray.forEach((element) => {
      delete element['companY_ID'];
      delete element['companyNumber'];
      delete element['companyName'];
      delete element['companyemail'];
      delete element['consession_Type'];
      delete element['contract_Type'];
      delete element['created_by'];
      delete element['date_Updated'];
      delete element['omL_ID'];
      delete element['omL_Name'];
      delete element['terrain'];
      delete element['updated_by'];
      delete element['year_of_WP'];
    });
    return resultArray;
  }
  saveOilGas() {
    let budgetInfo = {} as oilAndGasFacilityMaintenanceProject;
    this.oilAndGasBody.companyNumber = 0;
    this.oilAndGasBody.id = 0;
    this.oilAndGasBody.year_of_WP = this.genk.wpYear;
    this.oilAndGasBody.omL_Name = this.genk.OmlName;
    for (let item in this.oilAndGasBody) {
      if (item != 'id' && item != 'field_ID') {
        budgetInfo[this.genk.upperText(item)] =
          this.oilAndGasBody[item]?.toString() ?? '';
      }
    }
    this.workprogram
      .post_OilGas(
        budgetInfo,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_OilGas(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  saveTechnology() {
          let budgetInfo = {} as newTechnologyAndConformityAssessment;
          this.newTechnologyBody.companyNumber = 0;
          this.newTechnologyBody.id =  0;
          this.newTechnologyBody.year_of_WP = this.genk.wpYear;
          this.newTechnologyBody.omL_Name= this.genk.OmlName;
          for (let item in this.newTechnologyBody) {
             if (item != 'id' && item != 'field_ID') {
              budgetInfo[this.genk.upperText(item)] = this.newTechnologyBody[item]?.toString() ?? '';
            }
          }
          this.workprogram
          .post_Technology(budgetInfo, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName, '','')
            .subscribe(res => {
              if(res.statusCode == 300){
                this.modalService.logNotice("Error", res.message, 'error');
              }
              else{
              this.loadTable_Technology(res.data);
              this.modalService.logNotice("Success", res.message, 'success');
              }
            })
            }

  saveFacility() {
    let budgetInfo = {} as facilitiesProjectPerformance;
    this.facilitiesProjectPerformanceBody.companyNumber = 0;
    this.facilitiesProjectPerformanceBody.id = 0;
    this.facilitiesProjectPerformanceBody.year_of_WP = this.genk.wpYear;
    this.facilitiesProjectPerformanceBody.omL_Name = this.genk.OmlName;
    for (let item in this.facilitiesProjectPerformanceBody) {
      if (item != 'id' && item != 'field_ID') {
        budgetInfo[this.genk.upperText(item)] =
          this.facilitiesProjectPerformanceBody[item]?.toString() ?? '';
      }
    }
    this.workprogram.post_FacilityProject(budgetInfo, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName, '','')
    .subscribe(res => {
      if(res.statusCode == 300){
            this.modalService.logNotice("Error", res.message, 'error');
      }
      else{
            this.loadTable_Facility(res.data);
            this.modalService.logNotice("Success", res.message, 'success');
      }
    })
  }


  saveEvidenceOfDesignSafetyCaseApproval(DeFile: any) {
    this.EvidenceOfDesignSafetyCaseApprovalFile = <File>DeFile.target.files[0];
    if (!this.EvidenceOfDesignSafetyCaseApprovalFile) {
      return;
    }
    if (
      this.EvidenceOfDesignSafetyCaseApprovalFile.size < 1 ||
      this.EvidenceOfDesignSafetyCaseApprovalFile.size > 1024 * 1024 * 50
    ) {
      this.facilitiesProjectPerformanceForm.controls[
        'evidenceOfDesignSafetyCaseApprovalFilename'
      ].setErrors({ incorrect: true });
      this.EvidenceOfDesignSafetyCaseApprovalFile = null;
      return;
    } else {
      this.facilitiesProjectPerformanceForm.controls[
        'evidenceOfDesignSafetyCaseApprovalFilename'
      ].setErrors(null);
    }

    this.EvidenceOfDesignSafetyCaseApprovalNewName = this.gen.getExpDoc(
      this.EvidenceOfDesignSafetyCaseApprovalFile.name,
      this.EvidenceOfDesignSafetyCaseApprovalFile.type
    );

    this.EvidenceOfDesignSafetyCaseApprovalNameDoc = this.gen.trimDocName(
      this.EvidenceOfDesignSafetyCaseApprovalFile.name
    );
    let dockind = this.gen.getExt(
      this.EvidenceOfDesignSafetyCaseApprovalFile.name
    );
  }
}
