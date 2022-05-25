<template>
  <div class="article-manager video-icon" id="shopp-manager">
    <div class="i-layout-page-header">
      <PageHeader class="product_tabs" hidden-breadcrumb>
        <div slot="title">
          <router-link :to="{ path: '/admin/people/list' }"
            ><Button icon="ios-arrow-back" size="small" class="mr20"
              >返回</Button
            ></router-link
          >
          <span
            v-text="$route.params.id ? '新增预约能力' : '编辑预约能力'"
            class="mr20"
          ></span>
        </div>
      </PageHeader>
    </div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Tabs v-model="currentTab">
        <TabPane label="基本信息" name="1"></TabPane>
      </Tabs>
      <Form
        class="formValidate mt20"
        ref="formValidate"
        :rules="ruleValidate"
        :model="formValidate"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <Row :gutter="8" type="flex" v-show="currentTab === '1'">

          <Col span="24">
            <FormItem label="医疗机构：" prop="c_name">
              <Input
                v-model="formValidate.c_name"
                placeholder="请输入医疗机构"
                v-width="'50%'"
              />
            </FormItem>
          </Col>

          <Col span="24">
            <FormItem label="可预约时间：" prop="c_name">

              <Checkbox-group v-model="social">
                <Checkbox :label="item.value" v-for="(item,index) in appointmenttime" :key="index">
                    <span>{{item.label}}</span>
                </Checkbox>
                
              </Checkbox-group>
            </FormItem>
          </Col>

          <Col span="24">
            <FormItem label="早上时间：" prop="c_name">
             <Time-picker :value="value2" format="HH’mm’ss" type="timerange" placement="bottom-end" placeholder="选择时间" style="width: 168px"></Time-picker>
            </FormItem>
          </Col>

          <Col span="24">
            <FormItem label="下午时间：" prop="c_name">
              <Time-picker :value="value2" format="HH’mm’ss" type="timerange" placement="bottom-end" placeholder="选择时间" style="width: 168px"></Time-picker>
            </FormItem>
          </Col>

          <Col span="24">
            <FormItem label="预约人数：" prop="c_name">
              <Input
                v-model="formValidate.c_num"
                placeholder="请输入预约人数"
                v-width="'50%'"
              />
            </FormItem>
          </Col>
          
        
        
          
        </Row>

        <!-- 人员详情-->

        <FormItem>
          <Button
            type="primary"
            :disabled="openSubimit"
            class="submission"
            @click="handleSubmit('formValidate')"
            >保存</Button
          >
        </FormItem>
		
        <Spin size="large" fix v-if="spinShow"></Spin>
      </Form>
    </Card>
  </div>
</template>

<script>
// import COS from 'cos-js-sdk-v5'
import { mapState } from "vuex";
export default {
  name: "wariningsave",
  components: {
  },
  data() {
    return {
      Tuesdaydata:'',
      appointmenttime:[{'label':'周二','value':''},
      {'label':'周三','value':''},
      {'label':'周四','value':''},
      {'label':'周五','value':''},
      {'label':'周六','value':''},
      {'label':'周日','value':''},
      {'label':'周一','value':''}
      ],
      isBtn: false,
      spinShow: false,
      openSubimit: false,

      snapchat:'asdasda',
      // 批量设置表格data
      Batch_data: [
        {
          price: 0,
          stock_num: 0,
          pic: "",
        },
      ],
      isBtn: false,
      
      currentTab: "1",
      isChoice: "",
      loading: false,
      modalPic: false,
      template: false,
      treeSelect: [],
      picTit: "",
      tableIndex: 0,
      ruleValidate: {
        
      },
      formValidate:{}

      
      // aa: [],
      // openSubimit: false
    };
  },
  computed: {
    ...mapState("admin/layout", ["isMobile"]),
    labelWidth() {
      return this.isMobile ? undefined : 120;
    },
    labelPosition() {
      return this.isMobile ? "top" : "right";
    },
    labelBottom() {
      return this.isMobile ? undefined : 15;
    },
  },
  created() {
    this.Tuesdaydata = this.getMonday();
    this.getAppointmentTime();
    console.log(this.appointmenttime)
    // this.columnsInstall = this.columns2.slice(0, 4).concat(this.columnsInstall);
    // this.columnsInsta8 = this.columns2.slice(0, 4).concat(this.columnsInsta8);
  },
  mounted() {
    if (this.$route.params.id !== "0" && this.$route.params.id) {
      this.getInfo();
    }
  },
  methods: {
    dateAdd(startDate) {
        startDate = new Date(startDate);
        startDate = +startDate + 1000*60*60*24;
        startDate = new Date(startDate);
        var nextStartDate = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
        return nextStartDate;
    },
    getAppointmentTime(){
      var starttime = this.Tuesdaydata;
      console.log(starttime);
      for(var i = 0;i<7;i++){
        this.appointmenttime[i].label = this.appointmenttime[i].label + starttime;
        this.appointmenttime[i].value = "("+starttime+")";
        starttime = this.dateAdd(starttime);
      }
    },
    getMonday() {
      let day = new Date().getDay() || 7;
      return this.GetDateStr(2 - day)
    },
    GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期  
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0  
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0  
        return y + "-" + m + "-" + d;
    },
    
    //对象数组去重；
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
   
    // 详情
    // formDynamic spec: []
    getInfo() {
      let that = this;
      that.spinShow = true;
      productInfoApi(that.$route.params.id)
        .then(async (res) => {
          let data = res.data;
          this.formValidate = data.data;
          this.formValidate.c_spec = [];
          console.log(data.data.c_description);
          if (data.data.c_description) {
            this.formValidate.c_description = data.data.c_description.split(
              "|"
            );
          } else {
            this.formValidate.c_description = [];
          }
          if (data.data.c_image) {
            this.formValidate.c_image = data.data.c_image.split("|");
          } else {
            this.formValidate.c_image = [];
          }
          console.log(this.formValidate.c_image);
          this.sku_columns = data.data.header;
          this.sku_data = data.data.sku;
          let specs = data.data.specs;
          specs.forEach(function (item, index) {
            let data = {
              id: item.id,
              value: item.c_spec_name,
              detail: item.c_spec_value.split(","),
            };
            that.formDynamic.spec.push(data);
          });
          //   console.log(this.formDynamic.spec)
          this.spinShow = false;
        })
        .catch((res) => {
          this.spinShow = false;
          this.$Message.error(res.msg);
        });
    },
    // 提交
    handleSubmit(name) {
      const _that = this;
      let spec_data = this.formDynamic.spec;
      spec_data.forEach(function (item, index) {
        let data = {
          name: item.value,
          value: item.detail.join(","),
          id: item.id ? item.id : "",
        };
        _that.formValidate.c_spec.push(data);
      });
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (!this.formValidate.c_name) {
            return this.$Message.warning("人员信息-人员名称不能为空");
          } else if (!this.formValidate.c_product_no) {
            return this.$Message.warning("人员信息-人员编码不能为");
          } else if (!this.formValidate.c_image) {
            return this.$Message.warning("人员信息-人员图片不能为空");
          } else if (!this.formValidate.c_spec.length) {
            return this.$Message.warning("人员信息-人员规格不能为空");
          }
          this.openSubimit = true;
          const formValidate = JSON.parse(JSON.stringify(this.formValidate))
          formValidate.c_spec = JSON.stringify(this.formValidate.c_spec);
          formValidate.c_sku = JSON.stringify(this.sku_data);
          delete formValidate.sku
          delete formValidate.specs
          delete formValidate.header
          formValidate.c_description = this.formValidate.c_description.join( 
            "|"
          );
          formValidate.c_image = this.formValidate.c_image.join(
            "|"
          );
          console.log(formValidate)
          if (!this.$route.params.id) {
            productAddApi(formValidate).then(async (res) => {
              let result = res.data;
              this.openSubimit = false;
              if (result.code == 200) {
                this.$Message.success(result.msg);
                setTimeout(() => {
                  this.$router.push({ path: "/admin/people/list" });
                }, 500);
              } else {
                this.$Message.error(result.msg);
              }
            });
          } else {
            productEditApi(formValidate, this.formValidate.id).then(
              async (res) => {
                let result = res.data;
                this.openSubimit = false;
                if (result.code == 200) {
                  this.$Message.success(result.msg);
                  setTimeout(() => {
                    this.$router.push({ path: "/admin/people/list" });
                  }, 500);
                } else {
                  this.$Message.error(result.msg);
                }
              }
            );
          }
        } else {
          
          //    if(!this.formValidate.store_name || !this.formValidate.cate_id || !this.formValidate.keyword
          //    || !this.formValidate.unit_name || !this.formValidate.store_info
          //        || !this.formValidate.image || !this.formValidate.slider_image){
          //        this.$Message.warning("请填写完整人员信息！");
          //    }
        }
      });
    },
    // 表单验证
    validate(prop, status, error) {
      if (status === false) {
        this.$Message.warning(error);
      }
    },
  },
};
</script>
<style scoped lang="stylus">
.list-group {
  margin-left: -8px;
}

.borderStyle {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
}

.drag {
  cursor: move;
}

.move-icon {
  width: 30px;
  cursor: move;
  margin-right: 10px;
}

.move-icon .icondrag2 {
  font-size: 26px;
  color: #d8d8d8;
}

.maxW /deep/.ivu-select-dropdown {
  max-width: 600px;
}

#shopp-manager .ivu-table-wrapper {
  border-left: 1px solid #dcdee2;
  border-top: 1px solid #dcdee2;
}

.noLeft {
  >>> .ivu-form-item-content {
    margin-left: 0 !important;
  }
}

#shopp-manager .ivu-form-item {
  position: relative;
}

#shopp-manager .ivu-form-item .tips {
  position: absolute;
  color: #999;
  top: 29px;
  left: -77px;
  font-size: 12px;
}



.uploadVideo {
  margin-left: 10px;
}

.submission {
  margin-left: 45%;
}

.color-list .tip {
  color: #c9c9c9;
}

.color-list .color-item {
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  color: #fff;
  margin-right: 10px;
}

.color-list .color-item.blue {
  background-color: #1E9FFF;
}

.color-list .color-item.yellow {
  background-color: rgb(254, 185, 0);
}

.color-list .color-item.green {
  background-color: #009688;
}

.color-list .color-item.red {
  background-color: #ed4014;
}

.columnsBox {
  margin-right: 10px;
}

.priceBox {
  width: 100%;
}

.rulesBox {
  display: flex;
  flex-wrap: wrap;
}

.pictrueBox {
  display: inline-block;
}
.curs {
  cursor: pointer;
}

.inpWith {
  width: 60%;
}

.labeltop {
  >>> .ivu-form-item-label {
    float: none !important;
    display: inline-block !important;
    margin-left: 120px !important;
    width: auto !important;
  }
}

.video-icon {
  background-image: url('https://cdn.oss.9gt.net/prov1.1/1/icons.png'); // cdn.oss.9gt.net/prov1.1/1/icons.png);
  background-color: #fff;
  background-position: -9999px;
  background-repeat: no-repeat;
}
</style>
