import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  boardForm: FormGroup;
  wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  Field_List = [];
  field: string;
  genk: GenericService;

  constructor(private workprogram: WorkProgramService,
    private gen: GenericService,
    private modal: ModalService,
    private auth: AuthenticationService,
    private cd: ChangeDetectorRef) {
    this.genk = gen;
   }

  ngOnInit(): void {
    this.boardForm = new FormGroup(
      {
        'year': new FormControl(this.wkpYear, [Validators.required]),
        'concession_Held': new FormControl(this.concessionHeld, [ Validators.required]),
        'Field': new FormControl(this.field, [ Validators.required])
      }, {});
    this.getWPYearList();
  }

  changeWPYear(e) {
    this.wkpYear = e.target.value;
    this.genk.wpYear = this.wkpYear;
    this.workprogram
      .getConcessionHeld(this.auth.currentUserValue.companyId, this.wkpYear)
      .subscribe((res) => {
        this.concessionHeldList = res;
        this.genk.OMLList = res;
        this.cd.markForCheck();
      });
  }

  changeConcessionHeld(e) {
    this.concessionHeld = e.target.value;
    this.genk.OmlName = this.concessionHeld;
    this.cd.markForCheck();
    this.checkCompletedSteps();

    this.workprogram.getConcessionField(this.concessionHeld, null)
    .subscribe((res: any[]) => {
      if (res.length > 0) {
        this.Field_List = res;
        this.genk.Field_List = res;
        this.cd.markForCheck();

      } else {
        this.modal.logConcessionSituation(this.concessionHeld);
        this.Field_List = res;
        this.genk.Field_List = res;
        this.cd.markForCheck();
      }

    });
  }

  changeConcessionField(e) {
    this.field = e.target.value;
    this.genk.fieldName = this.field;
    this.modal.logConcessionSituation(this.concessionHeld);

  }

  getWPYearList() {
    this.workprogram.getWPYearList().subscribe((res) => {
      this.wkpYearList = res;
      this.cd.markForCheck();
    });
  }

  checkCompletedSteps() {
    this.workprogram.getCompletedSteps(this.concessionHeld)
    .subscribe(res => {
      debugger;
      let del = res;
    });
  }

}
