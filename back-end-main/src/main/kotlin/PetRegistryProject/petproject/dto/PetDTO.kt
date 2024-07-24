package PetRegistryProject.petproject.dto

import java.util.*

data class PetDTO (
    val microchip: Int,
    val petname: String,
    val species: String,
    val breed: String,
    val gender: String,
    val desexed: String,
    val dateofbirth: Date,
    val identifyingmarks: String,
    val petownerid: Int,
    val petid: Int? = null
)
