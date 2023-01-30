import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GenericService, ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
import {
  FieldDetails,
  ConcessionDetails,
} from 'src/app/models/company-details';
import { EquityDistribution } from 'src/app/models/step1-concession.model';

@Component({
  templateUrl: 'concessionsfields.component.html',
  styleUrls: [
    './concessionsfields.component.scss',
    '../../reports/ndr-report.component.scss',
    '../workprogram/board.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConcessionsfieldsComponent implements OnInit {
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'Manage Concessions & Fields';
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  data: any[];
  year = [];
  company: any[];
  concessionFieldForm: FormGroup;
  concessionBody: ConcessionDetails = {} as ConcessionDetails;
  allConcessionsData = [];

  allConcessions: [];
  allFields: [];

  fieldBody: FieldDetails = {} as FieldDetails;
  fieldForm: FormGroup;
  c_ColumnHeader = [];
  c_ColumnValue = [];
  f_ColumnHeader = [];
  f_ColumnValue = [];
  c_isTabVisible: boolean;
  f_isTabVisible: boolean;
  isAddConcession = false;
  isAddField = false;
  isInsert = true;
  concessionAction = 'INSERT';
  fieldAction = 'INSERT';
  concessionList = [];
  resultconcessionList = [];
  isAddEquity = false;
  equitySubmitted = false;
  equityBody: EquityDistribution = {} as EquityDistribution;

  EquityForm: FormGroup;

  columns = [
    //   {
    //     "columnDef": "company_Name",
    //     "header": "CName"
    // },
    {
      columnDef: 'area',
      header: 'AREA',
    },
    {
      columnDef: 'concession_Held',
      header: 'CONCESSION HELD',
    },
    {
      columnDef: 'consession_Type',
      header: 'CONSESSION TYPE',
    },
    {
      columnDef: 'contract_Type',
      header: 'CONTRACT TYPE',
    },
    {
      columnDef: 'consession_Id',
      header: 'ID',
    },
    {
      columnDef: 'geological_location',
      header: 'GEOLOGICAL LOCATION',
    },
  ];

  fieldColumns = [
    {
      columnDef: 'field_ID',
      header: 'FIELD ID',
    },
    {
      columnDef: 'concession_Held',
      header: 'CONCESSION.',
    },
    {
      columnDef: 'field_Name',
      header: 'FIELD NAME',
    },
  ];

  constructor(
    private adminservice: AdminService,
    private cd: ChangeDetectorRef,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.cdr = cd;
    this.genk.sizePerPage = this.genk.sizeten;
  }

  ngOnInit(): void {
    this.data = [];
    this.genk.sizePerPage = this.genk.sizeten;

    this.concessionFieldForm = new FormGroup(
      {
        concession_Held: new FormControl(this.concessionBody.concession_Held, [
          Validators.required,
        ]),
        area: new FormControl(this.concessionBody.area, [Validators.required]),
        contract_Type: new FormControl(this.concessionBody.contract_Type, [
          Validators.required,
        ]),
        terrain: new FormControl(this.concessionBody.terrain, [
          Validators.required,
        ]),
        consession_Type: new FormControl(this.concessionBody.consession_Type, [
          Validators.required,
        ]),
        concession_Unique_ID: new FormControl(
          this.concessionBody.concession_Unique_ID,
          [Validators.required]
        ),
        date_of_Expiration: new FormControl(
          this.concessionBody.date_of_Expiration,
          [Validators.required]
        ),
        equity_distribution: new FormControl(
          this.concessionBody.equity_distribution,
          [Validators.required]
        ),
        comment: new FormControl(this.concessionBody.comment, [
          Validators.required,
        ]),
        geological_location: new FormControl(
          this.concessionBody.geological_location,
          [Validators.required]
        ),
        year_of_Grant_Award: new FormControl(
          this.concessionBody.year_of_Grant_Award,
          [Validators.required]
        ),
        status_: new FormControl(this.concessionBody.status_, [
          Validators.required,
        ]),
        consession_Id: new FormControl(this.concessionBody.consession_Id, [
          Validators.required,
        ]),
      },
      {}
    );

    this.fieldForm = new FormGroup(
      {
        field_ID: new FormControl(this.fieldBody.field_ID, [
          Validators.required,
        ]),
        field_Name: new FormControl(this.fieldBody.field_Name, [
          Validators.required,
        ]),
        concession_Name: new FormControl(this.fieldBody.concession_Name, [
          Validators.required,
        ]),
      },
      {}
    );

    this.EquityForm = new FormGroup(
      {
        companyOne: new FormControl(this.equityBody.companyOne, [Validators.required]),
        equityOne: new FormControl(this.equityBody.equityOne, [Validators.required])
      },
      {}
    );
    this.getConcessionFields();
  }

  get eqt() {
    return this.EquityForm.controls;
   }

  getConcessionFields() {
    this.adminservice.getCompanyConcessions().subscribe((res) => {
      this.concessionList = res.concessions;
      let concessionInfo = {} as ConcessionDetails;
      let fieldInfo = {} as FieldDetails;
      if (res.concessions != null && res.concessions.length > 0) {
        concessionInfo = res.concessions[0] as ConcessionDetails;
        concessionInfo.date_of_Expiration = this.genk.formDate(
          concessionInfo.date_of_Expiration
        );
        concessionInfo.year_of_Grant_Award = this.genk.formDate(
          concessionInfo.year_of_Grant_Award
        );
        this.loadTable_Concession(res.concessions);
        this.allConcessions = res.concessions;
      }
      if (res.fields != null && res.fields.length > 0) {
        fieldInfo = res.fields[0] as FieldDetails;
        this.loadTable_Field(res.fields);
        this.allFields = res.fields;
      }
      // this.fieldBody = fieldInfo;
      // this.concessionBody = concessionInfo;
    });
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

  fetchdata(e) {
    this.adminservice.getConcessions(e.target.value).subscribe((res) => {
      this.data = res.data;
      this.assignDataRows();
      this.assignPageNum();
      this.cd.markForCheck();
    });
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
      value = this.pagenum * this.genk.sizePerPage;
    }
    this.genk.sizePerPage = Number(value);
    this.assignDataRows();
    this.assignPageNum();
    this.cd.markForCheck();
  }

  ConcessionSubmit() {
    let concessionInfo = {} as ConcessionDetails;
    let actionToDo = '';
    let id = '';

    for (let item in this.concessionBody) {
      //if (item != 'consession_Id' && item != 'date_of_Expiration') {
      if (item != 'consession_Id') {
        concessionInfo[this.genk.upperText(item)] =
          this.concessionBody[item] ?? '';
      } else {
        id = this.concessionBody[item]?.toString();
        actionToDo = id === '' || id === undefined ? 'INSERT' : 'UPDATE';
      }
    }
    this.adminservice
      .Post_ConcessionDetails(concessionInfo, id, actionToDo)
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Concession(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
        this.togAddConcession();
      });
  }

  FieldSubmit() {
    //
    let fieldInfo = {} as FieldDetails;
    let actionToDo = '';
    let id = '';

    //
    for (let item in this.fieldBody) {
      if (item != 'field_ID') {
        fieldInfo[this.genk.upperText(item)] =
          this.fieldBody[item]?.toString() ?? '';
      } else {
        id = this.fieldBody[item]?.toString();
      }

      if (this.fieldAction == 'INSERT') {
        actionToDo = 'INSERT';
      } else if (this.fieldAction == 'UPDATE') {
        actionToDo = 'UPDATE';
      } else if (this.fieldAction == 'DELETE') {
        actionToDo = 'DELETE';
      }
    }

    let dell = this.concessionList.filter((res) => {
      return res.concession_Held == this.fieldBody['concession_Name'];
    });
    fieldInfo['Concession_Id'] = dell[0].consession_Id;

    this.adminservice
      .Post_FieldDetails(fieldInfo, id, actionToDo)
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.modalService.logNotice('Success', res.message, 'success');
          this.loadTable_Field(res.data);
        }
        this.togAddField();
      });
  }

  loadTable_Concession(data) {
    //
    this.c_ColumnHeader = [];
    this.c_ColumnValue = [];
    let datae: any[] = data;

    if (data != null) {
      const res = datae.map((data) =>
        this.columns.reduce(
          (o, k) => ((o[k.columnDef] = data[k.columnDef]), o),
          {}
        )
      );

      data = this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.c_ColumnHeader = this.columns;
      this.c_ColumnValue = res;
    } else {
      for (let item1 in this.concessionFieldForm.controls) {
        if (item1 != 'comment') {
          this.c_ColumnHeader.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.c_ColumnValue.push(this.concessionBody[item1]);
        }
      }
    }

    this.c_isTabVisible = true;
    this.cd.markForCheck();
  }

  Delete_Concession(event) {
    let info = this.concessionBody as ConcessionDetails;
    this.adminservice
      .Post_ConcessionDetails(info, event.target.value, 'DELETE')
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Concession(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  Edit_Concession(event) {
    let info = this.allConcessions as ConcessionDetails[];
    let con = info.filter(
      (element) => element.consession_Id == event.target.value
    );
    this.concessionBody = con[0];
    this.togAddConcession();
    this.concessionAction = 'UPDATE';
  }

  Edit_Field(event) {
    let info = this.allFields as FieldDetails[];
    let con = info.filter((element) => element.field_ID == event.target.value);

    this.fieldBody = con[0];
  }

  loadTable_Field(data) {
    this.f_ColumnHeader = [];
    this.f_ColumnValue = [];
    let datae: any[] = data;

    if (data != null) {
      const res = datae.map((data) =>
        this.fieldColumns.reduce(
          (o, k) => ((o[k.columnDef] = data[k.columnDef]), o),
          {}
        )
      );

      data = this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.f_ColumnHeader = this.fieldColumns;
      this.f_ColumnValue = res;
    } else {
      for (let item1 in this.concessionFieldForm.controls) {
        if (item1 != 'comment') {
          this.f_ColumnHeader.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.f_ColumnValue.push(this.concessionBody[item1]);
        }
      }
    }

    this.f_isTabVisible = true;
    this.cd.markForCheck();

    // this.f_ColumnHeader = [];
    // this.f_ColumnValue = [];

    // if (data != null) {
    //   //data= this.filter(data);
    //   var result = Object.entries(data).reduce((acc, [key, value]) => {
    //     acc[key] = value == null ? '' : value;
    //     return acc;
    //   }, {});

    //   this.f_ColumnHeader.push(data[0]);
    //   this.f_ColumnValue.push(result);

    // }
    // else {
    //   for (let item1 in this.fieldForm.controls) {
    //     if (item1 != 'comment') {
    //       this.f_ColumnHeader.push(this.genk.upperText(item1.replace(/_+/g, ' ')));
    //       this.f_ColumnValue.push(this.fieldBody[item1]);
    //     }
    //   }
    // }

    // this.f_isTabVisible = true;
    // this.cd.markForCheck();
  }

  Delete_Field(event) {
    this.concessionAction = 'DELETE';
    let info = this.fieldBody as FieldDetails;

    let ide = event.target.value;

    this.adminservice
      .Post_FieldDetails(info, ide, 'DELETE')
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.modalService.logNotice('Success', res.message, 'success');
          this.loadTable_Field(res.data);
        }
      });
  }
  filter(data) {
    const resultArray = Object.keys(data).map((index) => {
      let person = data[index];
      return person;
    });

    resultArray.forEach((element) => {
      this.allConcessionsData.push(element['concession_Held']);
      delete element['company_ID'];
      delete element['companyNumber'];
      delete element['companyName'];
      delete element['companY_EMAIL'];
      delete element['closE_DATE'];
      //delete element['consession_Id'];
      delete element['created_by'];
      delete element['date_Created'];
      delete element['date_Updated'];
      delete element['omL_ID'];
      delete element['companyNumber'];
      delete element['open_date'];
      delete element['year'];
      delete element['comment'];
      delete element['concessionName'],
        delete element['deleteD_BY'],
        delete element['deleteD_DATE'],
        delete element['deleteD_STATUS'],
        delete element['emaiL_REMARK'];
    });

debugger;
this.resultconcessionList=[];
    for(var counter in this.allConcessionsData){
     var fieldConces= this.allConcessionsData[counter];
      if(fieldConces.toUpperCase().includes('OML') || fieldConces.toUpperCase().includes('PML')){
        this.resultconcessionList.push(fieldConces);
      }
    }
debugger;

//resultArray.filter(s => s.includes('OML') || s.includes('PML'))
//this.resultconcessionList= this.allConcessions.filter(this.isOMLorPML)
    return resultArray;
  }


  isOMLorPML(element, index, array) {
    if (element.toUpperCase() == "OML" || element.toUpperCase() == "PML") return element;
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

  togAddConcession() {
    if (!this.isAddConcession) {
      this.isAddConcession = true;
    } else {
      this.isAddConcession = false;
    }
    this.cd.markForCheck();
  }

  togAddField() {
    if (!this.isAddField) {
      this.isAddField = true;
    } else {
      this.isAddField = false;
    }
    this.fieldAction = 'INSERT';
    this.cd.markForCheck();
  }

  addEquity(companyName: string, percentEquity) {
    debugger;
    if (companyName && percentEquity) {
      this.equitySubmitted = true;
    if (this.EquityForm.invalid) {
      this.cd.markForCheck();
      return;
    }
    if (!this.concessionBody.equity_distribution) {
      this.concessionBody.equity_distribution = `${companyName.toUpperCase()} - ${percentEquity}%. `;
    } else {
      this.concessionBody.equity_distribution = this.concessionBody.equity_distribution + `${companyName.toUpperCase()} - ${percentEquity}%. `;
    }
    this.isAddEquity = false;
    this.cd.markForCheck();
    }
  }

  showEquity() {
    if (this.isAddEquity) {
      this.isAddEquity = false;
      this.cd.markForCheck();
    } else {
      this.isAddEquity = true;
      this.cd.markForCheck();
    }
  }

  clearEquity() {
    this.concessionBody.equity_distribution = '';
    this.cd.markForCheck();
  }
}
