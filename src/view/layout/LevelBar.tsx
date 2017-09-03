import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ClassName from 'classnames';
import { NavLink } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { routes } from '../../router/index';

class LevelBar extends React.Component<RouteComponentProps<{}>> {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    
    render() {
        var urls = [{ url: '/', name: '首页' }];
        var path = this.props.match.url.split('/').filter(i => i);
        path.forEach((item, index) => {
            var url = `/${path.slice(0, index + 1).join('/')}`;
            urls.push({url, name: ''});
        });
        urls.forEach((item) => {
            var matchs = routes.filter(value => value.path === item.url);
            if (matchs && matchs.length > 0) {
                item.name = matchs[0].name;
            }
        });
        
        return (
        <ul className="breadcrumb">
            {urls.map((item, index) =>
                <li key={index} className={ClassName({'active': index === urls.length})}>
                    {item.url !== this.props.match.url ? (
                        <NavLink to={item.url}>{item.name}</NavLink>
                        ) : (
                        item.name
                        )
                    }
                </li>
            )}
        </ul>
        );
    }
}

export default withRouter(LevelBar);