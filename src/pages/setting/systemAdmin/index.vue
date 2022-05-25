<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader
        class="product_tabs"
        title="干部资料"
        hidden-breadcrumb
      ></PageHeader>
    </div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form
        ref="formValidate"
        :model="formValidate"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
        inline
      >
        <FormItem label="状态:" label-for="status1">
          <Select
            v-model="formValidate.status"
            placeholder="请选择"
            @on-change="userSearchs"
            clearable
          >
            <Option value="">全部</Option>
            <Option value="1">正常</Option>
            <Option value="0">停用</Option>
          </Select>
        </FormItem>
        <FormItem label="所属机构:" label-for="roles">
          <el-cascader
            v-model="formValidate.gov_id"
            :options="gov_idList"
            :props="optionProps"
            clearable
            size="small"
          ></el-cascader>
        </FormItem>
        <FormItem label="角色:" label-for="status1">
          <Select v-model="formValidate.roles" multiple>
            <Option
              v-for="(item, index) in role_List"
              :value="item.id"
              :key="index"
              >{{ item.role_name }}</Option
            >
          </Select>
        </FormItem>

        <FormItem label="搜索：" label-for="status2">
          <Input
            search
            enter-button
            placeholder="请输入姓名或者手机号"
            v-model="formValidate.name"
            @on-search="userSearchs"
          />
        </FormItem>
        <Row type="flex">
          <!--  v-auth="['setting-system_admin-add']" -->
          <Button type="primary" @click="add('添加')" icon="md-add"
            >添加干部</Button
          >

          <Upload
            :action="fileurlL"
            :headers="{
              'Authori-zation': token,
            }"
            :on-success="handleSuccess"
          >
            <Button style="margin-left: 15px" type="success" class="bnt mr15"
              >批量导入</Button
            >
          </Upload>

          <Button type="success" class="bnt mr15" @click="exports"
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
        <!-- <template slot-scope="{ row, index }" slot="roles">
          <div v-if="row.roles.length !== 0">
            <Tag
              color="blue"
              v-for="(item, index) in row.roles.split(',')"
              :key="index"
              v-text="item"
            ></Tag>
          </div>
        </template> -->
        <template slot-scope="{ row, index }" slot="gov_bureau">
          {{ row.gov_bureau }}
        </template>
        <template slot-scope="{ row, index }" slot="status">
          <i-switch
            v-model="row.status"
            :value="row.status"
            :true-value="1"
            :false-value="0"
            @on-change="onchangeIsShow(row)"
            size="large"
          >
            <span slot="open">正常</span>
            <span slot="close">停用</span>
          </i-switch>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <a @click="edit(row, '编辑')">编辑</a>
          <Divider type="vertical" />
          <a @click="del(row, '删除', index)">删除</a>
        </template>
      </Table>
      <div class="acea-row row-right page">
        <Page
          :total="total"
          :current="formValidate.page"
          show-elevator
          show-total
          @on-change="pageChange"
          :page-size="formValidate.limit"
        />
      </div>
    </Card>
    <!-- 添加 编辑 -->
    <!-- <admin-from
      :FromData="FromData"
      ref="adminfrom"
      @submitFail="submitFail"
    ></admin-from> -->
    <Modal
      v-model="modals"
      @on-cancel="onCancel"
      scrollable
      footer-hide
      closable
      :title="`${modelTit}干部`"
      :mask-closable="false"
      width="600"
    >
      <Form
        ref="formInline"
        :model="formInline"
        :rules="ruleValidate"
        :label-width="90"
        :label-position="labelPosition2"
        @submit.native.prevent
      >
        <FormItem label="姓名" prop="real_name">
          <Input placeholder="请输入姓名" v-model="formInline.real_name" />
        </FormItem>
        <!-- <FormItem label="浙政厅帐号" prop="zztaccounts">
          <Input
            placeholder="请输入浙政厅帐号"
            v-model="formInline.zztaccounts"
          />
        </FormItem> -->
        <FormItem label="电话" prop="phone">
          <Input placeholder="请输入电话" v-model="formInline.phone" />
        </FormItem>
        <FormItem label="所属机构" prop="gov_id">
          <el-cascader
            v-model="formInline.gov_id"
            :options="gov_idList"
            :props="optionProps"
            clearable
            size="small"
          ></el-cascader>
        </FormItem>
        <FormItem label="角色" prop="roles">
          <Select v-model="formInline.roles" multiple>
            <Option
              v-for="(item, index) in role_List"
              :value="item.id"
              :key="index"
              >{{ item.role_name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="启用状态" prop="status">
          <i-switch
            v-model="formInline.status"
            size="large"
            :true-value="1"
            :false-value="0"
          >
            <span slot="open">正常</span>
            <span slot="close">停用</span>
          </i-switch>
        </FormItem>

        <Spin size="large" fix v-if="spinShow"></Spin>
        <Button
          type="primary"
          size="large"
          long
          @click="handleSubmit('formInline')"
          >提交</Button
        >
      </Form>
    </Modal>
    <Modal
      v-model="excelDatamodals"
      scrollable
      footer-hide
      closable
      title="导入数据"
      :mask-closable="false"
      width="600"
    >
      <Spin size="large" fix v-if="ModalspinShow"></Spin>
      <List border size="small">
        <ListItem v-for="(item, index) in excelData" :key="index">
          <Alert type="success" v-if="item.error == 0" style="width: 100%">
            <Row>
              <Col span="6"> 姓名: <br />{{ item.real_name }}</Col>
              <Col span="6">电话: <br />{{ item.phone }}</Col>
              <Col span="6">机构名称: <br />{{ item.gov_name }}</Col>
              <Col span="6">级别: <br />{{ item.level }}</Col>
            </Row>
            <br />
          </Alert>
          <Alert type="error" v-else style="width: 100%">
            <Row>
              <Col span="6"> 姓名: <br />{{ item.real_name }}</Col>
              <Col span="6">电话: <br />{{ item.phone }}</Col>
              <Col span="6">机构名称: <br />{{ item.gov_name }}</Col>
              <Col span="6">级别: <br />{{ item.level }}</Col>
            </Row>
            <br />
            <Row>
              <Col> 失败原因: <br />{{ item.error_str }}</Col>
            </Row>
          </Alert>
        </ListItem>
      </List>
      <Button type="primary" size="large" long @click="handleSubmit2()"
        >导入正确数据</Button
      >
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import qs from 'qs'
import { adminListApi, adminFromApi, adminEditFromApi, setShowApi, verifyApi, addadminbatch, gov_treeApi, role_select, addadminApi, updateadminApi, exportadminApi } from '@/api/systemAdmin';
import adminFrom from '../../../components/from/from';
import { getToken, getLoginInfo } from '@/utils/auth'
import exportExcel from "@/utils/newToExcel.js";
export default {
  name: 'systemAdmin',
  components: { adminFrom },
  data() {
    return {
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24
      },
      total: 0,
      loading: false,
      excelDatamodals: false,
      roleData: {
        status1: ''
      },
      spinShow: false,
      ModalspinShow: false,
      formInline: {
        status: 1,
        roles: "",
        gov_id: "",
        phone: "",
        real_name: "",
      },
      modelTit: '',
      formValidate: {
        roles: '',
        status: '',
        name: '',
        gov_id: '',
        page: 1, // 当前页
        limit: 10, // 每页显示条数,

      },
      exclurl: "/ainatapi/export/admin?token=" + getToken(),
      fileurlL: "/ainatapi/file/tmp/upload?token=" + getToken(),
      ruleValidate: {
        real_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        // gov_id: [
        //   { required: true, message: '请选择机构', trigger: 'change' }
        // ],
        // roles: [
        //   { required: true, message: '请选择角色', trigger: 'change' }
        // ],
      },
      optionProps: {
        value: "id",
        label: "name",
        children: "children",
        checkStrictly: true
      },
      token: 'Bearer ' + getToken(),
      list: [],
      columns1: [
        {
          title: '姓名',
          key: 'real_name',
          minWidth: 120
        },
        {
          title: '电话',
          key: 'phone',
          minWidth: 150
        },
        {
          title: '开启',
          slot: 'status',
          minWidth: 90
        },
        // {
        //   title: '浙政厅帐号',
        //   key: 'zztaccounts',
        //   minWidth: 120
        // },
        {
          title: '所属局',
          slot: 'gov_bureau',
          minWidth: 150
        },
        {
          title: '所属所',
          key: 'gov_station',
          minWidth: 150
        },
        {
          title: '角色',
          key: 'roles_text',
          minWidth: 200
        },
        // {
        //   title: '最后一次登录时间',
        //   key: '_last_time',
        //   minWidth: 180
        // },
        // {
        //   title: '最后一次登录ip',
        //   key: 'last_ip',
        //   minWidth: 180
        // },

        {
          title: '操作',
          key: 'action',
          slot: 'action',
          fixed: 'right',
          minWidth: 120
        }
      ],
      FromData: null,
      modals: false,
      excelData: null,
      modalTitleSs: '',
      ids: Number,
      gov_idList: [],
      role_List: [],
      // format:
    }
  },
  computed: {
    ...mapState('admin/layout', [
      'isMobile'
    ]),
    labelWidth() {
      return this.isMobile ? undefined : 70;
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'right';
    },
    labelPosition2() {
      return this.isMobile ? 'top' : 'right';
    }
  },
  created() {
    this.getList();
    // var userInfo = JSON.parse(getLoginInfo());
    // console.log(userInfo)
    // console.log(11111111)

    gov_treeApi().then(res => {
      this.gov_idList = res.data.data;
      for (var i = 0; i < this.gov_idList.length; i++) {
        if (this.gov_idList[i].children.length == 0) {
          var obj = this.gov_idList[i]
          delete obj.children
          this.gov_idList[i] = obj
        } else {
          for (var j = 0; j < this.gov_idList[i].children.length; j++) {
            var obj = this.gov_idList[i].children[j]
            delete obj.children
            this.gov_idList[i].children[j] = obj
          }
        }
      }
    })
    role_select().then(res => {
      console.log(res.data)
      this.role_List = res.data.data
    })
  },
  methods: {
    // 修改是否开启
    onchangeIsShow(row) {
      let data = {
        id: row.id,
        status: row.status
      }
      setShowApi(data).then(async res => {
        this.$Message.success(res.msg);
      }).catch(res => {
        this.$Message.error(res.msg);
      })
    },
    exportadminApidownload() {
      exportadminApi()
    },
    // 请求列表
    submitFail() {
      this.getList();
    },
    exportfuntion() {
      var obj = {
        roles: this.formValidate.roles + "",
        status: this.formValidate.status,
        real_name: this.formValidate.name,
        gov_id: this.formValidate.gov_id[this.formValidate.gov_id.length - 1] || this.formValidate.gov_id,
        page: this.formValidate.page, // 当前页
        limit: this.formValidate.limit, // 每页显示条数,
      }
      return 'http://localhost:8080/' + 'ainatapi/export/admin?' + qs.stringify(obj)
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formInline.gov_id == "") {
            this.$Message.error('请选择机构!');
            return
          }
          if (this.formInline.roles == "") {
            this.$Message.error('请选择角色!');
            return
          }
          if (this.modelTit == "添加") {
            // return;
            var obj = {
              gov_id: this.formInline.gov_id[this.formInline.gov_id.length - 1],
              phone: this.formInline.phone,
              real_name: this.formInline.real_name,
              roles: this.formInline.roles + "",
              status: this.formInline.status,
            }
            addadminApi(obj).then(res => {
              if (res.data.code == 200) {
                this.modals = false;
                this.getList()
              } else {
                this.$Message.error(res.data.msg);
              }
            })
          } else {
            console.log(this.formInline.gov_id)
            var obj = {
              gov_id: this.formInline.gov_id[this.formInline.gov_id.length - 1] || this.formInline.gov_id,
              phone: this.formInline.phone,
              real_name: this.formInline.real_name,
              roles: this.formInline.roles + "",
              status: this.formInline.status,
            }
            updateadminApi(this.formInline.id, obj).then(res => {
              if (res.data.code == 200) {
                this.modals = false;
                this.getList()
              } else {
                this.$Message.error(res.data.msg);
              }
            })
          }

        } else {

        }
      })
    },
    //批量添加数据
    handleSubmit2() {
      var arr = []
      for (var i = 0; i < this.excelData.length; i++) {
        if (this.excelData[i].error == 0) {
          arr.push(this.excelData[i])
        }
      }
      var obj = {
        admins: JSON.stringify(arr)
      }
      addadminbatch(obj).then(res => {
        if (res.data.code = 200) {
          this.getList()
          this.excelDatamodals = false;
        }
      })
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      this.excelDatamodals = true;
      var obj = {
        path: response.data.src
      }
      this.ModalspinShow = true
      verifyApi(obj).then(res => {
        // console.log(res.data)
        this.ModalspinShow = false
        this.excelData = res.data.data;
      })
    },
    // 数据导出；
    async exports() {
      let [th, filekey, data, fileName] = [[], [], [], ""];
      let excelData = JSON.parse(JSON.stringify(this.formValidate));
      let lebData = await this.getExcelData(excelData);
      if (!fileName) fileName = lebData.filename;
      if (!filekey.length) {
        filekey = lebData.filekey;
      }
      if (!th.length) th = lebData.header;
      data = data.concat(lebData.export);
      console.log(data)
      exportExcel(th, filekey, fileName, data);
    },
    getExcelData(excelData) {
      return new Promise((resolve, reject) => {
        exportadminApi(excelData).then((res) => {
          return resolve(res.data);
        });
      });
    },
    // 列表
    getList() {
      this.loading = true;
      var obj = {
        roles: this.formValidate.roles + "",
        status: this.formValidate.status,
        real_name: this.formValidate.name,
        gov_id: this.formValidate.gov_id[this.formValidate.gov_id.length - 1] || this.formValidate.gov_id,
        page: this.formValidate.page, // 当前页
        limit: this.formValidate.limit, // 每页显示条数,
      }
      adminListApi(obj).then(async res => {
        this.total = res.data.data.total;
        this.list = res.data.data.data;
        this.loading = false;
      }).catch(res => {
        this.loading = false;
        this.$Message.error(res.msg);
      })
    },
    pageChange(index) {
      this.formValidate.page = index
      this.getList();
    },
    // 添加表单
    add(str) {
      this.formInline = {
        status: 1,
        roles: "",
        gov_id: "",
        phone: "",
        real_name: "",
      }
      this.modelTit = str;
      this.modals = true;
    },
    // 编辑
    edit(row, name) {
      this.modelTit = name;
      this.formInline.id = row.id;
      this.modals = true;
      this.getIofo(row)
      console.log(row);
      var arr = row.roles
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i] * 1
      }
      this.formInline = {
        status: row.status,
        roles: arr,
        gov_id: row.gov_bureau_id,
        phone: row.phone,
        real_name: row.real_name,
        id: row.id,
      }
      if (row.gov_station_id > 0) {
        this.formInline.gov_id = row.gov_station_id
      }
      console.log(this.formInline.gov_id)
      // gov_station_id
      // adminEditFromApi(row.id).then(async res => {
      //   if (res.data.status === false) {
      //     return this.$authLapse(res.data);
      //   }
      //   this.FromData = res.data;
      //   this.$refs.adminfrom.modals = true;
      // }).catch(res => {
      //   this.$Message.error(res.msg);
      // })
    },
    // 详情
    getIofo(row) {
      // this.spinShow = true;

      // roleInfoApi(row.id).then(async res => {
      //   let data = res.data
      //   this.formInline = data.role || this.formInline;
      //   this.formInline.checked_menus = this.formInline.rules;
      //   this.tidyRes(data.menus);
      //   this.spinShow = false;
      // }).catch(res => {
      //   this.spinShow = false;
      //   this.$Message.error(res.msg);
      // })
    },
    onCancel() {
      this.$refs['formInline'].resetFields();
      this.formInline.checked_menus = [];
    },
    // 删除
    del(row, tit, num) {
      let delfromData = {
        title: tit,
        num: num,
        url: `setting/admin/${row.id}`,
        method: 'DELETE',
        ids: ''
      };
      this.$modalSure(delfromData).then((res) => {
        this.$Message.success(res.msg);
        this.getList();
      }).catch(res => {
        // this.$Message.error(res.msg);
        this.getList();
      });
    },
    // 表格搜索
    userSearchs() {
      this.formValidate.page = 1;
      this.list = [];
      this.getList();
    }
  }
}
</script>

<style scoped>
</style>
