package newbros.account

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.web.bind.annotation.*
import javax.inject.*

@RequestMapping("/api")
@RestController
class AccountRestController {

	@Inject
	lateinit var accountService: AccountService

	@GetMapping("/account")
	fun index(@RequestParam(defaultValue = "0") page: Int = 0, @RequestParam(defaultValue = "10") size: Int = 10): Page<Account> {
		return accountService.getAccounts(PageRequest.of(page, size))
	}

	@GetMapping("/account/{accountId}")
	fun show(@PathVariable accountId: Long): Account? {
		return accountService.showAccount(accountId)
	}

	@PostMapping("/account")
	fun create(@RequestBody account: Account): Account {
		return accountService.createAccount(account)
	}

	@PutMapping("/account")
	fun update(@RequestBody account: Account): Account {
		return accountService.updateAccount(account)
	}

	@DeleteMapping("/account/{accountId}")
	fun destroy(@PathVariable accountId: Long) {
		accountService.destroyAccount(accountId)
	}

	//region Role

	@GetMapping("/role")
	fun getRoles(@RequestParam(defaultValue = "0") page: Int = 0, @RequestParam(defaultValue = "10") size: Int = 10): Page<Role> {
	    return accountService.getRoles(PageRequest.of(page, size))
	}

	@PostMapping("/role")
	fun createRole(@RequestBody role: Role): Role {
	    return accountService.createRole(role)
	}

	@GetMapping("/role/{roleId}")
	fun showRole(@PathVariable roleId: Int): Role? {
	    return accountService.showRole(roleId)
	}

	@PutMapping("/role")
	fun updateRole(@RequestBody role: Role): Role {
	    return accountService.updateRole(role)
	}

	@DeleteMapping("/role/{roleId}")
	fun destroyRole(@PathVariable roleId: Int) {
	    accountService.destroyRole(roleId)
	}

	//endregion Role


	//region Permission

	@GetMapping("/permission")
	fun getPermissions(@RequestParam(defaultValue = "0") page: Int = 0, @RequestParam(defaultValue = "10") size: Int = 10): Page<Permission> {
	    return accountService.getPermissions(PageRequest.of(page, size))
	}

	@PostMapping("/permission")
	fun createPermission(@RequestBody permission: Permission): Permission {
	    return accountService.createPermission(permission)
	}

	@GetMapping("/permission/{permissionId}")
	fun showPermission(@PathVariable permissionId: Int): Permission? {
	    return accountService.showPermission(permissionId)
	}

	@PutMapping("/permission")
	fun updatePermission(@RequestBody permission: Permission): Permission {
	    return accountService.updatePermission(permission)
	}

	@DeleteMapping("/permission/{permissionId}")
	fun destroyPermission(@PathVariable permissionId: Int) {
	    accountService.destroyPermission(permissionId)
	}

	//endregion Permission
}
