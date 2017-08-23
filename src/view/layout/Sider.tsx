import * as React from 'react';
import * as ClassName from 'classnames';
import { menues } from '../../router/index';
import { Menu, MenuNode } from './Menu';

class Sider extends React.Component {
    state = { toggle: false };

    fold = () => {
        // tslint:disable-next-line:no-console
        console.log('fold');
        this.setState({toggle: !this.state.toggle});
    }

    renderSub(menuItem: MenuNode): JSX.Element {
        let {menuID, name, url} = menuItem;
        let children = menuItem.children;
        return <Menu key={menuID} menuID={menuID} name={name} url={url} children={children}/>;
    }
   render() {
        const listItems = menues.map((menuItem: MenuNode) =>
        this.renderSub(menuItem)
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