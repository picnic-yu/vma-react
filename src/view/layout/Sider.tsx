import * as React from 'react';
import * as ClassName from 'classnames';
import { menues } from '../../router/index';
import { Menu, MenuNode } from './Menu';

class Sider extends React.Component {
    state = { toggle: false, activeMenuID: 0, curDeep: 0 };

    watchValue = (activeMenuID: number, deep: number) =>  {
        this.setState({activeMenuID: activeMenuID, curDeep: deep});
    }

    fold = () => {
        // tslint:disable-next-line:no-console
        console.log('fold');
        this.setState({toggle: !this.state.toggle});
    }

    renderSub = (menuItem: MenuNode): JSX.Element => {
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
        const listItems = menues.map((menuItem: MenuNode) => {
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

export default Sider;