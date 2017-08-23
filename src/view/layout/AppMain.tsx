import * as React from 'react';
import Goods from '../goods/Goods';

class AppMain extends React.Component {
    state = {  };
    render() {
        return (
        <div className="page-content">
            <Goods/>
            {/* <router-view :key="key"></router-view> */}
        </div>
        );
    }
}

export default AppMain;