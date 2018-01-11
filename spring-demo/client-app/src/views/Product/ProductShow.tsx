import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import bind from "bind-decorator";
import {History} from "history";
import {observer} from "mobx-react";

import {ProductForm, ProductEntity} from "./ProductForm";
import {ToolBar} from "../../global";


interface ProductShowCardProps {
	entity: ProductEntity;
	history: History;
}

@observer
export class ProductShowCard extends React.Component<ProductShowCardProps, {}> {
	@bind
	onDelete() {
		const entity = this.props.entity;
		const msg = `刪除 編號=${entity.productId.value} 名稱=${entity.productName.value} 廠牌=${entity.brand.value} 型號=${entity.model.value} 零件=${entity.component.value}`;
		if (window.confirm(msg)) {
			this.props.entity.destroy().then(() => {
				this.props.history.push("/product");
			});
		}
	}

	render() {
		return (
			<div className="card">
				<div className="card-header">
					<ul className="nav">
						<li className="nav-item">Product</li>
						<li className="nav-item ml-auto"><a href="#" onClick={this.onDelete}>Delete</a></li>
						<li className="nav-item ml-3"><Link to={this.props.entity.editUrl}>Edit</Link></li>
					</ul>
				</div>
				<ProductForm className="card-body" entity={this.props.entity} readOnly={true} />
			</div>
		);
	}
}


interface RouteParam {
	id: number;
}

export interface ProductShowProps extends RouteComponentProps<RouteParam> {
	toolbar: ToolBar;
}

export class ProductShow extends React.Component<ProductShowProps, {}> {
	private entity: ProductEntity;

	constructor(props: ProductShowProps, context: any) {
		super(props, context);

		this.entity = new ProductEntity(this.props.match.params.id);
		this.entity.show();
	}

	@bind
	onDelete() {
		const entity = this.entity;
		const msg = `刪除 編號=${entity.productId.value} 名稱=${entity.productName.value} 廠牌=${entity.brand.value} 型號=${entity.model.value} 零件=${entity.component.value}`;
		if (window.confirm(msg)) {
			this.entity.destroy().then(() => {
				this.props.history.push("/product");
			});
		}
	}

	render() {
		return <ProductShowCard entity={this.entity} history={this.props.history} />;
	}
}
