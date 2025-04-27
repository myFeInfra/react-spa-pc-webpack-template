import axios, { AxiosHeaders } from 'axios'
import { localStorageCache } from '@/utils/settleCache'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { MyAxiosRequestConfig } from '@/servies/types/axiosType'

class JWZRequest {
  instance: AxiosInstance

  // constructor init baseURL and timeout
  constructor(config: MyAxiosRequestConfig) {
    this.instance = axios.create(config)

    // all request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorageCache.getCache('token')
        const headers = new AxiosHeaders(config.headers)
        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json')
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // all response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        switch (error.response.status) {
          case 400: // Bad Request
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 401: // Unauthorized
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 403: // Forbidden
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 404: // Not Found
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 405: // Method Not Allowed
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 408: // Request Timeout
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 409: // Conflict
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 410: // Gone
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 411: // Length Required
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 412: // Precondition Failed
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 413: // Payload Too Large
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 500: // Internal Server Error
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 501: // Not Implemented
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
          case 502: // Bad Gateway
            return Promise.reject({
              code: error.response.status,
              message: error.response.data.message,
              data: error.response.data.data,
            })
        }
      }
    )

    // observer config isHas interceptor
    if (config.interceptors) {
      // request interceptor
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailFn
      )
      // response interceptor
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailFn
      )
    }
  }

  // request method
  request<T = any>(config: MyAxiosRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(
        config as InternalAxiosRequestConfig
      )
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          if (config.interceptors?.responseFailFn) {
            err = config.interceptors.responseFailFn(err)
          }
          reject(err)
        })
    })
  }

  // get method
  get<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  // post method
  post<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  // delete method
  delete<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  // patch method
  patch<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  // put method
  put<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  // head method
  head<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'HEAD' })
  }

  // options method
  options<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'OPTIONS' })
  }

  // trace method
  trace<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'TRACE' })
  }

  // connect method
  connect<T = any>(config: MyAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'CONNECT' })
  }
}

export default JWZRequest
