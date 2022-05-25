<template>
<div>
    <div class="i-layout-page-header">
      <PageHeader
        class="product_tabs"
        title="系统参数"
        hidden-breadcrumb
      ></PageHeader>
    </div>
  <Card :bordered="false" dis-hover style='margin-top:20px' >
           <!-- <Form ref='formValidata' :label-width='80' class="ivu-mt">
               <FormItem label='参数名称'  >
                   <Input v-mode='formValidata.menu_name' search enter-button  @on-search="Searchs"> </Input>
               </FormItem>
           </Form> -->
    <Table :columns='column' :data="systemdata">
      <template   slot-scope={row} slot="action">
          <Button type='primary' @click="edit(row.id)" >编辑</Button>
      </template>
  </Table>
  </Card>
  <Modal v-model='modalVisable' width=600   title="编辑" :styles="{top:'250px'}" @on-ok='savedata()'>
  <Form ref='formdata'  :label-width="100" >
     <FormItem label='参数名称'  >
         <Input disabled placeholder="11" v-model='formdata.menu_name'></Input>
     </FormItem>
     <FormItem label='参数说明'  >
         <Input v-model='formdata.desc' ></Input>
     </FormItem>
     <FormItem label='参数值' >
         <Input v-model='formdata.value'></Input>
     </FormItem>
  </Form>
  </Modal>
  
  </div>

</template>

<script>
import {getsystemdata,savesystemdata,geteditdata} from '@/api/system'
export default {
data(){
    return {
        column:[
         {
            title:'参数名称',
            key:'menu_name'
        },{
            title:'参数说明',
            key:'desc'
        },{
            title:'参数值',
            key:'value'
        },{
            title:'操作',
            slot:'action',
            width:200
        }],
        systemdata:[{'menu_name':100,'canshushuoming':200,'canshuzhi':300}],
        formValidata:{
            menu_name:''
        },
        modalVisable:false,
        formdata:{
            menu_name:'',
            desc:'',
            value:''
        },
        configid:-1
        
    }
},
created(){
    this.getList()
},
methods:{
    edit(id){
        this.configid=id
       geteditdata(id).then(res=>{
         
           this.formdata.menu_name=res.data.data.menu_name;
           this.formdata.desc=res.data.data.desc;
           this.formdata.value=res.data.data.value;
       })
       this.modalVisable=true;
    },
    Searchs(){
        //根据查询参数显示参数
    },
    getList(){
       getsystemdata(this.formValidata).then((res)=>{
         
           this.systemdata=res.data.data.data
       })
    },
    savedata(){
        // let that=this;
        savesystemdata(this.configid,this.formdata).then((res)=>{
         debugger
            if(res.data.code==200) { return this.$Message.success('修改成功') }   
        })
    }
}
}
</script>

<style scoped>
.ivu-mt{
   display: flex; 
   justify-content: center;
}
.ivu-mt input{
    width: 400px;
}

</style>