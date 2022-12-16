import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApplicationDetails } from '../models/application-details';
import { CONCESSION_SITUATION } from '../models/step1-concession.model';
import { HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW } from '../models/step5_hse.model';
import { ModalService } from './modal.service';

@Injectable({ providedIn: 'root' })
export class GenericService {
  sessionStaffID : number;
  sessionStaffEmail : string;
  fileData: File = null;
  selectedPage = 1;
  sizeten = 10;
  sizePerPage = 10;
  chanSize = 6;
  staySize = 3;
  application = 'application';
  admin = 'admin';
  account = 'account';
  company = 'company';
  reports = 'reports';
  dashboard = 'dashboard';
  company_details = 'company-details';
  register = 'register';
  presentation = 'presentation';
  schedule: 'presentationschedule';
  performance = 'performance_evaluation';
  workprogram = 'workprogram';
  generalReport = 'generalreport';

  reportYear: string;
  submitted = false;
  progress: number;
  private pageloadcom = new Subject<boolean>();
  pageload = this.pageloadcom.asObservable();
  isAdmin = false;
  wpYear: string;
  terrain: string;
  geologicalLocation: string;
  OmlName: string;
  OmlID: number;
  fieldName: string;
  fieldWell: string = 'GAS WELL';
  fieldID: number;
  OMLList = [];
  Field_List = null;
  concessionData: CONCESSION_SITUATION = {} as CONCESSION_SITUATION;
  applicationDetails: ApplicationDetails;
  hseTechnicalSafety: HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW =
    {} as HSE_TECHNICAL_SAFETY_CONTROL_STUDIES_NEW;
  appID: number;
  isStep1 = false;
  isStep2 = false;
  isStep3 = false;
  isStep4 = false;
  isStep5 = false;
  activeStep = 'STEP1';

  year = [{ value: '2020' }, { value: '2021' }];

  role = [{ value: 'Admin' }, { value: 'Company' }];

  contractType = [
    { value: 'JVC' },
    { value: 'MF' },
    { value: 'PSC' },
    { value: 'SC' },
    { value: 'SR' },
  ];
  concessiontype = [{ value: 'OML' }, { value: 'OPL' }];

  entries = [
    { text: '10 entries', value: '10' },
    { text: '20 entries', value: '20' },
    { text: '50 entries', value: '50' },
    { text: 'All entries', value: 'all' },
  ];

  constructor(private modal: ModalService) {}

  public get pageIndex(): number {
    return (this.selectedPage - 1) * this.sizePerPage;
  }

  public get chanIndex(): number {
    return (this.selectedPage - 1) * this.chanSize;
  }

  public get stayIndex(): number {
    return (this.selectedPage - 1) * this.staySize;
  }

  public get tablePrintCss() {
    return `body
      {
          font-family: Arial;
          font-size: 10pt;
      }
      table
      {
          border: 1px solid #ccc;
          border-collapse: collapse;
          color: black;
      }
      table th
      {
          font-weight: bold;
          padding: 10px 15px;
          text-align: center;
          background-color: rgb(9, 79, 104);
          color: black;
      }
      table th, table td
      {
          border: 1px solid #16a7e0;
          padding: 10px 15px;
      }`;
  }

  hook(value: string) {
    return value.replace(/[\<\>]/g, '');
  }

  searchTable(input: HTMLInputElement, tableBody: HTMLTableElement) {
    var filter, found, tr, td, i, j;
    filter = input.value.toUpperCase();
    tr = tableBody.getElementsByTagName('tr');
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td');
      for (j = 0; j < td.length; j++) {
        if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
          found = true;
        }
      }
      if (found) {
        tr[i].style.display = '';
        found = false;
      } else {
        tr[i].style.display = 'none';
      }
    }
  }

  printData(table: HTMLTableElement) {
    let newWin = window.open('');
    newWin.document.write(table.outerHTML);
    newWin.document.write('<style type = "text/css">');
    newWin.document.write(this.tablePrintCss);
    newWin.document.write('</style>');
    newWin.print();
    newWin.close();
  }

  printImage() {
  //   $(document).ready(function () {
  //     let btn=$('#c-oreder-preview');
  //     btn.text('download');
  //     btn.on('click',()=> {

  //         $('#c-invoice').modal('show');
  //         setTimeout(function () {
  //             html2canvas(document.querySelector("#c-print")).then(canvas => {
  //                 //$("#previewBeforeDownload").html(canvas);
  //                 var imgData = canvas.toDataURL("image/jpeg",1);
  //                 var pdf = new jsPDF("p", "mm", "a4");
  //                 var pageWidth = pdf.internal.pageSize.getWidth();
  //                 var pageHeight = pdf.internal.pageSize.getHeight();
  //                 var imageWidth = canvas.width;
  //                 var imageHeight = canvas.height;

  //                 var ratio = imageWidth/imageHeight >= pageWidth/pageHeight ? pageWidth/imageWidth : pageHeight/imageHeight;
  //                 //pdf = new jsPDF(this.state.orientation, undefined, format);
  //                 pdf.addImage(imgData, 'JPEG', 0, 0, imageWidth * ratio, imageHeight * ratio);
  //                 pdf.save("invoice.pdf");
  //                 //$("#previewBeforeDownload").hide();
  //                 $('#c-invoice').modal('hide');
  //             });
  //         },500);

  //         });
  // });
  }

  tableToCSV(table: HTMLTableElement) {
    // Variable to store the final csv data
    let csv_data = [];

    // Get each row data
    let rows = table.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
      // Get each column data
      let cols = rows[i].querySelectorAll('td,th');

      // Stores each csv row data
      let csvrow = [];
      for (var j = 0; j < cols.length; j++) {
        // Get the text data of each cell
        // of a row and push it to csvrow
        csvrow.push(cols[j].innerHTML);
      }

      // Combine each column value with comma
      csv_data.push(csvrow.join(','));
    }
  }

  tableToCSVReport(table: HTMLTableElement) {
    // Variable to store the final csv data
    let csv_data = [];
    let lastChildList = [];
    debugger;

    let row1 = table.getElementsByTagName('tr')[0];

    // Get each column data
    let coles = row1.querySelectorAll('th');
    for (var i = 0; i < coles.length; i++) {
      lastChildList.push(coles[i].lastChild);
      coles[i].removeChild(coles[i].lastChild);
    }

    // Get each row data
    let rows = table.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
      // Get each column data
      let cols = rows[i].querySelectorAll('td,th');

      // Stores each csv row data
      let csvrow = [];
      for (var j = 0; j < cols.length; j++) {
        // Get the text data of each cell
        // of a row and push it to csvrow
        csvrow.push(cols[j].innerHTML);
      }

      // Combine each column value with comma
      csv_data.push(csvrow.join(','));
    }

    // Combine each row data with new line character
    let new_csv_data = csv_data.join('\n');

    // Call this function to download csv file
    this.downloadCSVFile(new_csv_data);

    for (var i = 0; i < coles.length; i++) {
      coles[i].appendChild(lastChildList[i]);
    }
  }

  downloadCSVFile(csv_data) {
    // Create CSV file object and feed
    // our csv_data into it
    let CSVFile = new Blob([csv_data], {
      type: 'text/csv',
    });

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = 'TableData.csv';
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = 'none';
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
  }

  copyTable(elToBeCopied) {
    let range, sel;

    // Ensure that range and selection are supported by the browsers
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      // unselect any element in the page
      sel.removeAllRanges();

      try {
        range.selectNodeContents(elToBeCopied);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(elToBeCopied);
        sel.addRange(range);
      }

      document.execCommand('copy');
    }

    sel.removeAllRanges();

    this.modal.logNotice(
      'Copied',
      'This table has been copied to clipboard',
      'success'
    );
  }

  preventInput(cool: HTMLInputElement) {
    let my = cool.value;
    if (cool.value === '' || isNaN(cool.value as any)) {
      cool.value = cool.value.slice(0, -1);
    }
    cool.textContent = cool.value;
  }

  lowerArray(lyst: any[]) {
    let newlyst = [];
    let i = 0;
    while (i < lyst.length) {
      newlyst.push(this.lowerObj(lyst[i]));
      i++;
    }
    return newlyst;
  }

  lowerObj(obj: any) {
    var key,
      keys = Object.keys(obj);
    var n = keys.length;
    var newobj = {};
    while (n--) {
      key = keys[n];
      newobj[key.toLowerCase()] = obj[key];
    }
    return newobj;
  }

  stringArray(obj: any) {
    var key,
      keys = Object.keys(obj);
    var n = keys.length;
    var newobj = {};
    while (n--) {
      key = keys[n];
      if (obj[key]) {
        newobj[key] = obj[key].toString();
      }
    }
    return newobj;
  }

  formDate(datetime: string) {
    let datePipe = new DatePipe('en-US');
    return datePipe.transform(datetime, 'y-MM-dd');
  }

  lowerText(value) {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }
  upperText(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  //More efficient and concise implementation
  formatNum_Efficient(event) {
    // if (num.length < 4) return num;

    // num = num.replace(/,/g, '');
    // const digits = num.split('');

    // for (let p = digits.length - 1; p >= 0; p -= 3) {
    //   digits.splice(p + 1, 0, ',');
    // }

    // let res = digits.join('');

    // return res[res.length - 1] === ',' ? res.substring(0, res.length - 1) : res;

    let vel = event.target.value;
    if (isFinite(event.key)) {
      let e = event.target as HTMLInputElement;
      let term = parseFloat(e.value.toString().replace(/,+/g, '')).toString();
      let halfone = term.split('.')[0];
      let halftwo = term.split('.')[1];
      let isDecimal = halftwo ? true : false;
      if (halfone.length > 3 && halfone.length < 7) {
        halfone =
          halfone.slice(0, halfone.length - 3) +
          ',' +
          halfone.slice(halfone.length - 3, halfone.length);
      } else if (halfone.length > 6 && halfone.length < 10) {
        halfone =
          halfone.slice(0, halfone.length - 6) +
          ',' +
          halfone.slice(halfone.length - 6, halfone.length);
        halfone =
          halfone.slice(0, halfone.length - 3) +
          ',' +
          halfone.slice(halfone.length - 3, halfone.length);
      } else if (halfone.length > 9 && halfone.length < 13) {
        halfone =
          halfone.slice(0, halfone.length - 9) +
          ',' +
          halfone.slice(halfone.length - 9, halfone.length);
        halfone =
          halfone.slice(0, halfone.length - 6) +
          ',' +
          halfone.slice(halfone.length - 6, halfone.length);
        halfone =
          halfone.slice(0, halfone.length - 3) +
          ',' +
          halfone.slice(halfone.length - 3, halfone.length);
      }
      e.value = isDecimal ? halfone + '.' + halftwo : halfone;
      return true;
    } else {
      return false;
      // let e = event.target as HTMLInputElement;
      // event.target.value = e.value.slice(0, length -1);
    }
  }

  // test(event: Event) {
  //   let num = (event.target as HTMLInputElement).value;

  //   if (num.length < 4) return num;

  //   num = num.replace(/,/g, '');
  //   const digits = num.split('');

  //   for (let p = digits.length - 1; p >= 0; p -= 3) {
  //     digits.splice(p + 1, 0, ',');
  //   }

  //   let res = digits.join('');

  //   (event.target as HTMLInputElement).value =
  //     res[res.length - 1] === ',' ? res.substring(0, res.length - 1) : res;
  //   return '';
  // }

  formatNumFromStr(num: string) {
    if (!num) return '';
    if (num.length < 4) return num;

    num = num.replace(/,/g, '');
    const digits = num.split('');

    for (let p = digits.length - 1; p >= 0; p -= 3) {
      digits.splice(p + 1, 0, ',');
    }

    let res = digits.join('');

    console.log(
      'tes....',
      res[res.length - 1] === ',' ? res.substring(0, res.length - 1) : res
    );
    return res[res.length - 1] === ',' ? res.substring(0, res.length - 1) : res;
  }

  formatNum(halfone: string) {
    if (halfone.length > 3 && halfone.length < 7) {
      halfone =
        halfone.slice(0, halfone.length - 3) +
        ',' +
        halfone.slice(halfone.length - 3, halfone.length);
    } else if (halfone.length > 6 && halfone.length < 10) {
      halfone =
        halfone.slice(0, halfone.length - 6) +
        ',' +
        halfone.slice(halfone.length - 6, halfone.length);
      halfone =
        halfone.slice(0, halfone.length - 3) +
        ',' +
        halfone.slice(halfone.length - 3, halfone.length);
    } else if (halfone.length > 9 && halfone.length < 13) {
      halfone =
        halfone.slice(0, halfone.length - 9) +
        ',' +
        halfone.slice(halfone.length - 9, halfone.length);
      halfone =
        halfone.slice(0, halfone.length - 6) +
        ',' +
        halfone.slice(halfone.length - 6, halfone.length);
      halfone =
        halfone.slice(0, halfone.length - 3) +
        ',' +
        halfone.slice(halfone.length - 3, halfone.length);
    }
    return halfone;
  }

  formatCurrency(event) {
    let vel = event.target.value;
    if (isFinite(event.key)) {
      let e = event.target as HTMLInputElement;
      let term = parseFloat(e.value.toString().replace(/,+/g, '')).toString();
      let halfone = term.split('.')[0];
      let halftwo = term.split('.')[1];
      let isDecimal = halftwo ? true : false;
      if (halfone.length > 3 && halfone.length < 7) {
        halfone =
          halfone.slice(0, halfone.length - 3) +
          ',' +
          halfone.slice(halfone.length - 3, halfone.length);
      } else if (halfone.length > 6 && halfone.length < 10) {
        halfone =
          halfone.slice(0, halfone.length - 6) +
          ',' +
          halfone.slice(halfone.length - 6, halfone.length);
        halfone =
          halfone.slice(0, halfone.length - 3) +
          ',' +
          halfone.slice(halfone.length - 3, halfone.length);
      } else if (halfone.length > 9 && halfone.length < 13) {
        halfone =
          halfone.slice(0, halfone.length - 9) +
          ',' +
          halfone.slice(halfone.length - 9, halfone.length);
        halfone =
          halfone.slice(0, halfone.length - 6) +
          ',' +
          halfone.slice(halfone.length - 6, halfone.length);
        halfone =
          halfone.slice(0, halfone.length - 3) +
          ',' +
          halfone.slice(halfone.length - 3, halfone.length);
      }
      e.value = isDecimal ? halfone + '.' + halftwo : halfone;
      return true;
    } else {
      return false;
      // let e = event.target as HTMLInputElement;
      // event.target.value = e.value.slice(0, length -1);
    }
  }

  pressFormatCurrency(event) {
    if (isFinite(event.key)) {
      let e = event.target as HTMLInputElement;
      let vel = e.value + event.key;
      e.value = e.value + event.key;
      let term = parseFloat(e.value.toString().replace(/,+/g, '')).toString();
      let halfone = term.split('.')[0];
      let halftwo = term.split('.')[1];
      let isDecimal = halftwo ? true : false;
      if (halfone.length > 3 && halfone.length < 7) {
        halfone =
          halfone.slice(0, halfone.length - 3) +
          ',' +
          halfone.slice(halfone.length - 3, halfone.length);
      } else if (halfone.length > 6 && halfone.length < 10) {
        halfone =
          halfone.slice(0, halfone.length - 6) +
          ',' +
          halfone.slice(halfone.length - 6, halfone.length);
        halfone =
          halfone.slice(0, halfone.length - 3) +
          ',' +
          halfone.slice(halfone.length - 3, halfone.length);
      } else if (halfone.length > 9 && halfone.length < 13) {
        halfone =
          halfone.slice(0, halfone.length - 9) +
          ',' +
          halfone.slice(halfone.length - 9, halfone.length);
        halfone =
          halfone.slice(0, halfone.length - 6) +
          ',' +
          halfone.slice(halfone.length - 6, halfone.length);
        halfone =
          halfone.slice(0, halfone.length - 3) +
          ',' +
          halfone.slice(halfone.length - 3, halfone.length);
      }
      e.value = isDecimal ? halfone + '.' + halftwo : halfone;
      return true;
    } else {
      return false;
      // let e = event.target as HTMLInputElement;
      // event.target.value = e.value.slice(0, length -1);
    }
  }

  addCurrencyDecimal(event) {
    let e = event.target as HTMLInputElement;
    let term = parseFloat(e.value.toString().replace(/,+/g, '')).toFixed(2);

    let halfone = this.formatNum(term.split('.')[0]);
    let halftwo = term.split('.')[1];
    e.value = halfone + '.' + halftwo;
    e.value = e.value.toString().replace(/,+/g, '');
    return e.value;
  }

  checkBSCFMin(event, gasMin: HTMLElement) {
    //debugger;
    let e = event.target as HTMLInputElement;
    let term = parseFloat(e.value.toString().replace(/,+/g, ''));
    if (Number(term) < 10000) {
      gasMin.textContent = 'Value is too low';
      gasMin.style.color = 'orange';
    } else {
      gasMin.textContent = '';
    }
    e.value = e.value.toString().replace(/,+/g, '');
    return e.value;
  }

  checkMMBBLMin(event, oilMin: HTMLElement) {
    debugger;
    let e = event.target as HTMLInputElement;
    let term = parseFloat(e.value.toString().replace(/,+/g, ''));
    if (Number(term) < 1000) {
      oilMin.textContent = 'Value is too low';
      oilMin.style.color = 'orange';
    } else {
      oilMin.textContent = '';
    }
    e.value = e.value.toString().replace(/,+/g, '');
    return e.value;
  }

  restrictData(e) {
    //alert(e.key);
    var x = e.which || e.keycode;
    if (x >= 46 && x <= 57) return true;
    else return false;
  }

  setTwoNumberDecimal(event) {
    if (isFinite(event.key)) {
      let e = event.target as HTMLInputElement;
      var t =
        e.value.toString().length > 1
          ? parseFloat(e.value.toString().replace(/,+/g, '')).toFixed(3)
          : parseFloat(e.value.toString().replace(/,+/g, '')).toFixed(2);
      //var t = parseFloat(e.value).toFixed(3);
      let half1 = t.split('.')[0];
      let half2 = t.split('.')[1];

      let add2: string;
      if (half2.length > 2) {
        add2 = half2.substring(2);
        let halfone = half1 + add2;
        //if (halfone.length > 3) {
        let yel1 = halfone.slice(0, halfone.length - 3);
        let yel2 = halfone.slice(halfone.length - 3, halfone.length);
        if (halfone.length > 3 && halfone.length < 7) {
          halfone =
            halfone.slice(0, halfone.length - 3) +
            ',' +
            halfone.slice(halfone.length - 3, halfone.length);
        } else if (halfone.length > 6 && halfone.length < 10) {
          halfone =
            halfone.slice(0, halfone.length - 6) +
            ',' +
            halfone.slice(halfone.length - 6, halfone.length);
          halfone =
            halfone.slice(0, halfone.length - 3) +
            ',' +
            halfone.slice(halfone.length - 3, halfone.length);
        } else if (halfone.length > 9 && halfone.length < 13) {
          halfone =
            halfone.slice(0, halfone.length - 9) +
            ',' +
            halfone.slice(halfone.length - 9, halfone.length);
          halfone =
            halfone.slice(0, halfone.length - 6) +
            ',' +
            halfone.slice(halfone.length - 6, halfone.length);
          halfone =
            halfone.slice(0, halfone.length - 3) +
            ',' +
            halfone.slice(halfone.length - 3, halfone.length);
        }
        //}
        e.value = halfone + '.' + '00';
      } else {
        e.value = half1 + '.' + '00';
      }
    }
  }

  getExpDoc(value: string, type: string) {
    let ext;
    switch (type) {
      case 'application/pdf':
        ext = '.pdf';
        break;
      case 'text/plain':
        ext = '.txt';
        break;
      case 'application/msword':
        ext = '.doc';
        break;
      default:
        ext = value.slice(value.lastIndexOf('.'));
        break;
    }
    const reg = /[^A-Za-z0-9]/g;
    return (
      value.replace(reg, '').toLowerCase() +
      Math.floor(Math.random() * 100) +
      ext
    );
  }

  trimDocName(name: string) {
    name = name.slice(0, name.lastIndexOf('.')).trim();
    const fres = name.split(/\s/g);
    fres.forEach((part, i) => {
      fres[i] = part
        .toLowerCase()
        .replace(/[^A-Za-z0-9_]/g, '')
        .trim();
    });
    let reel = fres.join(' ').substring(0, 20);
    return reel;
  }

  getExt(value: string) {
    const reg = value
      .slice(value.lastIndexOf('.'))
      .replace(/[.]/, '')
      .toUpperCase();
    return reg;
  }

  goToTop() {
    window.scrollTo(0, 0);
  }

  filter(data) {
    const resultArray = Object.keys(data).map(index => {
      let person = data[index];
      return person;
    });

    resultArray.forEach(element => {
      delete element['approvalref'];
      delete element['categoryid'];
      delete element['companyid'];
      delete element['concessionid'];
      delete element['createdat'];
      delete element['currentdesk'];
      delete element['deletestatus'];
      delete element['deletedat'];
      delete element['deletedby'];
      delete element['id'];
      delete element['submitted'];
      delete element['updatedat'];

      delete element['companY_ID'];
      delete element['companyNumber'];
      delete element['companyName'];
      delete element['companyemail'];
      delete element['consession_Type'];
      delete element['contract_Type'];
      delete element['created_by'];
      delete element['date_Updated'];
      delete element['omL_ID'];
      delete element['omL_Name'];
      delete element['terrain'];
      delete element['updated_by'];
      delete element['year_of_WP'];
    });
    return resultArray;
  }


}
