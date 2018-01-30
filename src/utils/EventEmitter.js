/* eslint-disable no-console */
const warn = (msg) => { console.warn(msg); };

class EventEmitter {
	constructor() {
		this.events = {};
	}

	on(event, callback, scope) {
		if (typeof event !== 'string') warn('event must be type of string');
		if (typeof callback !== 'function') warn('callback must be type of function');
		if (scope && typeof scope !== 'object') warn('scope must be type of object');

		this.events[event] = this.events[event] || [];
		if (!this.isExistedCallbackByEvent(event, callback, scope)) {
			this.events[event].push({ callback, scope });
		}
	}

	isExistedCallbackByEvent(event, callback, scope) {
		return this.events[event] && this.events[event]
		.filter(item => item.scope === scope && item.callback.toString() === callback.toString()).length > 0;
	}

	off(event, callback, scope) {
		if (this.events[event]) {
			if ((callback || scope) && this.isExistedCallbackByEvent(event, callback, scope)) {
				this.events[event] = this.events[event].filter(item =>
					(callback && item.callback.toString() !== callback.toString())
					|| (scope && item.scope !== scope),
				);
			} else {
				this.events[event].length = 0;
			}
		}
	}

	emit(...args) {
		if (arguments.length === 0) warn('trigger method need at least one parameter');
		const key = args[0];
		const restArgs = [].slice.call(args, 1);
		if (!this.events[key]) return;
		this.events[key].forEach(item => item.callback.apply(item.scope || null, restArgs));
	}
}

export default new EventEmitter();
