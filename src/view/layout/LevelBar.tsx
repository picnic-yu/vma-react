import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ClassName from 'classnames';
import { connect, MapDispatchToPropsParam } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as ConfigAction from '../../redux/actions/config/ConfigAction';

import { routes } from '../../router/index';
    
interface ViewHandle {
    refresh: (activeMenuURL: string) => void;
}

const mapDispatchToPropsParam: MapDispatchToPropsParam<ViewHandle, {}> = (dispatch) => {
    return {
        refresh: (activeMenuURL: string) => dispatch(ConfigAction.activeMenuRefresh(activeMenuURL)),
    };
};

class LevelBar extends React.Component<RouteComponentProps<{}> & ViewHandle> {
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
                        <span onClick={e => this.selectMenu(item.url)}>{item.name}</span>
                        ) : (
                        item.name
                        )
                    }
                </li>
            )}
        </ul>
        );
    }

    selectMenu = (url: string) => {
        this.props.history.push(url);
        this.props.refresh(url);
    }
}

export default withRouter(
    connect<{}, ViewHandle, RouteComponentProps<{}>>(undefined, mapDispatchToPropsParam)(LevelBar)
);