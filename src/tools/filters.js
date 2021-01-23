import config from './config';

export default {
  filters: {
    formatData: (value, fmt) => {
      if (!value) {
        return '';
      }
      const getDate = new Date(value);
      let o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+': getDate.getSeconds(),
        'q+': Math.floor((getDate.getMonth() + 3) / 3),
        'S': getDate.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }
      return fmt;
    },
    Money: (value) => {
      if (!value) return '0.00';
      return parseFloat(value / 100)
        .toFixed(2);
    },
    getValueByArray: (ids, arr) => {
      if (!ids) {
        return;
      }
      const idsArray = String(ids)
        .split(',')
        .map(item => {
          return arr.filter(val => val.id === item)[0];
        });
      return idsArray.map(item => {
        return item.title;
      })
        .join(' ');
    },

    // 通过省市区ID，获取城市名称
    cityIdToName: (val) => {
      if (!val) {return}
      const ProList = config.CityList.filter(i => {
        return i.id.toString().slice(0, 2) === val.toString().slice(0, 2)
      })
      if (ProList.length > 0 && ProList[0].id === val) {
        return ProList[0].name
      }

      if (ProList.length > 0 && ProList[0].id !== val) {
        const CityList = ProList[0].son.filter(i => {
          return i.id.toString().slice(0, 4) === val.toString().slice(0, 4)
        })
        if (CityList.length > 0 && CityList[0].id === val) {
          return CityList[0].name
        }

        if (CityList.length > 0 && CityList[0].id !== val) {
          const areaList = CityList[0].son.filter(i => {
            return i.id.toString() === val.toString()
          })

          if (areaList.length > 0 && areaList[0].id === val) {
            return areaList[0].name
          }

        }
      }
    },

    // 性别
    sexToLabel: (val) => {
      let value = val ? val : '-';
      return config.Sex.filter(i => {
        return i.id === value;
      }).length > 0
        ? config.Sex.filter(i => {
          return i.id === value;
        })[0].title
        : value;
    },

    // 交付订单状态
    DeliverToLabel: (val) => {
      let value = val ? val : '-';
      return config.Deliver.filter(i => {
        return i.id === value;
      }).length > 0
        ? config.Deliver.filter(i => {
          return i.id === value;
        })[0].title
        : value;
    },

    // 用户状态
    UserToLabel: (val) => {
      let value = val ? val : '-';
      return config.User.filter(i => {
        return i.id === value;
      }).length > 0
        ? config.User.filter(i => {
          return i.id === value;
        })[0].title
        : value;
    },
  }
};
