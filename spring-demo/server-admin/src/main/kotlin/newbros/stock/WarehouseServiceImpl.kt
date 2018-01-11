package newbros.stock

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import javax.inject.Inject


@Service
class WarehouseServiceImpl: WarehouseService {
	@Inject lateinit var warehouseRepo: WarehouseRepo
	@Inject lateinit var warehouseMoveRepo: WarehouseMoveRepo
	@Inject lateinit var locationRepo: StockLocationRepo

	//region Warehouse

	override fun getWarehouse(pageRequest: PageRequest): Page<Warehouse> {
	    return warehouseRepo.findAll(pageRequest)
	}

	override fun createWarehouse(warehouse: Warehouse): Warehouse {
	    return warehouseRepo.save(warehouse)
	}

	override fun showWarehouse(warehouseId: Long): Warehouse? {
	    return warehouseRepo.findById(warehouseId).orElse(null)
	}

	override fun updateWarehouse(warehouse: Warehouse): Warehouse {
	    return warehouseRepo.save(warehouse)
	}

	override fun destroyWarehouse(warehouseId: Long) {
	    warehouseRepo.deleteById(warehouseId)
	}

	//endregion Warehouse

	//region WarehouseMove

	override fun getWarehouseMove(pageRequest: PageRequest): Page<WarehouseMove> {
	    return warehouseMoveRepo.findAll(pageRequest)
	}

	override fun createWarehouseMove(warehouseMove: WarehouseMove): WarehouseMove {
	    return warehouseMoveRepo.save(warehouseMove)
	}

	override fun showWarehouseMove(warehouseMoveId: Long): WarehouseMove? {
	    return warehouseMoveRepo.findById(warehouseMoveId).orElse(null)
	}

	override fun updateWarehouseMove(warehouseMove: WarehouseMove): WarehouseMove {
	    return warehouseMoveRepo.save(warehouseMove)
	}

	override fun destroyWarehouseMove(warehouseMoveId: Long) {
	    warehouseMoveRepo.deleteById(warehouseMoveId)
	}

	//endregion WarehouseMove

	//region StockLocation

	override fun searchStockLocation(request: StockLocationRequest, pageRequest: PageRequest): Page<StockLocation> {
		return locationRepo.findByWarehouse(request, pageRequest)
	}

	override fun getStockLocation(pageRequest: PageRequest): Page<StockLocation> {
	    return locationRepo.findAll(pageRequest)
	}

	override fun createStockLocation(stockLocation: StockLocation): StockLocation {
	    return locationRepo.save(stockLocation)
	}

	override fun showStockLocation(stockLocationId: Long): StockLocation? {
	    return locationRepo.findById(stockLocationId).orElse(null)
	}

	override fun updateStockLocation(stockLocation: StockLocation): StockLocation {
		stockLocation.warehouse = warehouseRepo.getOne(stockLocation.warehouseId)
	    return locationRepo.save(stockLocation)
	}

	override fun destroyStockLocation(stockLocationId: Long) {
	    locationRepo.deleteById(stockLocationId)
	}

	//endregion StockLocation
}
