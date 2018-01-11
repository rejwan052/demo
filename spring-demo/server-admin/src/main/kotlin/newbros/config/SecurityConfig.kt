package newbros.config

import newbros.account.AccountService
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.AuthenticationException
import org.springframework.security.crypto.password.NoOpPasswordEncoder
import javax.inject.Inject
import javax.servlet.http.HttpServletResponse
import javax.servlet.ServletException
import java.io.IOException
import org.springframework.security.web.AuthenticationEntryPoint
import javax.servlet.http.HttpServletRequest


@EnableWebSecurity
@EnableJpaAuditing
class SecurityConfig: WebSecurityConfigurerAdapter() {

	@Inject
	lateinit var accountService: AccountService

	override fun configure(auth: AuthenticationManagerBuilder) {
		auth.userDetailsService(accountService)
			// FIXME
			.passwordEncoder(NoOpPasswordEncoder.getInstance())
	}

	override fun configure(http: HttpSecurity) {
		http.csrf().disable()
			.authorizeRequests()
			.anyRequest().permitAll()
//			.anyRequest().authenticated()
			.and()
				.httpBasic()
				// suppress browser authentication dialog
				.authenticationEntryPoint(Http401AuthenticationEntryPoint("None"))
			.and()
			.logout().logoutUrl("/api/logout")
	}
}


class Http401AuthenticationEntryPoint(private val headerValue: String) : AuthenticationEntryPoint {

	@Throws(IOException::class, ServletException::class)
	override fun commence(request: HttpServletRequest, response: HttpServletResponse, authException: AuthenticationException) {
		response.setHeader("WWW-Authenticate", this.headerValue)
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.message)
	}
}
