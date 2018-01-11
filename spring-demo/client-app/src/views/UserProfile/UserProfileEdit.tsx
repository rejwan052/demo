import * as React from "react";
import {FormEvent} from "react";
import {
	Row, Col, Button, Card, CardHeader, CardFooter, CardBody, FormGroup, Label, Input,
} from "reactstrap";
import {RouteComponentProps} from "react-router";
import {observable, observe} from "mobx";
import {inject} from "mobx-react";
import {TextField, TextInput} from "form";
import {AccountService, UserDetails} from "../../account";
import bind from "bind-decorator";
import {History} from "history";
import * as cx from "classnames";

interface UserProfileEditProps extends RouteComponentProps<{}> {
	account: AccountService;
}

@inject((stores) => ({account: stores.store.account as AccountService}))
export class UserProfileEdit extends React.Component<UserProfileEditProps, {}> {
	email = "";

	@observable
	firstName = new TextField("");

	@observable
	lastName = new TextField("");

	constructor(props: UserProfileEditProps, context: any) {
		super(props, context);

		const account = props.account;
		if (account.userDetails) {
			this.copyFromUserDetails(account.userDetails);
		}
		// observe(account, "userDetails", change => {
		// 	this.copyFromUserDetails(account.userDetails);
		// });
	}

	@bind
	onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const history: History = this.props.history;

		this.props.account.updateUser({
			email: this.email,
			firstName: this.firstName.value,
			lastName: this.lastName.value,
		});

		history.replace("/user");
	}

	@bind
	onCancel(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const history: History = this.props.history;
		history.replace("/user");
	}

	renderForm() {
		return (
			<Card className="border-primary">
				<form className="form-horizontal" onSubmit={this.onSubmit} onReset={this.onCancel}>
					<CardHeader>
						<nav className="nav">
							<strong>Profile</strong>
						</nav>
					</CardHeader>
					<CardBody className="card-body">
						<FormGroup row={true}>
							<Col md="3" className="text-md-right">
								<Label htmlFor="user-email">Email</Label>
							</Col>
							<Col xs="12" md="9">
								<Input id="user-email" name="user-email" value={this.email} readOnly={true}/>
							</Col>
						</FormGroup>
						<FormGroup row={true} className={cx({"was-validated": this.firstName.dirty})}>
							<Col md="3" className="text-md-right">
								<Label htmlFor="user-firstname">First Name</Label>
							</Col>
							<Col xs="12" md="9">
								<TextInput field={this.firstName}/>
							</Col>
						</FormGroup>
						<FormGroup row={true} className={cx({"was-validated": this.lastName.dirty})}>
							<Col md="3" className="text-md-right">
								<Label htmlFor="user-lastname">Last Name</Label>
							</Col>
							<Col xs="12" md="9">
								<TextInput field={this.lastName} required={true}/>
							</Col>
						</FormGroup>
					</CardBody>
					<CardFooter className="d-flex">
						<Button className="mr-auto-xs" type="submit" size="sm" color="primary">Submit</Button>
						<Button type="reset" size="sm" color="secondary">Cancel</Button>
					</CardFooter>
				</form>
			</Card>
		);
	}

	render() {
		return (
			<Row>
				<Col className="col-lg-8 ml-auto mr-auto">
					{this.renderForm()}
				</Col>
			</Row>
		);
	}

	private copyFromUserDetails(userDetails: UserDetails) {
		this.email = userDetails.email;
		this.firstName.value = userDetails.firstName;
		this.lastName.value = userDetails.lastName;
	}
}
