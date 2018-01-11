// Third-party libs
import {action, observable} from "mobx";
import bind from "bind-decorator";
import {History} from "history";

// Internal libs
import {Field} from "form";
import {urlencode} from "urllib";
import * as rest from "rest";


export interface Page<T=any> {
	readonly content: T;
	readonly first: boolean;
	readonly last: boolean;
	readonly number: number;
	readonly numberOfElements: number;
	readonly sort: Sort;
	readonly pageable: Pageable;
	readonly totalElements: number;
	readonly totalPages: number;
}


export interface Sort {
	readonly sorted: boolean;
	readonly unsorted: boolean;
}


export interface Pageable {
	readonly offset: number;
	readonly pageNumber: number;
	readonly pageSize: number;
	readonly paged: boolean;
	readonly unpaged: number;
	readonly sort: Sort;
}

const SIZE = "size";
const PAGE = "page";

export abstract class PageStore<CONTENT=any> {
	@observable
	page: Page<CONTENT>;

	@observable
	pageNum = 0;

	@observable
	pageSize = 15;

	@observable
	pages = [this.pageSize, 2,  5, 10, 20, 50, 100];

	history: History;

	private extraParams = new Map<string, any>();

	constructor(private apiUrl: string) {
	}

	addExtraParam(key: string, value: any) {
		this.extraParams.set(key, value);
	}

	get content() {
		if (this.page && this.page.content) {
			return this.page.content;
		} else {
			return [];
		}
	}

	@action.bound
	onPageData(page: Page<CONTENT>) {
		this.page = page;
	}

	@action.bound
	onPageSizeChange(pageSize: number) {
		if (pageSize != null) {
			this.pageSize = pageSize;
			this.pageNum = 0; // reset page number
		}

		this.paginate();
	}

	@action.bound
	onPageNumChange(pageNum: number) {
		if (pageNum != null) {
			this.pageNum = pageNum;
		}

		this.paginate();
	}

	@bind
	onSearch() {
		this.pageNum = 0; // reset page number
		this.paginate();
	}

	protected buildUrl(): string {
		const fieldKeys = Object.keys(this).filter(x => this[x] instanceof Field);
		const params = fieldKeys.filter(key => this[key].dirty && this[key].value !== "")
			.reduce(
				(result, key) => {
					result[key] = this[key].value;
					return result;
				},
				{}
			);

		params[SIZE] = this.pageSize;
		params[PAGE] = this.pageNum;

		this.extraParams.forEach((value, key) => {
			params[key] = value;
		});

		const url = `${this.apiUrl}?${urlencode(params)}`;
		return url;
	}

	paginate(): Promise<Page<CONTENT>> {
		const url = this.buildUrl();
		return rest.get<Page>(url).then(data => {
			this.onPageData(data);
			return data;
		});
	}
}
