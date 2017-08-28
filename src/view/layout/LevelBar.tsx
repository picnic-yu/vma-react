import * as React from 'react';
// import * as PropTypes from 'prop-types';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { NavLink } from 'react-router-dom';

class LevelBar extends React.Component<RouteComponentProps<{}>> {
    // static propTypes = {
    //     match: PropTypes.object.isRequired,
    //     location: PropTypes.object.isRequired,
    //     history: PropTypes.object.isRequired
    // };
    
    // state = {  };
    render() {
        return (
        <ul className="breadcrumb">
            {this.props.match.url}
            <li><NavLink to="/">主页</NavLink></li>
            <li><NavLink to="/company">XX菜单</NavLink></li>
            <li className="active">XX功能</li>
        </ul>
                );
    }
}

export default withRouter(LevelBar);
// export default LevelBar;