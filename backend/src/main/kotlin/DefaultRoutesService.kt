package com.hexagonkt.realworld

import com.hexagonkt.http.client.Client
import com.hexagonkt.serialization.parseList
import com.hexagonkt.settings.SettingsManager.requireSetting

internal class DefaultRoutesService(
    private val httpClient: Client = Client(requireSetting("routesApiEndpoint"))
) : RoutesService {

    private val allRoutes: List<Route> by lazy {
        httpClient.get("").responseBody.parseList(Route::class)
    }

    override fun findRoutes(airportFrom: String, airportTo: String): List<Route> = allRoutes
        .filter { it -> it.airportFrom == airportFrom }
        .filter { it -> it.airportTo == airportTo }
}
