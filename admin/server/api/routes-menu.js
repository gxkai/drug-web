/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle /menu                                                                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
const koaRouter = require('koa-router')
const consts = require('../utils/consts')

const SHOW_EXAMPLES = consts.SHOW_EXAMPLES === true

const router = koaRouter({
  prefix: consts.BASE_API
})

let menu = [
  {
    id: '1',
    name: 'nav.home',
    url: '/',
    icon: 'el-icon-menu'
  },
  {
    id: '3',
    name: '分布图',
    url: '/map',
    icon: 'el-icon-menu'
  }
]

if (SHOW_EXAMPLES) {
  menu = menu.concat([
    {
      id: '20',
      name: 'nav.kitchenSink',
      icon: 'el-icon-goods',
      children: [
        {
          id: '20-1',
          name: 'nav.demo',
          url: '/examples',
          icon: 'el-icon-share'
        },
        {
          id: '20-2',
          name: 'nav.list',
          url: '/examples/activity',
          icon: 'el-icon-view'
        },
        {
          id: '20-3',
          name: 'nav.create',
          url: '/examples/activity/create',
          icon: 'el-icon-message'
        },
        {
          id: '20-4',
          name: 'nav.charts',
          url: '/examples/charts',
          icon: 'el-icon-picture'
        }
      ]
    },
    {
      id: '30',
      name: '店铺管理',
      icon: 'el-icon-goods',
      children: [
        {
          id: '30-1',
          name: '我要开店',
          url: '/shop/setup',
          icon: 'el-icon-share'
        }
      ]
    },
    {
      id: '40',
      name: '统计分析',
      icon: 'el-icon-goods',
      children: [
        {
          id: '40-1',
          name: '销售分析',
          url: '/analysis/sale',
          icon: 'el-icon-share'
        },
        {
          id: '40-2',
          name: '订单分析',
          url: '/analysis/order',
          icon: 'el-icon-share'
        },
        {
          id: '40-3',
          name: '处方统计',
          url: '/analysis/rx',
          icon: 'el-icon-share'
        },
        {
          id: '40-4',
          name: '药房销售额排名',
          url: '/analysis/shopSale',
          icon: 'el-icon-share'
        },
        {
          id: '40-5',
          name: '药品销量排名',
          url: '/analysis/drugSale',
          icon: 'el-icon-share'
        },
        {
          id: '40-6',
          name: '医保统计',
          url: '/analysis/medicaid',
          icon: 'el-icon-share'
        }
      ]
    },
    {
      id: '50',
      name: '店铺审核',
      icon: 'el-icon-goods',
      children: [
        {
          id: '50-1',
          name: '药房审核',
          url: '/shopCheck/shop',
          icon: 'el-icon-share'
        },
        {
          id: '50-2',
          name: '厂商审核',
          url: '/shopCheck/origin',
          icon: 'el-icon-share'
        },
        {
          id: '50-3',
          name: '医院管理',
          url: '/shopCheck/hospital',
          icon: 'el-icon-share'
        }
      ]
    },
    {
      id: '60',
      name: '药品管理',
      icon: 'el-icon-goods',
      children: [
        {
          id: '60-88',
          name: '厂商管理',
          url: '/drugManage/origin',
          icon: 'el-icon-share'
        },
        {
          id: '60-1',
          name: '预警列表',
          url: '/drugManage/earlyWarning',
          icon: 'el-icon-share'
        },
        {
          id: '60-2',
          name: '售磬列表',
          url: '/drugManage/sellOut',
          icon: 'el-icon-share'
        },
        {
          id: '60-3',
          name: '药品列表',
          url: '/drugManage/drug',
          icon: 'el-icon-share'
        },
        {
          id: '60-4',
          name: '热销排行榜',
          url: '/drugManage/saleHot',
          icon: 'el-icon-share'
        },
        {
          id: '60-5',
          name: '添加药品',
          url: '/drugManage/drugAdd',
          icon: 'el-icon-share'
        },
        {
          id: '60-7',
          name: '通用名管理',
          url: '/drugManage/commonName',
          icon: 'el-icon-share'
        },
        {
          id: '60-8',
          name: '剂型管理',
          url: '/drugManage/form',
          icon: 'el-icon-share'
        },
        {
          id: '60-9',
          name: '规格管理',
          url: '/drugManage/spec',
          icon: 'el-icon-share'
        },
        {
          id: '60-10',
          name: '类型管理',
          url: '/drugManage/type',
          icon: 'el-icon-share'
        },
        {
          id: '60-11',
          name: '药品库管理',
          url: '/drugManage/stock',
          icon: 'el-icon-share'
        }
      ]
    },
    {
      id: '70',
      name: '交易管理',
      icon: 'el-icon-goods',
      children: [
        {
          id: '70-1',
          name: '订单管理',
          url: '/transaction/order',
          icon: 'el-icon-share'
        },
        {
          id: '70-2',
          name: '退单管理',
          url: '/transaction/chargeBack',
          icon: 'el-icon-share'
        },
        {
          id: '70-3',
          name: '评价管理',
          url: '/transaction/appraise',
          icon: 'el-icon-share'
        }
      ]
    },
    {
      id: '80',
      name: '处方管理',
      icon: 'el-icon-goods',
      children: [
        {
          id: '80-1',
          name: '处方管理',
          url: '/rx/rx',
          icon: 'el-icon-share'
        }
      ]
    },
    {
      id: '90',
      name: '业务管理',
      icon: 'el-icon-goods',
      children: [
        {
          id: '90-1',
          name: '好货推荐',
          url: '/business/recommend',
          icon: 'el-icon-share'
        },
        {
          id: '90-2',
          name: '惠民促销',
          url: '/business/discount',
          icon: 'el-icon-share'
        }
      ]
    },
    {
      id: '100',
      name: '系统设置',
      icon: 'el-icon-goods',
      children: [
        {
          id: '100-55',
          name: '我的消息',
          url: '/system/message',
          icon: 'el-icon-share'
        },
        {
          id: '100-56',
          name: '用户管理',
          url: '/system/userManage',
          icon: 'el-icon-share'
        },
        {
          id: '100-57',
          name: '我的账户',
          url: '/system/myAccount',
          icon: 'el-icon-share'
        },
        {
          id: '100-1',
          name: '药师管理',
          url: '/system/pharmacist',
          icon: 'el-icon-share'
        },
        {
          id: '100-2',
          name: '会员管理',
          url: '/system/account',
          icon: 'el-icon-share'
        },
        {
          id: '100-3',
          name: '药店管理',
          url: '/system/shop',
          icon: 'el-icon-share'
        },
        {
          id: '100-4',
          name: '监管用户',
          url: '/system/admin',
          icon: 'el-icon-share'
        },
        {
          id: '100-5',
          name: '角色管理',
          url: '/system/role',
          icon: 'el-icon-share'
        },
        {
          id: '100-6',
          name: '附件管理',
          url: '/system/file',
          icon: 'el-icon-share'
        },
        {
          id: '100-7',
          name: '接口调用数',
          url: '/system/interface',
          icon: 'el-icon-share'
        },
        {
          id: '100-8',
          name: '登陆日志',
          url: '/system/loginLog',
          icon: 'el-icon-share'
        },
        {
          id: '100-9',
          name: '系统参数',
          url: '/system/system',
          icon: 'el-icon-share'
        },
        {
          id: '100-10',
          name: '对账单',
          url: '/system/statement',
          icon: 'el-icon-share'
        }
      ]
    }
  ])
}

router.get('/ui/menu', async (ctx, next) => {
  ctx.assert(ctx.session.jwt, 401, 'Requires authentication')

  ctx.status = 200
  ctx.body = menu
})

module.exports = router.routes()
