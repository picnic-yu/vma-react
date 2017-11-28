import * as React from 'react';
import * as ClassName from 'classnames';
import { Root as AppState } from '../redux/state';
import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux';
import * as ConfigAction from '../redux/actions/config/ConfigAction';

import DropMenu from '../view/layout/DropMenu';
// import { Button } from '../components/Button';

interface ViewProps {
    toggle?: boolean;
}

interface ViewHandle {
    refresh: (toggle: boolean) => void;
}

const mapStateToPropsParam: MapStateToPropsParam<ViewProps, {}, {}> = (appState: AppState) => {
    return {
        toggle: appState.config.toggle
    };
};

const mapDispatchToPropsParam: MapDispatchToPropsParam<ViewHandle, {}> = (dispatch) => {
    return {
        refresh: (toggle: boolean) => dispatch(ConfigAction.toggleRefresh(toggle)),
    };
};

class UserHeader extends React.Component<ViewProps & ViewHandle> {
    state = { showDropMenu: false };
    render() {
        let companyName = 'xxxx';        
        return (
            <nav className="header">
            <div className="header-container">
                <div className="pull-left">
                    <a className="brand" href="">{companyName}</a>
                    <button className="sider-toggle" onClick={this.toggleSider}>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                </div>
                <div className="pull-right">
                <button className="navbar-toggle" onClick={this.toggleDropMenu}>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                </button>
                </div>
                <DropMenu className={ClassName('pull-right', {'notifyBar-toggle': this.state.showDropMenu})}/>
            </div>
        </nav>
    );
    }

    toggleSider = () => {
        this.props.refresh(!this.props.toggle);
    }

    toggleDropMenu = () => {
        this.setState({showDropMenu: !this.state.showDropMenu});
    }
}

export default connect<ViewProps, ViewHandle, {}>(mapStateToPropsParam, mapDispatchToPropsParam)(UserHeader);