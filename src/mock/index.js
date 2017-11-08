const Mock = require('fetch-mock')

Mock.mock('/login.ajax', login);
Mock.mock('/menu.json', menu);
Mock.mock('/permit.json', permit);

function login(config) {
    return {
        code: 0,
        codeMsg: 'ok',
        data: {
            name: 'lixf',
            token: 'aa-bb-cc'
        }
    }
}

function menu(config) {
    return {
        data: [
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
            }
        ],
        code: 0,
        codeMsg: 'ok'
    }
}

function permit(config) {
    return {
        data: [
            {
                url: "/company",
                oper: ["list", "view"]
            },
            {
                url: "/catalog",
                oper: []
            },
            {
                url: "/goods",
                oper: []
            },
            {
                url: "/order",
                oper: []
            },
            {
                url: "/storage",
                oper: ["update", "audit"]
            }
        ],
        code: 0,
        codeMsg: "ok"
    }        
}
