// External
import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import {History} from "history";
import bind from "bind-decorator";
// Internal
import {WarehouseEntity, WarehouseShowCard} from "views/Warehouse";
import {ProductEntity, ProductShowCard} from "views/Product";
import {InventoryLineEntity, InventoryLineForm} from "./InventoryLineForm";


interface InventoryLineShowCardProps {
	entity: InventoryLineEntity;
	history: History;
}

export class InventoryLineShowCard extends React.Component<InventoryLineShowCardProps, {}> {
	render() {
		return (
			<div className="card">
				<div className="card-header">
					<ul className="nav">
						<li className="nav-item">Inventory</li>
						<li className="nav-item ml-auto"><a href="#" onClick={this.onDelete}>Delete</a></li>
						<li className="nav-item ml-3"><Link to={this.props.entity.editUrl}>Edit</Link></li>
					</ul>
				</div>
				<InventoryLineForm entity={this.props.entity} readOnly={true} className="card-body"/>
			</div>
		);
	}

	@bind
	private onDelete() {
		const entity = this.props.entity;
		const msg = `刪除 編號=${entity.id.value} 名稱=${entity.product.value.productName}`;
		if (window.confirm(msg)) {
			this.props.entity.destroy().then(() => {
				this.props.history.push("/inventoryLine");
			});
		}
	}
}


interface InventoryLineShowRouteParams {
	inventoryLineId: number;
}

interface InventoryLineShowRouteProps extends RouteComponentProps<InventoryLineShowRouteParams> {
}

export class InventoryLineShowRoute extends React.Component<InventoryLineShowRouteProps, {}> {
	entity = new InventoryLineEntity(this.props.match.params.inventoryLineId);
	warehouseEntity = new WarehouseEntity(0);
	productEntity = new ProductEntity(0);

	componentDidMount() {
		this.entity.show().then(inventoryLine => {
			this.warehouseEntity.updateEntity(inventoryLine.location.warehouse);
			this.productEntity.updateEntity(inventoryLine.product);
		});
	}

	render() {
		return (
			<div>
				<InventoryLineShowCard entity={this.entity} history={this.props.history}/>
				<ProductShowCard entity={this.productEntity} history={this.props.history}/>
				<WarehouseShowCard entity={this.warehouseEntity} history={this.props.history}/>
			</div>
		);
	}
}
