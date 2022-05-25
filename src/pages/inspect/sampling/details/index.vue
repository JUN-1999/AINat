<template>
  <div class="article-manager video-icon"
       id="shopp-manager">
    <div class="i-layout-page-header">
      <PageHeader class="product_tabs"
                  hidden-breadcrumb>
        <div slot="title">
          <router-link :to="{ path: '/admin/company/list' }"><Button icon="ios-arrow-back"
                    size="small"
                    class="mr20">返回</Button></router-link>
          <span v-text=" '检测详情'"
                class="mr20"></span>
        </div>
      </PageHeader>
    </div>
    <Card :bordered="false"
          dis-hover
          class="ivu-mt">
      <Tabs v-model="currentTab">
        <TabPane label="个人信息"
                 name="1">
          <Form class="formValidate mt20"
                ref="formValidate"
                :rules="ruleValidate"
                :model="formValidate"
                :label-width="labelWidth"
                :label-position="labelPosition"
                @submit.native.prevent>
            <Row :gutter="8"
                 type="flex"
                 v-show="currentTab === '1'">
              <!-- 企业信息-->
              <Col span="24">
              <Row type="flex"
                   justify="space-between"
                   class="code-row-bg">
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="姓名"
                          prop="credit_code">
                  <Input v-model="formValidate.credit_code"
                         placeholder="姓名"
                         v-width="'100%'"
                         :disabled="$route.params.id>0" />
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="身份证号码"
                          prop="name">
                  <Input v-model="formValidate.name"
                         disabled="disabled"
                         placeholder="身份证号码"
                         v-width="'100%'" />
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="企业名称"
                          prop="linkman_name">
                  <Input v-model="formValidate.linkman_name"
                         disabled="disabled"
                         placeholder="企业名称"
                         v-width="'100%'" />
                </FormItem>
                </Col>
              </Row>
              </Col>

              <Col span="24">
              <Row type="flex"
                   justify="space-between"
                   class="code-row-bg">
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="人员类型"
                          prop="linkman_phone">
                  <Input v-model="formValidate.linkman_phone"
                         disabled="disabled"
                         placeholder="人员类型"
                         v-width="'100%'" />
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="法人："
                          prop="legalperson_name">
                  <Input v-model="formValidate.legalperson_name"
                         disabled="disabled"
                         placeholder="法人"
                         v-width="'100%'" />
                  <!-- <Select
                    v-model="formValidate.legalperson_name"
                    disabled="disabled"
                  >
                    <Option
                      v-for="item in legalpersonList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.name }}</Option
                    >
                  </Select> -->
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="备用手机号"
                          prop="legalperson_phone">
                  <Input v-model="formValidate.legalperson_phone"
                         placeholder="备用手机号"
                         v-width="'100%'" />
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="法人身份证："
                          prop="legalperson_card">
                  <Input v-model="formValidate.legalperson_card"
                         disabled="disabled"
                         placeholder="法人身份证"
                         v-width="'100%'" />
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="所属街道："
                          prop="street">
                  <Input v-model="formValidate.street"
                         placeholder="所属街道"
                         v-width="'100%'" />
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="经营范围："
                          prop="business_range">
                  <Input disabled="disabled"
                         v-model="formValidate.business_range"
                         placeholder="请输入企业经营范围"
                         v-width="'100%'" />
                </FormItem>
                </Col>
              </Row>
              </Col>

              <Col span="24">
              <Row type="flex"
                   justify="space-between"
                   class="code-row-bg">

                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="经营场所："
                          prop="business_address">
                  <Input disabled="disabled"
                         v-model="formValidate.business_address"
                         placeholder="请输入企业经营场所"
                         v-width="'100%'" />
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="经营状态"
                          prop="business_status">
                  <Select v-model="formValidate.business_status"
                          disabled="disabled">
                    <Option v-for="item in businessList"
                            :value="item.value"
                            :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="企业类型："
                          prop="company_type">
                  <Select v-model="formValidate.company_type">
                    <Option v-for="item in CompanyCategoryList"
                            :value="item.id"
                            :key="item.id">{{ item.name }}</Option>
                  </Select>
                </FormItem>
                </Col>
              </Row>
              </Col>
              <Col span="24">
              <Row type="flex"
                   justify="space-between"
                   class="code-row-bg">

                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="激活状态："
                          prop="active_status">
                  <Select v-model="formValidate.active_status">
                    <Option v-for="item in activeList"
                            :value="item.value"
                            :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="所属机构："
                          prop="belong_ju">
                  <el-cascader v-model="gov_idchecked"
                               :options="gov_idList"
                               :props="optionProps"
                               clearable
                               size="small"
                               @change="chanegov"></el-cascader>
                  <!-- <Input
                    v-model="formValidate.belong_ju"
                    placeholder="请输入所属局"
                    v-width="'100%'"
                  /> -->
                </FormItem>
                </Col>
                <!-- <Col :xs="2" :sm="4" :md="6" :lg="8">
                <FormItem label="所属所：" prop="belong_suo">
                  <Input
                    v-model="formValidate.belong_suo"
                    placeholder="请输入所属所"
                    v-width="'100%'"
                  />
                </FormItem>
              </Col> -->
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="所属干部："
                          prop="belong_man_id">
                  <Select v-model="formValidate.belong_man_id">
                    <Option v-for="item in belongmanList"
                            :value="item.id"
                            :key="item.id">{{ item.real_name }}</Option>
                  </Select>
                </FormItem>
                </Col>
                <!-- <Col :xs="2" :sm="4" :md="6" :lg="8">
                <FormItem label="地址：" prop="address">
                  <Input
                    disabled="disabled"
                    v-model="formValidate.address"
                    placeholder="请输入地址："
                    v-width="'100%'"
                  />
                </FormItem>
              </Col> -->
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="浙首站："
                          prop="zheheadsite">
                  <Switch v-model="formValidate.zheheadsite"
                          :true-value="1"
                          :false-value="0"
                          @on-change="changezheheadsite" />
                  <!-- <Select v-model="formValidate.zheheadsite">
                    <Option
                      v-for="item in zheheadsiteList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</Option
                    >
                  </Select> -->
                </FormItem>
                </Col>
              </Row>
              </Col>
              <Col span="24">
              <Row type="flex"
                   class="code-row-bg">

              </Row>
              </Col>
            </Row>

            <!-- 企业详情-->

            <FormItem>
              <Button type="primary"
                      :disabled="openSubimit"
                      class="submission"
                      @click="handleSubmit('formValidate')">保存</Button>
            </FormItem>
            <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
          </Form>
        </TabPane>
        <TabPane label="核酸检测信息"
                 name="2">
          <Form class="formValidate mt20"
                ref="formValidate"
                :rules="ruleValidate"
                :model="formValidate"
                :label-width="labelWidth"
                :label-position="labelPosition"
                @submit.native.prevent>
            <Row :gutter="8"
                 type="flex"
                 v-show="currentTab === '1'">
              <!-- 企业信息-->
              <Col span="24">
              <Row type="flex"
                   justify="space-between"
                   class="code-row-bg">
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="社会信用代码："
                          prop="credit_code">
                  <Input v-if="$route.params.id>0"
                         v-model="formValidate.credit_code"
                         placeholder="请输入统一社会信用代码"
                         v-width="'100%'"
                         :disabled="$route.params.id>0" />
                  <Select v-else
                          v-model="formValidate.credit_code"
                          filterable
                          @on-change="selectcompany"
                          :remote-method="remoteMethod1"
                          :loading="loading1">
                    <Option v-for="(option, index) in options1"
                            :value="option.uniscId"
                            :key="index">{{option.uniscId}}</Option>
                  </Select>
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="企业名称："
                          prop="name">
                  <Input v-model="formValidate.name"
                         disabled="disabled"
                         placeholder="请输入企业名称"
                         v-width="'100%'" />
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="联系人："
                          prop="linkman_name">
                  <Input v-model="formValidate.linkman_name"
                         disabled="disabled"
                         placeholder="联系人"
                         v-width="'100%'" />
                </FormItem>
                </Col>
              </Row>
              </Col>

              <Col span="24">
              <Row type="flex"
                   justify="space-between"
                   class="code-row-bg">
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="联系人电话："
                          prop="linkman_phone">
                  <Input v-model="formValidate.linkman_phone"
                         disabled="disabled"
                         placeholder="请输入联系人电话"
                         v-width="'100%'" />
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="工作岗位"
                          prop="legalperson_name">
                  <Input v-model="formValidate.legalperson_name"
                         disabled="disabled"
                         placeholder="工作岗位"
                         v-width="'100%'" />
                  <!-- <Select
                    v-model="formValidate.legalperson_name"
                    disabled="disabled"
                  >
                    <Option
                      v-for="item in legalpersonList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.name }}</Option
                    >
                  </Select> -->
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="是否接种疫苗"
                          prop="legalperson_phone">
                  <Input v-model="formValidate.legalperson_phone"
                         placeholder="是否接种疫苗"
                         v-width="'100%'" />
                </FormItem>
                </Col>
                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                </Col>

                <Col :xs="2"
                     :sm="4"
                     :md="6"
                     :lg="8">
                <FormItem label="企业类型："
                          prop="company_type">
                  <Select v-model="formValidate.company_type">
                    <Option v-for="item in CompanyCategoryList"
                            :value="item.id"
                            :key="item.id">{{ item.name }}</Option>
                  </Select>
                </FormItem>
                </Col>
              </Row>
              </Col>
            </Row>

            <!-- 企业详情-->

            <FormItem>
              <Button type="primary"
                      :disabled="openSubimit"
                      class="submission"
                      @click="handleSubmit('formValidate')">保存</Button>
            </FormItem>
            <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
// import COS from 'cos-js-sdk-v5'
import { adminListApi, adminFromApi, adminEditFromApi, setShowApi, verifyApi, gov_treeApi, role_select, addadminApi, updateadminApi, exportadminApi } from '@/api/systemAdmin';
import {
  companyinfo,
  editcompany,
  addcpmpany,
  CompanyCategoryList,
  getcompanyinfo,
  getGovAdmin
} from "@/api/company";
import {
  mapState
} from "vuex";
export default {
  name: "company_add",
  components: {},
  data () {
    return {
      belongmanList: [],
      options1: [],
      options1demo: [
        {
          id: 1,
          uniscId: "9133078209099188X7",
          companyName: "公司1",
          legalPerson: '王文军',
          liaisonInfo: {
            pRIPID: "3307820002684370",
            mOBTEL: "15057808335",
            nAME: "王文军",
            tEL: "89915566",
            tong_time: null,
            eMAIL: "2850821188@qq.com"
          },
          opScope: "实业投资；以服务外包方式从事票据中介服务（不含承兑等银行核心业务）；供应链管理服务；货物进出口、技术进出口；服装、鞋、帽、玩具、雨具、工艺品、珠宝、饰品、厨卫用具、家居日用品、健身器材、五金制品、日用百货、汽车配件、初级食用农产品、电子产品（不含电子出版物）、床上用品、箱包、钟表、户外野营用具、（以下经营范围不含期货）黄金、白银批发。",
          companyAddr: "浙江省义乌市苏溪镇苏福路185号207室",
          operatingStatus: '开业'
        },
        {
          id: 2,
          uniscId: "9133078209099188X8",
          companyName: "公司2",
          legalPerson: '王文军1',
          liaisonInfo: {
            pRIPID: "3307820002684370",
            mOBTEL: "15057808335",
            nAME: "王文军",
            tEL: "89915566",
            tong_time: null,
            eMAIL: "2850821188@qq.com"
          },
          opScope: "实业投资；以服务外包方式从事票据中介服务（不含承兑等银行核心业务）；供应链管理服务；货物进出口、技术进出口；服装、鞋、帽、玩具、雨具、工艺品、珠宝、饰品、厨卫用具、家居日用品、健身器材、五金制品、日用百货、汽车配件、初级食用农产品、电子产品（不含电子出版物）、床上用品、箱包、钟表、户外野营用具、（以下经营范围不含期货）黄金、白银批发。",
          companyAddr: "浙江省义乌市苏溪镇苏福路185号207室",
          operatingStatus: '停业'
        }
      ],
      loading1: false,
      role_List: [],
      optionProps: {
        value: "id",
        label: "name",
        children: "children",
        checkStrictly: true
      },
      gov_idchecked: [2],
      gov_idList: [],
      CompanyCategoryList: [],
      legalpersonList: [
        {
          value: 1,
          name: '王总'
        },
        {
          value: 2,
          name: '何总'
        }
      ],
      isinoculation: '',
      activeList: [{
        value: 1,
        label: '激活'
      },
      {
        value: 2,
        label: '注销'
      }
      ],
      zheheadsiteList: [],
      businessList: [{
        value: 1,
        label: '开业'
      },
      {
        value: 2,
        label: '停业'
      },
      ],

      isBtn: false,
      spinShow: false,
      openSubimit: false,
      // 批量设置表格data
      Batch_data: [{
        price: 0,
        stock_num: 0,
        pic: "",
      },],
      isBtn: false,
      formValidate: {
        name: '',
        credit_code: '',
        linkman_name: '',
        legalperson_uid: '',
        business_range: '',
        company_type: '',
        belong_man: '',
        zheheadsite: 1
      },

      currentTab: "1",
      isChoice: "",
      loading: false,
      modalPic: false,
      template: false,
      treeSelect: [],
      picTit: "",
      tableIndex: 0,
      ruleValidate: {
        name: [{
          required: true,
          message: "请输入企业名称",
          trigger: "blur"
        },],

        credit_code: [{
          required: true,
          message: "信用代码",
          trigger: "blur"
        },],
        linkman_name: [{
          required: true,
          message: "请输入联系人",
          trigger: "blur"
        },],

        legalperson_uid: [{
          required: true,
          message: "请选择法人",
          trigger: "blur"
        },],
        business_range: [{
          required: true,
          message: "请输入经营范围",
          trigger: "blur"
        },],
        company_type: [{
          required: true,
          message: "请输入企业类型",
          trigger: "blur"
        },],
        // belong_man_id: [{
        //   required: true,
        //   message: "请选择所属领导",
        //   trigger: "blur"
        // },],
      },
      manyBrokerage: 0,
      manyBrokerageTwo: 0,
      manyVipPrice: 0,
      upload: {
        videoIng: false, // 是否显示进度条；
      },

      couponName: [],
      updateIds: [],
      updateName: [],
      moveIndex: "",
      gridPic: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 12,
      },
      gridBtn: {
        xl: 4,
        lg: 8,
        md: 8,
        sm: 8,
        xs: 8,
      },
      // aa: [],
      // openSubimit: false
    };
  },
  computed: {
    ...mapState("admin/layout", ["isMobile"]),
    labelWidth () {
      return this.isMobile ? undefined : 120;
    },
    labelPosition () {
      return this.isMobile ? "top" : "right";
    },
    labelBottom () {
      return this.isMobile ? undefined : 15;
    },
  },
  created () {
    // gov_treeApi().then(res => {
    //   this.gov_idList = res.data.data;
    //   for (var i = 0; i < this.gov_idList.length; i++) {
    //     if (this.gov_idList[i].children.length == 0) {
    //       var obj = this.gov_idList[i]
    //       delete obj.children
    //       this.gov_idList[i] = obj
    //     } else {
    //       for (var j = 0; j < this.gov_idList[i].children.length; j++) {
    //         var obj = this.gov_idList[i].children[j]
    //         delete obj.children
    //         this.gov_idList[i].children[j] = obj
    //       }
    //     }
    //   }
    // })
    // role_select().then(res => {
    //   console.log(res.data)
    //   this.role_List = res.data.data
    // })
    // this.chanegov(this.gov_idchecked)
    // this.columnsInstall = this.columns2.slice(0, 4).concat(this.columnsInstall);
    // this.columnsInsta8 = this.columns2.slice(0, 4).concat(this.columnsInsta8);
  },
  mounted () {
    // if (this.$route.params.id !== "0" && this.$route.params.id) {
    //   this.getInfo();
    // }
    // this.getCompanyCategory();
  },
  methods: {
    changezheheadsite (val) {
      // console.log(val)
      // console.log(this.formValidate.zheheadsite)
    },
    chanegov (val) {
      if (val.length > 0) {
        if (val.length === 1) {
          this.formValidate.belong_ju_id = val[0]
          this.formValidate.gov_id = val[0]
        } else {
          this.formValidate.belong_ju_id = val[0]
          this.formValidate.belong_suo_id = val[1]
          this.formValidate.gov_id = val[val.length - 1]
        }
        getGovAdmin({ gov_id: this.formValidate.gov_id }).then(res => {
          if (res.data.code === 200) {
            this.belongmanList = res.data.data
          } else {
            this.$Message.error('获取机构干部超时')
          }

        })
      }
      console.log(this.formValidate)
    },
    selectcompany (val) {
      this.formValidate.credit_code = val
      let companyarr = this.options1.find(item => item.uniscId === val)
      if (companyarr) {
        this.formValidate.name = companyarr.companyName // 企业名称
        this.formValidate.linkman_name = companyarr.liaisonInfo.nAME // 联系人
        this.formValidate.linkman_phone = companyarr.liaisonInfo.tEL // 联系人电话
        this.formValidate.legalperson_name = companyarr.legalPerson // 法人
        this.formValidate.legalperson_phone = companyarr.liaisonInfo.tEL // 法人电话
        this.formValidate.business_range = companyarr.opScope // 经营范围
        this.formValidate.business_address = companyarr.companyAddr // 经营场所
        this.formValidate.business_status = (companyarr.operatingStatus === '开业') ? 1 : 2 // 经营状态
        this.formValidate.address = companyarr.companyAddr // 地址
      }
      console.log(val)
    },
    remoteMethod1 (query) {
      if (query !== '') {
        this.options1 = this.options1demo

        // this.loading1 = true;
        // getcompanyinfo({uniscId:query}).then(res => {
        // if(!res){
        //   console.log(111)
        //   this.options1=options1demo
        //   console.log(this.options1)
        // }else{
        //   this.options1=res.data.datas
        // }
        // this.loading1 = false
        // })
      } else {
        this.options1 = [];
      }
    },
    getCompanyCategory () {
      CompanyCategoryList().then(res => {
        this.CompanyCategoryList = res.data;
      })
    },
    //对象数组去重；
    unique (arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },

    // 详情
    // formDynamic spec: []
    getInfo () {
      let that = this;
      that.spinShow = true;
      companyinfo(that.$route.params.id)
        .then(async (res) => {
          let data = res.data;
          this.formValidate = data.data;
          console.log(this.formValidate)
          this.spinShow = false;
        })
        .catch((res) => {
          this.spinShow = false;
          this.$Message.error(res.msg);
        });
    },
    // 提交
    handleSubmit (name) {
      const _that = this;
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          if (this.formValidate.gov_id == "") {
            this.$Message.error('请选择机构!');
            return
          }
          this.openSubimit = true;
          if (!this.$route.params.id) {
            addcpmpany(this.formValidate).then(async (res) => {
              let result = res;
              this.openSubimit = false;
              if (result.status == 200) {
                this.$Message.success(result.msg);
                setTimeout(() => {
                  this.$router.push({
                    path: "/admin/company/list"
                  });
                }, 500);
              } else {
                this.$Message.error(result.msg);
              }
            });
          } else {
            editcompany(this.formValidate.id, this.formValidate).then(
              async (res) => {
                let result = res;
                this.openSubimit = false;
                if (result.status == 200) {
                  this.$Message.success(result.msg);
                  setTimeout(() => {
                    this.$router.push({
                      path: "/admin/company/list"
                    });
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
          //        this.$Message.warning("请填写完整企业信息！");
          //    }
        }
      });
    },
    // 表单验证
    validate (prop, status, error) {
      if (status === false) {
        this.$Message.warning(error);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
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
  >>>.ivu-form-item-content
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
  >>>.ivu-form-item-label
    float none !important
    display inline-block !important
    margin-left 120px !important
    width auto !important
.video-icon
  background-image url('https://cdn.oss.9gt.net/prov1.1/1/icons.png') // cdn.oss.9gt.net/prov1.1/1/icons.png);
  background-color #fff
  background-position -9999px
  background-repeat no-repeat
</style>
