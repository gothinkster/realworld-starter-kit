package com.hexagonkt.realworld

import com.hexagonkt.settings.SettingsManager.requireSetting
import java.time.LocalDateTime
import java.util.Arrays

import java.util.Collections.emptyList

internal class DefaultInterconnectionsService internal constructor(
    private val schedulesService: SchedulesService = DefaultSchedulesService()
) : InterconnectionsService {

    override fun findInterconnections(
        route: Route, departure: LocalDateTime, arrival: LocalDateTime): List<Interconnection> {

        val airportFrom = route.airportFrom
        val connectingAirport = route.connectingAirport
        val airportTo = route.airportTo

        val directFlights = findFlights(airportFrom, airportTo, departure, arrival)
        val startingFlights = findFlights(airportFrom, connectingAirport, departure, arrival)
        val finalFlights = findFlights(connectingAirport, airportTo, departure, arrival)
        val flightGroups = groupFlights(startingFlights, finalFlights)

        return (flightGroups + directFlights.map { listOf(it) })
            .map { flights -> createInterconnection(route, flights) }
    }

    private fun groupFlights(startingFlights: List<Flight>, finalFlights: List<Flight>):
        List<List<Flight>> {

        val maxConnectionMinutes = requireSetting<Int>("maxConnectionMinutes")

        return startingFlights.flatMap { flight ->
            val limit = flight.arrival.plusMinutes(maxConnectionMinutes.toLong())

            finalFlights
                .filter { it.departure.isAfter(limit) }
                .map { Arrays.asList(flight, it) }
        }
    }

    private fun findFlights(
        airportFrom: String?,
        airportTo: String?,
        departure: LocalDateTime,
        arrival: LocalDateTime): List<Flight> =

            if (airportFrom == null || airportTo == null)
                emptyList()
            else schedulesService
                .findFlights(airportFrom, airportTo, departure.year, departure.monthValue)
                .filter { it.departure.isAfter(departure) }
                .filter { it.arrival.isBefore(arrival) }

    private fun createInterconnection(route: Route, flights: List<Flight>): Interconnection =
        Interconnection(flights.map { createLeg(route, it) })

    private fun createLeg(route: Route, flight: Flight): Leg = Leg(
        flightNumber = flight.number,
        departureAirport = route.airportFrom,
        arrivalAirport = route.airportTo,
        departureDateTime = flight.departure,
        arrivalDateTime = flight.arrival
    )
}
