<template>
    <Modal
    style="background-color: #F5F7F9;"
    width="800px"
    :fullscreen="false"
        :value="visible"
        :ok-text="'添加'"
        :cancel-text="''"
        :title="(formType==='create')?textMap.create:textMap.update"
        @on-cancel="handleClose">
        <div>
        <Card :bordered="false" dis-hover>
          <el-form :model="editInfo" :inline="true" :rules="rules" ref="customerForm">
              <el-form-item label="公司名称" prop="company" label-width="100px">
                <!-- <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 100}" style='width:300px' v-model="editInfo.company"></el-input> -->
                <!-- <el-input style='width:300px;height: 30px;' v-model="editInfo.company"></el-input> -->
                <el-select style='width:400px;' v-model="editInfo.company" placeholder="请选择">
                  <el-option
                    v-for="item in companylist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="采样机构" prop="jigou" label-width="100px">
                <el-select style='width:400px;' v-model="editInfo.jigou" placeholder="请选择">
                  <el-option
                    v-for="item in jigoulist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="周几" prop="week" label-width="100px">
                <el-select style='width:400px;' v-model="editInfo.week" placeholder="请选择">
                  <el-option
                    v-for="item in weeklist"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上下午" prop="daystat" label-width="100px">
                <el-radio v-model="editInfo.daystat" label="上午">上午</el-radio>
                <el-radio v-model="editInfo.daystat" label="下午">下午</el-radio>
              </el-form-item>
              <br/>
              <el-form-item label="截止时间" prop="yysj" label-width="100px">
                <el-date-picker
                  v-model="datearr"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="添加人员" prop="persons" label-width="100px">
                <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 100}" style='width:400px' v-model="editInfo.persons"></el-input>
              </el-form-item>
            </el-form>
        </Card>
        </div>
        <div slot="footer">
          <!-- <Button type="text" size="large" @click="handleClose">取消</Button> -->
          <Button type="primary" size="large" @click="handleProduct">保存</Button>
        </div>
    </Modal>
</template>
<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import { mapState } from 'vuex';
import {
        createInspectCategory, updateInspectCategory, infoInspectCategory
    } from '@/api/inspect'
export default {
    components: {
    },
    props: {
      roleid: 0,
      formType: {
        type: String,
        default: 'create'
      },
      title: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    directives: {
    },
    data() {
      return {
        datearr: [],
        weeklist: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        yysjlist: [{
              value: '1',
              label: '2021-09-01'
          },
          {
              value: '2',
              label: '2021-09-02'
          },],
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
        editInfo: {
          name: '直接',
          detection_cycle: 7,
        },
        rules: {
          company: [{
            required: true,
            message: '公司名称必填',
            trigger: 'blur'
          }],
          jigou: [{
            required: true,
            message: '采样机构必填',
            trigger: 'blur'
          }],
          yysj: [{
            required: true,
            message: '检测时间必填',
            trigger: 'blur'
          }],
          persons: [{
            required: true,
            message: '检测人员必填',
            trigger: 'blur'
          }],
        },
        textMap: {
          update: '编辑预约设置',
          create: '预约设置'
        }
      }
    },
    watch: {
      visible: function(val) {
        if(val){
          this.$refs['customerForm'].resetFields();
          if (this.roleid > 0) {
            this.getdetial()
          } else {
            this.editInfo = {
              name: '直接',
              detection_cycle: 7
            }
          }
        }
      }
    },
    created() {

    },
    computed: {
      ...mapState('admin/layout', [
        'isMobile'
      ]),
      labelWidth () {
        return this.isMobile ? undefined : 90;
      },
      labelPosition () {
        return this.isMobile ? 'top' : 'right';
      }
    },
    methods: {
      formcheck(){
      },
            /**
      *判断是否是数字
      *
      **/

      isRealNum(val){
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，    
      　if(val === "" || val ==null){
          return false;
      　}
        if(!isNaN(val)){
          // 对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,   //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
      　　return true; 　　
        }　else{
           return false; 　　
        }
      },
      getdetial() {
        infoInspectCategory(this.roleid).then(async res => {
          console.log(res)
          this.editInfo = res.data.data
          this.$refs['customerForm'].resetFields();
        })
      },
      handleProduct() {
        this.$refs['customerForm'].validate((valid) => {
          if (valid) {
            let func = ''
            let msg = ''
            if (this.formType === 'update') {
              func = updateInspectCategory
              msg = '编辑成功'
            } else {
              func = createInspectCategory
              msg = '新增成功'
            }
            if(this.editInfo.detection_cycle===''&&this.editInfo.detection_cycle===0){
              this.$Message.error('请输入检测周期')
              return
            }
            func(this.editInfo,this.roleid).then(response => {
              if (response.data.code === 200) {
                this.$Message.success(response.data.msg)
                this.$emit('update:visible', false)
                this.$emit('updateList')
              } else {
                this.$Message.error(response.data.msg)
              }
            })
          } else {
            this.$Message.error('请检查填写内容')
          }
        })
        console.log(this.editInfo)
      },
      handleClose() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>
<style scoped>
</style>
