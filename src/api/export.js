import request from '@/plugins/request';
// 自主申报导出
export function exportOwndeclare(data) {
    return request({
        url: '/csv/owndeclare',
        method: 'get',
        params: data
    });
}

// 异常信息-外出异常导出
export function exportDataerrorLeave(data) {
    return request({
        url: '/csv/dataerror/leave',
        method: 'get',
        params: data
    });
}

// 异常信息-来义异常导出
export function exportDataerrorCome(data) {
    return request({
        url: '/csv/dataerror/come',
        method: 'get',
        params: data
    });
}

// 异常信息-行程码识别导出
export function exportDataerrorOcr(data) {
    return request({
        url: '/csv/dataerror/ocr',
        method: 'get',
        params: data
    });
}

// 异常信息-短期重复申报导出
export function exportDataerrorTodayMany(data) {
    return request({
        url: '/csv/dataerror/todayMany',
        method: 'get',
        params: data
    });
}

// 异常信息-中高风险异常导出
export function exportDataerrorRiskarea(data) {
    return request({
        url: '/csv/dataerror/riskarea',
        method: 'get',
        params: data
    });
}
// 预警信息-未按时反义导出  
export function exportDatawarningCbackouttime(data) {
    return request({
        url: '/csv/datawarning/backouttime',
        method: 'get',
        params: data
    });
}

// 预警信息-中高风险密接导出
export function exportDatawarningRiskarea(data) {
    return request({
        url: '/csv/datawarning/riskarea',
        method: 'get',
        params: data
    });
}

// 人员信息导出
export function exportUser(data) {
    return request({
        url: '/csv/user',
        method: 'get',
        params: data
    });
}

// 统计-年龄段导出
export function exportStatisticAge(data) {
    return request({
        url: '/csv/statistic/age',
        method: 'get',
        params: data
    });
}

// 统计-在义街道导出
export function exportStatisticYwstreet(data) {
    return request({
        url: '/csv/statistic/ywstreet',
        method: 'get',
        params: data
    });
}


// 统计-来源地导出
export function exportStatisticFromwhere(data) {
    return request({
        url: '/csv/statistic/fromwhere',
        method: 'get',
        params: data
    });
}

// 统计-来源地导出
export function getCsvProgress(data) {
    return request({
        url: '/csv/getCsvProgress',
        method: 'get',
        params: data
    });
}

export function Csvcompany(data) {
    return request({
        url: '/csv/company',
        method: 'get',
        params: data
    });
}
export function Csvuser(data) {
    return request({
        url: '/csv/user',
        method: 'get',
        params: data
    });
}
export function Csvunqualified(data) {
    return request({
        url: '/csv/unqualified',
        method: 'get',
        params: data
    });
}

export function Csvplacedeclare(data) {
    return request({
        url: '/csv/placedeclare',
        method: 'get',
        params: data
    });
}
export function Csvabnormal(data) {

    return request({
        url: '/csv/placedeclare/code',
        method: 'get',
        params: data
    });
}

export function Csvfromwhere(data) {
    return request({
        url: '/csv/statistic/fromwhere',
        method: 'get',
        params: data
    });
}

export function Csvabnormalexport(data) {
    return request({
        url: '/csv/placedeclare/abnormal',
        method: 'get',
        params: data
    });
}

export function exportOwndeclareRecentCome(data) {
    return request({
        url: 'csv/owndeclare/recent_come',
        method: 'get',
        params: data
    });
}

// 场所码批量导出
export function batchExportCSM(data) {
    return request({
        url: 'csv/place',
        method: 'get',
        params: data
    })
}

//查询中心的人员管控状态的列表导出
export function rygkcsv(data) {
    return request({
        url: 'csv/querycenter/rygk',
        method: 'get',
        params: data
    })
}

//ai核酸导出
export function exportnucleicAcidComparison(data) {
    return request({
        url: '',
        method: 'get',
        params: data
    })
}