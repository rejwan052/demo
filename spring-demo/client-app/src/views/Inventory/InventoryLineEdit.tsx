// External
import * as React from "react";
import {History} from "history";

// Internal
import {EntityEdit} from "form";
import {InventoryLineEntity, InventoryLineForm} from "./InventoryLineForm";
import {RouteComponentProps} from "react-router";




interface InventoryLineEditRouteParams {
	inventoryLineId: number;
}

interface InventoryLineEditRouteProps extends RouteComponentProps<InventoryLineEditRouteParams> {
}

export class InventoryLineEditRoute extends React.Component<InventoryLineEditRouteProps, {}> {
	entity = new InventoryLineEntity(0);

	componentDidMount() {
		this.entity.id.value = this.props.match.params.inventoryLineId;
		this.entity.show();
	}

	render() {
		return (
			<EntityEdit entity={this.entity} history={this.props.history}>
				<InventoryLineForm entity={this.entity}/>
			</EntityEdit>
		);
	}
}
