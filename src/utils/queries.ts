import axios from 'axios'

export function getProduct({ queryKey }) {
  return axios.get(`/api/product/${queryKey[0]}`)
}

export function getProducts({ queryKey }) {
  return axios.get(`/api/product`)
}
