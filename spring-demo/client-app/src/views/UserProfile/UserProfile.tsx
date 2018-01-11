import * as React from "react";
import {
	Row, Col, Card, CardHeader, CardBody, Form, Label, Input, NavItem, Nav
} from "reactstrap";
import {inject, observer} from "mobx-react";
import {RouteComponentProps, Link} from "react-router-dom";

// Internal libs
import {AccountService} from "account/Account";

interface UserProfileProps extends RouteComponentProps<{}> {
	account: AccountService;
}

@inject((stores) => ({account: stores.store.account as AccountService}))
@observer
export class UserProfile extends React.Component<UserProfileProps, {}> {

	renderForm() {
		const userDetails = this.props.account.userDetails;
		return (
			<Card>
				<CardHeader>
					<Nav>
						<NavItem><strong>Profile</strong></NavItem>
						<NavItem className="ml-auto"><Link to="/user/edit">Edit</Link></NavItem>
					</Nav>
				</CardHeader>
				<CardBody>
					<Form className="form-horizontal">
						<div className="form-group row">
							<Col md="3" className="text-md-right">
								<Label htmlFor="user-email">Email</Label>
							</Col>
							<Col xs="12" md="9">
								<Input id="user-email" name="user-email" value={userDetails.email} readOnly={true}/>
							</Col>
						</div>
						<div className="form-group row">
							<Col md="3" className="text-md-right">
								<Label htmlFor="user-firstname">First Name</Label>
							</Col>
							<Col xs="12" md="9">
								<Input id="user-firstname" name="user-firstname" value={userDetails.firstName} readOnly={true}/>
							</Col>
						</div>
						<div className="form-group row">
							<Col md="3" className="text-md-right">
								<Label htmlFor="user-lastname">Last Name</Label>
							</Col>
							<Col xs="12" md="9" className="text-md-right">
								<Input id="user-lastname" name="user-lastname" value={userDetails.lastName} readOnly={true}/>
							</Col>
						</div>
					</Form>
				</CardBody>
			</Card>
		);
	}

	render() {
		if (!this.props.account.userDetails) {
			return null;
		}

		return (
			<Row>
				<Col className="col-lg-8 ml-auto mr-auto">
					{this.renderForm()}
				</Col>
			</Row>
		);
	}
}
