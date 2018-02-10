package com.btrie.faraday.config;

import com.btrie.faraday.ProductModel;
import com.btrie.faraday.ProductModelEditor;
import com.btrie.faraday.ProductType;
import com.btrie.faraday.ProductTypeEditor;
import com.btrie.faraday.Warehouse;
import com.btrie.faraday.WarehouseEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.support.WebBindingInitializer;

public class CustomBindingInitializer implements WebBindingInitializer {
	@Override
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(ProductModel.class, new ProductModelEditor());
		binder.registerCustomEditor(ProductType.class, new ProductTypeEditor());
		binder.registerCustomEditor(Warehouse.class, new WarehouseEditor());
	}
}
