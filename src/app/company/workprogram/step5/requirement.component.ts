import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  Form,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import {} from 'src/app/models/step5_hse.model';
import {
  MINIMUM_REQUIREMENT,
  PLANNING_MINIMUM_REQUIREMENT,
} from 'src/app/models/step5_sdcp.model';
import { GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './requirement.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPRequirementComponent implements OnInit {
  genk: GenericService;

  public planningMinimumRequirementForm: FormGroup;
  public minimumRequirementForm: FormGroup;

  public planningMinimumRequirementBody: PLANNING_MINIMUM_REQUIREMENT =
    {} as PLANNING_MINIMUM_REQUIREMENT;

  public minimumRequirementBody: MINIMUM_REQUIREMENT =
    {} as MINIMUM_REQUIREMENT;

  //#region Column header definitions
  hscdpcColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'WORK PROGRAM YEAR',
    },
    {
      columnDef: 'description_of_Projects_Planned',
      header: 'DESCRIPTION OF PROJECTS PLANNED',
    },
    {
      columnDef: 'description_of_Projects_Actual',
      header: 'DESCRIPTION OF PROJECTS ACTUAL',
    },
  ];
  //#endregion

  //#region list declarations
  planningMinimumRequirements: PLANNING_MINIMUM_REQUIREMENT[] = [];
  //#endregion

  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.modalService.concessionSitu.subscribe((res) => {
      this.getSWPR();
    });
    this.cd.markForCheck();
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP5';
    this.planningMinimumRequirementForm = new FormGroup(
      {
        reservesRevenue_GrossProduction: new FormControl(
          this.planningMinimumRequirementBody.reservesRevenue_GrossProduction,
          [Validators.required]
        ),
        reservesRevenue_RemainingReserves: new FormControl(
          this.planningMinimumRequirementBody.reservesRevenue_RemainingReserves,
          [Validators.required]
        ),
      },
      {}
    );

    this.minimumRequirementForm = new FormGroup(
      {
        provide_ISO45001_Certification_No: new FormControl(
          this.minimumRequirementBody.provide_ISO45001_Certification_No,
          [Validators.required]
        ),
        is_Company_ISO45001_Certified: new FormControl(
          this.minimumRequirementBody.is_Company_ISO45001_Certified,
          [Validators.required]
        ),
      },
      {}
    );
  }

  getSWPR() {
    forkJoin([
      this.workprogram.getFormFiveSWPR(
        this.genk.OmlName,
        this.genk.wpYear,
        this.genk.fieldName
      ),
      this.workprogram.getFormFiveHSERequirement(
        this.genk.OmlName,
        this.genk.wpYear,
        this.genk.fieldName
      ),
    ]).subscribe((res) => {
      if (res[0]) {
        this.planningMinimumRequirementBody = res[0].data;
      }

      if (res[1]) {
        this.minimumRequirementBody = res[1].data;
      }

      console.log(
        'res',
        this.planningMinimumRequirementBody,
        this.minimumRequirementBody
      );
      this.cd.markForCheck();
    });
  }

  Submit_planningMinimumRequirement() {
    this.workprogram
      .post_planningMinimumRequirement(
        this.planningMinimumRequirementBody,
        this.genk.wpYear,
        this.genk.OmlName,
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSWPR();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }

  Submit_MinimumRequirement() {
    this.workprogram
      .post_MinimumRequirement(
        this.minimumRequirementBody,
        this.genk.wpYear,
        this.genk.OmlName,
        ''
      )
      .subscribe({
        next: (res) => {
          this.modalService.logNotice('Success', res.messsage, 'success');

          this.getSWPR();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice('Error', error.message, 'error');
        },
      });
  }
}
