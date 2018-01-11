import * as React from "react";
import {RouteComponentProps} from "react-router";

import {EntityEdit} from "form";
import {WarehouseEntity, WarehouseForm} from "./WarehouseForm";


interface WarehouseEditParams {
	warehouseId: number;
}

export const WarehouseEdit = (props: RouteComponentProps<WarehouseEditParams>) => {
	const entity = new WarehouseEntity(props.match.params.warehouseId);
	entity.show();

	return (
		<EntityEdit entity={entity} history={props.history}>
			<WarehouseForm entity={entity}/>
		</EntityEdit>
	);
};
