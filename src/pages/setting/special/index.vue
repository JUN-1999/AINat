<template>
  <div class="diy-page">
    <PageHeader
      class="product_tabs"
      :title="$route.meta.title"
      hidden-breadcrumb
    >
      <div slot="title">
        <router-link :to="{ path: '/admin/setting/pages/special' }"
          ><Button icon="ios-arrow-back" size="small" class="mr20"
            >返回</Button
          ></router-link
        >
        <span v-text="$route.meta.title" class="mr20"></span>
      </div>
    </PageHeader>
    <Card :bordered="false" dis-hover class="ivu-mt" style="width: 100%">
      <div class="diy-wrapper">
        <!-- 左侧 -->
        <div class="left">
          <div class="title-bar">
            <div
              class="title-item"
              :class="{ on: tabCur == index }"
              v-for="(item, index) in tabList"
              :key="index"
              @click="bindTab(index)"
            >
              {{ item.title }}
            </div>
          </div>
          <div class="wrapper" v-if="tabCur == 0">
            <div v-for="(item, index) in leftMenu" :key="index">
              <div class="tips" @click="item.isOpen = !item.isOpen">
                {{ item.title }}

                <Icon type="ios-arrow-forward" size="16" v-if="!item.isOpen" />
                <Icon type="ios-arrow-down" size="16" v-else />
              </div>
              <draggable
                class="dragArea list-group"
                :list="item.list"
                :group="{ name: 'people', pull: 'clone', put: false }"
                :clone="cloneDog"
                @change="log"
              >
                <div
                  class="list-group-item"
                  v-for="(element, index) in item.list"
                  :key="element.id"
                  @click="addDom(element, index, 0)"
                  v-show="item.isOpen"
                >
                  <span class="iconfont-diy" :class="element.icon"></span>
                  <p>{{ element.cname }}</p>
                </div>
              </draggable>
            </div>
          </div>
          <!--                    <div style="padding: 0 20px"><Button type="primary" style="width: 100%" @click="saveConfig">保存</Button></div>-->
          <div v-else>
            <div
              class="link-item"
              v-for="(item, index) in urlList"
              :key="index"
            >
              <div class="name">{{ item.name }}</div>
              <div class="link-txt">地址：{{ item.url }}</div>
              <div class="params">
                <span class="txt">参数：</span>
                <span>{{ item.parameter }}</span>
              </div>
              <div class="lable">
                <p class="txt">例如：{{ item.example }}</p>
                <Button
                  size="small"
                  v-clipboard:copy="item.example"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  >复制</Button
                >
              </div>
            </div>
          </div>
        </div>
        <!-- 中间 -->
        <div
          class="wrapper-con"
          style="
            flex: 1;
            background: #f0f2f5;
            display: flex;
            justify-content: center;
            padding-top: 45px;
            height: 100%;
          "
        >
          <div class="content">
            <div
              style="
                display: flex;
                flex-direction: column;
                margin: 0 24px 0;
                overflow: hidden;
                height: 100%;
              "
            >
              <div
                class="page-title"
                :class="{ on: activeIndex == -100 }"
                @click="showTitle"
              >
                {{ titleTxt }}
                <div class="delete-box"></div>
                <div class="handle"></div>
              </div>
              <div class="scroll-box">
                <draggable
                  class="dragArea list-group"
                  :list="mConfig"
                  group="people"
                  @change="log"
                  filter=".undraggable"
                >
                  <div
                    class="mConfig-item"
                    :class="{ on: activeIndex == key }"
                    v-for="(item, key) in mConfig"
                    :key="key"
                    @click="bindconfig(item, key)"
                  >
                    <component
                      :is="item.name"
                      ref="getComponentData"
                      :configData="propsObj"
                      :index="key"
                      :num="item.num"
                    ></component>
                    <div class="delete-box">
                      <span @click.stop="bindDelete(item, key)">删除</span>
                    </div>
                    <div class="handle"></div>
                  </div>
                </draggable>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 -->
        <div class="right-box">
          <div class="mConfig-item" v-for="(item, key) in rConfig" :key="key">
            <div class="title-bar">{{ item.cname }}</div>
            <component
              :is="item.configName"
              @config="config"
              :activeIndex="activeIndex"
              :num="item.num"
              :index="key"
            ></component>
          </div>
        </div>
      </div>
    </Card>
    <div class="foot-box">
      <Button @click="reast">重置</Button>
      <Button type="primary" @click="saveConfig" :loading="loading"
        >保存</Button
      >
    </div>
  </div>
</template>

<script>
import { diySave, diyGetInfo, categoryList, getUrl } from "@/api/diy";
import vuedraggable from "vuedraggable";
import mPage from "@/components/mobilePage/index.js";
import mConfig from "@/components/mobileConfig/index.js";
import { mapState } from "vuex";
let idGlobal = 0;
export default {
  name: "index.vue",
  components: {
    draggable: vuedraggable,
    ...mPage,
    ...mConfig,
  },
  filters: {
    filterTxt(val) {
      if (val) {
        return (val = val.substr(0, val.length - 1));
      }
    },
  },
  computed: {
    ...mapState({
      titleTxt: (state) => state.admin.mobildConfig.pageTitle || "专题页",
    }),
  },
  data() {
    return {
      leftMenu: [], // 左侧菜单
      lConfig: [], // 左侧组件
      mConfig: [], // 中间组件渲染
      rConfig: [], // 右侧组件配置
      activeConfigName: "",
      propsObj: {}, // 组件传递的数据,
      activeIndex: -99, // 选中的下标
      number: 0,
      pageId: "",
      pageName: "",
      pageType: "",
      category: [],
      tabList: [
        {
          title: "组件库",
          key: 0,
        },
        {
          title: "页面链接",
          key: 1,
        },
      ],
      tabCur: 0,
      urlList: [],
      oldId: "",
      loading: false,
    };
  },
  created() {
    this.categoryList();
    this.getUrlList();
    this.pageId = this.$route.query.id;
    this.pageName = this.$route.query.name;
    this.pageType = this.$route.query.type;
    this.lConfig = this.objToArr(mPage);
  },
  mounted() {
    this.$nextTick(() => {
      this.arraySort();
      if (this.pageId != 0) {
        this.getDefaultConfig();
      }
    });
  },
  methods: {
    onCopy() {
      this.$Message.success("复制成功");
    },
    onError() {
      this.$Message.error("复制失败");
    },
    // 获取url
    getUrlList() {
      getUrl().then((res) => {
        this.urlList = res.data.url;
      });
    },
    // 左侧tab
    bindTab(index) {
      this.tabCur = index;
    },
    // 页面标题点击
    showTitle() {
      this.activeIndex = -100;
      let obj = {};
      for (var i in mConfig) {
        if (i == "pageTitle") {
          // this.rConfig = obj
          obj = mConfig[i];
          obj.configName = mConfig[i].name;
          obj.cname = "页面设置";
        }
      }
      let abc = obj;
      this.rConfig = [];
      this.rConfig[0] = JSON.parse(JSON.stringify(obj));
    },
    // 对象转数组
    objToArr(data) {
      let obj = Object.keys(data);
      let m = obj.map((key) => data[key]);
      return m;
    },
    log: function (evt) {
      // 中间拖拽排序
      if (evt.moved) {
        evt.moved.oldNum = this.mConfig[evt.moved.oldIndex].num;
        evt.moved.newNum = this.mConfig[evt.moved.newIndex].num;
        evt.moved.status = evt.moved.oldIndex > evt.moved.newIndex;
        this.mConfig.forEach((el, index) => {
          el.num = new Date().getTime() * 1000 + index;
        });
        evt.moved.list = this.mConfig;
        this.$store.commit("admin/mobildConfig/defaultArraySort", evt.moved);
      }
      // 从左向右拖拽排序
      if (evt.added) {
        let data = evt.added.element;
        let obj = {};
        let timestamp = new Date().getTime() * 1000;
        data.num = timestamp;
        this.activeConfigName = data.name;
        let tempItem = JSON.parse(JSON.stringify(data));
        tempItem.id = "id" + tempItem.num;
        this.mConfig[evt.added.newIndex] = tempItem;
        this.rConfig = [];
        this.rConfig.push(tempItem);
        this.mConfig.forEach((el, index) => {
          el.num = new Date().getTime() * 1000 + index;
        });
        evt.added.list = this.mConfig;
        // 保存组件名称
        this.$store.commit("admin/mobildConfig/SETCONFIGNAME", data.name);
        this.$store.commit("admin/mobildConfig/defaultArraySort", evt.added);
      }
    },
    cloneDog(data) {
      // this.mConfig.push(tempItem)
      return {
        ...data,
      };
    },
    // 组件添加
    addDom(item, index, type) {
      idGlobal += 1;
      let obj = {};
      let timestamp = new Date().getTime() * 1000;
      item.num = `${timestamp}`;
      item.id = `id${timestamp}`;
      this.activeConfigName = item.name;
      let tempItem = JSON.parse(JSON.stringify(item));
      this.rConfig = [];
      this.mConfig.push(tempItem);
      this.rConfig.push(tempItem);
      this.mConfig.forEach((el, index) => {
        el.num = new Date().getTime() * 1000 + index;
      });
      this.activeIndex = this.mConfig.length - 1;
      // 保存组件名称
      obj.element = item;
      obj.list = this.mConfig;
      this.$store.commit("admin/mobildConfig/SETCONFIGNAME", item.name);
      this.$store.commit("admin/mobildConfig/defaultArraySort", obj);
      // // 保存组件名称
      // this.$store.commit('admin/mobildConfig/SETCONFIGNAME', item.name)
      // // 保存默认组件配置
      // debugger
      // this.$store.commit('admin/mobildConfig/ADDARRAY', { num: item.num, val: item.data().defaultConfig })
    },
    // 点击显示相应的配置
    bindconfig(item, index) {
      this.rConfig = [];
      let tempItem = JSON.parse(JSON.stringify(item));
      this.rConfig.push(tempItem);
      this.activeIndex = index;
      this.$store.commit("admin/mobildConfig/SETCONFIGNAME", item.name);
    },
    // 组件删除
    bindDelete(item, key) {
      this.mConfig.splice(key, 1);
      this.rConfig.splice(0, 1);
      // 删除第几个配置
      this.$store.commit("admin/mobildConfig/DELETEARRAY", item);
    },
    // 组件返回
    config(data) {
      let propsObj = this.propsObj;
      propsObj.data = data;
      propsObj.name = this.activeConfigName;
    },
    addSort(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    // 数组排序
    arraySort() {
      let tempArr = [];
      let basis = {
        title: "基础组件",
        list: [],
        isOpen: true,
      };
      let marketing = {
        title: "营销组件",
        list: [],
        isOpen: true,
      };
      let tool = {
        title: "工具组件",
        list: [],
        isOpen: true,
      };
      this.lConfig.map((el, index) => {
        if (el.type == 0) {
          basis.list.push(el);
        }
        if (el.type == 1) {
          marketing.list.push(el);
        }
        if (el.type == 2) {
          tool.list.push(el);
        }
      });
      tempArr.push(basis, marketing, tool);
      this.leftMenu = tempArr;
    },
    // 保存配置
    saveConfig() {
      if (this.mConfig.length == 0) {
        return this.$Message.error("暂未添加任何组件，保存失败！");
      }
      this.loading = true;
      let val = this.$store.state.admin.mobildConfig.defaultArray;
      diySave(this.pageId, {
        name: this.pageName,
        type: this.pageType,
        value: val,
        title: this.titleTxt,
      })
        .then((res) => {
          this.loading = false;
          this.pageId = res.data.id;
          this.$Message.success(res.msg);
        })
        .catch((res) => {
          this.loading = false;
          this.$Message.error(res.msg);
        });
    },
    // 获取默认配置
    getDefaultConfig() {
      diyGetInfo(this.pageId, {
        type: 2,
      }).then(({ data }) => {
        let obj = {};
        let tempARR = [];
        this.$store.commit("admin/mobildConfig/titleUpdata", data.info.title);
        let newArr = this.objToArr(data.info.value);
        function sortNumber(a, b) {
          return a.timestamp - b.timestamp;
        }
        newArr.sort(sortNumber);
        newArr.map((el, index) => {
          el.id = "id" + el.timestamp;
          this.lConfig.map((item, j) => {
            if (el.name == item.defaultName) {
              item.num = el.timestamp;
              item.id = "id" + el.timestamp;
              let tempItem = JSON.parse(JSON.stringify(item));
              tempARR.push(tempItem);
              obj[el.timestamp] = el;
              this.mConfig.push(tempItem);
              // 保存默认组件配置
              this.$store.commit("admin/mobildConfig/ADDARRAY", {
                num: el.timestamp,
                val: el,
              });
            }
          });
        });
      });
    },
    categoryList() {
      categoryList((res) => {
        this.category = res.data;
      });
    },
    // 重置
    reast() {
      if (this.pageId == 0) {
        this.$Message.error("新增页面，无法重置");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否重置当前页面数据</p>",
          onOk: () => {
            this.mConfig = [];
            this.rConfig = [];
            this.activeIndex = -99;
            this.getDefaultConfig();
          },
          onCancel: () => {},
        });
      }
    },
  },
  beforeDestroy() {
    this.$store.commit("admin/mobildConfig/titleUpdata", "");
    this.$store.commit("admin/mobildConfig/SETEMPTY");
  },
  destroyed() {
    this.$store.commit("admin/mobildConfig/titleUpdata", "");
    this.$store.commit("admin/mobildConfig/SETEMPTY");
  },
};
</script>

<style scoped lang="stylus">
.ivu-mt {
  display: flex;
  justify-content: space-between;
}

.iconfont-diy {
  font-size: 24px;
}

.diy-wrapper {
  max-width: 100%;
  min-width: 1100px;
  display: flex;
  justify-content: space-between;
  height: 84.5vh;

  .left {
    width: 300px;
    /* border 1px solid #DDDDDD */
    border-radius: 4px;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .title-bar {
      display: flex;
      color: #333;
      border-bottom: 1px solid #eee;
      border-radius: 4px;
      cursor: pointer;

      .title-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 45px;

        &.on {
          color: #1890FF;
          font-size: 14px;
          border-bottom: 1px solid #1890FF;
        }
      }
    }

    .wrapper {
      padding: 15px;

      .tips {
        display: flex;
        justify-content: space-between;
        padding-bottom: 15px;
        font-size: 13px;
        color: #000;
        cursor: pointer;

        .ivu-icon {
          color: #000;
        }
      }
    }

    .link-item {
      padding: 10px;
      border-bottom: 1px solid #F5F5F5;
      font-size: 12px;
      color: #323232;

      .name {
        font-size: 14px;
        color: #1890FF;
      }

      .link-txt {
        margin-top: 2px;
        word-break: break-all;
      }

      .params {
        margin-top: 5px;
        color: #1CBE6B;
        word-break: break-all;

        .txt {
          color: #323232;
        }

        span {
          &:last-child i {
            display: none;
            color: red;
          }
        }
      }

      .lable {
        display: flex;
        margin-top: 5px;
        color: #999;

        p {
          flex: 1;
          word-break: break-all;
        }

        button {
          margin-left: 30px;
          width: 38px;
        }
      }
    }

    .dragArea.list-group {
      display: flex;
      flex-wrap: wrap;

      .list-group-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 74px;
        height: 66px;
        margin-right: 17px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #666;
        cursor: pointer;

        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }

  .content {
    position: relative;
    width: 427px;
    height: 100%;
    margin: 0 53px;

    .page-title {
      position: relative;
      height: 48px;
      line-height: 48px;
      background: #fff;
      font-size: 16px;
      color: #333333;
      text-align: center;

      .delete-box {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 2px dashed #00a0e9;
        padding: 10px 0;

        span {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 32px;
          height: 16px;
          line-height: 16px;
          display: inline-block;
          text-align: center;
          font-size: 10px;
          color: #fff;
          background: rgba(0, 0, 0, 0.4);
          margin-left: 2px;
          cursor: pointer;
          z-index: 11;
        }
      }

      &:hover, &.on {
        cursor: move;

        .delete-box {
          display: block;
        }
      }
    }

    .scroll-box {
      flex: 1;
      overflow-y: scroll;
      max-height: 667px;
      background: #fff;
    }

    .dragArea.list-group {
      width: 100%;
      height: 100%;

      .mConfig-item {
        position: relative;

        .delete-box {
          display: none;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border: 2px dashed #00a0e9;
          padding: 10px 0;

          span {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 32px;
            height: 16px;
            line-height: 16px;
            display: inline-block;
            text-align: center;
            font-size: 10px;
            color: #fff;
            background: rgba(0, 0, 0, 0.4);
            margin-left: 2px;
            cursor: pointer;
            z-index: 11;
          }
        }

        &:hover, &.on {
          cursor: move;

          .delete-box {
            display: block;
          }
        }
      }
    }
  }

  .right-box {
    width: 400px;
    height: 100%;
    border-radius: 4px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;

    .title-bar {
      width: 100%;
      height: 45px;
      line-height: 45px;
      padding-left: 24px;
      color: #000;
      border-radius: 4px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
    }
  }

  ::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #bfc1c4;
  }
}

.foot-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background: #fff;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.03);

  button {
    width: 100px;
    height: 32px;
    font-size: 13px;

    &:first-child {
      margin-right: 20px;
    }
  }
}

/deep/.ivu-scroll-loader {
  display: none;
}

/deep/ .ivu-card-body {
  width: 100%;
}
</style>
