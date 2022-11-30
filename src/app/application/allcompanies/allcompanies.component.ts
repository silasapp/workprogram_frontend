import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-allcompanies',
  templateUrl: './allcompanies.component.html',
  styleUrls: ['./allcompanies.component.scss'],
})
export class AllcompaniesComponent implements OnInit {
  selectedColumns: any[] = [];
  genk: GenericService;
  columnHeader = [];
  columnValue = [];
  columnHeader_Desk = [];
  columnValue_Desk = [];
  router;

  constructor(
    private workprogram: WorkProgramService,
    private gen: GenericService,
    private modal: ModalService,
    private auth: AuthenticationService,
    private modalService: ModalService,
    private cd: ChangeDetectorRef,
    public route: Router
  ) {
    this.genk = gen;
    this.router = route;
  }
  ngOnInit(): void {
    this.getApplications();
  }
  getApplications() {
    this.workprogram.getApplications().subscribe((res) => {
      if (res.statusCode == 300) {
        this.modalService.logNotice('Error', res.message, 'error');
      } else {
        this.getApplications = res;
        this.loadTable_Applications(res.data);
      }
    });
  }
  loadTable_Applications(data) {
    this.columnHeader = [];
    this.columnValue = [];
    data = this.filter(data);

    var result = Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = value == null ? '' : value;
      return acc;
    }, {});

    this.columnHeader.push(data[0]);
    this.columnValue.push(result);

    this.cd.markForCheck();
  }

  filter(data) {
    const resultArray = Object.keys(data).map((index) => {
      let person = data[index];
      return person;
    });

    resultArray.forEach((element) => {
      delete element['approvalRef'];
      delete element['categoryID'];
      delete element['companyID'];
      delete element['concessionID'];
      delete element['fieldID'];
      delete element['createdAt'];
      delete element['currentDesk'];
      delete element['deleteStatus'];
      delete element['deletedAt'];
      delete element['deletedBy'];
      delete element['submitted'];
      delete element['updatedAt'];
    });
    return resultArray;
  }
  View_Application(event) {
    this.workprogram.getApplication(event.target.value).subscribe((res) => {
      if (res.statusCode == 300) {
        this.modalService.logNotice('Error', res.message, 'error');
      } else {
        this.genk.applicationDetails = res.data;
        this.router.navigate(['/application/viewapplication']);
      }
    });
  }
}
