package newbros.stock

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import newbros.account.AuditingEntity
import newbros.product.DataClassEmptyCheck
import newbros.product.Product
import org.hibernate.search.annotations.Indexed
import org.hibernate.search.annotations.IndexedEmbedded
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.jpa.repository.JpaRepository
import javax.persistence.*


@Indexed
@Entity
@Table(name = "stock_inventory_line")
class InventoryLine: AuditingEntity() {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	var id: Long = 0

	@ManyToOne
	@JoinColumn(name = "product_id")
	@IndexedEmbedded
	lateinit var product: Product

//	@ManyToOne
//	@JoinColumn(name = "inventory_id")
//	@JsonBackReference
//	lateinit var inventory: Inventory
//
//	@Transient
//	var inventoryId: Long = 0
//		get() = inventory.id

	@Column(name = "qty")
	var qty: Int = 0

	@IndexedEmbedded
	@ManyToOne
	@JoinColumn(name = "location_id")
	lateinit var location: StockLocation
}

data class InventoryLineRequest(
	val search: String?,
	val productName: String?,
	val brand: String?,
	val component: String?,
	val model: String?,
	val type: String?,
	val partNumber: String?,
	val warehouseName: String?,
	val warehouseAddress: String?
): DataClassEmptyCheck


interface InventoryLineSearchRepo {
	fun search(request: InventoryLineRequest, pageRequest: PageRequest): Page<InventoryLine>
}


interface InventoryLineRepo: JpaRepository<InventoryLine, Long>, InventoryLineSearchRepo {
}


interface InventoryService {
	//region InventoryLine

	fun searchInventoryLine(request: InventoryLineRequest, pageRequest: PageRequest): Page<InventoryLine>
	fun getInventoryLine(pageRequest: PageRequest): Page<InventoryLine>
	fun createInventoryLine(inventoryLine: InventoryLine): InventoryLine
	fun showInventoryLine(inventoryLineId: Long): InventoryLine?
	fun updateInventoryLine(inventoryLine: InventoryLine): InventoryLine
	fun destroyInventoryLine(inventoryLineId: Long)

	//endregion InventoryLine
}
