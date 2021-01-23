import config from './config';
import http from './http';

export default {
  /**
   * 获取Url上的参数
   * @param url
   */
  getParams: (url) => {
    const formattedParams = {};
    const params = url.split('?').length > 1 ? url.split('?')[1].split('&') : [];
    for (let i = 0; i < params.length; i++) {
      formattedParams[params[i].split('=')[0]] = params[i].split('=')[1];
    }
    return formattedParams;
  },

  /**
   * 判断是否是微信浏览器
   * @returns {boolean}
   */
  isWeiXin: () => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
      if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
        return true;
      }
      return false;
    }
    return false;
  },

  /**
   * 格式化Date
   * @param str
   * @param fmt
   * @returns {string}
   */
  dateFormat: (str, fmt = 'YYYY-mm-dd') => {
    if (!str) {
      return '';
    }
    const date = new Date(str);
    let ret;
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      'S+': date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const k in opt) {
      ret = new RegExp(`(${k})`).exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
      }
    }
    return fmt;
  },

  /**
   * 生成导出链接
   * @param url
   * @param param
   * @returns {string}
   */
  exportUrl: (url, param) => {
    const token = sessionStorage.getItem("TOKEN")
    let params = '';
    Object.keys(param).map((key) => {
      params += `${key}=${param[key]}&`;
    });
    params += `token=${token}`;
    return `${config.Url + url}?${params}`;
  },

  /**
   * 获取省市区地址
   * @returns {Promise<unknown>}
   */
  getCityList: () => {
    return new Promise(function (resolve, reject) {
      http.get('/api/area/city').then(res => {
        if (res.code === 1) {
          config.CityList = res.data
          resolve(res.data)
        } else {
          reject('error')
        }
      })
    })
  },

  /**
   * 获取上传图片的请求路径
   * @returns {string}
   */
  getUploadImagePath: () => {
    return config.Url + '/admin/attatchment/upImage?token=' + sessionStorage.getItem("TOKEN")
  },

  /**
   * 获取Token
   * @returns {string}
   */
  getToken: () => {
    return sessionStorage.getItem("TOKEN")
  },

  /**
   * 设置token
   * @param value
   */
  setToken: (value) => {
    sessionStorage.setItem("TOKEN", value)
  },

};
