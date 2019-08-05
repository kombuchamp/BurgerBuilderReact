import axios from 'axios';
import backendConfig from '../config/backend-config';

const { baseURL } = backendConfig;

const instance = axios.create({
    baseURL,
});

export default instance;
