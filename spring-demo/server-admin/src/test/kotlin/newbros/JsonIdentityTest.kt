package newbros

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
class User {
	var id: Int = 0
	lateinit var name: String
	lateinit var userItems: List<Item>
}

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
class Item {
	var id: Int = 0
	lateinit var name: String
	lateinit var owner: User
}


fun main(args: Array<String>) {
	val user = User()
	user.id = 1
	user.name = "user1"
	val item1 = Item()
	item1.id = 1
	item1.name = "item1"
	item1.owner = user

	val item2 = Item()
	item2.id = 1
	item2.name = "item2"
	item2.owner = user

	user.userItems = listOf(item1, item2)

	val objectMapper = ObjectMapper()

	println(objectMapper.writeValueAsString(user))
	println(objectMapper.writeValueAsString(item1))
	println(objectMapper.writeValueAsString(user.userItems))
}
