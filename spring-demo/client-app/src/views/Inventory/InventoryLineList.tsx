// External
import * as React from "react";
import {RouteComponentProps} from "react-router";
import {History} from "history";
import {observer} from "mobx-react";
import bind from "bind-decorator";
import * as Handsontable from "handsontable";
import {GridSettings} from "handsontable";
import HotTable from "react-handsontable";

// Internal
import * as rest from "rest";
import {PageStore, Page, TextInputGroup, TextField} from "form";
import {PaginationBar} from "components/PaginationBar";
import {SearchBar} from "components/SearchBar";
import {InventoryLineEntity, InventoryLineForm} from "./InventoryLineForm";


interface InventoryLineListParams {

}

interface InventoryLineListProps {
	pageStore: InventoryLineListStore;
	warehouseId?: number;
	className?: string;
	history: History;
}

class InventoryLineListStore extends PageStore {
	search = new TextField();
	brand = new TextField();
	component = new TextField();
	model = new TextField();
	type = new TextField();
	partNumber = new TextField();
	warehouse = new TextField();

	constructor() {
		super("/api/inventoryLine");
	}

	paginate() {
		const warehouseUrl = `/api/warehouse?size=10000`;  // get all warehouses
		const inventoryLineUrl = this.buildUrl();
		return Promise.all([
			rest.get<Page>(warehouseUrl),
			rest.get<Page>(inventoryLineUrl)
		]).then((pages: Array<Page>) => {
			const warehouses = pages[0].content;
			const inventories = pages[1];

			for (let inventory of inventories.content) {
				inventory.warehouse = warehouses.find(x => x.id === inventory.location.warehouseId);
			}

			this.onPageData(inventories);
			return inventories;
		});
	}
}

@observer
export class InventoryLineList extends React.Component<InventoryLineListProps, {}> {
	private hot: Handsontable;
	private handsontableSettings: GridSettings;

	constructor(props: InventoryLineListProps, context: any) {
		super(props, context);

		this.handsontableSettings = {
			// stretchH: "all",
			fillHandle: false,
			rowHeaders: true,
			columns: [
				{type: "numeric", title: "編號", data: "id", readOnly: true},
				{type: "text", title: "名稱", data: "product.productName", readOnly: true},
				{type: "text", title: "廠牌", data: "product.brand", readOnly: true},
				{type: "text", title: "零件", data: "product.component", readOnly: true},
				{type: "text", title: "型號", data: "product.model", readOnly: true},
				{type: "text", title: "形式", data: "product.type", readOnly: true},
				{type: "text", title: "件號", data: "product.partNumber", readOnly: true},
				{type: "text", title: "倉庫", data: "warehouse.name", readOnly: true},
				{type: "text", title: "備註", data: "note", readOnly: true},
			],
			contextMenu: {
				items: {
					show: {
						name: "Detail",
						callback: this.onShowItem,
					},
					edit: {
						name: "Edit",
						callback: this.onEditItem,
					},
					destroy: {
						name: "Delete",
						callback: this.onDeleteItem,
					},
				},
				callback() {
					// NOP
				},
			},
		};

		this.props.pageStore.addExtraParam("warehouseId", this.props.warehouseId);
	}

	render() {
		return (
			<div className={this.props.className}>
				<HotTable ref={el => this.hot = el && el.hotInstance} data={this.props.pageStore.content} settings={this.handsontableSettings} />
				<PaginationBar pageStore={this.props.pageStore} />
			</div>
		);
	}

	@bind
	private onShowItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const history: History = this.props.history;
		const entity = new InventoryLineEntity(data.id);
		history.push(entity.showUrl);
	}

	@bind
	private onEditItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const history: History = this.props.history;
		const entity = new InventoryLineEntity(data.id);
		history.push(entity.editUrl);
	}

	@bind
	private onDeleteItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const msg = `刪除 編號=${data.id} 位置=(${data.location.posx}, ${data.location.posy}, ${data.location.posz})`;

		if (window.confirm(msg)) {
			const entity = new InventoryLineEntity(data.id);
			entity.destroy().then(() => {
				this.props.pageStore.onSearch();
			});
		}
	}

	private getData(options: Handsontable.contextMenu.Options): any {
		const visualRow = options.start.row;
		const physicalRow = this.hot.toPhysicalRow(visualRow);
		return this.hot.getSourceDataAtRow(physicalRow);
	}
}


// region InventoryLineListRoute

interface InventoryLineListRouteParams {

}

interface InventoryLineListRouteProps extends RouteComponentProps<InventoryLineListRouteParams> {
}

export class InventoryLineListRoute extends React.Component<InventoryLineListRouteProps, {}> {
	private pageStore: InventoryLineListStore = new InventoryLineListStore();

	componentDidMount() {
		this.pageStore.onSearch();
	}

	render() {
		return (
			<div>
				<SearchBar searchField={this.pageStore.search} onSearch={this.pageStore.onSearch}>
					<div className="container-fluid">
						<div className="row">
							<TextInputGroup label="廠牌" field={this.pageStore.brand} className="col-md-4"/>
							<TextInputGroup label="零件" field={this.pageStore.component} className="col-md-4"/>
							<TextInputGroup label="型號" field={this.pageStore.model} className="col-md-4"/>
							<TextInputGroup label="形式" field={this.pageStore.type} className="col-md-4"/>
							<TextInputGroup label="件號" field={this.pageStore.partNumber} className="col-md-4"/>
							<TextInputGroup label="倉庫" field={this.pageStore.warehouse} className="col-md-4"/>
						</div>
					</div>
				</SearchBar>
				<InventoryLineList pageStore={this.pageStore} history={this.props.history} />
			</div>
		);
	}
}

// endregion
