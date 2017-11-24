import * as React from 'react';
import * as ClassName from 'classnames';
import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux';

import { Link } from 'react-router-dom';
import * as MenuAction from '../../redux/actions/menu/MenuAction';
import * as ConfigAction from '../../redux/actions/config/ConfigAction';
import * as State from '../../redux/state';

interface ViewProps {
    activeMenuURL?: string;
}
const mapStateToPropsParam: MapStateToPropsParam<ViewProps, {}> = (state: State.Root) => {
    return {
        activeMenuURL: state.config.activeMenuURL
    };
};
    
interface ViewHandle {
    refresh: (activeMenuURL: string) => void;
}

const mapDispatchToPropsParam: MapDispatchToPropsParam<ViewHandle, {}> = (dispatch) => {
    return {
        refresh: (activeMenuURL: string) => dispatch(ConfigAction.activeMenuRefresh(activeMenuURL)),
    };
};

interface MenuState {
    open: boolean;
    active: boolean;
}

class Menu extends React.Component<MenuAction.Menu & ViewProps & ViewHandle, MenuState> {
    props: MenuAction.Menu & ViewHandle;
    // tslint:disable-next-line:max-line-length
    // Warning: Menu(...): When calling super() in `Menu`, make sure to pass up the same props that your component's constructor was passed.
    // props: MenuNode = {menuID: 0, name: '', url: '', children: []};
    state = { open: false, active: false};

    componentWillReceiveProps(nextProps: ViewProps) {
        if (nextProps.activeMenuURL !== this.props.url && 
            ((nextProps.activeMenuURL || '').match(/\//g) || []).length >= (this.props.url.match(/\//g) || []).length) {
            this.setState({active: false, open: false});
        } 
        if ((nextProps.activeMenuURL || '').indexOf(this.props.url) !== -1) {
            this.setState({active: true, open: true});
            // this.state.open = true;
            // this.state.active =  true;
        }
    }
    constructor(props: MenuAction.Menu & ViewProps & ViewHandle) {
        super(props);
        // 解决页面强制刷新时，左侧匹配菜单项目未激活的issue
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
        this.props.refresh(this.props.url);
    }

    renderSub = (menuItem: MenuAction.Menu): JSX.Element => {
        let {menuID, name, url} = menuItem;
        let children = menuItem.children;
        return (
        <MenuItem 
                key={menuID} 
                menuID={menuID} 
                name={name} 
                url={url} 
                children={children} 
        />);
    }

    isFolder = () => {
        return this.props.children && this.props.children.length > 0;
    }

    render() {
        const listItems = this.props.children.map((menuItem: MenuAction.Menu) =>
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

const MenuItem = connect<ViewProps, ViewHandle, MenuAction.Menu>(mapStateToPropsParam, mapDispatchToPropsParam)(Menu);
export { MenuItem as Menu };