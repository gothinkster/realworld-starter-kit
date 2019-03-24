package com.hexagonkt.realworld

import com.hexagonkt.realworld.DefaultSchedulesService.*
import com.hexagonkt.http.client.Client
import com.hexagonkt.serialization.serialize
import io.mockk.every
import io.mockk.mockk
import org.asynchttpclient.Response
import org.junit.Before
import org.junit.Test

class DefaultSchedulesServiceTest {

    private val httpResponse: Response = mockk()
    private val httpClient: Client = mockk()

    private val schedulesService: DefaultSchedulesService = DefaultSchedulesService(httpClient)

    @Before fun setupMock() {
        every { httpClient.get(any(), any()) } returns httpResponse
    }

    @Test fun `findFlights returns the available flights in a time frame`() {
        val days = listOf(
            ScheduleDay(6, listOf(ScheduleFlight("1926", "17:50", "21:25"))),
            ScheduleDay(7, listOf(ScheduleFlight("1926", "19:30", "23:05"))),
            ScheduleDay(8, listOf(ScheduleFlight("1926", "17:45", "21:20")))
        )

        val schedule = Schedule(6, days)

        every { httpResponse.statusCode } returns 200
        every { httpResponse.responseBody } returns schedule.serialize()

        assert(schedulesService.findFlights("DUB", "WRO", 2018, 6).size == 3)
    }

    @Test fun `On service error return empty list`() {
        every { httpResponse.statusCode } returns 500

        assert(schedulesService.findFlights("DUB", "WRO", 2018, 6).isEmpty())
    }
}
