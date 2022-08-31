import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
    selector: 'app-geophysical-activities',
    templateUrl: 'ndr-report.component.html',
    styleUrls: ['ndr-report.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeophysicalActivitiesComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'GEOPHYSICAL ACTIVITIES (ACQUISITION)';
    pagenum = 0;
    selectedPage = 1;
    arrayRows = [];
    data: any[];
    year = [];
    columns = [

        {
            "columnDef": "companyname",
            "header": "COMPANY NAME"
        },
        {
            "columnDef": "companyemail",
            "header": "COMPANY EMAIL"
        },

        {
            "columnDef": "oml_name",
            "header": "CONCDESSION HELD"
        },
        {
            "columnDef": "year_of_wp",
            "header": "YEAR"
        },
        {
            "columnDef": "contract_type",
            "header": "CONTRACT TYPE"
        },
        {
            "columnDef": "terrain",
            "header": "TERRAIN"
        },
        {
            "columnDef": "consession_type",
            "header": "CONCESSION TYPE"
        },
        {
            "columnDef": "quater",
            "header": "QUATER"
        },
        {
            "columnDef": "actual_year_aquired_data",
            "header": "ACTUAL YEAR AQUIRED DATA"
        },
        {
            "columnDef": "proposed_year_data",
            "header": "PROPOSED YEAR DATA"
        },
        {
            "columnDef": "budeget_allocation_ngn",
            "header": "BUDGET ALLOCATION NGN"
        },

        {
            "columnDef": "budeget_allocation_usd",
            "header": "BUDGET ALLOCATION USD"
        },
        {
            "columnDef": "remarks",
            "header": "REMARKS"
        },
        {
            "columnDef": "geo_acquired_geophysical_data",
            "header": "ACQUIRED GEOPHYSICAL DATA"
        },
        
        {
            "columnDef": "geo_area_of_coverage",
            "header": "AREA OF COVERAGE"
        },

        {
            "columnDef": "geo_method_of_acquisition",
            "header": "METHOD OF ACQUISITION"
        },
        {
            "columnDef": "geo_type_of_data_acquired",
            "header": "TYPE OF DATA ACQUIRED"
        },
        {
            "columnDef": "geo_record_length_of_data",
            "header": "RECORD LENGTH OF DATA"
        },
        {
            "columnDef": "geo_completion_status",
            "header": "COMPLETION STATUS"
        },
        {
            "columnDef": "quantum",
            "header": "QUANTUM"
        },
        {
            "columnDef": "quantum_carry_forward",
            "header": "QUANTUM CARRY FORWARD"
        },
        {
            "columnDef": "geo_activity_timeline",
            "header": "ACTIVITY TIMELINE"
        },
        {
            "columnDef": "name_of_contractor",
            "header": "NAME OF CONTRACTOR"
        }
    ];

    constructor(private report: ReportService,
        private cd: ChangeDetectorRef,
        private gen: GenericService) {
        this.genk = gen;
        this.cdr = cd;
        this.genk.sizePerPage = this.genk.sizeten;
    }

    ngOnInit() {
        this.data = [];
        this.yearList();
        this.genk.sizePerPage = this.genk.sizeten;
    }

    public get pageIndex(): number {
        return (this.selectedPage - 1) * this.genk.sizePerPage;
    }

    assignPageNum() {
        this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
    }

    assignDataRows() {
        this.arrayRows = this.data.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
        //let dell = {ME: "sam", joEL: "joEl"};
        //this.genk.lowerJson(dell);
        console.log(this.arrayRows);
        this.cd.markForCheck();
    }

    fetchdata(e) {
        let value = e.target.value;
        this.report.fetch("geophysicalactivities", value).subscribe(
            (res) => {
                this.data = res.data as any[];
                this.assignDataRows();
                this.assignPageNum();
                this.cd.markForCheck();
            }
        )
    }

    yearList() {
        this.report.getYearList("geophysicalactivitiesyearlist")
            .subscribe((res: any[]) => {
                this.year = res;
                this.cd.markForCheck();
            });
    }

    goNext() {
        this.selectedPage++;
        this.assignDataRows();
    }

    goPrev() {
        this.selectedPage--;
        this.assignDataRows();
    }

    firstPage() {
        this.selectedPage = 1;
        this.assignDataRows();
    }

    lastPage() {
        this.selectedPage = this.pagenum;
        this.assignDataRows();
    }

    changePage(value: string) {
        this.selectedPage = Number(value);
        this.assignDataRows();
    }

    resize(e) {
        let value = e.target.value;
        if (value === 'all') {
            value = this.pagenum * this.genk.sizePerPage
        }
        this.genk.sizePerPage = Number(value);
        this.assignDataRows();
        this.assignPageNum();
        this.cd.markForCheck();
    }
}
