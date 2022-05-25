<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader
        class="product_tabs"
        title="采样机构"
        hidden-breadcrumb
      ></PageHeader>
    </div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form>
        <Row type="flex">
          <Button
            type="primary"
            class="bnt mr15"
            icon="md-add"
            to="/admin/sampling/sampingAdd"
            >添加机构</Button
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
        <template slot-scope="{ row, index }" slot="street"> </template>
        <template slot-scope="{ row, index }" slot="action">
          <a @click="edit(row)">设置</a>
          <Divider type="vertical" />
          <a @click="deleteSmping(row, '删除', index)">删除</a>
          <Divider type="vertical" />
          <a @click="openItImage(row.qrcode_path, row.name)">查看二维码</a>
        </template>
      </Table>
      <div class="acea-row row-right page">
        <Page
          :total="total"
          :current="formValidate.page"
          show-elevator
          show-total
          @on-change="pageChange"
          :page-size="formValidate.pageSize"
        />
      </div>
      <Modal
        v-model="modal1"
        title="查看二维码"
        @on-ok="ok"
        style="display: flex; justify-content: center; flex-direction: column"
        @on-cancel="cancel"
      >
        <img :src="srcList" alt="" sizes="" srcset="" />
        <div>机构名称:{{ select_name }}</div>
      </Modal>
      <Modal
        v-model="excelDatamodals"
        @on-cancel="onCancel"
        @on-ok="onAsyncOk"
        scrollable
        closable
        title="导入数据"
        :mask-closable="false"
        width="600"
      >
        <List border size="small">
          <ListItem v-for="(item, index) in excelData" :key="index">
            <Alert type="success" v-if="item.error == 0" style="width: 100%">
              <div>检测机构: {{ item.name }}</div>
              <div>街道: {{ item.street_name }}</div>
              <br />
            </Alert>
            <Alert type="error" v-else style="width: 100%">
              <div>检测机构: {{ item.name }}</div>
              <div>街道: {{ item.street_name }}</div>
              <br />
              <Row>
                <Col> 失败原因: <br />{{ item.error_str }}</Col>
              </Row>
            </Alert>
          </ListItem>
        </List>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import qs from 'qs'
import { samplingGet, samplingDelete, sampleOrganVerify, sampleBbatch, exportSampleOrgan } from '@/api/sampling';
import exportExcel from "@/utils/newToExcel.js";
import { getToken } from '@/utils/auth'
export default {
  name: 'systemAdmin',
  data() {
    return {
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
        size: 15,
        roles: '',
        status: '',
        name: '',
      },
      list: [],
      columns1: [
        {
          title: '采样机构',
          key: 'name',
          minWidth: 120
        },
        {
          title: '所属街道',
          key: 'streetOut',
          minWidth: 120
        },
        {
          title: '操作',
          slot: 'action',
          minWidth: 120
        },
      ],
      FromData: null,
      modalTitleSs: '',
      ids: Number,
      srcList: [],
      excelDatamodals: false,
      excelData: true,
      select_name: ''
    }
  },
  computed: {
    ...mapState('admin/layout', [
      'isMobile'
    ]),
    labelWidth() {
      return this.isMobile ? undefined : 50;
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'left';
    }
  },
  created() {
    this.getSmpling();
  },
  methods: {
    exportfuntion() {
      console.log(this.token)
      return 'http://localhost:8080/' + 'ainatapi/export/sampleOrgan?' + qs.stringify(this.formValidate)
    },
    onAsyncOk() {
      const formValidate = {
        sampleOrgans: []
      }
      this.excelData.map(item => {
        formValidate.sampleOrgans.push({
          "name": item.name,
          "street_id": item.street_id,
        })
      })
      formValidate.sampleOrgans = JSON.stringify(formValidate.sampleOrgans)
      sampleBbatch(formValidate).then(res => {
        this.$Message.success(res.data.msg);
      })
    },
    onCancel() { },
    ok() { },
    cancel() { },
    handleSuccess(response, file, fileList) {
      console.log(response, "res")
      var obj = {
        path: response.data.src
      }
      sampleOrganVerify(obj).then(res => {
        console.log(res.data.data, "resData")
        this.excelDatamodals = true;
        this.excelData = res.data.data;
      })
    },
    openItImage(rowImage, rowName) {
      this.srcList = []
      this.srcList = rowImage
      this.select_name = rowName
      this.modal1 = true
      // window.open(rowImage)
    },
    getSmpling() {
      samplingGet(this.formValidate).then(res => {
        this.list = res.data.list
        this.total = res.data.count
        this.list.map(item => {
          if (item.street != null) {
            item.streetOut = item.street.name
          }
        })
        console.log(res.list)
        console.log(this.list)
      })
    },
    deleteSmping(row, tit, num) {
      let delfromData = {
        title: tit,
        num: num,
        url: `sample/sample_organ/${row.id}`,
        method: 'DELETE',
        ids: ''
      };
      this.$modalSure(delfromData).then((res) => {
        console.log(res)
        this.$Message.success(res.data.msg);
        this.list.splice(num, 1);
        this.getSmpling()
      }).catch(res => {
        this.$Message.error(res.data.msg);
      });
    },
    onCopy() { },
    // pageChange() { },
    // // 修改是否开启
    // onchangeIsShow (row) {
    //   let data = {
    //     id: row.id,
    //     status: row.status
    //   }
    //   setShowApi(data).then(async res => {
    //     this.$Message.success(res.msg);
    //   }).catch(res => {
    //     this.$Message.error(res.msg);
    //   })
    // },
    // // 请求列表
    // submitFail () {
    //   this.getList();
    // },
    // // 列表
    // getList () {
    //   this.loading = true;
    //   this.formValidate.roles = this.formValidate.roles || ''
    //   adminListApi(this.formValidate).then(async res => {
    //     this.total = res.data.count;
    //     this.list = res.data.list;
    //     this.loading = false;
    //   }).catch(res => {
    //     this.loading = false;
    //     this.$Message.error(res.msg);
    //   })
    // },
    pageChange(index) {
      this.formValidate.page = index
      this.getSmpling();
    },
    // // 添加表单
    // add () {
    //   adminFromApi().then(async res => {
    //     this.FromData = res.data;
    //     this.$refs.adminfrom.modals = true;
    //   }).catch(res => {
    //     this.$Message.error(res.msg);
    //   })
    // },
    // // 编辑
    edit(row) {
      this.$router.push({
        path: `/admin/sampling/sampingAdd/${row.id}`
      })
      let storage = window.localStorage;
      console.log(row)
      storage.setItem('sampingAdd', JSON.stringify(row));
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
        exportSampleOrgan(excelData).then((res) => {
          return resolve(res.data);
        });
      });
    },
    // // 删除
    // del (row, tit, num) {
    //   let delfromData = {
    //     title: tit,
    //     num: num,
    //     url: `setting/admin/${row.id}`,
    //     method: 'DELETE',
    //     ids: ''
    //   };
    //   this.$modalSure(delfromData).then((res) => {
    //     this.$Message.success(res.msg);
    //     this.list.splice(num, 1);
    //   }).catch(res => {
    //     this.$Message.error(res.msg);
    //   });
    // },
    // // 表格搜索
    // userSearchs () {
    //   this.formValidate.page = 1;
    //   this.list = [];
    //   this.getList();
    // }
  }
}
</script>

<style lang="stylus" scoped>
.vertical-center-modal
  display flex
  align-items center
  justify-content center
  .ivu-modal
    top 0
>>> .ivu-modal-body
  display flex
  align-items center
  justify-content center
  flex-direction column
.export
  display flex
  align-items center
  height 2.666rem
</style>