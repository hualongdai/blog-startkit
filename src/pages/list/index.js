import React from 'react';
import { observer, inject } from 'mobx-react';
import App from 'MyComponent/App';

import store from './store';

@inject('route')
@observer
export default class List extends React.Component {
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
