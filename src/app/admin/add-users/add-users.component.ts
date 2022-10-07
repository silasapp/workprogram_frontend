import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GenericService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
import { UpdateUserComponent } from './update-user/update-user.component';
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['../admin.component.scss']
})
export class AddUsersComponent implements OnInit {

  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'Add Users';
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  data: any[];
  year = [];
  userForm: FormGroup;

    columns = [
      {
        "columnDef": "company_id",
        "header": "COMPANY CODE",
      },
      {
          "columnDef": "company_name",
          "header": "COMPANY NAME"
      },
      {
          "columnDef": "email",
          "header": "COMPANY EMAIL"
      },
      {
  
          "columnDef": "name",
          "header": "NAME"
  
      },
      {
        "columnDef": "phone_no",
        "header": "PHONE NO"
      },
      {
          "columnDef": "last_login_date",
          "header": "LAST LOGIN DATE"
      },
  ]
  
    constructor(private adminservice: AdminService, 
    private cd: ChangeDetectorRef, 
    private gen: GenericService,
    private dialog: MatDialog,
    private fb: FormBuilder
    ){
      this.genk = gen;
      this.cdr = cd;
      this.genk.sizePerPage = this.genk.sizeten;
    }
    
    ngOnInit() {
      this.data = [];
      this.fetchdata();
      this.genk.sizePerPage = this.genk.sizeten;
      this.initForm();
      //this.pagenum = Math.ceil(this.arrayOfObjects.length / this.genk.sizePerPage);
      //this.arrayRows = this.arrayOfObjects.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
    }

initForm() {
  this.userForm = this.fb.group({
    id:["", Validators.required],
    companY_NAME:["", Validators.required],
    email:["", Validators.required],
    passwords:["", Validators.required],
    name: ["", Validators.required],
    phonE_NO: ["", Validators.required],
    designation: ["", Validators.required],
    companY_ID: ["", Validators.required],
    
  })
}


    public get pageIndex(): number {
      return (this.selectedPage - 1) * this.genk.sizePerPage;
    }
  
    assignPageNum() {
      this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
    }
  
    assignDataRows() {
      this.arrayRows = this.data.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
      this.cd.markForCheck();
    }
  
    fetchdata(){
      debugger;
     this.adminservice.fetch("Get_Companies").subscribe(
        (res) => {
          debugger
          this.data = res.data;
          this.assignDataRows();
          this.assignPageNum();
          this.cd.markForCheck();
          }
      )
    }
  
  
    goNext() {
      this.selectedPage++;
      this.assignDataRows();
    }
  
    goPrev() {
      this.selectedPage--;
      this.assignDataRows();
    }
  
    firstPage() {
      this.selectedPage = 1;
      this.assignDataRows();
    }
  
    lastPage() {
      this.selectedPage = this.pagenum;
      this.assignDataRows();
    }
  
    changePage(value: string) {
      this.selectedPage = Number(value);
      this.assignDataRows();
    }
  
    resize(e) {
      let value = e.target.value;
      if (value === 'all') {
        value = this.pagenum * this.genk.sizePerPage
      }
      this.genk.sizePerPage = Number(value);
      this.assignDataRows();
      this.assignPageNum();
      this.cd.markForCheck();
    }
    openDialog(e) {
      const dialogRef = this.dialog.open(UpdateUserComponent, {
        height: '600px',
        width: '400px',
        data: {
            id: e.target.value
        },
      });
  }

  onSubmit() {
    debugger;
    this.adminservice.addUser(this.userForm.getRawValue()).subscribe(
      (res) => {
        if(res.statusCode == 200){
          this.Alert("Success", res.message,  "success")
        }
        else{
          this.Alert("Error",res.message, "error")
        }
       // this.fetchdata();
        this.initForm();
      }
    )
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
