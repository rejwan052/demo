import * as React from "react";
import {MouseEvent} from "react";
import PropTypes from 'prop-types';
import {Link, LinkProps} from "react-router-dom";
import bind from "bind-decorator";


interface DropdownLinkProps extends LinkProps {

}

interface DropdownLinkContext {
	toggle();
}

export class DropdownLink extends React.Component<DropdownLinkProps, {}> {
	static contextTypes = {
		toggle: PropTypes.func
	};

	context: DropdownLinkContext;

	render() {
		return (
			<Link {...this.props} onClick={this.onClick} />
		);
	}

	@bind
	private onClick(e: MouseEvent<HTMLAnchorElement>) {
		this.context.toggle();
	}
}
