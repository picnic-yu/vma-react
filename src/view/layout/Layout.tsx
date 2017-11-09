import * as React from 'react';
import * as ClassName from 'classnames';
// import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import UserHeader from '../../components/UserHeader';
import Tailer from '../../components/Tailer';
import LevelBar from './LevelBar';
import AppMain from './AppMain';
import Sider from './Sider';
import * as State from '../../redux/state';

export function mapStateToProps(state: State.Root) {
    return {
        toggle: state.config.toggle,
        activeMenuURL: state.config.activeMenuURL
    };
}

interface LayoutProps {
    toggle: boolean;
    activeMenuURL: string;
}

class Layout extends React.Component<LayoutProps> {
// class Layout extends React.Component {
        // state = { toggle: false };
    render() {
        return (
        <div>
            <UserHeader/>
            <div className="main-container">
                <Sider />
                <div className={ClassName('main-content', {'toggle': this.props.toggle})}>
                {/* <div className={ClassName('main-content')}> */}
                    {/* <LevelBar/> */}
                    <Route path="*" component={LevelBar}/>
                    <AppMain/>
                </div>
            </div>
            <Tailer/>
        </div>
        );
    }
}

export default connect(mapStateToProps)(Layout);