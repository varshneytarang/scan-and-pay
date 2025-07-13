import axios from "axios"

const instance=axios.create({
    baseURL:"http://localhost:6790",
    withCredentials:true,
})

export default instance;