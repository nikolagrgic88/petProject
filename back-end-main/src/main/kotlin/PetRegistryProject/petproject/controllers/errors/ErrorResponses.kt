package PetRegistryProject.petproject.controllers.errors

import org.springframework.http.HttpStatus
import java.util.*


class ApiError {
    //
    var status: HttpStatus? = null
    var message: String? = null
    var errors: List<String>? = null

    //
    constructor() : super()
    constructor(status: HttpStatus?, message: String?, errors: List<String>?) : super() {
        this.status = status
        this.message = message
        this.errors = errors
    }

    constructor(status: HttpStatus?, message: String?, error: String) : super() {
        this.status = status
        this.message = message
        errors = Arrays.asList(error)
    }

    fun setError(error: String) {
        errors = Arrays.asList(error)
    }
}
