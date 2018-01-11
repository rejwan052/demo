import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {useStrict} from "mobx";
import {Provider} from "mobx-react";
import {Router, Route, Switch} from 'react-router-dom';
import {RoleRoute} from "./components/RoleRoute";

import registerServiceWorker from './registerServiceWorker';

// Containers
import {Full} from './containers/Full/';
import {Login} from "./views/Login/Login";
// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import "./variables.css";
import './style.css';
import 'react-select/dist/react-select.css';
// states
import {AppStore} from "./global";


useStrict(true);
const appStore = new AppStore();

ReactDOM.render(
	<Provider store={appStore}>
		<Router history={appStore.history}>
			<Switch>
				<Route path="/login" component={Login}/>
				<RoleRoute path="/" component={Full}/>
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();

appStore.account.autoLogin();

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION__: any;
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
		appStore: any;
	}

	// add React.Attributes to RouteProps
	interface RouteProps {
		key: React.Key;
	}
}

window.appStore = appStore;
