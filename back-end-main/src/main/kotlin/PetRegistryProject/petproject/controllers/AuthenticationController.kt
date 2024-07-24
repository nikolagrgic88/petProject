package PetRegistryProject.petproject.controllers


import PetRegistryProject.petproject.services.PetOwnerService
import PetRegistryProject.petproject.dto.*
import PetRegistryProject.petproject.services.AuthenticationServices
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
class AuthenticationController(val authenticationServices: AuthenticationServices, val petOwnerService: PetOwnerService) {

    @PostMapping("/signup")
    fun signUp(@RequestBody body: UserDTO): ResponseEntity<Map<String, Any?>> {
        val newUser = authenticationServices.signup(body)

        return newUser
    }

    @PostMapping("/login")
    fun login(@RequestBody body: UserDTO, response: HttpServletResponse): ResponseEntity<Map<String, Any?>> {
        val response1 = authenticationServices.login(body, response)
        println(response1.body)
        print(response)
        return   response1
    }
}


