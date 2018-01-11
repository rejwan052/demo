package newbros.account

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserAccount(val account: Account, private val _authorities: Collection<GrantedAuthority>) : UserDetails {
	override fun getUsername(): String {
		return account.email
	}

	override fun getPassword(): String {
		return account.password
	}

	override fun getAuthorities(): Collection<GrantedAuthority> {
		return _authorities
	}

	override fun isEnabled(): Boolean {
		return true
	}

	override fun isCredentialsNonExpired(): Boolean {
		return true
	}

	override fun isAccountNonExpired(): Boolean {
		return true
	}

	override fun isAccountNonLocked(): Boolean {
		return true
	}

}
