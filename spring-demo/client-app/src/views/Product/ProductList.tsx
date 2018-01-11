import * as React from 'react';
import HotTable from "react-handsontable";
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import * as Handsontable from "handsontable";
import {GridSettings} from "handsontable";
import {History} from "history";
import bind from "bind-decorator";

import {SearchBar} from "components/SearchBar";
import {TextField, TextInputGroup, PageStore} from "form";
import {PaginationBar} from "components/PaginationBar";
import {FullHotTable} from "components/FullHotTable";
import {ToolBar} from "global";
import {ProductEntity} from "./ProductForm";

import "./Product.css";


function OptionRenderer(this: Function, instance: Handsontable, TD: HTMLElement, row: number, col: number, prop: string | number, value: any, cellProperties: GridSettings): HTMLElement {
	// console.log(row, col, prop, value, instance.getDataAtRow(row));
	Handsontable.renderers.BaseRenderer.apply(this, arguments);
	// let button = document.createElement("button") as HTMLButtonElement;
	// button.textContent = "hello";
	// button.onclick = (event) => {
	// 	console.log("hello");
	// };
	//
	// Handsontable.dom.empty(TD);
	// TD.appendChild(button);

	return TD;
}


interface ProductListProps extends RouteComponentProps<{}> {
	toolbar: ToolBar;
}


class ProductPageStore extends PageStore {
	search = new TextField();
	brand = new TextField();
	component = new TextField();
	model = new TextField();
	type = new TextField();
	partNumber = new TextField();
}


@inject((stores) => ({toolbar: stores.store.toolbar as ToolBar}))
@observer
export class ProductList extends React.Component<ProductListProps, {}> {
	// @observable
	private handsontableSettings: GridSettings;

	private pageStore = new ProductPageStore("/api/product");
	private hot: Handsontable;

	constructor(props: ProductListProps, context: any) {
		super(props, context);

		this.handsontableSettings = {
			stretchH: "all",
			fillHandle: false,
			rowHeaders: true,
			columns: [
				{type: "numeric", title: "編號", data: "productId", readOnly: true},
				{type: "text", title: "名稱", data: "productName", readOnly: true},
				{type: "text", title: "廠牌", data: "brand", readOnly: true},
				{type: "text", title: "零件", data: "component", readOnly: true},
				{type: "text", title: "型號", data: "model", readOnly: true},
				{type: "text", title: "形式", data: "type", readOnly: true},
				{type: "text", title: "件號", data: "partNumber", readOnly: true},
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
		this.props.toolbar.setComponent(this.renderToolBar());
	}

	renderToolBar() {
		return <Link key="/product/new" to="/product/new"><i className="fa fa-plus" aria-hidden="true"/>New</Link>;
	}

	render() {
		return (
			<div className="product">
				<SearchBar searchField={this.pageStore.search} onSearch={this.pageStore.onSearch}>
					<div className="container-fluid">
						<div className="row">
							<TextInputGroup label="廠牌" field={this.pageStore.brand} className="col-md-4"/>
							<TextInputGroup label="零件" field={this.pageStore.component} className="col-md-4"/>
							<TextInputGroup label="型號" field={this.pageStore.model} className="col-md-4"/>
							<TextInputGroup label="形式" field={this.pageStore.type} className="col-md-4"/>
							<TextInputGroup label="件號" field={this.pageStore.partNumber} className="col-md-4"/>
						</div>
					</div>
				</SearchBar>
				{/*<FullHotTable className="product__content" data={this.pageStore.content} settings={this.handsontableSettings} />*/}
				<HotTable ref={el => this.hot = el && el.hotInstance} className="product__content" data={this.pageStore.content} settings={this.handsontableSettings} />
				<PaginationBar pageStore={this.pageStore} />
			</div>
		);
	}

	@bind
	private onShowItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const history: History = this.props.history;
		history.push(`/product/${data.productId}`);
	}

	@bind
	private onEditItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const history: History = this.props.history;
		history.push(`/product/${data.productId}/edit`);
	}

	@bind
	private onDeleteItem(key: string, options: Handsontable.contextMenu.Options) {
		const data = this.getData(options);
		const msg = `刪除 編號=${data.productId} 名稱=${data.productName} 廠牌=${data.brand} 型號=${data.model} 零件=${data.component}`;

		if (window.confirm(msg)) {
			const entity = new ProductEntity(data.productId);
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
