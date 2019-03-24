package com.hexagonkt.realworld

import io.mockk.every
import io.mockk.mockk
import org.junit.Test
import java.time.LocalDate

class DefaultInterconnectionsServiceTest {

    private val schedulesService: SchedulesService = mockk()

    private val interconnectionsService: InterconnectionsService =
        DefaultInterconnectionsService(schedulesService)

    @Test fun `API finds direct flights`() {
        val date = LocalDate.of(2018, 12, 30)

        val flights = listOf(
            Flight(
                number = "on_time",
                departure = date.atTime(21, 50),
                arrival = date.atTime(23, 0)
            ),
            Flight(
                number = "before",
                departure = date.atTime(12, 50),
                arrival = date.atTime(15, 0)
            ),
            Flight(
                number = "after",
                departure = date.atTime(23, 55),
                arrival = date.atTime(23, 59)
            ),
            Flight(
                number = "departure_before",
                departure = date.atTime(19, 50),
                arrival = date.atTime(23, 0)
            ),
            Flight(
                number = "arrival_after",
                departure = date.atTime(21, 50),
                arrival = date.atTime(23, 55)
            )
        )

        every { schedulesService.findFlights(any(), any(), any(), any()) } returns flights

        val route = Route("MAD", "DUB")
        val departure = date.atTime(20, 0)
        val arrival = date.atTime(23, 50)
        val connections = interconnectionsService.findInterconnections(route, departure, arrival)

        assert(connections[0].legs.size == 1)
        assert(connections[0].legs[0].flightNumber == "on_time")
    }

    @Test fun `API finds flights with one stop`() {
        val date = LocalDate.of(2018, 12, 30)

        val directFlights = listOf(
            Flight(
                number = "d1",
                departure = date.atTime(10, 0),
                arrival = date.atTime(12, 0)
            ),
            Flight(
                number = "d2",
                departure = date.atTime(11, 0),
                arrival = date.atTime(13, 0)
            )
        )

        val originFlights = listOf(
            Flight(
                number = "o1",
                departure = date.atTime(10, 0),
                arrival = date.atTime(12, 0)
            ),
            Flight(
                number = "o2",
                departure = date.atTime(11, 0),
                arrival = date.atTime(13, 0)
            )
        )

        val connectionFlights = listOf(
            Flight(
                number = "c1",
                departure = date.atTime(14, 30),
                arrival = date.atTime(16, 30)
            ),
            Flight(
                number = "c2",
                departure = date.atTime(15, 30),
                arrival = date.atTime(17, 30)
            )
        )

        every { schedulesService.findFlights("MAD", "DUB", any(), any()) } returns directFlights
        every { schedulesService.findFlights("MAD", "BCN", any(), any()) } returns originFlights
        every { schedulesService.findFlights("BCN", "DUB", any(), any()) } returns connectionFlights

        val connections = interconnectionsService.findInterconnections(
            Route("MAD", "DUB", "BCN"),
            date.atTime(9, 0),
            date.atTime(23, 0)
        )

        assert(connections.size == 5)

        connections.forEach { assert(it.stops == it.legs.size - 1) }
    }
}
