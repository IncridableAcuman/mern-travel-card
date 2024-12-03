import axios from 'axios'

export const API_URL="http://localhost:8000"
const $axios=axios.create({
    withCredentials:true,
    baseURL:`${API_URL}/api`,
})

export default $axios