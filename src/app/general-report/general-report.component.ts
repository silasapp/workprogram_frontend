import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, GenericService, ModalService } from '../services';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.scss', '../reports/ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralReportComponent implements OnInit {
  genk: GenericService;
  isPresentationEvaluation = false;
  isPresentationSchedule = false;
  isWorkProgramReport = false;
  isAdminstration = false;
  isReports = false;
  entryStyle = '';
  reportExpand = 'more';
  reportWorkExpand = 'more';
  scheduleExpand = 'more';
  evaluationExpand = 'more';
  reportAdminstration = 'more';
  auth: AuthenticationService;
  listyear = [];


  constructor(private gen: GenericService,
    private modal: ModalService,
    private report: ReportService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private cd: ChangeDetectorRef) {
      this.genk = gen;
      this.auth = authenticationService;
   }

  ngOnInit(): void {
    this.yearList()
  }

  toggle_presentation_evaluation(evac: HTMLDivElement) {

    if (!this.isPresentationEvaluation) {

      this.entryStyle = 'layout-child';
      this.isPresentationEvaluation = true;
      evac.focus();
    } else {
      this.entryStyle = 'layout-child';
      this.isPresentationEvaluation = false;
      evac.focus();
    }
  }

  toggle_presentation_schedule() {

    if (!this.isPresentationSchedule) {

      this.entryStyle = 'layout-child';
      this.isPresentationSchedule = true;
    } else {
      this.entryStyle = 'layout-child';
      this.isPresentationSchedule = false;
    }
  }

  toggle_work_program_report() {

    if (!this.isWorkProgramReport) {

      this.entryStyle = 'layout-child';
      this.isWorkProgramReport = true;
    } else {
      this.entryStyle = 'layout-child';
      this.isWorkProgramReport = false;
    }
  }

  toggle_reports(evac: HTMLDivElement) {

    if (!this.isReports) {
      this.isReports = true;
      evac.focus();
    } else {
      this.isReports = false;
      evac.focus();
    }
  }

  toggle_adminstration(evac: HTMLDivElement) {
    if (!this.isAdminstration) {
      this.isAdminstration = true;
      evac.focus();
    } else {
      this.isAdminstration = false;
      evac.focus();
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/' + 'login']);
    //this.locate.replaceState('/' + this.genk.auth + '/login')
    //window.location.reload();
  }

  yearList() {
    this.report.getYearList("concessionsituationyearlist")
        .subscribe((res: any[]) => {
            this.listyear = res;
            this.genk.reportYear = this.listyear[0];
            this.modal.logGeneralReportYear();
            //this.cd.markForCheck();
        });
}

getYear(e) {
  this.genk.reportYear = e.target.value;
  this.modal.logGeneralReportYear()
  this.cd.markForCheck();
}


}
