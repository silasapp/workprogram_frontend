import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthenticationService,
  GenericService,
  IConcession,
  IField,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './start.component.html',
  styleUrls: ['start.component.scss', '../../account/login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  lowt: string;
  yearError: string;
  concessionError: string;
  fieldError: string;

  constructor(
    private workprogram: WorkProgramService,
    private gen: GenericService,
    private modal: ModalService,
    private route: Router,
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

    // this.route.queryParamMap.subscribe((param) => {
    //   const rejectId = param.get('rejectId');
    //   const sbU_Tables = param.get('sbU_Tables');

    //   this.genk.rejectId = +rejectId ? +rejectId : this.genk.rejectId;
    //   this.genk.sbU_Tables = sbU_Tables?.split('|')
    //     ? sbU_Tables?.split('|')
    //     : this.genk.sbU_Tables;
    // });

    this.boardForm = new FormGroup(
      {
        year: new FormControl(this.wkpYear, [Validators.required]),
        concession_Held: new FormControl(this.concessionHeld, [
          Validators.required,
        ]),
        field: new FormControl(this.field, [Validators.required]),
      },
      {}
    );

    // this.genk.Concession$.next(JSON.parse(localStorage.getItem('Concession')));
    this.getConcessions();
    this.cd.markForCheck();

  }

  changeWPYear(e) {
    this.wkpYear = e.target.value;
    this.yearError = '';
    this.genk.wpYear = this.wkpYear;
    localStorage.setItem('wkpYear', this.wkpYear);
    // this.workprogram
    //   .getConcessionHeld(this.auth.currentUserValue.companyId, this.wkpYear)
    //   .subscribe((res) => {
    //     this.concessionHeldList = res;
    //     this.genk.OMLList = res;
    //     this.lowt = 'Plate';
    //     alert(this.lowt);
    //     this.cd.markForCheck();
    //   });
  }

  getWPYears() {
    this.workprogram.getWPYears().subscribe((res) => {
      this.wkpYearList = res;
      this.cd.markForCheck();
    });
  }





  getConcessions() {
    this.modal.logCover('loading...', true);

    this.workprogram
      .getConcessionHeld(this.auth.currentUserValue.companyId, this.genk.wpYear)
      .subscribe((res) => {
        this.concessionHeldList = res.listObject.map((r) => r.con);
        this.genk.OMLList = this.concessionHeldList;
        this.genk.Concessions$.next(res.listObject);
        this.genk.Concessions = res.listObject;
        this.cd.markForCheck();
        this.modal.togCover();
      });
  }

  changeConcessionHeld(e) {
    this.concessionHeld = e.target.value;
    this.concessionError = '';
    this.genk.OmlName = this.concessionHeld;


    const concession = this.genk.Concessions.find(
      (o: IConcession) => o.con == this.genk.OmlName
    );

    this.genk.Concession$.next(concession);
    localStorage.setItem('Concession', JSON.stringify(concession));

    localStorage.setItem('OmlName', this.genk.OmlName);
    this.cd.markForCheck();

    this.modal.logCover('loading...', true);
    this.workprogram
      .getConcessionField(this.concessionHeld, null)
      .subscribe((res: any[]) => {
        debugger;
        if (res.length > 0) {
          this.Field_List = res;
          //this.cd.markForCheck();
          this.genk.Field_List = res;

          this.genk.Fields = res;
          this.genk.fieldName = res[0].field_ID;
          this.genk.Field$.next(res[0]);
          this.cd.markForCheck();
          //console.log('resss...', res[0]);
          localStorage.setItem('fieldName', this.genk.fieldName);

        } else {
          this.Field_List = res;
          this.genk.Field_List = null;
          this.genk.fieldName = null;
          localStorage.removeItem('fieldName');
          localStorage.removeItem('fieldFullName');
          this.genk.fieldFullName = '';
          this.modal.logConcessionSituation(this.concessionHeld);
        }

        this.modal.togCover();
        this.cd.markForCheck();
      });
  }

  // selectConcession(value) {
  //   this.concessionHeld = value;
  //   this.genk.OmlName = this.concessionHeld;
  //   localStorage.setItem('OmlName', this.genk.OmlName);
  //   this.cd.markForCheck();

  //   this.workprogram
  //     .getConcessionField(this.concessionHeld, null)
  //     .subscribe((res: any[]) => {
  //       debugger;
  //       if (res.length > 0) {
  //         this.Field_List = res;
  //         this.cd.markForCheck();
  //         this.genk.Field_List = res;
  //         this.genk.fieldName = res[0].field_ID;
  //         localStorage.setItem('fieldName', this.genk.fieldName);
  //       } else {
  //         this.modal.logConcessionSituation(this.concessionHeld);
  //         this.Field_List = res;
  //         this.cd.markForCheck();
  //         this.genk.Field_List = null;
  //         this.genk.fieldName = null;
  //         localStorage.removeItem('fieldName');
  //         localStorage.removeItem('fieldFullName');
  //         this.genk.fieldFullName = '';
  //         this.cd.markForCheck();
  //       }
  //     });
  // }

  changeConcessionField(e) {
    this.field = e.target.value;
    this.fieldError = '';
    this.genk.fieldName = this.field;

    const _field = this.genk.Fields?.find(
      (f: IField) => f.field_ID == + this.field
    );

    console.log('filed...', this.genk.Fields, _field, this.field);
    this.genk.Field = _field;
    this.genk.Field$.next(_field);

    this.genk.fieldFullName = this.genk.Field_List.filter(
      (x) => x.field_ID == this.genk.fieldName
    )[0].field_Name;
    localStorage.setItem('fieldFullName', this.genk.fieldFullName);
    localStorage.setItem('fieldName', this.genk.fieldName);

    this.modal.logConcessionSituation(this.concessionHeld);
  }

  navigateToStep(tab: string, dir: string, page: string) {
    if (!this.wkpYear) {
      this.yearError = "Please select a year";
    }
    else if (!this.concessionHeld) {
      this.concessionError = "Please select a concession";
    }
    else if (!this.field && this.Field_List.length > 0) {
      this.fieldError = "Please select a field";
    }
    else {
      this.route.navigate([tab, dir, page]);
    }

  }
}
