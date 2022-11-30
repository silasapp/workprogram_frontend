import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import { Router } from '@angular/router';
import { ApplicationDetails } from 'src/app/models/application-details';

@Component({
  selector: 'app-mydesk',
  templateUrl: './mydesk.component.html',
  styleUrls: ['./mydesk.component.scss'],
})
export class MydeskComponent implements OnInit {
  applicationDetails: ApplicationDetails;
  selectedColumns: any[] = [];
  genk: GenericService;
  columnHeader = [];
  columnValue = [];
  columnHeader_Desk = [];
  columnValue_Desk = [];
  router;

  columns = [
    {
      columnDef: 'Referenceno',
      header: 'REFERENCE',
    },
    {
      columnDef: 'Status',
      header: 'STATUS',
    },
    {
      columnDef: 'Yearofwkp',
      header: 'YEAR',
    },
    {
      columnDef: 'companyName',
      header: 'COMPANY NAME',
    },
    {
      columnDef: 'fieldName',
      header: 'FIELD',
    },
    {
      columnDef: 'oMLName',
      header: 'OML',
    },
  ];
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
    this.getAppsOnMyDesk();
  }

  getAppsOnMyDesk() {
    this.workprogram.getAppsOnMyDesk().subscribe((res) => {
      if (res.statusCode == 300) {
        this.modalService.logNotice('Error', res.message, 'error');
      } else {
        this.getAppsOnMyDesk = res;
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

  Process_Application(event) {
    const year = event.target.value;

    this.workprogram.getProcessApplication(year).subscribe((res) => {
      console.log('process', res);
      if (res.statusCode === 200) {
        this.genk.applicationDetails = res.data;
        this.router.navigate(['/application/process-application/' + year]);
      } else this.modalService.logNotice('Error', res.message, 'error');
    });
  }
}
