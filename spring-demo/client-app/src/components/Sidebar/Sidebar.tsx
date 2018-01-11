import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem, NavLink as RsNavLink} from 'reactstrap';
import * as classNames from 'classnames';
import {Location} from "history";
import bind from "bind-decorator";

import isExternal from './is-url-external';
import nav from './_nav';
import SidebarFooter from './SidebarFooter';
import SidebarForm from './SidebarForm';
import SidebarHeader from './SidebarHeader';
import SidebarMinimizer from './SidebarMinimizer';

interface SidebarProps {
	location?: Location;
}

interface SidebarState {
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {

	@bind
	handleClick(e: React.MouseEvent<{}>) {
		e.preventDefault();
		let el = e.target as HTMLElement;
		if (el.parentElement != null) {
			el.parentElement.classList.toggle('open');
		}
	}

	activeRoute(routeName: string, props: SidebarProps) {
		// return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
		return props.location && props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
	}

	// todo Sidebar nav secondLevel
	// secondLevelActive(routeName) {
	//   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
	// }

	render() {

		const props = this.props;
		const activeRoute = this.activeRoute;
		const handleClick = this.handleClick;

		// badge addon to NavItem
		const badge = (badgeItem) => {
			if (badgeItem) {
				const classes = classNames(badgeItem.class);
				return (<Badge className={classes} color={badgeItem.variant}>{badgeItem.text}</Badge>);
			} else {
				return null;
			}
		};

		// simple wrapper for nav-title item
		const wrapper = item => {
			return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name );
		};

		// nav list section title
		const title = (titleItem, key) => {
			const classes = classNames("nav-title", titleItem.class);
			return (<li key={key} className={classes}>{wrapper(titleItem)} </li>);
		};

		// nav list divider
		const divider = (dividerItem, key) => (<li key={key} className="divider"/>);

		// nav item with nav link
		const navItem = (item, key) => {
			const classes = classNames(item.class);
			const variant = classNames("nav-link", item.variant ? `nav-link-${item.variant}` : "");
			return (
				<NavItem key={key} className={classes}>
					{isExternal(item.url) ?
						<RsNavLink href={item.url} className={variant} active={true}>
							<i className={item.icon}/>{item.name}{badge(item.badge)}
						</RsNavLink>
						:
						<NavLink to={item.url} className={variant} activeClassName="active">
							<i className={item.icon}/>{item.name}{badge(item.badge)}
						</NavLink>
					}
				</NavItem>
			);
		};

		// nav dropdown
		const navDropdown = (item, key) => {
			return (
				<li key={key} className={activeRoute(item.url, props)}>
					<a className="nav-link nav-dropdown-toggle" href="#" onClick={handleClick}><i className={item.icon}/>{item.name}</a>
					<ul className="nav-dropdown-items">
						{navList(item.children)}
					</ul>
				</li>
			);
		};

		// nav link
		const navLink = (item, idx) =>
			item.title ? title(item, idx) :
				item.divider ? divider(item, idx) :
					item.children ? navDropdown(item, idx)
						: navItem(item, idx);

		// nav list
		const navList = (items) => {
			return items.map((item, index) => navLink(item, index));
		};

		// sidebar-nav root
		return (
			<div className="sidebar">
				<SidebarHeader/>
				<SidebarForm/>
				<nav className="sidebar-nav">
					<Nav>
						{navList(nav.items)}
					</Nav>
				</nav>
				<SidebarFooter/>
				<SidebarMinimizer/>
			</div>
		);
	}
}

export default Sidebar;
