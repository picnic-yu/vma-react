import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home';
import * as View from '../';
import NoMatch from '../NoMatch';

class AppMain extends React.Component {
    state = {  };
    render() {
        return (
        <div className="page-content">
            <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/company" component={View.Company}/>
            <Route path="/goods" component={View.Goods}/>
            <Route path="/catalog" component={View.Catalog}/>
            <Route path="/order" component={View.Order}/>
            <Route path="/storage" component={View.Storage}/>
            <Route component={NoMatch}/>
            </Switch>
        </div>
        );
    }
}

export default AppMain;