import request from '@/plugins/request';
//场所码----->行程及状态异常清册
export function changSuoMaAndXingChengAbnormal(data) {
    return request({
        url: '/placedeclare/abnormal',
        method: 'get',
        params: data
    });
}
//查询汇总中的镇街汇总
export function gettowndata(data) {
    return request({
        url: '/querycenter/place_street_date_nums',
        method: 'GET',
        params: data

    })
}

//查询汇总中的时间节点汇总
export function gettimenodedata(data) {
    return request({
        url: 'querycenter/place_hour_nums',
        method: 'GET',
        params: data
    })
}

// 获得分类汇总
export function getflTotalApi(data) {
    return request({
        url: 'querycenter/place_classify_date_nums',
        method: 'GET',
        params: data
    })
}
// 获得行业汇总
export function industrySummary(data) {
    return request({
        url: 'querycenter/place_type_date_nums',
        method: 'get',
        params: data
    })
}

//查询汇总中的疫苗接种汇总
export function getvaccinationdata(data) {
    return request({
        url: 'querycenter/place_date_nums_by_name',
        method: 'GET',
        params: {
            name: 'ymjz'
        }
    })
}
// 获得健康码汇总
export function getjkmTotalApi(data) {
    return request({
        url: 'querycenter/place_date_nums_by_name',
        method: 'GET',
        params: {
            name: 'jkm'
        }
    })
}

// 获得行程码汇总
export function getxcmTotalApi(data) {
    return request({
        url: 'querycenter/place_date_nums_by_name',
        method: 'GET',
        params: {
            name: 'xcm'
        }
    })
}

// 获得核酸汇总
export function nucleicAcidSummary(data) {
    return request({
        url: 'querycenter/place_date_nums_by_name',
        method: 'GET',
        params: {
            name: 'hsjc'
        }
    })
}

// 获得人源管控汇总
export function humanResourceControlSummary(data) {
    return request({
        url: 'querycenter/place_date_nums_by_name',
        method: 'GET',
        params: {
            name: 'gkzz'
        }
    })
}
// // 场所码注销列表
// export function siteCodeCancellationList(data) {
//     return request({
//         url: '',
//         method: 'GET',
//         params: data
//     });
// }
// // 场所码注销导入
// export function siteCodeCancellationAdd(data) {
//     return request({
//         url: '',
//         method: 'POST',
//         data
//     });
// }
// // 骑手注销
// export function siteCodeCancellationCellation(data) {
//     return request({
//         url: '',
//         method: 'post',
//         data
//     });
// }