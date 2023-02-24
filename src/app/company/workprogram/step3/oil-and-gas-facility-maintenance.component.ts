import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';
import { updateFormValidity } from 'src/app/helpers/updateFormValidity';
import {
  facilitiesProjectPerformance,
  newTechnologyAndConformityAssessment,
  oilAndGasFacilityMaintenanceProject,
} from 'src/app/models/step3-budget-facility-maintenance.model';
import {
  AuthenticationService,
  GenericService,
  IConcession,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './oil-and-gas-facility-maintenance.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPOilAndGasFacilityMaintenanceComponent implements OnInit {
  public SBUTABLE = SBUTABLE;

  public oilAndGasProjects: oilAndGasFacilityMaintenanceProject[] = [];
  public facilitiesProjectPerformances: facilitiesProjectPerformance[] = [];

  oilAndGasForm: FormGroup;
  newTechnologyForm: FormGroup;
  facilitiesProjectPerformanceForm: FormGroup;

  public isOilAndGasFormSubmitted = false;
  public isNewTechnologyFormSubmitted = false;
  public isFacilitiesProjectPerformanceFormSubmitted = false;

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

  //#region table header definitions
  oagpColHeaderDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'actual_Proposed',
      header: 'Please provide values for Actual and Proposed year',
    },
    {
      columnDef: 'proposed_Capital_Expenditure_USD',
      header: 'Budget for other Activities(Dollar)',
    },
    {
      columnDef: 'proposed_Capital_Expenditure_NGN',
      header: 'Budget for Direct Exploration and Production Activities(Naira)',
    },
    {
      columnDef: 'project_Timeline',
      header: 'Project Timeline',
    },

    {
      columnDef: 'project_Stage',
      header: 'Project Stage',
    },
    {
      columnDef: 'production_Product_Offtakers',
      header: 'Product Offtakers',
    },
    // {
    //   columnDef: 'product_Off_takers',
    //   header: 'Budget for Direct Exploration and Production Activities(Naira)',
    // },
    {
      columnDef: 'planned_ongoing_and_routine_maintenance',
      header: 'Planned, ongoing and routine maintenance?',
    },

    // {
    //   columnDef: 'objective_Drivers_',
    //   header: 'Objective / Drivers',
    // },
    {
      columnDef: 'nigerian_Content_Value',
      header: 'Nigerian Content Value',
    },
    {
      columnDef: 'new_Technology_',
      header: 'New Technology',
    },
    // {
    //   columnDef: 'name',
    //   header: 'Name',
    // },
    // {
    //   columnDef: 'major_Projects',
    //   header: 'Major Projects',
    // },
    {
      columnDef: 'has_it_been_adopted_by_DPR_',
      header: 'Has it been adopted by NUPRC?',
    },
    {
      columnDef: 'feed',
      header: 'Feed',
    },
    {
      columnDef: 'detailed_Engineering',
      header: 'Detailed Engineering',
    },
    {
      columnDef: 'construction_Commissioning_',
      header: 'Construction / Commissioning',
    },

    {
      columnDef: 'conceptual',
      header: 'Conceptual',
    },
    {
      columnDef: 'comment_',
      header: 'Comment',
    },
    {
      columnDef: 'completion_Status',
      header: 'Completion Status (%)',
    },
  ];

  facColHeaderDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'areThereEvidenceOfDesignSafetyCaseApproval',
      header: 'Do you have Evidence of Design Safety Case Approval?',
    },
    {
      columnDef: 'list_of_Projects',
      header: 'List of Projects',
    },
    {
      columnDef: 'planned_completion',
      header: 'Planned Completion Status (%)',
    },
    {
      columnDef: 'actual_completion',
      header: 'Actual Completion Status (%)',
    },
    {
      columnDef: 'evidenceOfDesignSafetyCaseApprovalPath',
      header: 'Evidence of Design Safety Case Approval',
    },
    {
      columnDef: 'reasonForNoEvidence',
      header: 'Reason (If no Evidence of Design Safety Case Approval)',
    },
  ];
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
      // major_Projects: new FormControl(
      //   this.oilAndGasBody.major_Projects,
      //   Validators.required
      // ),
      // name: new FormControl(this.oilAndGasBody.name, Validators.required),
      // objective_Drivers_: new FormControl(
      //   this.oilAndGasBody.objective_Drivers_,
      //   Validators.required
      // ),
      approval_License_Permits: new FormControl(
        this.oilAndGasBody.approval_License_Permits,
        Validators.required
      ),
      // capeX_Oversight: new FormControl(
      //   this.oilAndGasBody.capeX_Oversight,
      //   Validators.required
      // ),
      // budget_Performance: new FormControl(
      //   this.oilAndGasBody.budget_Performance,
      //   Validators.required
      // ),
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
      // conformity_Assessment: new FormControl(
      //   this.oilAndGasBody.conformity_Assessment,
      //   Validators.required
      // ),
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
      // product_Off_takers: new FormControl(
      //   this.oilAndGasBody.product_Off_takers,
      //   Validators.required
      // ),
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

    this.getAreThereEvidenceOfDSCAControl.valueChanges.subscribe(
      (c: 'Yes' | 'No') => {
        if (c === 'Yes') {
          this.getReasonForNoEvidence.disable();
          this.getEvidenceOfDesignSafetyCaseApproval.enable();
        } else {
          this.getEvidenceOfDesignSafetyCaseApproval.disable();
          this.getReasonForNoEvidence.enable();
        }
      }
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

    this.getBudgetData();
  }

  public get og() {
    return this.oilAndGasForm.controls;
  }

  public get nt() {
    return this.newTechnologyForm.controls;
  }

  public get fp() {
    return this.facilitiesProjectPerformanceForm.controls;
  }

  public get getAreThereEvidenceOfDSCAControl() {
    return this.facilitiesProjectPerformanceForm.controls[
      'areThereEvidenceOfDesignSafetyCaseApproval'
    ];
  }

  public get getEvidenceOfDesignSafetyCaseApproval() {
    return this.facilitiesProjectPerformanceForm.controls[
      'evidenceOfDesignSafetyCaseApprovalFilename'
    ];
  }

  public get getReasonForNoEvidence() {
    return this.facilitiesProjectPerformanceForm.controls[
      'reasonForNoEvidence'
    ];
  }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.genk.disableForm ? true : null;
  }

  getBudgetData() {
    this.workprogram
      .getFormThreeBudget_3(
        this.genk.OmlName,
        this.genk.wpYear,
        this.genk.fieldName
      )
      .subscribe((res) => {
        let oilInfo = this.oilAndGasBody as oilAndGasFacilityMaintenanceProject;
        let techInfo = this
          .newTechnologyBody as newTechnologyAndConformityAssessment;
        let facInfo = this
          .facilitiesProjectPerformanceBody as facilitiesProjectPerformance;

        if (res.oilAndGasProjects != null && res.oilAndGasProjects.length > 0) {
          this.oilAndGasProjects = res.oilAndGasProjects;
          oilInfo = res
            .oilAndGasProjects[0] as oilAndGasFacilityMaintenanceProject;
        } else {
          this.oilAndGasProjects = [];
          oilInfo = new oilAndGasFacilityMaintenanceProject();
        }

        if (
          res.oilCondensateTechnologyAssessment != null &&
          res.oilCondensateTechnologyAssessment.length > 0
        ) {
          techInfo = res
            .oilCondensateTechnologyAssessment[0] as newTechnologyAndConformityAssessment;
        }
        if (
          res.facilitiesProjetPerformance != null &&
          res.facilitiesProjetPerformance.length > 0
        ) {
          this.facilitiesProjectPerformances = res.facilitiesProjetPerformance;
          facInfo = res
            .facilitiesProjetPerformance[0] as facilitiesProjectPerformance;
        }
        // this.oilAndGasBody = oilInfo;
        this.newTechnologyBody = techInfo;
        // this.facilitiesProjectPerformanceBody = facInfo;

        this.cd.markForCheck();
      });
  }

  Delete_OilGas(row) {
    let info = this.oilAndGasBody as oilAndGasFacilityMaintenanceProject;

    this.workprogram
      .post_OilGas(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.getBudgetData();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_Technology(event) {
    let info = this.newTechnologyBody as newTechnologyAndConformityAssessment;
    this.workprogram
      .post_Technology(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        event.target.value,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.getBudgetData();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_Facility(row) {
    let info = this
      .facilitiesProjectPerformanceBody as facilitiesProjectPerformance;
    this.workprogram
      .post_FacilityProject(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.getBudgetData();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
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
    //console.log(this.oilAndGasForm);
    this.isOilAndGasFormSubmitted = true;
    if (this.oilAndGasForm.invalid) return;
    this.genk.removeCommaBody(this.oilAndGasBody);

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
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.isOilAndGasFormSubmitted = false;
          this.oilAndGasBody = {} as oilAndGasFacilityMaintenanceProject;
          this.oilAndGasForm = updateFormValidity(this.oilAndGasForm);
          this.getBudgetData();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  saveTechnology() {
    this.isNewTechnologyFormSubmitted = true;
    if (this.newTechnologyForm.invalid) return;

    let budgetInfo = {} as newTechnologyAndConformityAssessment;
    this.genk.removeCommaBody(this.newTechnologyBody);

    this.newTechnologyBody.companyNumber = 0;
    this.newTechnologyBody.id = 0;
    this.newTechnologyBody.year_of_WP = this.genk.wpYear;
    this.newTechnologyBody.omL_Name = this.genk.OmlName;
    for (let item in this.newTechnologyBody) {
      if (item != 'id' && item != 'field_ID') {
        budgetInfo[this.genk.upperText(item)] =
          this.newTechnologyBody[item]?.toString() ?? '';
      }
    }
    this.workprogram
      .post_Technology(
        budgetInfo,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.isNewTechnologyFormSubmitted = false;
          this.newTechnologyBody = {} as newTechnologyAndConformityAssessment;
          this.newTechnologyForm = updateFormValidity(this.newTechnologyForm);
          this.getBudgetData();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  saveFacility() {
    this.isFacilitiesProjectPerformanceFormSubmitted = true;
    if (this.facilitiesProjectPerformanceForm.invalid) return;
    this.genk.removeCommaBody(this.facilitiesProjectPerformanceBody);

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

    const formDat: FormData = new FormData();
    budgetInfo.id = 0;
    for (const key in budgetInfo) {
      if (budgetInfo[key]) {
        formDat.append(key.toString(), budgetInfo[key]);
      }
    }
    if (this.EvidenceOfDesignSafetyCaseApprovalFile) {
      formDat.append(
        this.EvidenceOfDesignSafetyCaseApprovalNameDoc,
        this.EvidenceOfDesignSafetyCaseApprovalFile,
        this.EvidenceOfDesignSafetyCaseApprovalNewName
      );
    }

    this.workprogram
      .post_FacilityProject(
        formDat,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');
          this.isFacilitiesProjectPerformanceFormSubmitted = false;
          this.facilitiesProjectPerformanceBody =
            {} as facilitiesProjectPerformance;
          this.facilitiesProjectPerformanceForm = updateFormValidity(
            this.facilitiesProjectPerformanceForm
          );
          this.getBudgetData();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
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
