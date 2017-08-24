import * as React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
class Company extends React.Component {
    state = {  };
    render() {
        return (
            <div>
                <p>company infor</p>
                <Switch>
                <Route path="/company/list" component={List}/>
                <Route path="/company/audit" component={Audit}/>
                </Switch>
            </div>
        );
    }
}

const List = () => (
    <div>
        <p>company list</p>
    </div>
);

const Audit = () => (
    <div>
        <p>company audit</p>
    </div>
);

export default Company;