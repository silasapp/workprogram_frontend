import { isNumber } from '@amcharts/amcharts5/.internal/core/util/Type';
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

@Component({
  templateUrl: './start.component.html',
  styleUrls: ['start.component.scss', '../../account/login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartComponent implements OnInit {
  boardForm: FormGroup;
  wkpYear: string;
  currentYear = new Date().getFullYear();
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  Field_List = [];
  field: string;
  genk: GenericService;
  disableTab: boolean = true;

  constructor(
    private workprogram: WorkProgramService,
    private gen: GenericService,
    private modal: ModalService,
    private auth: AuthenticationService,
    private cd: ChangeDetectorRef
  ) {
    this.genk = gen;
  }

  ngOnInit(): void {
    this.getWPYears();
    localStorage.setItem('OmlName', '');
    localStorage.setItem('fieldName', '');
    localStorage.setItem('wkpYear', '');
  }

  changeWPYear(e) {
    this.wkpYear = e.target.value;
    this.genk.wpYear = this.wkpYear;
    localStorage.setItem('wkpYear', this.wkpYear);

    this.setDisableTab(this.wkpYear);

    this.workprogram
      .getConcessionHeld(this.auth.currentUserValue.companyId, this.wkpYear)
      .subscribe((res) => {
        this.concessionHeldList = res;
        this.genk.OMLList = res;
        this.disableTab = true;
        this.cd.markForCheck();
      });
  }

  setDisableTab(year: string) {
    if (isNumber(parseInt(year))) this.disableTab = false;
    else this.disableTab = true;
    this.cd.markForCheck();
  }

  getWPYears() {
    this.workprogram.getWPYears().subscribe((res) => {
      this.wkpYearList = res;
      this.cd.markForCheck();
    });
  }
}
