import axios from 'axios';
import backendConfig from '../config/backend-config';

const { baseURL } = backendConfig;

const instance = axios.create({
    baseURL,
    validateStatus: status => status >= 200 && status < 300, // axios won't throw errors if status code is 4xx by default
});

export default instance;
