package newbros.stock

import com.fasterxml.jackson.annotation.JsonIgnore
import newbros.account.AuditingEntity
import org.hibernate.search.annotations.Field
import org.hibernate.search.annotations.Indexed
import org.hibernate.search.annotations.IndexedEmbedded
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import javax.persistence.*
import kotlin.jvm.Transient


@Indexed
@Entity
@Table(name = "stock_warehouse")
class Warehouse: AuditingEntity() {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	var id: Long = 0

	@Field
	@Column(name = "name")
	lateinit var name: String

	@Field
	@Column(name = "address")
	lateinit var address: String
}


@Entity
@Table(name = "stock_warehouse_move")
class WarehouseMove: AuditingEntity() {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	var id: Long = 0

	@Column(name = "note")
	lateinit var note: String

	@ManyToOne
	@JoinColumn(name = "inventory_line_id")
	lateinit var inventoryLine: InventoryLine

	@ManyToOne
	@JoinColumn(name = "location_src_id")
	lateinit var locationSrc: StockLocation

	@ManyToOne(optional = false)
	@JoinColumn(name = "location_dest_id")
	lateinit var locationDest: StockLocation
}


@Indexed
@Entity
@Table(name = "stock_location")
class StockLocation: AuditingEntity() {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	var id: Long = 0

	@Column(name = "qrcode")
	lateinit var qrcode: String

	@IndexedEmbedded
	@ManyToOne(optional = false)
	@JoinColumn(name = "warehouse_id")
	lateinit var warehouse: Warehouse

	@Transient
	var warehouseId: Long = 0

	@Column(name = "capacity")
	var capacity: Int = 0

	@Column(name = "qty")
	var qty: Int = 0

	// position

	@Column(name = "posx")
	var posx: Int = 0

	@Column(name = "posy")
	var posy: Int = 0

	@Column(name = "posz")
	var posz: Int = 0

	@PostLoad
	fun postLoad() {
		warehouseId = warehouse.id
	}
}


data class StockLocationRequest(val warehouseId: Long?)

interface WarehouseRepo: JpaRepository<Warehouse, Long> {
}


interface WarehouseMoveRepo: JpaRepository<WarehouseMove, Long> {
}


interface StockLocationRepo: JpaRepository<StockLocation, Long> {
	@Query("""
		SELECT loc FROM StockLocation loc
		WHERE :#{#req.warehouseId} IS NULL OR loc.warehouse.id = :#{#req.warehouseId}
		ORDER BY loc.posx, loc.posy, loc.posz
	""")
	fun findByWarehouse(req: StockLocationRequest, pageable: Pageable): Page<StockLocation>
}


interface WarehouseService {
	//region Warehouse

	fun getWarehouse(pageRequest: PageRequest): Page<Warehouse>
	fun createWarehouse(warehouse: Warehouse): Warehouse
	fun showWarehouse(warehouseId: Long): Warehouse?
	fun updateWarehouse(warehouse: Warehouse): Warehouse
	fun destroyWarehouse(warehouseId: Long)

	//endregion Warehouse

	//region WarehouseMove

	fun getWarehouseMove(pageRequest: PageRequest): Page<WarehouseMove>
	fun createWarehouseMove(warehouseMove: WarehouseMove): WarehouseMove
	fun showWarehouseMove(warehouseMoveId: Long): WarehouseMove?
	fun updateWarehouseMove(warehouseMove: WarehouseMove): WarehouseMove
	fun destroyWarehouseMove(warehouseMoveId: Long)

	//endregion WarehouseMove

	//region StockLocation

	fun searchStockLocation(request: StockLocationRequest, pageRequest: PageRequest): Page<StockLocation>
	fun getStockLocation(pageRequest: PageRequest): Page<StockLocation>
	fun createStockLocation(stockLocation: StockLocation): StockLocation
	fun showStockLocation(stockLocationId: Long): StockLocation?
	fun updateStockLocation(stockLocation: StockLocation): StockLocation
	fun destroyStockLocation(stockLocationId: Long)

	//endregion StockLocation
}
