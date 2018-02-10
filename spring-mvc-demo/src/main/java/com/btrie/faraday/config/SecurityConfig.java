package com.btrie.faraday.config;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;


@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("config http");
		http.csrf().disable();
		http.authorizeRequests()
			.antMatchers("/", "/public/**").permitAll()
			.antMatchers("/admin").hasRole("ADMIN")
			.anyRequest().authenticated()
			.and()
			.formLogin().loginPage("/login").permitAll()
			.and()
			.logout().logoutUrl("/logout").permitAll();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		System.out.println("config auth");
		auth.inMemoryAuthentication()
			.withUser(User.withDefaultPasswordEncoder().username("user").password("asdf").roles("USER"))
			.withUser(User.withDefaultPasswordEncoder().username("admin").password("asdf").roles("ADMIN"));
	}
}
