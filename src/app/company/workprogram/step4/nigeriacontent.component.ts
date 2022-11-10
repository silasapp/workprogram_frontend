import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { NIGERIA_CONTENT_QUESTION, NIGERIA_CONTENT_Training, NIGERIA_CONTENT_Upload_Succession_Plan, } from './step4-NCQ.model';
import { GenericService, AuthenticationService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './nigeriacontent.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SWPNigeriaContentComponent implements OnInit {
  staffdispositionForm: FormGroup;
  seniormanagementstaffForm: FormGroup;
  uploadsuccessionForm: FormGroup;

  staffdispositionBody: NIGERIA_CONTENT_Training = {} as NIGERIA_CONTENT_Training;
  seniormanagementstaffBody: NIGERIA_CONTENT_QUESTION = {} as NIGERIA_CONTENT_QUESTION;
  uploadsuccessionplanBody: NIGERIA_CONTENT_Upload_Succession_Plan = {} as NIGERIA_CONTENT_Upload_Succession_Plan;

  sdList :any[];
  sStaffList:any[];
  
  wkpYear: string;
  wkpYearList = [];
  arrayRows = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  actualValue:string;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;
  seniormanagementstaffbody: NIGERIA_CONTENT_QUESTION;
  //uploadsuccessionplanbody: NIGERIA_CONTENT_Upload_Succession_Plan;
  nigeriacontenttrainingBody: NIGERIA_CONTENT_Training;

  sdcolumn = [
    {
      "columnDef": "year_of_WP",
      "header": "Work Programme Year"
    },
    {
      "columnDef": "actual_Proposed",
      "header": "ACTUAL/PROPOSED"
    },
    {
      "columnDef": "actual_Proposed_Year",
      "header": "ACTUAL/PROPOSED YEAR"
    },

    {
      "columnDef": "expatriate_quota_positions",
      "header": "EXPATRIATE QUOTA POSITION"
    },
    {
      "columnDef": "utilized_EQ",
      "header": "UTILIZED EQ"
    },
    {
      "columnDef": "nigerian_Understudies",
      "header": "NIGERIAN UNDERSTUDIES"
    },
    {
      "columnDef": "management_Foriegn",
      "header": "MANAGEMENT (FORIEGN)"
    },
    {
      "columnDef": "management_Local",
      "header": "MANAGEMENT (LOCAL)"
    },
    {
      "columnDef": "staff_Foriegn",
      "header": "STAFF (FORIEGN)"
    },
    {
      "columnDef": "staff_Local",
      "header": "STAFF (LOCAL)"
    },

  ];

  smcolumn = [
    {
      "columnDef": "year_of_WP",
      "header": "Work Programme Year"
    },
    {
      "columnDef": "do_you_have_a_valid_Expatriate_Quota_for_your_foreign_staff",
      "header": "ACTUAL/PROPOSED"
    },
    {
      "columnDef": "actual_Proposed_Year",
      "header": "ACTUAL/PROPOSED YEAR"
    },

    {
      "columnDef": "expatriate_quota_positions",
      "header": "EXPATRIATE QUOTA POSITION"
    },
    {
      "columnDef": "utilized_EQ",
      "header": "UTILIZED EQ"
    },
    {
      "columnDef": "nigerian_Understudies",
      "header": "NIGERIAN UNDERSTUDIES"
    },
    {
      "columnDef": "management_Foriegn",
      "header": "MANAGEMENT (FORIEGN)"
    },
    {
      "columnDef": "management_Local",
      "header": "MANAGEMENT (LOCAL)"
    },
    {
      "columnDef": "staff_Foriegn",
      "header": "STAFF (FORIEGN)"
    },
    {
      "columnDef": "staff_Local",
      "header": "STAFF (LOCAL)"
    },

  ];


  constructor(private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu
      .subscribe(res => {
        this.getNigeriaContentTraining();
        //this.getNigeriaContentQuestion();
        //this.getUploadSuccessionplan();
      });
  }


  ngOnInit(): void {
    this.genk.activeStep = 'STEP4';
    this.staffdispositionForm = new FormGroup(
      {
        actual_Proposed: new FormControl(this.staffdispositionBody.actual_Proposed, [Validators.required]),
        actual_Proposed_Year: new FormControl(this.staffdispositionBody.actual_Proposed_Year, [Validators.required]),
        expatriate_quota_positions: new FormControl(this.staffdispositionBody.expatriate_quota_positions, [Validators.required]),
        utilized_EQ: new FormControl(this.staffdispositionBody.utilized_EQ, [Validators.required]),
        names_of_Parties: new FormControl(this.staffdispositionBody.utilized_EQ, [Validators.required]),
        nigerian_Understudies: new FormControl(this.staffdispositionBody.nigerian_Understudies, [Validators.required]),
        management_Foriegn: new FormControl(this.staffdispositionBody.management_Foriegn, [Validators.required]),
        management_Local: new FormControl(this.staffdispositionBody.management_Local, [Validators.required]),
        staff_Foriegn: new FormControl(this.staffdispositionBody.staff_Foriegn, [Validators.required]),
        staff_Local: new FormControl(this.staffdispositionBody.staff_Local, [Validators.required]),
      }, {})

    this.seniormanagementstaffForm = new FormGroup(
      {
        do_you_have_a_valid_Expatriate_Quota_for_your_foreign_staff: new FormControl(this.seniormanagementstaffBody.do_you_have_a_valid_Expatriate_Quota_for_your_foreign_staff, [Validators.required]),
        if_NO_why: new FormControl(this.seniormanagementstaffBody.if_NO_why, [Validators.required]),
        number_of_staff_released_within_the_year_: new FormControl(this.seniormanagementstaffBody.number_of_staff_released_within_the_year_, [Validators.required]),
        total_no_of_nigeria_senior_staff: new FormControl(this.seniormanagementstaffBody.total_no_of_nigeria_senior_staff, [Validators.required]),
        total_no_of_senior_staff: new FormControl(this.seniormanagementstaffBody.total_no_of_senior_staff, [Validators.required]),
        total_no_of_top_nigerian_management_staff: new FormControl(this.seniormanagementstaffBody.total_no_of_top_nigerian_management_staff, [Validators.required]),
        total_no_of_top_management_staff: new FormControl(this.seniormanagementstaffBody.total_no_of_top_nigerian_management_staff, [Validators.required]),
      }, {})


    this.uploadsuccessionForm = new FormGroup(
      {
        actual_Proposed_Year: new FormControl(this.uploadsuccessionplanBody.actual_Proposed_Year, [Validators.required]),
        actual_proposed: new FormControl(this.uploadsuccessionplanBody.actual_proposed, [Validators.required]),
        name_: new FormControl(this.uploadsuccessionplanBody.name_, [Validators.required]),
        understudy_: new FormControl(this.uploadsuccessionplanBody.understudy_, [Validators.required]),
        timeline_: new FormControl(this.uploadsuccessionplanBody.timeline_, [Validators.required]),
        position_Occupied_: new FormControl(this.uploadsuccessionplanBody.position_Occupied_, [Validators.required])
      }, {})

    this.getNigeriaContentTraining();
    //this.getNigeriaContentQuestion();
    //this.getUploadSuccessionplan();

  }
  

  getNigeriaContentTraining() {
    debugger;
    this.workprogram.getNigeriaContentTraining(this.genk.wpYear, this.genk.OmlName, this.genk.fieldName)
      .subscribe(result => {
        debugger;
        if (result.nigeriaContent) {
          this.sdList = result.nigeriaContent;
        }
        this.cd.markForCheck();
      });
  }



  // getNigeriaContentQuestion() {
  //   this.workprogram.getNigeriaContentQuestion( this.genk.OmlName, this.genk.fieldName, this.genk.wpYear).subscribe(result => {
  //     this.seniormanagementstaffBody = result.data;
  //     this.cd.markForCheck();
  //     let rel = "Hello";
  //   });
  // }

  // getUploadSuccessionplan() {
  //   this.workprogram.getNigeriaContent( this.genk.OmlName, this.genk.fieldName, this.genk.wpYear).subscribe(result => {
  //     this.uploadsuccessionplanBody = result.data;
  //     this.cd.markForCheck();
  //     let rel = "Hello";
  //   });
  // }

  saveNigeriaContentTraining() {
    this.workprogram.saveNigeriaContenttraining(this.nigeriacontenttrainingBody, this.genk.wpYear, this.genk.OmlName,).subscribe(result => {
      this.modalService.logNotice("Success", "Data saved successfully!", 'success');
    });
  }

  saveSeniorManagementStaff() {
    this.workprogram.saveNigeriaContentQuestion(this.seniormanagementstaffBody, this.genk.wpYear, this.genk.OmlName,).subscribe(result => {
      this.modalService.logNotice("Success", "Data saved successfully!", 'success');
    });
  }

  saveUploadSuccessionPlan() {
    this.workprogram.saveNigeriaUploadSuccessionPlan(this.uploadsuccessionplanBody, this.genk.wpYear, this.genk.OmlName,).subscribe(result => {
      this.modalService.logNotice("Success", "Data saved successfully!", 'success');
    });
  }

  saveAddStaffDisposition() {
    debugger;
    this.workprogram.saveAddStaffDisposition(this.staffdispositionBody, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName).subscribe(result => {
      this.modalService.logNotice("Success", "Data saved successfully!", 'success');
    });
  }

  changeActualValue(e){
    this.actualValue=e.target.value;
    debugger;
    this.staffdispositionBody= {} as NIGERIA_CONTENT_Training;
    this.staffdispositionBody = this.sdList.filter(res=>{
      return res.actual_Proposed === this.actualValue;
    })[0] ?? {} as NIGERIA_CONTENT_Training;
    this.cd.markForCheck();
  }


  Alert(title: string, text: string, icon: any){
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okay'
    })
  }


}


