// External
import * as React from "react";
import {observer} from "mobx-react";
import {AutocompleteResult} from "react-select";
import bind from "bind-decorator";

// Internal
import {
	AbstractEntity, SelectField, PageStore, createSelectInputGroupClass
} from "form";
import {StockLocationDTO, StockLocationListStore} from "views/Warehouse";


export interface ProductDTO {
	productId: number;
	productName: string;
	note?: string;
	brand: string;
	model: string;
	component: string;
	type?: string;
	partNumber?: string;
}

const ProductSelectGroup = createSelectInputGroupClass<ProductDTO>();


class ProductOptionStore extends PageStore<ProductDTO[]> {
	constructor() {
		super("/api/product");
	}
}

class ProductField extends SelectField<ProductDTO> {
	optionStore = new ProductOptionStore();

	getLabelFromValue(value?: ProductDTO): string {
		return value ? value.productName : "";
	}

	@bind
	loadOptions(input: string): Promise<AutocompleteResult<ProductDTO>> {
		this.optionStore.addExtraParam("search", input);
		this.optionStore.pageSize = 5;

		// return rest.get<Page>(`/api/product?size=5&search=${input}`)
		return this.optionStore.paginate().then(page => {
			const options = page.content.map(d => ({label: this.getLabelFromValue(d), value: d}));
			return {
				options,
				complete: true,
			};
		});
	}
}

class StockLocationField extends SelectField<StockLocationDTO> {
	private locationStore = new StockLocationListStore();

	getLabelFromValue(value?: StockLocationDTO): string {
		return value ? `${value.id} ${value.warehouse.name} (${value.posx}, ${value.posy}, ${value.posz})` : "";
	}

	@bind
	loadOptions(input: string): Promise<AutocompleteResult<StockLocationDTO>> {
		this.locationStore.addExtraParam("search", input);
		this.locationStore.pageSize = 5;

		// return rest.get<Page>(`/api/product?size=5&search=${input}`)
		return this.locationStore.paginate().then(page => {
			const options = page.content.map(d => ({label: this.getLabelFromValue(d), value: d}));
			return {
				options,
				complete: true,
			};
		});
	}
}


const StockLocationSelectGroup = createSelectInputGroupClass<StockLocationDTO>();

export class InventoryLineEntity extends AbstractEntity {
	product = new ProductField(null);
	location = new StockLocationField(null);

	constructor(id: number = 0) {
		super("inventoryLine", id);
	}
}


interface InventoryLineFormProps {
	entity: InventoryLineEntity;
	className?: string;
	readOnly?: boolean;
	hideId?: boolean;
}

@observer
export class InventoryLineForm extends React.Component<InventoryLineFormProps, {}> {
	render() {
		const entity = this.props.entity;
		return (
			<div className={this.props.className}>
				<div className="row">
					<div className="col-md-6 form-group">
						<ProductSelectGroup label="商品" field={entity.product} readOnly={this.props.readOnly} required={true} />
					</div>
					<div className="col-md-6 form-group">
						<StockLocationSelectGroup label="儲位" field={entity.location} readOnly={this.props.readOnly} required={true} />
					</div>
				</div>
			</div>
		);
	}
}
