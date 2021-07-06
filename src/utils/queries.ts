import axios from 'axios'

export function getProduct({ queryKey }) {
  return axios.get(`/api/product/${queryKey[0]}`)
}

export function getProducts({ queryKey }) {
  return axios.get(`/api/product`)
}

export function getBids({ queryKey }) {
  return axios.get(`/api/product/bid`)
}

export function getTopBids({ queryKey }) {
    return axios.get(`/api/product/bid/top`)
  }
