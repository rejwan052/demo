import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";

import {StockLocationEntity, StockLocationForm, WarehouseEntity} from "./WarehouseForm";
import bind from "bind-decorator";
import {EntityEdit} from "form";


interface WarehouseShowParam {
	warehouseId: number;
	locationId: number;
}

interface StockLocationShowProps extends RouteComponentProps<WarehouseShowParam> {
}

export class StockLocationShow extends React.Component<StockLocationShowProps, {}> {
	private entity: StockLocationEntity;

	constructor(props: StockLocationShowProps, context: any) {
		super(props, context);

		this.entity = new StockLocationEntity(this.props.match.params.locationId);
		this.entity.parent = new WarehouseEntity(this.props.match.params.warehouseId);
		this.entity.show();
	}

	render() {
		return (
			<div className="card">
				<div className="card-header">
					<ul className="nav">
						<li className="nav-item">Location</li>
						<li className="nav-item ml-auto"><a href="#" onClick={this.onDelete}>Delete</a></li>
						<li className="nav-item ml-3"><Link to={this.entity.editUrl}>Edit</Link></li>
					</ul>
				</div>
				<StockLocationForm className="card-body" entity={this.entity} readOnly={true}/>
			</div>
		);
	}

	@bind
	private onDelete() {
		const entity = this.entity;
		const msg = `刪除 ${entity}`;
		if (window.confirm(msg)) {
			this.entity.destroy().then(() => {
				this.props.history.push(`/warehouse/${this.props.match.params.warehouseId}`);
			});
		}
	}
}


export const StockLocationEdit = (props: StockLocationShowProps) => {
	const entity = new StockLocationEntity(props.match.params.locationId);
	entity.show();

	return (
		<EntityEdit entity={entity} history={props.history}>
			<StockLocationForm entity={entity}/>
		</EntityEdit>
	);
};
