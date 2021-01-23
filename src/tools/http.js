import axios from './axios'
import config from './config'
import utils from './utils'
import axiosPackage from 'axios'

let instance = axios()

export default {
  get (url, params, headers) {
    let options = {}
    if (params) {
      options.params = params
    } else {
      options.params = {}
    }
    if (headers) {
      options.headers = headers
    } else {
      options.headers = {}
    }
    options.params.token = utils.getToken()
    return instance.get(config.Url + url, options)
  },
  post (url, params, headers) {
    let options = {}
    if (headers) {
      options.headers = headers
    } else {
      options.headers = {}
    }
    let token = utils.getToken()
    return instance.post(config.Url + url + '?token=' + token, params, options)
  },
  fromData(url, params) {
    return new Promise(function (resolve, rej) {
      let token = utils.getToken()
      axiosPackage({
        url: config.Url + url + '?token=' + token,
        method: 'post',
        data: params,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        resolve(res)
      }).catch(err => {
        rej(err)
      })
    })
  }
}
