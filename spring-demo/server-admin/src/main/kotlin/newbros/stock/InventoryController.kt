package newbros.stock

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.*
import javax.inject.Inject


@RequestMapping("/api")
@RestController
class InventoryRestController {
	@Inject lateinit var inventorySvc: InventoryService

	//region InventoryLine

	@GetMapping("/inventoryLine")
	fun getInventoryLine(
		@RequestParam(defaultValue = "0") page: Int = 0,
		@RequestParam(defaultValue = "10") size: Int = 10,
		request: InventoryLineRequest
	): Page<InventoryLine> {
	    return inventorySvc.searchInventoryLine(request, PageRequest.of(page, size))
	}

	@PostMapping("/inventoryLine")
	fun createInventoryLine(@RequestBody inventoryLine: InventoryLine): InventoryLine {
	    return inventorySvc.createInventoryLine(inventoryLine)
	}

	@GetMapping("/inventoryLine/{inventoryLineId}")
	fun showInventoryLine(@PathVariable inventoryLineId: Long): InventoryLine? {
	    return inventorySvc.showInventoryLine(inventoryLineId)
	}

	@PutMapping("/inventoryLine")
	fun updateInventoryLine(@RequestBody inventoryLine: InventoryLine): InventoryLine {
	    return inventorySvc.updateInventoryLine(inventoryLine)
	}

	@DeleteMapping("/inventoryLine/{inventoryLineId}")
	fun destroyInventoryLine(@PathVariable inventoryLineId: Long) {
	    inventorySvc.destroyInventoryLine(inventoryLineId)
	}

	//endregion InventoryLine
}
