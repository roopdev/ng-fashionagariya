export interface Roles {
	reader: boolean;
	author?: boolean;
	admin?: boolean;
}

export class User {
	uid?: string;
	email: string;
	password: string;
	displayName: string;
	photoURL: string;
	status: string;
	isAdmin: boolean;
	roles: Roles;

	constructor(authData) {
		this.email = authData.email
		this.displayName = authData.displayName
		this.password = authData.password
		this.photoURL = authData.photoURL
		this.status = authData.status
		this.roles = { reader: true }
	}

}