import request from '@/plugins/request';

export function statisticAge (data) {
  return request({
    url: '/statistic/age',
    method: 'get',
    params: data
  });
}

export function statisticYwstreet (data) {
  return request({
    url: '/statistic/ywstreet',
    method: 'get',
    params: data
  });
}

export function statisticFromwhere (data) {
  return request({
    url: '/statistic/fromwhere',
    method: 'get',
    params: data
  });
}


export function statisticTodayMany (data) {
  return request({
    url: '/statistic/todayMany',
    method: 'get',
    params: data
  });
}