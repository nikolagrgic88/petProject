package PetRegistryProject.petproject.entities

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern

import java.util.*


@Entity
@Table(name = "petowner")
data class PetOwner(
    @field:NotBlank(message = "First Name must not be blank")
    val firstname: String,
    @field:NotBlank(message = "Last Name must not be blank")
    val lastname: String,
    val dateofbirth: Date,
    @field:NotBlank(message = "Home Phone must not be blank")
    var homephone: String,
    @field:NotBlank(message = "Mobile Phone must not be blank")
    @field:Pattern(regexp = "[0-9]{4} [0-9]{3} [0-9]{3}", message = "Format required is XXXX XXX XXX")
    var mobilephone: String,
    @field:NotBlank(message = "Street Number must not be blank")
    var streetnumber: String,
    @field:NotBlank(message = "Street Name must not be blank")
    var streetname: String,
    @field:NotBlank(message = "Street Type must not be blank")
    var streettype: String,
    @field:NotBlank(message = "Suburb must not be blank")
    var suburb: String,
    @field:NotBlank(message = "State must not be blank")
    var state: String,
    //@field:NotBlank(message = "Postcode must not be blank")
    var postcode: Int,
    @field:NotBlank(message = "Email must not be blank")
    var emailaddress: String,
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "petownerid")
    val petownerid: Int? = null,

    @OneToMany(mappedBy = "petOwner")
    val pets: List<Pet> = mutableListOf()
)
