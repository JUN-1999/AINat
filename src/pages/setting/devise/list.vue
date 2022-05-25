<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader
        class="product_tabs"
        :title="$route.meta.title"
        hidden-breadcrumb
      ></PageHeader>
    </div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <div class="acea-row row-between-wrapper">
        <Row type="flex">
          <Col v-bind="grid">
            <div class="button acea-row row-middle">
              <Button type="primary" icon="md-add" @click="add">添加</Button>
            </div>
          </Col>
        </Row>
      </div>
      <Table
        :columns="columns1"
        :data="list"
        ref="table"
        class="mt25"
        :loading="loading"
        highlight-row
        no-userFrom-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
      >
        <template slot-scope="{ row, index }" slot="region">
          <div class="font-blue">
            {{
              row.type == 1
                ? "默认模板"
                : row.type == 2
                ? "行业模板"
                : "活动模板"
            }}
          </div>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <a @click="edit(row)" v-if="row.status || row.is_diy">编辑</a>
          <div v-if="row.id != 1 && row.is_diy" style="display: inline-block">
            <Divider type="vertical" v-if="row.status || row.is_diy" />
            <a @click="del(row, index)">删除</a>
          </div>
          <div style="display: inline-block" v-if="row.status != 1">
            <Divider type="vertical" v-if="row.status || row.is_diy" />
            <a @click="setStatus(row, index)">设为首页</a>
          </div>
          <div style="display: inline-block" v-if="!row.is_diy">
            <Divider type="vertical" />
            <a @click="recovery(row, index)">恢复初始设置</a>
            <Divider type="vertical" />
            <a @click="del(row, index)">删除</a>
          </div>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import { diyList, diyDel, setStatus, recovery } from "@/api/diy";
import { mapState } from "vuex";
export default {
  name: "devise_list",
  data() {
    return {
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24,
      },
      loading: false,
      columns1: [
        {
          title: "页面ID",
          key: "id",
          minWidth: 120,
        },
        {
          title: "模板名称",
          key: "name",
          minWidth: 120,
        },
        {
          title: "页面类型",
          slot: "region",
          minWidth: 120,
        },
        {
          title: "添加时间",
          key: "add_time",
          minWidth: 120,
        },
        {
          title: "更新时间",
          key: "update_time",
          minWidth: 120,
        },
        {
          title: "操作",
          slot: "action",
          fixed: "right",
          minWidth: 300,
        },
      ],
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      this.loading = true;
      diyList({
        type: 1,
      }).then((res) => {
        this.loading = false;
        this.list = res.data.list;
      });
    },
    // 编辑
    edit(row) {
      if (row.is_diy) {
        // this.$store.commit('userInfo/setPageName', row.template_name || 'moren');
        this.$router.push({
          path: "/admin/setting/pages/diy",
          query: { id: row.id, name: row.template_name || "moren" },
        });
      } else {
        let storage = window.localStorage;
        storage.setItem("pageName", row.template_name);
        this.$store.dispatch("admin/user/getPageName");
        this.$router.push({
          path: "/admin/setting/pages/template",
          query: { id: row.id, name: row.template_name },
        });
      }
    },
    // 添加
    add() {
      this.$router.push({
        path: "/admin/setting/pages/diy",
        query: { id: 0, name: "首页", type: 1 },
      });
    },
    // 删除
    del(row) {
      let delfromData = {
        title: "删除",
        num: 2000,
        success: diyDel(row.id, {
          type: 1,
        }),
      };
      this.$modalSure(delfromData)
        .then((res) => {
          this.getList();
        })
        .catch((res) => {
          this.$Message.error(res.msg);
        });
    },
    // 使用模板
    async setStatus(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否把该模板设为首页</p>",
        onOk: () => {
          setStatus(row.id, {
            type: 1,
          })
            .then((res) => {
              if (res.data.status) {
                this.$Message.success(res.data.msg);
                this.$Modal.remove();
                this.getList();
              } else {
                setTimeout((e) => {
                  this.$Modal.confirm({
                    title: "提示",
                    content: "<p>尚未安装模板，请购买安装后再试！</p>",
                    loading: false,
                    okText: "点击购买",
                    onOk: () => {
                      window.open("http://s.crmeb.com/goods_cate", `_blank`);
                    },
                  });
                }, 200);
              }
            })
            .catch((res) => {
              this.$Modal.remove();
              this.$Message.error(res.msg);
            });
        },
      });
    },
    recovery(row) {
      recovery(row.id).then((res) => {
        this.$Message.success(res.msg);
        this.getList();
      });
    },
  },
};
</script>

<style scoped>
</style>
