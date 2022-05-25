<template>
  <div class="cardFiexed">
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="公司名称" prop="data1">
          <Select v-model="company" clearable style="width:200px">
              <Option v-for="item in companylist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="预约时间" prop="data2">
          <Date-picker type="datetimerange" placeholder="选择日期和时间"></Date-picker>
          <span style="color:red;font-size:15px;margin-left:10px">选择日期后再选择时间</span>
        </FormItem>
        <FormItem label="医疗结构" prop  ="data3">
          <Select v-model="jigou" clearable style="width:200px">
              <Option v-for="item in jigoulist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="添加人员" prop="data4">
          <Select v-model="model12" filterable multiple>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            :loading="modal_loading"
            class="submission"
            @click="handleSubmit('formValidate')"
            >提交</Button
          >
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
// import { depotListAdd,depotListDeatils,depotListPut } from "@/api/repertory.js";
import { deletes } from 'vuedraggable';
export default {
  props:{
   rowId:{
     default:0,
     type:Number
   } 
  },
  data() {
    return {
      cardFiexedIS: false,
      usableTx:"",
      modal_loading: false,
      loading: false,
      cityList: [
            {
                value: '1',
                label: '张三'
            },
            {
                value: '2',
                label: '李四'
            },
            {
                value: '3',
                label: '老王'
            },
            {
                value: '4',
                label: '老五'
            },
            {
                value: '5',
                label: '狗子'
            },
            {
                value: '7',
                label: '老八'
            }
        ],
      companylist: [
          {
              value: '1',
              label: '商翔集团'
          },
          {
              value: '2',
              label: '华鼎锦纶'
          },
      ],
      company:'',
      jigoulist: [
          {
              value: '1',
              label: '廿三里卫生院'
          },
          {
              value: '2',
              label: '苏溪卫生院'
          },
      ],
      jigou:'',
      model12: [],
      ruleValidate: {
        data1: [
          { required: true, message: "请选择企业", trigger: "blur" },
        ],
        data2: [
          { required: true, message: "请选择预约时间", trigger: "blur" },
        ],
        data3: [{ required: true, message: "请选择医疗机构", trigger: "blur" }],
        data4: [
          { required: true, message: "请选择人员", trigger: "change" },
        ],
      },
      formValidate: {
        // depot_name:"",
        // depot_no:"",
        // addr:"",
        // usableTx:"",
      },
    };
  },
  mounted(){
    if(this.rowId !== 0) {
      this.getDepotDetails()
    }
  },
  methods: {
    getDepotDetails(){
      depotListDeatils(this.rowId).then(res=>{
        this.formValidate = res.data.data
        if(res.data.data.usable == 1) {
          this.formValidate.usableTx = "是"
        }else{
          this.formValidate.usableTx = "否"
        }
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const formValidate = JSON.parse(JSON.stringify(this.formValidate))
          delete formValidate.usableTx
          this.modal_loading = true;
          setTimeout(() => {
            this.modal_loading = false;
          }, 500);
          if(this.rowId != "") {
            depotListPut(this.formValidate)
             .then((res) => {
                this.modal_loading = false;
                if(res.data.code == 200) {
                  this.$Message.success(res.data.msg);
                  this.$emit('on-close');
                }else{
                  this.$Message.warning(res.data.msg);
                }
              })
              .catch((res) => {
                this.modal_loading = false;
                this.$Message.error(res.data.msg);
              });
          }else{

            depotListAdd(formValidate)
              .then((res) => {
                this.modal_loading = false;
                if(res.data.code == 200) {
                  this.$Message.success(res.data.msg);
                  this.$emit('on-close');
                }else{
                  this.$Message.warning(res.data.msg);
                }
              })
              .catch((res) => {
                this.modal_loading = false;
                this.$Message.error(res.data.msg);
              });
          }
        }
      });
    },
    radioChange(e){
      if(e == '是') {
        this.formValidate.usable = 1
      }else{
        this.formValidate.usable = 0
      }
    }
  },
};
</script>

<style scoped>
</style>