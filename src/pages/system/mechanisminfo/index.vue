<template>
  <div class="article-manager">
    <div class="i-layout-page-header">
      <PageHeader class="product_tabs" title="组织机构" hidden-breadcrumb>
      </PageHeader>
    </div>

    <Card :bordered="false" dis-hover class="ivu-mt">
      <div id="box">
        <div class="left">
          <h3>浙政钉组织结构图</h3>
          <!-- <Tree :data="data"></Tree> -->
          <el-tree
            class="filter-tree"
            :data="data"
            default-expand-all
            ref="tree"
          >
          </el-tree>
        </div>
        <div class="right">
          <h3 style="display: inline">系统结构图</h3>
          <Button type="info" style="margin-left: 20px" @click="add()"
            >新增机构</Button
          >
          <!-- <Button type="info" style="margin-left: 20px" @click="save()"
            >编辑</Button
          > -->
          <!-- <Button type="info" style="margin-left: 20px" @click="delete_tree()"
            >删除</Button
          > -->
          <el-tree
            class="filter-tree"
            :data="data"
            show-checkbox
            :check-strictly="true"
            default-expand-all
            ref="tree"
            node-key="id"
            @check-change="handleClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <Button type="primary" size="small" @click="() => save(data)">
                  编辑
                </Button>
                <Button
                  size="small"
                  type="error"
                  @click="() => delete_tree(node, data)"
                >
                  删除
                </Button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </Card>
    <Modal
      v-model="show"
      :z-index="100"
      scrollable
      footer-hide
      closable
      :mask-closable="false"
      width="30%"
      height="30%"
    >
      <Card :bordered="false" dis-hover class="ivu-mt">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <FormItem label="名称:" prop="name">
            <Input
              v-model="formValidate.name"
              placeholder="请输入名称"
              v-width="'100%'"
            />
          </FormItem>
          <FormItem label="序号:" prop="sort">
            <Input
              v-model="formValidate.sort"
              placeholder="请输入排序序号"
              v-width="'100%'"
            />
          </FormItem>
          <FormItem label="管辖镇街:" prop="street">
            <Select v-model="formValidate.street_id">
                <Option v-for="(item,index) in streetlist" :value="item.id" :key="index">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              :loading="modal_loading"
              class="submission"
              @click="handleSubmit('formValidate')"
              >提交</Button
            >
          </FormItem>
        </Form>
      </Card>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Govtree, PutGovtree, AddGovtree, DelGovtree, getStreet } from "@/api/system";
export default {
  name: "mechanisminfo",
  components: {},
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
      streetlist: [],
      i: 0,
      data: [],
      show: false,
      modal_loading: false,
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
      },
      formValidate: {
        sort: "",
        name: "",
        street: "",
      },
      choose_node: "",
      last_choose_node: "",
    };
  },
  watch: {},
  created() {
    this.getStreetList()
    this.getTree();
  },
  mounted() { },
  methods: {
    getStreetList(){
      let arr = {}
      getStreet(arr).then(async (res) => {
        console.log(res)
        this.streetlist = res.data.list
        }).catch((res) => {
          console.log(res.msg)
        });
    },
    handleClick(data, checked, node) {
      if (checked) {
        this.$refs.tree.setCheckedKeys([data.id]);
        this.choose_node = data;
        // 第一次选时复制
        if(this.last_choose_node===''&&this.choose_node!==this.last_choose_node){
          this.last_choose_node = data
        }
      } else {
        // console.log(this.last_choose_node)
        // console.log(this.choose_node)
        console.log(data)
        if(this.last_choose_node===this.choose_node){
          this.choose_node = []
        }else{
          // this.choose_node = data;
          // this.last_choose_node = data
        }
      }
      console.log(checked)
      console.log(this.choose_node)
    },
    delete_tree(node, data) {
      let id = data.id;
      let delfromData = {
        title: '删除该机构',
        url: `gov/gov/${id}`,
        method: "DELETE",
      };
      this.$modalSure(delfromData)
        .then((res) => {
          this.$Message.success(res.data.msg);
          this.getTree();

        })
        .catch((res) => {
          this.$Message.error(res.data.msg);
        });


    },
    getTree() {
      const _that = this;
      Govtree().then((res) => {
        var data = res.data.data;
        this.data = data;
        for (var i = 0; i < _that.data.length; i++) {
          _that.data[i].title = _that.data[i].name;
          _that.data[i].label = _that.data[i].name;
          if (_that.data[i].children) {
            for (var l = 0; l < _that.data[i].children.length; l++) {
              _that.data[i].children[l].title = _that.data[i].children[l].name;
              _that.data[i].children[l].label = _that.data[i].children[l].name;
            }
          }
        }
      });
    },
    add() {
      if (this.choose_node.id !== undefined && this.choose_node.id > 0) {
        this.formValidate = { id: 0, pid: this.choose_node.id };
        this.show = true;
      } else {
        this.formValidate = { id: 0 };
        this.show = true;
      }
    },
    save(data) {
      console.log(this.choose_node)
      // if (this.choose_node == "" || this.choose_node.length == 0) {
      //   this.$Message.error("请选择机构");
      //   return
      // }
      // this.formValidate = this.choose_node;
      this.formValidate = data;
      console.log(data)
      this.show = true;
    },
    handleSubmit(name) {
      var arr = this.$refs.tree.getCheckedNodes();
      console.log(arr)
      if (arr.length > 0) {
        this.formValidate.pid = arr[0].id
      } else {
        this.formValidate.pid = ""
      }

      // return;
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modal_loading = true;
          setTimeout(() => {
            this.modal_loading = false;
          }, 500);
          if (this.formValidate.id != "0") {
            PutGovtree(this.formValidate.id, this.formValidate)
              .then((res) => {
                this.modal_loading = false;
                if (res.data.code == 200) {
                  this.$Message.success(res.data.msg);
                  this.show = false;
                  this.getTree();
                } else {
                  this.$Message.warning(res.data.msg);
                }
              })
              .catch((res) => {
                this.modal_loading = false;
                this.$Message.error(res.data.msg);
              });
          } else {
            AddGovtree(this.formValidate)
              .then((res) => {
                this.modal_loading = false;
                if (res.data.code == 200) {
                  this.$Message.success(res.data.msg);
                  this.show = false;
                  this.getTree();
                } else {
                  this.$Message.warning(res.data.msg);
                }
              })
              .catch((res) => {
                this.modal_loading = false;
                this.$Message.error(res.data.msg);
              });
          }
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
#box
  display flex
.left
  width 50%
.right
  width 50%
.custom-tree-node
  flex 1
  display flex
  align-items center
  justify-content space-between
  font-size 14px
  padding-right 8px
</style>
