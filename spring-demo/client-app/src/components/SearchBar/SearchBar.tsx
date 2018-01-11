// Third-party libs
import * as React from "react";
import Collapse from "reactstrap/lib/Collapse";
import {action, observable} from "mobx";
import {observer} from "mobx-react";
import bind from "bind-decorator";

// Internal libs
import {TextInput, TextField} from "form";

// Styles
import "./SearchBar.css";


export interface SearchBarProps {
	searchField: TextField;
	onSearch();
}


@observer
export class SearchBar extends React.Component<SearchBarProps, {}> {
	@observable
	isAdvance = false;

	@action.bound
	toggleAdvance(event: React.MouseEvent<HTMLButtonElement>) {
		this.isAdvance = !this.isAdvance;
	}

	@bind
	onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		this.props.onSearch();
	}

	render() {
		return (
			<form className="search-bar" onSubmit={this.onSubmit}>
				<div className="input-group">
					<TextInput field={this.props.searchField} placeholder="Search" />
					<div className="input-group-btn">
						<div className="btn-group" role="group">
							<button className="search-bar__clear btn btn-light" type="button">清除</button>
							<button
								className="search-bar__search-adv btn btn-secondary"
								type="button"
								onClick={this.toggleAdvance}
								aria-expanded="false"
								aria-controls="AdvancedSearch"
							>
								{this.isAdvance ? "簡單" : "進階"}
							</button>
							<button
								type="submit"
								className="search-bar__search-btn btn btn-primary"
							>
								<i className="fa fa-search" aria-hidden="true"/>
							</button>
						</div>
					</div>
				</div>
				<Collapse isOpen={this.isAdvance}>
					<div className="search-bar__adv-form card">
						{this.props.children}
					</div>
				</Collapse>
			</form>
		);
	}
}
