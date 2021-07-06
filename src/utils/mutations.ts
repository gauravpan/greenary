import axios from 'axios'

export function addProductMutation(data) {
    return axios({ method: 'post', url: '/api/product', data });
}

export function addBidMutation(data) {
    return axios({ method: 'post', url: '/api/product/bid', data });
}