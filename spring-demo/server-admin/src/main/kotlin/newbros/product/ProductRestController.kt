package newbros.product

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.*
import javax.inject.Inject


@RequestMapping("/api")
@RestController
class ProductRestController {

	@Inject
	lateinit var productService: ProductService

	//region Product

	@GetMapping("/product")
	fun getProduct(
		@RequestParam(defaultValue = "0") page: Int,
		@RequestParam(defaultValue = "10") size: Int,
		productRequest: ProductRequest
	): Page<Product> {
		return productService.searchProduct(productRequest, PageRequest.of(page, size))
	}

	@PostMapping("/product")
	fun createProduct(@RequestBody product: Product): Product {
		return productService.createProduct(product)
	}

	@GetMapping("/product/{productId}")
	fun showProduct(@PathVariable productId: Long): Product? {
		return productService.showProduct(productId)
	}

	@PutMapping("/product/{productId}")
	fun updateProduct(@PathVariable productId: Long, @RequestBody product: Product): Product {
		return productService.updateProduct(product)
	}

	@DeleteMapping("/product/{productId}")
	fun destroyProduct(@PathVariable productId: Long) {
		productService.destroyProduct(productId)
	}

	//endregion Product
}
