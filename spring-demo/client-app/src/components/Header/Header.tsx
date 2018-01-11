// Third-party libs
import * as React from 'react';
import {
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Nav,
	NavItem,
	NavbarToggler,
	NavbarBrand,
	DropdownToggle
} from 'reactstrap';
import bind from "bind-decorator";
import {observer} from "mobx-react";

// Internal libs
import {AccountService} from "account/Account";
import {DropdownLink} from "../DropdownLink";


export interface HeaderProps {
	account: AccountService;
}

interface HeaderState {
	dropdownOpen: boolean;
}

@observer
class Header extends React.Component<HeaderProps, HeaderState> {
	state = {
		dropdownOpen: false
	};

	@bind
	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}

	sidebarToggle(e: React.MouseEvent<{}>) {
		e.preventDefault();
		document.body.classList.toggle('sidebar-hidden');
	}

	sidebarMinimize(e: React.MouseEvent<{}>) {
		e.preventDefault();
		document.body.classList.toggle('sidebar-minimized');
	}

	mobileSidebarToggle(e: React.MouseEvent<{}>) {
		e.preventDefault();
		document.body.classList.toggle('sidebar-mobile-show');
	}

	asideToggle(e: React.MouseEvent<{}>) {
		e.preventDefault();
		document.body.classList.toggle('aside-menu-hidden');
	}

	render() {
		const account = this.props.account;
		const username = account.userDetails ? account.userDetails.firstName + " " + account.userDetails.lastName : "";

		return (
			<header className="app-header navbar">
				<NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
				<NavbarBrand href="#"/>
				<NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
				<Nav className="ml-auto" navbar={true}>
					<NavItem>
						<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
							<DropdownToggle className="nav-link dropdown-toggle">
								<img src={'/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
								<span className="d-md-down-none">{username}</span>
							</DropdownToggle>
							<DropdownMenu right={true} className={this.state.dropdownOpen ? 'show' : ''}>
								<DropdownItem header={true} tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
								<DropdownLink className="dropdown-item" to="/user"><i className="fa fa-user"/> Profile</DropdownLink>
								{/*<DropdownItem divider/>*/}
								<DropdownItem onClick={this.props.account.logout}><i className="fa fa-sign-out"/> Logout</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</NavItem>
				</Nav>
				<NavbarToggler
					className="d-md-down-none d-none"
					type="button"
					onClick={this.asideToggle}
				>
					&#9776;
				</NavbarToggler>
			</header>
		);
	}
}

export default Header;
