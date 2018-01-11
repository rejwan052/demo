const FORMDATA_CONTENT_TYPE = "application/x-www-form-urlencoded; charset=utf-8";

const defaultHeaders = {
	"Accept": "application/json",
	"Content-Type": "application/json",
};


class HttpError extends Error {
	constructor(response: Response) {
		super(response.statusText);
	}
}

export function basicLogin<TRespData>(url: string, username: string, password: string): Promise<TRespData> {
	const Authorization = "Basic " + btoa(username + ":" + password);
	const headers = new Headers();
	headers.append("Accept", "application/json");
	headers.append("Authorization", Authorization);

	return fetch(url, {method: "POST", headers, credentials: "include"})
		.then(resp => {
			if (resp.ok) {
				return resp.json().then(data => data as TRespData);
			} else {
				throw new HttpError(resp);
			}
		});
}

export function get<TRespData>(url: string): Promise<TRespData> {
	const headers = new Headers(defaultHeaders);
	return fetch(url, {method: "GET", headers, credentials: "include"})
		.then(response => handleResponse<TRespData>(response));
}

export function post<TRespData>(url: string, formdata?: any): Promise<TRespData> {
	const headers = new Headers(defaultHeaders);
	let options: RequestInit = {method: "POST", headers, credentials: "include"};
	if (formdata) {
		options.body  = JSON.stringify(formdata);
	}

	return fetch(url, options).then(response => handleResponse<TRespData>(response));
}

export function patch<TRespData>(url: string, data: any): Promise<TRespData> {
	const headers = new Headers(defaultHeaders);
	let options: RequestInit = {method: "PATCH", headers, credentials: "include"};
	if (data) {
		options.body  = JSON.stringify(data);
	}

	return fetch(url, options).then(response => handleResponse<TRespData>(response));
}

export function put<TRespData>(url: string, data: any): Promise<TRespData> {
	const headers = new Headers(defaultHeaders);
	let options: RequestInit = {method: "PUT", headers, credentials: "include"};
	if (data) {
		options.body  = JSON.stringify(data);
	}

	return fetch(url, options).then(response => handleResponse<TRespData>(response));
}

export function destroy<TRespData>(url: string): Promise<TRespData> {
	const headers = new Headers(defaultHeaders);
	let options: RequestInit = {method: "DELETE", headers, credentials: "include"};
	return fetch(url, options).then(response => {
		if (response.ok) {
			return null;
		} else {
			throw new HttpError(response);
		}
	});
}

function handleResponse<TRespData>(response: Response): Promise<TRespData> {
	if (response.ok) {
		// no content
		if (response.status === 204) {
			return null;
		} else {
			return response.json().then(data => data as TRespData);
		}
	} else {
		throw new HttpError(response);
	}
}
