import request from '@/plugins/request';

export function dataerrorLeave (data) {
  return request({
    url: 'dataerror/leave',
    method: 'get',
    params: data
  });
}

export function dataerrorCome (data) {
  return request({
    url: 'dataerror/come',
    method: 'get',
    params: data
  });
}


export function dataerrorRiskarea (data) {
  return request({
    url: 'dataerror/riskarea',
    method: 'get',
    params: data
  });
}


export function dataerrorOcr (data) {
  return request({
    url: 'dataerror/ocr',
    method: 'get',
    params: data
  });
}

export function dataerrorOTodayMany (data) {
  return request({
    url: 'dataerror/todayMany',
    method: 'get',
    params: data
  });
}

export function dataerrorJkmMzt (data) {
  return request({
    url: 'dataerror/jkm_mzt',
    method: 'get',
    params: data
  });
}

export function dataerrorTravelAsterisk (data) {
  return request({
    url: 'dataerror/travel_asterisk',
    method: 'get',
    params: data
  });
}