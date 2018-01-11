import * as React from "react";
import HotTable from "react-handsontable";

interface FullHotTableProps extends React.HTMLAttributes<HTMLDivElement> {
	data: Array<any>;
	settings: { [s: string]: any };
}

interface FullHotTableState {
	width: number;
	height: number;
}

export class FullHotTable extends React.Component<FullHotTableProps, FullHotTableState> {
	private _element: HTMLDivElement;

	state = {
		width: 0,
		height: 0,
	};

	private _onResize = (event: Event = null) => {
		const rect = this._element.getBoundingClientRect();
		console.log("resize", rect);
		this.setState({
			width: rect.width,
			height: rect.height
		});
	};

	componentDidMount() {
		this._onResize();
		window.addEventListener("resize", this._onResize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this._onResize);
	}

	render() {
		return <div ref={el => this._element = el} className={this.props.className}>
			<HotTable data={this.props.data} settings={this.props.settings} width={this.state.width} height={this.state.height}/>
		</div>;
	}
}
