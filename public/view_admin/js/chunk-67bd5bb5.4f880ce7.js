(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67bd5bb5"],{"3f56":function(t,e,a){},b982:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"i-layout-page-header"},[a("PageHeader",{staticClass:"product_tabs",attrs:{"hidden-breadcrumb":""}},[a("div",{attrs:{slot:"title"},slot:"title"},[a("router-link",{attrs:{to:{path:"/admin/marketing/store_bargain/index"}}},[a("Button",{staticClass:"mr20",attrs:{icon:"ios-arrow-back",size:"small"}},[t._v("返回")])],1),a("span",{staticClass:"mr20",domProps:{textContent:t._s(t.$route.params.id?"编辑砍价商品":"添加砍价商品")}})],1)])],1),a("Card",{staticClass:"ivu-mt",attrs:{bordered:!1,"dis-hover":""}},[a("Row",{staticClass:"mt30 acea-row row-middle row-center",attrs:{type:"flex"}},[a("Col",{attrs:{span:"20"}},[a("Steps",{attrs:{current:t.current}},[a("Step",{attrs:{title:"选择砍价商品"}}),a("Step",{attrs:{title:"填写基础信息"}}),a("Step",{attrs:{title:"修改商品详情"}})],1)],1),a("Col",{attrs:{span:"23"}},[a("Form",{ref:"formValidate",staticClass:"form mt30",attrs:{rules:t.ruleValidate,model:t.formValidate,"label-width":t.labelWidth,"label-position":t.labelPosition},on:{"on-validate":t.validate},nativeOn:{submit:function(t){t.preventDefault()}}},[a("FormItem",{directives:[{name:"show",rawName:"v-show",value:0===t.current,expression:"current === 0"}],attrs:{label:"选择商品：",prop:"image_input"}},[a("div",{staticClass:"picBox",on:{click:t.changeGoods}},[t.formValidate.image?a("div",{staticClass:"pictrue"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.formValidate.image,expression:"formValidate.image"}]})]):a("div",{staticClass:"upLoad acea-row row-center-wrapper"},[a("Icon",{staticClass:"iconfonts",attrs:{type:"ios-camera-outline",size:"26"}})],1)])]),a("Row",{directives:[{name:"show",rawName:"v-show",value:1===t.current,expression:"current === 1"}],attrs:{type:"flex"}},[a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{prop:"image"}},[a("div",{staticClass:"custom-label",attrs:{slot:"label"},slot:"label"},[a("div",[a("div",[t._v("商品主图")]),a("div",[t._v("(750*750)")])]),a("div",[t._v("：")])]),a("div",{staticClass:"picBox",on:{click:function(e){return t.modalPicTap("dan","danFrom")}}},[t.formValidate.image?a("div",{staticClass:"pictrue"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.formValidate.image,expression:"formValidate.image"}]})]):a("div",{staticClass:"upLoad acea-row row-center-wrapper"},[a("Icon",{staticClass:"iconfonts",attrs:{type:"ios-camera-outline",size:"26"}})],1)])])],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{prop:"images"}},[a("div",{staticClass:"custom-label",attrs:{slot:"label"},slot:"label"},[a("div",[a("div",[t._v("商品轮播图")]),a("div",[t._v("(750*750)")])]),a("div",[t._v("：")])]),a("div",{staticClass:"acea-row"},[t._l(t.formValidate.images,(function(e,i){return a("div",{key:i,staticClass:"pictrue",attrs:{draggable:"true"},on:{dragstart:function(a){return t.handleDragStart(a,e)},dragover:function(a){return a.preventDefault(),t.handleDragOver(a,e)},dragenter:function(a){return t.handleDragEnter(a,e)},dragend:function(a){return t.handleDragEnd(a,e)}}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e,expression:"item"}]}),a("Button",{staticClass:"btndel",attrs:{shape:"circle",icon:"md-close"},nativeOn:{click:function(e){return t.handleRemove(i)}}})],1)})),t.formValidate.images.length<10?a("div",{staticClass:"upLoad acea-row row-center-wrapper",on:{click:function(e){return t.modalPicTap("duo")}}},[a("Icon",{staticClass:"iconfonts",attrs:{type:"ios-camera-outline",size:"26"}})],1):t._e()],2)])],1),a("Col",{attrs:{span:"24"}},[a("Col",t._b({},"Col",t.grid,!1),[a("FormItem",{attrs:{label:"砍价活动名称：",prop:"title","label-for":"title"}},[a("Input",{attrs:{placeholder:"请输入砍价活动名称","element-id":"title"},model:{value:t.formValidate.title,callback:function(e){t.$set(t.formValidate,"title",e)},expression:"formValidate.title"}})],1)],1)],1),a("Col",{attrs:{span:"24"}},[a("Col",t._b({},"Col",t.grid,!1),[a("FormItem",{attrs:{label:"砍价活动简介：",prop:"info","label-for":"info"}},[a("Input",{attrs:{placeholder:"请输入砍价活动简介",type:"textarea",rows:4,"element-id":"info"},model:{value:t.formValidate.info,callback:function(e){t.$set(t.formValidate,"info",e)},expression:"formValidate.info"}})],1)],1)],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"活动时间：",prop:"section_time"}},[a("div",{staticClass:"acea-row row-middle"},[a("DatePicker",{staticClass:"perW30",attrs:{editable:!1,type:"datetimerange",format:"yyyy-MM-dd HH:mm",placeholder:"请选择活动时间",value:t.formValidate.section_time},on:{"on-change":t.onchangeTime},model:{value:t.formValidate.section_time,callback:function(e){t.$set(t.formValidate,"section_time",e)},expression:"formValidate.section_time"}}),a("div",{staticClass:"ml10 grey"},[t._v("设置活动开启结束时间，用户可以在设置时间内发起参与砍价")])],1)])],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"运费模板：",prop:"temp_id"}},[a("div",{staticClass:"acea-row row-middle"},[a("Select",{staticClass:"perW35",model:{value:t.formValidate.temp_id,callback:function(e){t.$set(t.formValidate,"temp_id",e)},expression:"formValidate.temp_id"}},t._l(t.templateList,(function(e){return a("Option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.name))])})),1),a("div",{staticClass:"ml10 grey"},[a("router-link",{attrs:{to:{path:"/admin/setting/freight/shipping_templates/list"}}},[t._v("添加运费模板")])],1)],1)])],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"砍价人数：",prop:"people_num","label-for":"people_num"}},[a("div",{staticClass:"acea-row row-middle"},[a("InputNumber",{staticClass:"perW20",attrs:{placeholder:"请输入砍价人数","element-id":"people_num",min:1,precision:0},model:{value:t.formValidate.people_num,callback:function(e){t.$set(t.formValidate,"people_num",e)},expression:"formValidate.people_num"}}),a("div",{staticClass:"ml10 grey"},[t._v("需要多少人砍价成功")])],1)])],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"帮砍次数：",prop:"bargain_num","label-for":"bargain_num"}},[a("div",{staticClass:"acea-row row-middle"},[a("InputNumber",{staticClass:"perW20",attrs:{placeholder:"请输入帮砍次数","element-id":"bargain_num",min:1,precision:0},model:{value:t.formValidate.bargain_num,callback:function(e){t.$set(t.formValidate,"bargain_num",e)},expression:"formValidate.bargain_num"}}),a("div",{staticClass:"ml10 grey"},[t._v("单个商品用户可以帮砍的次数，例：次数设置为1，甲和乙同时将商品A的砍价链接发给丙，丙只能帮甲或乙其中一个人砍价")])],1)])],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"购买数量限制：",prop:"num"}},[a("div",{staticClass:"acea-row row-middle"},[a("InputNumber",{staticClass:"perW20",attrs:{placeholder:"购买数量限制",precision:0,min:1},model:{value:t.formValidate.num,callback:function(e){t.$set(t.formValidate,"num",e)},expression:"formValidate.num"}}),a("div",{staticClass:"ml10 grey"},[t._v("单个活动每个用户发起砍价次数限制")])],1)])],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"单位：",prop:"unit_name","label-for":"unit_name"}},[a("Input",{staticClass:"perW20",attrs:{placeholder:"请输入单位","element-id":"unit_name"},model:{value:t.formValidate.unit_name,callback:function(e){t.$set(t.formValidate,"unit_name",e)},expression:"formValidate.unit_name"}})],1)],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"排序："}},[a("InputNumber",{staticClass:"perW10",attrs:{placeholder:"请输入排序","element-id":"sort",precision:0},model:{value:t.formValidate.sort,callback:function(e){t.$set(t.formValidate,"sort",e)},expression:"formValidate.sort"}})],1)],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"活动状态：",props:"status","label-for":"status"}},[a("RadioGroup",{attrs:{"element-id":"status"},model:{value:t.formValidate.status,callback:function(e){t.$set(t.formValidate,"status",e)},expression:"formValidate.status"}},[a("Radio",{staticClass:"radio",attrs:{label:1}},[t._v("开启")]),a("Radio",{attrs:{label:0}},[t._v("关闭")])],1)],1)],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"规格选择："}},[a("Table",{attrs:{data:t.specsData,columns:t.columns,border:""},scopedSlots:t._u([{key:"pic",fn:function(e){e.row;var i=e.index;return[a("div",{staticClass:"acea-row row-middle row-center-wrapper",on:{click:function(e){return t.modalPicTap("dan","danTable",i)}}},[t.specsData[i].pic?a("div",{staticClass:"pictrue pictrueTab"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.specsData[i].pic,expression:"specsData[index].pic"}]})]):a("div",{staticClass:"upLoad pictrueTab acea-row row-center-wrapper"},[a("Icon",{staticClass:"iconfonts",attrs:{type:"ios-camera-outline",size:"21"}})],1)])]}},{key:"price",fn:function(e){e.row;var i=e.index;return[a("InputNumber",{staticClass:"priceBox",attrs:{min:0,"active-change":""},model:{value:t.specsData[i].price,callback:function(e){t.$set(t.specsData[i],"price",e)},expression:"specsData[index].price"}})]}},{key:"min_price",fn:function(e){e.row;var i=e.index;return[a("InputNumber",{staticClass:"priceBox",attrs:{min:0,"active-change":""},model:{value:t.specsData[i].min_price,callback:function(e){t.$set(t.specsData[i],"min_price",e)},expression:"specsData[index].min_price"}})]}},{key:"quota",fn:function(e){e.row;var i=e.index;return[a("InputNumber",{staticClass:"priceBox",attrs:{min:1,"active-change":""},model:{value:t.specsData[i].quota,callback:function(e){t.$set(t.specsData[i],"quota",e)},expression:"specsData[index].quota"}})]}}])})],1)],1)],1),a("div",{directives:[{name:"show",rawName:"v-show",value:2===t.current,expression:"current === 2"}]},[a("FormItem",{attrs:{label:"内容："}},[a("vue-ueditor-wrap",{key:1,staticStyle:{width:"90%"},attrs:{config:t.myConfig},on:{beforeInit:t.addCustomDialog},model:{value:t.formValidate.description,callback:function(e){t.$set(t.formValidate,"description",e)},expression:"formValidate.description"}})],1),a("FormItem",{attrs:{label:"规则："}},[a("vue-ueditor-wrap",{key:2,staticStyle:{width:"90%"},attrs:{config:t.myConfig},on:{beforeInit:t.addCustomDialog},model:{value:t.formValidate.rule,callback:function(e){t.$set(t.formValidate,"rule",e)},expression:"formValidate.rule"}})],1)],1),a("FormItem",[a("Button",{directives:[{name:"show",rawName:"v-show",value:0!==t.current,expression:"current!==0"}],staticClass:"submission mr15",attrs:{disabled:t.$route.params.id&&"0"!==t.$route.params.id&&1===t.current},on:{click:t.step}},[t._v("上一步")]),a("Button",{staticClass:"submission",attrs:{type:"primary",disabled:t.submitOpen&&2===t.current},domProps:{textContent:t._s(2===t.current?"提交":"下一步")},on:{click:function(e){return t.next("formValidate")}}})],1),t.spinShow?a("Spin",{attrs:{size:"large",fix:""}}):t._e()],1)],1)],1)],1),a("Modal",{staticClass:"paymentFooter",attrs:{title:"商品列表",footerHide:"",scrollable:"",width:"900"},on:{"on-cancel":t.cancel},model:{value:t.modals,callback:function(e){t.modals=e},expression:"modals"}},[a("goods-list",{ref:"goodslist",on:{getProductId:t.getProductId}})],1),a("Modal",{attrs:{width:"60%",scrollable:"","footer-hide":"",closable:"",title:"上传商品图","mask-closable":!1,"z-index":1},model:{value:t.modalPic,callback:function(e){t.modalPic=e},expression:"modalPic"}},[t.modalPic?a("uploadPictures",{attrs:{isChoice:t.isChoice,gridBtn:t.gridBtn,gridPic:t.gridPic},on:{getPic:t.getPic,getPicD:t.getPicD}}):t._e()],1)],1)},r=[],s=a("a34a"),n=a.n(s),o=a("2f62"),l=a("c4ad"),c=a("b0e7"),d=a("b7be"),m=a("c4c8"),u=a("6625"),p=a.n(u);function f(t,e,a,i,r,s,n){try{var o=t[s](n),l=o.value}catch(c){return void a(c)}o.done?e(l):Promise.resolve(l).then(i,r)}function g(t){return function(){var e=this,a=arguments;return new Promise((function(i,r){var s=t.apply(e,a);function n(t){f(s,i,r,n,o,"next",t)}function o(t){f(s,i,r,n,o,"throw",t)}n(void 0)}))}}function h(t){return _(t)||v(t)||b()}function b(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function v(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function _(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}function w(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function y(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?w(a,!0).forEach((function(e){C(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):w(a).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function C(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var V={name:"storeBargainCreate",components:{goodsList:l["default"],uploadPictures:c["a"],VueUeditorWrap:p.a},data:function(){return{submitOpen:!1,spinShow:!1,myConfig:{autoHeightEnabled:!1,initialFrameHeight:500,initialFrameWidth:"100%",UEDITOR_HOME_URL:"/admin/UEditor/",serverUrl:""},isChoice:"",current:0,modalPic:!1,grid:{xl:12,lg:20,md:24,sm:24,xs:24},grid2:{xl:8,lg:8,md:12,sm:24,xs:24},gridPic:{xl:6,lg:8,md:12,sm:12,xs:12},gridBtn:{xl:4,lg:8,md:8,sm:8,xs:8},modals:!1,modal_loading:!1,images:[],templateList:[],columns:[],specsData:[],formValidate:{images:[],info:"",title:"",store_name:"",image:"",unit_name:"",price:0,min_price:0,bargain_max_price:10,bargain_min_price:.01,cost:0,bargain_num:1,people_num:2,stock:1,sales:0,sort:0,num:1,give_integral:0,postage:0,is_postage:0,is_hot:0,status:0,section_time:[],description:"",rule:"",id:0,product_id:0,temp_id:"",attrs:[],items:[]},ruleValidate:{image:[{required:!0,message:"请选择主图",trigger:"change"}],images:[{required:!0,type:"array",message:"请选择主图",trigger:"change"},{type:"array",min:1,message:"Choose two hobbies at best",trigger:"change"}],title:[{required:!0,message:"请输入砍价活动名称",trigger:"blur"}],info:[{required:!0,message:"请输入砍价活动简介",trigger:"blur"}],store_name:[{required:!0,message:"请输入砍价商品名称",trigger:"blur"}],section_time:[{required:!0,type:"array",message:"请选择活动时间",trigger:"change"}],unit_name:[{required:!0,message:"请输入单位",trigger:"blur"}],price:[{required:!0,type:"number",message:"请输入原价",trigger:"blur"}],min_price:[{required:!0,type:"number",message:"请输入最低购买价",trigger:"blur"}],cost:[{required:!0,type:"number",message:"请输入成本价",trigger:"blur"}],bargain_num:[{required:!0,type:"number",message:"请输入帮砍次数",trigger:"blur"}],people_num:[{required:!0,type:"number",message:"请输入砍价人数",trigger:"blur"}],stock:[{required:!0,type:"number",message:"请输入库存",trigger:"blur"}],num:[{required:!0,type:"number",message:"请输入单次允许购买数量",trigger:"blur"}],temp_id:[{required:!0,message:"请选择运费模板",trigger:"change",type:"number"}]},currentid:"",picTit:"",tableIndex:0,copy:0}},computed:y({},Object(o["e"])("admin/layout",["isMobile"]),{labelWidth:function(){return this.isMobile?void 0:135},labelPosition:function(){return this.isMobile?"top":"right"}}),mounted:function(){"0"!==this.$route.params.id&&this.$route.params.id&&(this.copy=this.$route.params.copy,this.current=1,this.getInfo()),this.productGetTemplate()},methods:{productAttrs:function(t){var e=this,a=this;Object(d["O"])(t.id,2).then((function(t){var i=t.data.info,r={title:"选择",key:"chose",width:60,align:"center",render:function(t,a){var i=a.index,r=!1;r=e.currentid===i;var s=e;return t("div",[t("Radio",{props:{value:r},on:{"on-change":function(){s.currentid=i;var t=[];t.push(a.row),s.formValidate.attrs=t}}})])}};a.columns=i.header,a.columns.unshift(r),a.specsData=i.attrs,a.formValidate.items=i.items})).catch((function(t){a.$Message.error(t.msg)}))},productGetTemplate:function(){var t=this;Object(m["t"])().then((function(e){t.templateList=e.data}))},getProductId:function(t){var e=this;this.modal_loading=!1,this.modals=!1,setTimeout((function(){e.formValidate={images:t.slider_image,info:t.store_info,title:t.store_name,store_name:t.store_name,image:t.image,unit_name:t.unit_name,price:0,min_price:0,bargain_max_price:10,bargain_min_price:.01,cost:t.cost,bargain_num:1,people_num:2,stock:t.stock,sales:t.sales,sort:t.sort,num:1,give_integral:t.give_integral,postage:t.postage,is_postage:t.is_postage,is_hot:t.is_hot,status:0,section_time:[],description:t.description,rule:"",id:0,product_id:t.id,temp_id:t.temp_id},e.productAttrs(t)}),500)},cancel:function(){this.modals=!1},handleDragStart:function(t,e){this.dragging=e},handleDragEnd:function(t,e){this.dragging=null},handleDragOver:function(t){t.dataTransfer.dropEffect="move"},handleDragEnter:function(t,e){if(t.dataTransfer.effectAllowed="move",e!==this.dragging){var a=h(this.formValidate.images),i=a.indexOf(this.dragging),r=a.indexOf(e);a.splice.apply(a,[r,0].concat(h(a.splice(i,1)))),this.formValidate.images=a}},onchangeTime:function(t){this.formValidate.section_time=t},getInfo:function(){var t=this;this.spinShow=!0,Object(d["b"])(this.$route.params.id).then(function(){var e=g(n.a.mark((function e(a){var i,r,s,o;return n.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:i=t,r=a.data.info,t.formValidate=r,t.formValidate.rule=null===r.rule?"":r.rule,t.$set(t.formValidate,"items",r.attrs.items),t.columns=r.attrs.header,s={title:"选择",key:"chose",width:60,align:"center",render:function(e,a){var i=a.index,r=!1;r=t.currentid===i;var s=t;return e("div",[e("Radio",{props:{value:r},on:{"on-change":function(){s.currentid=i;var t=[];t.push(a.row),s.formValidate.attrs=t}}})])}},i.columns.unshift(s),t.specsData=r.attrs.value,o=[],r.attrs.value.forEach((function(t,e){t.opt&&(o.push(t),i.$set(i,"currentid",e),i.$set(i.formValidate,"attrs",o))})),t.spinShow=!1;case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.spinShow=!1,t.$Message.error(e.msg)}))},next:function(t){var e=this;if(2===this.current)this.$refs[t].validate((function(t){if(!t)return!1;if(""===e.currentid)return e.$Message.error("请选择属性规格");var a=e.specsData[e.currentid],i=e.formValidate.attrs[0];if(i.price=a.price,i.min_price=a.min_price,i.quota=a.quota,e.formValidate.attrs[0].quota<=0)return e.$Message.error("砍价限量必须大于0");1==e.copy&&(e.formValidate.copy=1),e.formValidate.id=e.$route.params.id||0,e.submitOpen=!0,Object(d["a"])(e.formValidate).then(function(){var t=g(n.a.mark((function t(a){return n.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.submitOpen=!1,e.$Message.success(a.msg),setTimeout((function(){e.$router.push({path:"/admin/marketing/store_bargain/index"})}),500);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.submitOpen=!1,e.$Message.error(t.msg)}))}));else{if(1==this.formValidate.people_num)return this.$Message.error("砍价人数必须大于1");if(this.formValidate.id&&0===parseInt(this.formValidate.status))return this.$Modal.confirm({title:"检测到您要下架该砍价商品",content:"下架将会删除前台用户已砍的所有记录，所有用户将重新发起砍价,您确定要这样操作吗？",okText:"我想好了，确定要下架",cancelText:"取消下架，活动状态改为开启",onOk:function(){e.current+=1},onCancel:function(){e.formValidate.status=1,e.current+=1}});if(!this.formValidate.image)return this.$Message.warning("请选择商品");this.current+=1}},step:function(){this.current--},getContent:function(t){this.formValidate.description=t},getRole:function(t){this.formValidate.rule=t},modalPicTap:function(t,e,a){this.modalPic=!0,this.isChoice="dan"===t?"单选":"多选",this.picTit=e,this.tableIndex=a},getPic:function(t){switch(this.picTit){case"danFrom":this.formValidate.image=t.att_dir;break;default:this.specsData[this.tableIndex].pic=t.att_dir,this.formValidate.attrs[0].pic=t.att_dir}this.modalPic=!1},getPicD:function(t){var e=this;this.images=t,this.images.map((function(t){e.formValidate.images.push(t.att_dir),e.formValidate.images=e.formValidate.images.splice(0,10)})),this.modalPic=!1},handleRemove:function(t){this.images.splice(t,1),this.formValidate.images.splice(t,1)},changeGoods:function(){this.modals=!0,this.$refs.goodslist.getList(),this.$refs.goodslist.goodsCategory()},validate:function(t,e,a){!1===e&&this.$Message.error(a)},addCustomDialog:function(t){window.UE.registerUI("test-dialog",(function(t,e){var a=new window.UE.ui.Dialog({iframeUrl:"/admin/widget.images/index.html?fodder=dialog",editor:t,name:e,title:"上传图片",cssRules:"width:1200px;height:500px;padding:20px;"});this.dialog=a;var i=new window.UE.ui.Button({name:"dialog-button",title:"上传图片",cssRules:"background-image: url(../../../assets/images/icons.png);background-position: -726px -77px;",onclick:function(){a.render(),a.open()}});return i}),37)}}},x=V,k=(a("f18d"),a("2877")),I=Object(k["a"])(x,i,r,!1,null,"9de2d7b8",null);e["default"]=I.exports},f18d:function(t,e,a){"use strict";var i=a("3f56"),r=a.n(i);r.a}}]);