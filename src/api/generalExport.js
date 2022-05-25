import request from '@/plugins/request';

// 通用方法--当日汇总
export function exportsummaryDay(data) {
    return request({
        url: '/csv/place/today_summary',
        method: 'get',
        params: data,
        // responseTypr: 'blob'
    });
}
// 通用方法--前一天场所扫码合计
export function exportpreviousDay(data) {
    return request({
        url: '/csv/place/preday_total',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}



// 通用方法--上溪镇模具城
export function exportshangxi_muju(data) {
    return request({
        url: '/csv/place/shangxi_muju',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}
// 通用方法--佛堂镇木材市场
export function exportfotang_mucai(data) {
    return request({
        url: '/csv/place/fotang_mucai',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}
// 通用方法--佛堂镇浙中农副产品物流中心
export function exportfotang_nongfuchanpin(data) {
    return request({
        url: '/csv/place/fotang_nongfuchanpin',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}
// 通用方法--北苑街道副食品市场
export function exportbeiyuan_fushipin(data) {
    return request({
        url: '/csv/place/beiyuan_fushipin',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}
// 通用方法--北苑街道收藏品市场
export function exportbeiyuan_shoucangpin(data) {
    return request({
        url: '/csv/place/beiyuan_shoucangpin',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}
// 通用方法--北苑街道果品市场
export function exportbeiyuan_guopin(data) {
    return request({
        url: '/csv/place/beiyuan_guopin',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}
// 通用方法--北苑街道物资市场
export function exportbeiyuan_wuzi(data) {
    return request({
        url: '/csv/place/beiyuan_wuzi',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}
// 通用方法--后宅街道二手车中心
export function exporthouzhai_ershouche(data) {
    return request({
        url: '/csv/place/houzhai_ershouche',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}
// 通用方法--城西街道粮食市场
export function exportchengxi_liangshi(data) {
    return request({
        url: '/csv/place/chengxi_liangshi',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}
// 通用方法--稠城街道家电市场
export function exportchoucheng_jiadian(data) {
    return request({
        url: '/csv/place/choucheng_jiadian',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}
// 通用方法--稠江街道国际家居城或家具城
export function exportchoujiang_jiaju(data) {
    return request({
        url: '/csv/place/choujiang_jiaju',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}
// 通用方法--稠江街道建材市场
export function exportchoujiang_jiancai(data) {
    return request({
        url: '/csv/place/choujiang_jiancai',
        method: 'get',
        params: data,
        // responseTypr:'blob'
    });
}

// // 通用方法--前天城西街道所扫码合计
// export function exportbeforeYesterday(data) {
//     return request({
//         url: '/csv/place/come',
//         method: 'get',
//         params: data
//     });
// }