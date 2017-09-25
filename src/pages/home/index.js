import React from 'react';
import { Button } from 'antd';
import App from 'MyComponent/App';

import store from './store';

export default class Home extends React.Component {

	handleClick = () => {
    store.deleteArticle(1)
  };

  render() {
    return (
      <App>
        <div>this is home</div>
        <Button type="primary" onClick={this.handleClick}>delete</Button>
      </App>
    );
  }
}
