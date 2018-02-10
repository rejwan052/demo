package com.btrie.faraday;

import java.util.stream.Stream;

public enum ProductType {
	None(0, "None"),
	Type1(1, "Type1"),
	Type2(2, "Type2"),
	Type3(3, "Type3"),
	;

	private int id;
	private String name;
	private static ProductType[] someValues;

	static {
		someValues = Stream.of(values()).filter(x -> x != None).toArray(ProductType[]::new);
	}

	ProductType(int id, String name) {
		this.id = id;
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public static ProductType valueOfId(int id) {
		for (ProductType productType : values()) {
			if (productType.id == id) {
				return productType;
			}
		}
		return None;
	}

	public static ProductType[] someValues() {
		return someValues;
	}

	@Override
	public String toString() {
		return "ProductType{" +
			"id=" + id +
			", name='" + name + '\'' +
			'}';
	}
}
