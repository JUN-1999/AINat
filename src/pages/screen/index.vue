<template>
  <div
    class="maindiv"
    :style="{
      backgroundImage: 'url(' + require('@/assets/img/true.png') + ')',
    }"
  >
    <!--header-->
    <div class="header">
      <div
        class="bg_header"
        :style="{
          backgroundImage: 'url(' + require('@/assets/img/title.png') + ')',
        }"
      >
        <div class="header_nav fl t_title">
          <div
            style="display: flex; justify-content: center; padding-left: 180px"
          >
            <div>AI核酸比对系统</div>
            <div
              style="font-size: 14px; padding-left: 30px; margin-top: 12px"
              id="time"
            ></div>
            <!-- 全屏和退出按钮 -->
            <div class="header-button">
              <!-- 全屏按钮 -->
              <span class="hader-icon" @click="toggleFullscreen">
                <Icon
                  custom="i-icon i-icon-full-screen"
                  v-show="!isFullscreen"
                />
                <Icon
                  custom="i-icon i-icon-exit-full-screen"
                  v-show="isFullscreen"
                />
              </span>
              <!-- 退出按钮 -->
              <button @click="handleClick">退出</button>
            </div>
            <!-- <template v-if="show !== 'showItFalse'">
              <span
                class="iconfont icon-quanping maxIt"
                @click="screenF11"
                v-if="!isQuanPing"
              ></span>
              <span
                class="iconfont icon-quxiaoquanping maxIt"
                v-else
                @click="exitScreen"
              ></span>
            </template> -->
          </div>
        </div>
      </div>
    </div>

    <!--main-->
    <div class="data_content">
      <!-- 顶部按钮和提示信息 -->
      <div class="data_content_header_tool">
        <div class="header_tool_left">
          <Upload
            :action="fileurlL"
            :headers="{
              'Authori-zation': token,
            }"
            :on-success="handleSuccess"
            style="float: left"
            :show-upload-list="false"
          >
            <Button
              :loading="upload_loading"
              icon="ios-cloud-upload-outline"
              type="primary"
              class="mr20"
            >
              上传
            </Button>
          </Upload>
          <Button
            @click="replaceListData"
            :disabled="upload_loading"
            :loading="nat_button_loading"
            >{{ nat_button_name }}</Button
          >
          <Button @click="showSaveTake">保存任务</Button>
          <Button @click="showTakeList">查看任务</Button>
        </div>

        <span>
          请将证件号放置在第一列，检测需求期限（小时）放置在第二列，将第三列、第四列、第五列空置，其他列可选填（导出内容不变）
        </span>
        <div class="header_tool_right">
          <Button :loading="button_loading" @click="getExports">
            {{ downloadstr }}
          </Button>
          <Button @click="download">模板下载</Button>
        </div>
      </div>
      <!-- 查询 -->

      <div class="data_content_select">
        <div style="margin-left: 30px">证件号：</div>
        <div class="data_content_select_input">
          <Input
            v-model="selectUserIdCard"
            search
            enter-button
            placeholder="请输入证件号"
            @on-search="selectFromTable"
          />
        </div>

        <span>姓名：{{ selectInfo.user_name }}</span>
        <span>最近一次采样时间：{{ selectInfo.collect_time }}</span>
        <span
          >距今时间：{{
            selectInfo.formnow_time ? selectInfo.formnow_time + "小时" : ""
          }}</span
        >
      </div>

      <!-- 比对进度条 -->
      <Progress
        class="biduiProgress"
        v-show="showProgress"
        :percent="percent"
        :stroke-width="20"
        status="active"
        text-inside
      />
      <!-- 表格 -->

      <Table
        ref="table"
        :columns="columns"
        :data="tableDataList"
        no-userFrom-text="暂无数据"
        height="700"
        no-filtered-userFrom-text="暂无筛选结果"
        :loading="loading"
        :row-class-name="rowClassName"
        @on-sort-change="onSortChange"
        v-loadmore="loadMoreTableData"
      >
        <template slot-scope="{ row, index }" slot="is_overdue">
          <span v-if="row.is_overdue == '是'" style="color: red"> 超期</span>
          <span v-if="row.is_overdue == '否'"> 否</span>
          <span></span>
        </template>
      </Table>

      <!-- 保存弹窗 -->
      <Modal
        v-model="saveTakeFlag"
        title="保存任务"
        @on-ok="saveTakeOk"
        @on-cancel="saveTakeCancel"
      >
        <Input
          :autofocus="true"
          v-model="TakeName"
          type="text"
          placeholder="请输入任务名称"
        />
      </Modal>
      <!-- 任务队列弹窗 -->
      <Modal
        v-model="takeListFlag"
        title="任务队列"
        :footer-hide="false"
        @on-cancel="calTake"
      >
        <Table ref="takeTable" :columns="takeColumns" :data="takeData">
          <template slot-scope="{ row, index }" slot="action">
            <a @click="showTake(row)">查看</a>
          </template>
        </Table>
        <Page
          :total="total"
          :current="current"
          :page-size="pageSize"
          size="small"
          show-elevator
          show-total
          transfer
          @on-change="changPage"
          class-name="page"
        />
        <template #footer>
          <Button @click="calTake">取消</Button>
        </template>
      </Modal>
    </div>
  </div>
</template>
<script>
import "@/styles/dpsj/bootstrap.css";
import "@/styles/dpsj/base.css";
import "@/styles/dpsj/index.css";
import iHeaderSearch from "@/layouts/basic-layout/header-search";
import iHeaderFullscreen from "@/layouts/basic-layout/header-fullscreen";
import { mapState, mapActions } from "vuex";
import { getToken } from "@/utils/auth";
import { getCsvProgress, phpExceldownload } from "@/api/system";

import {
  natCompareAPI,
  getNatCompare,
  postNatCompare,
  natExport,
  natCompareProgress,
  actualHsjc,
  saveTask,
  getTaskList,
  readTask,
} from "@/api/ainat";

export default {
  name: "index",

  components: { iHeaderSearch, iHeaderFullscreen },
  data() {
    return {
      key: "", //排序参数 排序字段
      order: "", //排序参数 排序规则
      tablePageIndex: 1, // 懒加载数据  当前页
      tablePageCount: 1000, // 懒加载数据 总数
      tablePageSize: 100, // 懒加载数据 展示每页数
      tableDataList: [], // 懒加载数据  列表
      showProgress: false, //是否显示进度条
      percent: 0, // 进度条进度
      upload_loading: false,
      total: 0, // 任务队列分页数据
      current: 1, // 任务队列分页数据
      pageSize: 10, // 任务队列分页数据
      segmentSize: 1, // 当前分段
      last_segmentSize: 1, // 总分段
      size: 1000, //分段 获取 每页数
      takeColumns: [
        {
          title: "历史名称",
          key: "name",
        },
        {
          title: "创建时间",
          key: "create_time",
        },
        {
          title: "操作",
          slot: "action",
        },
      ],
      takeData: [],
      selectTack: {},
      takeInfo: {},
      takeListFlag: false,
      TakeName: "",
      saveTakeFlag: false,
      selectInfo: {
        user_name: "",
        collect_time: "",
        formnow_time: "",
      },
      sign: "", //签名
      selectUserIdCard: "", // 要去查询的idcard
      nat_button_loading: false,
      nat_button_name: "比对",
      formValidate: [],
      downloadstr: "结果导出",
      button_loading: false,
      fileurlL: "/ainatapi/file/tmp/upload?token=" + getToken(),
      token: "Bearer " + getToken(),
      loading: false,
      columns: [
        {
          title: "证件号",
          key: "user_idcard",
          minWidth: 120,
        },
        {
          title: "检测要求期限（小时）",
          key: "natest_hours",
          minWidth: 70,
        },
        {
          title: "最近一次采样时间",
          key: "collect_time",
          minWidth: 70,
          sortable: "custom",
        },
        {
          title: "距离超期时间（小时）",
          key: "unexpired_hours",
          minWidth: 70,
          sortable: "custom",
        },
        {
          title: "是否超期未检",
          slot: "is_overdue",
          minWidth: 70,
        },
        {
          title: "人员类别",
          key: "staff_classify_name",
          minWidth: 70,
        },
        {
          title: "姓名",
          key: "user_name",
          minWidth: 70,
        },
        {
          title: "手机号",
          key: "user_phone",
          minWidth: 70,
        },
        {
          title: "所在镇街",
          key: "yw_street",
          minWidth: 70,
        },
        {
          title: "所属社区",
          key: "community",
          minWidth: 70,
        },
        {
          title: "所在企业（单位）",
          key: "company_name",
          minWidth: 70,
        },
        {
          title: "负责人",
          key: "link_bane",
          minWidth: 70,
        },
        {
          title: "手机号",
          key: "link_phone",
          minWidth: 70,
        },
        {
          title: "主管部门",
          key: "gov",
          minWidth: 70,
        },
        {
          title: "部门负责人",
          key: "gov_charge",
          minWidth: 70,
        },
        {
          title: "电话",
          key: "charge_phone",
          minWidth: 70,
        },
      ],
      list: [],

      ds1: "",
      isQuanPing: false,
    };
  },
  props: {
    show: {
      type: String,
      default: "",
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      let that = this;

      this.ds1 = setInterval(function () {
        var date = new Date(); //获得当前时间
        var yy = date.getFullYear(); //年份
        var mm = date.getMonth() + 1; //获得月份
        mm = mm < 10 ? "0" + mm : mm; //月份小于10时，前面加个0(例如9 ->09)天，小时，分钟，秒同理
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //天
        var hours =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //小时
        var minutes =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //分钟
        var seconds =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
        document.getElementById("time").innerHTML =
          yy +
          "年" +
          mm +
          "月" +
          dd +
          "日 " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds;
      }, 1000);
    });
  },
  computed: {
    ...mapState("admin/layout", ["isFullscreen"]),
  },

  methods: {
    // 退出
    ...mapActions("admin/account", ["logout"]),
    ...mapActions("admin/layout", ["toggleFullscreen"]),

    handleClick(name) {
      clearInterval(this.ds1);
      this.ds1 = null;
      this.logout({
        confirm: this.logoutConfirm,
        vm: this,
      });
    },

    //   行样式
    rowClassName() {
      return "row-table-class";
    },
    screenF11() {
      var el = document.documentElement;
      var rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;

      //typeof rfs != "undefined" && rfs
      if (rfs) {
        rfs.call(el);
        this.isQuanPing = true;
      } else if (typeof window.ActiveXObject !== "undefined") {
        //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
          this.isQuanPing = true;
        }
      }
    },
    exitScreen() {
      var el = document;
      var cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;

      //typeof cfs != "undefined" && cfs
      if (cfs) {
        cfs.call(el);
        this.isQuanPing = false;
      } else if (typeof window.ActiveXObject !== "undefined") {
        //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
          this.isQuanPing = false;
        }
      }
    },

    // 懒加载数据初始化
    lazyTableInit() {
      // 懒加载初始默认值
      this.tableDataList = this.list.slice(0, this.tablePageSize);
      this.tablePageIndex = 1;
      this.tablePageCount = 1000;
    },
    // 上传
    async handleSuccess(response, file, fileList) {
      this.upload_loading = true;
      // this.loading = true;
      // 导入 获得签名
      let compareRef = await natCompareAPI({ path: response.data.src });
      console.log("compareRef:", compareRef);
      this.sign = compareRef.data.data.sign;

      await this.ifFinishNat();
    },

    // 判断是否上传完成

    async ifFinishNat() {
      let res = await getNatCompare({
        sign: this.sign,
        page: this.segmentSize,
        size: 1,
      });
      if (res.data.data.total == 0) {
        setTimeout(async () => {
          await this.ifFinishNat();
        }, 1000);
      } else {
        this.upload_loading = false;
        this.tablePageCount = res.data.data.total;
        await this.getList();
        await this.comparison();
      }
    },
    // 获取列表数据
    async getList(key, order) {
      // 分段获取
      this.segmentSize = 1;
      this.list = [];
      this.showProgress = true;
      this.percent = 0;
      do {
        // 利用签名 获得数据
        let NatCompareList = await getNatCompare({
          sign: this.sign,
          page: this.segmentSize,
          size: this.size,
          order: key ? key : "",
          sort: order ? order : "asc",
        });

        this.list = this.list.concat(NatCompareList.data.data.data);
        this.percent = parseInt(
          (NatCompareList.data.data.current_page /
            NatCompareList.data.data.last_page) *
            100
        );

        this.last_segmentSize = NatCompareList.data.data.last_page;

        this.segmentSize++;
      } while (this.segmentSize <= this.last_segmentSize);

      this.lazyTableInit();
      this.segmentSize = 1;
      this.showProgress = false;
    },
    // 比对
    async comparison() {
      if (this.list.length === 0) {
        this.$Message.error("没有数据不能比对");
        return;
      }
      this.nat_button_loading = true;

      await this.natCompareProgress();
    },

    // 去查询进度
    async natCompareProgress() {
      natCompareProgress({ sign: this.sign }).then(async (res) => {
        if (res.data.data.progress == 100) {
          this.nat_button_loading = false;
          this.nat_button_name = "比对";
          this.replaceListData();
        } else {
          this.nat_button_name = `${res.data.data.progress}%`;
          setTimeout(() => {
            this.natCompareProgress();
          }, 2000);
        }
      });
    },

    // 替换比对结果
    async replaceListData() {
      await this.getList();
    },

    // 结果导出
    async getExports() {
      if (!this.sign) {
        this.$Message.error("没有比对内容，不能导出");
        return;
      }

      this.button_loading = true;

      // var excel_data = this.userFrom;
      var excel_data = {
        sign: this.sign,
        order: this.ket,
        sort: this.order,
      };
      let excelData = JSON.parse(JSON.stringify(excel_data));
      let lebData = await this.getExcelData(excelData);
      if (lebData.code == 400) {
        this.$Message.error(lebData.msg);
        this.button_loading = false;
        return;
      }
      if (lebData.code !== 200) {
        this.$Message.error(lebData.msg);
        this.button_loading = false;
        return;
      }
      var path = lebData.data.path;
      this.send_count = 0;
      //  判断是否文件已经存在
      this.excelishas(path);

      return;
    },
    excelishas(str) {
      if (this.send_count == 2000) {
        this.button_loading = false;
        this.$Message.error("请求失败");
        return;
      }
      phpExceldownload(str).then((res) => {
        if (res.data.code == 200) {
          this.button_loading = false;
          window.open(str + "?" + Date.now());
        } else {
          const _that = this;
          setTimeout(function () {
            // 打印screenWidth变化的值
            _that.excelishas(str);
            _that.send_count++;
          }, 1000);
        }
      });
    },

    getExcelData(data) {
      return new Promise((resolve, reject) => {
        natExport(data).then((res) => {
          return resolve(res.data);
        });
      });
    },

    // 下载模版
    download() {
      window.open("/file/AI核酸对比导入模板.xlsx?t=" + Date.now());
    },

    // 排序查询
    async onSortChange({ column, key, order }) {
      if (this.list.length == 0) {
        this.$Message.error("没有数据不能排序");
        return;
      }
      this.key = key;
      this.order = order;

      await this.getList(key, order);
    },

    // 查询具体信息
    selectFromTable() {
      let selectUserIdCard = this.selectUserIdCard;
      console.log("selectUserIdCard:", selectUserIdCard);
      // 根据idcard查询后端
      actualHsjc({
        id_card: selectUserIdCard,
      }).then((res) => {
        if (res.data.code == 200) {
          let hsjcInfo = res.data.data;
          this.selectInfo.user_name = hsjcInfo.patientname;
          this.selectInfo.collect_time = hsjcInfo.collect_time;
          this.selectInfo.formnow_time = hsjcInfo.hours_ago;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },

    // 显示保存模态框
    showSaveTake() {
      this.saveTakeFlag = true;
    },
    //确认了任务
    saveTakeOk() {
      saveTask({
        sign: this.sign,
        name: this.TakeName,
      }).then((res) => {
        if (res.data.code === 200) {
          this.$Message.success(res.data.msg);
          this.TakeName = "";
          this.saveTakeFlag = false;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    // 取消了任务
    saveTakeCancel() {
      this.TakeName = "";
      this.saveTakeFlag = false;
    },

    // 查看任务队列
    showTakeList() {
      this.takeListFlag = true;
      this.getTakeList();
    },
    // 获得任务队列
    getTakeList() {
      getTaskList({
        size: this.pageSize,
        page: this.current,
      }).then((res) => {
        if (res.data.code === 200) {
          this.takeData = res.data.data.data;
          this.total = res.data.data.total;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    // 取消了任务队列
    calTake() {
      this.current = 1;
      this.takeListFlag = false;
    },

    // 查看某个任务
    showTake(row) {
      readTask(row.id).then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.data;

          this.lazyTableInit();

          this.current = 1;
          this.takeListFlag = false;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    // 任务队列分页
    changPage(page) {
      this.current = page;
      this.getTakeList();
    },

    // 懒加载
    loadMoreTableData() {
      this.tablePageIndex++;
      if (
        this.tablePageIndex >
        Math.ceil(this.tablePageCount / this.tablePageSize)
      ) {
        return false;
      }
      this.getTableData(this.tablePageIndex);
    },

    /**
     * @tablePageIndex 当前页
     * @tablePageCount 总数
     * @tablePageSize 每页显示页数
     * @list 通过接口获取到表格数据
     * @tableDataList 计算后要展示的表格数据
     */
    getTableData(tablePageIndex) {
      this.tablePageCount = this.list.length;
      if (this.tablePageCount <= this.tablePageSize) {
        tableDataList = this.list;
      } else {
        let pageIndexs = Math.ceil(this.tablePageCount / this.tablePageSize);
        console.log("pageIndexs", pageIndexs);
        if (tablePageIndex > pageIndexs) {
          tablePageIndex = pageIndexs;
        }
        let start = (tablePageIndex - 1) * this.tablePageSize;
        let end = tablePageIndex * this.tablePageSize;
        this.tableDataList = this.tableDataList.concat(
          this.list.slice(start, end)
        );
      }
    },
  },
};
</script>
<style>
.demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-color: transparent;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: #fff;
  background-color: #2c58a6;
  color: #fff;
}
.demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-radius: 0;
  background: #fff;
}
.demo-tabs-style2
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active {
  border-top: 1px solid #3399ff;
}
.demo-tabs-style2
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active:before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #3399ff;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
<style scoped>
@import "../../assets/iconfontQuanping/demo.css";
.primarybtn {
  background-color: #2c58a6 !important;
  border-color: #2c58a6 !important;
}
.dashedbtn {
  background-color: #fff !important;
  border-color: #fff !important;
}
.tryy {
  background-color: #072951;
  box-shadow: -10px 0px 15px #2c58a6 inset,
    /*左边阴影*/ 10px 0px 15px #2c58a6 inset; /*右边阴影*/
}
.conttable {
  margin-top: 2px !important;
  height: 248px;
  overflow: auto;
}
.conttable::-webkit-scrollbar {
  display: none;
}
.maindiv {
  min-width: 1350px;
  min-height: 100vh;
}
.t_title {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2.5em;
  line-height: 80px;
  color: #fff;
}
#chart_map {
  cursor: pointer;
}
.t_show {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 2px;
  background: #2c58a6;
  padding: 2px 5px;
  color: #fff;
  cursor: pointer;
}
.maxIt {
  font-size: 50px;
  position: absolute;
  cursor: pointer;
  right: 30px;
  top: 24px;
  width: 50px;
  height: 50px;
  z-index: 60;
  /* color: #fff; */
}
</style>
<style scoped>
>>> .ivu-table .row-table-class td {
  background-color: #031d40;
  color: white;
  border: 0px;
}
>>> .ivu-table .ivu-table-header th {
  background-color: #142945 !important;
  color: white;
  border: 0px;
}
.header-button {
  position: absolute;
  right: 20px;
  display: flex;
  align-items: baseline;
}
.header-button button {
  width: 50px;
  height: 50px;
  font-size: 20px;
  background-color: rgba(1, 1, 1, 0) !important;
}
.hader-icon {
  padding: 15px;
}

.data_content .data_content_header_tool {
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
}
.data_content .data_content_header_tool .header_tool_left {
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
  flex: 1;
}

.data_content .data_content_header_tool span {
  width: 815px;
}

.data_content .data_content_header_tool .header_tool_right {
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
  flex: 1;
}

.data_content .data_content_header_tool span {
  color: rgb(233, 188, 104);
}
.data_content .data_content_header_tool button {
  color: white;
  background: #062e52;
  border: 1px solid #074481;
}
.data_content_select {
  color: white;
  display: flex;
  align-items: center;
  margin: 15px 0;
}
.data_content_select .data_content_select_input {
  width: 300px;
  display: inline-block;
}
.data_content_select span {
  min-width: 200px;
  display: inline-block;
  margin-left: 20px;
}

>>> .ivu-input-search {
  background-color: #062e52 !important;
}
.page {
  height: 20px;
  line-height: 20px;
  margin: 10px 0 0 0;
}

.biduiProgress {
  width: 80%;
  margin: 0 50%;
  transform: translate(-50%, -5px);
}
</style>

