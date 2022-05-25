
import request from '@/plugins/request';



/*
 * 库存列表
 * */
export function getStockList (params) {
    return request({
        url: '/depot/stock/list',
        method: 'get',
        params
    });
}


/*
 * 获取库位库存列表
 * */
export function getStockPostionIndex (params) {
    return request({
        url: '/depot/positionstock/index',
        method: 'get',
        params
    });
}

/*
 * GET
获取拣货列表
 * */
export function getPostionPick (params) {
    return request({
        url: '/depot/positionpick',
        method: 'get',
        params
    });
}

/*
 * 获取库位库存列表 某商品
 * */
export function getStockPostionIndexCargo (params) {
    return request({
        url: '/depot/positionstock/cargo',
        method: 'get',
        params
    });
}


/*
 * GET
库存中未上架产品批次列表
 * */
export function getUnshelfedList (params) {
    return request({
        url: '/depot/stock/unshelfed_cargo_list',
        method: 'get',
        params
    });
}


/*
POST
商品库存下架
 * */
export function positionstockOffshelf (data) {
    return request({
        url: '/depot/positionstock/offshelf',
        method: 'POST',
        data
    });
}


/*
 * POST
商品库存上架
 * */
export function getUnshelfedOnshelf (data) {
    return request({
        url: '/depot/positionstock/onshelf',
        method: 'POST',
        data
    });
}

/*
 * POST
商品库存上架
 * */
export function pickPositonPick  (data) {
    return request({
        url: '/depot/positionpick/pick',
        method: 'POST',
        data
    });
}


/*
 * POST
发货出库（按订单发货）
 * */
export function outerDeliver  (data) {
    return request({
        url: '/depot/bill/outer/deliver',
        method: 'POST',
        data
    });
}
