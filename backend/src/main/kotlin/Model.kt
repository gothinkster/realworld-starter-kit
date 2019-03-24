package com.hexagonkt.realworld

import java.time.LocalDateTime

data class Flight(
    val number: String,
    val departure: LocalDateTime,
    val arrival: LocalDateTime
)

data class Interconnection(val legs: List<Leg>) {
    val stops: Int = legs.size - 1
}

data class Leg(
    val flightNumber: String,
    val departureAirport: String,
    val arrivalAirport: String,
    val departureDateTime: LocalDateTime,
    val arrivalDateTime: LocalDateTime
)

data class Route(
    val airportFrom: String,
    val airportTo: String,
    val connectingAirport: String? = null,
    val newRoute: Boolean = false,
    val seasonalRoute: Boolean = false,
    val operator: String = "NA",
    val group: String = "NA"
)
