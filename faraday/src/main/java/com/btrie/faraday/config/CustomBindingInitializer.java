package com.btrie.jsp.config;

import com.btrie.jsp.ProductModel;
import com.btrie.jsp.ProductModelEditor;
import com.btrie.jsp.ProductType;
import com.btrie.jsp.ProductTypeEditor;
import com.btrie.jsp.Warehouse;
import com.btrie.jsp.WarehouseEditor;
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
