package com.hexagonkt.realworld

import com.hexagonkt.http.client.Client
import io.cucumber.java.After
import io.cucumber.java.Before
import io.cucumber.java8.En
import org.asynchttpclient.Response

class Steps : En {

    private lateinit var httpResponse: Response

    private val httpClient: Client by lazy { Client("http://localhost:${server.runtimePort}/api") }

    @Before fun startup() {
        main()
    }

    @After fun shutdown() {
        server.stop()
    }

    // IMPORTANT: Cucumber *DOES NOT WORK* with Kotlin method references
    init {
        When("a request is made") { whenARequestIsMade() }
        Then("the service returns a 200 code") { thenTheServiceReturnsOk() }
    }

    private fun whenARequestIsMade() {
        httpResponse = httpClient.get("/tags")
    }

    private fun thenTheServiceReturnsOk() {
        assert(httpResponse.statusCode == 200)
        assert(httpResponse.headers["Access-Control-Allow-Origin"] == "*")
    }
}
