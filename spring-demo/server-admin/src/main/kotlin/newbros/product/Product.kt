package newbros.product

import newbros.account.AuditingEntity
import org.hibernate.search.annotations.Analyzer
import org.hibernate.search.annotations.Field
import org.hibernate.search.annotations.Indexed
import org.hibernate.search.annotations.NumericField
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.jpa.repository.JpaRepository
import javax.persistence.*


@Entity
@Table(name = "product")
@Indexed
class Product : AuditingEntity() {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	var productId: Long = 0

	@Field
	@Column(name = "product_name")
	lateinit var productName: String

	@Field
	@Column(name =  "note")
	var note: String? = null

	@Column(name = "active")
	var active: Boolean = false

	// attribute

	@Field
	@Column(name = "brand")
	lateinit var brand: String

	@Field
	@Column(name = "model")
	lateinit var model: String

	@Field
	@Column(name = "component")
	lateinit var component: String

	@Field
	@Column(name = "type")
	var type: String? = null

	@Field
	@Column(name = "part_number")
	var partNumber: String? = null
}

interface DataClassEmptyCheck {
	fun isEmptyData(): Boolean {
		return this.javaClass.declaredFields.all { it.isAccessible = true; it.get(this) == null }
	}
}

data class ProductRequest(
	val search: String?,
	val productName: String?,
	val brand: String?,
	val component: String?,
	val model: String?,
	val type: String?,
	val partNumber: String?
) : DataClassEmptyCheck

interface ProductRepo : JpaRepository<Product, Long>, ProductSearchRepo {

}

interface ProductSearchRepo {
	fun search(request: ProductRequest, pageRequest: PageRequest): Page<Product>
}

interface ProductService {
	//region Product

	fun searchProduct(request: ProductRequest, pageRequest: PageRequest): Page<Product>
	fun getProduct(pageRequest: PageRequest): Page<Product>
	fun createProduct(product: Product): Product
	fun showProduct(productId: Long): Product?
	fun updateProduct(product: Product): Product
	fun destroyProduct(productId: Long)

	//endregion Product

}
