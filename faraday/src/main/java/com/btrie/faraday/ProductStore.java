package com.btrie.jsp;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

@Component
public class ProductStore {
	private Map<Integer, Product> entities = new HashMap<>();
	private int gen = 0;

	public Product find(int id) {
		return entities.get(id);
	}

	public List<Product> findAll(int size, ProductQuery query) {
		Stream<Product> stream = entities.values().stream();
		if (query.getName() != null && !query.getName().isEmpty()) {
			stream = stream.filter(p -> p.getName().toLowerCase().contains(query.getName().toLowerCase()));
		}

		if (query.getModel() != null && query.getModel() != ProductModel.None) {
			stream = stream.filter(p -> query.getModel() == p.getModel());
		}

		if (query.getType() != null && !query.getType().isEmpty()) {
			stream = stream.filter(p -> query.getType().contains(p.getType()));
		}

		if (query.getWarehouse() != null && query.getWarehouse() != Warehouse.None) {
			stream = stream.filter(p -> query.getWarehouse() == p.getWarehouse());
		}

		return stream.limit(size).collect(toList());
	}

	public Product delete(int id) {
		return entities.remove(id);
	}

	public void save(Product product) {
		if (product.getId() == 0) {
			product.setId(++gen);
		}
		entities.put(product.getId(), product);
	}
}
