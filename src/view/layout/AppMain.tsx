import * as React from 'react';
import { Route } from 'react-router-dom';
import Form from '../Form';
import Company from '../Company';
import Goods from '../Goods';
import Catalog from '../Catalog';
import Order from '../Order';
import Storage from '../Storage';

class AppMain extends React.Component {
    state = {  };
    render() {
        return (
        <div className="page-content">
            <Route path="/" exact={true} component={Form}/>
            <Route path="/company" component={Company}/>
            <Route path="/goods" component={Goods}/>
            <Route path="/catalog" component={Catalog}/>
            <Route path="/order" component={Order}/>
            <Route path="/storage" component={Storage}/>
        </div>
        );
    }
}

export default AppMain;