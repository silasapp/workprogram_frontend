import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
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
export class StartComponent implements OnInit{
  boardForm: FormGroup;
  wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  Field_List = [];
  field: string;
  genk: GenericService;

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
  }

  changeWPYear(e) {
    this.wkpYear = e.target.value;
    this.genk.wpYear = this.wkpYear;
    localStorage.setItem('wkpYear', this.wkpYear);
    this.workprogram
      .getConcessionHeld(this.auth.currentUserValue.companyId, this.wkpYear)
      .subscribe((res) => {
        this.concessionHeldList = res;
        this.genk.OMLList = res;
        this.cd.markForCheck();
      });
  }

  getWPYears() {
    this.workprogram.getWPYears().subscribe((res) => {
      this.wkpYearList = res;
      this.cd.markForCheck();
    });
  }

}
