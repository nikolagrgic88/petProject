package PetRegistryProject.petproject.services

import PetRegistryProject.petproject.entities.PetOwner
import PetRegistryProject.petproject.dto.PetOwnerDTO
import PetRegistryProject.petproject.repositories.PetOwnerRepository
import PetRegistryProject.petproject.repositories.SearchPetOwnerRepository
import jakarta.validation.constraints.Email
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam


@Service
class PetOwnerService(
    val petOwnerRepository: PetOwnerRepository,
    ) {
    fun addPetOwner(petOwnerDTO: PetOwnerDTO): PetOwnerDTO {
        val petOwner = petOwnerDTO.let {
            PetOwner(
                firstname = it.firstname,
                lastname = it.lastname,
                dateofbirth = it.dateofbirth,
                homephone = it.homephone,
                mobilephone = it.mobilephone,
                streetnumber = it.streetnumber,
                streetname = it.streetname,
                streettype = it.streettype,
                suburb = it.suburb,
                state = it.state,
                postcode = it.postcode,
                emailaddress = it.emailaddress,
                petownerid = it.petownerid
            )
        }
        //saving data
        petOwnerRepository.save(petOwner)

        return petOwner.let {
            PetOwnerDTO(
                firstname = it.firstname,
                lastname = it.lastname,
                dateofbirth = it.dateofbirth,
                homephone = it.homephone,
                mobilephone = it.mobilephone,
                streetnumber = it.streetnumber,
                streetname = it.streetname,
                streettype = it.streettype,
                suburb = it.suburb,
                state = it.state,
                postcode = it.postcode,
                emailaddress = it.emailaddress,
                petownerid = it.petownerid
            )
        }
    }

    fun findPetOwner(ownerId: Int): PetOwnerDTO? {
        val petOwner = petOwnerRepository.findById(ownerId)
        val owner = petOwner.get()
        return if (petOwner.isPresent) {
            PetOwnerDTO(
                owner.firstname,
                owner.lastname,
                owner.dateofbirth,
                owner.homephone,
                owner.mobilephone,
                owner.streetnumber,
                owner.streetname,
                owner.streettype,
                owner.suburb,
                owner.state,
                owner.postcode,
                owner.emailaddress,
                owner.petownerid
            )
        } else {
            null
        }
    }

    fun updatePetOwnersDetails(ownerId: Int, petOwnerDTO: PetOwnerDTO): PetOwnerDTO? {
        val petOwner = petOwnerRepository.findById(ownerId)
        if (petOwner.isPresent) {
            val owner = petOwner.get()
            owner.homephone = petOwnerDTO.homephone
            owner.mobilephone = petOwnerDTO.mobilephone
            owner.streetnumber = petOwnerDTO.streetnumber
            owner.streetname = petOwnerDTO.streetname
            owner.streettype = petOwnerDTO.streettype
            owner.suburb = petOwnerDTO.suburb
            owner.state = petOwnerDTO.state
            owner.postcode = petOwnerDTO.postcode
            owner.emailaddress = petOwnerDTO.emailaddress

            val updatedOwner = petOwnerRepository.save(owner)
            return PetOwnerDTO(
                updatedOwner.firstname,
                updatedOwner.lastname,
                updatedOwner.dateofbirth,
                updatedOwner.homephone,
                updatedOwner.mobilephone,
                updatedOwner.streetnumber,
                updatedOwner.streetname,
                updatedOwner.streettype,
                updatedOwner.suburb,
                updatedOwner.state,
                updatedOwner.postcode,
                updatedOwner.emailaddress,
                updatedOwner.petownerid
            )
        } else {
            return null
        }
    }

}

