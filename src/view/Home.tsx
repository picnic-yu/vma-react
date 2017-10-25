import * as React from 'react';
import View from './Template';

class Home extends React.Component {
    state = {  };
    render() {
        return (
            <div>
                <p>我是首页</p>
                <View/>
            </div>
        );
    }
}

export default Home;