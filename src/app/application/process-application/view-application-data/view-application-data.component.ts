import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-application-data',
  templateUrl: './view-application-data.component.html',
  styleUrls: ['./view-application-data.component.scss'],
})
export class ViewApplicationDataComponent implements OnInit {
  public sbuReport;
  public appId: number;
  public geoActivitiesProcessing;
  public geoActivitiesAcquisition;
  public drillOperationCategoriesWell;
  public drillEachCostProposed;
  public drillEachCosts: IDrillEachCost[] = [];

  hdecColDef = [
    {
      columnDef: 'year_of_WP',
      header: 'Work Programme Year',
    },
    {
      columnDef: 'companY_ID',
      header: 'Company ID',
    },
    {
      columnDef: 'companyName',
      header: 'Company Name',
    },
    {
      columnDef: 'companyemail',
      header: 'Company Email',
    },
    {
      columnDef: 'consession_Type',
      header: 'Concession Type',
    },
    {
      columnDef: 'omL_Name',
      header: 'OML Name',
    },
    {
      columnDef: 'quater',
      header: 'Quarter',
    },
    {
      columnDef: 'surface_cordinates_for_each_well_in_degrees',
      header: 'Surface Coordinates For Each Well in degrees',
    },
    {
      columnDef: 'well_cost',
      header: 'Well Cost',
    },
    {
      columnDef: 'well_name',
      header: 'Well Name',
    },
  ];

  constructor(
    private adminService: AdminService,
    private cd: ChangeDetectorRef,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.appId = param['id'];
      this.getSBUReport(this.appId);
    });
  }

  getSBUReport(appId) {
    this.modalService.logCover('loading...', true);
    this.adminService.getSBUReport(appId).subscribe({
      next: (res) => {
        this.drillEachCosts.push(res.drillEachCost);

        this.modalService.togCover();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.modalService.logNotice(error.message, 'Error', 'error');
        this.cd.markForCheck();
      },
    });
  }
}

interface IDrillEachCost {
  id: number;
  companY_ID: string;
  companyName: string;
  companyNumber: number;
  companyemail: string;
  consession_Type: string;
  created_by: string;
  date_Created: string;
  date_Updated: string;
  field_ID: number;
  omL_ID: string;
  omL_Name: string;
  quater: string;
  surface_cordinates_for_each_well_in_degrees: string;
  updated_by: string;
  well_cost: string;
  well_name: string;
  year_of_WP: string;
}
