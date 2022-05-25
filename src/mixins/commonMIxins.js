/*

此处mixins为共用4级联动新增所用，使用请 

import mixins from '@/mixins/commonMIxins'   

mixins: [mixins],

若无bug以及其他需求，慎改此处代码

*/
import { mapState } from "vuex";
import { phpExceldownload, getCsvProgress } from "@/api/system";
import {
  getdistrictLiandon,
  communityList
} from '@/api/riskdistrict';
export default {
  data() {
    return {
      button_loading: false,
      downloadProgress: 0,
      downloadstr: '批量导出',
      gov_idchecked: [],
      xcmList: [{
        text: "是",
        value: 1
      }, {
        text: "否",
        value: 0
      }],
      selectList_FirstIndex: 0,
      send_count: 0,
      levelTwo_BySelect_GetList_Is: [],
      selectuID_FirstList: [],
      optionProps: {
        value: "id",
        label: "name",
        children: "children",
        emitPath: true,
        checkStrictly: true
      },
      level: 0,
    }
  },
  created() {
    this.getriskdistrictLiandon()
    this.getriskdistrictLiandonYiwu()
  },
  computed: {
    ...mapState("admin/layout", ["isMobile"]),
    labelWidth() {
      return this.isMobile ? undefined : 75;
    },
    labelPosition() {
      return this.isMobile ? "top" : "right";
    },
    labelPosition2() {
      return this.isMobile ? "top" : "right";
    },
  },
  methods: {
    userSearchs() { },
    exports(type) {
      if (type) {
        this.formValidate.list_type = type;
      }
      this.getExportsApi()
    },
    async getExportsApi() {
      this.button_loading = true;

      let [th, filekey, data, fileName] = [[], [], [], ""];
      // var excel_data = this.userFrom;
      var excel_data = Object.assign({}, this.formValidate);
      console.log(this.formValidate, 'formValidate');
      delete excel_data.size;
      delete excel_data.page;
      let excelData = JSON.parse(JSON.stringify(excel_data));
      let lebData = await this.getExcelData(excelData);
      if (lebData.code == 400) {
        this.$Message.error(lebData.msg);
        this.button_loading = false;
        return
      }
      if (lebData.code !== 200) {
        this.$Message.error(lebData.msg);
        this.button_loading = false;
        return
      }
      var path = lebData.data.path;
      this.send_count = 0;
      // this.excelishas(path);
      this.getCsvProgress(path);
      return
    },
    getCsvProgress(path) {
      getCsvProgress({ path: path }).then(res => {
        var data = res.data;
        if (data.data.progress == 100) {
          this.button_loading = false;
          this.downloadstr = '批量导出';
          window.open(path + "?" + Date.now());
        } else {
          this.downloadProgress = data.data.progress;
          this.downloadstr = this.downloadProgress + '%';
          const _that = this;
          setTimeout(function () {
            // 打印screenWidth变化的值
            _that.getCsvProgress(path);
          }, 1000);

          // this.getCsvProgress(path);
        }
      })
    },
    excelishas(str) {
      if (this.send_count == 20) {
        this.button_loading = false;
        this.$Message.error('请求失败');
        return;
      }
      phpExceldownload(str).then(res => {
        console.log(str, "str")
        if (res.data.code == 200) {
          this.button_loading = false;
          window.open(
            str + '?' + Date.now()
          );
        } else {
          console.log(res.data.msg, "失败")
          const _that = this;
          setTimeout(function () {
            // 打印screenWidth变化的值
            _that.excelishas(str);
            _that.send_count++;
          }, 1000);
        }
      })

    },
    excelishas(str) {
      if (this.send_count == 20) {
        this.button_loading = false;
        this.$Message.error('请求失败');
        return;
      }
      phpExceldownload(str).then(res => {
        console.log(str, "str")
        if (res.data.code == 200) {
          this.button_loading = false;
          window.open(
            str + '?' + Date.now()
          );
        } else {
          console.log(res.data.msg, "失败")
          const _that = this;
          setTimeout(function () {
            // 打印screenWidth变化的值
            _that.excelishas(str);
            _that.send_count++;
          }, 1000);
        }
      })

    },
    chanegov(val) {
      console.log(val)
      val.map((item, index) => {
        switch (index) {
          case 0:
            this.formValidate.province_id = item
            this.formValidate.city_id = ''
            this.formValidate.county_id = ''
            this.formValidate.street_id = ''
            this.level = 1
            break;
          case 1:
            this.formValidate.city_id = item
            this.level = 2
            break;
          case 2:
            this.formValidate.county_id = item
            this.level = 3
            break;
          case 3:
            this.formValidate.street_id = item
            this.level = 4
            break;
          default:
            break;
        }
      })
      this.getriskdistrictLiandon(val[val.length - 1])
    },
    //选择父目的地加载子目的地
    getriskdistrictLiandon(selectuID) {
      getdistrictLiandon({
        pid: selectuID
      }).then(res => {
        switch (this.level) {
          case 0:
            this.dataList = res.data.data;
            this.dataList.map(item => {
              item.children = []
            })

            break;
          case 1:
            this.selectList_FirstIndex = this.dataList.findIndex(items => items.id === selectuID)
            this.selectuID_FirstList = this.dataList[this.selectList_FirstIndex]
            this.selectuID_FirstList.children = res.data.data
            this.selectuID_FirstList.children.map(item => {
              item.children = []
            })
            this.dataList.splice(this.selectList_FirstIndex, 1, this.selectuID_FirstList)
            break;
          case 2:
            console.table(this.selectuID_FirstList.children)
            this.selectList_SecondIndex = this.selectuID_FirstList.children.findIndex(items => items.id === selectuID) // 第二级选择的list的index
            this.selectListSecond = this.selectuID_FirstList.children  //第二级的所选择的对象
            //children赋值
            this.selectListSecond[this.selectList_SecondIndex].children = res.data.data
            //存储第二级对应的第三级数组
            this.levelTwo_BySelect_GetList_Is = this.selectListSecond[this.selectList_SecondIndex].children
            //删除对应的数组,重新赋值，以便触发视图更新
            this.dataList.splice(this.selectList_FirstIndex, 1, this.selectuID_FirstList)

            //赋值初始值children
            this.selectListSecond[this.selectList_SecondIndex].children.map(item => {
              item.children = []
            })
            break;
          case 3:
            // //   //最后一级数组查找
            let selectList_ThirdIndex = this.levelTwo_BySelect_GetList_Is.findIndex(items => items.id === selectuID)
            this.levelTwo_BySelect_GetList_Is[selectList_ThirdIndex].children = res.data.data
            console.log('object :>> ', this.levelTwo_BySelect_GetList_Is[selectList_ThirdIndex]);
            this.dataList.splice(this.selectList_FirstIndex, 1, this.selectuID_FirstList)
            break;
          default:
            break;
        }
      })
    },
    getriskdistrictLiandonYiwu() {
      getdistrictLiandon({
        pid: 2832
      }).then(res => {
        this.yiwuStreetList = res.data.data
      })
    },
  }
}