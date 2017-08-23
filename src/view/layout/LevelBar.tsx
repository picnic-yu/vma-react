import * as React from 'react';

class LevelBar extends React.Component {
    state = {  };
    render() {
        return (
        <ul className="breadcrumb">
            <li><a href="">主页</a></li>
            <li><a href="">XX菜单</a></li>
            <li className="active">XX功能</li>
        </ul>
                );
    }
}

export default LevelBar;