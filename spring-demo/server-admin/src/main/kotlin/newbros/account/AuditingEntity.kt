package newbros.account

import com.fasterxml.jackson.annotation.JsonBackReference
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import javax.persistence.*

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
open class AuditingEntity {
	@CreatedBy
	@ManyToOne
	@JoinColumn(name = "created_by")
	@JsonBackReference("createdBy")
	var createdBy: Account? = null

	@Transient
	fun getCreatedByAccount(): AccountDTO? {
		return createdBy?.let { AccountDTO(it) }
	}

	@CreatedDate
	@Column(name = "created_at")
	var createdAt: LocalDateTime? = null

	@LastModifiedBy
	@ManyToOne
	@JoinColumn(name = "updated_by")
	@JsonBackReference("updatedBy")
	var updatedBy: Account? = null

	@Transient
	fun getUpdatedByAccount(): AccountDTO? {
		return updatedBy?.let { AccountDTO(it) }
	}

	@LastModifiedDate
	@Column(name = "updated_at")
	var updatedAt: LocalDateTime? = null
}
