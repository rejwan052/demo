package newbros.account

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.web.bind.annotation.*
import javax.inject.Inject

@RequestMapping("/api")
@RestController
class UserRestController {
	@Inject
	lateinit var accountService: AccountService

	@GetMapping("/user")
	fun getAccount(): AccountDTO {
		return accountService.getUser()?.let { AccountDTO(it) }
			?: throw AuthenticationCredentialsNotFoundException("user not found")
	}

	@PatchMapping("/user")
	fun updateUser(@RequestBody user: AccountDTO): AccountDTO {
		var account = accountService.getUser()?: throw AuthenticationCredentialsNotFoundException("user not found")
		account.firstName = user.firstName
		account.lastName = user.lastName

		account = accountService.updateAccount(account)
		return AccountDTO(account)
	}
}
