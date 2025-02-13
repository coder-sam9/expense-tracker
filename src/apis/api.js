import axios from 'axios';

const api = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
    headers: {
        "Content-Type": 'application/json'
    },
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

export default api;