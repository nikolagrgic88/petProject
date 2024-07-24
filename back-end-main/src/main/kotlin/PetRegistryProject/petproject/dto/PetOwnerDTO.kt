package PetRegistryProject.petproject.dto

import java.util.*

data class PetOwnerDTO (
    val firstname: String,
    val lastname: String,
    val dateofbirth: Date,
    val homephone: String,
    val mobilephone: String,
    val streetnumber: String,
    val streetname: String,
    val streettype: String,
    val suburb: String,
    val state: String,
    val postcode: Int,
    val emailaddress: String,
    val petownerid: Int? = null
    )
