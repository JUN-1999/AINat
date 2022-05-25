<template>
  <div class="page-account">
    <div class="instructions">
      <!-- <span @click="downloadFile(1)"
        >冷链从业人员平台监管端操作说明-电脑端</span
      >
      <span @click="downloadFile(2)" style="display: block; margin-top: 5px"
        >冷链从业人员平台监管端操作说明-手机端</span
      > -->
    </div>
    <div
      class="container"
      ref="loginbox"
      :class="[fullWidth > 768 ? 'containerSamll' : 'containerBig']"
    >
      <!-- <swiper :options="swiperOption" class="swiperPross" v-if="fullWidth>768">
                <swiper-slide class="swiperPic" v-for="(item,index) in swiperList" :key="index">
                    <img :src="item.slide">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper> -->

      <div class="index_from page-account-container">
        <div class="page-account-top">
          <div class="page-account-top-logo">
            <!-- <img src="@/assets/images/lllogo.png" alt="logo" /> -->
            <h1>AI核酸比对系统</h1>
          </div>
        </div>
        <Form
          ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          @keyup.enter="handleSubmit('formInline')"
        >
          <Row>
            <Col span="6">
              <h3 style="padding-top: 11%">手机号：</h3>
            </Col>
            <Col span="18">
              <FormItem prop="username">
                <Input
                  type="text"
                  v-model="formInline.phone"
                  prefix="ios-contact-outline"
                  placeholder="请输入手机号"
                  size="large"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <h3 style="padding-top: 11%">验证码：</h3>
            </Col>
            <Col span="18">
              <FormItem>
                <Input
                  type="text"
                  v-model="formInline.smscode"
                  placeholder="请输入短信验证码"
                  size="large"
                >
                  <Icon type="ios-contact" slot="prefix" />
                  <Button
                    v-show="show"
                    slot="append"
                    icon="ios-search"
                    @click="getcode1"
                    >{{ imgcode111 }}</Button
                  >
                  <Button v-show="!show" slot="append">{{ count }} s</Button>
                </Input>
              </FormItem>
            </Col>
          </Row>

          <FormItem>
            <Button
              type="primary"
              long
              size="large"
              @click="handleSubmit('formInline')"
              class="btn"
              >{{ $t("page.login.submit") }}
            </Button>
          </FormItem>
          <!-- <FormItem>
            <Button
              type="primary"
              long
              size="large"
              @click="scanlogin()"
              class="btn"
            >
              扫码登录
            </Button>
          </FormItem> -->
        </Form>
      </div>
    </div>

    <div v-if="iserrormsg" ref="loginbox" style="height: 150px">
      <h1 style="padding: 15px">检测失败,请在政务网打开!</h1>
      <span>
        <a href="https://cjzyw.scjgj.yw.gov.cn/admin/login">
          首次登陆可尝试该链接
        </a>
      </span>
      <span> </span>
    </div>
    <Modal
      v-model="modals"
      scrollable
      footer-hide
      closable
      title="请完成安全校验"
      :mask-closable="false"
      :z-index="2"
      width="342"
    >
      <div class="captchaBox">
        <div id="captcha" style="position: relative" ref="captcha"></div>
        <div id="msg"></div>
      </div>
    </Modal>
    <!-- <img  id="detect" :src="img_url" :onload="connected()" :onerror="tryAgain()" /> -->
  </div>
</template>
<script>
import {
  AccountLogin,
  loginInfoApi,
  DdLogin,
  DdScanLogin,
  smscode,
  SmsLogin,
  checkIpForNet
} from "@/api/account";
import md5 from 'js-md5';
import mixins from "../mixins";
import Setting from "@/setting";
import util from "@/libs/util";
import "../../../assets/js/canvas-nest.min";
// import "../../../assets/js/jigsaw.js";
import { mapActions } from 'vuex';

export default {
  mixins: [mixins],
  data () {
    return {
      auth_code: "",
      islogin: false,
      isnotchecknet: true,
      wurl: "",
      show: true,
      smscode: "",
      imgcode111: "获取验证码",
      count: "",
      fullWidth: document.documentElement.clientWidth,
      swiperOption: {
        pagination: ".swiper-pagination",
        autoplay: true,
      },
      modals: false,
      autoLogin: true,
      // formInline: {
      //   username: "",
      //   password: "",
      //   code: "",
      // },
      formInline: {
        smscode: "",
        phone: "",
      },
      ruleInline: {
        // phone: [
        //   { required: true, message: "请输入手机号", trigger: "blur" },
        // ],
        // password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // smscode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      errorNum: 0,
      iserrormsg: false,
      jigsaw: null,
      login_logo: "",
      swiperList: [],
      defaultSwiperList: require("@/assets/images/sw.jpg"),
      get_img_count: 0,
      img_url: 'https://img01.yzcdn.cn/vant/logo22.png',
      is_img_success: true,
    };
  },
  created () {

    var host = window.location.host;
    // if((host == 'llwf.jk-kj.com' ) ){
    if ((host == 'ldrk.jk-kj.com/') || (host == 'localhost:8080') || (host == 'localhost:8081')) {
      this.isnotchecknet = true;
      this.islogin = true;
    } else {
      if (this.checkip(host)) {
        this.isnotchecknet = true
        this.islogin = true;
      } else {
        const liulq = navigator.userAgent.toLowerCase();
        if (liulq.indexOf("dingtalk") !== -1) {
          this.isnotchecknet = true;
        } else {
          this.isnotchecknet = false;
        }
      }
    }
    if (!this.isnotchecknet) {
      const _that = this;


      const loading = this.$loading({
        lock: true,
        text: "检测环境中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(function () {
        // 打印screenWidth变化的值
        _that.getcheckIpForNet(loading);
      }, 2000);
      // this.$http.get("https://172.45.8.100:8080/test.json").then(
      //   (res) => {
      //     if(res.code == 200){
      //       var code_data = res.data;
      //       var code_str = md5(code_data.timestamp) + 'checkNet';
      //       if(code_str == code_data.md5){
      //         this.islogin = true;
      //         loading.close();
      //       }
      //     }

      //   },
      //   (res) => {
      //     loading.close();
      //     // loading.setText('检测失败,请在内网打开');
      //   }
      // );

    }


    // loading.close();
    //redirect



    var redirect = this.$route.query;
    if (redirect) {
      this.$router.replace({
        path: "/ainat/home",
      });
    }

    this.wurl = window.location.href;
    var _this = this;
    top != window && (top.location.href = location.href);
    document.onkeydown = function (e) {
      if (_this.$route.name === "login") {
        let key = window.event.keyCode;
        if (key === 13) {
          _this.handleSubmit("formInline");
        }
      }
    };
    window.addEventListener("resize", this.handleResize);
  },
  watch: {
    fullWidth (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          // 打印screenWidth变化的值
          that.timer = false;
        }, 400);
      }
    },
    $route (n) {
      this.captchas();
    },
  },
  mounted: function () {
    this.$nextTick(() => {
      const liulq = navigator.userAgent.toLowerCase();
      if (liulq.indexOf("dingtalk") !== -1) {
        this.ddlogin();
        this.islogin = false;
      } else {
        this.urllogin();
      }
      // /* eslint-disable */
      let that = this;
      // this.jigsaw = jigsaw.init({
      //   el: this.$refs.captcha,
      //   onSuccess () {
      //     that.modals = false;
      //     that.closeModel();
      //   },
      //   onFail: this.closefail,
      //   onRefresh () { },
      // });
      if (this.screenWidth < 768) {
        document.getElementsByTagName("canvas")[0].removeAttribute("class", "");
      } else {
        document.getElementsByTagName("canvas")[0].className = "";
      }

      // this.swiperData();
    });
    this.captchas();
  },
  methods: {
    getcheckIpForNet (loading) {
      checkIpForNet(window.datanumber + '&randomnumber=' + window.randomnumber).then(res => {
        if (res.data.code == 200) {
          // loginbox
          loading.close();
          this.islogin = true;
        } else {
          loading.close();
          this.iserrormsg = true;
          // loading.setText('检测失败，监管端请在政务网打开');
        }
      })
    },
    connected () {
      console.log('connected')
      // if(this.get_img_count == 1){
      //   alert('已设置');

      // }
    },
    tryAgain () {
      console.log('conntryAgainected')
      // if(this.get_img_count == 0){
      //     alert('检测环境'); 
      //     // this.img_url = 'https://172.45.8.100:8080/haha.png?i=' + Math.random();
      //     this.img_url = 'https://img01.yzcdn.cn/vant/logo.png';
      //     // document.getElementById('detect').src = 'https://172.45.8.100:8080/haha.png?i=' + Math.random();//因为图片缓存原因，增加随机变量
      //     this.get_img_count++;
      // }else{
      //   //判断图片是否加载成功

      //   this.is_img_success = false;
      //   // alert('连接失败'); 
      //   console.log('图片失败')
      // }
    },
    ...mapActions('admin/page', [
      'closeAll'
    ]),


    checkip (ip) {
      var pattern =
        /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
      var flag_ip = pattern.test(ip);
      if (flag_ip) {
        return true;
      } else {
        return false;
      }
    },
    getCode () {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    scanlogin () {
      let imgstring = location.origin;
      if (location.origin.indexOf("cjzyw.yw.gov.cn") != -1) {
        window.location.href =
          "https://login-pro.ding.zj.gov.cn/oauth2/auth.htm?response_type=code&client_id=llcyry_dingoa&redirect_uri=https://cjzyw.yw.gov.cn/ainat/login&scope=get_user_info&authType=QRCODE";
      } else {
        window.location.href =
          "https://login.dg-work.cn/oauth2/auth.htm?response_type=code&client_id=llcyry_dingoa&redirect_uri=https://llwf.jk-kj.com/ainat/login&scope=get_user_info&authType=QRCODE";
      }
    },
    getcode1 () {
      if (this.formInline.phone === "") {
        this.$Message.error("请输入手机号码");
        return;
      }
      smscode({ phone: this.formInline.phone, prefix: "smslogin" }).then(
        async (res) => {
          var result = res.data;
          if (result.code == 200) {
            this.$Message.success(result.msg);
            this.getCode();
          } else {
            this.$Message.error(result.msg);
          }
        }
      );
    },
    urllogin () {
      if (this.$route.query.redirect !== "" && this.$route.query.redirect) {
        if (this.$route.query.redirect.indexOf("auth_code") != -1) {
          let arr = this.$route.query.redirect.split("=");
          let auth_code = arr[1];
          // return
          DdLogin({ auth_code: auth_code })
            .then(async (res) => {
              this.successLoginDone(res);
            })
            .catch((err) => {
              this.$Message.error(err.msg);
            });
        }
      }
      if (this.$route.query.auth_code !== "" && this.$route.query.auth_code) {
        let auth_code = this.$route.query.auth_code;
        DdLogin({ auth_code: auth_code })
          .then(async (res) => {
            this.successLoginDone(res);
          })
          .catch((err) => {
            this.$Message.error(err.msg);
          });
      }

      if (
        typeof this.$route.query.code !== "undefined" &&
        this.$route.query.code != ""
      ) {
        DdScanLogin({ scan_code: this.$route.query.code })
          .then(async (res) => {
            this.successLoginDone(res);
          })
          .catch((err) => {
            this.$Message.error(err.msg);
          });
      }
    },
    ddlogin () {
      let _this = this;
      dd.ready(function () {
        dd.getAuthCode({})
          .then((result) => {
            // alert(JSON.stringify(result));
            if (result) {
              let code = result.auth_code; //获取授权登录码
              _this.auth_code = code;
              DdLogin({ auth_code: code }).then(async (res) => {
                // alert(JSON.stringify(res));
                _this.successLoginDone(res);
              });
            }
          })
          .catch((err) => {
            alert(err);
          });
      });
    },
    swiperData () {
      loginInfoApi()
        .then((res) => {
          let data = res.data || {};
          this.login_logo = data.login_logo
            ? data.login_logo
            : require("@/assets/images/logo.png");
          // this.swiperList = data.slide.length ? data.slide : [{ slide: this.defaultSwiperList }];
        })
        .catch((res) => {
          this.$Message.error(res.msg);
        });
    },
    closeModel2 () {
      SmsLogin({
        phone: this.formInline.phone,
        smscode: this.formInline.smscode,
      })
        .then(async (res) => {
          this.successLoginDone(res.data);
        })
        .catch((result) => {
          // this.errorNum++;
          // this.captchas();
          this.$Message.error(result.msg);
          // if (this.jigsaw) this.jigsaw.reset();
        });
    },
    // 关闭模态框
    closeModel () {
      AccountLogin({
        account: this.formInline.username,
        pwd: this.formInline.password,
        imgcode: this.formInline.code,
      })
        .then(async (res) => {
          this.successLoginDone(res.data);
        })
        .catch((result) => {
          console.log(result, "ccc");
          this.errorNum++;
          this.captchas();
          this.$Message.error(result.msg);
          // if (this.jigsaw) this.jigsaw.reset();
        });
    },
    async successLoginDone (res) {
      console.log("successLoginDone res", res);
      // let res_data = {}
      // if(typeof res.code =='undefined' && typeof res.status == 'undefined'){
      //    res_data = res
      // }
      let res_data = {};
      if (typeof res.token != "undefined") {
        res_data = res;
      } else {
        res_data = res.data;
      }

      if (typeof res.status !== "undefined" && res.status != 200) {
        this.$Message.error(res.msg);
        return;
      }
      if (typeof res.code !== "undefined" && res.code != 200) {
        this.$Message.error(res.msg);
        return;
      }

      this.$store.dispatch("admin/account/setPageTitle");
      let msg = this.$Message.loading({
        content: "登录中...",
        duration: 0,
      });
      msg();

      let expires = res_data.expires_time;
      // 记录用户登陆信息
      util.cookies.set("uuid", res_data.user_info.id, {
        expires: expires,
      });
      util.cookies.set("token", res_data.token, {
        expires: expires,
      });
      util.cookies.set("expires_time", res_data.expires_time, {
        expires: expires,
      });
      const db = await this.$store.dispatch("admin/db/database", {
        user: true,
      });
      // 保存菜单信息
      // db.set('menus', res.data.menus).set('unique_auth', res.data.unique_auth).set('user_info', res.data.user_info).write();
      db.set("unique_auth", res_data.unique_auth)
        .set("user_info", res_data.user_info)
        .write();
      this.$store.commit("admin/menus/getmenusNav", res_data.menus);
      // 记录用户信息
      this.$store.dispatch("admin/user/set", {
        name: res_data.user_info.account,
        role_code: res_data.user_info.role_code,
        avatar: res_data.user_info.head_pic,
        access: res_data.unique_auth,
        logo: res_data.logo,
        logoSmall: res_data.logo_square,
        version: res_data.version,
        newOrderAudioLink: res_data.newOrderAudioLink,
      });
      // if (this.jigsaw) this.jigsaw.reset();

      this.$router.replace({
        path: this.$route.query.redirect || "/ainat/home",
      });
      console.log('closeAll')
      this.closeAll();

    },
    getExpiresTime (expiresTime) {
      let nowTimeNum = Math.round(new Date() / 1000);
      let expiresTimeNum = expiresTime - nowTimeNum;
      return parseFloat(parseFloat(parseFloat(expiresTimeNum / 60) / 60) / 24);
    },
    closefail () {
      // if (this.jigsaw) this.jigsaw.reset();
      this.$Message.error("校验错误");
    },
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth;
      if (this.fullWidth < 768) {
        document.getElementsByTagName("canvas")[0].removeAttribute("class", "");
      } else {
        document.getElementsByTagName("canvas")[0].className = "";
      }
    },
    captchas: function () {
      let imgstring = location.origin;
      if (location.origin.indexOf("localhost") != -1) {
        imgstring = "https://cjzyw.yw.gov.cn/";
      }
      this.imgcode = imgstring + "/ainatapi/captcha?" + Date.parse(new Date());
      // this.imgcode =
      //   Setting.apiBaseURL + "/captcha?" + Date.parse(new Date());
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.errorNum >= 2) {
            this.modals = true;
          } else {
            // this.closeModel();
            this.closeModel2();
          }
        }
      });
    },
  },

  beforeCreate () {
    if (this.fullWidth < 768) {
      document.getElementsByTagName("canvas")[0].removeAttribute("class", "");
    } else {
      document.getElementsByTagName("canvas")[0].className = "";
    }
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.handleResize);
    document.getElementsByTagName("canvas")[0].removeAttribute("class", "");
  },
};
</script>
<style>
.el-loading-mask.is-fullscreen .el-loading-spinner {
  font-size: 50px !important;
}
.el-loading-spinner .el-loading-text {
  font-size: 30px;
}
</style>
<style scoped lang="stylus">
.instructions
  position fixed
  top 2%
  left 80%
  font-size 18px
  font-weight bold
  color black
  width 350px
  span
    cursor pointer
.page-account
  display flex
.page-account .code
  display flex
  align-items center
  justify-content center
.page-account .code .pictrue
  height 40px
.swiperPross
  border-radius 6px 0px 0px 6px
.swiperPross, .swiperPic, .swiperPic img
  width 510px
  height 100%
.swiperPic img
  width 100%
  height 100%
.container
  height 400px !important
  padding 0 !important
  /* overflow: hidden; */
  border-radius 6px
  z-index 1
  display flex
  box-shadow 0 0 40px 3px #999
.containerSamll
  /* width: 56% !important; */
.containerBig
  width auto !important
  background #f7f7f7 !important
.index_from
  padding 0 40px 32px 40px
  height 400px
  box-sizing border-box
.page-account-top
  padding 20px 0 !important
  box-sizing border-box !important
  display flex
  justify-content center
.page-account-container
  border-radius 0px 6px 6px 0px
.btn
  background linear-gradient(90deg, rgba(25, 180, 241, 1) 0%, rgba(14, 115, 232, 1) 100%) !important
.captchaBox
  width 310px
input
  display block
  width 290px
  line-height 40px
  margin 10px 0
  padding 0 10px
  outline none
  border 1px solid #c8cccf
  border-radius 4px
  color #6a6f77
#msg
  width 100%
  line-height 40px
  font-size 14px
  text-align center
a:link, a:visited, a:hover, a:active
  margin-left 100px
  color #0366D6
.index_from >>> .ivu-input-large
  font-size 14px !important
</style>
