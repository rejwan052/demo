package newbros

import org.hibernate.search.jpa.Search
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import javax.persistence.EntityManager

@SpringBootApplication
class AdminApplication {

	@Bean
	fun run(entityManager: EntityManager) = CommandLineRunner {
		val ftEntityManager = Search.getFullTextEntityManager(entityManager)
		ftEntityManager.createIndexer().startAndWait()
		println("create full text index")
	}
}

fun main(args: Array<String>) {
	SpringApplication.run(AdminApplication::class.java, *args)
}
