import request from '@/plugins/request';

export function backouttimeGet (data) {
  return request({
    url: 'datawarning/backouttime',
    method: 'get',
    params: data
  });
}

export function riskareaGet (data) {
  return request({
    url: 'datawarning/riskarea',
    method: 'get',
    params: data
  });
}