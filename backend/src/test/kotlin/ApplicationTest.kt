package com.hexagonkt.realworld

import com.hexagonkt.http.client.Client
import com.hexagonkt.serialization.parseList
import org.junit.After
import org.junit.Before
import org.junit.Test
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter.ISO_DATE
import java.time.format.DateTimeFormatter.ISO_TIME

class ApplicationTest {
    private val client: Client by lazy { Client("http://localhost:${server.runtimePort}") }

    @Before fun startup() {
        main()
    }

    @After fun shutdown() {
        server.stop()
    }

    @Test fun `Request without required fields returns error status`() {
        assert(client.get("/interconnections").statusCode == 500)
    }

    @Test fun `Correct request returns a valid interconnection`() {
        fun isoTime(dateTime: LocalDateTime): String =
            dateTime.format(ISO_DATE) + 'T' + dateTime.format(ISO_TIME)

        val departureTime = LocalDate.now().atStartOfDay()
        val arrivalTime = LocalDate.now().plusDays(7).atTime(23, 59)

        val departure = "departureDateTime=" + isoTime(departureTime)
        val arrival = "arrivalDateTime=" + isoTime(arrivalTime)
        val airportFrom = "departure=MAD"
        val airportTo = "arrival=DUB"

        val response = client.get("/interconnections?$airportFrom&$departure&$airportTo&$arrival")
        val content = response.responseBody.parseList(Interconnection::class)

        assert(response.statusCode == 200)
        assert(content.isNotEmpty())
    }

    @Test fun `OPTIONS returns correct CORS headers`() {
        val response = client.options("/interconnections")
        assert(response.statusCode == 200)
        assert(response.headers["Access-Control-Allow-Origin"] == "*")
        assert(response.headers["Access-Control-Allow-Headers"] == "Content-Type")
    }
}
