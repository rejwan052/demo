package com.btrie.jsp;

public enum ProductModel {
	None(0, "None"),
	M1(1, "M1"),
	M2(2, "M2"),
	M3(3, "M3"),
	;

	private int id;
	private String name;

	ProductModel(int id, String name) {
		this.id = id;
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public static ProductModel valueOfId(int id) {
		for (ProductModel productModel : values()) {
			if (productModel.id == id)
				return productModel;
		}
		return None;
	}

	@Override
	public String toString() {
		return "ProductModel{" +
			"id=" + id +
			", name='" + name + '\'' +
			'}';
	}
}
