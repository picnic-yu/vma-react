import * as React from 'react';
import Panel from '../../components/Panel';
import { RouteMenu }  from '../../components/Menu';
import { ContextMenuNode, DropDownMenu } from '../../components/DropDownMenu';
import { push } from 'react-router-redux';

import { Button } from '../../components/Button';
// import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Root as AppState } from '../../redux/state';
import * as ConfigAction from '../../redux/actions/config/ConfigAction';

import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux';

interface ViewProps {
    
}

interface ViewHandle {
    refresh: (activeMenuURL: string) => void;
    route: (url: string) => void;
}

const mapStateToPropsParam: MapStateToPropsParam<ViewProps, {}> = (appState: AppState) => {
    return {};
};

const mapDispatchToPropsParam: MapDispatchToPropsParam<ViewHandle, {}> = (dispatch) => {
    return {
        refresh: (activeMenuURL: string) => dispatch(ConfigAction.activeMenuRefresh(activeMenuURL)),
        route: (url: string) => dispatch(push(url))
    };
};

class Goods extends React.Component<ViewProps & ViewHandle> {
    render() {
        const menus = {
            name: '菜单1',
            items: [
                { name: '菜单1.1(/)', disabled: true, url: '/'},
                { name: '菜单1.2(/company)',
                  disabled: false,
                  url: '/company',
                    items: [
                    {
                        name: '菜单1.2.1(/company/list)',
                        url: '/company/list',
                        items:
                        [
                            {name: '菜单1.2.1.1'},
                            {name: '菜单1.2.1.2'}
                        ]
                    },
                    {
                        name: '菜单1.2.2(/company/audit)',
                        url: '/company/audit',
                    }
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
                {name: '菜单1', url: '/company', disabled: true},
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
        this.props.route(contextMenu.url);
        this.props.refresh(contextMenu.url);
    }
}

export default connect<ViewProps, ViewHandle, {}>(mapStateToPropsParam, mapDispatchToPropsParam)(Goods);
// export default Goods;