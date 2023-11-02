import axios from "axios";
import { TOKEN, USER_LOGIN } from './_constantsUtils';

const api = axios.create({
    baseURL: 'http://localhost:8088/'
});

api.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_LOGIN))?.token}`,
        token: `${JSON.parse(localStorage.getItem(USER_LOGIN))?.token}`
    };
    return config;
});


export default api;