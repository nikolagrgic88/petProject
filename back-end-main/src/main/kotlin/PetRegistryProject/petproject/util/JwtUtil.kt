package PetRegistryProject.petproject.util

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import java.security.Key
import java.util.*
import kotlin.coroutines.ContinuationInterceptor

fun createJWTToken(userId: String, secretKey: Key, expirationTimeMillis: Long): String {
    val now = Date()
    val expiration = Date(now.time + expirationTimeMillis)

    return Jwts.builder()
        .setSubject(userId)
        .setIssuedAt(now)
        .setExpiration(expiration)
        .signWith(secretKey,SignatureAlgorithm.HS512)
        .compact()
}
