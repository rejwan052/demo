// External
import * as React from "react";
import {observer} from "mobx-react";
import {History} from "history";
import bind from "bind-decorator";
import * as Handsontable from "handsontable";
import {GridSettings} from "handsontable";
import HotTable from "react-handsontable";

// Internal
import {PageStore} from "form";
import {PaginationBar} from "components/PaginationBar";
import {StockLocationDTO, StockLocationEntity, WarehouseEntity} from "./WarehouseForm";


interface StockLocationListProps {
	history: History;
	warehouseId: number;
	className?: string;
}


export class StockLocationListStore extends PageStore<StockLocationDTO[]> {
	constructor() {
		super("/api/stockLocation");
	}
}


@observer
export class StockLocationList extends React.Component<StockLocationListProps, {}> {
	private pageStore: StockLocationListStore;
	private hot: Handsontable;
	private handsontableSettings: GridSettings;

	constructor(props: StockLocationListProps, context: any) {
		super(props, context);

		this.handsontableSettings = {
			// stretchH: "all",
			fillHandle: false,
			rowHeaders: true,
			columns: [
				{type: "numeric", title: "編號", data: "id", readOnly: true},
				{type: "text", title: "QR Code", data: "qrcode", readOnly: true},
				{type: "numeric", title: "最大容量", data: "capacity", readOnly: true},
				{type: "numeric", title: "已使用容量", data: "qty", readOnly: true},
				{type: "numeric", title: "位置X", data: "posx", readOnly: true},
				{type: "numeric", title: "位置Y", data: "posy", readOnly: true},
				{type: "numeric", title: "位置Z", data: "posz", readOnly: true},
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

		this.pageStore = new StockLocationListStore();
		this.pageStore.addExtraParam("warehouseId", this.props.warehouseId);
	}

	componentDidMount() {
		this.pageStore.onSearch();
	}

	render() {
		return (
			<div className={this.props.className}>
				<HotTable ref={el => this.hot = el && el.hotInstance} data={this.pageStore.content} settings={this.handsontableSettings} />
				<PaginationBar pageStore={this.pageStore} />
			</div>
		);
	}

	@bind
	private onShowItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const entity = new StockLocationEntity(data.id);
		entity.parent = new WarehouseEntity(this.props.warehouseId);
		this.props.history.push(entity.showUrl);
	}

	@bind
	private onEditItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const entity = new StockLocationEntity(data.id);
		entity.parent = new WarehouseEntity(this.props.warehouseId);
		this.props.history.push(entity.editUrl);
	}

	@bind
	private onDeleteItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const msg = `刪除 編號=${data.id} 位置=(${data.posx}, ${data.posy}, ${data.posz})`;

		if (window.confirm(msg)) {
			const entity = new StockLocationEntity(data.id);
			entity.destroy().then(() => {
				this.pageStore.onSearch();
			});
		}
	}

	private getData(options: Handsontable.contextMenu.Options): any {
		const visualRow = options.start.row;
		const physicalRow = this.hot.toPhysicalRow(visualRow);
		return this.hot.getSourceDataAtRow(physicalRow);
	}
}
