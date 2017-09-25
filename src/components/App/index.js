import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './index.less';
import store from './store';

const { Header, Content } = Layout;

@inject('route')
@observer
class NavBar extends Component {

	constructor(props) {
		super(props);
		store.initSelectedKey(props.route.location);
	}

	handleClick = (e) => {
		store.changeSelectedKey(e.key);
	};

	render() {
		const { selectedKey } = store;
		return (
			<Layout className="layout">
				<Header>
					<div className="logo" />
					<Menu
						onClick={this.handleClick}
						defaultSelectedKeys={[selectedKey]}
						mode="horizontal"
						theme="dark"
						style={{ lineHeight: '64px' }}
					>
						<Menu.Item key="home">
							<Link to="/" >Home</Link>
						</Menu.Item>
						<Menu.Item key="list">
							<Link to="/list" >List</Link>
						</Menu.Item>
						<Menu.Item key="detail">
							<Link to="/detail" >Detail</Link>
						</Menu.Item>
					</Menu>
				</Header>
				<Content>
					{this.props.children}
				</Content>
			</Layout>
		);
	}
}

export default NavBar;
