import React from 'react';
import App from 'MyComponent/App';
import EventEmitter from 'MyUtils/EventEmitter';

export default class Detail extends React.Component {
	componentDidMount() {
		EventEmitter.emit('message', { msg: 'this is form detail' });
		console.log(EventEmitter);
	}

	render() {
		return (
			<App>
				<div>this is detail</div>
			</App>
		);
	}
}
