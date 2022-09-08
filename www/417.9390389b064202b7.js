"use strict";(self.webpackChunkworkprogram=self.webpackChunkworkprogram||[]).push([[417],{5417:(W,Z,c)=>{c.r(Z),c.d(Z,{PresentationScheduleModule:()=>V});var _=c(9808),b=c(5245),T=c(6074),e=c(5e3),u=c(2340),m=c(5625),g=c(4004),w=c(520),U=c(8540);let x=(()=>{class i{constructor(n,t){this.http=n,this.gen=t,this.num=2}getScribesYearList(){return this.http.get(`${u.N.apiUrl}/presentation/scribes_yearlist`).pipe((0,m.X)(this.num),(0,g.U)(n=>n))}getScribesAndChairmen(n){return this.http.get(`${u.N.apiUrl}/presentation/scribes_&_chairmen`,{params:{year:n}}).pipe((0,m.X)(this.num),(0,g.U)(t=>t))}getDivisionalScheduleList(){return this.http.get(`${u.N.apiUrl}/presentation/divisional_schedule_list`).pipe((0,m.X)(this.num),(0,g.U)(n=>n))}getDivisionalScheduleByYear(n){return this.http.get(`${u.N.apiUrl}/presentation/divisional_schedule_by_year`,{params:{year:n}}).pipe((0,m.X)(this.num),(0,g.U)(t=>t))}getDivisionalYearList(){return this.http.get(`${u.N.apiUrl}/presentation/divisional_yearlist`).pipe((0,m.X)(this.num),(0,g.U)(n=>n))}emailStatus(n,t){var a=parseInt(n);return this.http.post(`${u.N.apiUrl}/presentation/activate_deactivate_email`,"",{params:{compId:a,option:t}}).pipe((0,g.U)(o=>o))}getCompanyRep(n){var t=parseInt(n);return this.http.get(`${u.N.apiUrl}/presentation/get_company_rep`,{params:{id:t}}).pipe((0,m.X)(this.num),(0,g.U)(a=>(a.data=this.gen.lowerArray(a.data),a)))}getCompanyRepsList(){return this.http.get(`${u.N.apiUrl}/presentation/company_reps`).pipe((0,m.X)(this.num),(0,g.U)(n=>n))}updateCompanyRep(n,t){return this.http.post(`${u.N.apiUrl}/presentation/update_company_rep`,{representative:n.representative,representativE_EMAIL:n.representativE_EMAIL},{params:{compId:t}}).pipe((0,m.X)(this.num),(0,g.U)(a=>a))}}return i.\u0275fac=function(n){return new(n||i)(e.LFG(w.eN),e.LFG(U.M))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var A=c(1866),l=c(3075),f=c(7423);function M(i,s){if(1&i&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&i){const n=s.$implicit;e.s9C("value",n),e.xp6(1),e.Oqu(n)}}function N(i,s){if(1&i&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&i){const n=s.$implicit;e.Q6J("value",n.value),e.xp6(1),e.Oqu(n.text)}}function D(i,s){if(1&i&&(e.TgZ(0,"th"),e._uU(1),e.qZA()),2&i){const n=s.$implicit;e.xp6(1),e.hij(" ",n.header," ")}}function R(i,s){if(1&i&&(e.TgZ(0,"td"),e._uU(1),e.qZA()),2&i){const n=s.$implicit,t=e.oxw().$implicit;e.xp6(1),e.hij(" ",t[n.columnDef]," ")}}function q(i,s){if(1&i&&(e.TgZ(0,"tr"),e.YNc(1,R,2,1,"td",22),e.qZA()),2&i){const n=e.oxw();e.xp6(1),e.Q6J("ngForOf",n.columns)}}let O=(()=>{class i{constructor(n,t,a){this.presentationScheduleService=n,this.cd=t,this.gen=a,this.pagenum=0,this.selectedPage=1,this.arrayRows=[],this.year=[],this.columns=[{columnDef:"companyname",header:"COMPANY NAME"},{columnDef:"datE_TIME_TEXT",header:"DATE"},{columnDef:"wp_time",header:"TIME"},{columnDef:"representative",header:"REPRESENTATIVE"},{columnDef:"representativE_EMAIL",header:"REPRESENTATIVE EMAIL"},{columnDef:"year",header:"YEAR"}],this.genk=a,this.cdr=t,this.genk.sizePerPage=this.genk.sizeten}ngOnInit(){this.data=[],this.fetchAlldata(),this.yearList(),this.genk.sizePerPage=this.genk.sizeten}get pageIndex(){return(this.selectedPage-1)*this.genk.sizePerPage}assignPageNum(){this.pagenum=Math.ceil(this.data.length/this.genk.sizePerPage)}assignDataRows(){this.arrayRows=this.data.slice(this.pageIndex,this.pageIndex+this.genk.sizePerPage),this.cd.markForCheck()}fetchdata(n){this.presentationScheduleService.getDivisionalScheduleByYear(n.target.value).subscribe(a=>{this.data=a.data,this.assignDataRows(),this.assignPageNum(),this.cd.markForCheck()})}fetchAlldata(){this.presentationScheduleService.getDivisionalScheduleList().subscribe(n=>{this.data=n.data,this.assignDataRows(),this.assignPageNum(),this.cd.markForCheck()})}yearList(){this.presentationScheduleService.getDivisionalYearList().subscribe(n=>{this.year=n,this.cd.markForCheck()})}goNext(){this.selectedPage++,this.assignDataRows()}goPrev(){this.selectedPage--,this.assignDataRows()}firstPage(){this.selectedPage=1,this.assignDataRows()}lastPage(){this.selectedPage=this.pagenum,this.assignDataRows()}changePage(n){this.selectedPage=Number(n),this.assignDataRows()}resize(n){let t=n.target.value;"all"===t&&(t=this.pagenum*this.genk.sizePerPage),this.genk.sizePerPage=Number(t),this.assignDataRows(),this.assignPageNum(),this.cd.markForCheck()}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(x),e.Y36(e.sBO),e.Y36(A.MY))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-division"]],decls:62,vars:10,consts:[["id","info-block"],[1,"file-marker"],[1,"box-title"],[2,"margin","1% 1% 1% 1%"],[1,"row"],[2,"width","225px"],[2,"font-size","15px","font-weight","500","color","rgb(34, 56, 56)"],["id","time",1,"form-select",3,"change"],["selected","","disabled",""],[3,"value",4,"ngFor","ngForOf"],[2,"display","flex","justify-content","space-between","align-items","center","margin-bottom","5px","padding","0 20px 0 0"],["type","text","placeholder","Search Table",1,"search",3,"keyup"],["myInput",""],[2,"display","flex"],[1,"rebtn",3,"click"],[2,"font-size","20px"],[1,"rebtn",2,"margin","0 20px","background-color","teal",3,"click"],[1,"rebtn",2,"background-color","whitesmoke","color","darkslategrey","font-weight","500",3,"click"],[2,"overflow","hidden","overflow-x","auto","box-shadow","4px 4px 12px 2px rgb(0, 0, 0, 0.3)"],["divTable",""],["cellPadding","10","cellSpacing","15",1,"apptable"],["myTable",""],[4,"ngFor","ngForOf"],[2,"box-shadow","4px 4px 12px 2px rgb(0, 0, 0, 0.3)"],["myTbody",""],[2,"width","100%","display","flex","align-items","center","justify-content","end","margin","20px 0 10px 0","padding-right","30px"],["mat-mini-fab","",2,"background-color","grey",3,"disabled","click"],["mat-raised-button","",2,"margin","0 10px",3,"disabled","click"],[2,"font-weight","600","color","rgb(84, 92, 92)"],["type","text",2,"width","40px","padding","5px 0 5px 10px","border","solid 3px dodgerblue","border-radius","50px","outline","dodgerblue",3,"value","keyup","change"],["pageInput",""],["color","primary","mat-raised-button","",2,"margin","0 10px",3,"disabled","click"],["mat-mini-fab","","color","primary",3,"disabled","click"],[3,"value"]],template:function(n,t){if(1&n){const a=e.EpF();e.TgZ(0,"div",0)(1,"section",1)(2,"div")(3,"div",2),e._uU(4," Divisional Schedule "),e.qZA(),e.TgZ(5,"div",3)(6,"div")(7,"div",4)(8,"div",5)(9,"span",6),e._uU(10,"Year of upload"),e.qZA(),e.TgZ(11,"select",7),e.NdJ("change",function(r){return t.fetchdata(r)}),e.TgZ(12,"option",8),e._uU(13,"--Select Year-- "),e.qZA(),e.YNc(14,M,2,2,"option",9),e.qZA()()()(),e._UZ(15,"br"),e.qZA(),e.TgZ(16,"div",10)(17,"div")(18,"input",11,12),e.NdJ("keyup",function(){e.CHM(a);const r=e.MAs(19),p=e.MAs(44);return e.KtG(t.genk.searchTable(r,p))}),e.qZA()(),e.TgZ(20,"div",5)(21,"select",7),e.NdJ("change",function(r){return t.resize(r)}),e.YNc(22,N,2,2,"option",9),e.qZA()(),e.TgZ(23,"div",13)(24,"button",14),e.NdJ("click",function(){e.CHM(a);const r=e.MAs(39);return e.KtG(t.genk.printData(r))}),e.TgZ(25,"mat-icon",15),e._uU(26,"print"),e.qZA(),e._uU(27," Print "),e.qZA(),e.TgZ(28,"button",16),e.NdJ("click",function(){e.CHM(a);const r=e.MAs(39);return e.KtG(t.genk.tableToCSV(r))}),e.TgZ(29,"mat-icon",15),e._uU(30,"file_download"),e.qZA(),e._uU(31," Excel "),e.qZA(),e.TgZ(32,"button",17),e.NdJ("click",function(){e.CHM(a);const r=e.MAs(39);return e.KtG(t.genk.copyTable(r))}),e.TgZ(33,"mat-icon",15),e._uU(34,"content_copy"),e.qZA(),e._uU(35," Copy "),e.qZA()()(),e.TgZ(36,"div",18,19)(38,"table",20,21)(40,"thead")(41,"tr"),e.YNc(42,D,2,1,"th",22),e.qZA()(),e.TgZ(43,"tbody",23,24),e.YNc(45,q,2,1,"tr",22),e.qZA()()(),e.TgZ(46,"div",25)(47,"button",26),e.NdJ("click",function(){return t.firstPage()}),e.TgZ(48,"mat-icon"),e._uU(49,"keyboard_double_arrow_left"),e.qZA()(),e.TgZ(50,"button",27),e.NdJ("click",function(){return t.goPrev()}),e._uU(51,"Prev"),e.qZA(),e.TgZ(52,"div",28),e._uU(53,"Page "),e.TgZ(54,"input",29,30),e.NdJ("keyup",function(){e.CHM(a);const r=e.MAs(55);return t.genk.preventInput(r),e.KtG(t.cdr.markForCheck())})("change",function(){e.CHM(a);const r=e.MAs(55);return e.KtG(t.changePage(r.value))}),e.qZA(),e._uU(56),e.qZA(),e.TgZ(57,"button",31),e.NdJ("click",function(){return t.goNext()}),e._uU(58,"Next"),e.qZA(),e.TgZ(59,"button",32),e.NdJ("click",function(){return t.lastPage()}),e.TgZ(60,"mat-icon"),e._uU(61,"keyboard_double_arrow_right"),e.qZA()()()()()()}2&n&&(e.xp6(14),e.Q6J("ngForOf",t.year),e.xp6(8),e.Q6J("ngForOf",t.genk.entries),e.xp6(20),e.Q6J("ngForOf",t.columns),e.xp6(3),e.Q6J("ngForOf",t.arrayRows),e.xp6(2),e.Q6J("disabled",t.selectedPage<2),e.xp6(3),e.Q6J("disabled",t.selectedPage<2),e.xp6(4),e.Q6J("value",t.selectedPage),e.xp6(2),e.hij(" of ",t.pagenum,""),e.xp6(1),e.Q6J("disabled",t.selectedPage>=t.pagenum),e.xp6(2),e.Q6J("disabled",t.selectedPage>=t.pagenum))},dependencies:[_.sg,b.Hw,l.YN,l.Kr,f.lW],styles:[".apptable[_ngcontent-%COMP%]{font-family:Arial,Helvetica,sans-serif;width:100%;font-size:12px;text-align:center;border:none}.apptable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid rgb(238,235,235);text-shadow:.3px .3px .3px rgba(0,0,0,.3)}.apptable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(even){background-color:#f5f5f5}.apptable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:10px auto;background-color:teal;color:#f5f5f5;font-weight:600;border:1px solid white;box-shadow:2px 2px 4px #0000004d;text-shadow:2px 2px 4px rgba(0,0,0,.3)}.search[_ngcontent-%COMP%]{padding:7px 15px;border-radius:8px;border:solid 2px rgb(191,190,192)}.search[_ngcontent-%COMP%]:focus{outline:#679aaf;box-shadow:2px 2px 4px #15577a}.rebtn[_ngcontent-%COMP%]{display:flex;align-items:center;font-size:small;border:none;outline:none;background-color:#0b4da9;border-radius:10px;padding:5px 11px;color:#fff;box-shadow:2px 2px 4px #0000004d}#info-block[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{border:2px solid silver;border-radius:10px;margin:25px 10px 0 0}.file-marker[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{padding:0 15px;height:100%;width:100%;margin-top:-.8em}.box-title[_ngcontent-%COMP%]{background:white none repeat scroll 0 0;display:inline-block;margin-left:1em;font-size:22px;font-weight:500;color:#09682d;text-shadow:2px 2px 4px rgba(0,0,0,.3)}"]}),i})();function P(i,s,n,t,a,o,r){try{var p=i[o](r),d=p.value}catch(k){return void n(k)}p.done?s(d):Promise.resolve(d).then(t,a)}var F=c(5226),E=c.n(F),h=c(2349),v=c(7322),y=c(7531),S=c(4107),Y=c(508);function I(i,s){if(1&i&&(e.TgZ(0,"mat-option",16),e._uU(1),e.qZA()),2&i){const n=s.$implicit;e.Q6J("value",n.id),e.xp6(1),e.hij(" ",n.diV_REP_NAME,"")}}let z=(()=>{class i{constructor(n,t,a,o,r){this.pss=n,this.cd=t,this.dialogRef=a,this.fb=o,this.data=r,this.companyRepsList=[],this.repsForm=this.initForm(),this.getCompanyRepsList(),this.id=r.id}ngOnInit(){}get f(){return this.repsForm.controls}getCompanyRepsList(){this.pss.getCompanyRepsList().subscribe(n=>{this.companyRepsList=n,this.cd.markForCheck()})}getCompanyRep(n){this.pss.getCompanyRep(n).subscribe(t=>{this.companyRep=t.data,this.cd.markForCheck()})}initForm(){return this.fb.group({id:[""],representative:["test",l.kI.required],division:[{value:"",disabled:!0}],representativE_EMAIL:[{value:"",disabled:!0},l.kI.required]})}onSubmit(){this.pss.updateCompanyRep(this.repsForm.getRawValue(),this.id).subscribe(n=>{console.log(n)})}onNoClick(){return null}submit(){}setCompanyRep(n){const t=n.value;var a=this.companyRepsList.filter(function(o){return o.id==t});this.repsForm.patchValue({representative:a[0].diV_REP_NAME,division:a[0].division,representativE_EMAIL:a[0].diV_REP_EMAIL})}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(x),e.Y36(e.sBO),e.Y36(h.so),e.Y36(l.qu),e.Y36(h.WI))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-update-reps"]],decls:47,vars:5,consts:[[1,""],["mat-icon-button","","aria-label","Close dialog",3,"click"],["mat-dialog-content",""],[1,"m-4",3,"formGroup","ngSubmit"],[1,"row"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],["appearance","fill",1,"example-full-width"],["formControlName","id",3,"selectionChange"],["disabled","disabled"],[3,"value",4,"ngFor","ngForOf"],["matSuffix",""],["matInput","","formControlName","division","required",""],["matInput","","formControlName","representativE_EMAIL"],["align","end",1,"example-button-row"],["mat-raised-button","","color","primary",2,"margin-right","20px",3,"type","disabled","mat-dialog-close","click"],["mat-raised-button","","color","warn","tabindex","-1",3,"click"],[3,"value"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"div",0)(2,"div",0)(3,"div",0)(4,"div",0)(5,"div",0)(6,"h2"),e._uU(7,"Update Divisional Representative"),e.qZA()()()()(),e.TgZ(8,"button",1),e.NdJ("click",function(){return t.dialogRef.close()}),e.TgZ(9,"mat-icon"),e._uU(10,"close"),e.qZA()()(),e.TgZ(11,"div",2)(12,"form",3),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(13,"div",4)(14,"div",5)(15,"mat-form-field",6)(16,"mat-label"),e._uU(17,"Name Of Divisional Rep "),e.qZA(),e.TgZ(18,"mat-select",7),e.NdJ("selectionChange",function(o){return t.setCompanyRep(o)}),e.TgZ(19,"mat-option",8),e._uU(20,"--Please Select Name--"),e.qZA(),e.YNc(21,I,2,2,"mat-option",9),e.qZA(),e.TgZ(22,"mat-icon",10),e._uU(23,"face"),e.qZA()()()(),e.TgZ(24,"div",4)(25,"div",5)(26,"mat-form-field",6)(27,"mat-label"),e._uU(28,"Division of Representative"),e.qZA(),e._UZ(29,"input",11),e.TgZ(30,"mat-icon",10),e._uU(31,"location_on"),e.qZA()()()(),e.TgZ(32,"div",4)(33,"div",5)(34,"mat-form-field",6)(35,"mat-label"),e._uU(36,"Email Of DIvisional Representative"),e.qZA(),e._UZ(37,"input",12),e.TgZ(38,"mat-icon",10),e._uU(39,"email"),e.qZA()()()(),e.TgZ(40,"div",4)(41,"div",5)(42,"div",13)(43,"button",14),e.NdJ("click",function(){return t.onSubmit()}),e._uU(44,"Update Divisional Rep"),e.qZA(),e.TgZ(45,"button",15),e.NdJ("click",function(){return t.onNoClick()}),e._uU(46,"Cancel"),e.qZA()()()()()()()),2&n&&(e.xp6(12),e.Q6J("formGroup",t.repsForm),e.xp6(9),e.Q6J("ngForOf",t.companyRepsList),e.xp6(22),e.Q6J("type",t.submit)("disabled",!t.repsForm.valid)("mat-dialog-close",1))},dependencies:[_.sg,b.Hw,l._Y,l.Fj,l.JJ,l.JL,l.Q7,l.sg,l.u,v.KE,v.hX,v.R9,y.Nt,h.ZT,h.xY,S.gD,Y.ey,f.lW],changeDetection:0}),i})();function L(i,s){if(1&i&&(e.TgZ(0,"option",36),e._uU(1),e.qZA()),2&i){const n=s.$implicit;e.s9C("value",n),e.xp6(1),e.Oqu(n)}}function Q(i,s){if(1&i&&(e.TgZ(0,"option",36),e._uU(1),e.qZA()),2&i){const n=s.$implicit;e.s9C("value",n),e.xp6(1),e.Oqu(n)}}function G(i,s){if(1&i&&(e.TgZ(0,"option",36),e._uU(1),e.qZA()),2&i){const n=s.$implicit;e.Q6J("value",n.value),e.xp6(1),e.Oqu(n.text)}}function H(i,s){if(1&i&&(e.TgZ(0,"th"),e._uU(1),e.qZA()),2&i){const n=s.$implicit;e.xp6(1),e.hij(" ",n.header," ")}}function K(i,s){if(1&i&&(e.TgZ(0,"td"),e._uU(1),e.qZA()),2&i){const n=s.$implicit,t=e.oxw().$implicit;e.xp6(1),e.hij(" ",t[n.columnDef]," ")}}function X(i,s){if(1&i){const n=e.EpF();e.TgZ(0,"tr")(1,"td")(2,"input",37),e.NdJ("change",function(a){e.CHM(n);const o=e.oxw();return e.KtG(o.onCheckboxChange(a))}),e.qZA()(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td")(6,"button",38),e.NdJ("click",function(a){e.CHM(n);const o=e.oxw();return e.KtG(o.updateRep(a))}),e._uU(7,"Div Reps Schedule"),e.qZA()(),e.TgZ(8,"td")(9,"button",39),e._uU(10,"Upload MOM"),e.qZA()(),e.TgZ(11,"td")(12,"button",40),e._uU(13,"Action Schedule"),e.qZA()(),e.YNc(14,K,2,1,"td",25),e.qZA()}if(2&i){const n=s.$implicit,t=e.oxw();e.xp6(2),e.s9C("value",n.id),e.xp6(2),e.Oqu(n.emaiL_REMARK),e.xp6(2),e.s9C("value",n.id),e.xp6(8),e.Q6J("ngForOf",t.columns)}}const B=[{path:"scribes",component:(()=>{class i{constructor(n,t,a,o){this.presentationService=n,this.cd=t,this.gen=a,this.dialog=o,this.pagenum=0,this.selectedPage=1,this.arrayRows=[],this.year=[],this.currentSelectedYear="",this.emailStat=["Active","Inactive"],this.selected=!1,this.checkboxData=[],this.columns=[{columnDef:"companyname",header:"Company Name"},{columnDef:"meetingroom",header:"Meeting Room"},{columnDef:"chairperson",header:"Chair Person"},{columnDef:"scribe",header:"Scribe"},{columnDef:"status",header:"Status"},{columnDef:"presented",header:"Categories of Presentation"},{columnDef:"datE_TIME_TEXT",header:"Presentation Date"},{columnDef:"wp_time",header:"Time"},{columnDef:"submitted",header:"Completed"},{columnDef:"mom",header:"MOM"},{columnDef:"year",header:"YEAR"}],this.genk=a,this.cdr=t,this.genk.sizePerPage=this.genk.sizeten}ngOnInit(){this.data=[],this.yearList(),this.genk.sizePerPage=this.genk.sizeten}get pageIndex(){return(this.selectedPage-1)*this.genk.sizePerPage}assignPageNum(){this.pagenum=Math.ceil(this.data.length/this.genk.sizePerPage)}assignDataRows(){this.arrayRows=this.data.slice(this.pageIndex,this.pageIndex+this.genk.sizePerPage),this.cd.markForCheck()}fetchdata(n){let t=n.target.value;this.currentSelectedYear=t,this.presentationService.getScribesAndChairmen(t).subscribe(a=>{this.data=a.data,this.assignDataRows(),this.assignPageNum(),this.cd.markForCheck()})}reFetchdata(n){let t=n;this.currentSelectedYear=t,this.presentationService.getScribesAndChairmen(t).subscribe(a=>{this.data=a.data,this.assignDataRows(),this.assignPageNum(),this.cd.markForCheck()})}yearList(){this.presentationService.getScribesYearList().subscribe(n=>{this.year=n,this.cd.markForCheck()})}goNext(){this.selectedPage++,this.assignDataRows()}goPrev(){this.selectedPage--,this.assignDataRows()}firstPage(){this.selectedPage=1,this.assignDataRows()}lastPage(){this.selectedPage=this.pagenum,this.assignDataRows()}changePage(n){this.selectedPage=Number(n),this.assignDataRows()}resize(n){let t=n.target.value;"all"===t&&(t=this.pagenum*this.genk.sizePerPage),this.genk.sizePerPage=Number(t),this.assignDataRows(),this.assignPageNum(),this.cd.markForCheck()}checkbox(n){}checkAllCheckBox(n){n.target.checked?$(".check").prop("checked",!0):$(".check").prop("checked",!1)}onCheckboxChange(n){if(n.target.checked)this.checkboxData.push(n.target.value);else{const t=this.checkboxData.findIndex(a=>a.value===n.target.value);this.checkboxData.splice(t)}}setEmailStatus(n){var t=this;return function J(i){return function(){var s=this,n=arguments;return new Promise(function(t,a){var o=i.apply(s,n);function r(d){P(o,t,a,r,p,"next",d)}function p(d){P(o,t,a,r,p,"throw",d)}r(void 0)})}}(function*(){var a=0,o=0,r="",p=t.checkboxData.length;for(let d=0;d<p;d++)a=0,o=0,yield t.presentationService.emailStatus(t.checkboxData[d],n.target.value).subscribe(k=>{200==k.statusCode?a++:o++;var C;C=a>0&&0==o?"success":a>0&&o>0?"warning":"error",r=a+" records have been updated successfully. "+o+" records failed",t.reFetchdata(t.currentSelectedYear),t.Alert("Update Information",r,C),t.checkboxData=[]})})()}setEmailStat(n){this.emailStatValue=n.target.value}Alert(n,t,a){E().fire({title:n,text:t,icon:a,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Okay"})}updateRep(n){this.dialog.open(z,{height:"600px",width:"400px",data:{id:n.target.value}})}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(x),e.Y36(e.sBO),e.Y36(A.MY),e.Y36(h.uw))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-scribes-and-chairmen"]],decls:85,vars:12,consts:[["id","info-block"],[1,"file-marker"],[1,"box-title"],[2,"margin","1% 1% 1% 1%"],[1,"row"],[2,"width","225px"],[2,"font-size","15px","font-weight","500","color","rgb(34, 56, 56)"],["id","time",1,"form-select",3,"change"],["selected","","disabled",""],[3,"value",4,"ngFor","ngForOf"],["id","emailStat",1,"form-select",3,"change"],[1,"btn","btn-primary","btn-sm","mt-2",3,"value","click"],[2,"display","flex","justify-content","space-between","align-items","center","margin-bottom","5px","padding","0 20px 0 0"],["type","text","placeholder","Search Table",1,"search",3,"keyup"],["myInput",""],[2,"display","flex"],[1,"rebtn",3,"click"],[2,"font-size","20px"],[1,"rebtn",2,"margin","0 20px","background-color","teal",3,"click"],[1,"rebtn",2,"background-color","whitesmoke","color","darkslategrey","font-weight","500",3,"click"],[2,"overflow","hidden","overflow-x","auto","box-shadow","4px 4px 12px 2px rgb(0, 0, 0, 0.3)"],["divTable",""],["cellPadding","10","cellSpacing","15",1,"apptable"],["myTable",""],["type","checkbox",2,"display","none",3,"change"],[4,"ngFor","ngForOf"],[2,"box-shadow","4px 4px 12px 2px rgb(0, 0, 0, 0.3)"],["myTbody",""],[2,"width","100%","display","flex","align-items","center","justify-content","end","margin","20px 0 10px 0","padding-right","30px"],["mat-mini-fab","",2,"background-color","grey",3,"disabled","click"],["mat-raised-button","",2,"margin","0 10px",3,"disabled","click"],[2,"font-weight","600","color","rgb(84, 92, 92)"],["type","text",2,"width","40px","padding","5px 0 5px 10px","border","solid 3px dodgerblue","border-radius","50px","outline","dodgerblue",3,"value","keyup","change"],["pageInput",""],["color","primary","mat-raised-button","",2,"margin","0 10px",3,"disabled","click"],["mat-mini-fab","","color","primary",3,"disabled","click"],[3,"value"],["type","checkbox","name","check",1,"check",3,"value","change"],[1,"btn","btn-warning","btn-sm",3,"value","click"],[1,"btn","btn-primary","btn-sm"],[1,"btn","btn-success","btn-sm"]],template:function(n,t){if(1&n){const a=e.EpF();e.TgZ(0,"div",0)(1,"section",1)(2,"div")(3,"div",2),e._uU(4," Work Programme Schedule "),e.qZA(),e.TgZ(5,"div",3)(6,"div")(7,"div",4)(8,"div",5)(9,"span",6),e._uU(10,"Year of upload"),e.qZA(),e.TgZ(11,"select",7),e.NdJ("change",function(r){return t.fetchdata(r)}),e.TgZ(12,"option",8),e._uU(13,"--Select Year-- "),e.qZA(),e.YNc(14,L,2,2,"option",9),e.qZA()()()(),e._UZ(15,"br"),e.qZA(),e.TgZ(16,"div",3)(17,"div")(18,"div",4)(19,"div",5)(20,"span",6),e._uU(21,"Year of upload"),e.qZA(),e.TgZ(22,"select",10),e.NdJ("change",function(r){return t.setEmailStat(r)}),e.TgZ(23,"option",8),e._uU(24,"--Set Email Status -- "),e.qZA(),e.YNc(25,Q,2,2,"option",9),e.qZA(),e.TgZ(26,"button",11),e.NdJ("click",function(r){return t.setEmailStatus(r)}),e._uU(27,"Submit"),e.qZA()()()(),e._UZ(28,"br"),e.qZA(),e.TgZ(29,"div",12)(30,"div")(31,"input",13,14),e.NdJ("keyup",function(){e.CHM(a);const r=e.MAs(32),p=e.MAs(67);return e.KtG(t.genk.searchTable(r,p))}),e.qZA()(),e.TgZ(33,"div",5)(34,"select",7),e.NdJ("change",function(r){return t.resize(r)}),e.YNc(35,G,2,2,"option",9),e.qZA()(),e.TgZ(36,"div",15)(37,"button",16),e.NdJ("click",function(){e.CHM(a);const r=e.MAs(52);return e.KtG(t.genk.printData(r))}),e.TgZ(38,"mat-icon",17),e._uU(39,"print"),e.qZA(),e._uU(40," Print "),e.qZA(),e.TgZ(41,"button",18),e.NdJ("click",function(){e.CHM(a);const r=e.MAs(52);return e.KtG(t.genk.tableToCSV(r))}),e.TgZ(42,"mat-icon",17),e._uU(43,"file_download"),e.qZA(),e._uU(44," Excel "),e.qZA(),e.TgZ(45,"button",19),e.NdJ("click",function(){e.CHM(a);const r=e.MAs(52);return e.KtG(t.genk.copyTable(r))}),e.TgZ(46,"mat-icon",17),e._uU(47,"content_copy"),e.qZA(),e._uU(48," Copy "),e.qZA()()(),e.TgZ(49,"div",20,21)(51,"table",22,23)(53,"thead")(54,"tr")(55,"th")(56,"input",24),e.NdJ("change",function(r){return t.checkAllCheckBox(r)}),e.qZA()(),e.TgZ(57,"th"),e._uU(58,"Email Status"),e.qZA(),e.TgZ(59,"th"),e._uU(60,"Div Rep"),e.qZA(),e.TgZ(61,"th"),e._uU(62,"Upload MOM"),e.qZA(),e.TgZ(63,"th"),e._uU(64,"Update"),e.qZA(),e.YNc(65,H,2,1,"th",25),e.qZA()(),e.TgZ(66,"tbody",26,27),e.YNc(68,X,15,4,"tr",25),e.qZA()()(),e.TgZ(69,"div",28)(70,"button",29),e.NdJ("click",function(){return t.firstPage()}),e.TgZ(71,"mat-icon"),e._uU(72,"keyboard_double_arrow_left"),e.qZA()(),e.TgZ(73,"button",30),e.NdJ("click",function(){return t.goPrev()}),e._uU(74,"Prev"),e.qZA(),e.TgZ(75,"div",31),e._uU(76,"Page "),e.TgZ(77,"input",32,33),e.NdJ("keyup",function(){e.CHM(a);const r=e.MAs(78);return t.genk.preventInput(r),e.KtG(t.cdr.markForCheck())})("change",function(){e.CHM(a);const r=e.MAs(78);return e.KtG(t.changePage(r.value))}),e.qZA(),e._uU(79),e.qZA(),e.TgZ(80,"button",34),e.NdJ("click",function(){return t.goNext()}),e._uU(81,"Next"),e.qZA(),e.TgZ(82,"button",35),e.NdJ("click",function(){return t.lastPage()}),e.TgZ(83,"mat-icon"),e._uU(84,"keyboard_double_arrow_right"),e.qZA()()()()()()}2&n&&(e.xp6(14),e.Q6J("ngForOf",t.year),e.xp6(11),e.Q6J("ngForOf",t.emailStat),e.xp6(1),e.s9C("value",t.emailStatValue),e.xp6(9),e.Q6J("ngForOf",t.genk.entries),e.xp6(30),e.Q6J("ngForOf",t.columns),e.xp6(3),e.Q6J("ngForOf",t.arrayRows),e.xp6(2),e.Q6J("disabled",t.selectedPage<2),e.xp6(3),e.Q6J("disabled",t.selectedPage<2),e.xp6(4),e.Q6J("value",t.selectedPage),e.xp6(2),e.hij(" of ",t.pagenum,""),e.xp6(1),e.Q6J("disabled",t.selectedPage>=t.pagenum),e.xp6(2),e.Q6J("disabled",t.selectedPage>=t.pagenum))},dependencies:[_.sg,b.Hw,l.YN,l.Kr,f.lW],styles:[".apptable[_ngcontent-%COMP%]{font-family:Arial,Helvetica,sans-serif;width:100%;font-size:12px;text-align:center;border:none}.apptable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid rgb(238,235,235);text-shadow:.3px .3px .3px rgba(0,0,0,.3)}.apptable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(even){background-color:#f5f5f5}.apptable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{min-width:100px;padding:10px auto;background-color:teal;color:#f5f5f5;font-weight:600;border:1px solid white;box-shadow:2px 2px 4px #0000004d;text-shadow:2px 2px 4px rgba(0,0,0,.3)}.search[_ngcontent-%COMP%]{padding:7px 15px;border-radius:8px;border:solid 2px rgb(191,190,192)}.search[_ngcontent-%COMP%]:focus{outline:#679aaf;box-shadow:2px 2px 4px #15577a}.rebtn[_ngcontent-%COMP%]{display:flex;align-items:center;font-size:small;border:none;outline:none;background-color:#0b4da9;border-radius:10px;padding:5px 11px;color:#fff;box-shadow:2px 2px 4px #0000004d}#info-block[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{border:2px solid silver;border-radius:10px;margin:25px 10px 0 0}.file-marker[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{padding:0 15px;height:100%;width:100%;margin-top:-.8em}.box-title[_ngcontent-%COMP%]{background:white none repeat scroll 0 0;display:inline-block;margin-left:1em;font-size:22px;font-weight:500;color:#09682d;text-shadow:2px 2px 4px rgba(0,0,0,.3)}td[_ngcontent-%COMP%]:nth-child(3){min-width:180px}td[_ngcontent-%COMP%]:nth-child(4){min-width:150px}td[_ngcontent-%COMP%]:nth-child(5){min-width:180px}td[_ngcontent-%COMP%]:nth-child(6){min-width:180px}"]}),i})()},{path:"divisional",component:O}];let j=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[T.Bz.forChild(B),T.Bz]}),i})(),V=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[_.ez,j,b.Ps,l.u5,l.UX,v.lN,y.c,h.Is,S.LD,f.ot]}),i})()}}]);