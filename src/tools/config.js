const Url = 'https://sqlw.amior.cn/'

let CityList = []

const Sex = [
  {id: 1, title: '男'},
  {id: 2, title: '女'},
  {id: 3, title: '不限'},
];

const Deliver = [
  {id: 1, title: "待托管"},
  {id: 2, title: "服务中"},
  {id: 3, title: "保护期"},
  {id: 4, title: "已完成"},
  {id: 5, title: "退款/纠纷"},
]

const User = [
  {id: 1, title: "未提交认证"},
  {id: 2, title: "未认证"},
  {id: 3, title: "已认证"},
  {id: 4, title: "认证不通过"},
]

export default {
  Url,
  CityList,
  Sex,
  Deliver,
  User
};
