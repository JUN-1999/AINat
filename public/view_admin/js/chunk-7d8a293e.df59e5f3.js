(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d8a293e"],{"075c":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"i-layout-page-header"},[a("PageHeader",{staticClass:"product_tabs",attrs:{"hidden-breadcrumb":""}},[a("div",{attrs:{slot:"title"},slot:"title"},[a("router-link",{attrs:{to:{path:"/admin/marketing/store_integral/index"}}},[a("Button",{staticClass:"mr20",attrs:{icon:"ios-arrow-back",size:"small"}},[t._v("返回")])],1),a("span",{staticClass:"mr20",domProps:{textContent:t._s(t.$route.params.id?"编辑积分商品":"添加积分商品")}})],1)])],1),a("Card",{staticClass:"ivu-mt",attrs:{bordered:!1,"dis-hover":""}},[a("Row",{staticClass:"mt30 acea-row row-middle row-center",attrs:{type:"flex"}},[a("Col",{attrs:{span:"20"}},[a("Steps",{attrs:{current:t.current}},[a("Step",{attrs:{title:"选择积分商品"}}),a("Step",{attrs:{title:"填写基础信息"}}),a("Step",{attrs:{title:"修改商品详情"}})],1)],1),a("Col",{attrs:{span:"23"}},[a("Form",{ref:"formValidate",staticClass:"form mt30",attrs:{model:t.formValidate,rules:t.ruleValidate,"label-width":t.labelWidth,"label-position":t.labelPosition},on:{"on-validate":t.validate},nativeOn:{submit:function(t){t.preventDefault()}}},[0===t.current?a("FormItem",{attrs:{label:"选择商品：",prop:"image_input"}},[a("div",{staticClass:"picBox",on:{click:t.changeGoods}},[t.formValidate.image?a("div",{staticClass:"pictrue"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.formValidate.image,expression:"formValidate.image"}]})]):a("div",{staticClass:"upLoad acea-row row-center-wrapper"},[a("Icon",{staticClass:"iconfonts",attrs:{type:"ios-camera-outline",size:"26"}})],1)])]):t._e(),a("Col",{directives:[{name:"show",rawName:"v-show",value:1===t.current,expression:"current === 1"}],attrs:{type:"flex"}},[a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{prop:"image"}},[a("div",{staticClass:"custom-label",attrs:{slot:"label"},slot:"label"},[a("div",[a("div",[t._v("商品主图")]),a("div",[t._v("(750*750)")])]),a("div",[t._v("：")])]),a("div",{staticClass:"picBox",on:{click:function(e){return t.modalPicTap("dan","danFrom")}}},[t.formValidate.image?a("div",{staticClass:"pictrue"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.formValidate.image,expression:"formValidate.image"}]})]):a("div",{staticClass:"upLoad acea-row row-center-wrapper"},[a("Icon",{staticClass:"iconfonts",attrs:{type:"ios-camera-outline",size:"26"}})],1)])])],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{prop:"images"}},[a("div",{staticClass:"custom-label",attrs:{slot:"label"},slot:"label"},[a("div",[a("div",[t._v("商品轮播图")]),a("div",[t._v("(750*750)")])]),a("div",[t._v("：")])]),a("div",{staticClass:"acea-row"},[t._l(t.formValidate.images,(function(e,i){return a("div",{key:i,staticClass:"pictrue",attrs:{draggable:"true"},on:{dragstart:function(a){return t.handleDragStart(a,e)},dragover:function(a){return a.preventDefault(),t.handleDragOver(a,e)},dragenter:function(a){return t.handleDragEnter(a,e)},dragend:function(a){return t.handleDragEnd(a,e)}}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e,expression:"item"}]}),a("Button",{staticClass:"btndel",attrs:{shape:"circle",icon:"md-close"},nativeOn:{click:function(e){return t.handleRemove(i)}}})],1)})),t.formValidate.images.length<10?a("div",{staticClass:"upLoad acea-row row-center-wrapper",on:{click:function(e){return t.modalPicTap("duo")}}},[a("Icon",{staticClass:"iconfonts",attrs:{type:"ios-camera-outline",size:"26"}})],1):t._e()],2)])],1),a("Col",{attrs:{span:"24"}},[a("Col",t._b({},"Col",t.grid,!1),[a("FormItem",{attrs:{label:"商品标题：",prop:"title","label-for":"title"}},[a("Input",{attrs:{placeholder:"请输入商品标题","element-id":"title"},model:{value:t.formValidate.title,callback:function(e){t.$set(t.formValidate,"title",e)},expression:"formValidate.title"}})],1)],1)],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"用户兑换数量限制：",prop:"num"}},[a("div",{staticClass:"acea-row row-middle"},[a("InputNumber",{staticClass:"perW20",attrs:{min:1,max:99999,placeholder:"请输入数量限制","element-id":"num",precision:0},model:{value:t.formValidate.num,callback:function(e){t.$set(t.formValidate,"num",e)},expression:"formValidate.num"}}),a("div",{staticClass:"ml10 grey"},[t._v("\n                    每个用户可购买该商品总数限制。例如设置为4，表示本活动,每个用户最多可兑换总数4个\n                  ")])],1)])],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"单位：",prop:"unit_name","label-for":"unit_name"}},[a("Input",{staticClass:"perW20",attrs:{placeholder:"请输入单位","element-id":"unit_name"},model:{value:t.formValidate.unit_name,callback:function(e){t.$set(t.formValidate,"unit_name",e)},expression:"formValidate.unit_name"}})],1)],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"排序："}},[a("InputNumber",{staticClass:"perW10",attrs:{placeholder:"请输入排序","element-id":"sort",precision:0},model:{value:t.formValidate.sort,callback:function(e){t.$set(t.formValidate,"sort",e)},expression:"formValidate.sort"}})],1)],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"上架状态：",props:"is_show","label-for":"status"}},[a("RadioGroup",{attrs:{"element-id":"is_show"},model:{value:t.formValidate.is_show,callback:function(e){t.$set(t.formValidate,"is_show",e)},expression:"formValidate.is_show"}},[a("Radio",{staticClass:"radio",attrs:{label:1}},[t._v("开启")]),a("Radio",{attrs:{label:0}},[t._v("关闭")])],1)],1)],1),a("Col",t._b({},"Col",t.grid2,!1),[a("FormItem",{attrs:{label:"热门推荐：",props:"is_host","label-for":"is_host"}},[a("RadioGroup",{attrs:{"element-id":"is_host"},model:{value:t.formValidate.is_host,callback:function(e){t.$set(t.formValidate,"is_host",e)},expression:"formValidate.is_host"}},[a("Radio",{staticClass:"radio",attrs:{label:1}},[t._v("开启")]),a("Radio",{attrs:{label:0}},[t._v("关闭")])],1)],1)],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"规格选择："}},[a("Table",{staticClass:"mt25",attrs:{data:t.specsData,columns:t.columns,border:"","highlight-row":""},on:{"on-selection-change":t.changeCheckbox},scopedSlots:t._u([{key:"pic",fn:function(e){var i=e.row,r=e.index;return[a("div",{staticClass:"acea-row row-middle row-center-wrapper",on:{click:function(e){return t.modalPicTap("dan","danTable",r)}}},[i.pic?a("div",{staticClass:"pictrue pictrueTab"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.pic,expression:"row.pic"}]})]):a("div",{staticClass:"upLoad pictrueTab acea-row row-center-wrapper"},[a("Icon",{staticClass:"iconfont",attrs:{type:"ios-camera-outline",size:"21"}})],1)])]}}])})],1)],1)],1),a("Row",{directives:[{name:"show",rawName:"v-show",value:2===t.current,expression:"current === 2"}]},[a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"内容："}},[a("vue-ueditor-wrap",{staticStyle:{width:"90%"},attrs:{config:t.myConfig},on:{beforeInit:t.addCustomDialog},model:{value:t.formValidate.description,callback:function(e){t.$set(t.formValidate,"description",e)},expression:"formValidate.description"}})],1)],1)],1),a("Col",{attrs:{span:"24"}},[a("FormItem",[a("Button",{directives:[{name:"show",rawName:"v-show",value:0!==t.current,expression:"current !== 0"}],staticClass:"submission mr15",attrs:{disabled:t.$route.params.id&&1===t.current},on:{click:t.step}},[t._v("上一步\n              ")]),a("Button",{staticClass:"submission",attrs:{disabled:t.submitOpen&&2===t.current,type:"primary"},domProps:{textContent:t._s(2===t.current?"提交":"下一步")},on:{click:function(e){return t.next("formValidate")}}})],1)],1)],1),t.spinShow?a("Spin",{attrs:{size:"large",fix:""}}):t._e()],1)],1)],1),a("Modal",{staticClass:"paymentFooter",attrs:{title:"商品列表",footerHide:"",scrollable:"",width:"900"},on:{"on-cancel":t.cancel},model:{value:t.modals,callback:function(e){t.modals=e},expression:"modals"}},[a("goods-list",{ref:"goodslist",on:{getProductId:t.getProductId}})],1),a("Modal",{attrs:{width:"60%",scrollable:"","footer-hide":"",closable:"",title:"上传商品图","mask-closable":!1,"z-index":1},model:{value:t.modalPic,callback:function(e){t.modalPic=e},expression:"modalPic"}},[t.modalPic?a("uploadPictures",{attrs:{isChoice:t.isChoice,gridBtn:t.gridBtn,gridPic:t.gridPic},on:{getPic:t.getPic,getPicD:t.getPicD}}):t._e()],1)],1)},r=[],s=a("a34a"),n=a.n(s),o=a("2f62"),l=a("c4ad"),c=a("ef0d"),d=a("6625"),u=a.n(d),m=a("b0e7"),p=a("b7be");function f(t){return v(t)||h(t)||g()}function g(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function h(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function v(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}function b(t,e,a,i,r,s,n){try{var o=t[s](n),l=o.value}catch(c){return void a(c)}o.done?e(l):Promise.resolve(l).then(i,r)}function w(t){return function(){var e=this,a=arguments;return new Promise((function(i,r){var s=t.apply(e,a);function n(t){b(s,i,r,n,o,"next",t)}function o(t){b(s,i,r,n,o,"throw",t)}n(void 0)}))}}function _(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function C(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?_(a,!0).forEach((function(e){y(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):_(a).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function y(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var x={name:"storeIntegralCreate",components:{UeditorWrap:c["a"],goodsList:l["default"],uploadPictures:m["a"],VueUeditorWrap:u.a},data:function(){return{submitOpen:!1,spinShow:!1,isChoice:"",current:0,modalPic:!1,grid:{xl:12,lg:20,md:24,sm:24,xs:24},grid2:{xl:8,lg:12,md:12,sm:24,xs:24},gridPic:{xl:6,lg:8,md:12,sm:12,xs:12},gridBtn:{xl:4,lg:8,md:8,sm:8,xs:8},myConfig:{autoHeightEnabled:!1,initialFrameHeight:500,initialFrameWidth:"100%",UEDITOR_HOME_URL:"/admin/UEditor/",serverUrl:""},modals:!1,modal_loading:!1,images:[],formValidate:{images:[],info:"",title:"",image:"",unit_name:"",price:0,ot_price:0,cost:0,sales:0,stock:0,sort:0,num:1,once_num:1,give_integral:0,postage:0,section_time:[],is_postage:0,is_hot:0,status:0,description:"",id:0,product_id:0,temp_id:"",time_id:"",attrs:[],items:[]},templateList:[],timeList:[],columns:[],specsData:[],picTit:"",tableIndex:0,ruleValidate:{image:[{required:!0,message:"请选择主图",trigger:"change"}],images:[{required:!0,type:"array",message:"请选择主图",trigger:"change"},{type:"array",min:1,message:"Choose two hobbies at best",trigger:"change"}],title:[{required:!0,message:"请输入商品标题",trigger:"blur"}],info:[{required:!0,message:"请输入积分活动简介",trigger:"blur"}],unit_name:[{required:!0,message:"请输入单位",trigger:"blur"}],price:[{required:!0,type:"number",message:"请输入兑换积分",trigger:"blur"}],ot_price:[{required:!0,type:"number",message:"请输入原价",trigger:"blur"}],cost:[{required:!0,type:"number",message:"请输入成本价",trigger:"blur"}],stock:[{required:!0,type:"number",message:"请输入库存",trigger:"blur"}],num:[{required:!0,type:"number",message:"请输入兑换数量限制",trigger:"blur"}],once_num:[{required:!0,type:"number",message:"请输入单次兑换数量限制",trigger:"blur"}]},copy:0}},computed:C({},Object(o["e"])("admin/layout",["isMobile"]),{labelWidth:function(){return this.isMobile?void 0:135},labelPosition:function(){return this.isMobile?"top":"right"}}),mounted:function(){this.$route.params.id&&(this.copy=this.$route.params.copy,this.current=1,this.getInfo())},methods:{productAttrs:function(t){var e=this;Object(p["O"])(t.id,4).then((function(t){var a=t.data.info,i={type:"selection",width:60,align:"center"};e.specsData=a.attrs,e.specsData.forEach((function(t,a){e.$set(e.specsData[a],"id",a)})),e.formValidate.items=a.items,e.columns=a.header,e.columns.unshift(i),e.inputChange(a)})).catch((function(t){e.$Message.error(t.msg)}))},inputChange:function(t){var e=this,a=[];t.header.forEach((function(t,e){1===t.type&&a.push({index:e,key:t.key,title:t.title})})),a.forEach((function(t,a){var i=t.title,r=t.key,s={title:i,key:r,align:"center",minWidth:120,render:function(t,a){return t("div",[t("InputNumber",{props:{min:0,max:99999,value:"price"===r?a.row.price:a.row.quota},on:{"on-change":function(t){"price"===r?a.row.price=t:a.row.quota=t,e.specsData[a.index]=a.row,e.formValidate.attrs&&e.formValidate.attrs.length&&e.formValidate.attrs.forEach((function(t,i){t.id===a.row.id&&e.formValidate.attrs.splice(i,1,a.row)}))}}})])}};e.columns.splice(t.index,1,s)}))},changeCheckbox:function(t){this.formValidate.attrs=t},validate:function(t,e,a){!1===e&&this.$Message.error(a)},getProductId:function(t){var e=this;this.modal_loading=!1,this.modals=!1,setTimeout((function(){e.formValidate={images:t.slider_image,info:t.store_info,title:t.store_name,image:t.image,unit_name:t.unit_name,price:0,ot_price:t.ot_price,cost:t.cost,sales:t.sales,stock:t.stock,sort:t.sort,num:1,once_num:1,give_integral:t.give_integral,postage:t.postage,section_time:[],is_postage:t.is_postage,is_host:0,is_show:1,description:t.description,id:0,product_id:t.id,temp_id:t.temp_id},e.productAttrs(t),e.$refs.goodslist.productRow=null}),500)},cancel:function(){this.modals=!1},onchangeTime:function(t){this.formValidate.section_time=t},getInfo:function(){var t=this;this.spinShow=!0,Object(p["C"])(this.$route.params.id).then(function(){var e=w(n.a.mark((function e(a){var i,r,s,o,l,c;return n.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(c in i=t,r=a.data.info,s={type:"selection",width:60,align:"center"},t.formValidate=r,t.$set(t.formValidate,"items",r.attrs.items),t.columns=r.attrs.header,t.columns.unshift(s),t.specsData=r.attrs.value,i.specsData.forEach((function(t,e){i.$set(i.specsData[e],"id",e)})),o=r.attrs,l=[],r.attrs.value)r.attrs.value[c]._checked&&l.push(r.attrs.value[c]);i.formValidate.attrs=l,i.inputChange(o),t.spinShow=!1;case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.spinShow=!1,t.$Message.error(e.msg)}))},next:function(t){var e=this,a=this;2===this.current?this.$refs[t].validate((function(t){if(!t)return!1;1==e.copy&&(e.formValidate.copy=1),e.formValidate.id=Number(e.$route.params.id)||0,e.submitOpen=!0,Object(p["z"])(e.formValidate).then(function(){var t=w(n.a.mark((function t(a){return n.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.submitOpen=!1,e.$Message.success(a.msg),setTimeout((function(){e.$router.push({path:"/admin/marketing/store_integral/index"})}),500);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.submitOpen=!1,e.$Message.error(t.msg)}))})):1===this.current?this.$refs[t].validate((function(t){if(!t)return e.$Message.warning("请完善您的信息");if(!a.formValidate.attrs)return a.$Message.error("请选择属性规格");for(var i in a.formValidate.attrs)if(a.formValidate.attrs[i].quota<=0)return a.$Message.error("商品限量必须大于0");e.current+=1})):this.formValidate.image?this.current+=1:this.$Message.warning("请选择商品")},step:function(){this.current--},getContent:function(t){this.formValidate.description=t},modalPicTap:function(t,e,a){this.modalPic=!0,this.isChoice="dan"===t?"单选":"多选",this.picTit=e,this.tableIndex=a},getPic:function(t){switch(this.picTit){case"danFrom":this.formValidate.image=t.att_dir;break;default:this.formValidate.attrs&&this.formValidate.attrs.length&&this.$set(this.specsData[this.tableIndex],"_checked",!0),this.specsData[this.tableIndex].pic=t.att_dir}this.modalPic=!1},getPicD:function(t){var e=this;this.images=t,this.images.map((function(t){e.formValidate.images.push(t.att_dir),e.formValidate.images=e.formValidate.images.splice(0,10)})),this.modalPic=!1},handleRemove:function(t){this.images.splice(t,1),this.formValidate.images.splice(t,1)},changeGoods:function(){this.modals=!0},handleDragStart:function(t,e){this.dragging=e},handleDragEnd:function(t,e){this.dragging=null},handleDragOver:function(t){t.dataTransfer.dropEffect="move"},handleDragEnter:function(t,e){if(t.dataTransfer.effectAllowed="move",e!==this.dragging){var a=f(this.formValidate.images),i=a.indexOf(this.dragging),r=a.indexOf(e);a.splice.apply(a,[r,0].concat(f(a.splice(i,1)))),this.formValidate.images=a}},addCustomDialog:function(t){window.UE.registerUI("test-dialog",(function(t,e){var a=new window.UE.ui.Dialog({iframeUrl:"/admin/widget.images/index.html?fodder=dialog",editor:t,name:e,title:"上传图片",cssRules:"width:1200px;height:500px;padding:20px;"});this.dialog=a;var i=new window.UE.ui.Button({name:"dialog-button",title:"上传图片",cssRules:"background-image: url(../../../assets/images/icons.png);background-position: -726px -77px;",onclick:function(){a.render(),a.open()}});return i}),37,t)}}},V=x,k=(a("2d27"),a("2877")),P=Object(k["a"])(V,i,r,!1,null,"0ea0c76a",null);e["default"]=P.exports},1344:function(t,e,a){},"2d27":function(t,e,a){"use strict";var i=a("1344"),r=a.n(i);r.a},ef0d:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("vue-ueditor-wrap",{staticStyle:{width:"90%"},attrs:{config:t.myConfig},on:{beforeInit:t.addCustomDialog},model:{value:t.contents,callback:function(e){t.contents=e},expression:"contents"}})],1)},r=[],s=a("6625"),n=a.n(s),o={name:"index",components:{VueUeditorWrap:n.a},props:{content:""},watch:{content:{handler:function(t){},deep:!0}},data:function(){return{contents:this.content,myConfig:{autoHeightEnabled:!1,initialFrameHeight:200,initialFrameWidth:"100%",UEDITOR_HOME_URL:"/admin/UEditor/",serverUrl:""}}},methods:{addCustomDialog:function(t){window.UE.registerUI("test-dialog",(function(t,e){var a=new window.UE.ui.Dialog({iframeUrl:"/admin/widget.images/index.html?fodder=dialog",editor:t,name:e,title:"上传图片",cssRules:"width:1200px;height:500px;padding:20px;"});this.dialog=a;var i=new window.UE.ui.Button({name:"dialog-button",title:"上传图片",cssRules:"background-image: url(../../../assets/images/icons.png);background-position: -726px -77px;",onclick:function(){a.render(),a.open()}});return i}),37,t)}},created:function(){}},l=o,c=a("2877"),d=Object(c["a"])(l,i,r,!1,null,"2fae1f2c",null);e["a"]=d.exports}}]);