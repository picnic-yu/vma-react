import Home from '../view/Home';
import * as View from '../view';

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

const routes = [
    {
        path: '/',
        component: Home,
        name: '首页'
    },
    {
        path: '/login',
        component: View.Login,
        name: '登录'
    },
    {
        path: '/profile',
        component: View.Profile,
        name: '简介'
    },
    {
        path: '/company',
        component: View.Company,
        name: '公司'
    },
    {
        path: '/company/list',
        component: View.Company,
        name: '公司查询'
    },
    {
        path: '/company/audit',
        component: View.Company,
        name: '公司审核'
    },
    {
        path: '/catalog',
        component: View.Catalog,
        name: '目录'
    },
    {
        path: '/goods',
        component: View.Goods,
        name: '商品'
    },
    {
        path: '/order',
        component: View.Order,
        name: '订单'
    },
    {
        path: '/storage',
        component: Storage,
        name: '仓储'
    }
];

export { routes, permits } ;
