// import {
//   ChangeDetectionStrategy,
//   ChangeDetectorRef,
//   Component,
//   OnInit,
// } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import {
//   budgetActualExpenditure,
//   developmentDrillingActivities,
//   exploratoryActivities,
//   facilitiesDevelopmentProject,
//   productionCost,
// } from 'src/app/models/step3-budget-performance.model';
// import {
//   AuthenticationService,
//   GenericService,
//   ModalService,
// } from 'src/app/services';
// import { WorkProgramService } from 'src/app/services/workprogram.service';

// @Component({
//   templateUrl: './budget-performance.component.html',
//   styleUrls: ['../board.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class SWPBudgetPerformanceComponent implements OnInit {
//   public genk.disableForm: boolean = false;

//   budgetActualExpenditureForm: FormGroup;
//   exploratoryActivitiesForm: FormGroup;
//   developmentDrillingForm: FormGroup;
//   facilitiesDevelopmentForm: FormGroup;
//   productionCostForm: FormGroup;
//   budgetBody: budgetActualExpenditure = {} as budgetActualExpenditure;
//   exploratoryBody: exploratoryActivities = {} as exploratoryActivities;
//   developmentDrillingBody: developmentDrillingActivities =
//     {} as developmentDrillingActivities;
//   facilitiesDevelopmentBody: facilitiesDevelopmentProject =
//     {} as facilitiesDevelopmentProject;
//   productionCostBody: productionCost = {} as productionCost;
//   wkpYear: string;
//   wkpYearList = [];
//   concessionHeld: string;
//   concessionHeldList = [];
//   genk: GenericService;
//   submitted = false;
//   columnHeader = [];
//   columnValue = [];
//   isTabVisible = false;

//   columnHeader_2 = [];
//   columnValue_2 = [];
//   isTabVisible_2 = false;
//   columnHeader_3 = [];
//   columnValue_3 = [];
//   isTabVisible_3 = false;
//   columnHeader_5 = [];
//   columnValue_5 = [];
//   isTabVisible_5 = false;
//   columnHeader_4 = [];
//   columnValue_4 = [];
//   isTabVisible_4 = false;
//   constructor(
//     private cd: ChangeDetectorRef,
//     private workprogram: WorkProgramService,
//     private auth: AuthenticationService,
//     private gen: GenericService,
//     private modalService: ModalService
//   ) {
//     this.genk = gen;
//     this.modalService.concessionSitu.subscribe((res) => {
//       this.getBudgetData();
//     });
//   }

//   getBudgetData() {
//     this.workprogram
//       .getFormThreeBudget(
//         this.genk.OmlName,
//         this.genk.wpYear,
//         this.genk.fieldName
//       )
//       .subscribe((res) => {
//         let budgetInfo = this.budgetBody as budgetActualExpenditure;
//         let exploratoryInfo = this.exploratoryBody as exploratoryActivities;
//         let developmentDrillingInfo = this
//           .developmentDrillingBody as developmentDrillingActivities;
//         let facilitiesDevelopmentInfo = this
//           .facilitiesDevelopmentBody as facilitiesDevelopmentProject;
//         let productionCostInfo = this.productionCostBody as productionCost;

//         if (
//           res.budgetActualExpenditure != null &&
//           res.budgetActualExpenditure.length > 0
//         ) {
//           budgetInfo = res
//             .budgetActualExpenditure[0] as budgetActualExpenditure;
//           this.loadTable_Budget(res.budgetActualExpenditure);
//         }
//         if (
//           res.budgetPerformanceExploratory != null &&
//           res.budgetPerformanceExploratory.length > 0
//         ) {
//           exploratoryInfo = res
//             .budgetPerformanceExploratory[0] as exploratoryActivities;
//           this.loadTable_Exploratory(res.budgetPerformanceExploratory);
//         }
//         if (
//           res.budgetPerformanceDevelopment != null &&
//           res.budgetPerformanceDevelopment.length > 0
//         ) {
//           developmentDrillingInfo = res
//             .budgetPerformanceDevelopment[0] as developmentDrillingActivities;
//           this.loadTable_Development(res.budgetPerformanceDevelopment);
//         }
//         if (
//           res.budgetPerformanceProductionCost != null &&
//           res.budgetPerformanceProductionCost.length > 0
//         ) {
//           productionCostInfo = res
//             .budgetPerformanceProductionCost[0] as productionCost;
//           this.loadTable_Production(res.budgetPerformanceProductionCost);
//         }
//         if (
//           res.budgetPerformanceFacilityDevProjects != null &&
//           res.budgetPerformanceFacilityDevProjects.length > 0
//         ) {
//           facilitiesDevelopmentInfo = res
//             .budgetPerformanceFacilityDevProjects[0] as facilitiesDevelopmentProject;
//           this.loadTable_Facility(res.budgetPerformanceFacilityDevProjects);
//         }

//         this.budgetBody = budgetInfo;
//         this.exploratoryBody = exploratoryInfo;
//         this.developmentDrillingBody = developmentDrillingInfo;
//         this.facilitiesDevelopmentBody = facilitiesDevelopmentInfo;
//         this.productionCostBody = productionCostInfo;
//       });
//   }

//   ngOnInit(): void {
//     this.genk.activeStep = 'STEP3';
//     this.budgetActualExpenditureForm = new FormGroup({
//       budget_for_Direct_Exploration_and_Production_Activities_NGN:
//         new FormControl(
//           this.budgetBody.budget_for_Direct_Exploration_and_Production_Activities_NGN,
//           Validators.required
//         ),
//       budget_for_Direct_Exploration_and_Production_Activities_USD:
//         new FormControl(
//           this.budgetBody.budget_for_Direct_Exploration_and_Production_Activities_USD,
//           Validators.required
//         ),
//       budget_for_other_Activities_NGN: new FormControl(
//         this.budgetBody.budget_for_other_Activities_NGN,
//         Validators.required
//       ),
//       budget_for_other_Activities_USD: new FormControl(
//         this.budgetBody.budget_for_other_Activities_USD,
//         Validators.required
//       ),
//       equivalent_Naira_and_Dollar_Component_NGN: new FormControl(
//         this.budgetBody.equivalent_Naira_and_Dollar_Component_NGN,
//         Validators.required
//       ),
//       equivalent_Naira_and_Dollar_Component_USD: new FormControl(
//         this.budgetBody.equivalent_Naira_and_Dollar_Component_USD,
//         Validators.required
//       ),
//     });
//     this.exploratoryActivitiesForm = new FormGroup({
//       aCQUISITION_planned: new FormControl(
//         this.exploratoryBody.acquisitioN_planned,
//         Validators.required
//       ),
//       aCQUISITION_Actual: new FormControl(
//         this.exploratoryBody.acquisitioN_Actual,
//         Validators.required
//       ),
//       pROCESSING_planned: new FormControl(
//         this.exploratoryBody.processinG_planned,
//         Validators.required
//       ),
//       pROCESSING_Actual: new FormControl(
//         this.exploratoryBody.processinG_Actual,
//         Validators.required
//       ),
//       rEPROCESSING_planned: new FormControl(
//         this.exploratoryBody.reprocessinG_planned,
//         Validators.required
//       ),
//       rEPROCESSING_Actual: new FormControl(
//         this.exploratoryBody.reprocessinG_Actual,
//         Validators.required
//       ),
//       eXPLORATION_planned: new FormControl(
//         this.exploratoryBody.exploratioN_planned,
//         Validators.required
//       ),
//       eXPLORATION_Actual: new FormControl(
//         this.exploratoryBody.exploratioN_Actual,
//         Validators.required
//       ),
//       aPPRAISAL_planned: new FormControl(
//         this.exploratoryBody.appraisaL_planned,
//         Validators.required
//       ),
//       aPPRAISAL_Actual: new FormControl(
//         this.exploratoryBody.appraisaL_Actual,
//         Validators.required
//       ),
//     });
//     this.developmentDrillingForm = new FormGroup({
//       dEVELOPMENT_planned: new FormControl(
//         this.developmentDrillingBody.developmenT_planned,
//         Validators.required
//       ),
//       dEVELOPMENT_Actual: new FormControl(
//         this.developmentDrillingBody.developmenT_Actual,
//         Validators.required
//       ),
//       wORKOVER_planned: new FormControl(
//         this.developmentDrillingBody.workoveR_planned,
//         Validators.required
//       ),
//       wORKOVER_Actual: new FormControl(
//         this.developmentDrillingBody.workoveR_Actual,
//         Validators.required
//       ),
//       cOMPLETION_planned: new FormControl(
//         this.developmentDrillingBody.completioN_planned,
//         Validators.required
//       ),
//       cOMPLETION_Actual: new FormControl(
//         this.developmentDrillingBody.completioN_Actual,
//         Validators.required
//       ),
//     });
//     this.facilitiesDevelopmentForm = new FormGroup({
//       concepT_planned: new FormControl(
//         this.facilitiesDevelopmentBody.concepT_planned,
//         Validators.required
//       ),
//       concepT_Actual: new FormControl(
//         this.facilitiesDevelopmentBody.concepT_Actual,
//         Validators.required
//       ),
//       feeD_planned: new FormControl(
//         this.facilitiesDevelopmentBody.feeD_planned,
//         Validators.required
//       ),
//       feeD_COST_Actual: new FormControl(
//         this.facilitiesDevelopmentBody.feeD_COST_Actual,
//         Validators.required
//       ),
//       detaileD_ENGINEERING_planned: new FormControl(
//         this.facilitiesDevelopmentBody.detaileD_ENGINEERING_planned,
//         Validators.required
//       ),
//       detaileD_ENGINEERING_Actual: new FormControl(
//         this.facilitiesDevelopmentBody.detaileD_ENGINEERING_Actual,
//         Validators.required
//       ),
//       procuremenT_planned: new FormControl(
//         this.facilitiesDevelopmentBody.procuremenT_planned,
//         Validators.required
//       ),
//       procuremenT_Actual: new FormControl(
//         this.facilitiesDevelopmentBody.procuremenT_Actual,
//         Validators.required
//       ),
//       constructioN_FABRICATION_planned: new FormControl(
//         this.facilitiesDevelopmentBody.constructioN_FABRICATION_planned,
//         Validators.required
//       ),
//       constructioN_FABRICATION_Actual: new FormControl(
//         this.facilitiesDevelopmentBody.constructioN_FABRICATION_Actual,
//         Validators.required
//       ),
//       installatioN_planned: new FormControl(
//         this.facilitiesDevelopmentBody.installatioN_planned,
//         Validators.required
//       ),
//       installatioN_Actual: new FormControl(
//         this.facilitiesDevelopmentBody.installatioN_Actual,
//         Validators.required
//       ),
//       upgradE_MAINTENANCE_planned: new FormControl(
//         this.facilitiesDevelopmentBody.upgradE_MAINTENANCE_planned,
//         Validators.required
//       ),
//       upgradE_MAINTENANCE_Actual: new FormControl(
//         this.facilitiesDevelopmentBody.upgradE_MAINTENANCE_Actual,
//         Validators.required
//       ),
//       decommissioninG_ABANDONMENT: new FormControl(
//         this.facilitiesDevelopmentBody.decommissioninG_ABANDONMENT,
//         Validators.required
//       ),
//     });
//     this.productionCostForm = new FormGroup({
//       direcT_COST_planned: new FormControl(
//         this.productionCostBody.direcT_COST_planned,
//         Validators.required
//       ),
//       direcT_COST_Actual: new FormControl(
//         this.productionCostBody.direcT_COST_Actual,
//         Validators.required
//       ),
//       indirecT_COST_planned: new FormControl(
//         this.productionCostBody.indirecT_COST_planned,
//         Validators.required
//       ),
//       indirecT_COST_Actual: new FormControl(
//         this.productionCostBody.indirecT_COST_Actual,
//         Validators.required
//       ),
//     });
//     this.getBudgetData();
//   }

//   loadTable_Budget(data) {
//     this.columnHeader = [];
//     this.columnValue = [];

//     let info = this.budgetBody as budgetActualExpenditure;

//     this.workprogram
//       .post_Budget(
//         info,
//         this.genk.wpYear,
//         this.genk.OmlName,
//         this.genk.fieldName,
//         data,
//         'DELETE'
//       )
//       .subscribe((res) => {
//         if (res.statusCode == 300) {
//           this.modalService.logNotice('Error', res.message, 'error');
//         } else {
//           this.loadTable_Budget(res.data);
//           this.modalService.logNotice('Success', res.message, 'success');
//         }
//       });
//   }

//   loadTable_Exploratory(data) {
//     this.columnHeader_2 = [];
//     this.columnValue_2 = [];

//     if (data != null) {
//       data = this.filter(data);
//       var result = Object.entries(data).reduce((acc, [key, value]) => {
//         acc[key] = value == null ? '' : value;
//         return acc;
//       }, {});

//       this.columnHeader_2.push(data[0]);
//       this.columnValue_2.push(result);
//     } else {
//       for (let item1 in this.exploratoryActivitiesForm.controls) {
//         if (item1 != 'comment') {
//           this.columnHeader_2.push(
//             this.genk.upperText(item1.replace(/_+/g, ' '))
//           );
//           this.columnValue_2.push(this.exploratoryBody[item1]);
//         }
//       }
//     }
//     this.isTabVisible_2 = true;
//     this.cd.markForCheck();
//   }

//   Delete_Exploratory(event) {
//     let info = this.exploratoryBody as exploratoryActivities;

//     this.workprogram
//       .post_Exploratory(
//         info,
//         this.genk.wpYear,
//         this.genk.OmlName,
//         this.genk.fieldName,
//         event.target.value,
//         'DELETE'
//       )
//       .subscribe((res) => {
//         if (res.statusCode == 300) {
//           this.modalService.logNotice('Error', res.message, 'error');
//         } else {
//           this.loadTable_Budget(res.data);
//           this.modalService.logNotice('Success', res.message, 'success');
//         }
//       });
//   }

//   loadTable_Development(data) {
//     this.columnHeader_3 = [];
//     this.columnValue_3 = [];

//     if (data != null) {
//       data = this.filter(data);
//       var result = Object.entries(data).reduce((acc, [key, value]) => {
//         acc[key] = value == null ? '' : value;
//         return acc;
//       }, {});

//       this.columnHeader_3.push(data[0]);
//       this.columnValue_3.push(result);
//     } else {
//       for (let item1 in this.developmentDrillingForm.controls) {
//         if (item1 != 'comment') {
//           this.columnHeader_3.push(
//             this.genk.upperText(item1.replace(/_+/g, ' '))
//           );
//           this.columnValue_3.push(this.developmentDrillingBody[item1]);
//         }
//       }
//     }
//     this.isTabVisible_3 = true;
//     this.cd.markForCheck();
//   }
//   Delete_Development(event) {
//     let info = this.developmentDrillingBody as developmentDrillingActivities;

//     this.workprogram
//       .post_Development(
//         info,
//         this.genk.wpYear,
//         this.genk.OmlName,
//         this.genk.fieldName,
//         event.target.value,
//         'DELETE'
//       )
//       .subscribe((res) => {
//         if (res.statusCode == 300) {
//           this.modalService.logNotice('Error', res.message, 'error');
//         } else {
//           this.loadTable_Development(res.data);
//           this.modalService.logNotice('Success', res.message, 'success');
//         }
//       });
//   }
//   loadTable_Facility(data) {
//     this.columnHeader_4 = [];
//     this.columnValue_4 = [];

//     if (data != null) {
//       data = this.filter(data);
//       var result = Object.entries(data).reduce((acc, [key, value]) => {
//         acc[key] = value == null ? '' : value;
//         return acc;
//       }, {});

//       this.columnHeader_4.push(data[0]);
//       this.columnValue_4.push(result);
//     } else {
//       for (let item1 in this.facilitiesDevelopmentForm.controls) {
//         if (item1 != 'comment') {
//           this.columnHeader_4.push(
//             this.genk.upperText(item1.replace(/_+/g, ' '))
//           );
//           this.columnValue_4.push(this.facilitiesDevelopmentBody[item1]);
//         }
//       }
//     }
//     this.isTabVisible_4 = true;
//     this.cd.markForCheck();
//   }
//   Delete_Facility(event) {
//     let info = this.facilitiesDevelopmentBody as facilitiesDevelopmentProject;

//     this.workprogram
//       .post_Facility(
//         info,
//         this.genk.wpYear,
//         this.genk.OmlName,
//         this.genk.fieldName,
//         event.target.value,
//         'DELETE'
//       )
//       .subscribe((res) => {
//         if (res.statusCode == 300) {
//           this.modalService.logNotice('Error', res.message, 'error');
//         } else {
//           this.loadTable_Facility(res.data);
//           this.modalService.logNotice('Success', res.message, 'success');
//         }
//       });
//   }

//   loadTable_Production(data) {
//     this.columnHeader_5 = [];
//     this.columnValue_5 = [];

//     if (data != null) {
//       data = this.filter(data);
//       var result = Object.entries(data).reduce((acc, [key, value]) => {
//         acc[key] = value == null ? '' : value;
//         return acc;
//       }, {});

//       this.columnHeader_5.push(data[0]);
//       this.columnValue_5.push(result);
//     } else {
//       for (let item1 in this.productionCostForm.controls) {
//         if (item1 != 'comment') {
//           this.columnHeader_5.push(
//             this.genk.upperText(item1.replace(/_+/g, ' '))
//           );
//           this.columnValue_5.push(this.productionCostBody[item1]);
//         }
//       }
//     }
//     this.isTabVisible_5 = true;
//     this.cd.markForCheck();
//   }

//   Delete_Production(event) {
//     let info = this.productionCostBody as productionCost;

//     this.workprogram
//       .post_Production(
//         info,
//         this.genk.wpYear,
//         this.genk.OmlName,
//         this.genk.fieldName,
//         event.target.value,
//         'DELETE'
//       )
//       .subscribe((res) => {
//         if (res.statusCode == 300) {
//           this.modalService.logNotice('Error', res.message, 'error');
//         } else {
//           this.loadTable_Production(res.data);
//           this.modalService.logNotice('Success', res.message, 'success');
//         }
//       });
//   }
//   filter(data) {
//     const resultArray = Object.keys(data).map((index) => {
//       let person = data[index];
//       return person;
//     });
//     resultArray.forEach((element) => {
//       delete element['companY_ID'];
//       delete element['companyNumber'];
//       delete element['companyName'];
//       delete element['companyemail'];
//       delete element['consession_Type'];
//       delete element['contract_Type'];
//       delete element['created_by'];
//       delete element['date_Updated'];
//       delete element['omL_ID'];
//       delete element['omL_Name'];
//       delete element['terrain'];
//       delete element['updated_by'];
//       delete element['year_of_WP'];
//     });
//     return resultArray;
//   }
//   saveBudgetActualExpenditure() {
//     let budgetInfo = {} as budgetActualExpenditure;
//     this.budgetBody.id = 0;
//     this.budgetBody.year_of_WP = this.genk.wpYear;
//     this.budgetBody.oML_Name = this.genk.OmlName;
//     for (let item in this.budgetBody) {
//       if (item != 'id' && item != 'field_ID') {
//         budgetInfo[this.genk.upperText(item)] =
//           this.budgetBody[item]?.toString() ?? '';
//       }
//     }
//     this.workprogram
//       .post_Budget(
//         budgetInfo,
//         this.genk.wpYear,
//         this.genk.OmlName,
//         this.genk.fieldName,
//         '',
//         ''
//       )
//       .subscribe((res) => {
//         if (res.statusCode == 300) {
//           this.modalService.logNotice('Error', res.message, 'error');
//         } else {
//           this.loadTable_Budget(res.data);
//           this.modalService.logNotice('Success', res.message, 'success');
//         }
//       });
//   }

//   // saveExploratory() {
//   //   let budgetInfo = {} as exploratoryActivities;
//   //   this.exploratoryBody.id = 0;
//   //   this.exploratoryBody.year_of_WP = this.genk.wpYear;
//   //   this.exploratoryBody.omL_Name = this.genk.OmlName;
//   //   for (let item in this.exploratoryBody) {
//   //     if (item != 'id' && item != 'field_ID') {
//   //       budgetInfo[this.genk.upperText(item)] = this.exploratoryBody[item]?.toString() ?? '';
//   //       if (data != null) {
//   //         data = this.filter(data);
//   //         var result = Object.entries(data).reduce((acc, [key, value]) => {
//   //           acc[key] = value == null ? '' : value;
//   //           return acc;
//   //         }, {});

//   //         this.columnHeader.push(data[0]);
//   //         this.columnValue.push(result);
//   //       } else {
//   //         for (let item1 in this.budgetActualExpenditureForm.controls) {
//   //           if (item1 != 'comment') {
//   //             this.columnHeader.push(
//   //               this.genk.upperText(item1.replace(/_+/g, ' '))
//   //             );
//   //             this.columnValue.push(this.budgetBody[item1]);
//   //           }
//   //         }

//   //         this.workprogram
//   //           .post_Exploratory(budgetInfo, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName, '', '')
//   //           .subscribe(res => {
//   //           }
//   //   this.isTabVisible = true;
//   //         this.cd.markForCheck();
//   //       }

//   Delete_Budget(event) {
//     let info = this.budgetBody as budgetActualExpenditure;

//     this.workprogram
//       .post_Budget(
//         info,
//         this.genk.wpYear,
//         this.genk.OmlName,
//         this.genk.fieldName,
//         event.target.value,
//         'DELETE'
//       )
//       .subscribe((res) => {
//         if (res.statusCode == 300) {
//           this.modalService.logNotice('Error', res.message, 'error');
//         } else {
//           this.loadTable_Budget(res.data);
//           this.modalService.logNotice('Success', res.message, 'success');
//         }
//       });
//   }

//   // loadTable_Exploratory(data) {
//   //   this.columnHeader_2 = [];
//   //   this.columnValue_2 = [];

//   //   if (data != null) {
//   //     data = this.filter(data);
//   //     var result = Object.entries(data).reduce((acc, [key, value]) => {
//   //       acc[key] = value == null ? '' : value;
//   //       return acc;
//   //     }, {});

//   //     this.columnHeader_2.push(data[0]);
//   //     this.columnValue_2.push(result);
//   //   } else {
//   //     for (let item1 in this.exploratoryActivitiesForm.controls) {
//   //       if (item1 != 'comment') {
//   //         this.columnHeader_2.push(
//   //           this.genk.upperText(item1.replace(/_+/g, ' '))
//   //         );
//   //         this.columnValue_2.push(this.exploratoryBody[item1]);
//   //       }
//   //     }
//   //     this.workprogram
//   //     .post_Development(budgetInfo, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName, '','')
//   //       .subscribe(res => {
//   //   }
//   //   this.isTabVisible_2 = true;
//   //   this.cd.markForCheck();
//   // }

//   // Delete_Exploratory(event) {
//   //   let info = this.exploratoryBody as exploratoryActivities;

//   //   this.workprogram
//   //     .post_Exploratory(info, this.genk.wpYear, event.target.value, 'DELETE')
//   //     .subscribe((res) => {
//   //       if (res.statusCode == 300) {
//   //         this.modalService.logNotice('Error', res.message, 'error');
//   //       } else {
//   //         this.loadTable_Budget(res.data);
//   //         this.modalService.logNotice('Success', res.message, 'success');
//   //       }
//   //     });
//   // }

//   // loadTable_Development(data) {
//   //   this.columnHeader_3 = [];
//   //   this.columnValue_3 = [];

//   //   if (data != null) {
//   //     data = this.filter(data);
//   //     var result = Object.entries(data).reduce((acc, [key, value]) => {
//   //       acc[key] = value == null ? '' : value;
//   //       return acc;
//   //     }, {});

//   //     this.columnHeader_3.push(data[0]);
//   //     this.columnValue_3.push(result);
//   //   } else {
//   //     for (let item1 in this.developmentDrillingForm.controls) {
//   //       if (item1 != 'comment') {
//   //         this.columnHeader_3.push(
//   //           this.genk.upperText(item1.replace(/_+/g, ' '))
//   //         );
//   //         this.columnValue_3.push(this.developmentDrillingBody[item1]);
//   //       }
//   //     }
//   //   }
//   //   this.isTabVisible_3 = true;
//   //   this.cd.markForCheck();
//   // }
//   // Delete_Development(event) {
//   //   let info = this.developmentDrillingBody as developmentDrillingActivities;

//   //   this.workprogram
//   //     .post_Development(info, this.genk.wpYear, event.target.value, 'DELETE')
//   //     .subscribe((res) => {
//   //       if (res.statusCode == 300) {
//   //         this.modalService.logNotice('Error', res.message, 'error');
//   //       } else {
//   //         this.loadTable_Development(res.data);
//   //         this.modalService.logNotice('Success', res.message, 'success');
//   //       }
//   //     });
//   // }
//   // loadTable_Facility(data) {
//   //   this.columnHeader_4 = [];
//   //   this.columnValue_4 = [];

//   //   if (data != null) {
//   //     data = this.filter(data);
//   //     var result = Object.entries(data).reduce((acc, [key, value]) => {
//   //       acc[key] = value == null ? '' : value;
//   //       return acc;
//   //     }, {});

//   //     this.columnHeader_4.push(data[0]);
//   //     this.columnValue_4.push(result);
//   //   } else {
//   //     for (let item1 in this.facilitiesDevelopmentForm.controls) {
//   //       if (item1 != 'comment') {
//   //         this.columnHeader_4.push(
//   //           this.genk.upperText(item1.replace(/_+/g, ' '))
//   //         );
//   //         this.columnValue_4.push(this.facilitiesDevelopmentBody[item1]);
//   //       }
//   //     }
//   //   }
//   //   this.isTabVisible_4 = true;
//   //   this.cd.markForCheck();
//   // }
//   // Delete_Facility(event) {
//   //   let info = this.facilitiesDevelopmentBody as facilitiesDevelopmentProject;

//   //   this.workprogram
//   //     .post_Facility(info, this.genk.wpYear, event.target.value, 'DELETE')
//   //     .subscribe((res) => {
//   //       if (res.statusCode == 300) {
//   //         this.modalService.logNotice('Error', res.message, 'error');
//   //       } else {
//   //         this.loadTable_Facility(res.data);
//   //         this.modalService.logNotice('Success', res.message, 'success');
//   //       }
//   //     });
//   // }

//   // loadTable_Production(data) {
//   //   this.columnHeader_5 = [];
//   //   this.columnValue_5 = [];

//   //   if (data != null) {
//   //     data = this.filter(data);
//   //     var result = Object.entries(data).reduce((acc, [key, value]) => {
//   //       acc[key] = value == null ? '' : value;
//   //       return acc;
//   //     }, {});

//   //     this.columnHeader_5.push(data[0]);
//   //     this.columnValue_5.push(result);
//   //   } else {
//   //     for (let item1 in this.productionCostForm.controls) {
//   //       if (item1 != 'comment') {
//   //         this.columnHeader_5.push(
//   //           this.genk.upperText(item1.replace(/_+/g, ' '))
//   //         );
//   //         this.columnValue_5.push(this.productionCostBody[item1]);
//   //       }
//   //     }
//   //   }
//   //   this.isTabVisible_5 = true;
//   //   this.cd.markForCheck();
//   // }
//   // Delete_Production(event) {
//   //   let info = this.productionCostBody as productionCost;

//   //   this.workprogram
//   //     .post_Production(info, this.genk.wpYear, event.target.value, 'DELETE')
//   //     .subscribe((res) => {
//   //       if (res.statusCode == 300) {
//   //         this.modalService.logNotice('Error', res.message, 'error');
//   //       } else {
//   //         this.loadTable_Production(res.data);
//   //         this.modalService.logNotice('Success', res.message, 'success');
//   //       }
//   //     });
//   // }
//   // filter(data) {
//   //   const resultArray = Object.keys(data).map((index) => {
//   //     let person = data[index];
//   //     return person;
//   //   });
//   //   resultArray.forEach((element) => {
//   //     delete element['companY_ID'];
//   //     delete element['companyNumber'];
//   //     delete element['companyName'];
//   //     delete element['companyemail'];
//   //     delete element['consession_Type'];
//   //     delete element['contract_Type'];
//   //     delete element['created_by'];
//   //     delete element['date_Updated'];
//   //     delete element['omL_ID'];
//   //     delete element['omL_Name'];
//   //     delete element['terrain'];
//   //     delete element['updated_by'];
//   //     delete element['year_of_WP'];
//   //   });
//   //   return resultArray;
//   // }
//   // saveBudgetActualExpenditure() {
//   //   let budgetInfo = {} as budgetActualExpenditure;
//   //   this.budgetBody.id = 0;
//   //   this.budgetBody.year_of_WP = this.genk.wpYear;
//   //   this.budgetBody.oML_Name = this.genk.OmlName;
//   //   for (let item in this.budgetBody) {
//   //     if (item != 'id' && item != 'field_ID') {
//   //       budgetInfo[this.genk.upperText(item)] =
//   //         this.budgetBody[item]?.toString() ?? '';
//   //     }
//   //   }
//   //   this.workprogram
//   //     .post_Budget(
//   //       budgetInfo,
//   //       this.genk.wpYear,
//   //       this.genk.OmlName,
//   //       this.genk.fieldName,
//   //       '',
//   //       ''
//   //     )
//   //     .subscribe((res) => {
//   //       if (res.statusCode == 300) {
//   //         this.modalService.logNotice('Error', res.message, 'error');
//   //       } else {
//   //         this.loadTable_Budget(res.data);
//   //         this.modalService.logNotice('Success', res.message, 'success');
//   //       }
//   //     });
//   // }

//   saveExploratory() {
//     let budgetInfo = {} as exploratoryActivities;
//     this.exploratoryBody.id = 0;
//     this.exploratoryBody.year_of_WP = this.genk.wpYear;
//     this.exploratoryBody.omL_Name = this.genk.OmlName;
//     for (let item in this.exploratoryBody) {
//       if (item != 'id' && item != 'field_ID') {
//         budgetInfo[this.genk.upperText(item)] =
//           this.exploratoryBody[item]?.toString() ?? '';
//       }
//     }
//     this.workprogram
//       .post_Exploratory(
//         budgetInfo,
//         this.genk.wpYear,
//         this.genk.OmlName,
//         this.genk.fieldName,
//         '',
//         ''
//       )
//       .subscribe((res) => {
//         if (res.statusCode == 300) {
//           this.modalService.logNotice('Error', res.message, 'error');
//         } else {
//           this.loadTable_Exploratory(res.data);
//           this.modalService.logNotice('Success', res.message, 'success');
//         }
//       });
//   }

//   saveDevelopmentDrilling() {
//     let budgetInfo = {} as developmentDrillingActivities;
//     this.developmentDrillingBody.id = 0;
//     this.developmentDrillingBody.year_of_WP = this.genk.wpYear;
//     this.developmentDrillingBody.omL_Name = this.genk.OmlName;
//     for (let item in this.developmentDrillingBody) {
//       if (item != 'id' && item != 'field_ID') {
//         budgetInfo[this.genk.upperText(item)] =
//           this.developmentDrillingBody[item]?.toString() ?? '';
//       }
//     }
//     this.workprogram
//       .post_Development(
//         budgetInfo,
//         this.genk.wpYear,
//         this.genk.OmlName,
//         this.genk.fieldName,
//         '',
//         ''
//       )
//       .subscribe((res) => {
//         if (res.statusCode == 300) {
//           this.modalService.logNotice('Error', res.message, 'error');
//         } else {
//           this.modalService.logNotice('Success', res.message, 'success');
//           this.loadTable_Development(res.data);
//         }
//       });
//   }

//   saveFacilitiesDevelopment() {
//     let budgetInfo = {} as facilitiesDevelopmentProject;
//     this.facilitiesDevelopmentBody.id = 0;
//     this.facilitiesDevelopmentBody.year_of_WP = this.genk.wpYear;
//     this.facilitiesDevelopmentBody.omL_Name = this.genk.OmlName;
//     for (let item in this.facilitiesDevelopmentBody) {
//       if (item != 'id' && item != 'field_ID') {
//         budgetInfo[this.genk.upperText(item)] =
//           this.facilitiesDevelopmentBody[item]?.toString() ?? '';
//       }
//     }
//     this.workprogram
//       .post_Facility(
//         budgetInfo,
//         this.genk.wpYear,
//         this.genk.OmlName,
//         this.genk.fieldName,
//         '',
//         ''
//       )
//       .subscribe((res) => {
//         if (res.statusCode == 300) {
//           this.modalService.logNotice('Error', res.message, 'error');
//         } else {
//           this.loadTable_Facility(res.data);
//           this.modalService.logNotice('Success', res.message, 'success');
//         }
//       });
//   }

//   saveProductionCost() {
//     let budgetInfo = {} as productionCost;
//     this.productionCostBody.id = 0;
//     this.productionCostBody.year_of_WP = this.genk.wpYear;
//     this.productionCostBody.omL_Name = this.genk.OmlName;
//     for (let item in this.productionCostBody) {
//       if (item != 'id' && item != 'field_ID') {
//         budgetInfo[this.genk.upperText(item)] =
//           this.productionCostBody[item]?.toString() ?? '';
//       }
//       this.workprogram
//         .post_Production(
//           budgetInfo,
//           this.genk.wpYear,
//           this.genk.OmlName,
//           this.genk.fieldName,
//           '',
//           ''
//         )
//         .subscribe((res) => {
//           if (res.statusCode == 300) {
//             this.modalService.logNotice('Error', res.message, 'error');
//           } else {
//             this.loadTable_Production(res.data);
//             this.modalService.logNotice('Success', res.message, 'success');
//           }
//         });
//     }
//   }

//   // onSubmit() {
//   //   return null;
//   // }
// }

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SBUTABLE } from 'src/app/constants/SBUTABLE';
import {
  budgetActualExpenditure,
  developmentDrillingActivities,
  exploratoryActivities,
  facilitiesDevelopmentProject,
  productionCost,
} from 'src/app/models/step3-budget-performance.model';
import {
  AuthenticationService,
  GenericService,
  IConcession,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  templateUrl: './budget-performance.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SWPBudgetPerformanceComponent implements OnInit {
  public SBUTABLE = SBUTABLE;

  budgetActualExpenditureForm: FormGroup;
  exploratoryActivitiesForm: FormGroup;
  developmentDrillingForm: FormGroup;
  facilitiesDevelopmentForm: FormGroup;
  productionCostForm: FormGroup;
  budgetBody: budgetActualExpenditure = {} as budgetActualExpenditure;
  exploratoryBody: exploratoryActivities = {} as exploratoryActivities;
  developmentDrillingBody: developmentDrillingActivities =
    {} as developmentDrillingActivities;
  facilitiesDevelopmentBody: facilitiesDevelopmentProject =
    {} as facilitiesDevelopmentProject;
  productionCostBody: productionCost = {} as productionCost;
  wkpYear: string;
  wkpYearList = [];
  concessionHeld: string;
  concessionHeldList = [];
  genk: GenericService;
  submitted = false;
  columnHeader = [];
  columnValue = [];
  isTabVisible = false;

  columnHeader_2 = [];
  columnValue_2 = [];
  isTabVisible_2 = false;
  columnHeader_3 = [];
  columnValue_3 = [];
  isTabVisible_3 = false;
  columnHeader_5 = [];
  columnValue_5 = [];
  isTabVisible_5 = false;
  columnHeader_4 = [];
  columnValue_4 = [];
  isTabVisible_4 = false;
  constructor(
    private cd: ChangeDetectorRef,
    private workprogram: WorkProgramService,
    private auth: AuthenticationService,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
  }

  getBudgetData() {
    this.workprogram
      .getFormThreeBudget(
        this.genk.OmlName,
        this.genk.wpYear,
        this.genk.fieldName
      )
      .subscribe((res) => {
        let budgetInfo = this.budgetBody as budgetActualExpenditure;
        let exploratoryInfo = this.exploratoryBody as exploratoryActivities;
        let developmentDrillingInfo = this
          .developmentDrillingBody as developmentDrillingActivities;
        let facilitiesDevelopmentInfo = this
          .facilitiesDevelopmentBody as facilitiesDevelopmentProject;
        let productionCostInfo = this.productionCostBody as productionCost;

        if (
          res.budgetActualExpenditure != null &&
          res.budgetActualExpenditure.length > 0
        ) {
          budgetInfo = res
            .budgetActualExpenditure[0] as budgetActualExpenditure;
          // this.loadTable_Budget(res.budgetActualExpenditure);
        }
        if (
          res.budgetPerformanceExploratory != null &&
          res.budgetPerformanceExploratory.length > 0
        ) {
          exploratoryInfo = res
            .budgetPerformanceExploratory[0] as exploratoryActivities;
          this.loadTable_Exploratory(res.budgetPerformanceExploratory);
        }
        if (
          res.budgetPerformanceDevelopment != null &&
          res.budgetPerformanceDevelopment.length > 0
        ) {
          developmentDrillingInfo = res
            .budgetPerformanceDevelopment[0] as developmentDrillingActivities;
          this.loadTable_Development(res.budgetPerformanceDevelopment);
        }
        if (
          res.budgetPerformanceProductionCost != null &&
          res.budgetPerformanceProductionCost.length > 0
        ) {
          productionCostInfo = res
            .budgetPerformanceProductionCost[0] as productionCost;
          this.loadTable_Production(res.budgetPerformanceProductionCost);
        }
        if (
          res.budgetPerformanceFacilityDevProjects != null &&
          res.budgetPerformanceFacilityDevProjects.length > 0
        ) {
          facilitiesDevelopmentInfo = res
            .budgetPerformanceFacilityDevProjects[0] as facilitiesDevelopmentProject;
          this.loadTable_Facility(res.budgetPerformanceFacilityDevProjects);
        }

        this.budgetBody = budgetInfo;
        this.exploratoryBody = exploratoryInfo;
        this.developmentDrillingBody = developmentDrillingInfo;
        this.facilitiesDevelopmentBody = facilitiesDevelopmentInfo;
        this.productionCostBody = productionCostInfo;
      });
  }

  ngOnInit(): void {
    this.genk.activeStep = 'STEP3';
    this.budgetActualExpenditureForm = new FormGroup({
      budget_for_Direct_Exploration_and_Production_Activities_NGN:
        new FormControl(
          this.budgetBody.budget_for_Direct_Exploration_and_Production_Activities_NGN,
          Validators.required
        ),
      budget_for_Direct_Exploration_and_Production_Activities_USD:
        new FormControl(
          this.budgetBody.budget_for_Direct_Exploration_and_Production_Activities_USD,
          Validators.required
        ),
      budget_for_other_Activities_NGN: new FormControl(
        this.budgetBody.budget_for_other_Activities_NGN,
        Validators.required
      ),
      budget_for_other_Activities_USD: new FormControl(
        this.budgetBody.budget_for_other_Activities_USD,
        Validators.required
      ),
      equivalent_Naira_and_Dollar_Component_NGN: new FormControl(
        this.budgetBody.equivalent_Naira_and_Dollar_Component_NGN,
        Validators.required
      ),
      equivalent_Naira_and_Dollar_Component_USD: new FormControl(
        this.budgetBody.equivalent_Naira_and_Dollar_Component_USD,
        Validators.required
      ),
    });
    this.exploratoryActivitiesForm = new FormGroup({
      aCQUISITION_planned: new FormControl(
        this.exploratoryBody.acquisitioN_planned,
        Validators.required
      ),
      aCQUISITION_Actual: new FormControl(
        this.exploratoryBody.acquisitioN_Actual,
        Validators.required
      ),
      pROCESSING_planned: new FormControl(
        this.exploratoryBody.processinG_planned,
        Validators.required
      ),
      pROCESSING_Actual: new FormControl(
        this.exploratoryBody.processinG_Actual,
        Validators.required
      ),
      rEPROCESSING_planned: new FormControl(
        this.exploratoryBody.reprocessinG_planned,
        Validators.required
      ),
      rEPROCESSING_Actual: new FormControl(
        this.exploratoryBody.reprocessinG_Actual,
        Validators.required
      ),
      eXPLORATION_planned: new FormControl(
        this.exploratoryBody.exploratioN_planned,
        Validators.required
      ),
      eXPLORATION_Actual: new FormControl(
        this.exploratoryBody.exploratioN_Actual,
        Validators.required
      ),
      aPPRAISAL_planned: new FormControl(
        this.exploratoryBody.appraisaL_planned,
        Validators.required
      ),
      aPPRAISAL_Actual: new FormControl(
        this.exploratoryBody.appraisaL_Actual,
        Validators.required
      ),
    });
    this.developmentDrillingForm = new FormGroup({
      dEVELOPMENT_planned: new FormControl(
        this.developmentDrillingBody.developmenT_planned,
        Validators.required
      ),
      dEVELOPMENT_Actual: new FormControl(
        this.developmentDrillingBody.developmenT_Actual,
        Validators.required
      ),
      wORKOVER_planned: new FormControl(
        this.developmentDrillingBody.workoveR_planned,
        Validators.required
      ),
      wORKOVER_Actual: new FormControl(
        this.developmentDrillingBody.workoveR_Actual,
        Validators.required
      ),
      cOMPLETION_planned: new FormControl(
        this.developmentDrillingBody.completioN_planned,
        Validators.required
      ),
      cOMPLETION_Actual: new FormControl(
        this.developmentDrillingBody.completioN_Actual,
        Validators.required
      ),
    });
    this.facilitiesDevelopmentForm = new FormGroup({
      concepT_planned: new FormControl(
        this.facilitiesDevelopmentBody.concepT_planned,
        Validators.required
      ),
      concepT_Actual: new FormControl(
        this.facilitiesDevelopmentBody.concepT_Actual,
        Validators.required
      ),
      feeD_planned: new FormControl(
        this.facilitiesDevelopmentBody.feeD_planned,
        Validators.required
      ),
      feeD_COST_Actual: new FormControl(
        this.facilitiesDevelopmentBody.feeD_COST_Actual,
        Validators.required
      ),
      detaileD_ENGINEERING_planned: new FormControl(
        this.facilitiesDevelopmentBody.detaileD_ENGINEERING_planned,
        Validators.required
      ),
      detaileD_ENGINEERING_Actual: new FormControl(
        this.facilitiesDevelopmentBody.detaileD_ENGINEERING_Actual,
        Validators.required
      ),
      procuremenT_planned: new FormControl(
        this.facilitiesDevelopmentBody.procuremenT_planned,
        Validators.required
      ),
      procuremenT_Actual: new FormControl(
        this.facilitiesDevelopmentBody.procuremenT_Actual,
        Validators.required
      ),
      constructioN_FABRICATION_planned: new FormControl(
        this.facilitiesDevelopmentBody.constructioN_FABRICATION_planned,
        Validators.required
      ),
      constructioN_FABRICATION_Actual: new FormControl(
        this.facilitiesDevelopmentBody.constructioN_FABRICATION_Actual,
        Validators.required
      ),
      installatioN_planned: new FormControl(
        this.facilitiesDevelopmentBody.installatioN_planned,
        Validators.required
      ),
      installatioN_Actual: new FormControl(
        this.facilitiesDevelopmentBody.installatioN_Actual,
        Validators.required
      ),
      upgradE_MAINTENANCE_planned: new FormControl(
        this.facilitiesDevelopmentBody.upgradE_MAINTENANCE_planned,
        Validators.required
      ),
      upgradE_MAINTENANCE_Actual: new FormControl(
        this.facilitiesDevelopmentBody.upgradE_MAINTENANCE_Actual,
        Validators.required
      ),
      decommissioninG_ABANDONMENT: new FormControl(
        this.facilitiesDevelopmentBody.decommissioninG_ABANDONMENT,
        Validators.required
      ),
    });
    this.productionCostForm = new FormGroup({
      direcT_COST_planned: new FormControl(
        this.productionCostBody.direcT_COST_planned,
        Validators.required
      ),
      direcT_COST_Actual: new FormControl(
        this.productionCostBody.direcT_COST_Actual,
        Validators.required
      ),
      indirecT_COST_planned: new FormControl(
        this.productionCostBody.indirecT_COST_planned,
        Validators.required
      ),
      indirecT_COST_Actual: new FormControl(
        this.productionCostBody.indirecT_COST_Actual,
        Validators.required
      ),
    });

    this.genk.Concession$.subscribe((con: IConcession) => {
      if (!con) {
        this.genk.disableForm = true;
        this.cd.markForCheck();
        return;
      }

      this.genk.disableForm =
        this.genk.Fields?.length > 0
          ? !this.genk.Field.isEditable
          : !con.isEditable;
      this.cd.markForCheck();
    });

    this.getBudgetData();
  }

  isEditable(group: string): boolean | null {
    if (group && this.genk.sbU_Tables?.find((t) => t == group)) {
      return null;
    }
    return this.genk.disableForm ? true : null;
  }

  loadTable_Budget(data) {
    this.columnHeader = [];
    this.columnValue = [];

    let info = this.budgetBody as budgetActualExpenditure;

    this.workprogram
      .post_Budget(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        data,
        'DELETE'
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Budget(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  loadTable_Exploratory(data) {
    this.columnHeader_2 = [];
    this.columnValue_2 = [];

    if (data != null) {
      data = this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.columnHeader_2.push(data[0]);
      this.columnValue_2.push(result);
    } else {
      for (let item1 in this.exploratoryActivitiesForm.controls) {
        if (item1 != 'comment') {
          this.columnHeader_2.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.columnValue_2.push(this.exploratoryBody[item1]);
        }
      }
    }
    this.isTabVisible_2 = true;
    this.cd.markForCheck();
  }

  Delete_Exploratory(event) {
    let info = this.exploratoryBody as exploratoryActivities;

    this.workprogram
      .post_Exploratory(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        event.target.value,
        'DELETE'
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Budget(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  loadTable_Development(data) {
    this.columnHeader_3 = [];
    this.columnValue_3 = [];

    if (data != null) {
      data = this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.columnHeader_3.push(data[0]);
      this.columnValue_3.push(result);
    } else {
      for (let item1 in this.developmentDrillingForm.controls) {
        if (item1 != 'comment') {
          this.columnHeader_3.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.columnValue_3.push(this.developmentDrillingBody[item1]);
        }
      }
    }
    this.isTabVisible_3 = true;
    this.cd.markForCheck();
  }
  Delete_Development(event) {
    let info = this.developmentDrillingBody as developmentDrillingActivities;

    this.workprogram
      .post_Development(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        event.target.value,
        'DELETE'
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Development(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }
  loadTable_Facility(data) {
    this.columnHeader_4 = [];
    this.columnValue_4 = [];

    if (data != null) {
      data = this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.columnHeader_4.push(data[0]);
      this.columnValue_4.push(result);
    } else {
      for (let item1 in this.facilitiesDevelopmentForm.controls) {
        if (item1 != 'comment') {
          this.columnHeader_4.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.columnValue_4.push(this.facilitiesDevelopmentBody[item1]);
        }
      }
    }
    this.isTabVisible_4 = true;
    this.cd.markForCheck();
  }
  Delete_Facility(event) {
    let info = this.facilitiesDevelopmentBody as facilitiesDevelopmentProject;

    this.workprogram
      .post_Facility(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        event.target.value,
        'DELETE'
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Facility(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  loadTable_Production(data) {
    this.columnHeader_5 = [];
    this.columnValue_5 = [];

    if (data != null) {
      data = this.filter(data);
      var result = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value;
        return acc;
      }, {});

      this.columnHeader_5.push(data[0]);
      this.columnValue_5.push(result);
    } else {
      for (let item1 in this.productionCostForm.controls) {
        if (item1 != 'comment') {
          this.columnHeader_5.push(
            this.genk.upperText(item1.replace(/_+/g, ' '))
          );
          this.columnValue_5.push(this.productionCostBody[item1]);
        }
      }
    }
    this.isTabVisible_5 = true;
    this.cd.markForCheck();
  }

  Delete_Production(event) {
    let info = this.productionCostBody as productionCost;

    this.workprogram
      .post_Production(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        event.target.value,
        'DELETE'
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Production(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }
  filter(data) {
    const resultArray = Object.keys(data).map((index) => {
      let person = data[index];
      return person;
    });
    resultArray.forEach((element) => {
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
  saveBudgetActualExpenditure() {
    let budgetInfo = {} as budgetActualExpenditure;
    this.budgetBody.id = 0;
    this.budgetBody.year_of_WP = this.genk.wpYear;
    this.budgetBody.oML_Name = this.genk.OmlName;
    for (let item in this.budgetBody) {
      if (item != 'id' && item != 'field_ID') {
        budgetInfo[this.genk.upperText(item)] =
          this.budgetBody[item]?.toString() ?? '';
      }
    }
    this.workprogram
      .post_Budget(
        budgetInfo,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Budget(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  // saveExploratory() {
  //   let budgetInfo = {} as exploratoryActivities;
  //   this.exploratoryBody.id = 0;
  //   this.exploratoryBody.year_of_WP = this.genk.wpYear;
  //   this.exploratoryBody.omL_Name = this.genk.OmlName;
  //   for (let item in this.exploratoryBody) {
  //     if (item != 'id' && item != 'field_ID') {
  //       budgetInfo[this.genk.upperText(item)] = this.exploratoryBody[item]?.toString() ?? '';
  //       if (data != null) {
  //         data = this.filter(data);
  //         var result = Object.entries(data).reduce((acc, [key, value]) => {
  //           acc[key] = value == null ? '' : value;
  //           return acc;
  //         }, {});

  //         this.columnHeader.push(data[0]);
  //         this.columnValue.push(result);
  //       } else {
  //         for (let item1 in this.budgetActualExpenditureForm.controls) {
  //           if (item1 != 'comment') {
  //             this.columnHeader.push(
  //               this.genk.upperText(item1.replace(/_+/g, ' '))
  //             );
  //             this.columnValue.push(this.budgetBody[item1]);
  //           }
  //         }

  //         this.workprogram
  //           .post_Exploratory(budgetInfo, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName, '', '')
  //           .subscribe(res => {
  //           }
  //   this.isTabVisible = true;
  //         this.cd.markForCheck();
  //       }

  Delete_Budget(event) {
    let info = this.budgetBody as budgetActualExpenditure;

    this.workprogram
      .post_Budget(
        info,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        event.target.value,
        'DELETE'
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Budget(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  // loadTable_Exploratory(data) {
  //   this.columnHeader_2 = [];
  //   this.columnValue_2 = [];

  //   if (data != null) {
  //     data = this.filter(data);
  //     var result = Object.entries(data).reduce((acc, [key, value]) => {
  //       acc[key] = value == null ? '' : value;
  //       return acc;
  //     }, {});

  //     this.columnHeader_2.push(data[0]);
  //     this.columnValue_2.push(result);
  //   } else {
  //     for (let item1 in this.exploratoryActivitiesForm.controls) {
  //       if (item1 != 'comment') {
  //         this.columnHeader_2.push(
  //           this.genk.upperText(item1.replace(/_+/g, ' '))
  //         );
  //         this.columnValue_2.push(this.exploratoryBody[item1]);
  //       }
  //     }
  //     this.workprogram
  //     .post_Development(budgetInfo, this.genk.wpYear, this.genk.OmlName, this.genk.fieldName, '','')
  //       .subscribe(res => {
  //   }
  //   this.isTabVisible_2 = true;
  //   this.cd.markForCheck();
  // }

  // Delete_Exploratory(event) {
  //   let info = this.exploratoryBody as exploratoryActivities;

  //   this.workprogram
  //     .post_Exploratory(info, this.genk.wpYear, event.target.value, 'DELETE')
  //     .subscribe((res) => {
  //       if (res.statusCode == 300) {
  //         this.modalService.logNotice('Error', res.message, 'error');
  //       } else {
  //         this.loadTable_Budget(res.data);
  //         this.modalService.logNotice('Success', res.message, 'success');
  //       }
  //     });
  // }

  // loadTable_Development(data) {
  //   this.columnHeader_3 = [];
  //   this.columnValue_3 = [];

  //   if (data != null) {
  //     data = this.filter(data);
  //     var result = Object.entries(data).reduce((acc, [key, value]) => {
  //       acc[key] = value == null ? '' : value;
  //       return acc;
  //     }, {});

  //     this.columnHeader_3.push(data[0]);
  //     this.columnValue_3.push(result);
  //   } else {
  //     for (let item1 in this.developmentDrillingForm.controls) {
  //       if (item1 != 'comment') {
  //         this.columnHeader_3.push(
  //           this.genk.upperText(item1.replace(/_+/g, ' '))
  //         );
  //         this.columnValue_3.push(this.developmentDrillingBody[item1]);
  //       }
  //     }
  //   }
  //   this.isTabVisible_3 = true;
  //   this.cd.markForCheck();
  // }
  // Delete_Development(event) {
  //   let info = this.developmentDrillingBody as developmentDrillingActivities;

  //   this.workprogram
  //     .post_Development(info, this.genk.wpYear, event.target.value, 'DELETE')
  //     .subscribe((res) => {
  //       if (res.statusCode == 300) {
  //         this.modalService.logNotice('Error', res.message, 'error');
  //       } else {
  //         this.loadTable_Development(res.data);
  //         this.modalService.logNotice('Success', res.message, 'success');
  //       }
  //     });
  // }
  // loadTable_Facility(data) {
  //   this.columnHeader_4 = [];
  //   this.columnValue_4 = [];

  //   if (data != null) {
  //     data = this.filter(data);
  //     var result = Object.entries(data).reduce((acc, [key, value]) => {
  //       acc[key] = value == null ? '' : value;
  //       return acc;
  //     }, {});

  //     this.columnHeader_4.push(data[0]);
  //     this.columnValue_4.push(result);
  //   } else {
  //     for (let item1 in this.facilitiesDevelopmentForm.controls) {
  //       if (item1 != 'comment') {
  //         this.columnHeader_4.push(
  //           this.genk.upperText(item1.replace(/_+/g, ' '))
  //         );
  //         this.columnValue_4.push(this.facilitiesDevelopmentBody[item1]);
  //       }
  //     }
  //   }
  //   this.isTabVisible_4 = true;
  //   this.cd.markForCheck();
  // }
  // Delete_Facility(event) {
  //   let info = this.facilitiesDevelopmentBody as facilitiesDevelopmentProject;

  //   this.workprogram
  //     .post_Facility(info, this.genk.wpYear, event.target.value, 'DELETE')
  //     .subscribe((res) => {
  //       if (res.statusCode == 300) {
  //         this.modalService.logNotice('Error', res.message, 'error');
  //       } else {
  //         this.loadTable_Facility(res.data);
  //         this.modalService.logNotice('Success', res.message, 'success');
  //       }
  //     });
  // }

  // loadTable_Production(data) {
  //   this.columnHeader_5 = [];
  //   this.columnValue_5 = [];

  //   if (data != null) {
  //     data = this.filter(data);
  //     var result = Object.entries(data).reduce((acc, [key, value]) => {
  //       acc[key] = value == null ? '' : value;
  //       return acc;
  //     }, {});

  //     this.columnHeader_5.push(data[0]);
  //     this.columnValue_5.push(result);
  //   } else {
  //     for (let item1 in this.productionCostForm.controls) {
  //       if (item1 != 'comment') {
  //         this.columnHeader_5.push(
  //           this.genk.upperText(item1.replace(/_+/g, ' '))
  //         );
  //         this.columnValue_5.push(this.productionCostBody[item1]);
  //       }
  //     }
  //   }
  //   this.isTabVisible_5 = true;
  //   this.cd.markForCheck();
  // }
  // Delete_Production(event) {
  //   let info = this.productionCostBody as productionCost;

  //   this.workprogram
  //     .post_Production(info, this.genk.wpYear, event.target.value, 'DELETE')
  //     .subscribe((res) => {
  //       if (res.statusCode == 300) {
  //         this.modalService.logNotice('Error', res.message, 'error');
  //       } else {
  //         this.loadTable_Production(res.data);
  //         this.modalService.logNotice('Success', res.message, 'success');
  //       }
  //     });
  // }
  // filter(data) {
  //   const resultArray = Object.keys(data).map((index) => {
  //     let person = data[index];
  //     return person;
  //   });
  //   resultArray.forEach((element) => {
  //     delete element['companY_ID'];
  //     delete element['companyNumber'];
  //     delete element['companyName'];
  //     delete element['companyemail'];
  //     delete element['consession_Type'];
  //     delete element['contract_Type'];
  //     delete element['created_by'];
  //     delete element['date_Updated'];
  //     delete element['omL_ID'];
  //     delete element['omL_Name'];
  //     delete element['terrain'];
  //     delete element['updated_by'];
  //     delete element['year_of_WP'];
  //   });
  //   return resultArray;
  // }
  // saveBudgetActualExpenditure() {
  //   let budgetInfo = {} as budgetActualExpenditure;
  //   this.budgetBody.id = 0;
  //   this.budgetBody.year_of_WP = this.genk.wpYear;
  //   this.budgetBody.oML_Name = this.genk.OmlName;
  //   for (let item in this.budgetBody) {
  //     if (item != 'id' && item != 'field_ID') {
  //       budgetInfo[this.genk.upperText(item)] =
  //         this.budgetBody[item]?.toString() ?? '';
  //     }
  //   }
  //   this.workprogram
  //     .post_Budget(
  //       budgetInfo,
  //       this.genk.wpYear,
  //       this.genk.OmlName,
  //       this.genk.fieldName,
  //       '',
  //       ''
  //     )
  //     .subscribe((res) => {
  //       if (res.statusCode == 300) {
  //         this.modalService.logNotice('Error', res.message, 'error');
  //       } else {
  //         this.loadTable_Budget(res.data);
  //         this.modalService.logNotice('Success', res.message, 'success');
  //       }
  //     });
  // }

  saveExploratory() {
    let budgetInfo = {} as exploratoryActivities;
    this.exploratoryBody.id = 0;
    this.exploratoryBody.year_of_WP = this.genk.wpYear;
    this.exploratoryBody.omL_Name = this.genk.OmlName;
    for (let item in this.exploratoryBody) {
      if (item != 'id' && item != 'field_ID') {
        budgetInfo[this.genk.upperText(item)] =
          this.exploratoryBody[item]?.toString() ?? '';
      }
    }
    this.workprogram
      .post_Exploratory(
        budgetInfo,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Exploratory(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  saveDevelopmentDrilling() {
    let budgetInfo = {} as developmentDrillingActivities;
    this.developmentDrillingBody.id = 0;
    this.developmentDrillingBody.year_of_WP = this.genk.wpYear;
    this.developmentDrillingBody.omL_Name = this.genk.OmlName;
    for (let item in this.developmentDrillingBody) {
      if (item != 'id' && item != 'field_ID') {
        budgetInfo[this.genk.upperText(item)] =
          this.developmentDrillingBody[item]?.toString() ?? '';
      }
    }
    this.workprogram
      .post_Development(
        budgetInfo,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.modalService.logNotice('Success', res.message, 'success');
          this.loadTable_Development(res.data);
        }
      });
  }

  saveFacilitiesDevelopment() {
    let budgetInfo = {} as facilitiesDevelopmentProject;
    this.facilitiesDevelopmentBody.id = 0;
    this.facilitiesDevelopmentBody.year_of_WP = this.genk.wpYear;
    this.facilitiesDevelopmentBody.omL_Name = this.genk.OmlName;
    for (let item in this.facilitiesDevelopmentBody) {
      if (item != 'id' && item != 'field_ID') {
        budgetInfo[this.genk.upperText(item)] =
          this.facilitiesDevelopmentBody[item]?.toString() ?? '';
      }
    }
    this.workprogram
      .post_Facility(
        budgetInfo,
        this.genk.wpYear,
        this.genk.OmlName,
        this.genk.fieldName,
        '',
        ''
      )
      .subscribe((res) => {
        if (res.statusCode == 300) {
          this.modalService.logNotice('Error', res.message, 'error');
        } else {
          this.loadTable_Facility(res.data);
          this.modalService.logNotice('Success', res.message, 'success');
        }
      });
  }

  saveProductionCost() {
    let budgetInfo = {} as productionCost;
    this.productionCostBody.id = 0;
    this.productionCostBody.year_of_WP = this.genk.wpYear;
    this.productionCostBody.omL_Name = this.genk.OmlName;
    for (let item in this.productionCostBody) {
      if (item != 'id' && item != 'field_ID') {
        budgetInfo[this.genk.upperText(item)] =
          this.productionCostBody[item]?.toString() ?? '';
      }
      this.workprogram
        .post_Production(
          budgetInfo,
          this.genk.wpYear,
          this.genk.OmlName,
          this.genk.fieldName,
          '',
          ''
        )
        .subscribe((res) => {
          if (res.statusCode == 300) {
            this.modalService.logNotice('Error', res.message, 'error');
          } else {
            this.loadTable_Production(res.data);
            this.modalService.logNotice('Success', res.message, 'success');
          }
        });
    }
  }

  // onSubmit() {
  //   return null;
  // }
}
