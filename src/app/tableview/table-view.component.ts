import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { GenericService } from 'src/app/services';
import { AdminService } from '../services/admin.service';

@Component({
  templateUrl: './table-view.component.html',
  styleUrls: ['../app.component.scss'],
})
export class TableViewComponent implements OnInit {
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'Download a Table';
  arrayRows = [];
  data: any[];
  year = [];
  company: any[];
  concessionForm: FormGroup;
  tableName: string;


  constructor(
    private gen: GenericService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private adminservice: AdminService
  ) {
    this.genk = gen;
    this.cdr = cd;
    this.genk.sizePerPage = this.genk.sizeten;
  }

  ngOnInit() {
    this.data = [];
    this.genk.sizePerPage = this.genk.sizeten;
    this.concessionForm.reset();
  }

  fetchdata(value, progressSpan) {
    this.adminservice.getTable(value).subscribe(event => {
      this.getDownProgress(event, 'table', progressSpan, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx')
    });
  }


  getDownProgress(event, category: string, san: HTMLSpanElement, type: string, format: string) {
    if (event.type === HttpEventType.DownloadProgress) {
      let progress = Math.round(100 * (event.loaded / event.total));
      this.downloadStat(progress, san, 'Downloading');
    } else if (event.type === HttpEventType.Response) {
      let myfile = new Blob([event.body], { type: type });
      this.coolon(myfile, this.genName(category), format);
    }
  }

  downloadStat(progress: number, san: HTMLSpanElement, titleText: string) {
    san.innerHTML = `${titleText}:  ${progress}%`;
  }

  coolon(response: any, name: string, format?: string) {
    let filename = name + '.' + format;
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(response);

    if (filename) {
      downloadLink.setAttribute('download', filename)
    }
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  genName(loc: string): string {
    return `wkp${loc}${Math.floor(Math.random() * 20000)}`;
  }

}
