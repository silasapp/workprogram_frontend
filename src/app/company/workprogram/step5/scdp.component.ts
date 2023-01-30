import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';
import {
  HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_PLANNED_AND_ACTUAL,
  HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_QUESTION,
  HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_MOU,
  HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_SCHOLASHIP_SCHEME,
  PICTURE_UPLOAD_COMMUNITY_DEVELOPMENT_PROJECT,
  HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Training_Skill_Acquisition,
  HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Scholarship,
  HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW,
  HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_TRAINING_SCHEME,
} from 'src/app/models/step5_sdcp.model';
import {
  AuthenticationService,
  GenericService,
  IConcession,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './scdp.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPScdpComponent implements OnInit {
  public disableForm: boolean = true;
  public SBUTABLE = SBUTABLE;

  //#region  documnent objects declaration
  mediatype = 'doc';

  ResponderFile?: File = null;
  ResponderNewName: string;
  ResponderNameDoc: string;

  OSCPFile?: File = null;
  OSCPNewName: string;
  OSCPNameDoc: string;

  GMOUFile?: File = null;
  GMOUNewName: string;
  GMOUNameDoc: string;

  BenefFile?: File = null;
  BenefNewName: string;
  BenefNameDoc: string;

  Benef_2File?: File = null;
  Benef_2NewName: string;
  Benef_2NameDoc: string;

  PictureFile?: File = null;
  PictureNewName: string;
  PictureNameDoc: string;
  //#endregion

  genk: GenericService;
  SCDP_CSR_Form: FormGroup;
  SCDP_Question_Form: FormGroup;
  SCDP_MOU_Form: FormGroup;
  SCDP_CapitalProjects_Form: FormGroup;

  SCDP_Scholarship_Form: FormGroup;
  SCDP_Scholarship_CSR_Form: FormGroup;
  SCDP_TrainingSkills_CSR_Form: FormGroup;
  SCDP_TrainingDetails_CSR_Form: FormGroup;
  SCDP_Pictures_CSR_Form: FormGroup;

  scdp_csr_Body: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_PLANNED_AND_ACTUAL =
    {} as HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_PLANNED_AND_ACTUAL;
  scdp_question_Body: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_QUESTION =
    {} as HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_QUESTION;
  scdp_mou_Body: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_MOU =
    {} as HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_MOU;
  scdp_capitalprojects_Body: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW =
    {} as HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW;

  scdp_scholarship_Body: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_SCHOLASHIP_SCHEME =
    {} as HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_SCHOLASHIP_SCHEME;
  scdp_scholarship_csr_Body: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Scholarship =
    {} as HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Scholarship;
  scdp_trainingskills_csr_Body: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Training_Skill_Acquisition =
    {} as HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Training_Skill_Acquisition;
  scdp_trainingdetails_csr_Body: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_TRAINING_SCHEME =
    {} as HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_TRAINING_SCHEME;
  scdp_pictures_Body: PICTURE_UPLOAD_COMMUNITY_DEVELOPMENT_PROJECT =
    {} as PICTURE_UPLOAD_COMMUNITY_DEVELOPMENT_PROJECT;

  //#region Column header definitions
  hscdpcColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'WORK PROGRAM YEAR',
    },
    {
      columnDef: 'description_of_Projects_Planned',
      header: 'DESCRIPTION OF PROJECTS PLANNED',
    },
    {
      columnDef: 'description_of_Projects_Actual',
      header: 'DESCRIPTION OF PROJECTS ACTUAL',
    },
  ];

  hmouColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'WORK PROGRAM YEAR',
    },
    {
      columnDef: 'have_you_submitted_all_MoUs_to_DPR',
      header: 'Have you submitted all MoUs',
    },
    {
      columnDef: 'if_NO_why',
      header: 'If NO, Give Reason',
    },
    {
      columnDef: 'do_you_have_an_MOU_with_the_communities_for_all_your_assets',
      header: 'Do you have an MOU with the communities for all your assets',
    },
    {
      columnDef: 'mouResponderInPlace',
      header: 'Do you have in place, MOU with oil spill responders?',
    },
    {
      columnDef: 'mouResponderFilename',
      header: 'Evidence of MOU with responders',
    },
    {
      columnDef: 'mouoscpFilename',
      header: 'OSCP document',
    },
  ];

  hmoupColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'WORK PROGRAM YEAR',
    },
    {
      columnDef: 'type_of_project_excuted',
      header: 'TYPE OF PROJECT EXECUTED',
    },
    {
      columnDef: 'year_GMou_was_signed',
      header: 'YEAR GMOU WAS SIGNED',
    },
    {
      columnDef: 'project_Location',
      header: 'PROJECT LOCATION',
    },
    {
      columnDef: 'component_of_project',
      header: 'COMPONENT OF PROJECT',
    },
    {
      columnDef: 'actual_Budget_Total_Dollars',
      header: 'ACTUAL BUDGET TOTAL ($)',
    },
    {
      columnDef: 'beneficiary_Community',
      header: 'BENEFICIARY COMMUNITY',
    },
    {
      columnDef: 'status_Of_Project',
      header: 'STATUS OF PROJECT',
    },
    {
      columnDef: 'mouUploadFilename',
      header: 'MOU File',
    },
  ];

  hcpColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'WORK PROGRAM YEAR',
    },
    {
      columnDef: 'type_of_project_excuted',
      header: 'ACTUAL / PROPOSED',
    },
    {
      columnDef: 'year_GMou_was_signed',
      header: 'PROJECT TITLE',
    },
    {
      columnDef: 'project_Location',
      header: 'BUDGET PERFORMANCE(PLANNED)',
    },
    {
      columnDef: 'component_of_project',
      header: 'BUDGET PERFORMANCE (ACTUAL)',
    },
    {
      columnDef: 'actual_Budget_Total_Dollars',
      header: 'PERCENTAGE COMPLETION',
    },
    {
      columnDef: 'beneficiary_Community',
      header: 'BENEFICIARY COMMUNITIES',
    },
  ];

  hsColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'WORK PROGRAM YEAR',
    },
    {
      columnDef: 'actual_proposed',
      header: 'ACTUAL / PROPOSED',
    },
    {
      columnDef: 'csR_',
      header: 'PROJECT TITLE',
    },
    {
      columnDef: 'budget_',
      header: 'BUDGET',
    },
    {
      columnDef: 'actual_Spent',
      header: 'ACTUAL SPENT',
    },
    {
      columnDef: 'percentage_Completion_',
      header: 'PERCENTAGE COMPLETION',
    },
    {
      columnDef: 'beneficiary_Communities_host',
      header: 'BENEFICIARY (HOST)',
    },
    {
      columnDef: 'beneficiary_Communities_National',
      header: 'BENEFICIARY (NATIONAL)',
    },
  ];

  hssColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'WORK PROGRAM YEAR',
    },
    {
      columnDef: 'nameOfCommunity',
      header: 'NAME OF COMMUNITY',
    },
    {
      columnDef: 'year_GMou_was_signed',
      header: 'YEAR GMOU WAS SIGNED',
    },
    {
      columnDef: 'scholarshipYear',
      header: 'SCHOLARSHIP YEAR',
    },
    {
      columnDef: 'componentOfScholarship',
      header: 'COMPONENT OF SCHOLARSHIP',
    },
    {
      columnDef: 'actual_Budget_Total_Dollars',
      header: 'ACTUAL BUDGET TOTAL (USD)',
    },
    {
      columnDef: 'ssUploadFilename',
      header: 'BENEFICIARIES',
    },
  ];

  htsaColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'WORK PROGRAM YEAR',
    },
    {
      columnDef: 'actual_proposed',
      header: 'ACTUAL / PROPOSED',
    },
    {
      columnDef: 'csR_',
      header: 'PROJECT TITLE',
    },
    {
      columnDef: 'budget_',
      header: 'PLANNED (BUDGET)',
    },
    {
      columnDef: 'actual_Spent',
      header: 'ACTUAL (BUDGET)',
    },
    {
      columnDef: 'percentage_Completion_',
      header: 'PERCENTAGE COMPLETION',
    },
    {
      columnDef: 'beneficiary_Communities_host',
      header: 'BENEFICIARY (HOST)',
    },
    {
      columnDef: 'beneficiary_Communities_National',
      header: 'BENEFICIARY (NATIONAL)',
    },
  ];

  htsdColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'WORK PROGRAM YEAR',
    },
    {
      columnDef: 'nameOfCommunity',
      header: 'NAME OF COMMUNITY',
    },
    {
      columnDef: 'year_GMou_was_signed',
      header: 'YEAR GMOU WAS SIGNED',
    },
    {
      columnDef: 'trainingYear',
      header: 'TRAINING YEAR',
    },
    {
      columnDef: 'componentOfTraining',
      header: 'COMPONENT OF TRAINING',
    },
    {
      columnDef: 'actual_Budget_Total_Dollars',
      header: 'ACTUAL BUDGET TOTAL (USD)',
    },
    {
      columnDef: 'statusOfTraining',
      header: 'STATUS OF TRAINING',
    },
    {
      columnDef: 'tsUploadFilePath',
      header: 'Beneficiaries',
    },
  ];

  hpcdColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'WORK PROGRAM YEAR',
    },
    {
      columnDef: 'companyemail',
      header: 'Email',
    },
    {
      columnDef: 'companyName',
      header: 'Compamy Name',
    },
    {
      columnDef: 'uploaded_presentation',
      header: 'attachemnt',
    },
  ];
  //#endregion

  //#region list declarations
  sustainableCommunityDPCs: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_PLANNED_AND_ACTUAL[] =
    [];
  mouQuestions: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_QUESTION[] =
    [];
  mouProjects: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_MOU[] = [];
  capitalProjects: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW[] =
    [];
  scholarships: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_SCHOLASHIP_SCHEME[] =
    [];
  scholarshipSchemes: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_SCHOLASHIP_SCHEME[] =
    [];
  trainingSkillsAndAcquisitions: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_CSR_NEW_Training_Skill_Acquisition[] =
    [];
  trainingSkillAndDetails: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_TRAINING_SCHEME[] =
    [];
  picturesForCommunityDevelopments: PICTURE_UPLOAD_COMMUNITY_DEVELOPMENT_PROJECT[] =
    [];
  //#endregion
  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      this.getSCDP();
    });
    this.cd.markForCheck();
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP5';
    this.SCDP_CSR_Form = new FormGroup(
      {
        description_of_Projects_Actual: new FormControl(
          this.scdp_csr_Body.description_of_Projects_Actual,
          [Validators.required]
        ),
        description_of_Projects_Planned: new FormControl(
          this.scdp_csr_Body.description_of_Projects_Planned,
          [Validators.required]
        ),
      },
      {}
    );

    this.SCDP_Question_Form = new FormGroup(
      {
        have_you_submitted_all_MoUs_to_DPR: new FormControl(
          this.scdp_question_Body.have_you_submitted_all_MoUs_to_DPR,
          [Validators.required]
        ),
        do_you_have_an_MOU_with_the_communities_for_all_your_assets:
          new FormControl(
            this.scdp_question_Body.do_you_have_an_MOU_with_the_communities_for_all_your_assets,
            [Validators.required]
          ),
        if_NO_why: new FormControl(this.scdp_question_Body.if_NO_why, [
          Validators.required,
        ]),
        mOUResponderInPlace: new FormControl(
          this.scdp_question_Body.mOUResponderInPlace,
          [Validators.required]
        ),
        mOUOSCPFilePath: new FormControl(
          this.scdp_question_Body.mOUOSCPFilePath,
          [Validators.required]
        ),
        mOUResponderFilePath: new FormControl(
          this.scdp_question_Body.mOUResponderFilePath,
          [Validators.required]
        ),
      },
      {}
    );
    this.SCDP_MOU_Form = new FormGroup(
      {
        actual_Budget_Total_Dollars: new FormControl(
          this.scdp_mou_Body.actual_Budget_Total_Dollars,
          [Validators.required]
        ),
        beneficiary_Community: new FormControl(
          this.scdp_mou_Body.beneficiary_Community,
          [Validators.required]
        ),
        component_of_project: new FormControl(
          this.scdp_mou_Body.component_of_project,
          [Validators.required]
        ),
        project_Location: new FormControl(this.scdp_mou_Body.project_Location, [
          Validators.required,
        ]),
        status_Of_Project: new FormControl(
          this.scdp_mou_Body.status_Of_Project,
          [Validators.required]
        ),
        type_of_project_excuted: new FormControl(
          this.scdp_mou_Body.type_of_project_excuted,
          [Validators.required]
        ),
        year_GMou_was_signed: new FormControl(
          this.scdp_mou_Body.year_GMou_was_signed,
          [Validators.required]
        ),
        gMOUFilePath: new FormControl(this.scdp_mou_Body.gMOUFilePath, [
          Validators.required,
        ]),
      },
      {}
    );
    this.SCDP_CapitalProjects_Form = new FormGroup(
      {
        beneficiary_Communities: new FormControl(
          this.scdp_capitalprojects_Body.beneficiary_Communities,
          [Validators.required]
        ),
        budget_: new FormControl(this.scdp_capitalprojects_Body.budget_, [
          Validators.required,
        ]),
        actual_proposed: new FormControl(
          this.scdp_capitalprojects_Body.actual_proposed,
          [Validators.required]
        ),
        actual_Spent: new FormControl(
          this.scdp_capitalprojects_Body.actual_Spent,
          [Validators.required]
        ),
        cSR_: new FormControl(this.scdp_capitalprojects_Body.cSR_, [
          Validators.required,
        ]),
        // cSR_: new FormControl(this.scdp_capitalprojects_Body., [Validators.required]),
        percentage_Completion_: new FormControl(
          this.scdp_capitalprojects_Body.percentage_Completion_,
          [Validators.required]
        ),
      },
      {}
    );

    this.SCDP_Scholarship_Form = new FormGroup(
      {
        actual_Budget_Total_Dollars: new FormControl(
          this.scdp_scholarship_Body.actual_Budget_Total_Dollars,
          [Validators.required]
        ),
        componentOfScholarship: new FormControl(
          this.scdp_scholarship_Body.componentOfScholarship,
          [Validators.required]
        ),
        nameOfCommunity: new FormControl(
          this.scdp_scholarship_Body.nameOfCommunity,
          [Validators.required]
        ),
        scholarshipYear: new FormControl(
          this.scdp_scholarship_Body.scholarshipYear,
          [Validators.required]
        ),
        year_GMou_was_signed: new FormControl(
          this.scdp_scholarship_Body.year_GMou_was_signed,
          [Validators.required]
        ),
        sSUploadFilePath: new FormControl(
          this.scdp_scholarship_Body.sSUploadFilePath,
          [Validators.required]
        ),
      },
      {}
    );
    this.SCDP_Scholarship_CSR_Form = new FormGroup(
      {
        actual_proposed: new FormControl(
          this.scdp_scholarship_csr_Body.actual_proposed,
          [Validators.required]
        ),
        actual_Spent: new FormControl(
          this.scdp_scholarship_csr_Body.actual_Spent,
          [Validators.required]
        ),
        beneficiary_Communities_National: new FormControl(
          this.scdp_scholarship_csr_Body.beneficiary_Communities_National,
          [Validators.required]
        ),
        beneficiary_Communities_host: new FormControl(
          this.scdp_scholarship_csr_Body.beneficiary_Communities_host,
          [Validators.required]
        ),
        budget_: new FormControl(this.scdp_scholarship_csr_Body.budget_, [
          Validators.required,
        ]),
        cSR_: new FormControl(this.scdp_scholarship_csr_Body.cSR_, [
          Validators.required,
        ]),
        percentage_Completion_: new FormControl(
          this.scdp_scholarship_csr_Body.percentage_Completion_,
          [Validators.required]
        ),
      },
      {}
    );

    this.SCDP_TrainingSkills_CSR_Form = new FormGroup(
      {
        actual_Spent: new FormControl(
          this.scdp_trainingskills_csr_Body.actual_Spent,
          [Validators.required]
        ),
        actual_proposed: new FormControl(
          this.scdp_trainingskills_csr_Body.actual_proposed,
          [Validators.required]
        ),
        beneficiary_Communities_National: new FormControl(
          this.scdp_trainingskills_csr_Body.beneficiary_Communities_National,
          [Validators.required]
        ),
        beneficiary_Communities_host: new FormControl(
          this.scdp_trainingskills_csr_Body.beneficiary_Communities_host,
          [Validators.required]
        ),
        budget_: new FormControl(this.scdp_trainingskills_csr_Body.budget_, [
          Validators.required,
        ]),
        cSR_: new FormControl(this.scdp_trainingskills_csr_Body.cSR_, [
          Validators.required,
        ]),
        percentage_Completion_: new FormControl(
          this.scdp_trainingskills_csr_Body.percentage_Completion_,
          [Validators.required]
        ),
      },
      {}
    );

    this.SCDP_TrainingDetails_CSR_Form = new FormGroup(
      {
        actual_Budget_Total_Dollars: new FormControl(
          this.scdp_trainingdetails_csr_Body.actual_Budget_Total_Dollars,
          [Validators.required]
        ),
        componentOfTraining: new FormControl(
          this.scdp_trainingdetails_csr_Body.componentOfTraining,
          [Validators.required]
        ),
        statusOfTraining: new FormControl(
          this.scdp_trainingdetails_csr_Body.statusOfTraining,
          [Validators.required]
        ),
        trainingYear: new FormControl(
          this.scdp_trainingdetails_csr_Body.trainingYear,
          [Validators.required]
        ),
        year_GMou_was_signed: new FormControl(
          this.scdp_trainingdetails_csr_Body.year_GMou_was_signed,
          [Validators.required]
        ),
        nameOfCommunity: new FormControl(
          this.scdp_trainingdetails_csr_Body.nameOfCommunity,
          [Validators.required]
        ),
        tSUploadFilePath: new FormControl(
          this.scdp_trainingdetails_csr_Body.tSUploadFilePath,
          [Validators.required]
        ),
        // tSUploadFilename: new FormControl(this.scdp_trainingdetails_csr_Body.tSUploadFilename, [Validators.required])
      },
      {}
    );
    this.SCDP_Pictures_CSR_Form = new FormGroup(
      {
        uploaded_presentation: new FormControl(
          this.scdp_pictures_Body.uploaded_presentation,
          [Validators.required]
        ),
      },
      {}
    );

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

    this.getSCDP();
  }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.disableForm ? true : null;
  }

  //#region Documents Upload Section
  saveResponderDoc(DeFile: any) {
    this.ResponderFile = <File>DeFile.target.files[0];
    if (!this.ResponderFile) {
      return;
    }
    if (
      this.ResponderFile.size < 1 ||
      this.ResponderFile.size > 1024 * 1024 * 50
    ) {
      this.SCDP_CSR_Form.controls['mOUResponderFilePath'].setErrors({
        incorrect: true,
      });
      this.ResponderFile = null;
      return;
    } else {
      this.SCDP_CSR_Form.controls['mOUResponderFilePath'].setErrors(null);
    }
    this.ResponderNewName = this.gen.getExpDoc(
      this.ResponderFile.name,
      this.ResponderFile.type
    );
    this.ResponderNameDoc = this.gen.trimDocName(this.ResponderFile.name);
    let dockind = this.gen.getExt(this.ResponderFile.name);
  }

  saveOSCPDoc(DeFile: any) {
    this.OSCPFile = <File>DeFile.target.files[0];
    if (!this.OSCPFile) {
      return;
    }
    if (this.OSCPFile.size < 1 || this.OSCPFile.size > 1024 * 1024 * 50) {
      this.SCDP_CSR_Form.controls['mOUOSCPFilePath'].setErrors({
        incorrect: true,
      });
      this.OSCPFile = null;
      return;
    } else {
      this.SCDP_CSR_Form.controls['mOUOSCPFilePath'].setErrors(null);
    }
    this.OSCPNewName = this.gen.getExpDoc(
      this.OSCPFile.name,
      this.OSCPFile.type
    );
    this.OSCPNameDoc = this.gen.trimDocName(this.OSCPFile.name);
    let dockind = this.gen.getExt(this.OSCPFile.name);
  }
  saveGMOUDoc(DeFile: any) {
    this.GMOUFile = <File>DeFile.target.files[0];
    if (!this.GMOUFile) {
      return;
    }
    if (this.GMOUFile.size < 1 || this.GMOUFile.size > 1024 * 1024 * 50) {
      this.SCDP_MOU_Form.controls['gMOUFilePath'].setErrors({
        incorrect: true,
      });
      this.GMOUFile = null;
      return;
    } else {
      this.SCDP_MOU_Form.controls['gMOUFilePath'].setErrors(null);
    }
    this.GMOUNewName = this.gen.getExpDoc(
      this.GMOUFile.name,
      this.GMOUFile.type
    );
    this.GMOUNameDoc = this.gen.trimDocName(this.GMOUFile.name);
    let dockind = this.gen.getExt(this.GMOUFile.name);
  }

  saveBenefDoc(DeFile: any) {
    this.BenefFile = <File>DeFile.target.files[0];
    if (!this.BenefFile) {
      return;
    }
    if (this.BenefFile.size < 1 || this.BenefFile.size > 1024 * 1024 * 50) {
      this.SCDP_Scholarship_Form.controls['sSUploadFilePath'].setErrors({
        incorrect: true,
      });
      this.BenefFile = null;
      return;
    } else {
      this.SCDP_Scholarship_Form.controls['sSUploadFilePath'].setErrors(null);
    }
    this.BenefNewName = this.gen.getExpDoc(
      this.BenefFile.name,
      this.BenefFile.type
    );
    this.BenefNameDoc = this.gen.trimDocName(this.BenefFile.name);
    let dockind = this.gen.getExt(this.BenefFile.name);
  }
  saveBenefDoc_2(DeFile: any) {
    this.Benef_2File = <File>DeFile.target.files[0];
    if (!this.Benef_2File) {
      return;
    }
    if (this.Benef_2File.size < 1 || this.Benef_2File.size > 1024 * 1024 * 50) {
      this.SCDP_TrainingDetails_CSR_Form.controls['tSUploadFilePath'].setErrors(
        { incorrect: true }
      );
      this.Benef_2File = null;
      return;
    } else {
      this.SCDP_TrainingDetails_CSR_Form.controls['tSUploadFilePath'].setErrors(
        null
      );
    }
    this.Benef_2NewName = this.gen.getExpDoc(
      this.Benef_2File.name,
      this.Benef_2File.type
    );
    this.Benef_2NameDoc = this.gen.trimDocName(this.Benef_2File.name);
    let dockind = this.gen.getExt(this.Benef_2File.name);
  }
  savePictureDoc(DeFile: any) {
    this.PictureFile = <File>DeFile.target.files[0];
    if (!this.PictureFile) {
      return;
    }
    if (this.PictureFile.size < 1 || this.PictureFile.size > 1024 * 1024 * 50) {
      this.SCDP_Pictures_CSR_Form.controls['uploaded_presentation'].setErrors({
        incorrect: true,
      });
      this.PictureFile = null;
      return;
    } else {
      this.SCDP_Pictures_CSR_Form.controls['uploaded_presentation'].setErrors(
        null
      );
    }
    this.PictureNewName = this.gen.getExpDoc(
      this.PictureFile.name,
      this.PictureFile.type
    );
    this.PictureNameDoc = this.gen.trimDocName(this.PictureFile.name);
    let dockind = this.gen.getExt(this.PictureFile.name);
  }
  //#endregion

  SDCP_CSR_Submit() {
    this.scdp_csr_Body.id = 0;

    this.workprogram
      .post_SDCP_CSR(
        this.scdp_csr_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }
  SDCP_Question_Submit() {
    const formDat: FormData = new FormData();
    this.scdp_question_Body.id = 0;
    for (const key in this.scdp_question_Body) {
      if (this.scdp_question_Body[key]) {
        formDat.append(key.toString(), this.scdp_question_Body[key]);
      }
    }
    if (this.ResponderFile) {
      formDat.append(
        this.ResponderNameDoc,
        this.ResponderFile,
        this.ResponderNewName
      );
    }
    if (this.OSCPFile) {
      formDat.append(this.OSCPNameDoc, this.OSCPFile, this.OSCPNewName);
    }
    this.workprogram
      .post_SDCP_Question(
        formDat,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  SDCP_MOU_Submit() {
    const formDat: FormData = new FormData();
    this.scdp_mou_Body.id = 0;
    for (const key in this.scdp_mou_Body) {
      if (this.scdp_mou_Body[key]) {
        formDat.append(key.toString(), this.scdp_mou_Body[key]);
      }
    }
    if (this.GMOUFile) {
      formDat.append(this.GMOUNameDoc, this.GMOUFile, this.GMOUNewName);
    }

    this.workprogram
      .post_SDCP_MOU(formDat, this.genk.wpYear, this.genk.OmlName, '', '', '')
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  SDCP_Capital_Submit() {
    this.workprogram
      .post_SDCP_Capital(
        this.scdp_capitalprojects_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  SDCP_Scholarship_Submit() {
    const formDat: FormData = new FormData();
    this.scdp_scholarship_Body.id = 0;
    for (const key in this.scdp_scholarship_Body) {
      if (this.scdp_scholarship_Body[key]) {
        formDat.append(key.toString(), this.scdp_scholarship_Body[key]);
      }
    }
    if (this.BenefFile) {
      formDat.append(this.BenefNameDoc, this.BenefFile, this.BenefNewName);
    }
    this.workprogram
      .post_SDCP_Scholarship(
        formDat,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  SDCP_Scholarship_CSR_Submit() {
    this.workprogram
      .post_SDCP_Scholarship_CSR(
        this.scdp_scholarship_csr_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }
  SDCP_Training_Skills_CSR_Submit() {
    this.workprogram
      .post_SDCP_Training_Skills_CSR(
        this.scdp_trainingskills_csr_Body,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }
  SDCP_Training_Details_CSR_Submit() {
    const formDat: FormData = new FormData();
    this.scdp_trainingdetails_csr_Body.id = 0;
    for (const key in this.scdp_trainingdetails_csr_Body) {
      if (this.scdp_trainingdetails_csr_Body[key]) {
        formDat.append(key.toString(), this.scdp_trainingdetails_csr_Body[key]);
      }
    }
    if (this.Benef_2File) {
      formDat.append(
        this.Benef_2NameDoc,
        this.Benef_2File,
        this.Benef_2NewName
      );
    }

    this.workprogram
      .post_SDCP_Training_Details_CSR(
        formDat,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  SDCP_Pictures_Submit() {
    const formDat: FormData = new FormData();
    this.scdp_pictures_Body.id = 0;
    for (const key in this.scdp_pictures_Body) {
      if (this.scdp_pictures_Body[key]) {
        formDat.append(key.toString(), this.scdp_pictures_Body[key]);
      }
    }
    if (this.PictureFile) {
      formDat.append(
        this.PictureNameDoc,
        this.PictureFile,
        this.PictureNewName
      );
    }

    this.workprogram
      .post_SDCP_Pictures(
        formDat,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        '',
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  getSCDP() {
    this.workprogram
      .getFormFiveSCDP(this.genk.OmlName, this.genk.wpYear, this.genk.fieldName)
      .subscribe((res) => {
        if (res.hseSustainable_CSR) {
          this.sustainableCommunityDPCs = res.hseSustainable_CSR;
          console.log('logging', this.sustainableCommunityDPCs);
        }

        if (res.hseSustainable_Question) {
          this.mouQuestions = res.hseSustainable_Question;
        }

        if (res.hseSustainable_MOU) {
          this.mouProjects = res.hseSustainable_MOU;
        }

        if (res.scdp_capitalprojects_Body) {
          this.capitalProjects = res.scdp_capitalprojects_Body;
        }

        if (res.hseSustainable_Schorlarship) {
          this.scholarshipSchemes = res.hseSustainable_Schorlarship;
        }

        if (res.hseSustainable_Schorlarship_CSR) {
          this.scholarships = res.hseSustainable_Schorlarship_CSR;
        }

        if (res.hseSustainable_Training_CSR) {
          this.trainingSkillsAndAcquisitions = res.hseSustainable_Training_CSR;
        }

        if (res.hseSustainable_TrainingDetails_CSR) {
          this.trainingSkillAndDetails = res.hseSustainable_TrainingDetails_CSR;
        }

        if (res.pictureUpload) {
          this.picturesForCommunityDevelopments = res.pictureUpload;
        }

        this.cd.markForCheck();
      });
  }

  Delete_SDCP_Question(
    row: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_MOU
  ) {
    this.workprogram
      .post_SDCP_Question(
        {} as FormData,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_SDCP_MOU(
    row: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_MOU
  ) {
    this.workprogram
      .post_SDCP_MOU(
        {} as FormData,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_HSE_SDCP_MOU(row: any) {
    this.workprogram
      .post_SDCP_MOU(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_SDCP_Capital(row: any) {
    this.workprogram
      .post_SDCP_Capital(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_HSE_SDCP_ScholarshipCSR(row: any) {
    this.workprogram
      .post_SDCP_Scholarship_CSR(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_HSE_SDCP_Sch(row: any) {
    this.workprogram
      .post_SDCP_Scholarship(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_HSE_SDCP_TrainingSkills(row: any) {
    this.workprogram
      .post_SDCP_Training_Skills_CSR(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_HSE_SDCP_TrainingSCR(row: any) {
    this.workprogram
      .post_SDCP_Training_Details_CSR(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_HSE_SDCP_Pictures(row: any) {
    this.workprogram
      .post_SDCP_Pictures(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Delete_SDCP_CSR(
    row: HSE_SUSTAINABLE_DEVELOPMENT_COMMUNITY_PROJECT_PROGRAM_PLANNED_AND_ACTUAL
  ) {
    this.workprogram
      .post_SDCP_CSR(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        '',
        row.id,
        'DELETE'
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.message, 'success');

          this.getSCDP();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  filter(data) {
    const resultArray = Object.keys(data).map((index) => {
      let nw = data[index];
      return nw;
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
}
