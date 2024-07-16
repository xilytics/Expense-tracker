import axios from 'axios';

const setupAxios = () => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setupAxios;