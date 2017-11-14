import React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import App from 'MyComponent/App';
import { router } from 'react-router-dom';

import store from './store';

@observer
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    if (window.WebSocket) {
      this.ws = new WebSocket('ws://localhost:3000');
		}
  }

  componentDidMount() {
		this.ws.onopen = (e) => {
			console.log("连接服务器成功");
		};
		this.ws.onclose = (e) => {
			console.log("服务器关闭");
		};
		this.ws.onerror = (e) => {
			console.log("连接出错", e);
		};
		this.ws.onmessage = (e) => {
			console.log(e.data);
		};
	}

	handleClick = () => {
    // store.deleteArticle(1);
		this.ws.send('this is msg from client')
  };

  render() {
    const { showChildComponent } = store;
    return (
      <App>
        <div>this is home</div>
        <Button type="primary" onClick={this.handleClick}>delete</Button>
      </App>
    );
  }
}
