"use strict";(self.webpackChunkRT_Ku=self.webpackChunkRT_Ku||[]).push([[434],{76434:function(e,t,n){n.r(t),n.d(t,{default:function(){return Se}});var a=n(50390),s=n(65814),i=n(83353),r=n(89914),l=n(63948),o=n(70971),c=n(83616),d=n(62559),u=function(){return(0,a.useEffect)((function(){return document.documentElement.setAttribute("data-footer","true"),function(){document.documentElement.removeAttribute("data-footer")}}),[]),(0,d.jsx)("footer",{children:(0,d.jsx)("div",{className:"footer-content",children:(0,d.jsx)(i.Z,{children:(0,d.jsxs)(r.Z,{children:[(0,d.jsx)(l.Z,{xs:"12",sm:"6",children:(0,d.jsx)("p",{className:"mb-0 text-muted text-medium",children:"Copyright @2022 CoconutsCode "})}),(0,d.jsx)(l.Z,{sm:"6",className:"d-none d-sm-block"})]})})})})},m=a.memo(u),h=n(97715),f=n.n(h),x=n(72971),p=n(5111),j=n(67291),v=n(92141),b=n(77412),g=n(52600),N=a.memo(a.forwardRef((function(e,t){var n=e.onClick,a=e.expanded,s=void 0!==a&&a,i=e.user,r=void 0===i?{}:i;return(0,d.jsxs)("a",{href:"#/!",ref:t,className:"d-flex user position-relative","data-toggle":"dropdown","aria-expanded":s,onClick:function(e){e.preventDefault(),e.stopPropagation(),n(e)},children:[(0,d.jsx)("img",{className:"profile",alt:r.name,src:r.thumb}),(0,d.jsx)("div",{className:"name",children:r.name})]})}))),w="NavUserMenu",Z=g.os.APP.endsWith("/")?g.os.APP.slice(1,g.os.APP.length):g.os.APP,k=function(){var e=(0,s.I0)(),t=(0,o.k6)(),n=(0,s.v9)((function(e){return e.auth})),i=n.isLogin,c=n.currentUser,u=(0,s.v9)((function(e){return e.settings})).color,m=(0,s.v9)((function(e){return e.layout})).showingNavMenu,h=function(){e((0,b.l)(""));var n="".concat(Z,"/login");t.push(n)},g=function(){return(0,d.jsxs)("div",{children:[(0,d.jsxs)(r.Z,{className:"mb-3 ms-0 me-0",children:[(0,d.jsx)(l.Z,{xs:"12",className:"ps-1 mb-2",children:(0,d.jsx)("div",{className:"text-extra-small text-primary",children:"ACCOUNT"})}),(0,d.jsx)(l.Z,{xs:"6",className:"ps-1 pe-1",children:(0,d.jsx)("ul",{className:"list-unstyled",children:(0,d.jsx)("li",{children:(0,d.jsx)("a",{href:"#/!",children:"User Info"})})})})]}),(0,d.jsxs)(r.Z,{className:"mb-1 ms-0 me-0",children:[(0,d.jsx)(l.Z,{xs:"12",className:"p-1 mb-3 pt-3",children:(0,d.jsx)("div",{className:"separator-light"})}),(0,d.jsx)(l.Z,{xs:"6",className:"ps-1 pe-1",children:(0,d.jsx)("ul",{className:"list-unstyled",children:(0,d.jsx)("li",{children:(0,d.jsxs)("a",{href:"#/!",children:[(0,d.jsx)(j.Z,{icon:"gear",className:"me-2",size:"17"})," ",(0,d.jsx)("span",{className:"align-middle",children:"Settings"})]})})})}),(0,d.jsx)(l.Z,{xs:"6",className:"pe-1 ps-1",children:(0,d.jsx)("ul",{className:"list-unstyled",children:(0,d.jsx)("li",{children:(0,d.jsxs)("a",{href:"#/!",onClick:h,children:[(0,d.jsx)(j.Z,{icon:"logout",className:"me-2",size:"17"})," ",(0,d.jsx)("span",{className:"align-middle",children:"Logout"})]})})})})]})]})},k=a.memo(a.forwardRef((function(e,t){var n=e.style,a=e.className;return(0,d.jsx)("div",{ref:t,style:n,className:f()("dropdown-menu dropdown-menu-end user-menu wide",a),children:(0,d.jsx)(g,{})})})));k.displayName="NavUserMenuDropdownMenu";var y=(0,s.v9)((function(e){return e.menu})),P=y.placementStatus.view,D=y.behaviourStatus.behaviourHtmlData,C=y.attrMobile,H=y.attrMenuAnimate;return(0,a.useEffect)((function(){e((0,v.b)(""))}),[H,D,C,u]),i?(0,d.jsxs)(p.Z,{as:"div",bsPrefix:"user-container d-flex",onToggle:function(t,n){n&&n.stopPropagation?n.stopPropagation():n&&n.originalEvent&&n.originalEvent.stopPropagation&&n.originalEvent.stopPropagation(),e((0,v.b)(t?w:""))},show:m===w,drop:"down",children:[(0,d.jsx)(p.Z.Toggle,{as:N,user:c}),(0,d.jsx)(p.Z.Menu,{as:k,className:"dropdown-menu dropdown-menu-end user-menu wide",popperConfig:{modifiers:[{name:"offset",options:{offset:function(){return P===x.PS.Horizontal?[0,7]:window.innerWidth<768?[-84,7]:[-78,7]}}}]}})]}):(0,d.jsx)(d.Fragment,{})},y=a.memo(k),P=n(70885),D=n(97482),C=n(6369),H=n(18373),S=n(17683),E=a.memo(a.forwardRef((function(e,t){var n=e.onClick,a=e.expanded,s=void 0!==a&&a;return(0,d.jsx)("a",{ref:t,href:"#/",className:"notification-button","data-toggle":"dropdown","aria-expanded":s,onClick:function(e){e.preventDefault(),e.stopPropagation(),n(e)},children:(0,d.jsxs)("div",{className:"position-relative d-inline-flex",children:[(0,d.jsx)(j.Z,{icon:"bell",size:"18"}),(0,d.jsx)("span",{className:"position-absolute notification-dot rounded-xl"})]})})}))),A=function(e){var t=e.img,n=void 0===t?"":t,a=e.link,s=void 0===a?"":a,i=e.detail,r=void 0===i?"":i;return(0,d.jsxs)("li",{className:"mb-3 pb-3 border-bottom border-separator-light d-flex",children:[(0,d.jsx)("img",{src:n,className:"me-3 sw-4 sh-4 rounded-xl align-self-center",alt:"notification"}),(0,d.jsx)("div",{className:"align-self-center",children:(0,d.jsx)(C.OL,{to:s,activeClassName:"",children:r})})]})},R=a.memo(a.forwardRef((function(e,t){var n=e.style,a=e.className,s=e.labeledBy,i=e.items;return(0,d.jsx)("div",{ref:t,style:n,className:f()("wide notification-dropdown scroll-out",a),"aria-labelledby":s,children:(0,d.jsx)(H.E,{options:{scrollbars:{autoHide:"leave",autoHideDelay:600},overflowBehavior:{x:"hidden",y:"scroll"}},className:"scroll",children:(0,d.jsx)("ul",{className:"list-unstyled border-last-none",children:i.map((function(e,t){return(0,d.jsx)(A,{detail:e.detail,link:e.link,img:e.img},"notificationItem.".concat(t))}))})})})})));R.displayName="NotificationsDropdownMenu";var L="Notifications",I=function(){var e=(0,s.I0)(),t=(0,s.v9)((function(e){return e.menu})),n=t.placementStatus.view,i=t.behaviourStatus.behaviourHtmlData,r=t.attrMobile,l=t.attrMenuAnimate,o=(0,s.v9)((function(e){return e.settings})).color,c=(0,s.v9)((function(e){return e.notification})).items,u=(0,s.v9)((function(e){return e.layout})).showingNavMenu;(0,a.useEffect)((function(){return e((0,S.nZ)()),function(){}}),[]);return(0,a.useEffect)((function(){e((0,v.b)(""))}),[l,i,r,o]),c&&c.length>0?(0,d.jsxs)(p.Z,{as:"li",bsPrefix:"list-inline-item",onToggle:function(t,n){n&&n.stopPropagation?n.stopPropagation():n&&n.originalEvent&&n.originalEvent.stopPropagation&&n.originalEvent.stopPropagation(),e((0,v.b)(t?L:""))},show:u===L,align:n===x.PS.Horizontal?"end":"start",children:[(0,d.jsx)(p.Z.Toggle,{as:E}),(0,d.jsx)(p.Z.Menu,{as:R,items:c,popperConfig:{modifiers:[{name:"offset",options:{offset:function(){return n===x.PS.Horizontal?[0,7]:window.innerWidth<768?[-168,7]:[-162,7]}}}]}})]}):(0,d.jsx)(d.Fragment,{})},M=a.memo(I),U=n(10060),T=n(1413),O=n(6059),z=n.n(O),F=n(74526),B=n(91082),V=n(51131),_=function(e){var t=e.show,n=e.setShow,i=(0,o.k6)(),r=(0,a.useRef)(null),l=(0,a.useState)(null),c=(0,P.Z)(l,2),u=c[0],m=c[1],h=(0,a.useState)(""),x=(0,P.Z)(h,2),p=x[0],j=x[1],v=(0,a.useState)(null),b=(0,P.Z)(v,2),N=b[0],w=b[1],Z=a.useRef(0),k=a.useRef({}),y=a.useRef(N),D=function(e){y.current=e,w(e)},C=(0,s.v9)((function(e){return e.auth})),H=C.isLogin,S=C.currentUser,E=(0,a.useMemo)((function(){return(0,B.l3)({data:V.Z,isLogin:H,userRole:S.role})()}),[H,S]),A=(0,F.Z)().formatMessage,R=function(e){e&&(n(!1),i.push(e))},L=function(e){if([38,40,13].includes(e.keyCode)){var t=Z.current,n=y.current;if(!(t<=0))if(null!==n)if(38===e.keyCode)D(n<=0?t-1:n-1);else if(40===e.keyCode)D(n>=t-1?0:n+1);else{var a=k.current;a&&R(a.path)}else D(0)}};return(0,a.useEffect)((function(){if(g.$V){var e=E.map((function(e){return(0,T.Z)((0,T.Z)({},e),{},{label:A({id:e.label||"menu.home"})})}));m(e)}else m(E);return document.addEventListener("keydown",L),function(){document.removeEventListener("keydown",L)}}),[]),(0,a.useEffect)((function(){t?setTimeout((function(){r.current.focus()}),0):j("")}),[t]),(0,a.useEffect)((function(){D(null),Z.current=0,k.current={}}),[p]),u?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("input",{ref:r,id:"searchPagesInput",className:"form-control form-control-xl borderless ps-0 pe-0 mb-1 auto-complete",type:"text",autoComplete:"off",onChange:function(e){return j(e.target.value)},value:p,placeholder:"Search for Pages",autoFocus:!0}),p.length>0&&(0,d.jsx)(z(),{query:p,data:u,options:{shouldSort:!0,includeMatches:!0,threshold:.6,location:0,distance:100,maxPatternLength:32,minMatchCharLength:1,keys:["label"]},children:function(e){var t=e.formattedResults,n=e.results;return Z.current=Math.min(t.length,10),k.current=null===N?{}:n[N].item,n.length>0?(0,d.jsx)("ul",{id:"searchPagesResults",className:"auto-complete-result",children:t.slice(0,10).map((function(e,t){return(0,d.jsxs)("li",{onClick:function(){return R(e.item.path)},className:f()("auto-complete-result-item",{autoComplete_selected:N===t}),children:[Array.isArray(e.formatted.label)?(0,d.jsx)("p",{className:"mb-0",children:e.formatted.label.map((function(e,t){return e.isHighlighted?(0,d.jsx)("span",{className:"autoComplete_highlighted",children:e.text},t):(0,d.jsx)("span",{children:e.text},t)}))}):(0,d.jsx)("p",{className:"mb-0",children:e.formatted.label}),(0,d.jsx)("p",{className:"text-small text-muted mb-0 ",children:e.item.path})]},t)}))}):(0,d.jsx)("ul",{id:"searchPagesResults",className:"auto-complete-result",children:(0,d.jsx)("li",{className:"no_resulst",children:"No Results"})})}})]}):(0,d.jsx)(d.Fragment,{})},G=function(e){var t=e.show,n=e.setShow;return(0,d.jsxs)(U.Z,{id:"searchPagesModal",className:"modal-under-nav modal-search modal-close-out",size:"lg",show:t,onHide:function(){return n(!1)},children:[(0,d.jsx)(U.Z.Header,{className:"border-0 p-0"}),(0,d.jsx)(U.Z.Body,{className:"ps-5 pe-5 pb-0 border-0",children:(0,d.jsx)(_,{show:t,setShow:n})}),(0,d.jsxs)(U.Z.Footer,{className:"border-top justify-content-start ps-5 pe-5 pb-3 pt-3 border-0",children:[(0,d.jsxs)("span",{className:"text-alternate d-inline-block m-0 me-3",children:[(0,d.jsx)(j.Z,{icon:"arrow-bottom",size:"15",className:"text-alternate align-middle me-1"}),(0,d.jsx)("span",{className:"align-middle text-medium",children:"Navigate"})]}),(0,d.jsxs)("span",{className:"text-alternate d-inline-block m-0 me-3",children:[(0,d.jsx)(j.Z,{icon:"arrow-bottom-left",size:"15",className:"text-alternate align-middle me-1"}),(0,d.jsx)("span",{className:"align-middle text-medium",children:"Select"})]})]})]})},W=n(71060),K=function(){var e=(0,s.v9)((function(e){return e.menu})),t=e.pinButtonEnable,n=e.behaviour,i=(0,s.v9)((function(e){return e.settings})).color,r=(0,s.I0)(),l=(0,a.useState)(!1),o=(0,P.Z)(l,2),c=o[0],u=o[1];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("ul",{className:"list-unstyled list-inline text-center menu-icons",children:[(0,d.jsx)("li",{className:"list-inline-item",children:(0,d.jsx)("a",{href:"#/",onClick:function(e){e.preventDefault(),u(!0)},children:(0,d.jsx)(j.Z,{icon:"search",size:"18"})})}),(0,d.jsx)("li",{className:"list-inline-item",children:(0,d.jsxs)("a",{href:"#/",id:"pinButton",onClick:t?function(e){return e.preventDefault(),e.stopPropagation(),t&&r((0,W.W4)(n===x.jt.Pinned?x.jt.Unpinned:x.jt.Pinned)),!1}:function(e){e.preventDefault(),e.stopPropagation()},className:f()("pin-button",{disabled:!t}),children:[(0,d.jsx)(j.Z,{icon:"lock-on",size:"18",className:"unpin"}),(0,d.jsx)(j.Z,{icon:"lock-off",size:"18",className:"pin"})]})}),(0,d.jsx)("li",{className:"list-inline-item",children:(0,d.jsxs)("a",{href:"#/",id:"colorButton",onClick:function(e){e.preventDefault(),e.stopPropagation(),r((0,D.yR)(i.includes("light")?i.replace("light","dark"):i.replace("dark","light")))},children:[(0,d.jsx)(j.Z,{icon:"light-on",size:"18",className:"light"}),(0,d.jsx)(j.Z,{icon:"light-off",size:"18",className:"dark"})]})}),(0,d.jsx)(M,{})]}),(0,d.jsx)(G,{show:c,setShow:u})]})},X=a.memo(K),$=n(74174),Y=n(4942),q=n(74307),Q=(0,a.memo)((0,a.forwardRef)((function(e,t){var n=e.children,a=e.onClick,s=e.href,i=void 0===s?"#":s,r=e.active,l=void 0!==r&&r;return(0,d.jsx)("a",{ref:t,className:f()("dropdown-toggle",{active:l}),"data-toggle":"dropdown",href:i,onClick:function(e){e.preventDefault(),a(e)},children:n})}))),J=(0,a.memo)((function(e){var t=e.item,n=e.id,i=e.isSubItem,r=void 0!==i&&i,l=e.menuPlacement,c=void 0===l?g.Z.MENU_PLACEMENT:l,u=(0,s.I0)(),m=(0,a.useRef)(),h=(0,s.v9)((function(e){return e.menu})).collapseAll,b=(0,s.v9)((function(e){return e.layout})).showingNavMenu,N=(0,o.TH)().pathname,w=!t.path.startsWith("#")&&(N===t.path||N.indexOf("".concat(t.path,"/"))>-1),Z=(0,F.Z)().formatMessage,k=(0,a.useState)(w),y=(0,P.Z)(k,2),D=y[0],H=y[1],S=(0,a.useState)(!1),E=(0,P.Z)(S,2),A=E[0],R=E[1],L=function(e,t){return(0,d.jsxs)(d.Fragment,{children:[e&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(j.Z,{icon:e,size:18,className:"cs-icon icon"})," "]}),(0,d.jsx)("span",{className:"label",children:g.$V?Z({id:t}):t})]})},I=function(e){R(e)};return(0,a.useEffect)((function(){""!==b&&A&&I(!1)}),[b,A]),t.subs&&c===x.PS.Horizontal&&!t.megaParent?(0,d.jsxs)(p.Z,{as:"li",onToggle:I,className:f()({mega:t.mega}),show:A,children:[(0,d.jsx)(p.Z.Toggle,{as:Q,onClick:function(){I(!A),u((0,v.b)(""))},href:t.path,active:w,children:L(t.icon,t.label)}),(0,d.jsx)(p.Z.Menu,{ref:m,renderOnMount:!0,as:"ul",align:"left",className:f()("opacityIn",(0,Y.Z)({"row align-items-start":t.mega},"row-cols-".concat(t.subs.length),t.mega)),popperConfig:{strategy:t.mega?"fixed":"absolute",modifiers:[{name:"computeStyles",options:{gpuAcceleration:!0,adaptive:!1,roundOffsets:function(e){var n=e.x,a=e.y;if(t.mega)try{return{x:Math.round((window.innerWidth-m.current.clientWidth)/2-8),y:a+7}}catch(s){console.warn("error:",s)}return r?{x:n,y:a-34}:{x:n,y:a+2}}}}]},children:(0,d.jsx)(ee,{menuItems:t.subs,menuPlacement:c,isSubItem:!0})})]},n):t.subs&&c===x.PS.Horizontal?(0,d.jsxs)("li",{className:"dropdown col d-flex flex-column",children:[(0,d.jsx)(C.OL,{to:t.path,className:f()("dropdown-toggle",{active:w}),children:L(t.icon,t.label)}),(0,d.jsx)("ul",{children:(0,d.jsx)(ee,{menuItems:t.subs,menuPlacement:c,isSubItem:!0})})]}):t.subs&&c===x.PS.Vertical?(0,d.jsxs)("li",{children:[(0,d.jsx)("a",{href:t.path,"data-bs-toggle":"collapse",role:"button",className:f()({active:w}),"aria-expanded":D&&!h,onClick:function(e){e.preventDefault(),e.stopPropagation(),H(!D),u((0,W.Vk)(!1))},children:L(t.icon,t.label)}),(0,d.jsx)(q.Z,{in:D&&!h,children:(0,d.jsx)("ul",{children:(0,d.jsx)(ee,{menuItems:t.subs,menuPlacement:c,isSubItem:!0})})})]}):t.isExternal?(0,d.jsx)("li",{children:(0,d.jsx)("a",{href:t.path,target:"_blank",rel:"noopener noreferrer",children:L(t.icon,t.label)})},n):r&&c!==x.PS.Vertical?c===x.PS.Horizontal&&t.megaParent?(0,d.jsx)("li",{className:"col d-flex flex-column",children:(0,d.jsx)(C.OL,{to:t.path,className:f()({active:w}),activeClassName:"",children:L(t.icon,t.label)})}):(0,d.jsx)(p.Z.Item,{as:"li",children:(0,d.jsx)(C.OL,{to:t.path,className:f()({active:w}),activeClassName:"",children:L(t.icon,t.label)})}):(0,d.jsx)("li",{children:(0,d.jsx)(C.OL,{to:t.path,className:f()({active:w}),activeClassName:"",children:L(t.icon,t.label)})})}));J.displayName="MainMenuItem";var ee=a.memo((function(e){var t=e.menuItems,n=void 0===t?[]:t,a=e.menuPlacement,s=void 0===a?g.Z.MENU_PLACEMENT:a,i=e.isSubItem,r=void 0!==i&&i;return n.map((function(e,t){return(0,d.jsx)(J,{id:e.path,item:e,menuPlacement:s,isSubItem:r},"menu.".concat(e.path,".").concat(t))}))}));ee.displayName="MainMenuItems";var te=a.memo(ee),ne=function(){var e=(0,s.I0)(),t=(0,s.v9)((function(e){return e.menu})),n=t.placement,i=t.behaviour,r=t.placementStatus,l=t.behaviourStatus,o=t.attrMobile,c=t.breakpoints,u=t.useSidebar,m=(0,s.v9)((function(e){return e.auth})),h=m.isLogin,p=m.currentUser,j=function(){var e=(0,a.useState)(!1),t=(0,P.Z)(e,2),n=t[0],s=t[1],i=!1,r=window.pageYOffset,l=function(){r=window.pageYOffset},o=function(){i=!0},c=function(){if(i){var e=window.pageYOffset;if(i=!1,Math.abs(r-e)<=80&&e>80)return void(r=e);r>e||e<=80?s(!1):r<=e&&e>80&&s(!0),r=e}};return(0,a.useEffect)((function(){var e=setInterval(c,200);return window.addEventListener("load",l),window.addEventListener("scroll",o),function(){clearInterval(e),window.removeEventListener("scroll",o),window.removeEventListener("load",l)}}),[]),n}(),b=(0,$.i)().width,g=(0,a.useMemo)((function(){return(0,B.vf)({data:o&&u?V.Z:V.Z.mainMenuItems,isLogin:h,userRole:p.role})}),[h,p,o,u]);(0,a.useEffect)((function(){e((0,W.D4)("")),e((0,v.b)("")),2!==r.status&&4!==r.status||(e((0,W.or)({})),e((0,W.dN)(!1))),1===l.status?(e((0,W.Vk)(!0)),e((0,W.HP)(!0))):2===l.status?(e((0,W.Vk)(!0)),e((0,W.HP)(!1))):3===l.status?(e((0,W.HP)(!0)),e((0,W.Vk)(!1))):4===l.status?(e((0,W.HP)(!1)),e((0,W.Vk)(!0))):(5===l.status||6===l.status)&&(e((0,W.Vk)(!1)),e((0,W.HP)(!0)))}),[l,r]),(0,a.useEffect)((function(){return r.placementHtmlData===x.PS.Vertical&&l.behaviourHtmlData===x.jt.Unpinned&&!0!==o&&(e((0,W.Vk)(!0)),e((0,W.D4)("hidden"))),function(){}}),[o]),(0,a.useEffect)((function(){return r.placementHtmlData!==x.PS.Horizontal||o||l.behaviourHtmlData!==x.jt.Unpinned||(j?(e((0,W.D4)("hidden")),document.documentElement.click()):e((0,W.D4)(""))),function(){}}),[j]);var N=(0,a.useCallback)((function(t,n,a){if(t){var s=function(e){var t=e.placement,n=e.breakpoints,a=window.innerWidth;return t===x.PS.Horizontal?n.horizontalMobile>a?{status:1,placementHtmlData:x.PS.Horizontal,dimensionHtmlData:x.XB.Mobile,view:x.PS.Vertical}:{status:2,placementHtmlData:x.PS.Horizontal,dimensionHtmlData:x.XB.Desktop,view:x.PS.Horizontal}:t===x.PS.Vertical?n.verticalMobile>a?{status:3,placementHtmlData:x.PS.Horizontal,dimensionHtmlData:x.XB.Mobile,view:x.PS.Vertical}:{status:4,placementHtmlData:x.PS.Vertical,dimensionHtmlData:x.XB.Desktop,view:x.PS.Vertical}:{status:0,placementHtmlData:"",dimensionHtmlData:"",view:""}}({placement:n,breakpoints:t}),i=function(e){var t=e.placement,n=e.behaviour,a=e.breakpoints,s=window.innerWidth;return t===x.PS.Vertical&&n===x.jt.Unpinned?a.verticalMobile>s||a.verticalUnpinned<=s?{status:1,behaviourHtmlData:a.verticalUnpinned!==a.verticalMobile?x.jt.Unpinned:x.jt.Pinned}:{status:2,behaviourHtmlData:x.jt.Unpinned}:t===x.PS.Vertical&&n===x.jt.Pinned?a.verticalMobile>s||a.verticalUnpinned<=s?{status:3,behaviourHtmlData:x.jt.Pinned}:{status:4,behaviourHtmlData:x.jt.Unpinned}:t===x.PS.Horizontal&&n===x.jt.Unpinned?{status:5,behaviourHtmlData:x.jt.Unpinned}:t===x.PS.Horizontal&&n===x.jt.Pinned?{status:6,behaviourHtmlData:x.jt.Pinned}:{status:0,behaviourHtmlData:""}}({placement:s.placementHtmlData,behaviour:a,breakpoints:t});c=r,((o=s).status!==c.status||o.placementHtmlData!==c.placementHtmlData||o.dimensionHtmlData!==c.dimensionHtmlData||o.view!==c.view)&&e((0,W.Hg)(s)),function(e,t){return e.status!==t.status||e.behaviourHtmlData!==t.behaviourHtmlData}(i,l)&&e((0,W.hD)(i))}var o,c}),[l,r,c]);return(0,a.useEffect)((function(){b&&n&&i&&c&&N(c,n,i)}),[b,c,n,i]),g?r.view===x.PS.Horizontal?(0,d.jsx)("div",{className:"menu-container flex-grow-1",children:(0,d.jsx)("ul",{id:"menu",className:f()("menu show"),children:(0,d.jsx)(te,{menuItems:g,menuPlacement:r.view})})}):(0,d.jsx)(H.E,{options:{scrollbars:{autoHide:"leave",autoHideDelay:600},overflowBehavior:{x:"hidden",y:"scroll"}},className:"menu-container flex-grow-1",children:(0,d.jsx)("ul",{id:"menu",className:f()("menu show"),children:(0,d.jsx)(te,{menuItems:g,menuPlacement:r.view})})}):(0,d.jsx)(d.Fragment,{})},ae=a.memo(ne),se=function(){return(0,d.jsx)("div",{className:"logo position-relative",children:(0,d.jsx)(C.rU,{to:g.os.APP,children:(0,d.jsx)("div",{className:"img"})})})},ie=a.memo(se),re=a.memo((function(e){var t=e.items;return(0,d.jsx)("ul",{className:"nav flex-column",children:t.map((function(e,t){return(0,d.jsxs)("li",{children:[(0,d.jsxs)("a",{className:"nav-link",href:"#".concat(e.id),children:[(0,d.jsx)(j.Z,{icon:"chevron-right"}),(0,d.jsx)("span",{className:"align-middle",children:e.text})]}),e.subs&&(0,d.jsx)("ul",{className:"nav flex-column",children:e.subs.map((function(e,t){return(0,d.jsx)("li",{children:(0,d.jsx)("a",{className:"nav-link",href:"#".concat(e.id),children:e.text})},t)}))})]},t)}))})}));re.displayName="ScrollspyContent";var le=a.forwardRef((function(e,t){var n=e.children,a=e.onClick;return(0,d.jsx)("a",{href:"#/!",ref:t,className:"spy-button text-white",onClick:function(e){e.preventDefault(),a(e)},children:n})}));le.displayName="ScrollspyToggle";n(68248);var oe=function(){var e=(0,s.I0)(),t=(0,s.v9)((function(e){return e.menu})),n=t.navClasses,i=t.placementStatus,r=t.behaviourStatus,l=t.attrMobile,o=t.menuPadding,c=(0,a.useRef)(null);return(0,d.jsxs)("div",{id:"nav",className:f()("nav-container d-flex",n),onMouseEnter:function(){c.current&&clearTimeout(c.current),c.current=setTimeout((function(){i.placementHtmlData===x.PS.Vertical&&r.behaviourHtmlData===x.jt.Unpinned&&!0!==l&&(e((0,W.Vk)(!1)),e((0,W.D4)("show")))}),80)},onMouseLeave:function(){c.current&&clearTimeout(c.current),c.current=setTimeout((function(){i.placementHtmlData===x.PS.Vertical&&r.behaviourHtmlData===x.jt.Unpinned&&!0!==l&&(e((0,W.Vk)(!0)),e((0,W.D4)("hidden")))}),80)},children:[(0,d.jsxs)("div",{className:"nav-content d-flex",style:i.placementHtmlData===x.PS.Horizontal&&o?{paddingRight:o}:{},children:[(0,d.jsx)(ie,{}),(0,d.jsx)(y,{}),(0,d.jsx)(X,{}),(0,d.jsx)(ae,{})]}),(0,d.jsx)("div",{className:"nav-shadow"})]})},ce=a.memo(oe),de=n(17466),ue=n(94167),me=n(35753),he=n(3976),fe=n(77025),xe=function(e){var t=e.label,n=void 0===t?"":t,a=e.children,s=e.noContainer,i=void 0!==s&&s;return(0,d.jsxs)("div",{className:"mb-5",children:[(0,d.jsx)("label",{className:"mb-3 d-inline-block",children:n}),i?a:(0,d.jsx)("div",{className:"row d-flex g-3 justify-content-between flex-wrap mb-3",children:a})]})},pe=function(e){var t=e.label,n=void 0===t?"":t,a=e.className,s=void 0===a?"w-50":a,i=e.active,r=void 0!==i&&i,l=e.onClick,o=void 0===l?function(){}:l,c=e.children;return(0,d.jsxs)("div",{onClick:o,className:f()("cursor-pointer flex-grow-1 option col",s,{active:r}),children:[c,(0,d.jsx)("div",{className:"text-muted text-part",children:(0,d.jsx)("span",{className:"text-extra-small align-middle",children:n})})]})},je=function(e){var t=e.handleClose,n=e.show,a=void 0!==n&&n,i=(0,s.I0)(),r=(0,s.v9)((function(e){return e.settings})),l=r.color,o=r.layout,c=r.radius,u=r.navColor,m=(0,s.v9)((function(e){return e.menu})),h=m.behaviour,f=m.placement,p=function(e,t){i(e(t))};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(U.Z,{show:a,id:"settings",onHide:t,className:"modal-right scroll-out-negative",dialogClassName:"full","aria-labelledby":"settings",tabIndex:"-1",scrollable:!0,children:[(0,d.jsxs)(U.Z.Header,{children:[(0,d.jsx)(U.Z.Title,{as:"h5",children:"Theme Settings"}),(0,d.jsx)("button",{type:"button",className:"btn-close",onClick:t})]}),(0,d.jsx)(U.Z.Body,{children:(0,d.jsxs)(H.E,{options:{overflowBehavior:{x:"hidden",y:"scroll"}},className:"scroll-track-visible",children:[(0,d.jsx)(xe,{label:"Color",noContainer:!0,children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"row d-flex g-3 justify-content-between flex-wrap mb-3",children:[(0,d.jsx)(pe,{label:"LIGHT BLUE",active:l===x.l1.LightBlue,onClick:function(){return p(D.yR,x.l1.LightBlue)},children:(0,d.jsx)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow color",children:(0,d.jsx)("div",{className:"blue-light"})})}),(0,d.jsx)(pe,{label:"DARK BLUE",active:l===x.l1.DarkBlue,onClick:function(){return p(D.yR,x.l1.DarkBlue)},children:(0,d.jsx)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow color",children:(0,d.jsx)("div",{className:"blue-dark"})})})]}),(0,d.jsxs)("div",{className:"row d-flex g-3 justify-content-between flex-wrap mb-3",children:[(0,d.jsx)(pe,{label:"LIGHT GREEN",active:l===x.l1.LightGreen,onClick:function(){return p(D.yR,x.l1.LightGreen)},children:(0,d.jsx)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow color",children:(0,d.jsx)("div",{className:"green-light"})})}),(0,d.jsx)(pe,{label:"DARK GREEN",active:l===x.l1.DarkGreen,onClick:function(){return p(D.yR,x.l1.DarkGreen)},children:(0,d.jsx)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow color",children:(0,d.jsx)("div",{className:"green-dark"})})})]}),(0,d.jsxs)("div",{className:"row d-flex g-3 justify-content-between flex-wrap mb-3",children:[(0,d.jsx)(pe,{label:"LIGHT PINK",active:l===x.l1.LightPink,onClick:function(){return p(D.yR,x.l1.LightPink)},children:(0,d.jsx)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow color",children:(0,d.jsx)("div",{className:"pink-light"})})}),(0,d.jsx)(pe,{label:"DARK PINK",active:l===x.l1.DarkPink,onClick:function(){return p(D.yR,x.l1.DarkPink)},children:(0,d.jsx)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow color",children:(0,d.jsx)("div",{className:"pink-dark"})})})]}),(0,d.jsxs)("div",{className:"row d-flex g-3 justify-content-between flex-wrap mb-3",children:[(0,d.jsx)(pe,{label:"LIGHT PURPLE",className:"w-50",active:l===x.l1.LightPurple,onClick:function(){return p(D.yR,x.l1.LightPurple)},children:(0,d.jsx)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow color",children:(0,d.jsx)("div",{className:"purple-light"})})}),(0,d.jsx)(pe,{label:"DARK PURPLE",active:l===x.l1.DarkPurple,onClick:function(){return p(D.yR,x.l1.DarkPurple)},children:(0,d.jsx)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow color",children:(0,d.jsx)("div",{className:"purple-dark"})})})]}),(0,d.jsxs)("div",{className:"row d-flex g-3 justify-content-between flex-wrap mb-3",children:[(0,d.jsx)(pe,{label:"LIGHT RED",active:l===x.l1.LightRed,onClick:function(){return p(D.yR,x.l1.LightRed)},children:(0,d.jsx)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow color",children:(0,d.jsx)("div",{className:"red-light"})})}),(0,d.jsx)(pe,{label:"DARK RED",active:l===x.l1.DarkRed,onClick:function(){return p(D.yR,x.l1.DarkRed)},children:(0,d.jsx)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow color",children:(0,d.jsx)("div",{className:"red-dark"})})})]})]})}),(0,d.jsx)(xe,{label:"Override Nav Palette",children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(pe,{label:"DEFAULT",className:"w-33",active:u===x.tr.Default,onClick:function(){return p(D.OO,x.tr.Default)},children:(0,d.jsxs)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary top"}),(0,d.jsx)(fe.Z,{className:"figure-secondary bottom"})]})}),(0,d.jsx)(pe,{label:"LIGHT",className:"w-33",active:u===x.tr.Light,onClick:function(){return p(D.OO,x.tr.Light)},children:(0,d.jsxs)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary figure-light top"}),(0,d.jsx)(fe.Z,{className:"figure-secondary bottom"})]})}),(0,d.jsx)(pe,{label:"DARK",className:"w-33",active:u===x.tr.Dark,onClick:function(){return p(D.OO,x.tr.Dark)},children:(0,d.jsxs)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary figure-dark top"}),(0,d.jsx)(fe.Z,{className:"figure-secondary bottom"})]})})]})}),(0,d.jsx)(xe,{label:"Menu Placement",children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(pe,{label:"HORIZONTAL",active:f===x.PS.Horizontal,onClick:function(){return p(W.$_,x.PS.Horizontal)},children:(0,d.jsxs)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary top"}),(0,d.jsx)(fe.Z,{className:"figure-secondary bottom"})]})}),(0,d.jsx)(pe,{label:"VERTICAL",active:f===x.PS.Vertical,onClick:function(){return p(W.$_,x.PS.Vertical)},children:(0,d.jsxs)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary left"}),(0,d.jsx)(fe.Z,{className:"figure-secondary right"})]})})]})}),(0,d.jsx)(xe,{label:"Menu Behaviour",children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(pe,{label:"PINNED",active:h===x.jt.Pinned,onClick:function(){return p(W.W4,x.jt.Pinned)},children:(0,d.jsxs)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary left large"}),(0,d.jsx)(fe.Z,{className:"figure-secondary right small"})]})}),(0,d.jsx)(pe,{label:"UNPINNED",active:h===x.jt.Unpinned,onClick:function(){return p(W.W4,x.jt.Unpinned)},children:(0,d.jsxs)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary left"}),(0,d.jsx)(fe.Z,{className:"figure-secondary right"})]})})]})}),(0,d.jsx)(xe,{label:"Layout",children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(pe,{label:"FLUID",active:o===x._.Fluid,onClick:function(){return p(D.PT,x._.Fluid)},children:(0,d.jsxs)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary top"}),(0,d.jsx)(fe.Z,{className:"figure-secondary bottom"})]})}),(0,d.jsx)(pe,{label:"BOXED",active:o===x._.Boxed,onClick:function(){return p(D.PT,x._.Boxed)},children:(0,d.jsxs)(he.Z,{className:"rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary top"}),(0,d.jsx)(fe.Z,{className:"figure-secondary bottom small"})]})})]})}),(0,d.jsx)(xe,{label:"Radius",children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(pe,{label:"ROUNDED",className:"w-33",active:c===x.OU.Rounded,onClick:function(){return p(D.h,x.OU.Rounded)},children:(0,d.jsxs)(he.Z,{className:"radius-rounded rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary top"}),(0,d.jsx)(fe.Z,{className:"figure-secondary bottom"})]})}),(0,d.jsx)(pe,{label:"STANDARD",className:"w-33",active:c===x.OU.Standard,onClick:function(){return p(D.h,x.OU.Standard)},children:(0,d.jsxs)(he.Z,{className:"radius-regular rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary top"}),(0,d.jsx)(fe.Z,{className:"figure-secondary bottom"})]})}),(0,d.jsx)(pe,{label:"FLAT",active:c===x.OU.Flat,onClick:function(){return p(D.h,x.OU.Flat)},children:(0,d.jsxs)(he.Z,{className:"radius-flat rounded-md p-3 mb-1 no-shadow",children:[(0,d.jsx)(fe.Z,{className:"figure-primary top"}),(0,d.jsx)(fe.Z,{className:"figure-secondary bottom"})]})})]})})]})})]})})},ve=function(e){var t=e.title,n=void 0===t?"":t,a=e.img,s=void 0===a?"":a,i=e.urls,r=void 0===i?{html:"",laravel:"",dotnet:"",react:""}:i;return(0,d.jsxs)("div",{className:"mb-5",children:[(0,d.jsx)("label",{className:"mb-2 d-inline-block form-label",children:n}),(0,d.jsx)("div",{className:"hover-reveal-buttons position-relative hover-reveal cursor-default",children:(0,d.jsx)("div",{className:"position-relative mb-3 mb-lg-5 rounded-sm",children:(0,d.jsx)("a",{target:"_blank",href:r.react,rel:"noreferrer",children:(0,d.jsx)("img",{src:s,className:"img-fluid rounded-sm lower-opacity",alt:n})})})})]})},be=function(e){var t=e.handleClose,n=e.show,a=void 0!==n&&n;return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(U.Z,{show:a,id:"settings",onHide:t,className:"modal-right scroll-out-negative",dialogClassName:"full","aria-labelledby":"settings",tabIndex:"-1",scrollable:!0,children:[(0,d.jsxs)(U.Z.Header,{children:[(0,d.jsx)(U.Z.Title,{as:"h5",children:"Niches"}),(0,d.jsx)("button",{type:"button",className:"btn-close",onClick:t})]}),(0,d.jsx)(U.Z.Body,{children:(0,d.jsxs)(H.E,{options:{overflowBehavior:{x:"hidden",y:"scroll"}},className:"scroll-track-visible",children:[(0,d.jsx)(ve,{title:"Classic Dashboard",img:"https://acorn.coloredstrategies.com/img/page/classic-dashboard.webp",urls:{react:"https://acorn-react-classic-dashboard.coloredstrategies.com/"}}),(0,d.jsx)(ve,{title:"Ecommerce Platform",img:"https://acorn.coloredstrategies.com/img/page/ecommerce-platform.webp",urls:{react:"https://acorn-react-ecommerce-platform.coloredstrategies.com/"}}),(0,d.jsx)(ve,{title:"Elearning Portal",img:"https://acorn.coloredstrategies.com/img/page/elearning-portal.webp",urls:{react:"https://acorn-react-elearning-portal.coloredstrategies.com/"}}),(0,d.jsx)(ve,{title:"Service Provider",img:"https://acorn.coloredstrategies.com/img/page/service-provider.webp",urls:{react:"https://acorn-react-service-provider.coloredstrategies.com/"}}),(0,d.jsx)(ve,{title:"Starter Project",img:"https://acorn.coloredstrategies.com/img/page/starter-project.webp",urls:{react:"https://acorn-react-starter-project.coloredstrategies.com/"}})]})})]})})},ge=function(){var e=(0,a.useState)(!1),t=(0,P.Z)(e,2),n=t[0],s=t[1],i=(0,a.useState)(!1),r=(0,P.Z)(i,2),l=r[0],o=r[1];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"settings-buttons-container",children:[(0,d.jsx)(de.Z,{delay:{show:1e3,hide:0},overlay:(0,d.jsx)(ue.Z,{children:"Settings"}),placement:"left",children:(0,d.jsx)(me.Z,{variant:"primary",className:"settings-button p-0",onClick:function(){s(!0)},children:(0,d.jsx)("span",{children:(0,d.jsx)(j.Z,{icon:"paint-roller",className:"position-relative"})})})}),(0,d.jsx)(de.Z,{delay:{show:1e3,hide:0},overlay:(0,d.jsx)(ue.Z,{children:"Niches"}),placement:"left",children:(0,d.jsx)(me.Z,{variant:"primary",className:"settings-button p-0",onClick:function(){o(!0)},children:(0,d.jsx)("span",{children:(0,d.jsx)(j.Z,{icon:"toy",className:"position-relative"})})})}),(0,d.jsx)(de.Z,{delay:{show:1e3,hide:0},overlay:(0,d.jsx)(ue.Z,{children:"Purchase"}),placement:"left",children:(0,d.jsx)(me.Z,{variant:"primary",href:"https://themeforest.net/item/acorn-react-admin-template/33951408",rel:"noreferrer",target:"_blank",className:"settings-button p-0",children:(0,d.jsx)("span",{children:(0,d.jsx)(j.Z,{icon:"cart",className:"position-relative"})})})})]}),(0,d.jsx)(je,{show:n,handleClose:function(){s(!1),document.documentElement.click()}}),(0,d.jsx)(be,{show:l,handleClose:function(){o(!1),document.documentElement.click()}})]})},Ne=a.memo((function(e){var t=e.menuItems;return(void 0===t?[]:t).map((function(e,t){return(0,d.jsx)(we,{id:e.path,item:e},"menu.".concat(e.path,".").concat(t))}))}));Ne.displayName="SidebarMenuItems";var we=function(e){var t=e.item,n=e.id,a=(0,o.TH)().pathname,s=(0,F.Z)().formatMessage,i=!t.path.startsWith("#")&&(a===t.path||a.indexOf("".concat(t.path,"/"))>-1),r=function(e,t){return(0,d.jsxs)(d.Fragment,{children:[e&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(j.Z,{icon:e,className:"cs-icon icon"})," "]}),(0,d.jsx)("span",{className:"label",children:g.$V?s({id:t}):t})]})};return t.subs?(0,d.jsxs)("li",{children:[(0,d.jsx)(C.OL,{to:t.path,className:f()({active:i}),"data-bs-target":t.path,children:r(t.icon,t.label)}),(0,d.jsx)("ul",{children:(0,d.jsx)(Ne,{menuItems:t.subs})})]}):t.isExternal?(0,d.jsx)("li",{children:(0,d.jsx)("a",{href:t.path,target:"_blank",rel:"noopener noreferrer",children:r(t.icon,t.label)})},n):t.isButton?(0,d.jsx)("li",{children:(0,d.jsx)("a",{href:t.path,onClick:function(){t.onClick()},children:r(t.icon,t.label)})}):(0,d.jsx)("li",{children:(0,d.jsx)(C.OL,{to:t.path,className:f()({active:i}),activeClassName:"",children:r(t.icon,t.label)})})},Ze=Ne,ke=function(){var e=(0,s.v9)((function(e){return e.auth})),t=e.isLogin,n=e.currentUser,i=(0,s.v9)((function(e){return e.menu})).useSidebar,r=(0,a.useMemo)((function(){return(0,B.vf)({data:V.Z.sidebarItems,isLogin:t,userRole:n.role})}),[t,n]);return!0===!i?(0,d.jsx)(d.Fragment,{}):(0,d.jsx)(l.Z,{xs:"auto",className:"side-menu-container",children:(0,d.jsx)("ul",{className:"sw-25 side-menu mb-0 primary",id:"menuSide",children:(0,d.jsx)(Ze,{menuItems:r})})})},ye=function(e){var t=e.children;(0,c.Z)();var n=(0,o.TH)().pathname;return(0,a.useEffect)((function(){document.documentElement.click(),window.scrollTo(0,0)}),[n]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(ce,{}),(0,d.jsx)("main",{children:(0,d.jsx)(i.Z,{children:(0,d.jsxs)(r.Z,{className:"h-100",children:[(0,d.jsx)(ke,{}),(0,d.jsx)(l.Z,{className:"h-100",id:"contentArea",children:t})]})})}),(0,d.jsx)(m,{}),(0,d.jsx)(ge,{})]})},Pe=a.memo(ye),De=n(80515),Ce=n(68970),He=n(88410),Se=function(){var e=(0,s.v9)((function(e){return e.auth})),t=e.currentUser,n=e.isLogin,i=(0,a.useMemo)((function(){return(0,B.sQ)({data:V.Z,isLogin:n,userRole:t.role})}),[n,t]);return i?(0,d.jsxs)(Pe,{children:[(0,d.jsx)(He.Ix,{position:"top-right",autoClose:2e3,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,rtl:!1,pauseOnHover:!0}),(0,d.jsx)(De.Z,{routes:i,fallback:(0,d.jsx)(Ce.Z,{})})]}):(0,d.jsx)(d.Fragment,{})}},83616:function(e,t,n){n.d(t,{Z:function(){return d}});var a=n(50390),s=n(65814),i=n(97482),r=n(71060),l=n(70885),o={config:{attributes:!0,childList:!1,subtree:!1}},c=function(){var e=(0,s.I0)(),t=(0,a.useCallback)((function(t){Array.isArray(t)&&t.map((function(t){"attributes"===t.type&&"style"===t.attributeName&&e((0,r.dg)(t.target.style.paddingRight.indexOf("px")>-1?parseInt(t.target.style.paddingRight.replace("px",""),10):""))}))}),[e]);return function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o,s=(0,a.useState)(null),i=(0,l.Z)(s,2),r=i[0],c=i[1];(0,a.useEffect)((function(){var e=new MutationObserver(t);c(e)}),[t,n,c]),(0,a.useEffect)((function(){if(r){var t=n.config;return r.observe(e,t),function(){r&&r.disconnect()}}}),[r,e,n])}(document.body,t),!0},d=function(){var e=(0,s.v9)((function(e){return e.settings})),t=e.color,n=e.layout,r=e.radius,l=e.navColor,o=(0,s.I0)(),d=(0,s.v9)((function(e){return e.menu})),u=d.attrMenuAnimate,m=d.attrMobile,h=d.placementStatus,f=h.placementHtmlData,x=h.dimensionHtmlData,p=d.behaviourStatus.behaviourHtmlData;c();var j=document.documentElement;return(0,a.useEffect)((function(){return setTimeout((function(){o((0,i.It)()),j.setAttribute("data-show","true")}),30),j.setAttribute("data-color",t),j.setAttribute("data-layout",n),j.setAttribute("data-radius",r),j.setAttribute("data-navcolor",l),j.setAttribute("data-placement",f),j.setAttribute("data-dimension",x),j.setAttribute("data-behaviour",p),function(){j.removeAttribute("data-color"),j.removeAttribute("data-layout"),j.removeAttribute("data-radius"),j.removeAttribute("data-navcolor"),j.removeAttribute("data-show"),j.removeAttribute("data-placement"),j.removeAttribute("data-behaviour"),j.removeAttribute("data-dimension")}}),[]),(0,a.useEffect)((function(){j.setAttribute("data-placement",f),j.setAttribute("data-dimension",x),j.setAttribute("data-behaviour",p),j.setAttribute("data-navcolor",l),j.setAttribute("data-radius",r),j.setAttribute("data-color",t),j.setAttribute("data-layout",n)}),[j,f,x,p,l,r,t,n]),(0,a.useEffect)((function(){u?j.setAttribute("data-menu-animate",u):j.removeAttribute("data-menu-animate")}),[j,u]),(0,a.useEffect)((function(){m?j.setAttribute("data-mobile",m):j.removeAttribute("data-mobile")}),[j,m]),!0}}}]);
//# sourceMappingURL=434.088cd424.chunk.js.map