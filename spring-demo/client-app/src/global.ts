import {action, observable} from "mobx";
import * as H from "history";
import bind from "bind-decorator";

import {AccountService} from "./account";


export class ToolBar {
	@observable
	component: any;

	history: H.History;

	postConstruct() {
		this.history.listen(this.onLocationChange);
	}

	@action.bound
	setComponent(component: any) {
		this.component = component;
	}

	@bind
	private onLocationChange(location: H.Location, historyAction: H.Action) {
		// reset toolbar components
		this.setComponent(null);
	}
}

export class AppStore {
	account = new AccountService();
	history: H.History;
	toolbar: ToolBar;

	constructor() {
		this.history = H.createBrowserHistory({basename: ""});
		this.account.history = this.history;
		this.toolbar = new ToolBar();
		this.toolbar.history = this.history;

		this.toolbar.postConstruct();
	}
}
