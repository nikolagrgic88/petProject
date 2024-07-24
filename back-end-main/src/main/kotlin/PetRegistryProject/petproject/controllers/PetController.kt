package PetRegistryProject.petproject.controllers

import PetRegistryProject.petproject.dto.PetDTO
import PetRegistryProject.petproject.services.PetService
import org.springframework.http.*
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/petregistry")
class PetController(
    val petService: PetService
) {@PostMapping("/addpet/{ownerId}")
@ResponseStatus(HttpStatus.CREATED)
fun addPet(@RequestBody petDTO: PetDTO, @PathVariable ownerId: Int) = petService.addPet(petDTO, ownerId)


    @GetMapping("/pet/{ownerId}")
    fun findPet(@PathVariable ownerId: Int): ResponseEntity<MutableList<PetDTO>> {

        val petOwner = petService.findPetByOwnerId(ownerId)
        return if (petOwner != null) {

            ResponseEntity.ok(petOwner)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/deletepet/{petId}")
    fun deletePet(@PathVariable petId: Int): ResponseEntity<String> {
        val deletePet = petService.deletePet(petId)

        if (deletePet) {
            return ResponseEntity.ok("Pet deleted successfully")
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting pet")
    }

    @PatchMapping("/updatepet/{petId}")
    fun updatePet(@RequestBody petDTO: PetDTO, @PathVariable petId: Int): ResponseEntity<PetDTO?> {
        val petUpdate = petService.updatePetDetails(petDTO, petId)
        return if (petUpdate != null) {

            ResponseEntity.ok(petUpdate)
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
