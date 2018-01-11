import * as React from "react";
import {Redirect, RouteComponentProps} from "react-router-dom";
import {inject, observer} from "mobx-react";

import {LoginForm} from "./LoginForm";
import {AccountService} from "../../account/Account";

interface LoginProps extends RouteComponentProps<{}> {
	account: AccountService;
}

@inject((stores) => ({account: stores.store.account as AccountService}))
@observer
export class Login extends React.Component<LoginProps, {}> {

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } };

		if (this.props.account.isAuthenticated) {
			return <Redirect to={from}/>;
		} else {
			return <LoginForm account={this.props.account} />;
		}
	}
}
