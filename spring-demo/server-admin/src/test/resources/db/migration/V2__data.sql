INSERT INTO
	account (account_id, password, email, last_name, first_name, active)
VALUES
	(1, "asdf", "user@btrie.com", "Btrie", "User", TRUE),
	(2, "asdf", "admin@btrie.com", "Btrie", "Admin", TRUE);

INSERT INTO
	role (role_id, role_name)
VALUES
	(1, "ROLE_USER"),
	(2, "ROLE_ADMIN");

INSERT INTO
	accounts_roles (account_id, role_id)
VALUES
	(1, 1),
	(2, 2);

INSERT INTO
	permission (permission_id, permission_name)
VALUES
	(1, "PRODUCT_READ"),
	(2, "PRODUCT_WRITE"),
	(3, "PRODUCT_ADMIN");

INSERT INTO
	roles_permissions (role_id, permission_id)
VALUES
	(1, 1),
	(2, 3);
