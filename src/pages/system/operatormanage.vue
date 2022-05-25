<!-- 
      <h2>管理员</h2>
    name:'system-operatormanage'
 -->

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
            <!-- 姓名 -->
            <Col :xs="24" :sm="12" :md="8" :lg="6">
              <Col span="7" class="shtitle">
                <span class="shtitle">姓名 </span>
              </Col>
              <Col span="17">
                <Input
                  class="shinput"
                  v-model="formValidate.real_name"
                  placeholder="请输入"
                  element-id="name"
                  clearable
                >
                </Input>
              </Col>
            </Col>

            <!-- 手机号 -->
            <Col :xs="24" :sm="12" :md="8" :lg="6">
              <Col span="7" class="shtitle">
                <span class="shtitle">手机号 </span>
              </Col>
              <Col span="17">
                <Input
                  class="shinput"
                  v-model="formValidate.phone"
                  placeholder="请输入"
                  element-id="name"
                  clearable
                >
                </Input>
              </Col>
            </Col>

            <!-- 角色 -->
            <Col :xs="24" :sm="12" :md="8" :lg="6">
              <Col span="7" class="shtitle">
                <span class="shtitle">角色 </span>
              </Col>
              <Col span="17">
                <Input
                  class="shinput"
                  v-model="formValidate.roles_text"
                  placeholder="请输入"
                  element-id="name"
                  clearable
                >
                </Input>
              </Col>
            </Col>
          </Col>

          <Col
            :xs="14"
            :sm="12"
            :md="8"
            :lg="6"
            class="ivu-text-right userFrom"
          >
            <Button
              type="primary"
              icon="ios-search"
              label="default"
              class="mr15"
              @click="Searchs"
              >搜索</Button
            >
            <Button class="ResetSearch" @click="reset('quarantine')"
              >重置</Button
            >
          </Col>
        </Row>
      </Form>

      <Form>
        <Row type="flex" class="mt20">
          <Button
            type="primary"
            class="bnt mr15"
            icon="md-add"
            @click="goadd()"
          >
            添加管理员
          </Button>
        </Row>
      </Form>

      <!-- 表格模块 -->
      <Table
        ref="table"
        :columns="columns"
        :data="list"
        class="mt25"
        no-userFrom-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
        :loading="loading"
        highlight-row
      >
        <!-- 序号 -->
        <template slot-scope="{ row, index }" slot="index">
          <span> {{ index + 1 }} </span>
        </template>
        <!-- 操作 -->
        <template slot-scope="{ row, index }" slot="action">
          <a @click="goedit(row)">编辑</a>
          <span>&nbsp</span>
          <a @click="deleteSmping(row, '删除', index)">删除</a>
          <!-- <a @click="openItImage(row.qrcode_path, row.name)">查看二维码</a> -->
        </template>
      </Table>

      <!-- 分页模块 -->
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

      <!-- 弹窗编辑 -->

      <Modal
        :title="edittitle"
        v-model="editmodal"
        width="550"
        class-name="vertical-center-modal"
      >
        <Form
          ref="editformValidate"
          :model="editformValidate"
          :rules="ruleValidate"
          :label-width="100"
        >
          <FormItem label="姓名" prop="real_name">
            <Input
              style="width: 380px"
              v-model="editformValidate.real_name"
              placeholder="姓名"
            ></Input>
          </FormItem>
          <FormItem label="手机号" prop="phone">
            <Input
              style="width: 380px"
              v-model="editformValidate.phone"
              placeholder="手机号"
            ></Input>
          </FormItem>
          <FormItem label="角色" prop="role">
            <Select
              v-model="editformValidate.roleList"
              multiple
              placeholder="请选择"
            >
              <Option v-for="item in roleList" :key="item.id" :value="item.id">
                {{ item.role_name }}
              </Option>
            </Select>
          </FormItem>
          <FormItem v-if="roleid === 0" label="密码" prop="firstpwd">
            <Input
              style="width: 380px"
              v-model="editformValidate.firstpwd"
              placeholder="密码"
            ></Input>
          </FormItem>
          <FormItem v-if="roleid === 0" label="确认密码" prop="pwd">
            <Input
              style="width: 380px"
              v-model="editformValidate.pwd"
              placeholder="确认密码"
            ></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="handleSubmit('editformValidate')"
            >提交</Button
          >
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { arrToStr } from "@/utils/wjc_tools";
import { mapState, mapMutations, mapAction } from "vuex";
import {
  getoperatormanageApi,
  postoperatormanage,
  putoperatormanage,
  deleteoperatormanage,
} from "@/api/system";
import { roleListApi } from "@/api/setting";
import { getCsvProgress } from "@/api/system";
import mixins from "@/mixins/getSamping";
export default {
  name: "system-operatormanage",
  mixins: [mixins],
  data() {
    const validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      }
      if (this.editformValidate.firstpwd === value) {
        callback();
      } else {
        callback(new Error("密码输入不一致"));
      }
    };
    return {
      roleid: 0,
      editformValidate: {},
      edittitle: "管理员编辑",
      editmodal: false,
      ruleValidate: {
        phone: [{ required: true, message: "必填", trigger: "blur" }],
        firstpwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        pwd: [{ validator: validatePwd, trigger: "blur" }],
      },
      roleList: [], //角色列表

      list: [], //列表数据
      loading: false,
      columns: [
        //列表规则
        {
          title: "序号",
          slot: "index",
          minWidth: 50,
        },
        {
          title: "姓名",
          key: "real_name",
          minWidth: 70,
        },

        {
          title: "手机号",
          key: "phone",
          minWidth: 70,
        },
        {
          title: "角色",
          key: "roles_text",
          minWidth: 70,
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 70,
        },
      ],
      total: 0,
      timeVal: [], //时间暂存
      formValidate: {
        // 查询条件的集合
        page: 1,
        size: 10,
      },
    };
  },
  computed: {
    ...mapState("admin/layout", ["isMobile"]),
    labelWidth() {
      return this.isMobile ? undefined : 50;
    },
    labelPosition() {
      return this.isMobile ? "top" : "left";
    },
  },
  created() {},
  mounted() {
    this.reset();
    this.roleListFun();
  },
  methods: {
    // 重置方法
    reset() {
      this.timeVal = [];
      this.formValidate = {
        page: 1, // 当前页
        size: 10, // 每页显示条数
      };
      this.getSmpling();
    },
    // 请求数据
    getSmpling() {
      this.loading = true;
      getoperatormanageApi(this.formValidate).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
    // 搜索
    Searchs() {
      this.formValidate.page = 1;
      this.getSmpling();
    },
    // 每页数改变
    sizeChange(size) {
      this.formValidate.size = size;
      this.getSmpling();
      this.$refs.table.clearCurrentRow();
    },
    // 页面改变
    pageChange(index) {
      this.formValidate.page = index;
      this.getSmpling();
    },
    // 点击列表编辑按钮
    goedit(row) {
      this.editformValidate = row;
      this.editformValidate.roleList = row.roles.reduce((arr,item)=>{
          arr.push(parseInt(item))
          return arr;
      },[]);
      debugger;

      this.roleid = row.id;
      this.edittitle = "修改管理员";
      this.editmodal = true;
    },
    // 提交按钮
    handleSubmit(name) {
      let that = this;
      if (this.roleid === 0) {
        // 新增
        this.$refs[name].validate((valid) => {
          if (valid) {
            let editformroleList = this.editformValidate.roleList;
            if (editformroleList.length === 1) {
              this.editformValidate.roles = editformroleList[0];
            } else {
              this.editformValidate.roles = arrToStr(editformroleList);
            }

            postoperatormanage(this.editformValidate)
              .then((res) => {
                debugger;
                if (res.data.code === 200) {
                  this.$Message.config({
                    top: 120,
                    duration: 3,
                  });
                  that.$Message.success(res.data.msg);
                  this.editmodal = false;
                  this.getSmpling();
                } else {
                  this.$Message.config({
                    top: 120,
                    duration: 3,
                  });
                  that.$Message.error(res.data.msg);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
          }
        });
      } else {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // 修改
            let editformroleList = this.editformValidate.roleList;
            if (editformroleList.length === 1) {
              this.editformValidate.roles = editformroleList[0];
            } else {
              this.editformValidate.roles = arrToStr(editformroleList);
            }

            putoperatormanage(this.roleid, this.editformValidate).then(
              (res) => {
                debugger;
                if (res.data.code === 200) {
                  this.$Message.config({
                    top: 120,
                    duration: 3,
                  });
                  that.$Message.success(res.data.msg);
                  this.editmodal = false;
                  this.getSmpling();
                } else {
                  this.$Message.config({
                    top: 120,
                    duration: 3,
                  });
                  that.$Message.error(res.data.msg);
                }
              }
            );
          } else {
          }
        });
      }
    },
    // 删除按钮
    deleteSmping(row, tit, num) {
      deleteoperatormanage(row.id)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$Message.success(res.data.msg);
            this.list.splice(num, 1);
            this.getSmpling();
          } else {
            this.$Message.error(res.data.msg);
          }
        })
        .catch((res) => {
          this.$Message.error(res.data.msg);
        });
    },
    // 新增按钮
    goadd() {
      this.roleid = 0;
      this.edittitle = "新增管理员";
      this.editformValidate = {};
      this.editmodal = true;
    },
    // 获得角色列表
    roleListFun() {
      roleListApi()
        .then((res) => {
          this.roleList = res.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
</style>
<style lang="stylus" scoped>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

>>> .ivu-modal-body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

>>>.el-date-editor.el-input {
  width: 214.84px;
}

.export {
  display: flex;
  align-items: center;
  height: 2.666rem;
}

.tabBox_img {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>

