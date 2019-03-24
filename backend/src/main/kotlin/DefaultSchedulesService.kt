package com.hexagonkt.realworld

import com.hexagonkt.http.client.Client
import com.hexagonkt.serialization.parse
import com.hexagonkt.settings.SettingsManager.requireSetting
import org.asynchttpclient.Response
import java.time.LocalDate
import java.time.LocalTime

import java.util.Collections.emptyList

internal class DefaultSchedulesService(
    private val httpClient: Client = Client(requireSetting("schedulesApiEndpoint"))
) : SchedulesService {

    // Only used to parse REST API responses
    internal data class ScheduleFlight(
        val number: String,
        val departureTime: String,
        val arrivalTime: String
    )

    // Only used to parse REST API responses
    internal data class ScheduleDay(val day: Int = 0, val flights: List<ScheduleFlight>)

    // Only used to parse REST API responses
    internal data class Schedule(val month: Int = 0, val days: List<ScheduleDay>)

    override
    fun findFlights(departure: String, arrival: String, year: Int, month: Int): List<Flight> {
        val response = httpClient.get("/$departure/$arrival/years/$year/months/$month")

        return if (response.statusCode == 200)
            createFlights(response, year, month)
        else
            emptyList()
    }

    private fun createFlights(response: Response, year: Int, month: Int): List<Flight> {
        val schedule = response.responseBody.parse(Schedule::class)
        return schedule.days.flatMap { day -> createDayFlights(day, year, month) }
    }

    private fun createDayFlights(day: ScheduleDay, year: Int, month: Int): List<Flight> =
        day.flights.map { flight -> createFlight(flight, LocalDate.of(year, month, day.day)) }

    private fun createFlight(scheduleFlight: ScheduleFlight, date: LocalDate): Flight {
        val departureTime = LocalTime.parse(scheduleFlight.departureTime).atDate(date)
        val arrivalTime = LocalTime.parse(scheduleFlight.arrivalTime).atDate(date)

        return Flight(
            number = scheduleFlight.number,
            departure = departureTime,
            arrival =
                if (arrivalTime.isBefore(departureTime)) arrivalTime.plusDays(1)
                else arrivalTime
        )
    }
}
