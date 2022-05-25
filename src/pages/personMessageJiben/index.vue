<template>
  <div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form
        ref="formValidate"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <Row :gutter="16" type="flex">
          <Col :xs="10" :sm="12" :md="16" :lg="18" style="line-height: 40px">
            <Col :xs="24" :sm="12" :md="8" :lg="6">
              <Col span="5" class="shtitle"
                ><span class="shtitle">姓名</span></Col
              >
              <Col span="17"
                ><Input
                  class="shinput"
                  v-model="formValidate.real_name"
                  placeholder="请输入"
                  element-id="real_name"
                  clearable
                >
                </Input
              ></Col>
            </Col>

            <Col :xs="24" :sm="12" :md="8" :lg="6">
              <Col span="5" class="shtitle"
                ><span class="shtitle">性别</span></Col
              >
              <Col span="17"
                ><Select
                  v-model="formValidate.gender"
                  placeholder="性别"
                  class="shinput"
                >
                  <Option :value="1" :key="1">男</Option>
                  <Option :value="2" :key="2">女</Option>
                </Select></Col
              >
            </Col>

            <Col :xs="24" :sm="12" :md="8" :lg="6">
              <Col span="5" class="shtitle"
                ><span class="shtitle">证件号</span></Col
              >
              <Col span="17"
                ><Input
                  class="shinput"
                  v-model="formValidate.id_card"
                  placeholder="请输入"
                  element-id="id_card"
                  clearable
                >
                </Input
              ></Col>
            </Col>

            <Col :xs="24" :sm="12" :md="8" :lg="6">
              <Col span="8" class="shtitle"
                ><span class="shtitle">手机号</span></Col
              >
              <Col span="16"
                ><Input
                  class="shinput"
                  v-model="formValidate.phone"
                  placeholder="请输入"
                  element-id="phone"
                  clearable
                >
                </Input
              ></Col>
            </Col>

            <template v-if="collapse">
              <!-- <Col :xs="24" :sm="12" :md="8" :lg="6">
                <Col span="5" class="shtitle"
                  ><span class="shtitle">	途径城市</span></Col
                >
                <Col span="17"
                  ><Input
                    class="shinput"
                    v-model="formValidate.phone"
                    placeholder="请输入"
                    element-id="phone"
                    clearable
                  >
                  </Input
                ></Col>
              </Col> -->

              <Col :xs="24" :sm="12" :md="8" :lg="6">
                <Col span="5" class="shtitle"
                  ><span class="shtitle">申报类型</span></Col
                >
                <Col span="17">
                  <Select
                    v-model="formValidate.declare_type"
                    placeholder="人员类型"
                    class="shinput"
                  >
                    <Option value="leave" key="leave"> 外出申报</Option>
                    <Option value="come" key="come"> 来返义申报</Option>
                  </Select>
                </Col>
              </Col>

              <Col :xs="24" :sm="12" :md="8" :lg="6">
                <Col span="5" class="shtitle"
                  ><span class="shtitle">核酸结果</span></Col
                >
                <Col span="17">
                  <Select
                    v-model="formValidate.hsjc_result"
                    placeholder="核酸结果"
                    class="shinput"
                  >
                    <Option value="阴性"> 阴性</Option>
                    <Option value="阳性"> 阳性</Option>
                  </Select>
                </Col>
              </Col>

              <Col :xs="24" :sm="12" :md="8" :lg="6">
                <Col span="5" class="shtitle"
                  ><span class="shtitle">疫苗接种</span></Col
                >
                <Col span="17">
                  <Select
                    v-model="formValidate.vaccination"
                    placeholder="疫苗接种"
                    class="shinput"
                  >
                    <Option value="1"> 已接种</Option>
                    <Option value="0"> 未接种</Option>
                  </Select>
                </Col>
              </Col> 

              <Col :xs="24" :sm="12" :md="8" :lg="6">
                <Col span="8" class="shtitle"
                  ><span class="shtitle">中高风险地区申报</span></Col
                >
                <Col span="16">
                  <Select
                    v-model="formValidate.is_riskarea"
                    placeholder="中高风险地区申报"
                    class="shinput"
                  >
                    <Option value="1"> 是</Option>
                    <Option value="0"> 否</Option>
                  </Select>
                </Col>
              </Col> 

               <Col :xs="24" :sm="12" :md="8" :lg="6">
                <Col span="5" class="shtitle"
                  ><span class="shtitle">健康码状态</span></Col
                >
                <Col span="17">
                  <Select
                    v-model="formValidate.jkm_mzt"
                    placeholder="健康码状态"
                    class="shinput"
                  >
                    <Option value="红码">红码</Option>
                    <Option value="黄码">黄码</Option>
                    <Option value="绿码">绿码</Option>
                  </Select>
                </Col>
              </Col> 

              <Col :xs="24" :sm="12" :md="8" :lg="6">
                <Col span="5" class="shtitle"
                  ><span class="shtitle">健康码状态</span></Col
                >
                <Col span="17"
                ><Input
                  class="shinput"
                  v-model="formValidate.ryxx_result"
                  placeholder="请输入"
                  element-id="ryxx_result"
                  clearable
                >
                </Input
              ></Col>
              </Col> 

            </template>
          </Col>

          <Col
            :xs="14"
            :sm="12"
            :md="8"
            :lg="6"
            class="ivu-text-right userFrom"
          >
            <a v-font="14" class="ivu-ml-8 mr15" @click="collapse = !collapse">
              <template v-if="!collapse">
                <Button type="primary" label="default"
                  >更多 <Icon type="ios-arrow-down"
                /></Button>
              </template>
              <template v-else>
                <Button type="primary" label="default"
                  >收起 <Icon type="ios-arrow-up"
                /></Button>
              </template>
            </a>
            <Button
              type="primary"
              icon="ios-search"
              label="default"
              class="mr15"
              @click="Searchs"
              >搜索</Button
            >
            <Button class="ResetSearch" @click="reset('leave')">重置</Button>
          </Col>
        </Row>
      </Form>
      <Form>
        <Row type="flex" class="mt20">
          <Button
            type="success"
            class="bnt mr15"
            @click="exports"
            :loading="button_loading"
            >{{downloadstr}}</Button
          >
        </Row>
      </Form>
      <Table
        :columns="columns1"
        :data="list"
        class="mt25"
        no-userFrom-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
        :loading="loading"
        highlight-row
      >
        <template slot-scope="{ row, index }" slot="index">
          <span> {{ index + 1 }} </span>
        </template>
        <template slot-scope="{ row, index }" slot="vaccination">
          <span v-if="row.vaccination === 1"> 是 </span>
          <span v-else> 否 </span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <a @click="lookcompany(row)">查看企业</a>
          <!-- <a @click="openItImage(row.qrcode_path, row.name)">查看二维码</a> -->
        </template>
        <template slot-scope="{ row, index }" slot="travel_img">
            <viewer>
                <div class="tabBox_img">
                    <img v-lazy="row.travel_img">
                </div>
            </viewer>
        </template>
        <template slot="declare_type" slot-scope="{ row, index }">
          <span v-if="row.declare_type === 'return'"> 返义 </span>
          <span v-else> 离义 </span>
        </template>
        <template slot="is_riskarea" slot-scope="{ row, index }">
          <span v-if="row.is_riskarea === 0"> 否 </span>
          <span v-else> 是 </span>
        </template>
      </Table>
      <div class="acea-row row-right page">
        <Page
          :total="total"
          :current="formValidate.page"
          show-elevator
          show-total
          show-sizer
          @on-page-size-change="sizeChange"
          :page-size-opts="[5, 10, 15, 20]"
          @on-change="pageChange"
          :page-size="formValidate.size"
        />
      </div>
      <Modal
        v-model="modal1"
        title="所在企业"
        @on-ok="ok"
        @on-cancel="cancel"
      >
      <Table
        :columns="companycolumns"
        :data="companylist"
        no-userFrom-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
        :loading="loading"
        highlight-row
      >
        
      </Table>
      </Modal>
    </Card>
  </div>
</template>

<script>

import { mapState, mapMutations, mapAction } from 'vuex'
import { phpExceldownload } from "@/api/system";
import qs from 'qs'
import { userApiGet,userGetcompany } from '@/api/userAdmin';
import exportExcel from "@/utils/newToExcel.js";
import { getToken } from '@/utils/auth'
import { exportUser,Csvuser,getCsvProgress } from '@/api/export';
export default {
  name: 'systemAdmin',
  data () {
    return {
      collapse: false,
      token: 'Bearer ' + getToken(),
      modal1: false,
      fileurlL: "/ainatapi/file/tmp/upload?token=" + getToken(),
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24
      },
      total: 0,
      loading: false,
      roleData: {
        status1: ''
      },
      dataList: [],
      formValidate: {
        page: 1,
        size: 10,
      },
      list: [],
      companycolumns:[
        {
          title: '序号',
          key: 'order',
          minWidth: 50
        },
        {
          title: '企业名称',
          key: 'company_name',
          minWidth: 120
        },
        {
          title: '扫码时间',
          key: 'create_time',
          minWidth: 120
        },
      ],
      companylist:[],
      columns1: [
        {
          title: '序号',
          slot: 'index',
          minWidth: 50
        },
        {
          title: '类型',
          key: 'street',
          minWidth: 120
        },
        {
          title: '姓名',
          key: 'real_name',
          minWidth: 80
        },
        {
          title: '健康码状态',
          key: 'jkm_mzt',
          minWidth: 80
        },
        {
          title: '管控状态',
          key: 'ryxx_result',
          minWidth: 120
        },
        {
          title: '性别',
          key: 'gender_text',
          minWidth: 120
        },
        {
          title: '民族',
          key: 'nation',
          minWidth: 120
        },
        {
          title: '身份证号',
          key: 'id_card',
          minWidth: 150
        },
        {
          title: '年龄',
          key: 'age',
          minWidth: 120
        },
        {
          title: '户籍地址',
          key: 'address',
          minWidth: 120
        },
        {
          title: '联系电话',
          key: 'phone',
          minWidth: 120
        },
        {
          title: '人员类型',
          key: 'declare_type_text',
          minWidth: 120
        },
        {
          title: '核酸检测结果',
          key: 'hsjc_result',
          minWidth: 120
        },
        {
          title: '是否疫苗接种',
          slot: 'vaccination',
          minWidth: 120
        },
        {
          title: '位置状态',
          key: 'position_type_text',
          minWidth: 120
        },
        {
          title: '申报类型',
          slot: 'declare_type',
          minWidth: 120
        },
        {
          title: '途径城市',
          key: 'travel_route',
          minWidth: 250
        },
        {
          title: '处置结果',
          key: 'control_state',
          minWidth: 120
        },
        {
          title: '是否中高风险地区申报',
          slot: 'is_riskarea',
          minWidth: 150
        },

        {
          title: '行程途径',
          key: 'travel_route',
          minWidth: 150
        },

         {
          title: '管控状态',
          key: 'control_state',
          minWidth: 150
        },
        
        {
          title: '行程码图片',
          slot: 'travel_img',
          minWidth: 150
        },
        // {
        //   title: '操作',
        //   slot: 'action',
        //   width: 180
        // },
      ],
      FromData: null,
      modalTitleSs: '',
      ids: Number,
      srcList: [],
      excelDatamodals: false,
      excelData: true,
      select_name: '',
      downloadProgress:0,
      button_loading: false,
      downloadstr:'批量下载',
    }
  },
  computed: {
    ...mapState('admin/layout', [
      'isMobile'
    ]),
    labelWidth () {
      return this.isMobile ? undefined : 50;
    },
    labelPosition () {
      return this.isMobile ? 'top' : 'left';
    }
  },
  created () {
    this.getSmpling();
  },
  methods: {
    exports () {
      this.getExportsApi()
    },
    async getExportsApi () {
      this.button_loading = true;

      let [th, filekey, data, fileName] = [[], [], [], ""];
      // var excel_data = this.userFrom;
      var excel_data = Object.assign({}, this.formValidate);
      delete excel_data.size;
      delete excel_data.page;
      let excelData = JSON.parse(JSON.stringify(excel_data));
      let lebData = await this.getExcelData(excelData);
      if (lebData.code == 400) {
        this.$Message.error(lebData.msg);
        this.button_loading = false;
        return
      }
      var path = lebData.data.path;
      this.send_count = 0;
      this.getCsvProgress(path);
      return;
      this.excelishas(path);
      return
    },
    getCsvProgress(path){
      getCsvProgress({path:path}).then(res=>{
        var data = res.data;
        console.log(res.data);
        if(data.data.progress == 100){
          this.button_loading = false;
          this.downloadstr = '批量下载';
          window.open(path + "?" + Date.now());
        }else{
          this.downloadProgress = data.data.progress;
          this.downloadstr = this.downloadProgress+'%';
          const _that = this;
          setTimeout(function () {
            // 打印screenWidth变化的值
            _that.getCsvProgress(path);
          }, 1000);
         
          // this.getCsvProgress(path);
        }
      })
    },
    excelishas (str) {
      if (this.send_count == 20) {
        this.button_loading = false;
        this.$Message.error('请求失败');
        return;
      }
      phpExceldownload(str).then(res => {
        console.log(str, "str")
        if (res.data.code == 200) {
          this.button_loading = false;
          window.open(
            str + '?' + Date.now()
          );
        } else {
          console.log(res.data.msg, "失败")
          const _that = this;
          setTimeout(function () {
            // 打印screenWidth变化的值
            _that.excelishas(str);
            _that.send_count++;
          }, 1000);
        }
      })

    },
    getExcelData (excelData) {
      return new Promise((resolve, reject) => {
        Csvuser(excelData).then((res) => {
          return resolve(res.data);
        });
      });
    },
    reset (name) {
      this.formValidate = {
        keyword: "",
        page: 1, // 当前页
        size: 20, // 每页显示条数
      };
      this.getSmpling();
    },
    exportfuntion () {
      console.log(this.token)
      return 'http://localhost:8080/' + 'ainatapi/export/sampleOrgan?' + qs.stringify(this.formValidate)
    },
    onCancel () { },
    ok () { },
    cancel () { 

    },
    handleSuccess (response, file, fileList) {
      var obj = {
        path: response.data.src
      }
      sampleOrganVerify(obj).then(res => {
        console.log(res.data.data, "resData")
        this.excelDatamodals = true;
        this.excelData = res.data.data;
        this.getSmpling();
      })
    },
    openItImage (rowImage, rowName) {
      this.srcList = []
      this.srcList = rowImage
      this.select_name = rowName
      this.modal1 = true
      // window.open(rowImage)
    },
    getSmpling () {
      this.loading = true
      userApiGet(this.formValidate).then(res => {
        this.loading = false
        this.list = res.data.data.data
        this.total = res.data.data.total
        this.list.map((item, index) => {
          item.order = (this.formValidate.page - 1) * this.formValidate.size + index + 1;
          if (item.street != null) {
            item.streetOut = item.street.name
          }
        })
      })
    },
    deleteSmping (row, tit, num) {
      let delfromData = {
        title: tit,
        num: num,
        url: `riskdistrict/${row.id}`,
        method: 'DELETE',
        ids: ''
      };
      this.$modalSure(delfromData).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          this.$Message.success(res.data.msg);
          this.list.splice(num, 1);
          this.getSmpling()
        } else {
          this.$Message.error(res.data.msg);
        }

      }).catch(res => {
        this.$Message.error(res.data.msg);
      });
    },
    sizeChange (size) {
      this.formValidate.size = size;
      this.getSmpling();
      this.$refs.table.clearCurrentRow();
    },
    pageChange (index) {
      this.formValidate.page = index
      this.getSmpling();
    },
    // // 编辑
    edit (row) {
      this.$router.push({
        path: `/admin/riskdistrict/riskdistrictAdd/${row.id}`
      })
      let storage = window.localStorage;
      storage.setItem('sampingAdd', JSON.stringify(row));
    },
    lookcompany(row){
      this.companylist = [];
      userGetcompany({id:row.id}).then(res=>{
        console.log(res);
        this.loading = false;
        this.companylist = res.data.data
        this.companylist.map((item, index) => {
          item.order = (this.formValidate.page - 1) * this.formValidate.size + index + 1;
        })
        this.modal1 = true;
      })

    },
    // 表格搜索
    Searchs () {
      this.formValidate.page = 1;
      this.getSmpling();
    }
  }
}
</script>

<style scoped>
/* .shtitle {
  display: -moz-inline-box;
  display: inline-block;
  width: 80px;
  font-size: 12px;
} */
</style>
<style lang="stylus" scoped>
.tabBox_img{
  width: 30px;
  height: 30px;
}
.tabBox_img img{
  width: 30px;
  height: 30px;
}
.vertical-center-modal
  display flex
  align-items center
  justify-content center
  .ivu-modal
    top 0
.export
  display flex
  align-items center
  height 2.666rem
</style>
