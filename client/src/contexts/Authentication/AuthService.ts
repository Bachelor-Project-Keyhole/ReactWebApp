import axios from 'axios';
import Header from '../../components/Header/Header';
import { config } from 'webpack';
import authorizationHeader from './AuthorizationHeader';

const API_URL = 'https://localhost:7173/api/v1';

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + '/authentication/login', {
        email,
        password
      })
      .then(response => {
        if (response.status == 200) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    var user = this.getCurrentUser()
    localStorage.removeItem('user')
    return axios.post(API_URL + 'authentication/logout', { token: user.refreshToken })
  }

  registerCompany(fullName: string, email: string, password: string, organizationName: string) {
    return axios.post(API_URL + '/organization/register', {
      email,
      password,
      fullName,
      organizationName
    })
  }

  registerUser(username: string, password: string) {
    return axios.post(API_URL + '/organization/register/{token}', {
      password,
      username
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
