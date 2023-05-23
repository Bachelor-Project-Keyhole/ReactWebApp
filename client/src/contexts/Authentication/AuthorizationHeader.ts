/**
 * In case of we access protected resources, the request needs
 * an Authorization header.
 */

export default function authorizationHeader() {

    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
  
    if (user && user.token) {
        console.log(user.token)
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return { Authorization: '' };
    }
}