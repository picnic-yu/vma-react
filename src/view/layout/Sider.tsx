import * as React from 'react';
import * as ClassName from 'classnames';
import { connect, Dispatch } from 'react-redux';
// import { menues } from '../../router/index';
import { Menu, MenuNode } from './Menu';
import * as MenuAction from '../../redux/actions/menu/MenuAction';
import * as ConfigAction from '../../redux/actions/config/ConfigAction';
import * as State from '../../redux/state';

export function mapStateToProps(state: State.Root) {
    return {
        token: state.auth.token,
        menu: state.menu
    };
}

interface SiderProps {
    token: string;
    menu: Array<MenuAction.Menu>;
}

// tslint:disable-next-line:max-line-length
export function mapDispatchToProps(dispatch: Dispatch<MenuAction.Menu>): MenuAction.MenuDispatch & ConfigAction.ConfigDispatch {
    return {
        menuLoad: (token: string) => dispatch(MenuAction.menuLoad(token)),
        refresh: (toggle: boolean) => dispatch(ConfigAction.toggleRefresh(toggle)),
    };
}

class Sider extends React.Component<SiderProps & MenuAction.MenuDispatch & ConfigAction.ConfigDispatch> {
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

// export default Sider;
export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(Sider);
