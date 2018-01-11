package newbros.stock

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.*
import javax.inject.Inject

@RequestMapping("/api")
@RestController
class WarehouseRestController {
	@Inject lateinit var warehouseSvc: WarehouseService

	//region Warehouse

	@GetMapping("/warehouse")
	fun getWarehouse(@RequestParam(defaultValue = "0") page: Int = 0, @RequestParam(defaultValue = "10") size: Int = 10): Page<Warehouse> {
	    return warehouseSvc.getWarehouse(PageRequest.of(page, size))
	}

	@PostMapping("/warehouse")
	fun createWarehouse(@RequestBody warehouse: Warehouse): Warehouse {
	    return warehouseSvc.createWarehouse(warehouse)
	}

	@GetMapping("/warehouse/{warehouseId}")
	fun showWarehouse(@PathVariable warehouseId: Long): Warehouse? {
	    return warehouseSvc.showWarehouse(warehouseId)
	}

	@PutMapping("/warehouse")
	fun updateWarehouse(@RequestBody warehouse: Warehouse): Warehouse {
	    return warehouseSvc.updateWarehouse(warehouse)
	}

	@DeleteMapping("/warehouse/{warehouseId}")
	fun destroyWarehouse(@PathVariable warehouseId: Long) {
	    warehouseSvc.destroyWarehouse(warehouseId)
	}

	//endregion Warehouse

	//region WarehouseMove

	@GetMapping("/warehouseMove")
	fun getWarehouseMove(@RequestParam(defaultValue = "0") page: Int = 0, @RequestParam(defaultValue = "10") size: Int = 10): Page<WarehouseMove> {
	    return warehouseSvc.getWarehouseMove(PageRequest.of(page, size))
	}

	@PostMapping("/warehouseMove")
	fun createWarehouseMove(@RequestBody warehouseMove: WarehouseMove): WarehouseMove {
	    return warehouseSvc.createWarehouseMove(warehouseMove)
	}

	@GetMapping("/warehouseMove/{warehouseMoveId}")
	fun showWarehouseMove(@PathVariable warehouseMoveId: Long): WarehouseMove? {
	    return warehouseSvc.showWarehouseMove(warehouseMoveId)
	}

	@PutMapping("/warehouseMove")
	fun updateWarehouseMove(@RequestBody warehouseMove: WarehouseMove): WarehouseMove {
	    return warehouseSvc.updateWarehouseMove(warehouseMove)
	}

	@DeleteMapping("/warehouseMove/{warehouseMoveId}")
	fun destroyWarehouseMove(@PathVariable warehouseMoveId: Long) {
	    warehouseSvc.destroyWarehouseMove(warehouseMoveId)
	}

	//endregion WarehouseMove

	//region StockLocation

	@GetMapping("/stockLocation")
	fun getStockLocation(@RequestParam(defaultValue = "0") page: Int = 0,
						 @RequestParam(defaultValue = "10") size: Int = 10,
						 request: StockLocationRequest): Page<StockLocation> {
		return warehouseSvc.searchStockLocation(request, PageRequest.of(page, size))
	}

	@PostMapping("/stockLocation")
	fun createStockLocation(@RequestBody stockLocation: StockLocation): StockLocation {
	    return warehouseSvc.createStockLocation(stockLocation)
	}

	@GetMapping("/stockLocation/{stockLocationId}")
	fun showStockLocation(@PathVariable stockLocationId: Long): StockLocation? {
	    return warehouseSvc.showStockLocation(stockLocationId)
	}

	@PutMapping("/stockLocation")
	fun updateStockLocation(@RequestBody stockLocation: StockLocation): StockLocation {
	    return warehouseSvc.updateStockLocation(stockLocation)
	}

	@DeleteMapping("/stockLocation/{stockLocationId}")
	fun destroyStockLocation(@PathVariable stockLocationId: Long) {
	    warehouseSvc.destroyStockLocation(stockLocationId)
	}

	//endregion StockLocation
}
