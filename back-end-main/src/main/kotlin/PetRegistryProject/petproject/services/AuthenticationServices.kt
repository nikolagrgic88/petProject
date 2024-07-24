package PetRegistryProject.petproject.services

import PetRegistryProject.petproject.config.CorsConfig
import PetRegistryProject.petproject.dto.UserDTO
import PetRegistryProject.petproject.entities.User
import PetRegistryProject.petproject.repositories.UserRepository
import PetRegistryProject.petproject.util.createJWTToken
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthenticationServices(val userRepository: UserRepository, val corsConfig: CorsConfig) {

    fun signup(userDTO: UserDTO): ResponseEntity<Map<String, Any?>> {

        if (userRepository.findByEmail(userDTO.email) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mapOf("message" to "Email is already taken"))
        }
        // Creating a new user
        val passwordEncoder = BCryptPasswordEncoder()
        val rawPassword = userDTO.password
        val encodedPassword = passwordEncoder.encode(rawPassword)

        val userEntity = User(email = userDTO.email, password = encodedPassword)
        val savedUser = userRepository.save(userEntity)


        val responseMap = mapOf(
            "message" to "User registered successfully",
            "operation" to "signup",
            "userId" to savedUser.id,
        )
        return ResponseEntity.status(HttpStatus.CREATED).body(responseMap)

    }


    fun login(userDTO: UserDTO, response: HttpServletResponse): ResponseEntity<Map<String, Any?>> {

        val user = userRepository.findByEmail(userDTO.email)
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(mapOf("message" to "Invalid credentials"))
        }
        val storedHashedPassword = user.password
        val passwordEncoder = BCryptPasswordEncoder()
        val rawPassword = userDTO.password


        if (!passwordEncoder.matches(rawPassword, storedHashedPassword)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(mapOf("message" to "Invalid credentials"))
        } else {

            val jwt = createJWTToken(user.id.toString(), corsConfig.generateSecretKey(), 60000)


            val cookie = Cookie("token", jwt)

            cookie.path = "/"
            cookie.isHttpOnly = true
            response.addCookie(cookie)

            val responseMap =
                mapOf(
                    "message" to "User logged in successfully",
                    "operation" to "login",
                    "userId" to user.id,
                    "token" to jwt

                )
            return ResponseEntity.status(HttpStatus.OK).body(responseMap)


        }
    }
}

