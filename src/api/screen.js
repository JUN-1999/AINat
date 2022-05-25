import request from '@/plugins/request';

export function declareDate (data) {
  return request({
    url: 'screen/declare_date',
    method: 'get',
    params: data
  });
}

export function sourceProvince (data) {
  return request({
    url: 'screen/source_province',
    method: 'get',
    params: data
  });
}

export function getnums (data) {
  return request({
    url: 'screen/nums',
    method: 'get',
    params: data
  });
}

export function riskareaProvinceCome (data) {
  return request({
    url: 'screen/riskarea_province_come',
    method: 'get',
    params: data
  });
}

export function district (data) {
  return request({
    url: 'district',
    method: 'get',
    params: data
  });
}

export function floatingPopulation (data) {
  return request({
    url: 'screen/floating_population',
    method: 'get',
    params: data
  });
}

// 中高风险返义
export function riskareaCome (data) {
  return request({
    url: 'screen/riskarea_come',
    method: 'get',
    params: data
  });
}

// 未按时返义
export function backouttime (data) {
  return request({
    url: 'screen/backouttime',
    method: 'get',
    params: data
  });
}

// 管控情况统计数据
export function screencontrol (data) {
  return request({
    url: 'screen/control',
    method: 'get',
    params: data
  });
}

// 风险地区新增情况
export function riskarea (data) {
  return request({
    url: 'screen/riskarea',
    method: 'get',
    params: data
  });
}

export function comeYwStreet (data) {
  return request({
    url: 'screen/come_yw_street',
    method: 'get',
    params: data
  });
}


