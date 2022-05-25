/*
 * @Author: your name
 * @Date: 2022-01-10 15:02:26
 * @LastEditTime: 2022-03-04 13:47:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ldrk_pc\src\api\riskdistrict.js
 */
import request from '@/plugins/request';

export function getriskdistrict(data) {
  return request({
    url: 'riskdistrict',
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
// 重点中高风险地区
export function getemphasisriskdistrict(data) {
  return request({
    url: 'riskdistrictPro',
    method: 'get',
    params: data
  });
}
// 获得某个特点的重点中高风险地区
export function emphasisriskdistrict_get(id) {
  return request({
    url: `riskdistrictPro/${id}`,
    method: 'get'
  });
};
// 新增重点中高风险地区
export function postemphasisriskdistrict(data) {
  return request({
    url: 'riskdistrictPro',
    method: 'post',
    data
  });
}
// 修改重点中高风险地区
export function putemphasisriskdistrict(id, data) {
  return request({
    url: `riskdistrictPro/${id}`,
    method: 'put',
    data
  });
}
// 删除重点中高风险地区
export function deleteemphasisriskdistrict(id) {
  return request({
    url: `riskdistrictPro/${id}`,
    method: 'DELETE',
  });
}

export function postrestore(data) {
  return request({
    url: `place/restore/${data}`,
    method: 'post',
  })
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

// 获得人员信息
export function getUserApi(data) {
  return request({
    url: 'user/user',
    method: 'get',
    params: data
  })
}

// 获得 反扫个人码管理
export function getManagerApi(data) {
  return request({
    url: 'user/manager',
    method: 'get',
    params: data
  })
}

// 设置 反扫个人码管理
export function postManagerApi(data) {
  return request({
    url: 'user/manager',
    method: 'post',
    data
  })
}
// 修改 反扫个人码管理
export function putManagerApi(id, data) {
  return request({
    url: 'user/manager/:id',
    method: 'put',
    data
  })
}
// 删除 反扫个人码管理
export function deleteManagerApi(id) {
  return request({
    url: 'user/manager/:id',
    method: 'delete'
  })
}