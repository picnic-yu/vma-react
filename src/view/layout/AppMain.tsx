import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home';
// import * as View from '../';
import NoMatch from '../NoMatch';
// import asyncComponent from '../../components/AsyncComponent';
import Loadable, { LoadingComponentProps } from 'react-loadable';

const MyLoadingComponent = ({isLoading, error}: LoadingComponentProps) => {
    // Handle the loading state
    if (isLoading) {
      return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
      return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
      return null;
    }
  };

const AsyncGoods = Loadable({
    loader: () => import("../goods/Goods"),
    loading: MyLoadingComponent,
    delay: 10000
  });
  const AsyncCompany = Loadable({
    loader: () => import("../agency/Company"),
    loading: MyLoadingComponent
  });
  const AsyncCatalog = Loadable({
    loader: () => import("../catalog/Catalog"),
    loading: MyLoadingComponent
  });
  const AsyncOrder = Loadable({
    loader: () => import("../order/Order"),
    loading: MyLoadingComponent
  });
  const AsyncStorage = Loadable({
    loader: () => import("../storage/Storage"),
    loading: MyLoadingComponent
  });
// const AsyncGoods = asyncComponent(() => import("../goods/Goods"));
// const AsyncGoods = asyncComponent("../goods/Goods");

class AppMain extends React.Component {
    state = {  };
    render() {
        return (
        <div className="page-content">
            <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/company" component={AsyncCompany}/>
            <Route path="/goods" component={AsyncGoods}/>
            <Route path="/catalog" component={AsyncCatalog}/>
            <Route path="/order" component={AsyncOrder}/>
            <Route path="/storage" component={AsyncStorage}/>
            <Route component={NoMatch}/>
            </Switch>
        </div>
        );
    }
}

export default AppMain;