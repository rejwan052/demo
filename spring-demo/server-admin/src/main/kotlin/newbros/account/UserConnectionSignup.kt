package newbros.account

import org.springframework.social.connect.Connection
import org.springframework.social.connect.ConnectionSignUp
import org.springframework.stereotype.Service
import java.util.*
import javax.inject.Inject

@Service
class UserConnectionSignup : ConnectionSignUp {

	@Inject lateinit var accountService: AccountService

	override fun execute(connection: Connection<*>): String? {
		val profile = connection.fetchUserProfile()
		val socialId = connection.key.toString()

		if (accountService.getSocialAccountById(socialId) != null) {
			return socialId
		} else {
			val account = Account()
			account.email = profile.email
			account.password = UUID.randomUUID().toString()
			account.firstName = profile.firstName
			account.lastName = profile.lastName

			var socialAccount = SocialAccount()
			socialAccount.socialId = socialId
			socialAccount.account = account
			socialAccount.email = profile.email
			socialAccount.firstName = profile.firstName
			socialAccount.lastName = profile.lastName
			socialAccount.providerId = connection.key.providerId
			socialAccount.providerUserId = connection.key.providerUserId

			socialAccount = accountService.createSocialAccount(socialAccount)
			return socialAccount.socialId
		}
	}
}

