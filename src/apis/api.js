import axios from "axios";
const apiKey='AIzaSyD-uI-eMLHi5SwjimfEymOO5b_8lh2Y7Mk'
const api=axios.create({
    baseURL:"https://identitytoolkit.googleapis.com/v1/accounts",
    headers:{
        "Content-Type":'application/json'
    },
    params:{
        key:apiKey
    }
});
export default api;