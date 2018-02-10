package com.btrie.faraday;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FaradayApplication {

	@Bean
	public CommandLineRunner init(ProductStore store) {
		return (String... args) -> {
			// Generate test fixtures
			for (int i = 1; i < 100; i++) {
				Product product = new Product();
				product.setName("P" + i);
				product.setModel(ProductModel.valueOfId((int) (Math.random() * ProductModel.values().length)));
				product.setType(ProductType.valueOfId((int) (Math.random() * ProductType.values().length)));
				product.setWarehouse(Warehouse.valueOfId((int) (Math.random() * ProductType.values().length)));
				store.save(product);
			}
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(FaradayApplication.class, args);
	}
}
