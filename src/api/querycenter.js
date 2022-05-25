
import request from '@/plugins/request'
export  function health_info(data){
 return  request({
     url:'querycenter/health_info',
     method:'get',
     params:data

 })
}
export function renyuanstate(data){
    return request({
        url:'querycenter/rygk',
        method:'get',
        params:data
    })
}