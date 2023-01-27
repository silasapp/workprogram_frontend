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
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
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
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      this.checkCompletedSteps();
    });
  }

  ngOnInit(): void {
    this.checkCompletedSteps();
  }

  checkCompletedSteps() {
    this.workprogram
      .getCompletedSteps(this.genk.OmlName, this.genk.wpYear)
      .subscribe((res) => {
        this.genk.isStep1 = res.step1;
        this.genk.isStep2 = res.step2;
        this.genk.isStep3 = res.step3;
        this.genk.isStep4 = res.step5; //todo: change not best practice
        this.genk.isStep5 = res.step4;
        this.cd.markForCheck();
      });
  }

  consolelog() {
    console.log('rerendering board component');
  }


}
