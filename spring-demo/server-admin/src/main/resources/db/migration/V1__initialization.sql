-- region account

CREATE TABLE account (
	account_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	password   VARCHAR(255),
	email      VARCHAR(50) UNIQUE,
	last_name  VARCHAR(30),
	first_name VARCHAR(30),
	active     BOOLEAN DEFAULT FALSE,
	-- auditing
	created_at DATETIME    DEFAULT CURRENT_TIMESTAMP,
	created_by BIGINT UNSIGNED,
	updated_at DATETIME    DEFAULT CURRENT_TIMESTAMP,
	updated_by BIGINT UNSIGNED,
	-- fk
	CONSTRAINT fk_account_created_by FOREIGN KEY (created_by) REFERENCES account (account_id) ON DELETE SET NULL,
	CONSTRAINT fk_account_updated_by FOREIGN KEY (updated_by) REFERENCES account (account_id) ON DELETE SET NULL
);

CREATE TABLE social_account (
	social_id        VARCHAR(50)  NOT NULL PRIMARY KEY,
	account_id       BIGINT UNSIGNED NOT NULL,
	provider_id      VARCHAR(50)  NOT NULL,
	provider_user_id VARCHAR(50)  NOT NULL,
	email            VARCHAR(50),
	last_name        VARCHAR(30),
	first_name       VARCHAR(30),
	active           BOOLEAN DEFAULT FALSE,
	-- auditing
	created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
	created_by       BIGINT UNSIGNED,
	updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_by       BIGINT UNSIGNED,
	-- fk
	CONSTRAINT fk_social_account_account_id FOREIGN KEY (account_id) REFERENCES account (account_id) ON DELETE CASCADE,
	CONSTRAINT fk_social_account_created_by FOREIGN KEY (created_by) REFERENCES account (account_id) ON DELETE SET NULL,
	CONSTRAINT fk_social_account_updated_by FOREIGN KEY (updated_by) REFERENCES account (account_id) ON DELETE SET NULL
);

CREATE TABLE role (
	role_id 	INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	role_name   VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE accounts_roles (
	account_id BIGINT UNSIGNED NOT NULL,
	role_id 	INT UNSIGNED NOT NULL,
	PRIMARY KEY (account_id, role_id),
	-- fk
	CONSTRAINT fk_accounts_roles_account_id FOREIGN KEY (account_id) REFERENCES account (account_id) ON DELETE CASCADE,
	CONSTRAINT fk_accounts_roles_role_id FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE CASCADE
);

CREATE TABLE permission (
	permission_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	permission_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE roles_permissions (
	role_id INT UNSIGNED NOT NULL,
	permission_id INT UNSIGNED NOT NULL,
	PRIMARY KEY (role_id, permission_id),
	-- fk
	CONSTRAINT fk_roles_permissions_role_id FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE CASCADE,
	CONSTRAINT fk_roles_permissions_permission_id FOREIGN KEY (permission_id) REFERENCES permission (permission_id) ON DELETE CASCADE
);

-- endregion account


-- region product

CREATE TABLE product (
	product_id   BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	product_name VARCHAR(100) NOT NULL,
	note         VARCHAR(255),
	active       BOOLEAN DEFAULT FALSE,
	-- attribute
	brand        VARCHAR(100),
	model        VARCHAR(50),
	component    VARCHAR(50),
	type         VARCHAR(50),
	part_number  VARCHAR(50),
	-- auditing
	created_at   DATETIME    DEFAULT CURRENT_TIMESTAMP,
	created_by   BIGINT UNSIGNED,
	updated_at   DATETIME    DEFAULT CURRENT_TIMESTAMP,
	updated_by   BIGINT UNSIGNED,
	-- fk
	CONSTRAINT fk_product_created_by FOREIGN KEY (created_by) REFERENCES account (account_id) ON DELETE SET NULL,
	CONSTRAINT fk_product_updated_by FOREIGN KEY (updated_by) REFERENCES account (account_id) ON DELETE SET NULL
);

-- endregion product


-- region stock

CREATE TABLE stock_warehouse (
	id 			BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name 		VARCHAR(255),
	address 	VARCHAR(255),
	-- auditing
	created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
	created_by       BIGINT UNSIGNED,
	updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_by       BIGINT UNSIGNED,
	-- fk
	CONSTRAINT fk_stock_warehouse_created_by FOREIGN KEY (created_by) REFERENCES account (account_id) ON DELETE SET NULL,
	CONSTRAINT fk_stock_warehouse_updated_by FOREIGN KEY (updated_by) REFERENCES account (account_id) ON DELETE SET NULL
);

CREATE TABLE stock_location (
	id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	warehouse_id BIGINT UNSIGNED NOT NULL,
	qrcode VARCHAR(255),
	posx INT,
	posy INT,
	posz INT,
	capacity INT DEFAULT 0,
	qty INT DEFAULT 0,
	-- auditing
	created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
	created_by       BIGINT UNSIGNED,
	updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_by       BIGINT UNSIGNED,
	-- fk
	CONSTRAINT fk_stock_location_created_by FOREIGN KEY (created_by) REFERENCES account (account_id) ON DELETE SET NULL,
	CONSTRAINT fk_stock_location_updated_by FOREIGN KEY (updated_by) REFERENCES account (account_id) ON DELETE SET NULL,
	CONSTRAINT fk_stock_location_warehouse_id FOREIGN KEY (warehouse_id) REFERENCES stock_warehouse (id) ON DELETE CASCADE
);

CREATE TABLE stock_inventory (
	id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	product_id BIGINT UNSIGNED,
	total_qty INT DEFAULT 0,
	-- auditing
	created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
	created_by       BIGINT UNSIGNED,
	updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_by       BIGINT UNSIGNED,
	-- fk
	CONSTRAINT fk_inventory_product_id FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE SET NULL,
	CONSTRAINT fk_inventory_created_by FOREIGN KEY (created_by) REFERENCES account (account_id) ON DELETE SET NULL,
	CONSTRAINT fk_inventory_updated_by FOREIGN KEY (updated_by) REFERENCES account (account_id) ON DELETE SET NULL
);

CREATE TABLE stock_inventory_line (
	id 				BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	product_id 		BIGINT UNSIGNED,
	inventory_id 	BIGINT UNSIGNED NOT NULL,
	warehouse_id 	BIGINT UNSIGNED,
	location_id		BIGINT UNSIGNED,
	qty 			INT DEFAULT 0,
	state			ENUM('done'),
	-- auditing
	created_at		DATETIME DEFAULT CURRENT_TIMESTAMP,
	created_by		BIGINT UNSIGNED,
	updated_at		DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_by		BIGINT UNSIGNED,
	-- fk
	CONSTRAINT fk_inventory_line_product_id FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE SET NULL,
	CONSTRAINT fk_inventory_line_inventory_id FOREIGN KEY (inventory_id) REFERENCES stock_inventory (id) ON DELETE CASCADE,
	CONSTRAINT fk_inventory_line_warehouse_id FOREIGN KEY (warehouse_id) REFERENCES stock_warehouse (id) ON DELETE SET NULL,
	CONSTRAINT fk_inventory_line_location_id FOREIGN KEY (location_id) REFERENCES stock_location (id) ON DELETE SET NULL,
	CONSTRAINT fk_inventory_line_created_by FOREIGN KEY (created_by) REFERENCES account (account_id) ON DELETE SET NULL,
	CONSTRAINT fk_inventory_line_updated_by FOREIGN KEY (updated_by) REFERENCES account (account_id) ON DELETE SET NULL
);

CREATE TABLE stock_warehouse_move (
	id 					BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	note 				VARCHAR(255),
	inventory_line_id   BIGINT UNSIGNED NOT NULL,
	warehouse_src_id 	BIGINT UNSIGNED,
	location_src_id 	BIGINT UNSIGNED,
	warehouse_dest_id 	BIGINT UNSIGNED,
	location_dest_id 	BIGINT UNSIGNED,
	-- auditing
	created_at		DATETIME DEFAULT CURRENT_TIMESTAMP,
	created_by		BIGINT UNSIGNED,
	updated_at		DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_by		BIGINT UNSIGNED,
	-- fk
	CONSTRAINT fk_stock_warehouse_move_created_by FOREIGN KEY (created_by) REFERENCES account (account_id) ON DELETE SET NULL,
	CONSTRAINT fk_stock_warehouse_move_updated_by FOREIGN KEY (updated_by) REFERENCES account (account_id) ON DELETE SET NULL,
	CONSTRAINT fk_stock_warehouse_move_warehouse_src_id FOREIGN KEY (warehouse_src_id) REFERENCES stock_warehouse(id) ON DELETE SET NULL,
	CONSTRAINT fk_stock_warehouse_move_warehouse_dest_id FOREIGN KEY (warehouse_dest_id) REFERENCES stock_warehouse(id) ON DELETE SET NULL,
	CONSTRAINT fk_stock_warehouse_move_location_src_id FOREIGN KEY (location_src_id) REFERENCES stock_location(id) ON DELETE SET NULL,
	CONSTRAINT fk_stock_warehouse_move_location_dest_id FOREIGN KEY (location_dest_id) REFERENCES stock_location(id) ON DELETE SET NULL
);

-- endregion stock
