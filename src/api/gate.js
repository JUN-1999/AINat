/*
 * @Author: your name
 * @Date: 2022-01-10 15:02:26
 * @LastEditTime: 2022-04-22 15:37:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ldrk_pc\src\api\riskdistrict.js
 */
import request from '@/plugins/request';
import Qs from 'qs'

export function getriskdistrict(data) {
  return request({
    url: 'gate/gatefactory',
    method: 'get',
    params: data
  });
}

export function getdistrictLiandon(data) {
  return request({
    url: 'district',
    method: 'get',
    params: data
  });
}




export function postdistrictLiandon(data) {
  return request({
    url: '/riskdistrict',
    method: 'post',
    data
  });
}

export function putdistrictLiandon(id, data) {
  return request({
    url: `/riskdistrict/${id}`,
    method: 'put',
    data
  });
}

export function deletedistrictLiandon(id) {
  return request({
    url: `/ainatapi/riskdistrict/${id}`,
    method: 'DELETE'
  });
};


export function adminapiriskdistrict_get(id) {
  return request({
    url: `riskdistrict/${id}`,
    method: 'get'
  });
};

export function communityList(data) {
  return request({
    url: 'community',
    method: 'get',
    params: data
  });
};

export function postgatefactory(id,data) {
  return request({
    url: '/gate/gatefactory',
    method: 'post',
    data
  });
}

export function putgatefactory(id, data) {
  return request({
    url: `/gate/gatefactory/${id}`,
    method: 'put',
    data
  });
}
export function gateDeclare(data) {
  return request({
    url: 'gate/gateDeclare',
    method: 'get',
    params: data
  });
}

export function getgate(data) {
  return request({
    url: 'gate/gate',
    method: 'get',
    params: data
  });
}






export function postgate(id,data) {
  return request({
    url: '/gate/gate',
    method: 'post',
    data
  });
}

export function putgate(id, data) {
  return request({
    url: `/gate/gate/${id}`,
    method: 'put',
    data
  });
}


export function gateverifyApi(data) {
  return request({
      transformRequest: [function (data) {
          data = Qs.stringify(data)
          return data
      }],
      url: `/import/gate/verify`,
      method: 'post',
      data
  });
};

export function gatebatchSave(data) {
  return request({
      url: 'gate/batchSaveGate',
      method: 'post',
      data
  });
}
//闸机厂商列表的导出
export function exportSampleOrgan(data){
  return request({
    url:'/csv/gate_factory',
    method:'get',
    params:data
  })
}

// 闸机列表批量导出
export function Csvgate(data){
  return request({
    url:'/csv/gate',
    method:'get',
    params:data
  })
}