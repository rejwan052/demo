package newbros.account

import com.fasterxml.jackson.annotation.*
import org.springframework.data.domain.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.social.security.SocialUserDetailsService
import javax.persistence.*


@Entity
@Table(name = "account")
class Account : AuditingEntity() {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "account_id", nullable = false, unique = true, updatable = false)
	var accountId: Long = 0

	@Column(name = "password")
	lateinit var password: String

	@Column(name = "email", unique = true)
	lateinit var email: String

	@Column(name = "first_name")
	lateinit var firstName: String

	@Column(name = "last_name")
	lateinit var lastName: String

	@Column(name = "active")
	var active: Boolean = false

	@OneToMany(mappedBy = "account", cascade = [CascadeType.ALL], orphanRemoval = true)
	lateinit var socialAccounts: Collection<SocialAccount>

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "accounts_roles",
		joinColumns = [JoinColumn(name = "account_id", referencedColumnName = "account_id")],
		inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "role_id")]
	)
	lateinit var roles: Collection<Role>

	override fun toString(): String {
		return "Account(accountId=$accountId, email='$email', firstName='$firstName', lastName='$lastName', active=$active)"
	}
}


@Entity
@Table(name = "social_account")
class SocialAccount {
	@Id
	@Column(name = "social_id", nullable = false, unique = true, updatable = false)
	lateinit var socialId: String

	@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator::class, property="@accountId")
	@ManyToOne
	@JoinColumn(name = "account_id")
	lateinit var account: Account

	@Column(name = "provider_id", nullable = false, updatable = false)
	lateinit var providerId: String

	@Column(name = "provider_user_id", nullable = false, updatable = false)
	lateinit var providerUserId: String

	@Column(name = "email", unique = true)
	lateinit var email: String

	@Column(name = "first_name")
	lateinit var firstName: String

	@Column(name = "last_name")
	lateinit var lastName: String
}


@Entity
@Table(name = "role")
class Role {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "role_id", nullable = false, unique = true, updatable = false)
	var roleId: Int = 0

	@Column(name = "role_name", nullable = false, unique = true)
	lateinit var roleName: String

	@JsonIgnore
	@ManyToMany(mappedBy = "roles")
	lateinit var accounts: Collection<Account>

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name	= "roles_permissions",
		joinColumns = [JoinColumn(name = "role_id", referencedColumnName = "role_id")],
		inverseJoinColumns = [JoinColumn(name = "permission_id", referencedColumnName = "permission_id")])
	lateinit var permissions: Collection<Permission>
}


@Entity
@Table(name = "permission")
class Permission {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "permission_id", nullable = false, unique = true, updatable = false)
	var permissionId: Int = 0

	@Column(name = "permission_name", nullable = false, unique = true)
	lateinit var permissionName: String

	@JsonIgnore
	@ManyToMany(mappedBy = "permissions")
	lateinit var roles: Collection<Role>
}

data class AccountDTO(val accountId: Long, val email: String, val firstName: String, val lastName: String) {
	constructor(account: Account) : this(account.accountId, account.email, account.firstName, account.lastName)
}

data class ClientCredentialDTO(val email: String, val password: String)


interface AccountRepository : JpaRepository<Account, Long> {
	fun findByEmail(email: String): Account?
}

interface SocialAccountRepository : JpaRepository<SocialAccount, String> {
}

interface RoleRepository : JpaRepository<Role, Int> {
}

interface PermissionRepository : JpaRepository<Permission, Int> {

}

interface AccountService : UserDetailsService, SocialUserDetailsService, AuditorAware<Account> {
	fun getSocialAccountById(socialId: String): SocialAccount?
	fun createSocialAccount(socialAccount: SocialAccount): SocialAccount
	fun getUser(): Account?

	//region Account

	fun getAccounts(pageRequest: PageRequest): Page<Account>
	fun createAccount(account: Account): Account
	fun showAccount(accountId: Long): Account?
	fun updateAccount(account: Account): Account
	fun destroyAccount(accountId: Long)

	//endregion Account


	//region Role

	fun getRoles(pageRequest: PageRequest): Page<Role>
	fun createRole(role: Role): Role
	fun showRole(roleId: Int): Role?
	fun updateRole(role: Role): Role
	fun destroyRole(roleId: Int)

	//endregion Role


	//region Permission

	fun getPermissions(pageRequest: PageRequest): Page<Permission>
	fun createPermission(permission: Permission): Permission
	fun showPermission(permissionId: Int): Permission?
	fun updatePermission(permission: Permission): Permission
	fun destroyPermission(permissionId: Int)

	//endregion Permission
}
