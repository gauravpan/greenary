import axios from "axios";

export function getProduct({ queryKey }) {
    return axios.get(`/api/product/${queryKey[0]}`)
}