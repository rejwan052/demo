package newbros.product

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import javax.inject.Inject

@Service
class ProductServiceImpl : ProductService {
	@Inject lateinit var productRepo: ProductRepo

	//region Product

	override fun searchProduct(request: ProductRequest, pageRequest: PageRequest): Page<Product> {
		return if (request.isEmptyData()) {
			productRepo.findAll(pageRequest)
		} else {
			productRepo.search(request, pageRequest)
		}
	}

	override fun getProduct(pageRequest: PageRequest): Page<Product> {
	    return productRepo.findAll(pageRequest)
	}

	override fun createProduct(product: Product): Product {
	    return productRepo.save(product)
	}

	override fun showProduct(productId: Long): Product? {
	    return productRepo.findById(productId).orElse(null)
	}

	override fun updateProduct(product: Product): Product {
	    return productRepo.save(product)
	}

	override fun destroyProduct(productId: Long) {
		productRepo.deleteById(productId)
	}

	//endregion Product
}
