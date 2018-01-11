// Third-party libs
import * as React from 'react';
import {Attributes} from "react";
import {RouteComponentProps} from "react-router";
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {inject} from "mobx-react";
import bind from "bind-decorator";
import {History} from "history";
import LocationDescriptor = History.LocationDescriptor;

// Internal libs
import {AccountService} from "account/Account";


// TODO Authorization

export interface PrivateRouteComponentProps extends RouteComponentProps<any>, Attributes {
}

interface RoleRouteProps extends RouteProps {
	component: React.ComponentType<PrivateRouteComponentProps>;
	account?: AccountService;
}

@inject((stores) => ({account: stores.store.account as AccountService}))
export class RoleRoute extends React.Component<RoleRouteProps, {}> {

	@bind
	renderRoute(props: PrivateRouteComponentProps) {
		const account = this.props.account;
		const RequestComp = this.props.component;

		if (account.isAuthenticated) {
			return <RequestComp {...props}/>;
		} else {
			const state: LocationDescriptor = {
				pathname: '/login',
				state: {from: props.location}
			};

			account.setErrorMessage("請先登入");

			return <Redirect to={state}/>;
		}
	}

	render() {
		return (
			<Route path={this.props.path} render={this.renderRoute}/>
		);
	}
}
