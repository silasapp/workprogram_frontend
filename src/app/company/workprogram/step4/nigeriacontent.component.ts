import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import {
  NIGERIA_CONTENT_QUESTION,
  NIGERIA_CONTENT_Training,
  NIGERIA_CONTENT_Upload_Succession_Plan,
} from '../../../models/step4-NCQ.model';
import {
  GenericService,
  AuthenticationService,
  ModalService,
  IConcession,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import Swal from 'sweetalert2';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';

@Component({
  templateUrl: './nigeriacontent.component.html',
  styleUrls: ['../board.component.scss', 'step4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPNigeriaContentComponent implements OnInit {
  public disableForm: boolean = true;
  public SBUTABLE = SBUTABLE;

  activeMenu: string = 'Actual Year';
  completedActual: boolean = false;
  completedProposed: boolean = false;

  activeMenu_SuccessionPlan: string = 'Actual Year';
  completedActual_SuccessionPlan: boolean = false;
  completedProposed_SuccessionPlan: boolean = false;

  isThereSuccessionPlan: boolean = false;

  staffdispositionForm: FormGroup;
  seniormanagementstaffForm: FormGroup;
  uploadsuccessionForm: FormGroup;

  // public staffdispositionBody = {} as NIGERIA_CONTENT_Training;
  public staffdispositionBody = new NIGERIA_CONTENT_Training();

  seniormanagementstaffBody: NIGERIA_CONTENT_QUESTION =
    {} as NIGERIA_CONTENT_QUESTION;
  uploadsuccessionplanBody: NIGERIA_CONTENT_Upload_Succession_Plan =
    {} as NIGERIA_CONTENT_Upload_Succession_Plan;

  uploadSuccessionPlans: NIGERIA_CONTENT_Upload_Succession_Plan[] = [];
  sdList: any[];
  sStaffList: any[];
  wkpYear: string;
  wkpYearList = [];
  arrayRows = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  actualValue: string;
  columnHeader = [];
  columnValue = [];
  fiveYearsAhead=[];
  fiveYearsBehind=[];
  isTabVisible = false;
  seniormanagementstaffbody: NIGERIA_CONTENT_QUESTION;
  //uploadsuccessionplanbody: NIGERIA_CONTENT_Upload_Succession_Plan;
  nigeriacontenttrainingBody = new NIGERIA_CONTENT_Training();

  sdcolumn = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'actual_Proposed',
      header: 'ACTUAL/PROPOSED',
    },
    {
      columnDef: 'actual_Proposed_Year',
      header: 'ACTUAL/PROPOSED YEAR',
    },

    {
      columnDef: 'expatriate_quota_positions',
      header: 'EXPATRIATE QUOTA POSITION',
    },
    {
      columnDef: 'utilized_EQ',
      header: 'UTILIZED EQ',
    },
    {
      columnDef: 'nigerian_Understudies',
      header: 'NIGERIAN UNDERSTUDIES',
    },
    {
      columnDef: 'management_Foriegn',
      header: 'MANAGEMENT (FORIEGN)',
    },
    {
      columnDef: 'management_Local',
      header: 'MANAGEMENT (LOCAL)',
    },
    {
      columnDef: 'staff_Foriegn',
      header: 'STAFF (FORIEGN)',
    },
    {
      columnDef: 'staff_Local',
      header: 'STAFF (LOCAL)',
    },
  ];

  uspcolumn = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'actual_proposed',
      header: 'ACTUAL/PROPOSED',
    },
    {
      columnDef: 'actual_Proposed_Year',
      header: 'ACTUAL/PROPOSED YEAR',
    },

    {
      columnDef: 'name_',
      header: 'NAME OF EXPATRIATE',
    },
    {
      columnDef: 'timeline_',
      header: 'TIMELINE (YEARS)',
    },
    {
      columnDef: 'understudy_',
      header: 'NIGERIAN UNDERSTUDIES',
    },
    {
      columnDef: 'position_Occupied_',
      header: 'POSITION OCCUPIED',
    },
  ];

  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      this.getNigeriaContentTraining();
      // this.getNigeriaContentQuestion();
      //this.getUploadSuccessionplan();
    });
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP4';
    this.staffdispositionForm = new FormGroup(
      {
        actual_Proposed_Year: new FormControl(this.activeMenu, [
          Validators.required,
        ]),
        expatriate_quota_positions: new FormControl(
          this.staffdispositionBody.expatriate_quota_positions,
          [Validators.required]
        ),
        utilized_EQ: new FormControl(this.staffdispositionBody.utilized_EQ, [
          Validators.required,
        ]),
        // names_of_Parties: new FormControl(
        //   this.staffdispositionBody.nam,
        //   [Validators.required]
        // ),
        nigerian_Understudies: new FormControl(
          this.staffdispositionBody.nigerian_Understudies,
          [Validators.required]
        ),
        management_Foriegn: new FormControl(
          this.staffdispositionBody.management_Foriegn,
          [Validators.required]
        ),
        management_Local: new FormControl(
          this.staffdispositionBody.management_Local,
          [Validators.required]
        ),
        staff_Foriegn: new FormControl(
          this.staffdispositionBody.staff_Foriegn,
          [Validators.required]
        ),
        staff_Local: new FormControl(this.staffdispositionBody.staff_Local, [
          Validators.required,
        ]),
        year: new FormControl(this.staffdispositionBody.year, [
          Validators.required,
        ]),
      },
      {}
    );

    this.seniormanagementstaffForm = new FormGroup(
      {
        do_you_have_a_valid_Expatriate_Quota_for_your_foreign_staff:
          new FormControl(
            this.seniormanagementstaffBody.do_you_have_a_valid_Expatriate_Quota_for_your_foreign_staff,
            [Validators.required]
          ),
        if_NO_why: new FormControl(this.seniormanagementstaffBody.if_NO_why, [
          Validators.required,
        ]),
        number_of_staff_released_within_the_year_: new FormControl(
          this.seniormanagementstaffBody.number_of_staff_released_within_the_year_,
          [Validators.required]
        ),
        total_no_of_nigeria_senior_staff: new FormControl(
          this.seniormanagementstaffBody.total_no_of_nigeria_senior_staff,
          [Validators.required]
        ),
        total_no_of_senior_staff: new FormControl(
          this.seniormanagementstaffBody.total_no_of_senior_staff,
          [Validators.required]
        ),
        total_no_of_top_nigerian_management_staff: new FormControl(
          this.seniormanagementstaffBody.total_no_of_top_nigerian_management_staff,
          [Validators.required]
        ),
        total_no_of_top_management_staff: new FormControl(
          this.seniormanagementstaffBody.total_no_of_top_nigerian_management_staff,
          [Validators.required]
        ),
      },
      {}
    );

    this.uploadsuccessionForm = new FormGroup(
      {
        isThereSuccessionPlan: new FormControl(this.isThereSuccessionPlan, [
          Validators.required,
        ]),
        actual_proposed: new FormControl(this.activeMenu_SuccessionPlan, [
          Validators.required,
        ]),
        name_: new FormControl(this.uploadsuccessionplanBody.name_, [
          Validators.required,
        ]),
        understudy_: new FormControl(
          this.uploadsuccessionplanBody.understudy_,
          [Validators.required]
        ),
        timeline_: new FormControl(this.uploadsuccessionplanBody.timeline_, [
          Validators.required,
        ]),
        position_Occupied_: new FormControl(
          this.uploadsuccessionplanBody.position_Occupied_,
          [Validators.required]
        ),
        year: new FormControl(
          this.uploadsuccessionplanBody.year,
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

    this.getNigeriaContentTraining();
    debugger;
    this.getFiveYearsAhead();
    this.getFiveYearsBehind();
    // this.getNigeriaContentQuestion();
    //this.getUploadSuccessionplan();
  }

  getFiveYearsAhead() {
    debugger;
    this.fiveYearsAhead = [];
    var num: number = 5;
    var i: number;
    for (i = 0; i < num; i++) {
      this.fiveYearsAhead[i] = this.genk.wkProposedYear + i;
      //this.fiveYearsValues.push(++this.genk.wkProposedYear);
    }
    debugger;
  }

  getFiveYearsBehind() {
    debugger;
    this.fiveYearsBehind = [];
    var num: number = 5;
    var i: number;
    for (i = num; i > 0; i--) {
      this.fiveYearsBehind[num-i] = this.genk.wkProposedYear - i;
      //this.fiveYearsValues.push(++this.genk.wkProposedYear);
    }
    debugger;
  }




  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.disableForm ? true : null;
  }

  getNigeriaContentTraining() {
    debugger;
    this.workprogram
      .getNigeriaContentTraining(this.genk.wpYear)
      .subscribe((result) => {
        if (result.nigeriaContent) {
          const tempList = result.nigeriaContent;

          this.completedActual = false;
          this.completedProposed = false;

          this.sdList = tempList?.map((item) => {
            if (item.actual_Proposed === 'Actual Year')
              this.completedActual = true;

            if (item.actual_Proposed === 'Proposed Year')
              this.completedProposed = true;

            return new NIGERIA_CONTENT_Training(item);
          });

          this.staffdispositionBody = new NIGERIA_CONTENT_Training();
          this.staffdispositionBody =
            this.sdList?.filter((res) => {
              return res.actual_Proposed === this.activeMenu;
            })[0] ?? new NIGERIA_CONTENT_Training();
        } else {
          this.staffdispositionBody = {} as NIGERIA_CONTENT_Training;
        }

        if (
          result.nigeriaContentQuestion &&
          result.nigeriaContentQuestion.length > 0
        ) {
          this.seniormanagementstaffBody = result.nigeriaContentQuestion[0];
        } else {
          this.seniormanagementstaffBody = {} as NIGERIA_CONTENT_QUESTION;
        }

        if (result.nigeriaContentUploadSuccession) {
          const tempList = result.nigeriaContentUploadSuccession;

          this.completedActual_SuccessionPlan = false;
          this.completedProposed_SuccessionPlan = false;

          this.uploadSuccessionPlans = tempList?.map((item) => {
            if (item.actual_proposed === 'Actual Year')
              this.completedActual_SuccessionPlan = true;

            if (item.actual_proposed === 'Proposed Year')
              this.completedProposed_SuccessionPlan = true;

            return new NIGERIA_CONTENT_Upload_Succession_Plan(item);
          });

          this.uploadsuccessionplanBody =
            new NIGERIA_CONTENT_Upload_Succession_Plan();
          this.uploadsuccessionplanBody =
            this.uploadSuccessionPlans?.filter((res) => {
              return res.actual_proposed === this.activeMenu_SuccessionPlan;
            })[0] ?? new NIGERIA_CONTENT_Upload_Succession_Plan();
        } else {
          this.uploadsuccessionplanBody =
            {} as NIGERIA_CONTENT_Upload_Succession_Plan;
        }

  
        console.log('succession', this.uploadSuccessionPlans);
        this.cd.markForCheck();
      });
  }

  // getNigeriaContentQuestion() {
  //   this.workprogram
  //     .getNigeriaContentQuestion(
  //       this.genk.wpYear,
  //       this.genk.OmlName,
  //       this.genk.fieldName
  //     )
  //     .subscribe((result) => {
  //       this.seniormanagementstaffBody = result.data;
  //       this.cd.markForCheck();
  //     });
  // }

  // getUploadSuccessionplan() {
  //   this.workprogram.getNigeriaContent( this.genk.OmlName, this.genk.fieldName, this.genk.wpYear).subscribe(result => {
  //     this.uploadsuccessionplanBody = result.data;
  //     this.cd.markForCheck();
  //     let rel = "Hello";
  //   });
  // }

  saveNigeriaContentTraining() {
    this.workprogram
      .saveNigeriaContenttraining(
        this.nigeriacontenttrainingBody,
        this.genk.wpYear
      )
      .subscribe((result) => {
        this.modalService.logNotice(
          'Success',
          'Data saved successfully!',
          'success'
        );
      });
  }

  saveSeniorManagementStaff() {
    const model = {
      do_you_have_a_valid_Expatriate_Quota_for_your_foreign_staff:
        this.seniormanagementstaffBody
          .do_you_have_a_valid_Expatriate_Quota_for_your_foreign_staff,
      if_NO_why: this.seniormanagementstaffBody.if_NO_why,
      number_of_staff_released_within_the_year_:
        this.seniormanagementstaffBody
          .number_of_staff_released_within_the_year_,
      total_no_of_nigeria_senior_staff:
        this.seniormanagementstaffBody.total_no_of_nigeria_senior_staff,
      total_no_of_senior_staff:
        this.seniormanagementstaffBody.total_no_of_senior_staff,
      total_no_of_top_management_staff:
        this.seniormanagementstaffBody.total_no_of_top_management_staff,
      total_no_of_top_nigerian_management_staff:
        this.seniormanagementstaffBody
          .total_no_of_top_nigerian_management_staff,
    };
    this.workprogram
      .saveNigeriaContentQuestion(
        this.seniormanagementstaffBody,
        this.genk.wpYear
      )
      .subscribe((result) => {
        this.modalService.logNotice(
          'Success',
          'Data saved successfully!',
          'success'
        );
      });
  }

  saveUploadSuccessionPlan() {
    const model_ = {
      actual_proposed: this.activeMenu_SuccessionPlan,
      understudy_: this.uploadsuccessionplanBody.understudy_,
      timeline_: this.uploadsuccessionplanBody.timeline_,
      position_Occupied_: this.uploadsuccessionplanBody.position_Occupied_,
      name_: this.uploadsuccessionplanBody.name_,
    };

    this.workprogram
      .saveNigeriaUploadSuccessionPlan(
        model_ as NIGERIA_CONTENT_Upload_Succession_Plan,
        this.genk.wpYear,
        this.genk.OmlName
      )
      .subscribe((result) => {
        this.modalService.logNotice(
          'Success',
          'Data saved successfully!',
          'success'
        );

        this.activeMenu_SuccessionPlan = 'Proposed Year';

        this.getNigeriaContentTraining();

        this.cd.markForCheck();
      });
  }

  saveAddStaffDisposition() {
    const model_ = {
      actual_Proposed: this.activeMenu,
      management_Foriegn: this.staffdispositionBody.management_Foriegn,
      management_Local: this.staffdispositionBody.management_Local,
      nigerian_Understudies: this.staffdispositionBody.nigerian_Understudies,
      staff_Foriegn: this.staffdispositionBody.staff_Foriegn,
      staff_Local: this.staffdispositionBody.staff_Local,
      expatriate_quota_positions:
        this.staffdispositionBody._expatriate_quota_positions,
      utilized_EQ: this.staffdispositionBody._utilized_EQ,
    };

    this.workprogram
      .saveAddStaffDisposition(
        model_ as NIGERIA_CONTENT_Training,
        this.genk.wpYear
      )
      .subscribe((result) => {
        this.modalService.logNotice(
          'Success',
          'Data saved successfully!',
          'success'
        );

        this.activeMenu = 'Proposed Year';

        this.getNigeriaContentTraining();

        this.cd.markForCheck();
      });
  }

  changeActualValue(e) {
    this.actualValue = e.target.value;

    this.staffdispositionBody = new NIGERIA_CONTENT_Training();
    this.staffdispositionBody =
      this.sdList?.filter((res) => {
        return res.actual_Proposed === this.actualValue;
      })[0] ?? new NIGERIA_CONTENT_Training();

    //this.staffdispositionBody = new NIGERIA_CONTENT_Training(temp);
    this.cd.markForCheck();
  }

  deleteNCT(row: any) {
    this.workprogram
      .deleteNigeriaContentTraining(
        row,
        this.genk.wpYear,
        this.genk.OmlName,
        ''
      )
      .subscribe((result) => {
        this.modalService.logNotice(
          'Deletion was successful!',
          'Successfully!',
          'success'
        );

        this.getNigeriaContentTraining();

        this.cd.markForCheck;
      });
  }

  deleteSuccessionPlan(row: any) {
    this.workprogram
      .deleteSuccessionPlan(row, this.genk.wpYear, this.genk.OmlName, '')
      .subscribe((result) => {
        this.modalService.logNotice(
          'Deletion was successful!',
          'Successfully!',
          'success'
        );

        this.getNigeriaContentTraining();

        this.cd.markForCheck;
      });
  }

  Alert(title: string, text: string, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okay',
    });
  }

  setActiveMenu(value: string) {
    this.activeMenu = value;

    this.staffdispositionBody = new NIGERIA_CONTENT_Training();
    this.staffdispositionBody =
      this.sdList?.filter((res) => {
        return res.actual_Proposed === this.activeMenu;
      })[0] ?? new NIGERIA_CONTENT_Training();

    this.cd.markForCheck();
  }

  setActiveMenu_SuccessionPlan(value: string) {
    this.activeMenu_SuccessionPlan = value;

    this.uploadsuccessionplanBody =
      new NIGERIA_CONTENT_Upload_Succession_Plan();
    this.uploadsuccessionplanBody =
      this.uploadSuccessionPlans?.filter((res) => {
        return res.actual_proposed === this.activeMenu_SuccessionPlan;
      })[0] ?? new NIGERIA_CONTENT_Upload_Succession_Plan();

    this.cd.markForCheck();
  }

  setIsThereSuccessionPlan() {
    this.isThereSuccessionPlan = !this.isThereSuccessionPlan;
    this.cd.markForCheck();
  }
}
