import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observable} from "mobx";
import {inject, observer} from "mobx-react";
import * as Handsontable from "handsontable";
import {GridSettings} from "handsontable";
import HotTable from "react-handsontable";
import {History} from "history";
import bind from "bind-decorator";

import {PaginationBar} from "../../components/PaginationBar";
import {PageStore} from "form";
import {ToolBar} from "../../global";


interface WarehouseListProps extends RouteComponentProps<{}> {
	toolbar: ToolBar;
}

class WarehouseListStore extends PageStore {

}

@inject((stores) => ({toolbar: stores.store.toolbar as ToolBar}))
@observer
export class WarehouseList extends React.Component<WarehouseListProps, {}> {
	private pageStore = new WarehouseListStore("/api/warehouse");
	private hot: Handsontable;

	@observable
	private handsontableSettings: GridSettings;

	constructor(props: WarehouseListProps, context: any) {
		super(props, context);

		this.handsontableSettings = {
			// stretchH: "all",
			fillHandle: false,
			rowHeaders: true,
			columns: [
				{type: "numeric", title: "編號", data: "id", readOnly: true},
				{type: "text", title: "名稱", data: "name", readOnly: true},
				{type: "text", title: "地址", data: "address", readOnly: true},
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

		this.pageStore.onSearch();
	}

	render() {
		return (
			<div className="warehouse-list">
				<HotTable ref={el => this.hot = el && el.hotInstance} data={this.pageStore.content} settings={this.handsontableSettings} />
				<PaginationBar pageStore={this.pageStore} />
			</div>
		);
	}

	@bind
	private onShowItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const history: History = this.props.history;
		history.push(`/warehouse/${data.id}`);
	}

	@bind
	private onEditItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const history: History = this.props.history;
		history.push(`/warehouse/${data.id}/edit`);
	}

	@bind
	private onDeleteItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const msg = `刪除 編號=${data.id} 名稱=${data.name}`;

		if (window.confirm(msg)) {
			// TODO
		}
	}

	private getData(options: Handsontable.contextMenu.Options): any {
		const visualRow = options.start.row;
		const physicalRow = this.hot.toPhysicalRow(visualRow);
		return this.hot.getSourceDataAtRow(physicalRow);
	}
}
