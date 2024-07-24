package PetRegistryProject.petproject.repositories


import PetRegistryProject.petproject.entities.PetOwner
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param


interface PetOwnerRepository : JpaRepository<PetOwner, Int>
{
}

interface SearchPetOwnerRepository : JpaRepository<PetOwner, Int>
{
    fun findByEmailaddress(emailaddress: String): List<PetOwner>
}







