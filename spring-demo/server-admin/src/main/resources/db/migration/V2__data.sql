-- account

INSERT INTO
	account (account_id, password, email, last_name, first_name, active)
VALUES
	(1, "asdf", "user@btrie.com", "Lin", "Neil", TRUE),
	(2, "asdf", "admin@btrie.com", "Lin", "Admin", TRUE);

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

-- product

INSERT INTO
	product (product_id, product_name, note, active, brand, model, component, type, part_number, created_by, updated_by)
VALUES
	(1, "AAA", "no comment", TRUE, "ABrand", "M0001", "C01", "AType", "P1", 1, 1),
	(2, "BBB", "no comment", TRUE, "BBrand", "M0002", "C02", "AType", "P2", 1, 1),
	(3, "CCC", "no comment", TRUE, "CBrand", "M0003", "C02", "BType", "P1", 1, 1),
	(4, "DDD", "no comment", TRUE, "DBrand", "M0004", "C02", "CType", "P2", 1, 1),
	(5, "EEE", "no comment", TRUE, "CBrand", "M0001", "C02", "BType", "P1", 1, 1),
	(6, "FFF", "no comment", TRUE, "CBrand", "M0001", "C01", "BType", "P3", 1, 1),
	(7, "GGG", "no comment", TRUE, "ABrand", "M0001", "C01", "AType", "P1", 1, 1),
	(8, "HHH", "no comment", TRUE, "CBrand", "M0002", "C03", "BType", "P2", 1, 1),
	(9, "III", "no comment", TRUE, "BBrand", "M0003", "C04", "CType", "P1", 2, 2),
	(10, "JJJ", "no comment", TRUE, "ABrand", "M0002", "C04", "BType", "P4", 2, 2),
	(11, "KKK", "no comment", TRUE, "BBrand", "M0002", "C04", "AType", "P1", 2, 2),
	(12, "LLL", "no comment", TRUE, "BBrand", "M0001", "C05", "BType", "P3", 2, 2),
	(13, "MMM", "no comment", TRUE, "ABrand", "M0001", "C06", "CType", "P1", 2, 2),
	(14, "NNN", "no comment", TRUE, "ABrand", "M0003", "C01", "BType", "P2", 2, 2),
	(15, "OOO", "no comment", TRUE, "CBrand", "M0002", "C02", "BType", "P1", 2, 2),
	(16, "PPP", "no comment", TRUE, "CBrand", "M0002", "C03", "BType", "P2", 2, 2),
	(17, "QQQ", "no comment", TRUE, "CBrand", "M0002", "C04", "BType", "P1", 2, 2),
	(18, "RRR", "no comment", TRUE, "CBrand", "M0002", "C05", "BType", "P3", 2, 2),
	(19, "SSS", "no comment", TRUE, "CBrand", "M0002", "C06", "BType", "P1", 2, 2),
	(20, "TTT", "no comment", TRUE, "CBrand", "M0002", "C01", "BType", "P1", 2, 2),
	(21, "UUU", "no comment", TRUE, "CBrand", "M0002", "C02", "CType", "P2", 2, 2),
	(22, "VVV", "no comment", TRUE, "CBrand", "M0002", "C03", "CType", "P3", 2, 2),
	(23, "WWW", "no comment", TRUE, "CBrand", "M0002", "C04", "CType", "P1", 2, 2),
	(24, "XXX", "no comment", TRUE, "CBrand", "M0002", "C05", "CType", "P1", 2, 2),
	(25, "YYY", "no comment", TRUE, "CBrand", "M0002", "C06", "BType", "P2", 2, 2),
	(26, "ZZZ", "no comment", TRUE, "CBrand", "M0002", "C01", "BType", "P1", 2, 2);


-- stock

INSERT INTO
	stock_warehouse (id, name, address, created_by, updated_by)
VALUES
	(1, "W1", "qwer", 1, 1),
	(2, "W2", "asdf", 1, 1),
	(3, "W3", "zxcv", 1, 1),
	(4, "W4", "tyui", 1, 1),
	(5, "W5", "ghjk", 1, 1);


INSERT INTO
	stock_location (id, warehouse_id, qrcode, posx, posy, posz, capacity, qty, created_by, updated_by)
VALUES
	(1, 1, "qwer-1234", 1, 1, 0, 10, 5, 1, 1),
	(2, 1, "qwer-5678", 1, 2, 0, 5, 3, 1, 1),
	(3, 1, "asdf-1234", 1, 3, 0, 6, 3, 1, 1),
	(4, 1, "asdf-5678", 1, 4, 0, 5, 2, 1, 1),
	(5, 1, "zxcv-1234", 1, 5, 0, 7, 4, 1, 1),
	(6, 2, "zxcv-5678", 1, 1, 0, 3, 2, 1, 1),
	(7, 3, "tyui-1234", 1, 1, 0, 9, 1, 1, 1),
	(8, 4, "tyui-5678", 1, 1, 0, 2, 3, 1, 1),
	(9, 5, "ghjk-1234", 1, 1, 0, 10, 5, 1, 1);


INSERT INTO
	stock_inventory (id, product_id, total_qty, created_by, updated_by)
VALUES
	(1, 1, 3, 1, 1),
	(2, 2, 1, 1, 1),
	(3, 3, 2, 1, 1),
	(4, 4, 3, 1, 1),
	(5, 5, 4, 1, 1),
	(6, 6, 2, 1, 1),
	(7, 7, 5, 1, 1),
	(8, 8, 3, 1, 1),
	(9, 9, 2, 1, 1),
	(10, 10, 3, 1, 1),
	(11, 11, 0, 1, 1),
	(12, 12, 0, 1, 1),
	(13, 13, 0, 1, 1),
	(14, 14, 0, 1, 1),
	(15, 15, 0, 1, 1),
	(16, 16, 0, 1, 1),
	(17, 17, 0, 1, 1),
	(18, 17, 0, 1, 1),
	(19, 18, 0, 1, 1),
	(20, 19, 0, 1, 1),
	(21, 20, 0, 1, 1),
	(22, 21, 0, 1, 1),
	(23, 22, 0, 1, 1),
	(24, 23, 0, 1, 1),
	(25, 24, 0, 1, 1),
	(26, 25, 0, 1, 1),
	(27, 26, 0, 1, 1);


INSERT INTO
	stock_inventory_line (id, product_id, inventory_id, warehouse_id, location_id, qty, created_by, updated_by)
VALUES
	(1, 1, 1, 1, 1, 1, 1, 1),
	(2, 1, 1, 2, 1, 1, 1, 1),
	(3, 1, 1, 3, 2, 1, 1, 1),
	(4, 2, 2, 1, 2, 1, 1, 1),
	(5, 3, 3, 1, 4, 1, 1, 1),
	(6, 3, 3, 2, 2, 1, 1, 1),
	(7, 4, 4, 1, 4, 1, 1, 1),
	(8, 4, 4, 2, 1, 1, 1, 1),
	(9, 4, 4, 3, 5, 1, 1, 1),
	(10, 5, 5, 1, 6, 1, 1, 1),
	(11, 5, 5, 2, 5, 1, 1, 1),
	(12, 5, 5, 3, 7, 1, 1, 1),
	(13, 5, 5, 1, 8, 1, 1, 1),
	(14, 6, 6, 1, 1, 1, 1, 1),
	(15, 6, 6, 2, 6, 1, 1, 1),
	(16, 7, 7, 1, 3, 1, 1, 1),
	(17, 7, 7, 2, 8, 1, 1, 1),
	(18, 7, 7, 3, 8, 1, 1, 1),
	(19, 7, 7, 1, 1, 1, 1, 1),
	(20, 7, 7, 2, 9, 1, 1, 1),
	(21, 8, 8, 1, 3, 1, 1, 1),
	(22, 8, 8, 2, 9, 1, 1, 1),
	(23, 8, 8, 3, 9, 1, 1, 1),
	(24, 9, 9, 1, 3, 1, 1, 1),
	(25, 9, 9, 2, 5, 1, 1, 1),
	(26, 10, 10, 1, 5, 1, 1, 1),
	(27, 10, 10, 2, 9, 1, 1, 1),
	(28, 10, 10, 3, 9, 1, 1, 1);


