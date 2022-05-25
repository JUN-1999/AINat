<template>
  <div class="article-manager">
    <div class="i-layout-page-header">
      <PageHeader class="product_tabs" hidden-breadcrumb>
        <div slot="content">
          <Tabs v-model="artFrom.name" @on-click="onClickTab">
            <TabPane
              :label="item.name"
              :name="index.toString()"
              v-for="(item, index) in headeNum"
              :key="index"
            />
          </Tabs>
        </div>
      </PageHeader>
      <div></div>
    </div>

    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form
        ref="artFrom"
        :model="artFrom"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent1
      >
        <Row type="flex" :gutter="6">
          <Col span="12">
            <Col v-bind="grid">
              <FormItem label="选择时间：" label-for="user_time">
                <!--<DatePicker clearable @on-change="onchangeTime" v-model="timeVal" :value="timeVal"  format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择时间" v-width="'100%'"></DatePicker>-->
                <DatePicker
                  :editable="false"
                  @on-change="onchangeTime"
                  :value="timeVal"
                  format="yyyy/MM/dd"
                  type="daterange"
                  placement="bottom-start"
                  placeholder="自定义时间"
                  style="width: 300px"
                  class="mr20"
                  :options="options"
                ></DatePicker>
              </FormItem>
            </Col>
          </Col>
          <Col span="6"> </Col>
          <Col span="6" class="ivu-text-right userFrom">
            <Button
              type="primary"
              icon="ios-search"
              label="default"
              class="mr15"
              @click="userSearchs"
              >搜索</Button
            >
            <Button class="ResetSearch" @click="reset('artFrom')">重置</Button>
          </Col>
        </Row>
      </Form>
      <Table
        ref="table"
        :columns="columns"
        height="540"
        :data="tableList"
        class="ivu-mt"
        :loading="loading"
        highlight-row
        @on-selection-change="onSelectTab"
        no-data-text="暂无数据"
        no-filtered-data-text="暂无筛选结果"
        @on-select-all="selectAll"
        @on-select-all-cancel="selectAll"
      >
        <template slot-scope="{ row }" slot="id">
          {{ row.id }}
        </template>
        <template slot-scope="{ row, index }" slot="status">
          <Tag color="error" v-if="row.status == 0">未办</Tag>
          <Tag color="success" v-else>已办</Tag>
        </template>
        <template slot-scope="{ row, index }" slot="olddata">
          <div class="newdatabox">
            <div v-for="(item, key) in row.olddata" :key="key">
              <span>
                {{ key }}:
                {{ item }}
              </span>
            </div>
          </div>
        </template>
        <template slot-scope="{ row, index }" slot="newdata">
          <div class="newdatabox">
            <div v-for="(item, key) in row.newdata" :key="key">
              <span>
                {{ key }}:
                {{ item }}
              </span>
            </div>
          </div>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <!-- <a @click="edit(row)">申诉督办</a>
          <Divider type="vertical" /> -->
          <a @click="shenhe(row)">查看详情</a>
        </template>
      </Table>
      <div class="acea-row row-right page">
        <Page
          :total="total"
          :current="artFrom.page"
          show-elevator
          show-total
          show-sizer
          @on-page-size-change="sizeChange"
          :page-size-opts="[5, 10, 15, 20]"
          @on-change="pageChange"
          :page-size="artFrom.size"
        />
      </div>
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { actionlog } from "@/api/common";
export default {
  name: "company_modifyrecord",
  components: {},
  computed: {
    ...mapState("admin/layout", ["isMobile"]),
    labelWidth () {
      return this.isMobile ? undefined : 75;
    },
    labelPosition () {
      return this.isMobile ? "top" : "right";
    },
  },
  data () {
    return {
      headeNum: [
        {
          name: "全部",
          index: -1,
          value: ''
        },
        {
          name: "企业日志",
          index: 0,
          value: 'company'
        },
        {
          name: "导出日志",
          index: 1,
          value: 'export'

        },
        {
          name: "预约日志",
          index: 2,
          value: 'subscribe'

        },
      ],
      formValidate2: {},
      grid: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      },
      timeVal: "",
      options: {
        shortcuts: [
          {
            text: "今天",
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate()
                )
              );
              return [start, end];
            },
          },
          {
            text: "昨天",
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(
                start.setTime(
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate() - 1
                  )
                )
              );
              end.setTime(
                end.setTime(
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate() - 1
                  )
                )
              );
              return [start, end];
            },
          },
          {
            text: "最近7天",
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(
                start.setTime(
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate() - 6
                  )
                )
              );
              return [start, end];
            },
          },
          {
            text: "最近30天",
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(
                start.setTime(
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate() - 29
                  )
                )
              );
              return [start, end];
            },
          },
          {
            text: "本月",
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(
                start.setTime(
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                )
              );
              return [start, end];
            },
          },
          {
            text: "本年",
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(
                start.setTime(new Date(new Date().getFullYear(), 0, 1))
              );
              return [start, end];
            },
          },
        ],
      },
      artFrom: {
        page: 1,
        size: 10,
        name: "0",
        type: "",
        source: 'admin'
      },
      tableList: [],
      loading: false,
      columns: [
        {
          title: "序号",
          key: "order",
          width: 80,
        },
        {
          title: "操作人",
          key: "person",
          width: 80,
        },
        {
          title: "操作时间",
          key: "create_time",
          width: 150,
        },
        {
          title: "内容",
          key: "content",
        },
      ],

      data: [],
      total: 0,
      attrTemplate: false,
      ids: [],
      display: "none",
      formSelection: [],
      selectionCopy: [],
      checkBox: false,
      isAll: -1,
      // activeKey:1
    };
  },
  watch: {
    tableList: {
      deep: true,
      handler (value) {
        value.forEach((item) => {
          this.formSelection.forEach((itm) => {
            if (itm.id === item.id) {
              item.checkBox = true;
            }
          });
        });
        const arr = this.tableList.filter((item) => item.checkBox);
        if (this.tableList.length) {
          this.checkBox = this.tableList.length === arr.length;
        } else {
          this.checkBox = false;
        }
      },
    },
  },
  created () {
    // console.log(this.$route,'444')
    // this.artFrom.type = this.$route.query.key || 1
    // this.columns2 = [...this.columns];
    // if (name !== '1' && name !== '2') {
    //     this.columns2.shift({
    //         type: 'selection',
    //         width: 60,
    //         align: 'center'
    //     })
    // }
  },
  mounted () {
    this.getDataList();
    // this.getDataList();
  },
  methods: {
    onchangeTime (e) {
      this.timeVal = e;
      if (e[0] != '' && e[1] != '') {
        this.artFrom.date_range = this.timeVal.join("-");
      } else {
        this.artFrom.date_range = '';
      }
    },
    onClickTab (index) {
      this.artFrom.type = this.headeNum[index].value;
      this.getDataList();
    },
    // 重置
    reset (name) {
      this.artFrom = {
        page: 1,
        size: 10,
        type: "company",
        name: 0,
        source: 'admin',
        date_range: ''
        // company_status: -1,
      };
      this.timeVal = '';
      this.getDataList();
    },

    selectAll (row) {
      if (row.length) {
        this.formSelection = row;
        this.selectionCopy = row;
      }
      this.selectionCopy.forEach((item, index) => {
        item.checkBox = this.checkBox;
        this.$set(this.tableList, index, item);
      });
    },
    // 全选
    onSelectTab (selection) {
      this.formSelection = selection;
      let data = [];
      selection.map((item) => {
        data.push(item.id);
      });
      this.ids = data;
    },
    getDataList () {
      this.loading = true;
      console.log(this.artFrom);
      actionlog(this.artFrom)
        .then((res) => {
          let data = res.data.data;
          this.tableList = data.data.map((item, index) => {
            item.order = (this.artFrom.page - 1) * this.artFrom.size + index + 1;
            if (this.isAll === 1) {
              item.checkBox = true;
            } else {
              item.checkBox = false;
            }
            return item;
          });
          this.total = data.total;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          // this.$Message.error(res.msg);
        });
    },
    sizeChange (size) {
      this.artFrom.size = size;
      this.getDataList();
      this.$refs.table.clearCurrentRow();
    },
    pageChange (status) {
      this.artFrom.page = status;
      this.getDataList();
      this.$refs.table.clearCurrentRow();
    },
    cascaderSearchs (value, selectedData) {
      this.userSearchs();
    },
    // 表格搜索
    userSearchs () {
      this.artFrom.page = 1;
      this.formSelection = [];
      this.getDataList();
    },

    // 删除成功
    // submitModel () {
    //     this.tableList.splice(this.delfromData.num, 1);
    //     this.goodHeade();
    // }
    // 排序
    sortChanged (e) {
      this.artFrom[e.key] = e.order;
      this.getDataList();
    },
  },
};
</script>

<style lang="stylus" scoped>
.newdatabox
  height 56px
  overflow hidden
  text-overflow ellipsis
  display -webkit-box
  -webkit-box-orient vertical
  -webkit-line-clamp 3
#shenheModel
  .mt20
    margin-top 0px
.ivu-modal-header
  padding 14px 16px 16px
>>>.ivu-modal-body
  padding 0px 0px
.ivu-modal-header
  padding 14px 16px 16px
.ivu-modal-body
  padding 0px 16px
/deep/.ivu-modal-mask
  z-index 999 !important
/deep/.ivu-modal-wrap
  z-index 999 !important
.Box
  >>>.ivu-modal-body
    height 700px
    overflow auto
.tabBox_img
  width 36px
  height 36px
  border-radius 4px
  cursor pointer
  img
    width 100%
    height 100%
/deep/.ivu-table-cell-expand-expanded
  margin-top -6px
  margin-right 33px
  transition none
  .ivu-icon
    vertical-align 2px
/deep/.ivu-table-header
  // overflow visible
/deep/.ivu-table th
  overflow visible
/deep/.select-item:hover
  background-color #f3f3f3
/deep/.select-on
  display block
/deep/.select-item.on
  background #f3f3f3
</style>
