<template>
  <div class="article-manager video-icon" id="shopp-manager">
    <div class="i-layout-page-header">
      <PageHeader class="product_tabs" hidden-breadcrumb>
        <div slot="title">
          <router-link :to="{ path: '/admin/sampling/inde' }"
            ><Button icon="ios-arrow-back" size="small" class="mr20"
              >返回</Button
            ></router-link
          >
          <span
            v-text="!$route.params.id ? '添加采样机构' : '采样机构设置'"
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
          <Col span="8">
            <FormItem label="采样机构：" prop="name">
              <Input
                v-model="formValidate.name"
                placeholder="请输入采样机构"
                style="width：100%"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="所属街道:" prop="c_str">
              <Select
                v-model="formValidate.street_id"
                style="width: 80%; margin-left: 1rem"
              >
                <Option
                  v-for="item in strList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>

          <Col span="24">
            <FormItem label="可预约时间：" prop="c_name">
              <el-table
                :data="appointmenttime"
                style="width: 100%"
                ref="multipleTable"
                @select="selectSection"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="labelAf" label="日期" width="180">
                </el-table-column>
                <el-table-column label="预约时间" width="400">
                  <template slot-scope="scope">
                    <span class="checkNormalBig">
                      <el-time-picker
                        v-model="scope.row.start_time"
                        value-format="HH:mm"
                        placeholder="选择起始时间"
                        style="margin-right: 10px"
                      >
                      </el-time-picker>
                      <el-time-picker
                        value-format="HH:mm"
                        v-model="scope.row.end_time"
                        placeholder="选择结束时间"
                      >
                      </el-time-picker>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="可预约人数" width="150">
                  <template slot-scope="scope">
                    <Input
                      v-model="scope.row.ability_num"
                      style="height: 40px"
                      type="number"
                      placeholder="人数"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="已预约人数" width="150">
                  <template slot-scope="scope">
                    <Input
                      v-model="scope.row.has_subscribe_num"
                      style="height: 40px"
                      type="number"
                      :disabled="true"
                      placeholder="0"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </FormItem>
          </Col>
        </Row>
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
 <script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
// import COS from 'cos-js-sdk-v5'
import { mapState } from "vuex";
import Template from '../../setting/devise/template.vue';
import {
  samplingPost, samplingPut, getSteeet
} from '@/api/sampling.js'
export default {
  name: "wariningsave",
  components: {
    Template
  },
  data() {
    return {
      strList: [],
      value3: '',
      social: [],
      Tuesdaydata: "",
      appointmenttime: [
        {
          'uid': '1', 'label': '周一', 'isAfterrnon': false, 'labelAf': '周一上午', 'start_time': new Date(2016, 9, 10, 8, 0), 'end_time': new Date(2016, 9, 10, 11, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '1', 'label': '', 'isAfterrnon': true, 'labelAf': '周一下午', 'start_time': new Date(2016, 9, 10, 13, 30), 'end_time': new Date(2016, 9, 10, 17, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '2', 'label': '周二', 'isAfterrnon': false, 'labelAf': '周二上午', 'start_time': new Date(2016, 9, 10, 8, 0), 'end_time': new Date(2016, 9, 10, 11, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '2', 'label': '', 'isAfterrnon': true, 'labelAf': '周二下午', 'start_time': new Date(2016, 9, 10, 13, 30), 'end_time': new Date(2016, 9, 10, 17, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '3', 'label': '周三', 'isAfterrnon': false, 'labelAf': '周三上午', 'start_time': new Date(2016, 9, 10, 8, 0), 'end_time': new Date(2016, 9, 10, 11, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '3', 'label': '', 'isAfterrnon': true, 'labelAf': '周三下午', 'start_time': new Date(2016, 9, 10, 13, 30), 'end_time': new Date(2016, 9, 10, 17, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '4', 'label': '周四', 'isAfterrnon': false, 'labelAf': '周四下午', 'start_time': new Date(2016, 9, 10, 8, 0), 'end_time': new Date(2016, 9, 10, 11, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '4', 'label': '', 'isAfterrnon': true, 'labelAf': '周四下午', 'start_time': new Date(2016, 9, 10, 13, 30), 'end_time': new Date(2016, 9, 10, 17, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '5', 'label': '周五', 'isAfterrnon': false, 'labelAf': '周五上午', 'start_time': new Date(2016, 9, 10, 8, 0), 'end_time': new Date(2016, 9, 10, 11, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '5', 'label': '', 'isAfterrnon': true, 'labelAf': '周五下午', 'start_time': new Date(2016, 9, 10, 13, 30), 'end_time': new Date(2016, 9, 10, 17, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '6', 'label': '周六', 'isAfterrnon': false, 'labelAf': '周六上午', 'start_time': new Date(2016, 9, 10, 8, 0), 'end_time': new Date(2016, 9, 10, 11, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '6', 'label': '', 'isAfterrnon': true, 'labelAf': '周六下午', 'start_time': new Date(2016, 9, 10, 13, 30), 'end_time': new Date(2016, 9, 10, 17, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '7', 'label': '周日', 'isAfterrnon': false, 'labelAf': '周日上午', 'start_time': new Date(2016, 9, 10, 8, 0), 'end_time': new Date(2016, 9, 10, 11, 30), 'ability_num': 0, 'is_enable': 1
        },
        {
          'uid': '7', 'label': '', 'isAfterrnon': true, 'labelAf': '周日下午', 'start_time': new Date(2016, 9, 10, 13, 30), 'end_time': new Date(2016, 9, 10, 17, 30), 'ability_num': 0, 'is_enable': 1
        },
      ],
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '日期',
          key: 'label'
        },
        {
          title: '日期',
          slot: 'isAfterrnon'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      isBtn: false,
      spinShow: false,
      openSubimit: false,

      snapchat: 'asdasda',
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
        name: [
          { required: true, message: '采样机构不能为空', trigger: 'blur' }
        ],
      },
      formValidate: {
        name: "",
        street_id: "",
        sampleAbility: []
      },
      findIndex: [],


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
      return this.isMobile ? "top" : "right"; 0
    },
    labelBottom() {
      return this.isMobile ? undefined : 15;
    },
  },
  created() {
    this.getSteeet()
  },
  mounted() {
    this.appointmenttime.map((item, index) => {
      this.$refs.multipleTable.toggleRowSelection(this.appointmenttime[index], true);//默认全选
    })
    if (this.$route.params.id !== "0" && this.$route.params.id) {
      let storage = window.localStorage;
      let menuList = JSON.parse(storage.getItem('sampingAdd'))
      let startArr = []
      let eddArr = []
      this.formValidate.name = menuList.name
      this.formValidate.id = menuList.id
      this.formValidate.street_id = menuList.street_id
      // 判断数组是否为14位
      // if (this.formValidate.sampleAbility.length === 14) {
      menuList.sampleAbility.map((item, index) => {
        startArr = item.start_time.split(":")
        eddArr = item.end_time.split(":")
        console.log(item)
        // console.log(item)
        this.appointmenttime[index].start_time = new Date(2016, 9, 10, parseInt(startArr[0]), parseInt(startArr[1]))
        this.appointmenttime[index].end_time = new Date(2016, 9, 10, parseInt(eddArr[0]), parseInt(eddArr[1]))
        this.appointmenttime[index].ability_num = item.ability_num
        this.appointmenttime[index].is_enable = item.is_enable
        this.appointmenttime[index].id = item.id
        if (item.is_enable == 1) {
          this.social.push(index)
        }
      })
      // }
      console.log(this.appointmenttime)
      // this.appointmenttime.
    }
  },
  methods: {
    selectSection(selection, row) {
      row.is_enable === 0 ? row.is_enable = 1 : row.is_enable = 0
      if (row.is_enable === 0) {
        row.ability_num = 0
      }
    },
    getSteeet() {
      getSteeet().then(res => {
        this.strList = res.data.list
        console.log(this.strList)
      })
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const formValidate = JSON.parse(JSON.stringify(this.formValidate))
          let reg = /^(0?[0-9]|1[0-9]|2[0-3])[:](0?[0-9]|[1-5][0-9])$/;
          const appointmenttime = JSON.parse(JSON.stringify(this.appointmenttime))
          appointmenttime.map((item, index) => {
            if (!reg.test(item.start_time)) {
              item.start_time = this.formatDate(item.start_time)
            }
            if (!reg.test(item.end_time)) {
              item.end_time = this.formatDate(item.end_time)
            }
            if (item.isAfterrnon === true) {
              formValidate.sampleAbility.push({
                time_slot_code: `w${item.uid}pm`,
                start_time: item.start_time,
                end_time: item.end_time,
                ability_num: item.ability_num,
                is_enable: item.is_enable,
                id: item.id
              }
              )
            } else {
              formValidate.sampleAbility.push({
                time_slot_code: `w${item.uid}am`,
                start_time: item.start_time,
                end_time: item.end_time,
                ability_num: item.ability_num,
                is_enable: item.is_enable,
                id: item.id
              })
            }
          })
          var ret4 = this.appointmenttime.findIndex((value, index, arr) => {
            return value.ability_num === 0
          })
          console.log(this.appointmenttime[ret4])
          formValidate.sampleAbility = JSON.stringify(formValidate.sampleAbility)
          if (!this.$route.params.id) {
            samplingPost(formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg)
                this.$router.push({
                  path: "/admin/sampling/inde"
                })
              } else {
                this.$Message.error(res.data.msg)
              }
            })
          } else {
            samplingPut(formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg)
                this.$router.push({
                  path: "/admin/sampling/inde"
                })
              } else {
                this.$Message.error(res.data.msg)
              }
            })
          }
        } else {
          this.$Message.error('采样机构不能为空');
        }
      })
    },
    // 更改时间格式
    formatDate(Hoursdate) {
      return this.$moment(Hoursdate).format("HH:mm:ss");
    },
    changeCheck(val) {
      this.appointmenttime.map(item => {
        item.is_enable = 0
      })
      val.map(item => {

        this.appointmenttime[item].is_enable = 1
      })
    }
  },
};
</script>
<style scoped lang="stylus">
.list-group
  margin-left -8px
.borderStyle
  border 1px solid #ccc
  padding 8px
  border-radius 4px
.drag
  cursor move
.move-icon
  width 30px
  cursor move
  margin-right 10px
.move-icon .icondrag2
  font-size 26px
  color #d8d8d8
.maxW /deep/.ivu-select-dropdown
  max-width 600px
#shopp-manager .ivu-table-wrapper
  border-left 1px solid #dcdee2
  border-top 1px solid #dcdee2
.noLeft
  >>> .ivu-form-item-content
    margin-left 0 !important
#shopp-manager .ivu-form-item
  position relative
#shopp-manager .ivu-form-item .tips
  position absolute
  color #999
  top 29px
  left -77px
  font-size 12px
.uploadVideo
  margin-left 10px
.submission
  margin-left 45%
.color-list .tip
  color #c9c9c9
.color-list .color-item
  height 30px
  line-height 30px
  padding 0 10px
  color #fff
  margin-right 10px
.color-list .color-item.blue
  background-color #1E9FFF
.color-list .color-item.yellow
  background-color rgb(254, 185, 0)
.color-list .color-item.green
  background-color #009688
.color-list .color-item.red
  background-color #ed4014
.columnsBox
  margin-right 10px
.priceBox
  width 100%
.rulesBox
  display flex
  flex-wrap wrap
.pictrueBox
  display inline-block
.curs
  cursor pointer
.inpWith
  width 60%
.labeltop
  >>> .ivu-form-item-label
    float none !important
    display inline-block !important
    margin-left 120px !important
    width auto !important
.video-icon
  background-image url('https://cdn.oss.9gt.net/prov1.1/1/icons.png') // cdn.oss.9gt.net/prov1.1/1/icons.png);
  background-color #fff
  background-position -9999px
  background-repeat no-repeat
>>>.ivu-checkbox-group
  display flex
  flex-direction column
  >>>.ivu-checkbox-wrapper
    display flex
    flex-direction row
  .checkBoxIT
    margin-left 5px
    display flex
    width 54%
    flex-direction column
  .checkNormalSmall
    width 36px
    margin-left 0.15rem
    display flex
    align-items center
.checkNormalBig
  margin-right 1rem
  display flex
  flex-direction row
  align-items center
>>>.ivu-checkbox
  margin-top 1.56rem
.personTips
  height 2.7rem
  margin-left 1rem
  display flex
  align-items center
  .ivu-btn span
    display flex
    height 100%
    align-items center
>>>.ivu-input
  height 100%
</style>
