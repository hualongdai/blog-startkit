import React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import App from 'MyComponent/App';
import { router } from 'react-router-dom';

import eventBus from 'MyUtils/eventBus';
import store from './store';

@observer
export default class Home extends React.Component {

	handleClick = () => {
    // store.deleteArticle(1)
		eventBus.on('message', (msg) => {
      console.log('this is msg from component child:'+ msg.msg);
    });
		store.setShowVisible(!store.showStatus);
  };

  render() {
    const { showChildComponent } = store;
    return (
      <App>
        <div>this is home</div>
        <Button type="primary" onClick={this.handleClick}>delete</Button>
        { showChildComponent ?  <ChildHome /> : null }
      </App>
    );
  }
}


class ChildHome extends React.Component {
  componentDidMount() {
		eventBus.trigger('message', { msg: '333' })
  }

  render() {
    return (
      <div>this is childHome Component!</div>
    )
  }
}