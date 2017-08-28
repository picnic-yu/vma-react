import * as React from 'react';
import * as ClassName from 'classnames';
import { NavLink } from 'react-router-dom';

interface MenuNode {
    menuID: number;
    name: string;
    url: string;
    // children: Array<MenuNode>;
    children: MenuNode[];
    deep?: number;
    watchValue?: (menuID: number, deep: number) => void;
    activeMenuID?: number;
    curDeep?: number;
}

class Menu extends React.Component<MenuNode> {
    props: MenuNode;
    // tslint:disable-next-line:max-line-length
    // Warning: Menu(...): When calling super() in `Menu`, make sure to pass up the same props that your component's constructor was passed.
    // props: MenuNode = {menuID: 0, name: '', url: '', children: []};
    state = { open: false, active: false};

    componentWillReceiveProps(nextProps: MenuNode) {
        if (nextProps.activeMenuID !== this.props.menuID && (nextProps.curDeep || 0) <= (this.props.deep || 0)) {
            this.setState({active: false, open: false});
        }
    }
    constructor(props: MenuNode) {
        super(props);
        if (window.location.pathname.indexOf(this.props.url) !== -1) {
            this.state.open = true;
            this.state.active =  true;
        }
        // console.log(this.props.url + ' : ' +  window.location.pathname);
    }
    onClick = () => {
        if (this.isFolder()) {
            this.setState({open: !this.state.open});
        }
        this.setState({active: true});
        if (this.props.watchValue) {
            this.props.watchValue(this.props.menuID, this.props.deep || 0);
        }
    }

    renderSub = (menuItem: MenuNode): JSX.Element => {
        let {menuID, name, url} = menuItem;
        let children = menuItem.children;
        let deep: number = 0;
        if (this.props.deep) {
            deep = this.props.deep;
        }
        return (
        <Menu 
                key={menuID} 
                menuID={menuID} 
                name={name} 
                url={url} 
                children={children} 
                deep={deep + 1} 
                watchValue={this.props.watchValue}
        />);
    }

    isFolder = () => {
        return this.props.children && this.props.children.length > 0;
    }

    render() {
        const listItems = this.props.children.map((menuItem: MenuNode) =>
            this.renderSub(menuItem)
        );
        return (
        <li 
            className={ClassName({'active': this.state.active})} 
            
        >
            {this.isFolder() ? (
                <NavLink to={this.props.url} activeClassName="active" onClick={this.onClick}>{this.props.name}
                {/* <span onClick={this.onClick}>{this.props.name} */}
                <i 
                    className={ClassName('arrow', this.state.open ? 'icon-circle-down' : 'icon-circle-right')}
                />                    
                {/* </span> */}
                </NavLink>
            ) : (
                <NavLink to={this.props.url} activeClassName="active" onClick={this.onClick}>{this.props.name}</NavLink>
            )}
            { this.state.open && this.isFolder() && 
                <ul className="sub-menu">
                    {listItems}
                </ul>
            }
        </li>
        );
    }
}

export { MenuNode, Menu };