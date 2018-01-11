import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import {History} from "history";
import {observer} from "mobx-react";

import {WarehouseEntity, WarehouseForm} from "./WarehouseForm";
import bind from "bind-decorator";
import {StockLocationList} from "./StockLocationList";


interface WarehouseShowCardProps {
	entity: WarehouseEntity;
	history: History;
}

@observer
export class WarehouseShowCard extends React.Component<WarehouseShowCardProps, {}> {
	render() {
		return (
			<div className="card">
				<div className="card-header">
					<ul className="nav">
						<li className="nav-item">Warehouse</li>
						<li className="nav-item ml-auto"><a href="#" onClick={this.onDelete}>Delete</a></li>
						<li className="nav-item ml-3"><Link to={this.props.entity.editUrl}>Edit</Link></li>
					</ul>
				</div>
				<WarehouseForm entity={this.props.entity} className="card-body" readOnly={true} />
			</div>
		);
	}

	@bind
	private onDelete() {
		const entity = this.props.entity;
		const msg = `刪除 編號=${entity.id.value} 名稱=${entity.name.value}`;
		if (window.confirm(msg)) {
			this.props.entity.destroy().then(() => {
				this.props.history.push("/warehouse");
			});
		}
	}
}


interface WarehouseShowProps {
	entity: WarehouseEntity;
	history: History;
}

export class WarehouseShow extends React.Component<WarehouseShowProps, {}> {

	render() {
		return (
			<div className="warehouse-show">
				<WarehouseShowCard entity={this.props.entity} history={this.props.history} />
				<div className="card">
					<div className="card-header">
						<ul className="nav">
							<li className="nav-item">Location</li>
						</ul>
					</div>
					<StockLocationList className="card-body" warehouseId={this.props.entity.id.value} history={this.props.history} />
				</div>
			</div>
		);
	}
}


interface WarehouseShowRouteParams {
	warehouseId: number;
}

interface WarehouseShowRouteProps extends RouteComponentProps<WarehouseShowRouteParams> {
}
// FIXME
export const WarehouseShowRoute = (props: WarehouseShowRouteProps) => {
	const entity = new WarehouseEntity(props.match.params.warehouseId);
	entity.show();
	return <WarehouseShow entity={entity} history={props.history}/>;
};
