import JWZRequest from './request'
import { localStorageCache } from '@/utils/settleCache'
import { MyAxiosRequestConfig } from './types/axiosType'

const TIMEOUT = 3000
console.log(TIMEOUT)

let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = '/api'
} else {
  baseURL = '/api'
}
if (baseURL === '') {
  baseURL = '/api'
}

const config: MyAxiosRequestConfig = {
  baseURL: baseURL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localStorageCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestFailFn: (err) => {
      return err
    },
  },
}

const request = new JWZRequest(config)
export default request
