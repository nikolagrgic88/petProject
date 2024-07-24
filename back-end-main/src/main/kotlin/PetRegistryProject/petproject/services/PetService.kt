package PetRegistryProject.petproject.services


import PetRegistryProject.petproject.dto.PetDTO
import PetRegistryProject.petproject.entities.Pet
import PetRegistryProject.petproject.repositories.PetRepository
import PetRegistryProject.petproject.repositories.PetOwnerRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service


@Service
class PetService(
    val petRepository: PetRepository,
    val petOwnerRepository: PetOwnerRepository
) {
    fun addPet(petDTO: PetDTO, id: Int): PetDTO {
        val petOwner = petOwnerRepository.findById(id).get()
        val pet = petDTO.let {
            Pet(
                microchip = it.microchip,
                petname = it.petname,
                species = it.species,
                breed = it.breed,
                gender = it.gender,
                desexed = it.desexed,
                dateofbirth = it.dateofbirth,
                identifyingmarks = it.identifyingmarks,
                petOwner = petOwner
            )
        }

        val savePetData = petRepository.save(pet)

        return pet.let {
            PetDTO(
                microchip = it.microchip,
                petname = it.petname,
                species = it.species,
                breed = it.breed,
                gender = it.gender,
                desexed = it.desexed,
                dateofbirth = it.dateofbirth,
                identifyingmarks = it.identifyingmarks,
                petownerid = id,
                petid = savePetData.petid

            )
        }
    }

    fun findPetByOwnerId(ownerId: Int): MutableList<PetDTO>? {
        val owner = petOwnerRepository.findById(ownerId)
        val pets = owner.get().pets
        val petList = mutableListOf<PetDTO>()

        if (owner.isPresent) {
            for (pet in pets) {
                val petDTO = PetDTO(
                    pet.microchip,
                    pet.petname,
                    pet.species,
                    pet.breed,
                    pet.gender,
                    pet.desexed,
                    pet.dateofbirth,
                    pet.identifyingmarks,
                    pet.petOwner.petownerid!!,
                    pet.petid!!
                )
                petList.add(petDTO)
            }
            return petList
        }
        return null
    }

    fun deletePet(petId: Int): Boolean {
        val petToBeDeleted = petRepository.findById(petId)

        return if (petToBeDeleted.isPresent) {
            petRepository.delete(petToBeDeleted.get())
            true
        } else {
            false
        }
    }

    fun updatePetDetails(petDTO: PetDTO, petId: Int): PetDTO? {
        val pet = petRepository.findById(petId)
        if (pet.isPresent) {
            val existingPet = pet.get()
            existingPet.microchip = petDTO.microchip
            existingPet.species = petDTO.species
            existingPet.breed = petDTO.breed
            existingPet.gender = petDTO.gender
            existingPet.dateofbirth = petDTO.dateofbirth
            existingPet.desexed = petDTO.desexed
            existingPet.identifyingmarks = petDTO.identifyingmarks
            existingPet.petname = petDTO.petname
            existingPet.petid = petDTO.petid

            val updatedPet = petRepository.save(existingPet)
            return PetDTO(
                updatedPet.microchip,
                updatedPet.petname,
                updatedPet.species,
                updatedPet.breed,
                updatedPet.gender,
                updatedPet.desexed,
                updatedPet.dateofbirth,
                updatedPet.identifyingmarks,
                existingPet.petOwner.petownerid!!,
                updatedPet.petid
            )
        } else {
            return null
        }
    }
}

