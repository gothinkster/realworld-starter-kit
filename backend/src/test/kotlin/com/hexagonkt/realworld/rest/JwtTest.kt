package com.hexagonkt.realworld.rest

import com.hexagonkt.realworld.Jwt
import org.junit.jupiter.api.Test
import java.net.URL

class JwtTest {

    @Test fun `JWT creation and parsing works properly`() {
        val jwt = Jwt(URL("classpath:keystore.p12"), "storepass", "realWorld")
        val token = jwt.sign("subject")

        assert(jwt.verify(token).subject == "subject")
    }
}
