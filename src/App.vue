<!--
 * @Author: your name
 * @Date: 2021-08-20 16:44:14
 * @LastEditTime: 2021-09-27 17:11:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \llwf_jg_pc\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { on, off } from "view-design/src/utils/dom";
import { setMatchMedia } from "view-design/src/utils/assist";
import { mapMutations } from "vuex";


setMatchMedia();

export default {
  name: "app",
  methods: {
    ...mapMutations("admin/layout", ["setDevice"]),
    handleWindowResize () {
      this.handleMatchMedia();
    },
    handleMatchMedia () {
      const matchMedia = window.matchMedia;

      if (matchMedia("(max-width: 600px)").matches) {
        var deviceWidth =
          document.documentElement.clientWidth || window.innerWidth;
        let css = "calc(100vw/7.5)";
        document.documentElement.style.fontSize = css;
        this.setDevice("Mobile");
      } else if (matchMedia("(max-width: 992px)").matches) {
        document.documentElement.style.fontSize = "12px";
        this.setDevice("Tablet");
      } else {
        document.documentElement.style.fontSize = "12px";
        this.setDevice("Desktop");
      }
    },
  },
  mounted () {
    on(window, "resize", this.handleWindowResize);
    this.handleMatchMedia();

    console.log('刷新');
  },
  beforeDestroy () {
    off(window, "resize", this.handleWindowResize);
  },
};
</script>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  //   overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.shtitle {
  font-size: 12px;
}

@media (max-width: 1280px) {
  #inspectlist .ivu-col-span-md-16 {
    display: block;
    width: 66.66666667%;
  }
  #inspectlist .ivu-col-span-md-8 {
    display: block;
    width: 33.33333333%;
  }
}
.shtitlespan {
  margin-right: 0px;
  font-size: 12px;
}
.shtitle {
  display: -moz-inline-box;
  display: inline-block;
  text-align: right;
  height: 30px;
  overflow: hidden;
}
.shinput {
  padding-left: 15px;
  width: 90%;
}
</style>
