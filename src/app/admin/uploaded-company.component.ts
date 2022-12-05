import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-uploaded-company',
  templateUrl: './uploaded-company.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class UploadedCompanyComponent implements OnInit {
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'COMPANY DETAILS';
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  data: any[];
  year = [];
  columns = [
    {
      columnDef: 'company_name',
      header: 'COMPANY NAME',
    },
    {
      columnDef: 'address_of_company',
      header: 'COMPANY ADDRESS',
    },
    {
      columnDef: 'contact_person',
      header: 'CONTACT PERSON',
    },
    {
      columnDef: 'phone_no',
      header: 'PHONE NUMBER',
    },
    {
      columnDef: 'email_address',
      header: 'EMAIL',
    },

    {
      columnDef: 'flag',
      header: ' ',
    },
  ];

  constructor(
    private admin: AdminService,
    private cd: ChangeDetectorRef,
    private gen: GenericService
  ) {
    this.genk = gen;
    this.cdr = cd;
    this.genk.sizePerPage = this.genk.sizeten;
  }

  ngOnInit() {
    this.data = [];
    this.fetchdata();
    this.genk.sizePerPage = this.genk.sizeten;
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
    this.admin.fetch('get_companylist').subscribe((res) => {
      this.data = this.arrangeDate(res.data as any[]);
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
}
