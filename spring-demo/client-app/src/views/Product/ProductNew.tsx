import * as React from 'react';
import {FormEvent} from "react";
import {RouteComponentProps} from "react-router";
import bind from "bind-decorator";

import {ProductForm, ProductEntity} from "./ProductForm";


export interface ProductNewProps extends RouteComponentProps<{}> {
}

export class ProductNew extends React.Component<ProductNewProps, {}> {
	private entity = new ProductEntity(0);

	@bind
	onConfirm(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		this.entity.create().then((dto: any) => {
			this.props.history.push(`/product/${dto.productId}`);
		});
	}

	@bind
	onCancel(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		this.props.history.goBack();
	}

	render() {
		return (
			<form className="card border-primary" onSubmit={this.onConfirm} onReset={this.onCancel}>
				<div className="card-header">
					New Product
				</div>
				<ProductForm className="card-body" entity={this.entity} hideId={true} />
				<div className="card-footer d-flex">
					<button type="submit" className="btn btn-primary mr-auto-xs">Submit</button>
					<button type="reset" className="btn btn-secondary">Cancel</button>
				</div>
			</form>
		);
	}
}
