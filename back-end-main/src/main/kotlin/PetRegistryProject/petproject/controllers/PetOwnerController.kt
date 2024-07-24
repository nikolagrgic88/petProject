package PetRegistryProject.petproject.controllers

import PetRegistryProject.petproject.dto.PetOwnerDTO
import PetRegistryProject.petproject.entities.PetOwner
import PetRegistryProject.petproject.services.PetOwnerService
import PetRegistryProject.petproject.repositories.SearchPetOwnerRepository
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.*
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/petregistry")
class PetOwnerController(
    val petOwnerService: PetOwnerService
) {
    @PostMapping("/addpetowner")
    @ResponseStatus(HttpStatus.CREATED)
    fun addPetOwner(@Valid @RequestBody petOwnerDTO: PetOwnerDTO) = petOwnerService.addPetOwner(petOwnerDTO)

    @GetMapping("/findpetowner/{ownerId}")
    fun findPetOwner(@PathVariable ownerId: Int):
            ResponseEntity<PetOwnerDTO> {
        val petOwner = petOwnerService.findPetOwner(ownerId)
        return if (petOwner != null) {
            ResponseEntity.ok(petOwner)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PatchMapping("/updatepetowner/{ownerId}")
    fun updatePetOwner(
        @PathVariable ownerId: Int,
        @RequestBody petOwnerDTO: PetOwnerDTO
    ): ResponseEntity<PetOwnerDTO?> {
        val petOwner = petOwnerService.updatePetOwnersDetails(ownerId, petOwnerDTO)
        return if (petOwner != null) {
            ResponseEntity.ok(petOwner)
        } else {
            ResponseEntity.notFound().build()
        }

    }

    @Autowired
    lateinit var repository: SearchPetOwnerRepository

    @PostMapping("/findbyemail")
    fun findByEmailaddress(@RequestBody emailaddress: String): ResponseEntity<PetOwnerDTO> {

        val cleanedEmail = emailaddress.trim('"')

        if (cleanedEmail.isBlank()) {
            return ResponseEntity.badRequest().build() // Return a bad request response for empty or null email
        }
        val petOwner = repository.findByEmailaddress(cleanedEmail)
        return if (petOwner != null) {
            val owner = petOwner[0]
            val ownerDTO = PetOwnerDTO(
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
            ResponseEntity.ok(ownerDTO)
        } else {
            ResponseEntity.notFound().build()
        }

    }
}

