import Home from '../view/Home';
import Login from '../view/Login';
import Profile from '../view/Profile';
import Company from '../view/Company';
import Catalog from '../view/Catalog';
import Goods from '../view/Goods';
import Order from '../view/Order';
import Storage from '../view/Storage';

/*
    A、菜单是路由的子集，一种用菜单组件呈现的路由交互组件
    B、权限的范围覆盖路由、行为
    1、用户登录后能够看到的菜单，通过拦截用户登录请求，动态向后台获取菜单的数据（前台过滤|后台过滤）
    2、权限覆盖用户是否能看到某个菜单、看到某个按钮、触发某个后台操作，
       2.1、因权限的多样以及多变的特征，需要在前台对某个功能的component进行屏蔽
       2.2、对后台的操作请求，都需要进行权限检查
    3、前台需要配置所有的路由项

    I、对于前台的行为的权限收集，在component渲染前|后，再异步通过token远程获取权限并缓冲
 */

const permits = [
    {
        url: '/catalog',
        oper: 'update'
    }
];

const menues = [
    {
        menuID: 1,
        name: '公司信息',
        url: '/company',
        children: [
            {
                menuID: 10,
                name: '公司信息查询',
                url: '/company/list',
                children: []
            },
            {
                menuID: 11,
                name: '公司信息审核',
                url: '/company/audit',
                children: []
            }
            ]
    },
    {
        menuID: 2,
        name: '目录信息',
        url: '/catalog',
        children: []
    },
    {
        menuID: 3,
        name: '商品信息',
        url: '/goods',
        children: []
    },
    {
        menuID: 4,
        name: '订单信息',
        url: '/order',
        children: []
    },
    {
        menuID: 5,
        name: '仓储信息',
        url: '/storage',
        children: []
    },
];

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/company',
        component: Company
    },
    {
        path: '/catalog',
        component: Catalog
    },
    {
        path: '/goods',
        component: Goods
    },
    {
        path: '/order',
        component: Order
    },
    {
        path: '/storage',
        component: Storage
    }
];

export { routes, menues, permits } ;
