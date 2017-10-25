import * as React from 'react';
import * as ClassName from 'classnames';
// import { menues } from '../../router/index';
import { Menu, MenuNode } from './Menu';
import * as MenuAction from '../../redux/actions/menu/MenuAction';
import * as ConfigAction from '../../redux/actions/config/ConfigAction';
import { loadMenu } from '../../redux/thunk/menu';

import { Root as AppState } from '../../redux/state';
import { AuthReqByAccount } from '../../redux/actions/auth/AuthAction';

import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux';

interface ViewProps {
    token: string;
    menu: Array<MenuAction.Menu>;
}
    
interface ViewHandle {
    loginByAccount: (req: AuthReqByAccount) => void;
    menuLoad: (token: string) => void;
    refresh: (toggle: boolean) => void;
}

const mapStateToPropsParam: MapStateToPropsParam<ViewProps, {}> = (appState: AppState) => {
    return {
        token: appState.auth.token,
        menu: appState.menu
    };
};

const mapDispatchToPropsParam: MapDispatchToPropsParam<ViewHandle, {}> = (dispatch) => {
    return {
        menuLoad: (token: string) => dispatch(loadMenu(token)),
        refresh: (toggle: boolean) => dispatch(ConfigAction.toggleRefresh(toggle)),
    };
};

class Sider extends React.Component<ViewProps & ViewHandle & ConfigAction.ConfigDispatch> {
    // props: Array<MenuData>;
    state = { toggle: false, activeMenuID: 0, curDeep: 0 };

    watchValue = (activeMenuID: number, deep: number) =>  {
        this.setState({activeMenuID: activeMenuID, curDeep: deep});
    }

    fold = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        // tslint:disable-next-line:no-console
        console.log('fold');
        this.setState({toggle: !this.state.toggle});
        this.props.refresh(!this.state.toggle);
    }

    renderSub = (menuItem: MenuAction.Menu & MenuNode): JSX.Element => {
        let {menuID, name, url} = menuItem;
        let children = menuItem.children;
        return (
            <Menu 
                key={menuID} 
                menuID={menuID} 
                name={name} 
                url={url} 
                children={children} 
            />
        );
    }
   render() {
        let log = `Sider=> token=${this.props.token} menu=${JSON.stringify(this.props.menu)}`;
        // tslint:disable-next-line:no-console
        console.log(log);
        if (this.props.token.length > 0 && this.props.menu.length === 0) {
            this.props.menuLoad(this.props.token);
        }

        const listItems = this.props.menu.map((menuItem: MenuAction.Menu & MenuNode) => {
            return this.renderSub(menuItem);
        }
        );
        // let {menuID, name, url, children} = menues[0];
        // let children = menues[0].children;
        return (
        <div>
            <div className={ClassName('sider', {'toggle': this.state.toggle})}>
                <ul className="menu">
                    {listItems}
                    {/* <Menu key={menuID} menuID={menuID} name={name} url={url} children={children}/> */}
                </ul>
            </div>
            <div className={ClassName('split', {'toggle': this.state.toggle})}>
                <a onClick={this.fold} href="#" >{this.state.toggle ? '>>' : '<<'}</a>
            </div>
        </div>            
        );
    }
}

export default connect<ViewProps, ViewHandle, {}>(mapStateToPropsParam, mapDispatchToPropsParam)(Sider);