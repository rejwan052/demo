import * as React from 'react';
import {FormEvent} from "react";
import {RouteComponentProps} from "react-router";
import bind from "bind-decorator";

import {ProductForm, ProductEntity} from "./ProductForm";


interface RouteParam {
	id: number;
}

export interface ProductEditProps extends RouteComponentProps<RouteParam> {
}

export class ProductEdit extends React.Component<ProductEditProps, {}> {
	private entity: ProductEntity;

	constructor(props: ProductEditProps, context: any) {
		super(props, context);

		this.entity = new ProductEntity(this.props.match.params.id);
		this.entity.show();
	}

	@bind
	onConfirm(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		this.entity.update().then(result => {
			this.props.history.goBack();
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
					Edit Product
				</div>
				<div className="card-body">
					<ProductForm entity={this.entity} />
				</div>
				<div className="card-footer d-flex">
					<button type="submit" className="btn btn-primary mr-auto-xs">Submit</button>
					<button type="reset" className="btn btn-secondary">Cancel</button>
				</div>
			</form>
		);
	}
}
