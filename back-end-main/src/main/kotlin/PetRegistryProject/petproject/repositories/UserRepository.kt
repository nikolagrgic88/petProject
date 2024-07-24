package PetRegistryProject.petproject.repositories



import PetRegistryProject.petproject.entities.User
import org.springframework.data.jpa.repository.JpaRepository


interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): User?
}
