import * as React from 'react';
import * as ClassName from 'classnames';
import { connect, Dispatch } from 'react-redux';
// import { menues } from '../../router/index';
import { Menu, MenuNode } from './Menu';
import * as Action from '../../redux/actions/menu/MenuAction';
import * as State from '../../redux/state';

export function mapStateToProps(state: State.Root) {
    return {
        token: state.auth.token,
        menu: state.menu
    };
}

interface SiderProps {
    token: string;
    menu: Array<Action.Menu>;
}

export function mapDispatchToProps(dispatch: Dispatch<Action.Menu>): Action.MenuDispatch {
    return {
        menuLoad: (token: string) => dispatch(Action.menuLoad(token)),
    };
}

class Sider extends React.Component<SiderProps & Action.MenuDispatch> {
    // props: Array<MenuData>;
    state = { toggle: false, activeMenuID: 0, curDeep: 0 };

    watchValue = (activeMenuID: number, deep: number) =>  {
        this.setState({activeMenuID: activeMenuID, curDeep: deep});
    }

    fold = () => {
        // tslint:disable-next-line:no-console
        console.log('fold');
        this.setState({toggle: !this.state.toggle});
    }

    renderSub = (menuItem: Action.Menu & MenuNode): JSX.Element => {
        let {menuID, name, url} = menuItem;
        let children = menuItem.children;
        return (
            <Menu 
                key={menuID} 
                menuID={menuID} 
                name={name} 
                url={url} 
                children={children} 
                watchValue={this.watchValue}
                activeMenuID={this.state.activeMenuID}
                curDeep={this.state.curDeep}
            />
        );
    }
   render() {
        if (this.props.token.length > 0 && this.props.menu.length === 0) {
            this.props.menuLoad(this.props.token);
        }

        const listItems = this.props.menu.map((menuItem: Action.Menu & MenuNode) => {
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
