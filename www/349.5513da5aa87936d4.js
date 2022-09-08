"use strict";(self.webpackChunkworkprogram=self.webpackChunkworkprogram||[]).push([[349],{2349:(dt,V,d)=>{d.d(V,{WI:()=>Y,uw:()=>F,ZT:()=>st,xY:()=>lt,Is:()=>ct,so:()=>R});var O=d(925),f=d(7429),v=d(9808),i=d(5e3),p=d(2378),u=d(1314),C=d(1159),_=d(7579),k=d(9770),H=d(9646),x=d(226),I=d(8675);function z(a,n){}class y{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.closeOnNavigation=!0,this.closeOnDestroy=!0}}let B=(()=>{class a extends f.en{constructor(t,e,o,s,r,l,c,g){super(),this._elementRef=t,this._focusTrapFactory=e,this._config=s,this._interactivityChecker=r,this._ngZone=l,this._overlayRef=c,this._focusMonitor=g,this._elementFocusedBeforeDialogWasOpened=null,this._closeInteractionType=null,this.attachDomPortal=D=>{this._portalOutlet.hasAttached();const G=this._portalOutlet.attachDomPortal(D);return this._contentAttached(),G},this._ariaLabelledBy=this._config.ariaLabelledBy||null,this._document=o}_contentAttached(){this._initializeFocusTrap(),this._handleBackdropClicks(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._restoreFocus()}attachComponentPortal(t){this._portalOutlet.hasAttached();const e=this._portalOutlet.attachComponentPortal(t);return this._contentAttached(),e}attachTemplatePortal(t){this._portalOutlet.hasAttached();const e=this._portalOutlet.attachTemplatePortal(t);return this._contentAttached(),e}_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(t,e){this._interactivityChecker.isFocusable(t)||(t.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{const o=()=>{t.removeEventListener("blur",o),t.removeEventListener("mousedown",o),t.removeAttribute("tabindex")};t.addEventListener("blur",o),t.addEventListener("mousedown",o)})),t.focus(e)}_focusByCssSelector(t,e){let o=this._elementRef.nativeElement.querySelector(t);o&&this._forceFocus(o,e)}_trapFocus(){const t=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||t.focus();break;case!0:case"first-tabbable":this._focusTrap.focusInitialElementWhenReady().then(e=>{e||this._focusDialogContainer()});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this._config.autoFocus)}}_restoreFocus(){const t=this._config.restoreFocus;let e=null;if("string"==typeof t?e=this._document.querySelector(t):"boolean"==typeof t?e=t?this._elementFocusedBeforeDialogWasOpened:null:t&&(e=t),this._config.restoreFocus&&e&&"function"==typeof e.focus){const o=(0,O.ht)(),s=this._elementRef.nativeElement;(!o||o===this._document.body||o===s||s.contains(o))&&(this._focusMonitor?(this._focusMonitor.focusVia(e,this._closeInteractionType),this._closeInteractionType=null):e.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(){this._elementRef.nativeElement.focus&&this._elementRef.nativeElement.focus()}_containsFocus(){const t=this._elementRef.nativeElement,e=(0,O.ht)();return t===e||t.contains(e)}_initializeFocusTrap(){this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=(0,O.ht)())}_handleBackdropClicks(){this._overlayRef.backdropClick().subscribe(()=>{this._config.disableClose&&this._recaptureFocus()})}}return a.\u0275fac=function(t){return new(t||a)(i.Y36(i.SBq),i.Y36(p.qV),i.Y36(v.K0,8),i.Y36(y),i.Y36(p.ic),i.Y36(i.R0b),i.Y36(u.Iu),i.Y36(p.tE))},a.\u0275cmp=i.Xpm({type:a,selectors:[["cdk-dialog-container"]],viewQuery:function(t,e){if(1&t&&i.Gf(f.Pl,7),2&t){let o;i.iGM(o=i.CRH())&&(e._portalOutlet=o.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(t,e){2&t&&i.uIk("id",e._config.id||null)("role",e._config.role)("aria-modal",e._config.ariaModal)("aria-labelledby",e._config.ariaLabel?null:e._ariaLabelledBy)("aria-label",e._config.ariaLabel)("aria-describedby",e._config.ariaDescribedBy||null)},features:[i.qOj],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(t,e){1&t&&i.YNc(0,z,0,0,"ng-template",0)},dependencies:[f.Pl],styles:[".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"],encapsulation:2}),a})();class M{constructor(n,t){this.overlayRef=n,this.config=t,this.closed=new _.x,this.disableClose=t.disableClose,this.backdropClick=n.backdropClick(),this.keydownEvents=n.keydownEvents(),this.outsidePointerEvents=n.outsidePointerEvents(),this.id=t.id,this.keydownEvents.subscribe(e=>{e.keyCode===C.hY&&!this.disableClose&&!(0,C.Vb)(e)&&(e.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{this.disableClose||this.close(void 0,{focusOrigin:"mouse"})})}close(n,t){if(this.containerInstance){const e=this.closed;this.containerInstance._closeInteractionType=(null==t?void 0:t.focusOrigin)||"program",this.overlayRef.dispose(),e.next(n),e.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(n="",t=""){return this.overlayRef.updateSize({width:n,height:t}),this}addPanelClass(n){return this.overlayRef.addPanelClass(n),this}removePanelClass(n){return this.overlayRef.removePanelClass(n),this}}const E=new i.OlP("DialogScrollStrategy"),N=new i.OlP("DialogData"),W=new i.OlP("DefaultDialogConfig"),$={provide:E,deps:[u.aV],useFactory:function X(a){return()=>a.scrollStrategies.block()}};let U=0,S=(()=>{class a{constructor(t,e,o,s,r,l){this._overlay=t,this._injector=e,this._defaultOptions=o,this._parentDialog=s,this._overlayContainer=r,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new _.x,this._afterOpenedAtThisLevel=new _.x,this._ariaHiddenElements=new Map,this.afterAllClosed=(0,k.P)(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe((0,I.O)(void 0))),this._scrollStrategy=l}get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}open(t,e){const o=this._defaultOptions||new y;(e=Object.assign(Object.assign({},o),e)).id=e.id||"cdk-dialog-"+U++,e.id&&this.getDialogById(e.id);const s=this._getOverlayConfig(e),r=this._overlay.create(s),l=new M(r,e),c=this._attachContainer(r,l,e);return l.containerInstance=c,this._attachDialogContent(t,l,c,e),this.openDialogs.length||this._hideNonDialogContentFromAssistiveTechnology(),this.openDialogs.push(l),l.closed.subscribe(()=>this._removeOpenDialog(l,!0)),this.afterOpened.next(l),l}closeAll(){T(this.openDialogs,t=>t.close())}getDialogById(t){return this.openDialogs.find(e=>e.id===t)}ngOnDestroy(){T(this._openDialogsAtThisLevel,t=>{!1===t.config.closeOnDestroy&&this._removeOpenDialog(t,!1)}),T(this._openDialogsAtThisLevel,t=>t.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(t){const e=new u.X_({positionStrategy:t.positionStrategy||this._overlay.position().global().centerHorizontally().centerVertically(),scrollStrategy:t.scrollStrategy||this._scrollStrategy(),panelClass:t.panelClass,hasBackdrop:t.hasBackdrop,direction:t.direction,minWidth:t.minWidth,minHeight:t.minHeight,maxWidth:t.maxWidth,maxHeight:t.maxHeight,width:t.width,height:t.height,disposeOnNavigation:t.closeOnNavigation});return t.backdropClass&&(e.backdropClass=t.backdropClass),e}_attachContainer(t,e,o){var s;const r=o.injector||(null===(s=o.viewContainerRef)||void 0===s?void 0:s.injector),l=[{provide:y,useValue:o},{provide:M,useValue:e},{provide:u.Iu,useValue:t}];let c;o.container?"function"==typeof o.container?c=o.container:(c=o.container.type,l.push(...o.container.providers(o))):c=B;const g=new f.C5(c,o.viewContainerRef,i.zs3.create({parent:r||this._injector,providers:l}),o.componentFactoryResolver);return t.attach(g).instance}_attachDialogContent(t,e,o,s){if(t instanceof i.Rgc){const r=this._createInjector(s,e,o,void 0);let l={$implicit:s.data,dialogRef:e};s.templateContext&&(l=Object.assign(Object.assign({},l),"function"==typeof s.templateContext?s.templateContext():s.templateContext)),o.attachTemplatePortal(new f.UE(t,null,l,r))}else{const r=this._createInjector(s,e,o,this._injector),l=o.attachComponentPortal(new f.C5(t,s.viewContainerRef,r,s.componentFactoryResolver));e.componentInstance=l.instance}}_createInjector(t,e,o,s){var r;const l=t.injector||(null===(r=t.viewContainerRef)||void 0===r?void 0:r.injector),c=[{provide:N,useValue:t.data},{provide:M,useValue:e}];return t.providers&&("function"==typeof t.providers?c.push(...t.providers(e,t,o)):c.push(...t.providers)),t.direction&&(!l||!l.get(x.Is,null,i.XFs.Optional))&&c.push({provide:x.Is,useValue:{value:t.direction,change:(0,H.of)()}}),i.zs3.create({parent:l||s,providers:c})}_removeOpenDialog(t,e){const o=this.openDialogs.indexOf(t);o>-1&&(this.openDialogs.splice(o,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((s,r)=>{s?r.setAttribute("aria-hidden",s):r.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),e&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(){const t=this._overlayContainer.getContainerElement();if(t.parentElement){const e=t.parentElement.children;for(let o=e.length-1;o>-1;o--){const s=e[o];s!==t&&"SCRIPT"!==s.nodeName&&"STYLE"!==s.nodeName&&!s.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(s,s.getAttribute("aria-hidden")),s.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){const t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}}return a.\u0275fac=function(t){return new(t||a)(i.LFG(u.aV),i.LFG(i.zs3),i.LFG(W,8),i.LFG(a,12),i.LFG(u.Xj),i.LFG(E))},a.\u0275prov=i.Yz7({token:a,factory:a.\u0275fac}),a})();function T(a,n){let t=a.length;for(;t--;)n(a[t])}let Q=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=i.oAB({type:a}),a.\u0275inj=i.cJS({providers:[S,$],imports:[u.U8,f.eL,p.rt,f.eL]}),a})();var w=d(508),Z=d(6451),b=d(9300),L=d(5698),h=d(1777);function J(a,n){}const m={params:{enterAnimationDuration:"150ms",exitAnimationDuration:"75ms"}},K={dialogContainer:(0,h.X$)("dialogContainer",[(0,h.SB)("void, exit",(0,h.oB)({opacity:0,transform:"scale(0.7)"})),(0,h.SB)("enter",(0,h.oB)({transform:"none"})),(0,h.eR)("* => enter",(0,h.ru)([(0,h.jt)("{{enterAnimationDuration}} cubic-bezier(0, 0, 0.2, 1)",(0,h.oB)({transform:"none",opacity:1})),(0,h.IO)("@*",(0,h.pV)(),{optional:!0})]),m),(0,h.eR)("* => void, * => exit",(0,h.ru)([(0,h.jt)("{{exitAnimationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)",(0,h.oB)({opacity:0})),(0,h.IO)("@*",(0,h.pV)(),{optional:!0})]),m)])};class A{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.maxWidth="80vw",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.delayFocusTrap=!0,this.closeOnNavigation=!0,this.enterAnimationDuration=m.params.enterAnimationDuration,this.exitAnimationDuration=m.params.exitAnimationDuration}}let q=(()=>{class a extends B{constructor(t,e,o,s,r,l,c,g){super(t,e,o,s,r,l,c,g),this._animationStateChanged=new i.vpe}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(t){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:t})}}return a.\u0275fac=function(t){return new(t||a)(i.Y36(i.SBq),i.Y36(p.qV),i.Y36(v.K0,8),i.Y36(A),i.Y36(p.ic),i.Y36(i.R0b),i.Y36(u.Iu),i.Y36(p.tE))},a.\u0275cmp=i.Xpm({type:a,selectors:[["ng-component"]],features:[i.qOj],decls:0,vars:0,template:function(t,e){},encapsulation:2}),a})(),tt=(()=>{class a extends q{constructor(t,e,o,s,r,l,c,g,D){super(t,e,o,s,r,l,c,D),this._changeDetectorRef=g,this._state="enter"}_onAnimationDone({toState:t,totalTime:e}){"enter"===t?this._openAnimationDone(e):"exit"===t&&this._animationStateChanged.next({state:"closed",totalTime:e})}_onAnimationStart({toState:t,totalTime:e}){"enter"===t?this._animationStateChanged.next({state:"opening",totalTime:e}):("exit"===t||"void"===t)&&this._animationStateChanged.next({state:"closing",totalTime:e})}_startExitAnimation(){this._state="exit",this._changeDetectorRef.markForCheck()}_getAnimationState(){return{value:this._state,params:{enterAnimationDuration:this._config.enterAnimationDuration||m.params.enterAnimationDuration,exitAnimationDuration:this._config.exitAnimationDuration||m.params.exitAnimationDuration}}}}return a.\u0275fac=function(t){return new(t||a)(i.Y36(i.SBq),i.Y36(p.qV),i.Y36(v.K0,8),i.Y36(A),i.Y36(p.ic),i.Y36(i.R0b),i.Y36(u.Iu),i.Y36(i.sBO),i.Y36(p.tE))},a.\u0275cmp=i.Xpm({type:a,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-dialog-container"],hostVars:7,hostBindings:function(t,e){1&t&&i.WFA("@dialogContainer.start",function(s){return e._onAnimationStart(s)})("@dialogContainer.done",function(s){return e._onAnimationDone(s)}),2&t&&(i.Ikx("id",e._config.id),i.uIk("aria-modal",e._config.ariaModal)("role",e._config.role)("aria-labelledby",e._config.ariaLabel?null:e._ariaLabelledBy)("aria-label",e._config.ariaLabel)("aria-describedby",e._config.ariaDescribedBy||null),i.d8E("@dialogContainer",e._getAnimationState()))},features:[i.qOj],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(t,e){1&t&&i.YNc(0,J,0,0,"ng-template",0)},dependencies:[f.Pl],styles:[".mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.cdk-high-contrast-active .mat-dialog-container{outline:solid 1px}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:8px 0;display:flex;flex-wrap:wrap;min-height:52px;align-items:center;box-sizing:content-box;margin-bottom:-24px}.mat-dialog-actions.mat-dialog-actions-align-center,.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions.mat-dialog-actions-align-end,.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions .mat-button-base+.mat-button-base,.mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}"],encapsulation:2,data:{animation:[K.dialogContainer]}}),a})();class R{constructor(n,t,e){this._ref=n,this._containerInstance=e,this._afterOpened=new _.x,this._beforeClosed=new _.x,this._state=0,this.disableClose=t.disableClose,this.id=n.id,e._animationStateChanged.pipe((0,b.h)(o=>"opened"===o.state),(0,L.q)(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),e._animationStateChanged.pipe((0,b.h)(o=>"closed"===o.state),(0,L.q)(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),n.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),(0,Z.T)(this.backdropClick(),this.keydownEvents().pipe((0,b.h)(o=>o.keyCode===C.hY&&!this.disableClose&&!(0,C.Vb)(o)))).subscribe(o=>{this.disableClose||(o.preventDefault(),P(this,"keydown"===o.type?"keyboard":"mouse"))})}close(n){this._result=n,this._containerInstance._animationStateChanged.pipe((0,b.h)(t=>"closing"===t.state),(0,L.q)(1)).subscribe(t=>{this._beforeClosed.next(n),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),t.totalTime+100)}),this._state=1,this._containerInstance._startExitAnimation()}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(n){let t=this._ref.config.positionStrategy;return n&&(n.left||n.right)?n.left?t.left(n.left):t.right(n.right):t.centerHorizontally(),n&&(n.top||n.bottom)?n.top?t.top(n.top):t.bottom(n.bottom):t.centerVertically(),this._ref.updatePosition(),this}updateSize(n="",t=""){return this._ref.updateSize(n,t),this}addPanelClass(n){return this._ref.addPanelClass(n),this}removePanelClass(n){return this._ref.removePanelClass(n),this}getState(){return this._state}_finishDialogClose(){this._state=2,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}}function P(a,n,t){return a._closeInteractionType=n,a.close(t)}const Y=new i.OlP("MatDialogData"),et=new i.OlP("mat-dialog-default-options"),j=new i.OlP("mat-dialog-scroll-strategy"),at={provide:j,deps:[u.aV],useFactory:function it(a){return()=>a.scrollStrategies.block()}};let ot=0,nt=(()=>{class a{constructor(t,e,o,s,r,l,c,g,D,G){this._overlay=t,this._defaultOptions=o,this._parentDialog=s,this._dialogRefConstructor=c,this._dialogContainerType=g,this._dialogDataToken=D,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new _.x,this._afterOpenedAtThisLevel=new _.x,this._idPrefix="mat-dialog-",this.afterAllClosed=(0,k.P)(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe((0,I.O)(void 0))),this._scrollStrategy=l,this._dialog=e.get(S)}get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){const t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}open(t,e){let o;(e=Object.assign(Object.assign({},this._defaultOptions||new A),e)).id=e.id||`${this._idPrefix}${ot++}`,e.scrollStrategy=e.scrollStrategy||this._scrollStrategy();const s=this._dialog.open(t,Object.assign(Object.assign({},e),{positionStrategy:this._overlay.position().global().centerHorizontally().centerVertically(),disableClose:!0,closeOnDestroy:!1,container:{type:this._dialogContainerType,providers:()=>[{provide:A,useValue:e},{provide:y,useValue:e}]},templateContext:()=>({dialogRef:o}),providers:(r,l,c)=>(o=new this._dialogRefConstructor(r,e,c),o.updatePosition(null==e?void 0:e.position),[{provide:this._dialogContainerType,useValue:c},{provide:this._dialogDataToken,useValue:l.data},{provide:this._dialogRefConstructor,useValue:o}])}));return o.componentInstance=s.componentInstance,this.openDialogs.push(o),this.afterOpened.next(o),o.afterClosed().subscribe(()=>{const r=this.openDialogs.indexOf(o);r>-1&&(this.openDialogs.splice(r,1),this.openDialogs.length||this._getAfterAllClosed().next())}),o}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(t){return this.openDialogs.find(e=>e.id===t)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(t){let e=t.length;for(;e--;)t[e].close()}}return a.\u0275fac=function(t){i.$Z()},a.\u0275prov=i.Yz7({token:a,factory:a.\u0275fac}),a})(),F=(()=>{class a extends nt{constructor(t,e,o,s,r,l,c,g){super(t,e,s,l,c,r,R,tt,Y,g)}}return a.\u0275fac=function(t){return new(t||a)(i.LFG(u.aV),i.LFG(i.zs3),i.LFG(v.Ye,8),i.LFG(et,8),i.LFG(j),i.LFG(a,12),i.LFG(u.Xj),i.LFG(i.QbO,8))},a.\u0275prov=i.Yz7({token:a,factory:a.\u0275fac}),a})(),st=(()=>{class a{constructor(t,e,o){this.dialogRef=t,this._elementRef=e,this._dialog=o,this.type="button"}ngOnInit(){this.dialogRef||(this.dialogRef=function rt(a,n){let t=a.nativeElement.parentElement;for(;t&&!t.classList.contains("mat-dialog-container");)t=t.parentElement;return t?n.find(e=>e.id===t.id):null}(this._elementRef,this._dialog.openDialogs))}ngOnChanges(t){const e=t._matDialogClose||t._matDialogCloseResult;e&&(this.dialogResult=e.currentValue)}_onButtonClick(t){P(this.dialogRef,0===t.screenX&&0===t.screenY?"keyboard":"mouse",this.dialogResult)}}return a.\u0275fac=function(t){return new(t||a)(i.Y36(R,8),i.Y36(i.SBq),i.Y36(F))},a.\u0275dir=i.lG2({type:a,selectors:[["","mat-dialog-close",""],["","matDialogClose",""]],hostVars:2,hostBindings:function(t,e){1&t&&i.NdJ("click",function(s){return e._onButtonClick(s)}),2&t&&i.uIk("aria-label",e.ariaLabel||null)("type",e.type)},inputs:{ariaLabel:["aria-label","ariaLabel"],type:"type",dialogResult:["mat-dialog-close","dialogResult"],_matDialogClose:["matDialogClose","_matDialogClose"]},exportAs:["matDialogClose"],features:[i.TTD]}),a})(),lt=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275dir=i.lG2({type:a,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-dialog-content"]}),a})(),ct=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=i.oAB({type:a}),a.\u0275inj=i.cJS({providers:[F,at],imports:[Q,u.U8,f.eL,w.BQ,w.BQ]}),a})()}}]);