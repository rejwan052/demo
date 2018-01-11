import * as React from "react";
import {FormEvent} from "react";
import bind from "bind-decorator";
import {History} from "history";
import {AbstractEntity} from "./model";


export interface EntityEditProps<ENTITY extends AbstractEntity> {
	entity: ENTITY;
	history: History;
}

export class EntityEdit extends React.Component<EntityEditProps<any>, {}> {
	@bind
	onConfirm(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		this.props.entity.update().then(result => {
			// this.props.history.push(this.props.entity.showUrl);
			// return result;
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
					Edit {this.props.entity.entityName}
				</div>
				<div className="card-body">
					{this.props.children}
				</div>
				<div className="card-footer d-flex">
					<button type="submit" className="btn btn-primary mr-auto-xs">Submit</button>
					<button type="reset" className="btn btn-secondary">Cancel</button>
				</div>
			</form>
		);
	}
}
