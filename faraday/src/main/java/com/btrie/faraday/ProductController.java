package com.btrie.jsp;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.ServletWebRequest;

import javax.inject.Inject;
import java.util.List;


@Controller
public class ProductController {
	@Inject
	private ProductStore productStore;

	@GetMapping("/product")
	public String listProduct(@RequestParam(defaultValue = "5") int size, @ModelAttribute ProductQuery productQuery, Model model) {
		List<Product> products = productStore.findAll(size, productQuery);
		System.out.println(productQuery);
		model.addAttribute("products", products);
		model.addAttribute("allModels", ProductModel.values());
		model.addAttribute("allTypes", ProductType.someValues());
		model.addAttribute("allWarehouses", Warehouse.values());
		return "product/listProduct";
	}

	@GetMapping("/product/new")
	public String newProduct(@ModelAttribute Product product) {
		return "product/newProduct";
	}

	@PostMapping("/product")
	public String createProduct(Product productDTO) {
		productStore.save(productDTO);
		return "redirect:/product/" + productDTO.getId();
	}

	@GetMapping("/product/{id}")
	public String showProduct(@PathVariable int id, Model model) {
		Product product = productStore.find(id);
		model.addAttribute("product", product);
		return "product/showProduct";
	}

	@GetMapping("/product/{id}/edit")
	public String editProduct(@PathVariable int id, Model model) {
		Product product = productStore.find(id);
		model.addAttribute("product", product);
		return "product/editProduct";
	}

	@PutMapping("/product/{id}")
	public String putProduct(@PathVariable int id, Product product) {
		productStore.save(product);
		return "redirect:/product/" + product.getId();
	}

	@DeleteMapping("/product/{id}")
	public String deleteProduct(@PathVariable int id, ServletWebRequest request) {
		productStore.delete(id);
		return "redirect:" + request.getRequest().getHeader("referer");
	}
}
