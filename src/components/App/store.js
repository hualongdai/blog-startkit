import { observable, action } from 'mobx';

class AppStore {
	@observable selectedKey = '';

	@action changeSelectedKey(key) {
		this.selectedKey = key;
	}

	@action initSelectedKey(route) {
		if (route.pathname === '/') {
			this.selectedKey = 'home'
		} else {
			this.selectedKey = route.pathname.substr(1);
		}
	}

}

const store = new AppStore();
export default store;
