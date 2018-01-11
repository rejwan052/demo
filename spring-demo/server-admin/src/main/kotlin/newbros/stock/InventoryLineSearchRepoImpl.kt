package newbros.stock

import newbros.product.Product
import org.apache.lucene.search.BooleanClause
import org.apache.lucene.search.BooleanQuery
import org.hibernate.search.exception.EmptyQueryException
import org.hibernate.search.jpa.Search
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.persistence.PersistenceContext


@Repository
class InventoryLineSearchRepoImpl : InventoryLineSearchRepo {
	@PersistenceContext lateinit var entityManager: EntityManager

	override fun search(request: InventoryLineRequest, pageRequest: PageRequest): Page<InventoryLine> {
		return try {
			val ftem = Search.getFullTextEntityManager(entityManager)
			val qb = ftem.searchFactory.buildQueryBuilder().forEntity(InventoryLine::class.java).get()
			val bqb = BooleanQuery.Builder()

			val productName = "${InventoryLine::product.name}.${Product::productName.name}"
			val brandName = "${InventoryLine::product.name}.${Product::brand.name}"
			val componentName = "${InventoryLine::product.name}.${Product::component.name}"
			val modelName = "${InventoryLine::product.name}.${Product::model.name}"
			val typeName = "${InventoryLine::product.name}.${Product::type.name}"
			val partNumberName = "${InventoryLine::product.name}.${Product::partNumber.name}"
			val warehouseName = "${InventoryLine::location.name}.${StockLocation::warehouse.name}.${Warehouse::name.name}"
			val warehouseAddressName = "${InventoryLine::location.name}.${StockLocation::warehouse.name}.${Warehouse::address.name}"

			request.search?.let {
				val q = qb.keyword().fuzzy().onFields(
					productName, brandName, componentName, modelName, typeName, partNumberName,
					warehouseName, warehouseAddressName
				).matching(it).createQuery()
				bqb.add(q, BooleanClause.Occur.SHOULD)
			}

			request.productName?.let {
				bqb.add(qb.keyword().onField(productName).matching(it).createQuery(), BooleanClause.Occur.MUST)
			}

			request.brand?.let {
				bqb.add(qb.keyword().onField(brandName).matching(it).createQuery(), BooleanClause.Occur.MUST)
			}

			request.component?.let {
				bqb.add(qb.keyword().onField(componentName).matching(it).createQuery(), BooleanClause.Occur.MUST)
			}

			request.model?.let {
				bqb.add(qb.keyword().onField(modelName).matching(it).createQuery(), BooleanClause.Occur.MUST)
			}

			request.type?.let {
				bqb.add(qb.keyword().onField(typeName).matching(it).createQuery(), BooleanClause.Occur.MUST)
			}

			request.partNumber?.let {
				bqb.add(qb.keyword().onField(partNumberName).matching(it).createQuery(), BooleanClause.Occur.MUST)
			}

			request.warehouseName?.let {
				bqb.add(qb.keyword().onField(warehouseName).matching(it).createQuery(), BooleanClause.Occur.MUST)
			}

			request.warehouseAddress?.let {
				bqb.add(qb.keyword().onField(warehouseAddressName).matching(it).createQuery(), BooleanClause.Occur.MUST)
			}

			val query = bqb.build()
			val ftQuery = ftem.createFullTextQuery(query, InventoryLine::class.java)
			// pagination
			ftQuery.firstResult = pageRequest.pageNumber * pageRequest.pageSize
			ftQuery.maxResults = pageRequest.pageSize

			PageImpl(ftQuery.resultList as List<InventoryLine>, pageRequest, ftQuery.resultSize.toLong())
		} catch (e: EmptyQueryException) {
			PageImpl(emptyList())
		}
	}
}
