/*
 * @Author: your name
 * @Date: 2022-02-22 15:55:12
 * @LastEditTime: 2022-04-24 10:19:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ldrk_pc\src\api\company.js
 */
import request from '@/plugins/request';

export function companylist(data) {
    return request({
        url: 'company/index',
        method: 'get',
        params: data
    });
}
export function companystafflist(data) {
    return request({
        url: 'company/staff',
        method: 'get',
        params: data
    });
}
export function staffGetcompany(data) {
    return request({
        url: 'staff/company',
        method: 'get',
        params: data
    });
}
export function staffList(data) {
    return request({
        url: 'staff/list',
        method: 'get',
        params: data
    });
}
export function unqualifiedlist(data) {
    return request({
        url: 'company/unqualified',
        method: 'get',
        params: data
    });
}
export function editcheckfrequency(data) {
    return request({
        url: 'staff/check_frequency',
        method: 'post',
        data
    });
}
export function editcheckyiwuname(data) {
    return request({
        url: 'company/batchUpdateCompanyStaffClassify',
        method: 'post',
        data
    })
}

export function unqualifiedSms(data) {
    return request({
        url: 'company/unqualified/sms',
        method: 'get',
        params: data
    });
}

export function companyClassify(data) {
    return request({
        url: 'company/classify',
        method: 'get',
        params: data
    });
}
export function editcheckcompanyClassify(data) {
    return request({
        url: 'company/batchUpdateCompanyClassify',
        method: 'post',
        data
    });
}

export function putcompanyClassify(id, data) {
    return request({
        url: `company/classify/${id}`,
        method: 'put',
        data
    });
}
export function postcompanyClassify(id, data) {
    return request({
        url: 'company/classify',
        method: 'post',
        data
    });
}
export function staffcompanyClassify(data) {
    return request({
        url: 'company/staff/classify',
        method: 'get',
        params: data
    });
}
export function putstaffcompanyClassify(id, data) {
    return request({
        url: `company/staff/classify/${id}`,
        method: 'put',
        data
    });
}
export function poststaffcompanyClassify(id, data) {
    return request({
        url: 'company/staff/classify',
        method: 'post',
        data
    });
}

//转移联络员
export function transfer_link(data) {
    return request({
        url: '/company/transfer_link',
        method: 'post',
        data
    })
}

//获取镇街下的社区列表
export function communityList(data) {
    return request({
        url: '/community',
        method: 'get',
        params: data
    })
}

//关注企业
export function subscribecompany(data) {
    return request({
        url: '/admincompany/follow',
        method: "POST",
        data
    })
}

//取消关注
export function subscribedelete(data) {
    return request({
        url: '/admincompany/unfollow',
        method: "POST",
        data
    })
}

//我关注的企业
export function subscribecompanymine(data) {
    return request({
        url: '/admincompany/followed',
        method: 'GET',
        params: data
    })
}

//ai核酸列表
export function nucleicAcidComparisonList(data) {
    return request({
        url: '',
        method: "GET",
        params: data
    })
}

//ai核酸导入
export function nucleicAcidComparisonImport(data) {
    return request({
        url: '',
        method: 'GET',
        params: data
    })
}

//ai核酸比对
export function nucleicAcidComparison(data) {
    return request({
        url: '',
        method: 'GET',
        params: data
    })
}