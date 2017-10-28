import * as React from 'react';
import Panel from '../../components/Panel';
import { RouteMenu }  from '../../components/Menu';
import { ContextMenuNode, DropDownMenu } from '../../components/DropDownMenu';
import { Button } from '../../components/Button';
// import { RouteComponentProps, withRouter } from 'react-router-dom';

class Goods extends React.Component {
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

        const contextMenu = {
            name: '上下文菜单',
            items: [
                {name: '菜单1', url: '/company'},
                {name: '菜单2', url: '/catalog'},
                {name: '菜单3', url: '/order'}
            ]
        };
        return (
            <div>
                <p>goods infor</p>
                <Panel/>
                <div className="col-8" style={{border: '1px solid #e9e9e9'}}>
                    <RouteMenu {...menus}/>
                </div>
                <DropDownMenu {...contextMenu} onClick={this.contextMenu}>
                    <Button>上下文</Button>
                </DropDownMenu>
            </div>
        );
    }

    contextMenu = (contextMenu: ContextMenuNode) => {
        console.log(JSON.stringify(contextMenu));
    }
}

export default Goods;