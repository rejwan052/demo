import * as React from 'react';
import {Route, Link, RouteComponentProps} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import routes from '../../routes';

import "./breadcrumb.css";

const findRouteName = url => routes[url];

const getPaths = (pathname) => {
	const paths = ['/'];

	if (pathname === '/') return paths;

	pathname.split('/').reduce((prev, curr, index) => {
		const currPath = `${prev}/${curr}`;
		paths.push(currPath);
		return currPath;
	});
	return paths;
};


function routeNameMap(routeName: string): string {
	switch (routeName) {
		case "edit": return "Edit";
		case "new": return "New";
		case "stockLocation": return "Location";
		case "inventoryLine": return "Inventory";
		default: return routeName;
	}
}

const BreadcrumbsItem = ({match}: RouteComponentProps<{}>) => {
	let routeName = findRouteName(match.url);
	if (!routeName) {
		const paths = match.url.split("/");
		routeName = paths[paths.length - 1];
	}

	// FIXME 路徑有參數，無法對應
	routeName = routeNameMap(routeName);

	return (
		match.isExact ?
			(
				<BreadcrumbItem active={true}>{routeName}</BreadcrumbItem>
			) :
			(
				<BreadcrumbItem>
					<Link to={match.url || ''}>{routeName}</Link>
				</BreadcrumbItem>
			)
	);
};

const Breadcrumbs = ({location: {pathname}}: RouteComponentProps<{}>) => {
	const paths = getPaths(pathname);
	const items = paths.map((path, i) => <Route key={i} path={path} component={BreadcrumbsItem}/>);
	return (
		<Breadcrumb>
			{items}
		</Breadcrumb>
	);
};


export default (props: any) => {
	return (
		<div className="breadcrumb-container">
			<Route path="/:path" component={Breadcrumbs} />
			<div className="toolbar">
				{props.toolbar}
			</div>
		</div>
	);
};
