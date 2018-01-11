import * as React from "react";
import {ChangeEvent, FocusEvent, FormEvent} from "react";
import {
	Container, Row, Col, CardGroup, Card, CardBody, Button, InputGroup, InputGroupAddon
} from "reactstrap";
import bind from "bind-decorator";
import {observer} from "mobx-react";
import * as cx from "classnames";

import {AccountService} from "../../account";
import {TextField, EmailInput, PasswordInput} from "form";

interface LoginProps {
	account: AccountService;
}


@observer
export class LoginForm extends React.Component<LoginProps, {}> {
	username = new TextField("user@btrie.com");
	password = new TextField("asdf");

	@bind
	onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		this.props.account.login({
			email: this.username.value,
			password: this.password.value,
		});
	}

	render() {
		return (
			<div className="container flex-row align-items-center animated fadeIn">
				<div className={cx("alert", "alert-danger", {"d-none": !this.props.account.errorMessage})} role="alert">
					<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.account.clearErrorMessage}>
						<span aria-hidden="true">&times;</span>
					</button>
					{this.props.account.errorMessage}
				</div>
				<Container>
					<Row className="justify-content-center">
						<Col md="6">
							<CardGroup className="mb-0">
								<Card className="p-4">
									<CardBody className="card-body">
										<form onSubmit={this.onSubmit}>
										<h1>Login</h1>
										<p className="text-muted">Sign In to your account</p>
										<InputGroup className={cx("mb-3", "flex-wrap", {"was-validated": this.username.dirty})}>
											<InputGroupAddon><i className="icon-user"/></InputGroupAddon>
											<EmailInput field={this.username} required={true} placeholder="user@example.com"/>
										</InputGroup>
										<InputGroup className={cx("mb-4", "flex-wrap", {"was-validated": this.password.dirty})}>
											<InputGroupAddon><i className="icon-lock"/></InputGroupAddon>
											<PasswordInput field={this.password} required={true}/>
										</InputGroup>
										<Row>
											<Col xs="6">
												<Button type="submit" color="primary" className="px-4">Login</Button>
											</Col>
											<Col xs="6" className="text-right d-none">
												<Button color="link" className="px-0">Forgot password?</Button>
											</Col>
										</Row>
										</form>
									</CardBody>
								</Card>
								<Card className="text-white bg-primary py-5 d-md-down-none d-none" style={{width: 44 + '%'}}>
									<CardBody className="card-body text-center">
										<div>
											<h2>Sign up</h2>
											<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
												tempor incididunt ut
												labore et dolore magna aliqua.</p>
											<Button color="primary" className="mt-3" active={true}>Register Now!</Button>
										</div>
									</CardBody>
								</Card>
							</CardGroup>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
