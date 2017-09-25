import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import * as mobx from 'mobx';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();
mobx.useStrict(true);
const routingStore = new RouterStore();
const stores = {
  route: routingStore,
};
const history = syncHistoryWithStore(browserHistory, routingStore);

const lazyLoader = (importComponent) => (
	class AsyncComponent extends Component {
		state = { C: null };
		async componentDidMount () {
			const { default: C } = await importComponent();
			this.setState({ C });
		}
		render () {
			const { C } = this.state;
			return C ? <C {...this.props} /> : null;
		}
	}
);

export default class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={lazyLoader(() => import('./pages/home'))} />
            <Route path="/list" component={lazyLoader(() => import('./pages/list'))} />
            <Route path="/detail" component={lazyLoader(() => import('./pages/detail'))} />
          </Switch>
        </Router>
      </Provider>
      );
  }
}

