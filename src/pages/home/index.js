import React from "react";
import { Button } from "antd";
import { observer } from "mobx-react";
import App from "MyComponent/App";
import { router } from "react-router-dom";

import EventEmitter from "MyUtils/EventEmitter";
import store from "./store";

@observer
export default class Home extends React.Component {

  test = msg => {
    console.log("message" + msg.msg);
  }

  test2 = msg => {
    console.log(msg.msg);
  }

  handleClick = () => {
    // store.deleteArticle(1)
    EventEmitter.on("message", this.test);
    // store.setShowVisible(!store.showStatus);
  };

  handleClick2 = () => {
    // store.deleteArticle(1)
    EventEmitter.on("message", this.test2);
    // store.setShowVisible(!store.showStatus);
  };

  handleClick3 = () => {
    EventEmitter.off('message', this.test2);
  }

  render() {
    const { showChildComponent } = store;
    return (
      <App>
        <div>this is home</div>
        <Button type="primary" onClick={this.handleClick}>
          delete
        </Button>
        <Button type="primary" onClick={this.handleClick2}>
          add
        </Button>
        <Button type="primary" onClick={this.handleClick3}>
          remove
        </Button>
        {showChildComponent ? <ChildHome /> : null}
      </App>
    );
  }
}

class ChildHome extends React.Component {
  componentDidMount() {
    EventEmitter.trigger("message", { msg: "333" });
  }

  render() {
    return <div>this is childHome Component!</div>;
  }
}
