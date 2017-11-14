import React from 'react';
import { observer, inject } from 'mobx-react';
import App from 'MyComponent/App';

import eventBus from 'MyUtils/eventBus';
import store from './store';

@inject('route')
@observer
export default class List extends React.Component {

	componentDidMount() {
		eventBus.trigger('message', { msg: '333' })
	}

	render() {
		const { route } = this.props;
		const { listData } = store;
		return (
			<App>
				<div>this is list</div>
			</App>
		);
	}
}
