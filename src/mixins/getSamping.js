

/*

此处mixins为自主申报

*/

import { owndeclareGet } from '@/api/owndeclare';
import { exportOwndeclare,batchExportCSM } from '@/api/export'
import {
  getdistrictLiandon
} from '@/api/riskdistrict';
import mixins from '@/mixins/commonMIxins'
import exportExcel from "@/utils/newToExcel.js";
export default {
  mixins: [mixins],
  data () {
    return {
      oneDate: '',
      date_range: [],
      timeVal: [],
      cardTypeList: [{
        id: 'id',
        name: '身份证'
      }, {
        id: 'passport',
        name: '护照'
      }, {
        id: 'officer',
        name: '军官证'
      }],
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
      yiwuStreetList: [],
      communityList:[],
    }
  },
  created () {
    var date = new Date();
    var today = date.toLocaleDateString();

    // this.timeVal.push(today);
    // this.timeVal.push(today);
    // this.formValidate.start_date = this.timeVal[0].replace(/\//g,'-')
    // this.formValidate.end_date = this.timeVal[1].replace(/\//g,'-')
    // var today = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
    console.log(today,'today');
    // this.getriskdistrictLiandon()
  },
  methods: {
    onchangeTime (e) {
      this.timeVal = e;
      if (e[0] != '' && e[1] != '') {
        this.date_range = this.timeVal.join("-");
        this.formValidate.start_date = this.timeVal[0]
        this.formValidate.end_date = this.timeVal[1]
      } else {
        this.formValidate.date_range = '';
      }
    },
    closeTime () {
      this.timeVal = '';
      this.formValidate.date_range = '';
      this.formValidate.start_date = ''
      this.formValidate.end_date = ''
    },
    // 当 $route 更新时触发
    getSmpling () {
      this.loading = true
      owndeclareGet(this.formValidate).then(res => {
        this.loading = false
        console.log(res.data)
        this.list = res.data.data.data
        this.total = res.data.data.total
        console.log(res.list)
        console.log(this.list)
      })
    },
    reset (name) {
      this.formValidate = {
        page: 1, // 当前页
        size: 20, // 每页显示条数
        declare_type: name,
      };
      this.timeVal = []
      this.gov_idchecked = []
      this.getSmpling();
    },
    getExcelData (excelData) {
      return new Promise((resolve, reject) => {
        exportOwndeclare(excelData).then((res) => {
          return resolve(res.data);
        });
      });
    },

  }
}
