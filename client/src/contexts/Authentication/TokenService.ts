class TokenService {
    getLocalRefreshToken() {
        const userstr = localStorage.getItem('user')
        if(userstr)
            var user =  JSON.parse(userstr)
            return user.refreshToken
    }
  
    getLocalAccessToken() {
        const userstr = localStorage.getItem('user')
        if(userstr != null) {
            var user =  JSON.parse(userstr)
            return user.token
        }
        return
    }
  
    updateLocalAccessToken(newAccess: any) {
        const userstr = localStorage.getItem('user')
        if(userstr && newAccess.token &&
            newAccess.expiration && newAccess.refreshToken &&
            newAccess.refreshTokenExpiration) {
                var user =  JSON.parse(userstr)
                user.token = newAccess.token
                user.expiration = newAccess.expiration
                user.refreshTokenExpiration = newAccess.refreshTokenExpiration
                user.refreshToken = newAccess.refreshToken
                console.log(user)
                localStorage.setItem('user', JSON.stringify(user))
                //if (navigator.cookieEnabled) {
                //    var timestampToken = new Date(newAccess.expiration)
                //    var timestampRefresh = new Date(newAccess.refreshTokenExpiration)
                //      setCookie('access_token', newAccess.token, {expires: timestampToken})
                //      setCookie('refresh_token', newAccess.refreshToken, {expires: timestampRefresh})
                //}
            }
    }
  
    setUser(user: any) {
        console.log(JSON.stringify(user))
        localStorage.setItem('user', JSON.stringify(user))
    }
  
    removeUser() {
        localStorage.removeItem('user')
    }
  }
  
  export default new TokenService()
  