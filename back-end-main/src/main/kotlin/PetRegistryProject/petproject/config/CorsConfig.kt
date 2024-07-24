package PetRegistryProject.petproject.config


import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey


@Configuration
class CorsConfig {
    @Bean
    fun corsFilter():CorsFilter{
        val source = UrlBasedCorsConfigurationSource()
        val config = CorsConfiguration()

        config.allowCredentials = true
        config.allowedOrigins = listOf("http://localhost:3000")
        config.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
        config.allowedHeaders = listOf("Origin", "Content-Type", "Authorization")

        source.registerCorsConfiguration("/**", config)
        return CorsFilter(source)
    }

    @Bean
    fun generateSecretKey(): SecretKey {
        val keyGen = KeyGenerator.getInstance("HmacSHA512")
        keyGen.init(512)
        return keyGen.generateKey()
    }

}