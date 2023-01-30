import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AuthenticationService,
  GenericService,
  IConcession,
  IField,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  selector: 'app-concession',
  templateUrl: './concession-base.component.html',
  styleUrls: ['concession-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConcessionBaseComponent implements OnInit {
  @ViewChild('conselect', { static: false })
  concessionSelect: ElementRef<HTMLSelectElement>;
  concessionForm: FormGroup;
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
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
    this.genk = gen;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      const rejectId = param.get('rejectId');
      const sbU_Tables = param.get('sbU_Tables');

      this.genk.rejectId = +rejectId ? +rejectId : this.genk.rejectId;
      this.genk.sbU_Tables = sbU_Tables?.split('|')
        ? sbU_Tables?.split('|')
        : this.genk.sbU_Tables;
    });

    this.concessionForm = new FormGroup(
      {
        year: new FormControl(this.wkpYear, [Validators.required]),
        concession_Held: new FormControl(this.concessionHeld, [
          Validators.required,
        ]),
        Field: new FormControl(this.field, [Validators.required]),
      },
      {}
    );

    this.getConcessions();
  }

  getConcessions() {
    this.modalService.logCover('loading...', true);

    this.workprogram
      .getConcessionHeld(this.auth.currentUserValue.companyId, this.genk.wpYear)
      .subscribe((res) => {
        this.concessionHeldList = res.listObject.map((r) => r.con);
        this.genk.OMLList = this.concessionHeldList;
        this.genk.Concessions$.next(res.listObject);
        this.genk.Concessions = res.listObject;
        let ind = this.concessionHeldList.indexOf(this.genk.OmlName);
        this.concessionHeldList.splice(ind, 1);
        this.concessionHeldList.unshift(this.genk.OmlName);
        this.concessionSelect.nativeElement.value = this.genk.OmlName;
        if (this.genk.OmlName) {
          this.selectConcession(localStorage.getItem('OmlName'));
        }
        this.cd.markForCheck();
        this.modalService.togCover();
      });
  }

  changeConcessionHeld(e) {
    debugger;
    this.concessionHeld = e.target.value;
    this.genk.OmlName = this.concessionHeld;

    const concession = this.genk.Concessions.find(
      (o: IConcession) => o.con == this.genk.OmlName
    );

    this.genk.Concession$.next(concession);

    localStorage.setItem('OmlName', this.genk.OmlName);
    this.cd.markForCheck();

    this.modalService.logCover('loading...', true);
    this.workprogram
      .getConcessionField(this.concessionHeld, null)
      .subscribe((res: any[]) => {
        if (res.length > 0) {
          this.Field_List = res;
          this.genk.Field_List = res;
          this.genk.Fields = res;
          this.genk.fieldName = res[0];
          localStorage.setItem('fieldName', this.genk.fieldName);
          this.cd.markForCheck();
        } else {
          this.modal.logConcessionSituation(this.concessionHeld);
          this.Field_List = res;
          this.genk.Field_List = null;
          this.cd.markForCheck();
        }

        this.modalService.togCover();
      });
  }

  selectConcession(value) {
    this.concessionHeld = value;
    this.genk.OmlName = this.concessionHeld;
    localStorage.setItem('OmlName', this.genk.OmlName);
    this.cd.markForCheck();

    this.workprogram
      .getConcessionField(this.concessionHeld, null)
      .subscribe((res: any[]) => {
        if (res.length > 0) {
          this.Field_List = res;
          this.genk.Field_List = res;
          this.genk.fieldName = res[0];
          localStorage.setItem('fieldName', this.genk.fieldName);
          this.cd.markForCheck();
        } else {
          this.modal.logConcessionSituation(this.concessionHeld);
          this.Field_List = res;
          this.genk.Field_List = null;
          this.genk.fieldName = null;
          this.cd.markForCheck();
        }
      });
  }

  changeConcessionField(e) {
    this.field = e.target.value;
    this.genk.fieldName = this.field;

    const _field = this.genk.Fields?.find(
      (f: IField) => f.field_Name == this.field
    );

    this.genk.Field = _field;
    this.genk.Field$.next(_field);

    this.genk.fieldFullName = this.genk.Field_List.filter(
      (x) => x.field_ID == this.genk.fieldName
    )[0].field_Name;
    localStorage.setItem('fieldFullName', this.genk.fieldFullName);
    this.modal.logConcessionSituation(this.concessionHeld);
  }

  // getWPYearList() {
  //   this.workprogram.getWPYears().subscribe((res) => {
  //     this.wkpYearList = res;
  //     this.cd.markForCheck();
  //   });
  // }
}
