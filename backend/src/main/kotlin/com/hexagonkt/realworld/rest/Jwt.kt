package com.hexagonkt.realworld.rest

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.helpers.Resource
import java.security.KeyStore
import java.security.interfaces.RSAPrivateKey
import java.security.interfaces.RSAPublicKey

fun loadKeyStore(resource: Resource, password: String): KeyStore =
    KeyStore.getInstance("PKCS12").apply {
        load(resource.requireStream(), password.toCharArray())
    }

fun KeyStore.getPrivateKey(alias: String, password: String): RSAPrivateKey =
    this.getKey(alias, password.toCharArray()) as RSAPrivateKey

fun KeyStore.getPublicKey(alias: String): RSAPublicKey =
    this.getCertificate(alias).publicKey as RSAPublicKey

class Jwt(keyStoreResource: Resource, password: String, private val alias: String) {
    private val keyStore = loadKeyStore(keyStoreResource, password)
    private val privateKey = keyStore.getPrivateKey(alias, password)
    private val publicKey = keyStore.getPublicKey(alias)
    private val algorithm: Algorithm = Algorithm.RSA256(publicKey, privateKey)
    private val verifier = JWT.require(algorithm).withIssuer(alias).build()

    fun sign(subject: String): String =
        JWT.create().withIssuer(alias).withSubject(subject).sign(algorithm)

    fun verify(token: String): DecodedJWT =
        verifier.verify(token)
}
