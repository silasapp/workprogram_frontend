import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services';
import { PresentationScheduleService } from 'src/app/services/presentation-schedule.service';
import Swal from 'sweetalert2';
import { MatDialog } from "@angular/material/dialog";
import { UpdateRepsComponent } from './update-reps/update-reps.component';
declare var $: any;

@Component({
  selector: 'app-scribes-and-chairmen',
  templateUrl: './scribes-and-chairmen.component.html',
  styleUrls: ['./scribes-and-chairmen.component.scss']
})
export class ScribesAndChairmenComponent implements OnInit {
  genk: GenericService;
  cdr: ChangeDetectorRef;
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  data: any[];
  year = [];
  currentSelectedYear: any = "";
  emailStat: any = [
    'Active',
    'Inactive'
  ]
  emailStatValue: any;
  selected = false;
  checkboxData: any[] = [];

  columns = [
    {
      "columnDef": "companyname",
      "header": "Company Name"
    },
    {
      "columnDef": "meetingroom",
      "header": "Meeting Room"
    },
    {
      "columnDef": "chairperson",
      "header": "Chair Person"
    },
    {
      "columnDef": "scribe",
      "header": "Scribe"
    },
    {
      "columnDef": "status",
      "header": "Status"
    },
    {
      "columnDef": "presented",
      "header": "Categories of Presentation"
    },
    {
      "columnDef": "datE_TIME_TEXT",
      "header": "Presentation Date"
    },
    {
      "columnDef": "wp_time",
      "header": "Time"
    },
    {
      "columnDef": "submitted",
      "header": "Completed"
    },
    {
      "columnDef": "mom",
      "header": "MOM"
    },
    {
      "columnDef": "year",
      "header": "YEAR"
    },
  ]


  constructor(private presentationService: PresentationScheduleService,
    private cd: ChangeDetectorRef,
    private gen: GenericService,
    private dialog: MatDialog) {
    this.genk = gen;
    this.cdr = cd;
    this.genk.sizePerPage = this.genk.sizeten;

  }

  ngOnInit() {
    this.data = [];
    this.yearList();
    this.genk.sizePerPage = this.genk.sizeten;
    //this.pagenum = Math.ceil(this.arrayOfObjects.length / this.genk.sizePerPage);
    //this.arrayRows = this.arrayOfObjects.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
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

  fetchdata(e) {
    let value = e.target.value;
    this.currentSelectedYear = value;
    this.presentationService.getScribesAndChairmen(value).subscribe(
      (res) => {
        this.data = res.data as any[];
        this.assignDataRows();
        this.assignPageNum();
        this.cd.markForCheck();
      }
    )
  }

  reFetchdata(e) {
    let value = e
    this.currentSelectedYear = value;
    this.presentationService.getScribesAndChairmen(value).subscribe(
      (res) => {
        this.data = res.data as any[];
        this.assignDataRows();
        this.assignPageNum();
        this.cd.markForCheck();
      }
    )
  }

  yearList() {
    this.presentationService.getScribesYearList()
      .subscribe((res: any[]) => {
        this.year = res;
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
      value = this.pagenum * this.genk.sizePerPage
    }
    this.genk.sizePerPage = Number(value);
    this.assignDataRows();
    this.assignPageNum();
    this.cd.markForCheck();
  }

  checkbox(e) {
    let id = e.target.value
  }

  checkAllCheckBox(e) {
    if (e.target.checked) {
      $(".check").prop('checked', true);
    }
    else {
      $(".check").prop('checked', false)
    }
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.checkboxData.push(e.target.value)
    } else {
      const index = this.checkboxData.findIndex(x => x.value === e.target.value)
      this.checkboxData.splice(index)
    }
  }

  async setEmailStatus(event) {
    var updateSuccessCount = 0
    var updateErrorCount = 0
    var message = ''
    var length = this.checkboxData.length
    for (let i = 0; i < length; i++) {
      updateSuccessCount = 0
      updateErrorCount = 0
      await this.presentationService.emailStatus(this.checkboxData[i], event.target.value).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            updateSuccessCount++
          }
          else {
            updateErrorCount++
          }
          var icon = ''
          if (updateSuccessCount > 0 && updateErrorCount == 0) {
            icon = "success"
          }
          else if (updateSuccessCount > 0 && updateErrorCount > 0) {
            icon = "warning"
          }
          else icon = 'error'
          message = updateSuccessCount + " records have been updated successfully. " + updateErrorCount + " records failed"
          this.reFetchdata(this.currentSelectedYear);
          this.Alert("Update Information", message, icon)
          this.checkboxData = []

        }
      )
    }
  }
  setEmailStat(event) {
    this.emailStatValue = event.target.value
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


  updateRep(e) {
    const dialogRef = this.dialog.open(UpdateRepsComponent, {
      height: '600px',
      width: '400px',
      data: {
          id: e.target.value
      },
    });
}
}
