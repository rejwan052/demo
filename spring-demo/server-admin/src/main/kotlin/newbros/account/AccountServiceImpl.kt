package newbros.account

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.social.security.SocialUser
import org.springframework.social.security.SocialUserDetails
import org.springframework.stereotype.*
import org.springframework.transaction.annotation.Transactional
import java.util.*
import javax.inject.Inject

@Service
class AccountServiceImpl : AccountService {
	@Inject lateinit var accountRepo: AccountRepository
	@Inject lateinit var socialAccountRepo: SocialAccountRepository
	@Inject lateinit var roleRepo: RoleRepository
	@Inject lateinit var permissionRepo: PermissionRepository

	override fun getUser(): Account? {
		val authentication = SecurityContextHolder.getContext().authentication
		return accountRepo.findByEmail(authentication.name)
	}

	override fun getCurrentAuditor(): Optional<Account> {
		val principal = SecurityContextHolder.getContext().authentication.principal
		return when (principal) {
			is UserAccount -> Optional.ofNullable(principal.account)
			else -> Optional.empty()
		}
	}

	@Transactional
	override fun createSocialAccount(socialAccount: SocialAccount): SocialAccount {
		val account = accountRepo.save(socialAccount.account)
		socialAccount.account = account
		return socialAccountRepo.save(socialAccount)
	}

	override fun getSocialAccountById(socialId: String): SocialAccount? {
		return socialAccountRepo.findById(socialId).orElse(null)
	}

	override fun loadUserByUserId(userId: String): SocialUserDetails {
		if (getSocialAccountById(userId) == null) {
			throw UsernameNotFoundException(userId)
		}

		val authorities = listOf<GrantedAuthority>()
		return SocialUser(userId, "", true, true, true, true, authorities)
	}

	override fun loadUserByUsername(username: String): UserDetails {
		val account = accountRepo.findByEmail(username) ?: throw UsernameNotFoundException(username)
		val roles = account.roles.map { SimpleGrantedAuthority(it.roleName) }.toSet()
		val permissions = account.roles.flatMap { it.permissions }.map { SimpleGrantedAuthority(it.permissionName) } .toSet()
		val authorities = roles + permissions
		return UserAccount(account, authorities)
	}

	//region Account

	override fun getAccounts(pageRequest: PageRequest): Page<Account> {
		return accountRepo.findAll(pageRequest)
	}

	override fun createAccount(account: Account): Account {
		return accountRepo.save(account)
	}

	override fun showAccount(accountId: Long): Account? {
		return accountRepo.findById(accountId).orElse(null)
	}

	override fun updateAccount(account: Account): Account {
		return accountRepo.save(account)
	}

	override fun destroyAccount(accountId: Long) {
		accountRepo.deleteById(accountId)
	}

	//endregion Account

	//region Role

	override fun getRoles(pageRequest: PageRequest): Page<Role> {
		return roleRepo.findAll(pageRequest)
	}

	override fun createRole(role: Role): Role {
		return roleRepo.save(role)
	}

	override fun showRole(roleId: Int): Role? {
		return roleRepo.findById(roleId).orElse(null)
	}

	override fun updateRole(role: Role): Role {
		return roleRepo.save(role)
	}

	override fun destroyRole(roleId: Int) {
		roleRepo.deleteById(roleId)
	}

	//endregion Role

	//region Permission

	override fun getPermissions(pageRequest: PageRequest): Page<Permission> {
		return permissionRepo.findAll(pageRequest)
	}

	override fun createPermission(permission: Permission): Permission {
		return permissionRepo.save(permission)
	}

	override fun showPermission(permissionId: Int): Permission? {
		return permissionRepo.findById(permissionId).orElse(null)
	}

	override fun updatePermission(permission: Permission): Permission {
		return permissionRepo.save(permission)
	}

	override fun destroyPermission(permissionId: Int) {
		permissionRepo.deleteById(permissionId)
	}

	//endregion Permission
}
