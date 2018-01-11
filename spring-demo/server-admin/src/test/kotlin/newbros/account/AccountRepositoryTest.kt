package newbros.account

import org.junit.Assert.*
import org.junit.*
import org.junit.runner.RunWith
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.*
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.Rollback
import org.springframework.test.context.junit4.SpringRunner
import javax.inject.Inject

@RunWith(SpringRunner::class)
@SpringBootTest
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class AccountRepositoryTest {
	@Inject
	lateinit var entityManager: TestEntityManager

	@Inject
	lateinit var accountRepo: AccountRepository

	@Test
	fun connectDatabase() {
		val account = accountRepo.findByEmail("user@btrie.com")!!

		assertEquals("ROLE_USER", account.roles.first().roleName)
		assertNotNull(account.roles.first().permissions.find { it.permissionName == "PRODUCT_READ" })
	}

	@Rollback
	@Test
	fun insert() {
		val account = Account()
		account.email = "test@btrie.com"
		account.firstName = "test"
		account.lastName = "test"
		account.password = "asdf"
		account.active = true

		val saveAccount = accountRepo.save(account)
		println(saveAccount)
	}
}
