import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from '../account/login.component';
import { IAuthData } from '../models/application-details';
import { AuthenticationService, GenericService } from '../services';

@Component({
  selector: 'app-company-details',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit {
  genk: GenericService;
  isPresentationEvaluation = false;
  isPresentationSchedule = false;
  isApplication = false;
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

  constructor(
    private gen: GenericService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.genk = gen;
    const user = JSON.parse(localStorage.getItem('currentUser')) as IAuthData;
    this.genk.setAdminSubject.next(user.companyName === UserType.Admin);
    this.auth = authenticationService;
  }
  ngOnInit(): void {}

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

  toggle_application() {
    if (!this.isApplication) {
      this.entryStyle = 'layout-child';
      this.isApplication = true;
    } else {
      this.entryStyle = 'layout-child';
      this.isApplication = false;
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
}
