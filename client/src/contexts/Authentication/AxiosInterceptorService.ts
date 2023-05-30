import axios from 'axios'
import TokenService from './TokenService'

const environment = process.env.NODE_ENV  

const baseURL = environment === 'production'
  ? 'https://dashboards-server.azurewebsites.net/api/v1/'
  : 'https://localhost:7173/api/v1/'

const instance = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json'}
})

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken()
        if(token) {
            config.headers['Authorization'] = token //Might be x access token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (res) => {
        return res
    },
    async (err) => {
        const originalConfig = err.config
        console.log(err)

        if(originalConfig.url !== 'authentication/login' && err.response) {
            //Access token expired
            if(err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true
                try {
                        var token = TokenService.getLocalRefreshToken()
                        const response = await instance.post(
                            'authentication/token/refresh/cookie',
                            { token })
                        
                        const newAccess = response.data
                        TokenService.updateLocalAccessToken(newAccess)
                        return instance(originalConfig)
                    //}
                } catch (error) {
                    return Promise.reject(error)
                }
            }
        }
        return Promise.reject(err)
    }
)

export default instance
