import * as React from 'react';
import Panel from '../../components/Panel';
import { SiderMenu }  from '../../components/Menu';

class Goods extends React.Component {
    state = {  };
    render() {
        const menus = {
            name: '菜单1',
            items: [
                { name: '菜单1.1'},
                { name: '菜单1.2',
                    items: [
                    {name: '菜单1.2.1',
                    items: [
                        {name: '菜单1.2.1.1'},
                        {name: '菜单1.2.1.2'}
                    ]
                    },
                    {name: '菜单1.2.2'}
                ]
                },
                { name: '菜单1.3',
                    items: [
                    {name: '菜单1.3.1'},
                    {name: '菜单1.3.2'}
                ]
                }
            ]
        };
        return (
            <div>
                <p>goods infor</p>
                <Panel/>
                <div className="col-8" style={{border: '1px solid #e9e9e9'}}>
                    <SiderMenu {...menus}/>
                </div>
            </div>
        );
    }
}

export default Goods;