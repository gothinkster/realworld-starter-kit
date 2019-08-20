package com.hexagonkt.realworld.rest

import com.hexagonkt.helpers.Resource
import org.junit.Test

class JwtTest {

    @Test fun `JWT creation and parsing works properly`() {
        val jwt = Jwt(Resource("keystore.p12"), "storepass", "realWorld")
        val token = jwt.sign("subject")

        assert(jwt.verify(token).subject == "subject")
    }
}
