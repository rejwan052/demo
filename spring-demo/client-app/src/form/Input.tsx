import * as React from "react";
import {ChangeEvent, FocusEvent} from "react";
import {action, computed, observable, observe} from "mobx";
import {observer} from "mobx-react";
import * as cx from "classnames";
import Select, {
	Option, Async, AsyncCreatable, AutocompleteResult, ReactSelectProps,
	ReactAsyncSelectProps
} from "react-select";

// Styles
import "./select.css";


export abstract class Field<T> {
	@observable value: T;
	@observable valid: boolean = true;
	@observable dirty: boolean = false;

	constructor(value: T) {
		this.value = value;
	}

	// FIXME 不該直接傳 DOM Event

	abstract inputToValue(value: string): T;
	abstract validate(value: T): boolean;

	@action.bound
	onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (!this.dirty) {
			this.dirty = true;
		}

		this.value = this.inputToValue(event.target.value);
		this.valid = this.validate(this.value);
	}

	@action.bound
	onBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (!this.dirty) {
			this.dirty = true;
			this.valid = this.validate(this.value);
		}
	}
}


export class TextField extends Field<string> {
	constructor(text: string = "") {
		super(text);
	}

	inputToValue(value: string): string {
		return value;
	}

	validate(value: string): boolean {
		return value && value.length > 0;
	}
}


export class IntField extends Field<number> {
	constructor(n: number = 0) {
		super(n);
	}

	inputToValue(value: string): number {
		return +value;
	}

	validate(value: number): boolean {
		return Number.isInteger(value);
	}
}


interface InputProps {
	field: Field<any>;
	label?: string;
	placeholder?: string;
	pattern?: string;
	required?: boolean;
	className?: string;
	readOnly?: boolean;
}


const buildInput = (inputType: string, props: InputProps) => (
	<input
		type={inputType}
		className="form-control"
		pattern={props.pattern}
		required={props.required}
		value={props.field.value}
		placeholder={props.placeholder}
		readOnly={props.readOnly}
		onChange={props.field.onChange}
		onBlur={props.field.onBlur}
	/>
);


const buildInputGroup = (inputType: string, props: InputProps) => (
	<div className={cx(props.className, "form-group", {"was-validated": props.field.dirty})}>
		<label>{props.label}</label>
		{buildInput(inputType, props)}
	</div>
);


export const TextInput = observer((props: InputProps) => buildInput("text", props));
export const EmailInput = observer((props: InputProps) => buildInput("email", props));
export const PasswordInput = observer((props: InputProps) => buildInput("password", props));

export const TextInputGroup = observer((props: InputProps) => buildInputGroup("text", props));
export const NumberInputGroup = observer((props: InputProps) => buildInputGroup("number", props));
export const EmailInputGroup = observer((props: InputProps) => buildInputGroup("email", props));
export const PasswordInputGroup = observer((props: InputProps) => buildInputGroup("password", props));


interface TextareaProps {
	field: Field<any>;
	label?: string;
	placeholder?: string;
	pattern?: string;
	required?: boolean;
	className?: string;
	readOnly?: boolean;
	rows?: number;
	maxlength?: number;
	minlength?: number;
}

export const TextareaGroup = observer((props: TextareaProps) => (
	<div className={cx(props.className, "form-group", {"was-validated": props.field.dirty})}>
		<label>{props.label}</label>
		<textarea
			className="form-control"
			required={props.required}
			value={props.field.value}
			placeholder={props.placeholder}
			readOnly={props.readOnly}
			onChange={props.field.onChange}
			onBlur={props.field.onBlur}
			rows={props.rows}
		/>
	</div>
));


export abstract class SelectField<T> extends Field<T> {
	@observable values: T[];

	inputToValue(value: string): T {
		return undefined;
	}

	validate(value: T): boolean {
		return true;
	}

	@computed get option(): Option<T> {
		return {label: this.getLabelFromValue(this.value), value: this.value};
	}

	@computed get options(): Option<T>[] {
		return this.values ? this.values.map(x => ({label: this.getLabelFromValue(x), value: x})) : [];
	}

	@action
	setOptionValues(values: T[]) {
		this.values = values;
	}

	@action.bound
	onOptionChange(opt: Option<T>) {
		const value = opt ? opt.value : null;
		if (!this.dirty && this.value !== value) {
			this.dirty = true;
		}

		this.value = value;
		this.valid = this.validate(this.value);
	}

	abstract getLabelFromValue(value?: T): string;
	abstract loadOptions(input: string): Promise<AutocompleteResult<T>>;
}

interface SelectInputProps<T> {
	field: SelectField<T>;
	required?: boolean;
	className?: string;
	readOnly?: boolean;
	label?: string;
}

const buildSelect = function <T>(props: SelectInputProps<T>) {
	return React.createElement(Async, {
		value: props.field.option,
		onChange: props.field.onOptionChange,
		// options: props.field.options,
		loadOptions: props.field.loadOptions,
		filterOptions: null,
		required: props.required,
		className: "form-control",
		disabled: props.readOnly,
	});
};

export const createSelectInputClass = function <T>() {
	return observer((props: SelectInputProps<T>) => buildSelect(props));
};

export const createSelectInputGroupClass = function <T>() {
	return observer((props: SelectInputProps<T>) => (
		<div className={cx(props.className, "form-group", {"was-validated": props.field.dirty})}>
			<label>{props.label}</label>
			{buildSelect(props)}
		</div>
	));
};
