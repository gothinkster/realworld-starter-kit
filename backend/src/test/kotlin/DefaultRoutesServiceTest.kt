package com.hexagonkt.realworld

import org.junit.Test

class DefaultRoutesServiceTest {
    private val routesService: RoutesService = DefaultRoutesService()

    @Test fun `findRoutes handles errors properly`() {
        assert(!routesService.findRoutes("MAD", "DUB").isEmpty())

        assert(routesService.findRoutes("", "DUB").isEmpty())
        assert(routesService.findRoutes("INVALID", "DUB").isEmpty())

        assert(routesService.findRoutes("MAD", "").isEmpty())
        assert(routesService.findRoutes("MAD", "INVALID").isEmpty())
    }
}
