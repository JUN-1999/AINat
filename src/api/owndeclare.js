import request from '@/plugins/request';

export function owndeclareGet(data) {
    return request({
        url: 'owndeclare',
        method: 'get',
        params: data
    });
}
export function placelist() {
    return request({
        url: 'place/type',
        method: 'get',
    });
}
export function owndeclareGuarantineGet(data) {
    return request({
        url: 'owndeclare/quarantine',
        method: 'get',
        params: data
    });
}

// T新增卡口申报地区（删改查接口用restful规范调用）

export function owndeclarebarrierDistrictPost(data) {
    return request({
        url: 'barrier_district',
        method: 'POST',
        params: data
    });
}
export function owndeclarebarrierDistrictGetWaibu(data) {
    return request({
        url: 'barrier_district',
        method: 'get',
        params: data
    });
}
export function owndeclarebarrierDistrictGet(id) {
    return request({
        url: `barrier_district/${id}`,
        method: 'get',
    });
}
export function owndeclarebarrierDistrictPut(id, data) {
    return request({
        url: `barrier_district/${id}`,
        method: 'put',
        params: data
    });
}

export function owndeclarebarrierDistrictDelete(id) {
    return request({
        url: `barrier_district/${id}`,
        method: 'DELETE'
    });
};

export function owndeclareCardeclare(data) {
    return request({
        url: `cardeclare`,
        method: 'get',
        params: data
    });
};



export function owndeclarePlacedeclare(data) {
    return request({
        url: `placedeclare`,
        method: 'get',
        params: data
    });
};

export function owndeclarepPlace(data) {
    return request({
        url: `place`,
        method: 'get',
        params: data
    });
};


export function owndeclarepPlaceUid(id) {
    return request({
        url: `place/${id}`,
        method: 'get'
    });
};

export function owndeclarepPlacePOST(data) {
    return request({
        url: `place`,
        method: 'POST',
        params: data
    });
};

export function owndeclarepPlacePUT(id, data) {
    return request({
        url: `place/${id}`,
        method: 'put',
        params: data
    });
};

export function owndeclarepPlaceDELETE(id) {
    return request({
        url: `place/${id}`,
        method: 'DELETE',
    });
};

export function deletelist(data) {
    return request({
        url: 'place/delete_list',
        method: 'get',
        params: data
    });
};

export function owndeclarepAbnormal(data) {
    return request({
        url: 'placedeclare/code',
        method: 'get',
        params: data
    });
}


// 查看最近6次核酸信息
export function recentrecords(data) {
    return request({
        url: 'hsjc/result/log',
        method: 'get',
        params: data
    })
}

// 最近返义人员清册
export function backpersonlist(data) {
    return request({
        url: 'user/sub_change',
        method: 'get',
        params: data
    })
}

export function backpersonsub_change(data) {
    return request({
        url: 'csv/user/sub_change',
        method: 'get',
        params: data
    })
}
// 批量设置场所码校验等级
export function batchUpdateXcmLevel(data) {
    return request({
        url: 'place/batchUpdateXcmLevel',
        method: 'post',
        data
    })
}

// 批量设置是否需要人脸验证 
export function batchUpdateIsNeedFace(data) {
    return request({
        url: 'place/batchUpdateIsNeedFace',
        method: 'post',
        data
    })
}

export function placedeclareNode(data) {
    return request({
        url: 'placedeclare/node',
        method: 'get',
        params: data
    })
}