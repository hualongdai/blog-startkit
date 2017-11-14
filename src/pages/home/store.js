import { observable, action, computed, toJS } from 'mobx';
import axios from 'axios';
import { message, notification } from 'antd';

class HomeStore {
	@observable showChildComponent = false;

	@action deleteArticle(id) {
		axios.post('/api/delete', { id })
			.then((res) => {
				if (res.data.state === 1) {
					message.success('删除成功', 3);
				} else {
					notification.error({ message: '系统提示', description: res.data.msg })
				}
			})
	}

	@action setShowVisible(value) {
		this.showChildComponent = value;
	}

	@computed get showStatus() {
		return toJS(this.showChildComponent)
	}

}

const store = new HomeStore();
export default store;
