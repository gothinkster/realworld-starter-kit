package com.hexagonkt.realworld

import java.time.LocalDateTime

interface InterconnectionsService {
    fun findInterconnections(route: Route, departure: LocalDateTime, arrival: LocalDateTime):
        List<Interconnection>
}

interface RoutesService {
    fun findRoutes(airportFrom: String, airportTo: String): List<Route>
}

interface SchedulesService {
    fun findFlights(departure: String, arrival: String, year: Int, month: Int): List<Flight>
}
