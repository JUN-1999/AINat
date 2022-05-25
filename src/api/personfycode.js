import request from '@/plugins/request';

/**
 * @description 个人防疫码
 * @param {Object} param data {Object} 传值参数
 */
export function personcodeApi(data) {
    return request({
        url: 'personal/code',
        method: 'get',
        params: data
    });
}

export function personcodeCsvApi(data) {
    return request({
        url: 'csv/personal/code',
        method: 'get',
        params: data
    });
}

export function agentModificationApi(id, data) {
    return request({
        url: `personal/code/${id}`,
        method: 'put',
        params: data
    });
}