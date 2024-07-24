package PetRegistryProject.petproject.repositories

import PetRegistryProject.petproject.entities.Pet
import org.springframework.data.jpa.repository.JpaRepository

interface PetRepository : JpaRepository<Pet, Int>