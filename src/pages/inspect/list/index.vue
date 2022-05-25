<template>
<div class="article-manager">
    <div class="i-layout-page-header">
        <PageHeader class="product_tabs" title="预约记录" hidden-breadcrumb>
        </PageHeader>
    </div>
    <!-- <Alert v-if="alertShow" banner closable type="warning" class="ivu-mt" @on-close="closeAlert">
        <router-link to="/admin/product/add_product/0">您有未完成的人员添加操作，点击此处可继续添加操作？</router-link>
    </Alert> -->
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Row :gutter="16" type="flex" style="margin-bottom: 10px;">
        <Col span="18">
        <span style="margin-right: 10px;" >搜索:</span>
        <Input
          style="width: 200px;margin-right: 10px;"
          v-model="artFrom.store_name"
          placeholder="关键字"
          element-id="store_name"
          clearable
        >
        </Input>
        </Col>
        <Col span="6" class="ivu-text-right userFrom">
              <Button
                type="primary"
                icon="ios-search"
                label="default"
                class="mr15"
                @click="userSearchs"
                >搜索</Button>
              <Button class="ResetSearch" @click="reset('userFrom')">重置</Button>
          </Col>
      </Row>
      <Row type="flex">
        <!-- <Button type="primary" class="bnt mr15" @click="addyuyue()">预约设置</Button> -->
        <Button type="success" class="bnt mr15" @click="exports">{{downloadstr}}</Button>
      </Row>
        <Table ref="table" :columns="
          artFrom.type !== '1' && artFrom.type !== '2' ? columns2 : columns
        " :data="tableList" class="ivu-mt" :loading="loading" highlight-row @on-selection-change="onSelectTab" no-data-text="暂无数据" no-filtered-data-text="暂无筛选结果" @on-select-all="selectAll" @on-select-all-cancel="selectAll">
            <template slot-scope="{ row }" slot="id">
                {{ row.id }}
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="edit(row)"
            >编辑</Button
          >
               <Button type="error" size="small" @click="del(row)">删除</Button>
            </template>
        </Table>
        <div class="acea-row row-right page">
            <Page :total="total" :current="artFrom.page" show-elevator show-total @on-change="pageChange" :page-size="artFrom.size" />
        </div>
    </Card>
    <!-- <Modal v-model="addshow" :z-index="100" class="Box" scrollable footer-hide closable :mask-closable="false" width="30%" :title="`${addTit}预约`">
        <earlyWarningadd v-if="addshow" :rowId="rowId" ref="earlyWarningadd" @on-close="onClose"></earlyWarningadd>
    </Modal> -->
    <modalinspect :roleid="roleid" :formType="formType" :visible.sync="addshow" @updateList='getList'> </modalinspect>
</div>
</template>

<script>
import earlyWarningadd from "./earlyWarningadd/index.vue";
import expandRow from "./tableExpand.vue";
import attribute from "./attribute";
import {
    mapState
} from "vuex";
import modalinspect from '@/pages/inspect/components/modalinspect'
import {listInspect, delInspect, statisticUserExcel} from "@/api/inspect";
import exportExcel from "@/utils/newToExcel.js";
export default {
    name: "inspect",
    components: {
        expandRow,
        attribute,
        modalinspect,
        earlyWarningadd
    },
    computed: {
        ...mapState("admin/layout", ["isMobile"]),
        labelWidth() {
            return this.isMobile ? undefined : 75;
        },
        labelPosition() {
            return this.isMobile ? "top" : "right";
        },
    },
    data() {
        return {
          roleid: 0,
          formType: 'create',
            rowId: '',
            addTit: '',
            addshow: false,
            template: false,
            grid: {
                xl: 6,
                lg: 8,
                md: 12,
                sm: 24,
                xs: 24,
            },
            artFrom: {
                page: 1,
                size: 15,
                type: "1",
                excel: 0,
            },
            list: [],
            tableList: [],
            treeSelect: [],
            loading: false,
            columns: [
              {
                type: 'selection',
                width: 60,
                align: 'center'
              },
              {
                title: "预约编号",
                key: "id",
                width: 80,
              },
              {
                title: "创建时间",
                key: "id",
                width: 100,
              },
              {
                title: "预约单位",
                key: "id",
                width: 120,
              },
              {
                title: "预约周几",
                key: "id",
                width: 80,
              },
              {
                title: "上下午",
                key: "id",
                width: 80,
              },
              {
                title: "开始时间",
                key: "id",
                width: 80,
              },
              {
                title: "截止时间",
                key: "id",
                width: 80,
              },
              {
                title: "预约人员类型",
                key: "id",
                width: 100,
              },
              {
                title: "所属企业",
                key: "id",
                width: 150,
              },
              {
                title: "姓名",
                key: "id",
                width: 80,
              },
              {
                title: "身份证号码",
                key: "id",
                width: 200,
              },
              {
                title: "手机",
                key: "id",
                width: 100,
              },
              {
                title: "所属局",
                key: "id",
                width: 100,
              },
              {
                title: "所属所",
                key: "id",
                width: 100,
              },
              {
                title: "所属干部",
                key: "id",
                width: 100,
              },
              {
                title: "干部手机",
                key: "id",
                width: 100,
              },
              {
                title: "年份",
                key: "id",
                width: 80,
              },
              {
                title: "第几周",
                key: "id",
                width: 80,
              },
              {
                title: "采样状态",
                key: "id",
                width: 80,
              },
              {
                title: "检测状态",
                key: "id",
                width: 80,
              },
              {
                title: "检测结果",
                key: "id",
                width: 80,
              },
              {
                title: "申诉状态",
                key: "id",
                width: 80,
              },
              {
                title: "未检反馈状态",
                key: "id",
                width: 100,
              },
              {
                title: "最近反馈时间",
                key: "id",
                width: 100,
              },
              {
                title: "操作",
                slot: "action",
                fixed: "right",
                minWidth: 220,
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
            alertShow: false,
            // activeKey:1
        };
    },
    watch: {
        $route() {
            if (this.$route.fullPath === "/admin/product/product_list?type=5") {
                this.getPath();
            }
        },
        formSelection(value) {
            // this.checkBox = value.length === this.tableList.length;
        },
        tableList: {
            deep: true,
            handler(value) {
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
    created() {
      this.getList()
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
    mounted() {
        // this.getDataList();
        // this.getDataList();
    },
    methods: {
      // 重置
    reset(name) {
      this.artFrom = {
        page: 1,
        size: 15,
        type: "1",
        excel: 0,
      }
      this.getList()
    },
      getList () {
        this.loading = true;
          listInspect(this.artFrom).then(async (res) => {
            this.list = res.data;
            this.total = res.data.count;
            this.loading = false;
          }).catch((res) => {
            this.loading = false;
            this.$Message.error(res.msg);
          });
        },
        onClose() {
            this.addshow = false;
        },
        addyuyue() {
            this.addTit = '添加'
            this.addshow = true;
        },
        closeAlert() {
            cacheDelete()
                .then((res) => {
                    this.$Message.success(res.msg);
                })
                .catch((err) => {
                    this.$Message.error(err.msg);
                });
        },
        selectAll(row) {
            if (row.length) {
                this.formSelection = row;
                this.selectionCopy = row;
            }

            this.selectionCopy.forEach((item, index) => {
                item.checkBox = this.checkBox;
                this.$set(this.tableList, index, item);
            });
        },
        getPath() {
            this.columns2 = [...this.columns];
            if (name !== "1" && name !== "2") {
                this.columns2.shift({
                    type: "selection",
                    width: 60,
                    align: "center",
                });
            }
            this.artFrom.page = 1;
            this.artFrom.type = this.$route.query.type.toString();
            this.getDataList();
        },
        // 全选
        onSelectTab(selection) {
            this.formSelection = selection;
            let data = [];
            selection.map((item) => {
                data.push(item.id);
            });
            this.ids = data;
        },

        // 人员列表；
        getDataList() {
            this.loading = true;
            getcenterGoods(this.artFrom)
                .then((res) => {
                    let data = res.data;
                    this.tableList = data.data.data.map((item) => {
                        if (this.isAll === 1) {
                            item.checkBox = true;
                        } else {
                            item.checkBox = false;
                        }
                        return item;
                    });
                    console.log(this.tableList)
                    this.total = data.data.total;
                    this.loading = false;
                })
                .catch((res) => {
                    this.loading = false;
                    // this.$Message.error(res.msg);
                });
        },
        pageChange(status) {
            this.artFrom.page = status;
            this.getDataList();
            this.$refs.table.clearCurrentRow();
        },
        cascaderSearchs(value, selectedData) {
            this.userSearchs();
        },
        // 表格搜索
        userSearchs() {
            this.artFrom.page = 1;
            this.formSelection = [];
            this.getDataList();
        },

        // 数据导出；
    async exports() {
      let [th, filekey, data, fileName] = [[], [], [], ""];
      let excelData = JSON.parse(JSON.stringify(this.artFrom));
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
        statisticUserExcel(excelData).then((res) => {
          return resolve(res.data);
        });
      });
    },

        // 属性弹出；
        attrTap() {
            this.attrTemplate = true;
        },
        // 编辑
        edit(row) {
            this.$router.push({
                path: "/admin/center/add_product/" + row.id
            });
        },
        // 确认
        del(row, tit, num) {
            let delfromData = {
                title: tit,
                num: num,
                url: `center/product/${row.id}`,
                method: "DELETE",
                ids: "",
            };
            this.$modalSure(delfromData)
                .then((res) => {
                    this.$Message.success(res.data.msg);
                    this.tableList.splice(num, 1);
                })
                .catch((res) => {
                    this.$Message.error(res.data.msg);
                });
        },
        // 删除成功
        // submitModel () {
        //     this.tableList.splice(this.delfromData.num, 1);
        //     this.goodHeade();
        // }
        // 排序
        sortChanged(e) {
            this.artFrom[e.key] = e.order;
            this.getDataList();
        },
    },
};
</script>

<style lang="stylus" scoped>
/deep/.ivu-modal-mask {
    z-index: 999 !important;
}

/deep/.ivu-modal-wrap {
    z-index: 999 !important;
}

.Box {
    >>>.ivu-modal-body {
        height: 700px;
        overflow: auto;
    }
}

.tabBox_img {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }
}

/deep/.ivu-table-cell-expand-expanded {
    margin-top: -6px;
    margin-right: 33px;
    transition: none;

    .ivu-icon {
        vertical-align: 2px;
    }
}

/deep/.ivu-table-header {
    // overflow visible
}

/deep/.ivu-table th {
    overflow: visible;
}

/deep/.select-item:hover {
    background-color: #f3f3f3;
}

/deep/.select-on {
    display: block;
}

/deep/.select-item.on {
    background: #f3f3f3;
}
</style>
