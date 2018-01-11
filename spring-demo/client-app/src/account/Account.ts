// External
import {action, computed, observable, runInAction} from "mobx";
import * as H from "history";
// Internal
import * as rest from "rest";


export interface ClientCredential {
	readonly email: string;
	readonly password: string;
}

// interface Authentication {
// 	readonly isAuthenticated: boolean;
// 	readonly clientCredential: ClientCredential;
// }
//
export interface UserDetails {
	readonly email: string;
	readonly firstName: string;
	readonly lastName: string;
	// roles: ReadonlyArray<string>;
}

export class AccountService {
	@observable
	isAuthenticated: boolean = false;

	@observable
	errorMessage = "";

	@observable
	userDetails?: UserDetails = null;

	history: H.History;

	@action.bound
	clearErrorMessage() {
		this.errorMessage = "";
	}

	@action.bound
	setErrorMessage(errorMessage: string) {
		this.errorMessage = errorMessage;
	}

	@action
	autoLogin() {
		rest.post<UserDetails>("/api/login")
			.then(user => {
				// console.log("autologin", user);
				runInAction(() => {
					this.userDetails = user;
					this.isAuthenticated = true;
					this.clearErrorMessage();
				});
			})
			.catch(error => {
				// runInAction(() => {
				// 	this.setErrorMessage(error.message);
				// });
			});
	}

	@action.bound
	login(credential: ClientCredential) {
		rest.basicLogin<UserDetails>("/api/login", credential.email, credential.password)
			.then(user => {
				runInAction(() => {
					this.userDetails = user;
					this.isAuthenticated = true;
					this.clearErrorMessage();
				});
			})
			.catch(error => {
				runInAction(() => {
					this.setErrorMessage(error.message);
				});
			});
	}

	@action.bound
	logout() {
		rest.post("/api/logout")
			.then(data => {
				runInAction(() => {
					this.isAuthenticated = false;
					this.clear();

					this.history.replace("/login");
				});
			})
			.catch(error => {
				runInAction(() => {
					this.setErrorMessage(error.message);
					// console.log(error);
					this.isAuthenticated = false;
					this.clear();
				});
			});
	}

	@action.bound
	updateUser(user: UserDetails) {
		this.userDetails = user;
		rest.patch<UserDetails>("/api/user", user)
			.then(data => {
				// console.log("Update User OK");
			})
			.catch(error => {
				// console.error("Update User Fail " + error);
				this.autoLogin();
			});
	}

	private clear(): void {
		this.errorMessage = "";
		this.userDetails = null;
	}
}
