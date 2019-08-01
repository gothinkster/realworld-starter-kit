package com.hexagonkt.realworld

import com.hexagonkt.http.client.Client
import cucumber.api.java.After
import cucumber.api.java.Before
import cucumber.api.java8.En
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
        assert(httpResponse.contentType == "application/json;charset=utf-8")
    }
}
