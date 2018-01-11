package newbros

import newbros.account.AccountDTO
import newbros.account.AccountService
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import javax.inject.Inject

@Controller
class MainController {
}

@RestController
@RequestMapping("/api")
class MainRestController {

	@Inject
	lateinit var accountService: AccountService

	@PostMapping("/login")
	fun basicLogin(): AccountDTO {
		return accountService.getUser()?.let { AccountDTO(it) }
			?: throw AuthenticationCredentialsNotFoundException("user not found")
	}
}
