// External
import * as React from 'react';
import {inject} from "mobx-react";

// Internal
import {AccountService} from "account/Account";

// Style
import "./dashboard.css";


interface DashboardProps {
	account?: AccountService;
}

@inject((stores) => ({account: stores.store.account as AccountService}))
export class Dashboard extends React.Component<DashboardProps, {}> {

	render() {
		return (
			<div className="animated fadeIn"/>
		);
	}
}
