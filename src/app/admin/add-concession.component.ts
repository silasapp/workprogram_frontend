import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GenericService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-concession',
  templateUrl: './add-concession.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AddConcessionComponent implements OnInit {
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'Add Concession';
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  data: any[];
  year = [];
  company : any[];
  concessionForm: FormGroup;


    columns = [
      { "columnDef": "consession_Id", "header": "" },
      { "columnDef": "status_", "header": "WP STATUS" },
      { "columnDef": "companyName", "header": "COMPANY NAME" },
      { "columnDef": "company_ID", "header": "COMPANY CODE" },
      { "columnDef": "companY_EMAIL", "header": "COMPANY EMAIL" },
      { "columnDef": "concession_Held", "header": "CONCESSION HELD" },
      { "columnDef": "equity_distribution", "header": "EQUITY DISTRIBUTION" },
      { "columnDef": "area", "header": "AREA (SQ.KM)" },
      { "columnDef": "terrain", "header": "TERRAIN" },
      { "columnDef": "contract_Type", "header": "CONTRACT TYPE" },
      { "columnDef": "date_of_Expiration", "header": "DATE OF EXPIRATION" },
      { "columnDef": "year_of_Grant_Award", "header": "GRANT YEAR" },
      { "columnDef": "geological_location", "header": "GEOLOGICAL LOCATION" },
      { "columnDef": "comment", "header": "COMMENT" },
      { "columnDef": "submitted", "header": "" },

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
      this.fetchCompany();
      this.genk.sizePerPage = this.genk.sizeten;
      this.initForm();
      //this.pagenum = Math.ceil(this.arrayOfObjects.length / this.genk.sizePerPage);
      //this.arrayRows = this.arrayOfObjects.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
    }

initForm() {
  this.concessionForm = this.fb.group({
    companY_NAME: ["", Validators.required],
    concession_Held:["", Validators.required],
    equity_distribution: ["", Validators.required],
    area:["", Validators.required],
    contract_Type:["", Validators.required],
    year_of_Grant_Award:["", Validators.required],
    date_of_Expiration: ["", Validators.required],
    geological_location: ["", Validators.required],
    year: ["", Validators.required],
    comment: ["", Validators.required],
    consession_Type: ["", Validators.required],
    concession_Unique_ID: ["", Validators.required],
    
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
  
    fetchdata(e){

     this.adminservice.getConcessions(e.target.value).subscribe(
        (res) => {
          this.data = res.data
          this.assignDataRows();
          this.assignPageNum();
          this.cd.markForCheck();
          }
      )
    }
  fetchCompany(){
       this.adminservice.fetch("get_companylist").subscribe(
      (res) => {
        this.company = res.data;
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
    

  onSubmit() {
 
    this.adminservice.addConcession(this.concessionForm.getRawValue()).subscribe(
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
