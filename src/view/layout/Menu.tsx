import * as React from 'react';
import * as ClassName from 'classnames';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as MenuAction from '../../redux/actions/menu/MenuAction';
import * as ConfigAction from '../../redux/actions/config/ConfigAction';
import * as State from '../../redux/state';

export function mapStateToProps(state: State.Root) {
    return {
        activeMenuID: state.config.activeMenuID,
        curDeep: state.config.curDeep
    };
}

// tslint:disable-next-line:max-line-length
export function mapDispatchToProps(dispatch: Dispatch<ConfigAction.Config>): ConfigAction.ConfigDispatch {
    return {
        // tslint:disable-next-line:max-line-length
        refresh: (curMenu: {activeMenuID: number, curDeep: number}) => dispatch(ConfigAction.activeMenuIDRefresh(curMenu.activeMenuID, curMenu.curDeep)),
    };
}

interface MenuNode {
    // menuID: number;
    // name: string;
    // url: string;
    // // children: Array<MenuNode>;
    // children: MenuNode[];
    deep?: number;
    // watchValue?: (menuID: number, deep: number) => void;
    // activeMenuID?: number;
    // curDeep?: number;
}

class Menu extends React.Component<MenuAction.Menu & MenuNode & ConfigAction.Config & ConfigAction.ConfigDispatch> {
    props: MenuAction.Menu & MenuNode & ConfigAction.ConfigDispatch;
    // tslint:disable-next-line:max-line-length
    // Warning: Menu(...): When calling super() in `Menu`, make sure to pass up the same props that your component's constructor was passed.
    // props: MenuNode = {menuID: 0, name: '', url: '', children: []};
    state = { open: false, active: false};

    componentWillReceiveProps(nextProps: MenuNode & ConfigAction.Config) {
        if (nextProps.activeMenuID !== this.props.menuID && (nextProps.curDeep || 0) <= (this.props.deep || 0)) {
            this.setState({active: false, open: false});
        }
    }
    constructor(props: MenuAction.Menu & MenuNode & ConfigAction.ConfigDispatch) {
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
        // if (this.props.watchValue) {
        //     this.props.watchValue(this.props.menuID, this.props.deep || 0);
        // }
        this.props.refresh({activeMenuID: this.props.menuID, curDeep: this.props.deep});
    }

    renderSub = (menuItem: MenuAction.Menu & MenuNode): JSX.Element => {
        let {menuID, name, url} = menuItem;
        let children = menuItem.children;
        let deep: number = 0;
        if (this.props.deep) {
            deep = this.props.deep;
        }
        return (
        <MenuItem 
                key={menuID} 
                menuID={menuID} 
                name={name} 
                url={url} 
                children={children} 
                deep={deep + 1} 
        />);
    }

    isFolder = () => {
        return this.props.children && this.props.children.length > 0;
    }

    render() {
        const listItems = this.props.children.map((menuItem: MenuAction.Menu & MenuNode) =>
            this.renderSub(menuItem)
        );
        return (
        <li className={ClassName({'active': this.state.active})} >
            {this.isFolder() ? (
                <Link to={this.props.url} onClick={this.onClick}>{this.props.name}
                {/* <span onClick={this.onClick}>{this.props.name} */}
                <i 
                    className={ClassName('arrow', this.state.open ? 'icon-circle-down' : 'icon-circle-right')}
                />                    
                {/* </span> */}
                </Link>
            ) : (
                <Link to={this.props.url} onClick={this.onClick}>{this.props.name}</Link>
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

const MenuItem = connect<{}, {}, MenuAction.Menu & MenuNode>(mapStateToProps, mapDispatchToProps)(Menu);
export { MenuNode,  MenuItem as Menu };