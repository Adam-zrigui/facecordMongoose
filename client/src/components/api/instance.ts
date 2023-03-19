import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:5500",
    timeout: 5000
})
export default axiosInstance