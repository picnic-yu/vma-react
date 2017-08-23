import * as React from 'react';
import * as ClassName from 'classnames';
import UserHeader from '../../components/UserHeader';
import Tailer from '../../components/Tailer';
import LevelBar from './LevelBar';
import AppMain from './AppMain';
import Sider from './Sider';

class Layout extends React.Component {
    state = { toggle: false };
    render() {
        return (
        <div>
            <UserHeader/>
            <div className={ClassName('main-container', {'toggle': this.state.toggle})}>
                <Sider/>
                <div className="main-content">
                    <LevelBar/>
                    <AppMain/>
                </div>
            </div>
            <Tailer/>
        </div>
        );
    }
}

export default Layout;