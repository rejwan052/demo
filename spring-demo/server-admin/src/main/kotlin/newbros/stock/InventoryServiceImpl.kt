package newbros.stock

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import javax.inject.Inject

@Service
class InventoryServiceImpl: InventoryService {
	@Inject lateinit var inventoryLineRepo: InventoryLineRepo

	//region InventoryLine

	override fun searchInventoryLine(request: InventoryLineRequest, pageRequest: PageRequest): Page<InventoryLine> {
		return if (request.isEmptyData()) {
			inventoryLineRepo.findAll(pageRequest)
		} else {
			inventoryLineRepo.search(request, pageRequest)
		}
	}

	override fun getInventoryLine(pageRequest: PageRequest): Page<InventoryLine> {
	    return inventoryLineRepo.findAll(pageRequest)
	}

	override fun createInventoryLine(inventoryLine: InventoryLine): InventoryLine {
	    return inventoryLineRepo.save(inventoryLine)
	}

	override fun showInventoryLine(inventoryLineId: Long): InventoryLine? {
	    return inventoryLineRepo.findById(inventoryLineId).orElse(null)
	}

	override fun updateInventoryLine(inventoryLine: InventoryLine): InventoryLine {
	    return inventoryLineRepo.save(inventoryLine)
	}

	override fun destroyInventoryLine(inventoryLineId: Long) {
	    inventoryLineRepo.deleteById(inventoryLineId)
	}

	//endregion InventoryLine
}
