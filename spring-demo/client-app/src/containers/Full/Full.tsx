import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {inject, observer} from "mobx-react";

import Header from 'components/Header/';
import Sidebar from 'components/Sidebar/';
import Breadcrumb from 'components/Breadcrumb/';
import Aside from "components/Aside";
import {Dashboard} from 'views/Dashboard/';
import {AccountService} from "account/Account";
import {UserProfile, UserProfileEdit} from "views/UserProfile";
import {PrivateRouteComponentProps} from "components/RoleRoute";
import {ProductList, ProductShow, ProductEdit, ProductNew} from "views/Product";
import {WarehouseList, WarehouseShowRoute, WarehouseEdit, StockLocationShow, StockLocationEdit} from "views/Warehouse";
import {InventoryLineListRoute, InventoryLineShowRoute, InventoryLineEditRoute} from "views/Inventory";
import {ToolBar} from "../../global";


interface FullProps extends PrivateRouteComponentProps {
	account: AccountService;
	toolbar: ToolBar;
}


@inject((stores) => ({account: stores.store.account as AccountService, toolbar: stores.store.toolbar as ToolBar}))
@observer
export class Full extends React.Component<FullProps, {}> {
	render() {
		return (
			<div className="app">
				<Header account={this.props.account}/>
				<div className="app-body">
					<Sidebar location={this.props.location} />
					<main className="main">
						<Breadcrumb toolbar={this.props.toolbar.component}/>
						<div className="main-container container-fluid">
							<Switch>
								<Route path="/dashboard" component={Dashboard}/>
								<Route path="/user/edit" component={UserProfileEdit} />
								<Route path="/user" component={UserProfile}/>
								<Route path="/product/new" component={ProductNew}/>
								<Route path="/product/:id/edit" component={ProductEdit}/>
								<Route path="/product/:id" component={ProductShow}/>
								<Route path="/product" component={ProductList}/>
								<Route path="/warehouse/:warehouseId/stockLocation/:locationId/edit" component={StockLocationEdit}/>
								<Route path="/warehouse/:warehouseId/stockLocation/:locationId" component={StockLocationShow}/>
								<Route path="/warehouse/:warehouseId/edit" component={WarehouseEdit}/>
								<Route path="/warehouse/:warehouseId" component={WarehouseShowRoute}/>
								<Route path="/warehouse" component={WarehouseList}/>
								<Route path="/inventoryLine/:inventoryLineId/edit" component={InventoryLineEditRoute}/>
								<Route path="/inventoryLine/:inventoryLineId" component={InventoryLineShowRoute}/>
								<Route path="/inventoryLine" component={InventoryLineListRoute}/>
								<Redirect from="/" to="/dashboard"/>
							</Switch>
						</div>
					</main>
					{/*<Aside/>*/}
				</div>
				{/*<Footer/>*/}
			</div>
		);
	}
}
