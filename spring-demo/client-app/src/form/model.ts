import {action} from "mobx";
import * as rest from "rest";
import {IntField, Field} from "./Input";

export abstract class AbstractEntity {
	dto: any;
	id = new IntField(0);
	parent: AbstractEntity;

	constructor(public entityName: string, id: number) {
		this.id.value = id;
	}

	get showUrl(): string {
		if (this.parent) {
			return `${this.parent.showUrl}/${this.entityName}/${this.id.value}`;
		} else {
			return `/${this.entityName}/${this.id.value}`;
		}
	}

	get editUrl(): string {
		if (this.parent) {
			return `${this.parent.showUrl}/${this.entityName}/${this.id.value}/edit`;
		} else {
			return `/${this.entityName}/${this.id.value}/edit`;
		}
	}

	@action.bound
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
		return rest.post(`/api/${this.entityName}`, dto);
	}

	@action.bound
	updateEntity(dto: any) {
		const fieldKeys = Object.keys(this).filter(x => this[x] instanceof Field);
		for (let fieldKey of fieldKeys) {
			const field = this[fieldKey];
			field.value = dto[fieldKey];
		}

		this.dto = dto;
		return dto;
	}

	show() {
		return rest.get(`/api/${this.entityName}/${this.id.value}`)
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

		return rest.put(`/api/${this.entityName}`, dto);
	}

	@action.bound
	destroy() {
		return rest.destroy(`/api/${this.entityName}/${this.id.value}`);
	}
}


export interface FormProps<T extends AbstractEntity> {
	entity: T;
	className?: string;
	readOnly?: boolean;
	hideId?: boolean;
}
