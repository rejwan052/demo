// Third-party libs
import * as React from 'react';
import {ChangeEvent} from "react";
import * as cx from "classnames";
import bind from "bind-decorator";

// Internal libs
import {PageStore} from "form";

// Styles
import "./PaginationBar.css";


export interface PaginationBarProps {
	pageStore: PageStore;
}


export class PaginationBar extends React.Component<PaginationBarProps, {}> {

	@bind
	onPageSizeChange(event: ChangeEvent<HTMLSelectElement>) {
		const {pageStore} = this.props;
		pageStore.onPageSizeChange(+event.target.value);
	}

	@bind
	hasPreviousPage(): boolean {
		const {pageStore} = this.props;
		return pageStore.page && pageStore.page.number - 1 >= 0;
	}

	@bind
	hasNextPage(): boolean {
		const {pageStore} = this.props;
		return pageStore.page && pageStore.page.number + 1 < pageStore.page.totalPages;
	}

	@bind
	previousPage() {
		const {pageStore} = this.props;

		if (this.hasPreviousPage()) {
			pageStore.onPageNumChange(pageStore.page.number - 1);
		}
	}

	@bind
	nextPage() {
		const {pageStore} = this.props;
		if (this.hasNextPage()) {
			pageStore.onPageNumChange(pageStore.page.number + 1);
		}
	}

	renderItems() {
		const {pageStore} = this.props;
		const {page} = pageStore;
		let min = Math.max(0, page.number - 2);
		let max = Math.min(page.totalPages, min + 5);
		if (max - 5 >= 0) {
			min = Math.min(min, max - 5);
		}

		const items = [];
		for (let i = min; i < max; i++) {
			const active = i === page.number;
			const onClick = active ? null : pageStore.onPageNumChange.bind(null, i);
			const href = active ? null : "#";
			items.push(<li key={i} className={cx("page-item", {active})}><a className="page-link" href={href} onClick={onClick}>{i + 1}</a></li>);
		}

		return items;
	}

	render() {
		const {pageStore} = this.props;

		let totalPages = 0;
		let pageItems = [];
		pageItems.push(<li key="previous" className={cx("page-item", {disabled: !this.hasPreviousPage()})}><a className="page-link" href="#" onClick={this.previousPage}>Previous</a></li>);
		pageItems.push(<li key="next" className={cx("page-item", {disabled: !this.hasNextPage()})}><a className="page-link" href="#" onClick={this.nextPage}>Next</a></li>);
		if (pageStore.page) {
			pageItems.splice(1, 0, ...this.renderItems());

			totalPages = pageStore.page.totalPages;
		}

		return (
			<div className="pagination-bar" style={{display: "flex"}}>
				<nav aria-label="Page navigation">
					<ul className="pagination">
						{pageItems}
					</ul>
				</nav>
				<span style={{padding: ".5rem .75rem"}}>Page Size: </span>
				<select style={{width: "3.5rem"}} className="form-control" onChange={this.onPageSizeChange}>
					{pageStore.pages.map(pageNum => <option key={pageNum} value={pageNum}>{pageNum}</option>)}
				</select>
				<span style={{padding: ".5rem .75rem"}}>Total Pages: {totalPages}</span>
			</div>
		);
	}
}
