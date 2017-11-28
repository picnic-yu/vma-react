import * as React from 'react';
import * as ClassName from 'classnames';
// import { menues } from '../../router/index';
import { Menu } from './Menu';
import * as MenuAction from '../../redux/actions/menu/MenuAction';
import * as AuthAction from '../../redux/actions/auth/AuthAction';
import * as ConfigAction from '../../redux/actions/config/ConfigAction';

import { Root as AppState } from '../../redux/state';
// import { AuthReqByAccount } from '../../redux/actions/auth/AuthAction';

import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux';

interface ViewProps {
    toggle?: boolean;
    token: string;
    activeMenuURL?: string;
    menu: Array<MenuAction.Menu>;
}
    
interface ViewHandle {
    // loginByAccount: (req: AuthReqByAccount) => void;
    menuLoad: (token: string) => void;
    permitLoad: (token: string) => void;
    refresh: (toggle: boolean) => void;
}

const mapStateToPropsParam: MapStateToPropsParam<ViewProps, {}, {}> = (appState: AppState) => {
    return {
        toggle: appState.config.toggle,
        activeMenuURL: appState.config.activeMenuURL,
        token: appState.auth.token,
        menu: appState.menu
    };
};

const mapDispatchToPropsParam: MapDispatchToPropsParam<ViewHandle, {}> = (dispatch) => {
    return {
        menuLoad: (token: string) => dispatch(MenuAction.remoteMenu(token)),
        // menuLoad: (token: string) => dispatch(MenuAction.loadMenu(token)),
        permitLoad: (token: string) => dispatch(AuthAction.loadPermit(token)),
        refresh: (toggle: boolean) => dispatch(ConfigAction.toggleRefresh(toggle)),
    };
};

class Sider extends React.Component<ViewProps & ViewHandle & ConfigAction.ConfigDispatch> {
    // props: Array<MenuData>;

    watchValue = (activeMenuURL: string) =>  {
        this.setState({activeMenuURL: activeMenuURL});
    }

    fold = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        this.props.refresh(!this.props.toggle);
    }

    renderSub = (menuItem: MenuAction.Menu): JSX.Element => {
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
        if (this.props.token.length > 0 && this.props.menu.length === 0) {
            this.props.menuLoad(this.props.token);
            this.props.permitLoad(this.props.token);
        }

        const listItems = this.props.menu.map((menuItem: MenuAction.Menu) => {
            return this.renderSub(menuItem);
        }
        );
        // let {menuID, name, url, children} = menues[0];
        // let children = menues[0].children;
        return (
        <div>
            <div className={ClassName('sider', {'toggle': this.props.toggle})}>
                <ul className="menu">
                    {listItems}
                    {/* <Menu key={menuID} menuID={menuID} name={name} url={url} children={children}/> */}
                </ul>
            </div>
            {/* <div className={ClassName('split', {'toggle': this.props.toggle})}>
                <a onClick={this.fold} href="#" >{this.props.toggle ? '>>' : '<<'}</a>
            </div> */}
        </div>            
        );
    }
}

export default connect<ViewProps, ViewHandle, {}>(mapStateToPropsParam, mapDispatchToPropsParam)(Sider);