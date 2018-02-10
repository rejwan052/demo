package com.btrie.jsp;

import java.beans.PropertyEditorSupport;

public class ProductModelEditor extends PropertyEditorSupport {
	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (text == null || text.length() == 0) {
			setValue(null);
		} else {
			int id = Integer.parseInt(text);
			setValue(ProductModel.valueOfId(id));
		}
	}
}
