

import request from '@/plugins/request';

// AI核酸对比导入
export function natCompareAPI (data) {
  return request({
    url: '/import/nat_compare',
    method: 'post',
    data
  });
}
// 获取AI核酸对比列表
export function getNatCompare(data){
    return request({
        url: '/nat_compare',
        method: 'get',
        params:data
      });
}

// 比对
export function postNatCompare(data){
    return request({
        url: '/nat_compare',
        method: 'post',
        data
      });
}

// 比对进度
export function natCompareProgress(data){
  return request({
    url: '/nat_compare_progress',
    method: 'get',
    params:data
  });
}

// 实时查询单个核酸采样数据
export function actualHsjc(data){
  return request({
    url:'/single_compare/actual_hsjc',
    method: 'get',
    params:data
  });
}

// 保存历史任务
export function saveTask(data){
  return request({
    url:'/compare_task/save',
    method: 'post',
    data
  });
}

// AI核酸比对历史任务列表
export function getTaskList(data){
  return request({
    url:'/compare_task/list',
    method: 'get',
    params:data
  });
}

// AI核酸对比历史任务详情
export function readTask(data){
  return request({
    url:'/compare_task/read/'+data,
    method: 'get',
  });
}

// AI导出
export function natExport(data){
  return request({
    url:'/export/nat_compare',
    method: 'get',
    params:data
  });
}

