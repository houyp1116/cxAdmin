const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {title: "登录", isNeedToken: false,},
  },
  {
    path: "/Home",
    name: "Home",
    component: resolve => require(['@/views/Home.vue'], resolve),
    meta: {title: "主页", isNeedToken: true},
    children: [
      {
        path: "",
        meta: {isNeedToken: true},
        redirect: {
          path: "User"
        }
      },
      {
        path: "User",
        name: "User",
        component: resolve => require(['@/views/User/Container.vue'], resolve),
        meta: {title: "用户管理", icon: "team", isNeedToken: true},
        children: [
          {
            path: "",
            meta: {isNeedToken: true},
            redirect: {
              path: "List"
            }
          },
          {
            path: "List",
            component: resolve => require(['@/views/User/List.vue'], resolve),
            meta: {title: "用户列表", isNeedToken: true},
          },
        ]
      },
      {
        path: "Publish",
        name: "Publish",
        meta: {title: "发布管理", icon: "form", isNeedToken: true},
        component: resolve => require(['@/views/Publish/Container.vue'], resolve),
        children: [
          {
            path: "",
            meta: {isNeedToken: true},
            redirect: {
              path: "DeliverList"
            }
          },
          {
            path: "DeliverList",
            component: resolve => require(['@/views/Publish/DeliverList.vue'], resolve),
            meta: {title: "交付订单列表", isNeedToken: true},
          },
          {
            path: "OrderList",
            component: resolve => require(['@/views/Publish/OrderList.vue'], resolve),
            meta: {title: "订单列表", isNeedToken: true},
          },
          {
            path: "ResourceList",
            component: resolve => require(['@/views/Publish/ResourceList.vue'], resolve),
            meta: {title: "资源列表", isNeedToken: true},
          },
          {
            path: "RequestList",
            component: resolve => require(['@/views/Publish/RequestList.vue'], resolve),
            meta: {title: "需求列表", isNeedToken: true},
          },
          {
            path: "DiscussList",
            component: resolve => require(['@/views/Publish/DiscussList.vue'], resolve),
            meta: {title: "留言列表", isNeedToken: true},
          },
        ]
      },
      {
        path: "Finance",
        name: "Finance",
        meta: {title: "财务管理", icon: "pay-circle", isNeedToken: true},
        component: resolve => require(['@/views/Finance/Container.vue'], resolve),
        children: [
          {
            path: "",
            meta: {isNeedToken: true},
            redirect: {
              path: "CoinList"
            }
          },
          {
            path: "CoinList",
            component: resolve => require(['@/views/Finance/CoinList.vue'], resolve),
            meta: {title: "协币记录", isNeedToken: true},
          },
          {
            path: "PayList",
            component: resolve => require(['@/views/Finance/PayList.vue'], resolve),
            meta: {title: "支付订单记录", isNeedToken: true},
          },
        ]
      },
      {
        path: "Opinion",
        name: "Opinion",
        meta: {title: "意见与建议", icon: "bulb", isNeedToken: true},
        component: resolve => require(['@/views/Opinion/Container.vue'], resolve),
        children: [
          {
            path: "",
            meta: {isNeedToken: true},
            redirect: {
              path: "Complain"
            }
          },
          {
            path: "Complain",
            component: resolve => require(['@/views/Opinion/Complain.vue'], resolve),
            meta: {title: "投诉举报", isNeedToken: true},
          },
          {
            path: "Feedback",
            component: resolve => require(['@/views/Opinion/Feedback.vue'], resolve),
            meta: {title: "反馈问题", isNeedToken: true},
          },
        ]
      },
      {
        path: "System",
        name: "System",
        meta: {title: "系统管理", icon: "setting", isNeedToken: true},
        component: resolve => require(['@/views/System/Container.vue'], resolve),
        children: [
          {
            path: "",
            meta: {isNeedToken: true},
            redirect: {
              path: "System"
            }
          },
          {
            path: "System",
            component: resolve => require(['@/views/System/System.vue'], resolve),
            meta: {title: "系统设置", isNeedToken: true},
          },
          {
            path: "Message",
            component: resolve => require(['@/views/System/Message.vue'], resolve),
            meta: {title: "站内信", isNeedToken: true},
          },
          {
            path: "Recommend",
            component: resolve => require(['@/views/System/Recommend.vue'], resolve),
            meta: {title: "推荐位", isNeedToken: true},
          }
        ]
      },
    ]
  }
]

export default routes
