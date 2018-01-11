// Third-party libs
import * as React from 'react';
import {action} from "mobx";

// Internal libs
import {Field, TextField, IntField, TextInputGroup, TextareaGroup} from "form";
import * as rest from "rest";


export class ProductEntity {
	dto: any;
	productId = new IntField(0);
	productName = new TextField();
	note = new TextField();

	brand = new TextField();
	model = new TextField();
	component = new TextField();
	type = new TextField();
	partNumber = new TextField();

	constructor(id: number) {
		this.productId.value = id;
	}

	get editUrl(): string {
		return `/product/${this.productId.value}/edit`;
	}

	get showUrl(): string {
		return `/product/${this.productId.value}`;
	}

	create() {
		const dto = Object.keys(this).filter(x => this[x] instanceof Field)
			.filter(key => this[key].dirty)
			.reduce(
				(value, key) => {
					value[key] = this[key].value;
					return value;
				},
				{}
			);
		return rest.post("/api/product", dto);
	}

	@action.bound
	updateEntity(dto: any) {
		const fieldKeys = Object.keys(this).filter(x => this[x] instanceof Field);
		for (let fieldKey of fieldKeys) {
			const field = this[fieldKey];
			field.value = dto[fieldKey];
		}

		this.dto = dto;
	}

	show() {
		return rest.get(`/api/product/${this.productId.value}`)
			.then(this.updateEntity);
	}

	update() {
		const dto = Object.keys(this).filter(x => this[x] instanceof Field)
			.filter(key => this[key].dirty)
			.reduce(
				(value, key) => {
					value[key] = this[key].value;
					return value;
				},
				this.dto
			);

		return rest.put(`/api/product/${this.productId.value}`, dto);
	}

	destroy() {
		return rest.destroy(`/api/product/${this.productId.value}`);
	}
}


export interface ProductFormProps {
	entity: ProductEntity;
	className?: string;
	readOnly?: boolean;
	hideId?: boolean;
}


export class ProductForm extends React.Component<ProductFormProps, {}> {
	render() {
		return (
			<div className={this.props.className}>
				<div className="row">
					{this.props.hideId ? null : <div className="col-md-4"><TextInputGroup label="編號" field={this.props.entity.productId} readOnly={true}/></div>}
					<div className="col-md-4"><TextInputGroup label="名稱" field={this.props.entity.productName} readOnly={this.props.readOnly} required={true}/></div>
					<div className="col-md-4"><TextInputGroup label="廠牌" field={this.props.entity.brand} readOnly={this.props.readOnly} required={true}/></div>
					<div className="col-md-4"><TextInputGroup label="零件" field={this.props.entity.component} readOnly={this.props.readOnly} required={true}/></div>
					<div className="col-md-4"><TextInputGroup label="型號" field={this.props.entity.model} readOnly={this.props.readOnly} required={true}/></div>
					<div className="col-md-4"><TextInputGroup label="形式" field={this.props.entity.type} readOnly={this.props.readOnly}/></div>
					<div className="col-md-4"><TextInputGroup label="件號" field={this.props.entity.partNumber} readOnly={this.props.readOnly}/></div>
				</div>
				<div className="row">
					<div className="form-group col-12"><TextareaGroup label="備註" field={this.props.entity.note} readOnly={this.props.readOnly} rows={5}/></div>
				</div>
			</div>
		);
	}
}
