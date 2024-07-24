package PetRegistryProject.petproject

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration


@SpringBootApplication(exclude = [SecurityAutoConfiguration::class])
class BlogApplication

fun main(args: Array<String>) {
    runApplication<BlogApplication>(*args)
}


