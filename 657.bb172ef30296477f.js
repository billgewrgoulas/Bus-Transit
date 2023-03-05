"use strict";(self.webpackChunkCityBus=self.webpackChunkCityBus||[]).push([[657],{8657:(ot,y,i)=>{i.r(y),i.d(y,{StopsModule:()=>h});var c=i(6895),f=i(8252),A=i(9841),w=i(4004),x=i(8505),M=i(8582),I=i(9300),T=i(3900),P=i(2805),t=i(4650),J=i(2468),v=i(9653);const Y={arrivals:[]};class d extends M.m1{constructor(n,e){super(Y),this.dataService=n,this.store=e,this.fetchArrivals=this.effect(s=>s.pipe((0,I.h)(a=>!!a),(0,T.w)(a=>(0,P.H)(0,2e4).pipe((0,T.w)(()=>this.dataService.getLiveUpdates(a.code,"stops/")),(0,M._b)(p=>this.updateArrivals(p),p=>console.log(p)))))),this.updateArrivals=this.updater((s,a)=>({arrivals:[...a]}))}getArrivalState(){return this.select(n=>n.arrivals)}}d.\u0275fac=function(n){return new(n||d)(t.LFG(J.D),t.LFG(v.yh))},d.\u0275prov=t.Yz7({token:d,factory:d.\u0275fac});var r=i(7758),O=i(3783),_=i(7047),F=i(1868),Q=i(8875),L=i(440),S=i(1615),N=i(943),B=i(47),C=i(3848);const $=function(o){return["stops",o,"map"]};function b(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"input-field",8),t.NdJ("save",function(a){t.CHM(e);const p=t.oxw(2);return t.KtG(p.onSave(a))})("remove",function(a){t.CHM(e);const p=t.oxw(2);return t.KtG(p.onRemove(a))}),t.qZA()}if(2&o){const e=t.oxw().ngIf,s=t.oxw();t.Q6J("disabled",!0)("value",e.stop.desc)("icon","trip_origin")("placeholder","search stops")("type","start")("saved",e.saved)("dots",s.authenticated)("module","stop")("code",e.stop.code)("title","Stop details")("mapLink",t.VKq(11,$,e.stop.code))}}function U(o,n){1&o&&t._UZ(0,"spinner-component")}const D=function(o,n){return["lines",o,"route",n]};function G(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"app-option",11),t.NdJ("onSelect",function(a){t.CHM(e);const p=t.oxw(3);return t.KtG(p.onNavigate(a))}),t.qZA()}if(2&o){const e=n.$implicit;t.Q6J("icon","route")("text",e.desc)("desc",e.code)("data",t.WLB(4,D,e.lineId,e.code))}}function j(o,n){if(1&o&&(t.TgZ(0,"div",9),t.YNc(1,G,1,7,"app-option",10),t.qZA()),2&o){const e=t.oxw().ngIf;t.xp6(1),t.Q6J("ngForOf",e.routes)}}function H(o,n){if(1&o&&(t.TgZ(0,"div",9),t._UZ(1,"bus-entity",12),t.qZA()),2&o){const e=n.ngIf;t.xp6(1),t.Q6J("buses",e)}}function K(o,n){if(1&o){const e=t.EpF();t.ynx(0),t.YNc(1,b,1,13,"input-field",1),t.TgZ(2,"div",2),t.YNc(3,U,1,0,"spinner-component",0),t._UZ(4,"toaster-component",3),t.TgZ(5,"mat-tab-group",4),t.NdJ("selectedIndexChange",function(a){t.CHM(e);const p=t.oxw();return t.KtG(p.selectedTab=a)}),t.TgZ(6,"mat-tab",5),t.YNc(7,j,2,1,"div",6),t.qZA(),t.TgZ(8,"mat-tab",7),t.YNc(9,H,2,1,"div",6),t.ALo(10,"async"),t.qZA()()(),t.BQk()}if(2&o){const e=n.ngIf,s=t.oxw();t.xp6(1),t.Q6J("ngIf",e.stop),t.xp6(2),t.Q6J("ngIf",e.spinner),t.xp6(1),t.Q6J("msg$",s.apiMsg),t.xp6(1),t.Q6J("selectedIndex",s.selectedTab),t.xp6(2),t.Q6J("ngIf",e.routes),t.xp6(2),t.Q6J("ngIf",t.lcZ(10,6,s.departures$))}}class g{constructor(n,e,s,a,p){this.store=n,this.local=e,this.msg=s,this.auth=a,this.router=p,this.selectedTab=0}ngOnInit(){this.vm$=(0,A.a)([this.store.select(r.UF),this.store.select(r.k4),this.store.select(r.Mk),this.store.select(r.lY)]).pipe((0,w.U)(([n,e,s,a])=>({saved:n,stop:e,routes:s,spinner:a}))),this.departures$=this.local.getArrivalState().pipe((0,x.b)(n=>this.msg.sendBusStatus(n))),this.local.fetchArrivals(this.vm$.pipe((0,w.U)(n=>n.stop)))}onSave(n){this.store.dispatch(O.C8({code:n}))}onRemove(n){this.store.dispatch(O.xC({code:n}))}onNavigate(n){this.router.navigate([{outlets:{sidebar:n}}],{queryParams:{module:"route_data"}})}get apiMsg(){return this.msg.apiMsg}get authenticated(){return this.auth.isAuthenticated()}}g.\u0275fac=function(n){return new(n||g)(t.Y36(v.yh),t.Y36(d),t.Y36(_._),t.Y36(F.e),t.Y36(f.F0))},g.\u0275cmp=t.Xpm({type:g,selectors:[["stop-slider"]],features:[t._Bn([d])],decls:2,vars:3,consts:[[4,"ngIf"],[3,"disabled","value","icon","placeholder","type","saved","dots","module","code","title","mapLink","save","remove",4,"ngIf"],[1,"main"],[3,"msg$"],["mat-stretch-tabs","","animationDuration","300ms",3,"selectedIndex","selectedIndexChange"],["label","Routes"],["class","option-list",4,"ngIf"],["label","Telematics"],[3,"disabled","value","icon","placeholder","type","saved","dots","module","code","title","mapLink","save","remove"],[1,"option-list"],[3,"icon","text","desc","data","onSelect",4,"ngFor","ngForOf"],[3,"icon","text","desc","data","onSelect"],[3,"buses"]],template:function(n,e){1&n&&(t.YNc(0,K,11,8,"ng-container",0),t.ALo(1,"async")),2&n&&t.Q6J("ngIf",t.lcZ(1,1,e.vm$))},dependencies:[c.sg,c.O5,Q.x,L.N,S.S,N.O,B.B,C.SP,C.uX,c.Ov],styles:["[_nghost-%COMP%]{width:25vw;min-width:342px;flex-direction:column;font-family:Lexend Deca,sans-serif;align-items:center;display:block}  .mat-ink-bar{background-color:#1f63d4!important}  .mat-tab-label,   .mat-tab-label-active{min-width:0!important;padding:3px!important;margin:3px!important;color:#373a50!important;font-weight:700!important}mat-tab-group[_ngcontent-%COMP%]{width:100%;padding:0 15px}.option-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;overflow:auto;max-height:calc(100vh - 190px);padding-right:3px;margin-top:5px}.main[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;width:100%;height:calc(100vh - 109px);position:relative}@media screen and (max-width: 800px){[_nghost-%COMP%]{min-width:330px}}@media screen and (max-width: 700px){[_nghost-%COMP%]{min-width:270px}}@media screen and (max-width: 600px){[_nghost-%COMP%]{min-width:250px}}@media screen and (max-width: 500px){[_nghost-%COMP%]{width:100vw}}"]});var R=i(6705);function z(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"dropdown-option",6),t.NdJ("e",function(a){t.CHM(e);const p=t.oxw(3);return t.KtG(p.onSelect(a))}),t.qZA()}if(2&o){const e=n.$implicit,s=t.oxw(3);t.Q6J("text",e.desc)("details",e.code)("mentos",s.mentos(e))("data",e.code)}}function E(o,n){if(1&o&&(t.TgZ(0,"div",4),t.YNc(1,z,1,4,"dropdown-option",5),t.qZA()),2&o){const e=t.oxw().ngIf;t.xp6(1),t.Q6J("ngForOf",e)}}function X(o,n){if(1&o&&(t.TgZ(0,"div",2)(1,"h1"),t._uU(2,"Stops"),t.qZA(),t.YNc(3,E,2,1,"div",3),t.qZA()),2&o){const e=n.ngIf;t.xp6(3),t.Q6J("ngIf",e&&e.length>0)}}const V=function(){return["stops","map"]};class u{constructor(n,e,s){this.store=n,this.router=e,this.msg=s}ngOnInit(){this.stops$=this.store.select((0,r.rj)(""))}onSelect(n){this.router.navigate([{outlets:{sidebar:["stops",n]}}],{queryParams:{module:"stop_data"}})}filter(n){this.stops$=this.store.select((0,r.rj)(n))}mentos(n){return n&&n.lines?n.lines.split(","):[]}}u.\u0275fac=function(n){return new(n||u)(t.Y36(v.yh),t.Y36(f.F0),t.Y36(_._))},u.\u0275cmp=t.Xpm({type:u,selectors:[["stops-component"]],decls:3,vars:9,consts:[[3,"icon","placeholder","type","title","mapLink","onType"],["class","stop-dropdown",4,"ngIf"],[1,"stop-dropdown"],["class","list",4,"ngIf"],[1,"list"],[3,"text","details","mentos","data","e",4,"ngFor","ngForOf"],[3,"text","details","mentos","data","e"]],template:function(n,e){1&n&&(t.TgZ(0,"input-field",0),t.NdJ("onType",function(a){return e.filter(a)}),t.qZA(),t.YNc(1,X,4,1,"div",1),t.ALo(2,"async")),2&n&&(t.Q6J("icon","trip_origin")("placeholder","search stops")("type","start")("title","Stops")("mapLink",t.DdM(8,V)),t.xp6(1),t.Q6J("ngIf",t.lcZ(2,6,e.stops$)))},dependencies:[c.sg,c.O5,S.S,R.Q,c.Ov],styles:["[_nghost-%COMP%]{width:25vw;min-width:342px;display:flex;flex-direction:column;font-family:Lexend Deca,sans-serif;align-items:center}.stop-dropdown[_ngcontent-%COMP%]{width:100%;padding:20px}h1[_ngcontent-%COMP%]{margin-bottom:15px;color:#2b3b4c;font-family:Lexend Deca,sans-serif;font-weight:600;font-size:21px}.list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:15px;max-height:calc(100vh - 200px);overflow:auto;padding-right:10px}@media screen and (max-width: 800px){[_nghost-%COMP%]{min-width:330px}}@media screen and (max-width: 700px){[_nghost-%COMP%]{min-width:270px}}@media screen and (max-width: 600px){[_nghost-%COMP%]{min-width:250px}}@media screen and (max-width: 500px){[_nghost-%COMP%]{width:100vw}}"]});var W=i(3811);const k=function(){return[]};function q(o,n){if(1&o&&(t.ynx(0),t._UZ(1,"input-field",1),t.TgZ(2,"div",2)(3,"div",3),t._UZ(4,"map-area"),t.qZA()(),t.BQk()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("value",e.value)("icon","trip_origin")("type","start")("title","Stop details")("disabled",!0)("mapLink",t.DdM(6,k))}}class l{constructor(n,e,s){this.store=n,this.localStore=e,this.msg=s,this.value="Map"}ngOnInit(){this.localStore.fetchArrivals(this.store.select(r.k4).pipe((0,x.b)(n=>this.init(n)))),this.departures$=this.localStore.getArrivalState().pipe((0,x.b)(n=>this.msg.sendBusStatus(n)))}init(n){this.value=n?n.desc:"\u03a3\u03c4\u03ac\u03c3\u03b5\u03b9\u03c2"}}l.\u0275fac=function(n){return new(n||l)(t.Y36(v.yh),t.Y36(d),t.Y36(_._))},l.\u0275cmp=t.Xpm({type:l,selectors:[["stops-map"]],features:[t._Bn([d])],decls:2,vars:3,consts:[[4,"ngIf"],[3,"value","icon","type","title","disabled","mapLink"],[1,"main"],[1,"option-list"]],template:function(n,e){1&n&&(t.YNc(0,q,5,7,"ng-container",0),t.ALo(1,"async")),2&n&&t.Q6J("ngIf",t.lcZ(1,1,e.departures$))},dependencies:[c.O5,W.E,S.S,c.Ov],styles:["[_nghost-%COMP%]{width:25vw;min-width:342px;display:flex;flex-direction:column;align-items:center;height:100%}.main[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;width:100%;height:100%;padding:5px;height:calc(100vh - 109px);position:relative}.option-list[_ngcontent-%COMP%]{height:calc(100vh - 120px)}@media screen and (max-width: 800px){[_nghost-%COMP%]{min-width:330px}}@media screen and (max-width: 700px){[_nghost-%COMP%]{min-width:270px}}@media screen and (max-width: 600px){[_nghost-%COMP%]{min-width:250px}}@media screen and (max-width: 500px){[_nghost-%COMP%]{width:100vw}}"]});var Z=i(6835);const tt=[{path:"",component:u},{path:"map",component:l,canActivate:[Z.c]},{path:":stopCode",component:g},{path:":stopCode/map",component:l,canActivate:[Z.c]}];class m{}m.\u0275fac=function(n){return new(n||m)},m.\u0275mod=t.oAB({type:m}),m.\u0275inj=t.cJS({imports:[f.Bz.forChild(tt),f.Bz]});var nt=i(6658),et=i(4522);class h{}h.\u0275fac=function(n){return new(n||h)},h.\u0275mod=t.oAB({type:h}),h.\u0275inj=t.cJS({imports:[c.ez,et.R,m,nt.m,C.Nh]})}}]);