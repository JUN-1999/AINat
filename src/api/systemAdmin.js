import request from '@/plugins/request';
import Qs from 'qs'
/**
 * @description 列表
 * @param {Object} param data {Object} 传值参数
 */
export function adminListApi(data) {
  return request({
    url: '/setting/admin',
    method: 'get',
    params: data
  });
};


/**
 * @description 管理员添加表单
 */
export function adminFromApi() {
  return request({
    url: '/setting/admin/create',
    method: 'get'
  });
};

/**
 * @description 管理员编辑表单
 * @param {Number} param id {Number} 管理员id
 */
export function adminEditFromApi(id) {
  return request({
    url: `/setting/admin/${id}/edit`,
    method: 'get'
  });
};

/**
 * @description 管理员删除
 * @param {Number} param id {Number} 管理员id
 */
export function adminDelFromApi(id) {
  return request({
    url: `/setting/admin/${id}`,
    method: 'DELETE'
  });
};

/**
 * @description 管理员 修改状态
 * @param {Object} param data {Object} 传值
 */
export function setShowApi(data) {
  return request({
    url: `setting/set_status/${data.id}/${data.status}`,
    method: 'PUT'
  });
};


// 读取excel文件数据返回
export function verifyApi(data) {
  return request({
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    url: `/import/admin/verify`,
    method: 'post',
    data
  });
};


/**
 * @description ET获取部门树
 * 
 */
export function gov_treeApi() {
  return request({
    url: `/gov/gov_tree`,
    method: 'get'
  });
};
/**
 * @description 获取角色选择列表
 * 
 */
export function role_select() {
  return request({
    url: `/setting/role_select`,
    method: 'get'
  });
};
/**
 * @description 添加后台管理员账号
 * 
 */
export function addadminApi(data) {
  return request({
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    url: `/setting/admin`,
    method: 'post',
    data
  });
};
export function updateadminApi(id, data) {
  return request({
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    url: `/setting/admin/` + id,
    method: 'put',
    data
  });
};
/**
 * @description 导出数据
 * 
 */
export function exportadminApi(data) {
  return request({
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    url: `/export/admin`,
    method: 'get',
    params: data
  });
};
/**
 * @description 
 * 
 */
export function addadminbatch(data) {
  return request({
    url: `/setting/admin/batch`,
    method: 'post',
    data
  });
};