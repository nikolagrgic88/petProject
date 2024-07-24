package PetRegistryProject.petproject.entities

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "pet")
data class Pet(
    var microchip: Int,
    var petname: String,
    var species: String,
    var breed: String,
    var gender: String,
    var desexed: String,
    var dateofbirth: Date,
    var identifyingmarks: String,
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "petid")
    var petid: Int? = null,

    @ManyToOne
    @JoinColumn(name = "petownerid", referencedColumnName = "petownerid")
    val petOwner: PetOwner
)

