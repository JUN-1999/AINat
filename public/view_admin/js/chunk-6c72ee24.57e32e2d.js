(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c72ee24"],{"6c24":function(t,e,a){"use strict";var i=a("8c31"),n=a.n(i);n.a},"6fd3":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Modal",{attrs:{scrollable:"",title:"添加商品规格",width:"950"},on:{"on-cancel":t.onCancel},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[a("Form",{ref:"formDynamic",staticClass:"attrFrom",attrs:{model:t.formDynamic,rules:t.rules,"label-width":t.labelWidth,"label-position":t.labelPosition},nativeOn:{submit:function(t){t.preventDefault()}}},[a("Row",{attrs:{gutter:24}},[a("Col",{attrs:{span:"24"}},[a("Col",{staticClass:"mb15",attrs:{span:"8"}},[a("FormItem",{attrs:{label:"规格模板名称：",prop:"rule_name"}},[a("Input",{attrs:{placeholder:"请输入标题名称",maxlength:20},model:{value:t.formDynamic.rule_name,callback:function(e){t.$set(t.formDynamic,"rule_name",e)},expression:"formDynamic.rule_name"}})],1)],1)],1),t._l(t.formDynamic.spec,(function(e,i){return a("Col",{key:i,staticClass:"noForm",attrs:{span:"23"}},[a("FormItem",[a("div",{staticClass:"acea-row row-middle"},[a("span",{staticClass:"mr5"},[t._v(t._s(e.value))]),a("Icon",{attrs:{type:"ios-close-circle"},on:{click:function(e){return t.handleRemove(i)}}})],1),a("div",{staticClass:"rulesBox"},[t._l(e.detail,(function(i,n){return a("Tag",{key:n,staticClass:"mb5",attrs:{type:"dot",closable:"",color:"primary",name:i},on:{"on-close":function(a){return t.handleRemove2(e.detail,n)}}},[t._v(t._s(i))])})),a("Input",{staticStyle:{width:"150px"},attrs:{search:"","enter-button":"添加",placeholder:"请输入属性名称"},on:{"on-search":function(a){return t.createAttr(e.detail.attrsVal,i)}},model:{value:e.detail.attrsVal,callback:function(a){t.$set(e.detail,"attrsVal",a)},expression:"item.detail.attrsVal"}})],2)])],1)})),t.isBtn?a("Col",{staticClass:"mt10",attrs:{span:"24"}},[a("Col",{staticClass:"mr15",attrs:{span:"8"}},[a("FormItem",{attrs:{label:"规格名称："}},[a("Input",{attrs:{placeholder:"请输入规格"},model:{value:t.attrsName,callback:function(e){t.attrsName=e},expression:"attrsName"}})],1)],1),a("Col",{staticClass:"mr20",attrs:{span:"8"}},[a("FormItem",{attrs:{label:"规格值："}},[a("Input",{attrs:{placeholder:"请输入规格值"},model:{value:t.attrsVal,callback:function(e){t.attrsVal=e},expression:"attrsVal"}})],1)],1),a("Col",{attrs:{span:"2"}},[a("Button",{attrs:{type:"primary"},on:{click:t.createAttrName}},[t._v("确定")])],1),a("Col",{attrs:{span:"2"}},[a("Button",{on:{click:t.offAttrName}},[t._v("取消")])],1)],1):t._e(),t.spinShow?a("Spin",{attrs:{size:"large",fix:""}}):t._e()],2),t.isBtn?t._e():a("Button",{staticClass:"ml95 mt10",attrs:{type:"primary",icon:"md-add"},on:{click:t.addBtn}},[t._v("添加新规格")])],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"primary",loading:t.modal_loading},on:{click:function(e){return t.handleSubmit("formDynamic")}}},[t._v("确定")])],1)],1)},n=[],s=a("2f62"),r=a("c4c8");function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(a,!0).forEach((function(e){c(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(a).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function c(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var u={name:"addAttr",data:function(){return{spinShow:!1,modal_loading:!1,grid:{xl:3,lg:3,md:12,sm:24,xs:24},modal:!1,index:1,rules:{rule_name:[{required:!0,message:"请输入规格名称",trigger:"blur"}]},formDynamic:{rule_name:"",spec:[]},attrsName:"",attrsVal:"",formDynamicNameData:[],isBtn:!1,formDynamicName:[],results:[],result:[],ids:0}},computed:l({},Object(s["e"])("admin/layout",["isMobile"]),{labelWidth:function(){return this.isMobile?void 0:95},labelPosition:function(){return this.isMobile?"top":"right"}}),methods:{onCancel:function(){this.clear()},addBtn:function(){this.isBtn=!0},getIofo:function(t){var e=this;this.spinShow=!0,this.ids=t.id,Object(r["A"])(t.id).then((function(t){e.formDynamic=t.data.info,e.spinShow=!1})).catch((function(t){e.spinShow=!1,e.$Message.error(t.msg)}))},handleSubmit:function(t){var e=this;this.$refs[t].validate((function(t){return!!t&&(0===e.formDynamic.spec.length?e.$Message.warning("请至少添加一条商品规格！"):(e.modal_loading=!0,void setTimeout((function(){Object(r["z"])(e.formDynamic,e.ids).then((function(t){e.$Message.success(t.msg),setTimeout((function(){e.modal=!1,e.modal_loading=!1}),500),setTimeout((function(){e.$emit("getList"),e.clear()}),600)})).catch((function(t){e.modal_loading=!1,e.$Message.error(t.msg)}))}),1200)))}))},clear:function(){this.$refs["formDynamic"].resetFields(),this.formDynamic.spec=[],this.isBtn=!1,this.attrsName="",this.attrsVal=""},offAttrName:function(){this.isBtn=!1},handleRemove:function(t){this.formDynamic.spec.splice(t,1)},handleRemove2:function(t,e){t.splice(e,1)},createAttrName:function(){if(this.attrsName&&this.attrsVal){var t={value:this.attrsName,detail:[this.attrsVal]};this.formDynamic.spec.push(t);var e={};this.formDynamic.spec=this.formDynamic.spec.reduce((function(t,a){return!e[a.value]&&(e[a.value]=t.push(a)),t}),[]),this.attrsName="",this.attrsVal="",this.isBtn=!1}else this.$Message.warning("请添加规格名称或规格值")},createAttr:function(t,e){if(console.log(this.formDynamic.spec),t){this.formDynamic.spec[e].detail.push(t);var a={};this.formDynamic.spec[e].detail=this.formDynamic.spec[e].detail.reduce((function(t,e){return!a[e]&&(a[e]=t.push(e)),t}),[])}else this.$Message.warning("请添加属性")}}},d=u,h=(a("6c24"),a("2877")),m=Object(h["a"])(d,i,n,!1,null,"1e6d3a79",null);e["a"]=m.exports},"7f08":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"i-layout-page-header"},[a("PageHeader",{staticClass:"product_tabs",attrs:{title:"商品规格","hidden-breadcrumb":""}})],1),a("Card",{staticClass:"ivu-mt",attrs:{bordered:!1,"dis-hover":""}},[a("Form",{ref:"artFrom",staticClass:"tabform",attrs:{model:t.artFrom,"label-width":t.labelWidth,"label-position":t.labelPosition},nativeOn:{submit:function(t){t.preventDefault()}}},[a("Row",{attrs:{gutter:24,type:"flex",justify:"end"}},[a("Col",{staticClass:"ivu-text-left",attrs:{span:"24"}},[a("FormItem",{attrs:{label:"规格搜索："}},[a("Input",{staticStyle:{width:"30%"},attrs:{search:"","enter-button":"",placeholder:"请输入规格名称"},on:{"on-search":t.userSearchs},model:{value:t.artFrom.rule_name,callback:function(e){t.$set(t.artFrom,"rule_name",e)},expression:"artFrom.rule_name"}})],1)],1),a("Col",{attrs:{span:"24"}},[a("Button",{directives:[{name:"auth",rawName:"v-auth",value:["product-rule-save"],expression:"['product-rule-save']"}],staticClass:"mr20",attrs:{type:"primary",icon:"md-add"},on:{click:t.addAttr}},[t._v("添加商品规格")]),a("Tooltip",{attrs:{content:"本页至少选中一项",disabled:!!t.selectionList.length}},[a("Button",{directives:[{name:"auth",rawName:"v-auth",value:["product-product-rule-delete"],expression:"['product-product-rule-delete']"}],attrs:{disabled:!t.selectionList.length},on:{click:function(e){return t.del(null,"批量删除规格")}}},[t._v("批量删除")])],1)],1)],1)],1),a("Table",{ref:"selection",staticClass:"mt25",attrs:{columns:t.columns4,data:t.tableList,loading:t.loading,"highlight-row":"","no-data-text":"暂无数据","no-filtered-data-text":"暂无筛选结果"},on:{"on-selection-change":t.onSelectTab,"on-select-all":t.selectAll,"on-select-all-cancel":t.selectAll},scopedSlots:t._u([{key:"attr_value",fn:function(e){var i=e.row;return t._l(i.attr_value,(function(e,i){return a("span",{key:i,staticStyle:{display:"block"},domProps:{textContent:t._s(e)}})}))}},{key:"action",fn:function(e){var i=e.row;return[a("a",{on:{click:function(e){return t.edit(i)}}},[t._v("编辑")]),a("Divider",{attrs:{type:"vertical"}}),a("a",{on:{click:function(e){return t.del(i,"删除规格")}}},[t._v("删除")])]}}])}),a("div",{staticClass:"acea-row row-right page"},[a("Page",{attrs:{total:t.total,current:t.artFrom.page,"show-elevator":"","show-total":"","page-size":t.artFrom.limit},on:{"on-change":t.pageChange}})],1)],1),a("add-attr",{ref:"addattr",on:{getList:t.userSearchs}})],1)},n=[],s=a("2f62"),r=a("6fd3"),o=a("c4c8");function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function c(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(a,!0).forEach((function(e){u(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(a).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function u(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var d={name:"productAttr",components:{addAttr:r["a"]},data:function(){var t=this;return{loading:!1,artFrom:{page:1,limit:15,rule_name:""},columns4:[{width:60,align:"center",renderHeader:function(e,a){return e("div",{class:{"select-panel":!0},on:{mouseenter:function(e){t.display="block"},mouseleave:function(e){t.display="none"}}},[e("Checkbox",{props:{value:t.checkBox},on:{"on-change":function(e){t.checkBox=e,t.isAll=e?0:-1,t.$refs.selection.selectAll(t.checkBox)}}}),e("div",{style:{position:"absolute",top:0,zIndex:2,display:t.display,width:"80px",height:"100%",padding:"0px 0",borderRadius:"4px",backgroundColor:"#fff",boxShadow:"0 0px 5px rgba(0, 0, 0, 0.2)",transform:"translateX(25%)"}},[e("div",{class:{"select-item":!0,on:0===t.isAll},style:{padding:"1px 6px",cursor:"pointer",height:"50%"},on:{click:function(e){0===t.isAll?(t.isAll=-1,t.checkBox=!1,t.$refs.selection.selectAll(t.checkBox)):(t.isAll=0,t.selectionList.length||(t.checkBox=!0,t.$refs.selection.selectAll(t.checkBox))),t.display="none"}}},"选择当页"),e("div",{class:{"select-item":!0,on:1===t.isAll},style:{padding:"1px 6px",cursor:"pointer",height:"50%"},on:{click:function(e){1===t.isAll?(t.isAll=-1,t.checkBox=!1):(t.isAll=1,t.checkBox=!0),t.$refs.selection.selectAll(t.checkBox),t.display="none"}}},"选择全部")])])},render:function(e,a){return e("Checkbox",{props:{value:a.row.checkBox},on:{"on-change":function(e){e?t.selectionList.push(a.row):(t.checkBox=!1,t.selectionList.forEach((function(e,i){e.id===a.row.id&&t.selectionList.splice(i,1)}))),t.isAll=t.selectionList.length?0:-1,a.row.checkBox=e,t.tableList[a.index].checkBox=e}},ref:"checkbox",refInFor:!0})}},{title:"ID",key:"id",width:80},{title:"规格名称",key:"rule_name",minWidth:150},{title:"商品规格",key:"attr_name",minWidth:250},{title:"商品属性",slot:"attr_value",minWidth:300},{title:"操作",slot:"action",fixed:"right",minWidth:120}],tableList:[],total:0,ids:"",selectionList:[],selectionCopy:[],display:"none",isAll:0,checkBox:!1}},watch:{tableList:{deep:!0,handler:function(t){var e=this;t.forEach((function(t){e.selectionList.forEach((function(e){e.id===t.id&&(t.checkBox=!0)}))}));var a=this.tableList.filter((function(t){return t.checkBox}));this.tableList.length?this.checkBox=this.tableList.length===a.length:this.checkBox=!1}},selectionList:{deep:!0,handler:function(t){var e=t.map((function(t){return t.id}));this.ids=e.join()}}},computed:c({},Object(s["e"])("admin/layout",["isMobile"]),{},Object(s["e"])("admin/order",["orderChartType"]),{labelWidth:function(){return this.isMobile?void 0:80},labelPosition:function(){return this.isMobile?"top":"right"}}),created:function(){this.getDataList()},methods:{selectAll:function(t){var e=this;t.length&&(this.selectionList=t,this.selectionCopy=t),this.selectionCopy.forEach((function(t,a){t.checkBox=e.checkBox,e.$set(e.tableList,a,t)}))},onSelectTab:function(t){this.selectionList=t;var e=[];this.selectionList.map((function(t){e.push(t.id)})),this.ids=e.join(",")},del:function(t,e){var a=this,i={};if("批量删除规格"===e){if(0===this.selectionList.length)return this.$Message.warning("请选择要删除的规格！");i={all:this.isAll},0===this.isAll?i.ids=this.ids:1===this.isAll&&(i.where={rule_name:this.artFrom.rule_name})}else i={ids:t.id};var n={title:e,num:0,url:"product/product/rule/delete",method:"DELETE",ids:i};this.$modalSure(n).then((function(t){a.$Message.success(t.msg),a.getDataList()})).catch((function(t){a.$Message.error(t.msg)}))},addAttr:function(){this.$refs.addattr.ids=0,this.$refs.addattr.modal=!0},edit:function(t){this.$refs.addattr.modal=!0,this.$refs.addattr.getIofo(t)},getDataList:function(){var t=this;this.loading=!0,Object(o["B"])(this.artFrom).then((function(e){var a=e.data;t.tableList=a.list.map((function(t){return t.checkBox=!1,t})),t.total=e.data.count,t.loading=!1})).catch((function(e){t.loading=!1,t.$Message.error(e.msg)}))},pageChange:function(t){this.artFrom.page=t,this.getDataList()},userSearchs:function(){this.artFrom.page=1,this.selectionList=[],this.getDataList()}}},h=d,m=(a("f0d0"),a("2877")),f=Object(m["a"])(h,i,n,!1,null,"09374c63",null);e["default"]=f.exports},"8c31":function(t,e,a){},"96c5":function(t,e,a){},f0d0:function(t,e,a){"use strict";var i=a("96c5"),n=a.n(i);n.a}}]);