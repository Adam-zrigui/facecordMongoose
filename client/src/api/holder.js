import axios from "axios"
const holder = axios.create({
    url:"http://localhost:5000",
    timeout: 5000
})
export default holder