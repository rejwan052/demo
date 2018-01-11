// External
import * as React from "react";
import {observer} from "mobx-react";

// Internal
import {
	AbstractEntity, TextField, TextInputGroup, TextareaGroup, FormProps, IntField,
	NumberInputGroup
} from "form";


export interface WarehouseDTO {
	id: number;
	name: string;
	address: string;
}

export interface StockLocationDTO {
	id: number;
	qrcode: string;
	warehouse: WarehouseDTO;
	capacity: number;
	qty: number;
	posx: number;
	posy: number;
	posz: number;
}

export class WarehouseEntity extends AbstractEntity {
	name = new TextField();
	address = new TextField();
	note =  new TextField();

	constructor(id: number) {
		super("warehouse", id);
	}
}


export interface WarehouseFormProps extends FormProps<WarehouseEntity> {
}


@observer
export class WarehouseForm extends React.Component<WarehouseFormProps, {}> {
	render() {
		return (
			<div className={this.props.className}>
				<div className="row">
					{this.props.hideId ? null : <div className="form-group col-md-4"><TextInputGroup label="編號" field={this.props.entity.id} readOnly={true}/></div>}
					<div className="form-group col-md-4"><TextInputGroup label="名稱" field={this.props.entity.name} readOnly={this.props.readOnly} required={true}/></div>
					<div className="form-group col-md-4"><TextInputGroup label="地址" field={this.props.entity.address} readOnly={this.props.readOnly} required={true}/></div>
				</div>
				<div className="row">
					<div className="form-group col-12"><TextareaGroup label="備註" field={this.props.entity.note} readOnly={this.props.readOnly} rows={5}/></div>
				</div>
			</div>
		);
	}
}


export class StockLocationEntity extends AbstractEntity {
	qrcode = new TextField();
	capacity = new IntField(0);
	qty = new IntField(0);
	posx = new IntField(0);
	posy = new IntField(0);
	posz = new IntField(0);

	constructor(id: number) {
		super("stockLocation", id);
	}

	toString(): string {
		return `編號: ${this.id.value} 位置: (${this.posx.value}, ${this.posy.value}, ${this.posz.value})`;
	}
}

export interface StockLocationFormProps extends FormProps<StockLocationEntity> {
}

export class StockLocationForm extends React.Component<StockLocationFormProps, {}> {
	render() {
		return (
			<div className={this.props.className}>
				<div className="row">
					<div className="col-md-4">
						<NumberInputGroup label="最大容量" field={this.props.entity.capacity} readOnly={this.props.readOnly} required={true}/>
					</div>
					<div className="col-md-4">
						<NumberInputGroup label="使用容量" field={this.props.entity.qty} readOnly={this.props.readOnly} required={true}/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<NumberInputGroup label="位置X" field={this.props.entity.posx} readOnly={this.props.readOnly} required={true}/>
					</div>
					<div className="col-md-4">
						<NumberInputGroup label="位置Y" field={this.props.entity.posy} readOnly={this.props.readOnly} required={true}/>
					</div>
					<div className="col-md-4">
						<NumberInputGroup label="位置Z" field={this.props.entity.posz} readOnly={this.props.readOnly} required={true}/>
					</div>
				</div>
			</div>
		);
	}
}
