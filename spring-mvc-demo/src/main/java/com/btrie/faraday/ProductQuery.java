package com.btrie.faraday;

import java.util.List;

public class ProductQuery {
	private String name;
	private ProductModel model;
	private List<ProductType> type;
	private Warehouse warehouse;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ProductModel getModel() {
		return model;
	}

	public void setModel(ProductModel model) {
		this.model = model;
	}

	public List<ProductType> getType() {
		return type;
	}

	public void setType(List<ProductType> type) {
		this.type = type;
	}

	public Warehouse getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}

	@Override
	public String toString() {
		return "ProductQuery{" +
			"name='" + name + '\'' +
			", model=" + model +
			", type=" + type +
			", warehouse=" + warehouse +
			'}';
	}
}
