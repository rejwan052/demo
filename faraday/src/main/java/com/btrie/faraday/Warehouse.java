package com.btrie.jsp;

public enum Warehouse {
	None(0, "None"),
	W1(1, "W1"),
	W2(2, "W2"),
	W3(3, "W3"),
	;

	private int id;
	private String name;

	Warehouse(int id, String name) {
		this.id = id;
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public static Warehouse valueOfId(int id) {
		for (Warehouse warehouse : values()) {
			if (warehouse.id == id) {
				return warehouse;
			}
		}

		return None;
	}
}
