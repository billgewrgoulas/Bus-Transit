"use strict";(self.webpackChunkCityBus=self.webpackChunkCityBus||[]).push([[498],{5498:(P,f,e)=>{e.r(f),e.d(f,{SavedModule:()=>O});var t=e(6895),l=e(8252),h=e(9841),d=e(4004),_=e(7758),n=e(4650),m=e(9653),C=e(7047),T=e(8875),B=e(1615),S=e(943),I=e(47),b=e(3848),w=e(4217);function A(i,a){1&i&&n._UZ(0,"spinner-component")}function v(i,a){1&i&&n._UZ(0,"toaster-component")}const r=function(i){return[i]};function c(i,a){if(1&i){const s=n.EpF();n.TgZ(0,"app-option",13),n.NdJ("onSelect",function(x){n.CHM(s);const Z=n.oxw(3);return n.KtG(Z.onStopSelect(x))}),n.qZA()}if(2&i){const s=a.$implicit;n.Q6J("text",s.desc)("desc",s.code)("data",n.VKq(4,r,s.code))("icon","location_on")}}function o(i,a){if(1&i&&(n.ynx(0),n.YNc(1,c,1,6,"app-option",12),n.ALo(2,"filter"),n.BQk()),2&i){const s=n.oxw().ngIf,g=n.oxw();n.xp6(1),n.Q6J("ngForOf",n.xi3(2,1,s.stops,g.value))}}const p=function(i,a){return[i,a]};function u(i,a){if(1&i){const s=n.EpF();n.TgZ(0,"app-option",13),n.NdJ("onSelect",function(x){n.CHM(s);const Z=n.oxw(3);return n.KtG(Z.onRouteSelect(x))}),n.qZA()}if(2&i){const s=a.$implicit;n.Q6J("text",s.desc)("desc",s.code)("data",n.WLB(4,p,s.code,s.lineId))("icon","route")}}function E(i,a){if(1&i&&(n.ynx(0),n.YNc(1,u,1,7,"app-option",12),n.ALo(2,"filter"),n.BQk()),2&i){const s=n.oxw().ngIf,g=n.oxw();n.xp6(1),n.Q6J("ngForOf",n.xi3(2,1,s.routes,g.value))}}function D(i,a){if(1&i&&(n.TgZ(0,"div",4),n.YNc(1,A,1,0,"spinner-component",5),n.YNc(2,v,1,0,"toaster-component",5),n.TgZ(3,"div",6)(4,"mat-tab-group",7)(5,"mat-tab",8)(6,"div",9),n.YNc(7,o,3,4,"ng-container",10),n.qZA()(),n.TgZ(8,"mat-tab",11)(9,"div",9),n.YNc(10,E,3,4,"ng-container",10),n.qZA()()()()()),2&i){const s=a.ngIf;n.oxw();const g=n.MAs(4),x=n.MAs(6);n.xp6(1),n.Q6J("ngIf",s.spinner),n.xp6(1),n.Q6J("ngIf",!1),n.xp6(5),n.Q6J("ngIf",s.stops&&s.stops.length>0)("ngIfElse",g),n.xp6(3),n.Q6J("ngIf",s.routes&&s.routes.length>0)("ngIfElse",x)}}function J(i,a){1&i&&n._UZ(0,"app-option",14),2&i&&n.Q6J("text","\u0394\u03ad\u03bd \u03c5\u03c0\u03b1\u03c1\u03c7\u03bf\u03c5\u03bd \u03b1\u03c0\u03bf\u03b8\u03c5\u03ba\u03b5\u03c5\u03bc\u03ad\u03bd\u03b5\u03c2 \u03c3\u03c4\u03b1\u03c3\u03b5\u03b9\u03c2")}function k(i,a){1&i&&n._UZ(0,"app-option",14),2&i&&n.Q6J("text","\u0394\u03ad\u03bd \u03c5\u03c0\u03b1\u03c1\u03c7\u03bf\u03c5\u03bd \u03b1\u03c0\u03bf\u03b8\u03c5\u03ba\u03b5\u03c5\u03bc\u03ad\u03bd\u03b1 \u03b4\u03c1\u03bf\u03bc\u03bf\u03bb\u03bf\u03b3\u03b9\u03b1")}class y{constructor(a,s,g){this.store=a,this.router=s,this.msg=g,this.value=""}ngOnInit(){this.msg.clearLayers(),this.vm$=(0,h.a)([this.store.select(_.lY),this.store.select(_.D9)]).pipe((0,d.U)(([a,s])=>({spinner:a,...s})))}filter(a){this.value=a}onStopSelect(a){this.navigate(["stops",a[0]],"stop_data_saved")}onRouteSelect(a){this.navigate(["lines",a[1],"route",a[0]],"route_data")}navigate(a,s){this.router.navigate([{outlets:{sidebar:a}}],{queryParams:{module:s}})}}y.\u0275fac=function(a){return new(a||y)(n.Y36(m.yh),n.Y36(l.F0),n.Y36(C._))},y.\u0275cmp=n.Xpm({type:y,selectors:[["saved-slider"]],decls:7,vars:6,consts:[[3,"icon","placeholder","title","onType"],["class","main",4,"ngIf"],["noSavedStops",""],["noSavedRoutes",""],[1,"main"],[4,"ngIf"],[1,"slider-wrapper"],["mat-stretch-tabs","","animationDuration","300ms"],["label","Stops"],[1,"option-list"],[4,"ngIf","ngIfElse"],["label","Routes"],[3,"text","desc","data","icon","onSelect",4,"ngFor","ngForOf"],[3,"text","desc","data","icon","onSelect"],[3,"text"]],template:function(a,s){1&a&&(n.TgZ(0,"input-field",0),n.NdJ("onType",function(x){return s.filter(x)}),n.qZA(),n.YNc(1,D,11,6,"div",1),n.ALo(2,"async"),n.YNc(3,J,1,1,"ng-template",null,2,n.W1O),n.YNc(5,k,1,1,"ng-template",null,3,n.W1O)),2&a&&(n.Q6J("icon","search")("placeholder","search information")("title","Saved information"),n.xp6(1),n.Q6J("ngIf",n.lcZ(2,4,s.vm$)))},dependencies:[t.sg,t.O5,T.x,B.S,S.O,I.B,b.SP,b.uX,t.Ov,w.g],styles:["[_nghost-%COMP%]{width:25vw;min-width:342px;display:flex;flex-direction:column;font-family:Lexend Deca,sans-serif;align-items:center}  .mat-ink-bar{background-color:#1f63d4!important}  .mat-tab-label,   .mat-tab-label-active{min-width:0!important;padding:3px!important;margin:3px!important;color:#373a50!important;font-weight:700!important}.slider-wrapper[_ngcontent-%COMP%]{width:100%}.main[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;width:100%;padding:0 15px;height:calc(100vh - 108px);position:relative}.option-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;width:100%;overflow:auto;max-height:calc(100vh - 180px);padding-right:3px;margin-top:5px}@media screen and (max-width: 800px){[_nghost-%COMP%]{min-width:330px}}@media screen and (max-width: 700px){[_nghost-%COMP%]{min-width:270px}}@media screen and (max-width: 600px){[_nghost-%COMP%]{min-width:250px}}@media screen and (max-width: 500px){[_nghost-%COMP%]{width:100vw}}"]});var F=e(8968);const N=[{path:"",component:y,canActivate:[F.P]}];class M{}M.\u0275fac=function(a){return new(a||M)},M.\u0275mod=n.oAB({type:M}),M.\u0275inj=n.cJS({imports:[l.Bz.forChild(N),l.Bz]});var L=e(2468),U=e(6658),Y=e(3373);class O{}O.\u0275fac=function(a){return new(a||O)},O.\u0275mod=n.oAB({type:O}),O.\u0275inj=n.cJS({providers:[L.D],imports:[t.ez,M,U.m,b.Nh,Y.AuthModule]})},1615:(P,f,e)=>{e.d(f,{S:()=>v});var t=e(4650),l=e(6638),h=e(9653),d=e(7047),_=e(8252),n=e(6895),m=e(4006),C=e(457),T=e(7392);function B(r,c){if(1&r){const o=t.EpF();t.TgZ(0,"button",16),t.NdJ("click",function(){t.CHM(o);const u=t.oxw(2);return t.KtG(u.onSave())}),t.TgZ(1,"span",17),t._uU(2),t.qZA()()}if(2&r){const o=t.oxw(2);t.xp6(2),t.hij("Save ",o.module,"")}}function S(r,c){if(1&r){const o=t.EpF();t.TgZ(0,"button",16),t.NdJ("click",function(){t.CHM(o);const u=t.oxw(2);return t.KtG(u.onRemove())}),t.TgZ(1,"span",17),t._uU(2),t.qZA()()}if(2&r){const o=t.oxw(2);t.xp6(2),t.hij("Unsave ",o.module,"")}}function I(r,c){if(1&r&&(t.TgZ(0,"section")(1,"button",13)(2,"mat-icon"),t._uU(3,"more_vert"),t.qZA()(),t.TgZ(4,"mat-menu",null,14),t.YNc(6,B,3,1,"button",15),t.YNc(7,S,3,1,"button",15),t.qZA()()),2&r){const o=t.MAs(5),p=t.oxw();t.xp6(1),t.Q6J("matMenuTriggerFor",o),t.xp6(5),t.Q6J("ngIf",!p.saved),t.xp6(1),t.Q6J("ngIf",p.saved)}}function b(r,c){if(1&r){const o=t.EpF();t.TgZ(0,"i",18),t.NdJ("click",function(){t.CHM(o);const u=t.oxw();return t.KtG(u.map())}),t.qZA()}}function w(r,c){if(1&r){const o=t.EpF();t.TgZ(0,"i",19),t.NdJ("click",function(){t.CHM(o);const u=t.oxw();return t.KtG(u.clear())}),t.qZA()}}const A=function(r,c){return{start:r,end:c}};class v{constructor(c,o,p){this.store=c,this.msg=o,this.router=p,this.mapBtn=!1,this.value="",this.placeholder="",this.icon="",this.type="",this.disabled=!1,this.mapLink=[],this.dots=!1,this.saved=!1,this.code="",this.module="",this.title="",this.onType=new t.vpe,this.save=new t.vpe,this.remove=new t.vpe}ngOnInit(){this.mapButton()}send(){this.onType.emit(this.value)}clear(){this.value="",this.send()}goBack(){this.store.dispatch(l.tI())}toggle(){this.msg.onToggle()}onSave(){this.save.emit(this.code)}onRemove(){this.remove.emit(this.code)}map(){this.mapLink.length>0&&this.router.navigate([{outlets:{sidebar:this.mapLink}}],{queryParams:{module:"route_data"}})}mapButton(){this.mapBtn=!(window.innerWidth>500)}}v.\u0275fac=function(c){return new(c||v)(t.Y36(h.yh),t.Y36(d._),t.Y36(_.F0))},v.\u0275cmp=t.Xpm({type:v,selectors:[["input-field"]],hostBindings:function(c,o){1&c&&t.NdJ("resize",function(u){return o.mapButton(u)},!1,t.Jf7)},inputs:{value:"value",placeholder:"placeholder",icon:"icon",type:"type",disabled:"disabled",mapLink:"mapLink",dots:"dots",saved:"saved",code:"code",module:"module",title:"title"},outputs:{onType:"onType",save:"save",remove:"remove"},decls:16,vars:13,consts:[[1,"left-wrapper"],[1,"arrow","material-symbols-outlined",3,"click"],[1,"route","material-symbols-outlined",3,"ngClass"],[1,"right-wrapper"],[1,"icons"],[1,"title"],[1,"menu-btn"],[4,"ngIf"],["class","fas fa-map",3,"click",4,"ngIf"],[1,"bars","fas","fa-bars",3,"click"],[1,"input-list"],["name","myInput","type","text","autocomplete","off","autofocus","true",1,"text",3,"value","ngModel","disabled","placeholder","ngModelChange","keyup"],["class","fas fa-times",3,"click",4,"ngIf"],["mat-icon-button","","aria-label","Example icon-button with a menu",3,"matMenuTriggerFor"],["menu","matMenu"],["class","inner-button","mat-menu-item","",3,"click",4,"ngIf"],["mat-menu-item","",1,"inner-button",3,"click"],[1,"menu-text"],[1,"fas","fa-map",3,"click"],[1,"fas","fa-times",3,"click"]],template:function(c,o){1&c&&(t.TgZ(0,"div",0)(1,"span",1),t.NdJ("click",function(){return o.goBack()}),t._uU(2," keyboard_backspace "),t.qZA(),t.TgZ(3,"span",2),t._uU(4),t.qZA()(),t.TgZ(5,"div",3)(6,"div",4)(7,"span",5),t._uU(8),t.qZA(),t.TgZ(9,"div",6),t.YNc(10,I,8,3,"section",7),t.YNc(11,b,1,0,"i",8),t.TgZ(12,"i",9),t.NdJ("click",function(){return o.toggle()}),t.qZA()()(),t.TgZ(13,"div",10)(14,"input",11),t.NdJ("ngModelChange",function(u){return o.value=u})("keyup",function(){return o.send()}),t.qZA(),t.YNc(15,w,1,0,"i",12),t.qZA()()),2&c&&(t.xp6(3),t.Q6J("ngClass",t.WLB(10,A,"start"===o.type,"dest"===o.type)),t.xp6(1),t.hij(" ",o.icon," "),t.xp6(4),t.Oqu(o.title),t.xp6(2),t.Q6J("ngIf",o.dots),t.xp6(1),t.Q6J("ngIf",o.mapBtn&&o.mapLink.length>0),t.xp6(3),t.s9C("placeholder",o.placeholder),t.Q6J("value",o.value)("ngModel",o.value)("disabled",o.disabled),t.xp6(1),t.Q6J("ngIf",""!=o.value&&!o.disabled))},dependencies:[n.mk,n.O5,m.Fj,m.JJ,m.On,C.VK,C.OP,C.p6,T.Hw],styles:["[_nghost-%COMP%]{display:flex;flex-direction:row;align-items:flex-end;width:100%;gap:10px;background:white;box-shadow:0 2px 5px #0000004d}.show[_ngcontent-%COMP%]{display:none!important}.left-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-end;gap:15px;padding:15px 0 21px 15px;background:rgb(221,220,229);background:linear-gradient(90deg,rgba(221,220,229,1) 0%,rgba(254,254,254,1) 100%);position:relative}.start[_ngcontent-%COMP%]{color:#3e3aef}.end[_ngcontent-%COMP%]{color:#db1de3}.route[_ngcontent-%COMP%]{font-weight:900}.right-wrapper[_ngcontent-%COMP%]{padding-bottom:15px;width:inherit;display:flex;flex-direction:column;gap:8px;position:relative}.fa-times[_ngcontent-%COMP%]{margin-top:5px;cursor:pointer}input[_ngcontent-%COMP%]{outline:none;border:none;border-bottom:3px solid #f7f8fe;background:transparent;width:87%;font-size:13px;padding-bottom:6px;color:#2b3b4c}.arrow[_ngcontent-%COMP%]{color:#2d3b50;font-size:33px;font-weight:600;cursor:pointer}.input-list[_ngcontent-%COMP%]{display:flex;flex-direction:row;gap:5px}.bars[_ngcontent-%COMP%]{color:#373a50;font-weight:600;font-size:27px;cursor:pointer}.menu-btn[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;gap:7px}.icons[_ngcontent-%COMP%]{align-self:flex-end;margin-bottom:10px;margin-right:22px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:93%}.title[_ngcontent-%COMP%]{color:#2d3b50;font-size:14px}.fa-map[_ngcontent-%COMP%]{font-size:20px!important;cursor:pointer;padding:0 15px 0 0}  .mat-menu-panel{background:rgba(255,255,255,1)!important;color:#373a50!important}.inner-button[_ngcontent-%COMP%]:hover{background:rgb(235,235,235)!important}button[_ngcontent-%COMP%]{border:none!important;background-color:transparent!important;display:grid!important;place-items:center!important}.menu-text[_ngcontent-%COMP%]{color:#373a50;font-weight:700}"]})},943:(P,f,e)=>{e.d(f,{O:()=>l});var t=e(4650);class l{constructor(){}ngOnInit(){}}l.\u0275fac=function(d){return new(d||l)},l.\u0275cmp=t.Xpm({type:l,selectors:[["spinner-component"]],decls:5,vars:0,consts:[[1,"lds-ring"]],template:function(d,_){1&d&&(t.TgZ(0,"div",0),t._UZ(1,"div")(2,"div")(3,"div")(4,"div"),t.qZA())},styles:["[_nghost-%COMP%]{position:absolute;display:grid;place-items:center;width:100%;height:100%;inset:0;background-color:#0000003b;z-index:20;cursor:pointer}.lds-ring[_ngcontent-%COMP%]{display:inline-block;position:relative;width:64px;height:90px}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{box-sizing:border-box;display:block;position:absolute;width:50px;height:50px;margin:8px;border:2px solid #fff;border-radius:50%;animation:_ngcontent-%COMP%_lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:#fff transparent transparent transparent}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(1){animation-delay:-.45s}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2){animation-delay:-.3s}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3){animation-delay:-.15s}@keyframes _ngcontent-%COMP%_lds-ring{0%{transform:rotate(0)}to{transform:rotate(360deg)}}"]})},47:(P,f,e)=>{e.d(f,{B:()=>d});var t=e(4650),l=e(6895);function h(_,n){if(1&_){const m=t.EpF();t.TgZ(0,"div",1),t.NdJ("click",function(){t.CHM(m);const T=t.oxw();return t.KtG(T.close())}),t.TgZ(1,"div",2),t._uU(2),t.qZA()()}if(2&_){const m=t.oxw();t.xp6(1),t.ekj("show",m.flag),t.xp6(1),t.Oqu(m.text)}}class d{constructor(){this.flag=!1,this.text="",this.msg=""}ngOnInit(){this.msg$&&(this.sub=this.msg$.subscribe({next:n=>this.start(n)}))}ngOnDestroy(){this.msg$&&this.sub.unsubscribe()}ngOnChanges(){""!=this.msg&&this.start(this.msg)}close(){this.flag=!1}start(n){this.text=n,this.flag=!0,setTimeout(()=>this.flag=!1,3e3)}}d.\u0275fac=function(n){return new(n||d)},d.\u0275cmp=t.Xpm({type:d,selectors:[["toaster-component"]],inputs:{msg$:"msg$",msg:"msg"},features:[t.TTD],decls:1,vars:1,consts:[["class","main",3,"click",4,"ngIf"],[1,"main",3,"click"],["id","snackbar"]],template:function(n,m){1&n&&t.YNc(0,h,3,3,"div",0),2&n&&t.Q6J("ngIf",m.flag)},dependencies:[l.O5],styles:[".main[_ngcontent-%COMP%]{position:absolute;display:grid;place-items:center;width:100%;height:100%;inset:0;background-color:#0000003b;z-index:20;cursor:pointer}#snackbar[_ngcontent-%COMP%]{visibility:hidden;background-color:#333;color:#fff;text-align:center;border-radius:2px;padding:10px 25px;position:fixed;z-index:5;margin:0 15px}#snackbar.show[_ngcontent-%COMP%]{visibility:visible;animation:_ngcontent-%COMP%_fadein .5s,fadeout .5s 2.5s}@keyframes _ngcontent-%COMP%_fadein{0%{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes _ngcontent-%COMP%_fadeout{0%{transform:translateY(0);opacity:1}to{transform:translateY(20px);opacity:0}}"]})}}]);