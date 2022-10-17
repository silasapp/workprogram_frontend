import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PARAMETER_CONFIG } from 'src/app/models/admin.model';
import { AuthenticationService, GenericService, ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-concession',
  templateUrl: 'parameter.component.html',
  styleUrls: ['../admin.component.scss']
})
export class ParameterConfigComponent implements OnInit {

  cdr: ChangeDetectorRef;
  auth: AuthenticationService;
  genk: GenericService;
  title = 'CONFIGURATION PARAMETERS';

  parameterconfigBody: PARAMETER_CONFIG = {} as PARAMETER_CONFIG;

  dataDuration_pw_Form: FormGroup;
  dataDuration_duw_Form: FormGroup;
  meetingroom_Form: FormGroup;
  email_notification_Form: FormGroup;
  contractType_Form: FormGroup;
  dataForm_Form: FormGroup;
  penalties_Form: FormGroup;
  presentation_Categories_Form: FormGroup;
  well_Categories_Form: FormGroup;
  super_Admin_Form: FormGroup;


  constructor(private admin: AdminService,
    private authenticationService: AuthenticationService,
    private cd: ChangeDetectorRef,
    private gen: GenericService,
    private modalService: ModalService,
    private fb: FormBuilder) {
    this.cdr = cd;
    this.auth = authenticationService;
this.genk=gen;
  }

  ngOnInit() {
    this.fetchdata();
    this.initForm();
  }

  initForm() {
    this.dataDuration_pw_Form = this.fb.group({
      id: ["", Validators.required],
      start_date: ["", Validators.required],
      end_date: ["", Validators.required],


    }),

    this.dataDuration_duw_Form = new FormGroup({
      'id': new FormControl('', [Validators.required]),
        'start_date': new FormControl('', [Validators.required]),
        'end_date': new FormControl('', [Validators.required]),
        
    },{}), 

    this.meetingroom_Form = this.fb.group({
      id: ["", Validators.required],
      meeting_rooms: ["", Validators.required],
 
    }),

    this.email_notification_Form = this.fb.group({
      id: ["", Validators.required],
      dayS_: ['', Validators.required,],
 
    }),

    this.contractType_Form = this.fb.group({
      id: ["", Validators.required],
      categories: ['', Validators.required,],
 
    }),

    this.dataForm_Form = this.fb.group({
      id: ["", Validators.required],
      datatype: ['', Validators.required,],
 
    }),

    this.penalties_Form = this.fb.group({
      id: ["", Validators.required],
      no_show: ['', Validators.required,],
      no_submission: ['', Validators.required,],
 
    }),
  
    this.presentation_Categories_Form = this.fb.group({
      id: ["", Validators.required],
      categories: ['', Validators.required,],
 
    }),

    this.well_Categories_Form = this.fb.group({
      id: ["", Validators.required],
      welltype: ['', Validators.required,],
 
    }),

    this.super_Admin_Form= this.fb.group({
      id: ["", Validators.required],
      email_: ['', Validators.required,],
 
    })


    
  }

  
  



  fetchdata() {
    this.admin.fetchparconfig().subscribe(
      (res) => {

        this.parameterconfigBody = res.data as PARAMETER_CONFIG;
    debugger;
        this.cd.markForCheck();
      }
    )
  }

  addDataDuration_pw(){
    
    this.admin.addDataDuration_pw(this.dataDuration_pw_Form.getRawValue(), 'INSERT').subscribe(
      (res)=>{
     
        if(res.statusCode==200){
          this.Alert("Success", res.message, "success")
          this.fetchdata();
        }
        else{
          this.Alert("Error", res.message, "error")
        }
        this.initForm();
      }
    )
   
  }

  addDataDuration_duw(){
    debugger;
    this.admin.addDataDuration_duw(this. dataDuration_duw_Form.getRawValue(), 'INSERT').subscribe(
      (res)=>{
     debugger;
        if(res.statusCode==200){
          this.Alert("Success", res.message, "success")
          this.fetchdata();
        }
        else{
          this.Alert("Error", res.message, "error")
        }
        this.initForm();
      }
    )
   
  }




  addMeetingRoom(){
    debugger;
    this.admin.addMeetingRoom(this.meetingroom_Form.getRawValue(), 'INSERT').subscribe(
      (res)=>{
     debugger;
        if(res.statusCode==200){
          this.Alert("Success", res.message, "success")
          this.fetchdata();
        }
        else{
          this.Alert("Error", res.message, "error")
        }
        this.initForm();
      }
    )
   
  }



  addEmailDuration(){
    debugger;
    this.admin.addEmailDuration(this.email_notification_Form.getRawValue(), 'INSERT').subscribe(
      (res)=>{
     debugger;
        if(res.statusCode==200){
          this.Alert("Success", res.message, "success")
          this.fetchdata();
        }
        else{
          this.Alert("Error", res.message, "error")
        }
        this.initForm();
      }
    )
   
  }


  addContractTypes(){
    debugger;
    this.admin.addContractType(this.contractType_Form.getRawValue(), 'INSERT').subscribe(
      (res)=>{
     debugger;
        if(res.statusCode==200){
          this.Alert("Success", res.message, "success")
          this.fetchdata();
        }
        else{
          this.Alert("Error", res.message, "error")
        }
        this.initForm();
      }
    )
   
  }


  addDataTypes(){
    debugger;
    this.admin.addDataTypes(this.dataForm_Form.getRawValue(), 'INSERT').subscribe(
      (res)=>{
     debugger;
        if(res.statusCode==200){
          this.Alert("Success", res.message, "success")
          this.fetchdata();
        }
        else{
          this.Alert("Error", res.message, "error")
        }
        this.initForm();
      }
    )
   
  }



  addPenalities(){
    debugger;
    this.admin.addDataTypes(this.penalties_Form.getRawValue(), 'INSERT').subscribe(
      (res)=>{
     debugger;
        if(res.statusCode==200){
          this.Alert("Success", res.message, "success")
          this.fetchdata();
        }
        else{
          this.Alert("Error", res.message, "error")
        }
        this.initForm();
      }
    )
   
  }



  
  addPresentationCategories(){
    debugger;
    this.admin.addPresentationCategories(this.presentation_Categories_Form.getRawValue(), 'INSERT').subscribe(
      (res)=>{
     debugger;
        if(res.statusCode==200){
          this.Alert("Success", res.message, "success")
          this.fetchdata();
        }
        else{
          this.Alert("Error", res.message, "error")
        }
        this.initForm();
      }
    )
   
  }

  addWellCategories(){
    debugger;
    this.admin.addPresentationCategories(this.well_Categories_Form.getRawValue(), 'INSERT').subscribe(
      (res)=>{
     debugger;
        if(res.statusCode==200){
          this.Alert("Success", res.message, "success")
          this.fetchdata();
        }
        else{
          this.Alert("Error", res.message, "error")
        }
        this.initForm();
      }
    )
   
  }

  addSuperAdmin(){
    debugger;
    this.admin.addPresentationCategories(this.super_Admin_Form.getRawValue(), 'INSERT').subscribe(
      (res)=>{
     debugger;
        if(res.statusCode==200){
          this.Alert("Success", res.message, "success")
          this.fetchdata();
        }
        else{
          this.Alert("Error", res.message, "error")
        }
        this.initForm();
      }
    )
   
  }



  Alert(title: string, text: string, icon: any) {
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