import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { COMPANY_CODE } from 'src/app/models/admin.model';
import { CodeFields } from 'src/app/models/company-details';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-concession',
  templateUrl: './uploadcode.component.html',
  styleUrls: ['../admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadCodeComponent implements OnInit {
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'UPLOAD CODE';
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  data: any[];
  year = [];
  allCodeFields: [];
  displayStyle = false;
  auth: AuthenticationService;

  codeBody: CodeFields = {} as CodeFields;

  //#region  documnent objects declaration
  CompanyCodeFile?: File = null;
  CompanyCodeNewName: string;
  CompanyCodeNameDoc: string;

  //#region form groups declaration
  CompanyCodeForm: FormGroup;

  //#region  form bodies declaration
  companycodeBody: COMPANY_CODE = {} as COMPANY_CODE;

  columns = [
    {
      columnDef: 'companyname',
      header: 'COMPANY NAME',
    },
    {
      columnDef: 'companycode',
      header: 'COMPANY CODE',
    },
    {
      columnDef: 'created_by',
      header: 'CREATED BY',
    },
    {
      columnDef: 'date_created',
      header: 'DATE CREATED',
    },
    {
      columnDef: 'isactive',
      header: 'ACTIVE STATUS',
    },
  ];

  constructor(
    private admin: AdminService,
    private authenticationService: AuthenticationService,
    private cd: ChangeDetectorRef,
    private modalService: ModalService,
    private gen: GenericService
  ) {
    this.genk = gen;
    this.cdr = cd;
    this.genk.sizePerPage = this.genk.sizeten;
    this.auth = authenticationService;
  }

  ngOnInit() {
    this.data = [];
    this.fetchdata();
    this.genk.sizePerPage = this.genk.sizeten;

    this.CompanyCodeForm = new FormGroup(
      {
        companycodeFilePath: new FormControl(
          this.companycodeBody.companycodeFilePath,
          [Validators.required]
        ),
      },
      {}
    );
  }

  public get pageIndex(): number {
    return (this.selectedPage - 1) * this.genk.sizePerPage;
  }

  assignPageNum() {
    this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
  }

  assignDataRows() {
    this.arrayRows = this.data.slice(
      this.pageIndex,
      this.pageIndex + this.genk.sizePerPage
    );
    this.cd.markForCheck();
  }

  fetchdata() {
    this.admin.fetch('get_companycodes').subscribe((res) => {
      this.data = this.arrangeDate(res.data as any[]);
      this.assignDataRows();
      this.assignPageNum();
      this.cd.markForCheck();
    });
  }

  saveCompanyCodeDoc(DeFile: any) {
    this.CompanyCodeFile = <File>DeFile.target.files[0];
    if (!this.CompanyCodeFile) {
      return;
    }
    if (
      this.CompanyCodeFile.size < 1 ||
      this.CompanyCodeFile.size > 1024 * 1024 * 50
    ) {
      this.CompanyCodeForm.controls['companycodeFilePath'].setErrors({
        incorrect: true,
      });
      this.CompanyCodeFile = null;
      return;
    } else {
      this.CompanyCodeForm.controls['companycodeFilePath'].setErrors(null);
    }
    this.CompanyCodeNewName = this.gen.getExpDoc(
      this.CompanyCodeFile.name,
      this.CompanyCodeFile.type
    );
    this.CompanyCodeNameDoc = this.gen.trimDocName(this.CompanyCodeFile.name);
    // let dockind = this.gen.getExt(this.CompanyCodeFile.name);
  }

  Company_Code_Submit() {
    const formDat: FormData = new FormData();
    this.companycodeBody.id = 0;
    for (const key in this.companycodeBody) {
      if (this.companycodeBody[key]) {
        formDat.append(key.toString(), this.companycodeBody[key]);
      }
    }

    if (this.CompanyCodeFile) {
      formDat.append(
        this.CompanyCodeNameDoc,
        this.CompanyCodeFile,
        this.CompanyCodeNewName
      );
    }
    this.admin.uploadCompanyCode(formDat).subscribe((res) => {
      if (res.statusCode == 300) {
        this.modalService.logNotice('Error', res.message, 'error');
      } else {
        //this.loadTable_Management(res.data);
        this.modalService.logNotice('Success', res.message, 'success');
      }
    });
  }

  fetchcompanycode() {
    this.admin.codefetch('GET_COMPANY_CODES').subscribe((res) => {
      this.data = res.data as any[];
      if (this.data.length > 0) this.selectedPage = 1;
      this.assignDataRows();
      this.assignPageNum();
      this.cd.markForCheck();
    });
  }

  // searchTable(input: HTMLInputElement, table: HTMLTableElement) {
  //   var filter, found, tr, td, i, j;
  //   filter = input.value.toUpperCase();
  //   tr = table.getElementsByTagName("tr")
  //   for (i = 0; i < tr.length; i++) {
  //       td = tr[i].getElementsByTagName("td");
  //       for (j = 0; j < td.length; j++) {
  //           if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
  //               found = true;
  //           }

  //       }
  //       if (found) {
  //           tr[i].style.display = "";
  //           found = false;
  //       } else {
  //           tr[i].style.display = "none";
  //       }
  //   }
  // }

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
      value = this.pagenum * this.genk.sizePerPage;
    }
    this.genk.sizePerPage = Number(value);
    this.assignDataRows();
    this.assignPageNum();
    this.cd.markForCheck();
  }

  arrangeDate(mydata: any[]) {
    let i = 0;
    while (i < mydata.length) {
      let datePipe = new DatePipe('en-US');
      mydata[i].when_was_the_date_of_your_last_ndr_submission =
        datePipe.transform(
          mydata[i].when_was_the_date_of_your_last_ndr_submission,
          'dd MMM, y'
        );
      i++;
    }
    return mydata;
  }

  openPopup() {
    this.displayStyle = true;
    this.cd.markForCheck();
  }

  closePopup() {
    this.displayStyle = false;
    this.cd.markForCheck();
    this.codeBody = {} as CodeFields;
  }

  //   Edit_CodeForm(event) {
  //     // let u= event.target.value as CodeFields;
  //     //

  //     // this.uu = u.id;
  //
  //     let info = this.data as CodeFields[];
  //
  //     let con = info.filter(element => element.id == event.target.value);
  //
  //     this.codeBody = con[0];

  //   }

  onSelect(selectedCode: any) {
    this.codeBody = selectedCode as CodeFields;
  }

  onSubmit() {
    this.admin
      .updateCompanyCode(
        this.codeBody.id,
        this.codeBody.companyname,
        this.codeBody.isactive
      )
      .subscribe((res) => {
        if (res.statusCode == 200) {
          this.closePopup();
          this.Alert('Success', res.message, 'success');
          this.codeBody = {} as CodeFields;
        } else {
          this.Alert('Error', res.message, 'error');
        }
        // this.fetchdata();

        this.fetchcompanycode();
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
}
