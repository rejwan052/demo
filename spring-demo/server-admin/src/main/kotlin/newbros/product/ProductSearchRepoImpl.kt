package newbros.product

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
class ProductSearchRepoImpl : ProductSearchRepo {
	@PersistenceContext lateinit var entityManager: EntityManager

	override fun search(request: ProductRequest, pageRequest: PageRequest): Page<Product> {
		return try {
			val ftem = Search.getFullTextEntityManager(entityManager)
			val qb = ftem.searchFactory.buildQueryBuilder().forEntity(Product::class.java).get()
			val bqb = BooleanQuery.Builder()
			request.search?.let { bqb.add(qb.keyword().fuzzy().onFields(Product::productName.name, Product::brand.name,
				Product::component.name, Product::model.name, Product::type.name, Product::partNumber.name)
				.matching(it).createQuery(), BooleanClause.Occur.SHOULD)
			}
			request.productName?.let { bqb.add(qb.keyword().onField(Product::productName.name).matching(it).createQuery(), BooleanClause.Occur.MUST) }
			request.brand?.let { bqb.add(qb.keyword().onField(Product::brand.name).matching(it).createQuery(), BooleanClause.Occur.MUST) }
			request.component?.let { bqb.add(qb.keyword().onField(Product::component.name).matching(it).createQuery(), BooleanClause.Occur.MUST) }
			request.model?.let { bqb.add(qb.keyword().onField(Product::model.name).matching(it).createQuery(), BooleanClause.Occur.MUST) }
			request.type?.let { bqb.add(qb.keyword().onField(Product::type.name).matching(it).createQuery(), BooleanClause.Occur.MUST) }
			request.partNumber?.let { bqb.add(qb.keyword().onField(Product::partNumber.name).matching(it).createQuery(), BooleanClause.Occur.MUST) }

			val query = bqb.build()
			val ftQuery = ftem.createFullTextQuery(query, Product::class.java)
			// pagination
			ftQuery.firstResult = pageRequest.pageNumber * pageRequest.pageSize
			ftQuery.maxResults = pageRequest.pageSize

			PageImpl(ftQuery.resultList as List<Product>, pageRequest, ftQuery.resultSize.toLong())
		} catch (e: EmptyQueryException) {
			PageImpl(emptyList())
		}
	}
}
