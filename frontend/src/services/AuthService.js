import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

class AuthService {
  signUp(email, password) {
    return axios.post(`${API_URL}/signup`, { email, password });
  }

  signIn(email, password) {
    return axios.post(`${API_URL}/signin`, { email, password });
  }

  signOut() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
