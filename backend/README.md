
REAL WORLD BACKEND
==================

REST API application which serves information about possible direct and interconnected flights
(maximum 1 stop) based on the data consumed from the following external APIs:

* [Routes API]
* [Schedules API]

https://services-api.ryanair.com/timtbl/3/schedules/DUB/MAD/years/2018/months/12
https://services-api.ryanair.com/locate/3/routes

https://dev-services-api.ryanair.com/timtbl/3/schedules/DUB/MAD/years/2018/months/12
https://dev-services-api.ryanair.com/locate/3/routes

[Routes API]: https://api.ryanair.com/core/3/routes
[Schedules API]:
  https://api.ryanair.com/timetable/3/schedules/{departure}/{arrival}/years/{year}/months/{month}

HTTP API:

```
GET http://<HOST>/<CONTEXT>/interconnections?
  departure={departure}&
  arrival={arrival}&
  departureDateTime={departureDateTime}&
  arrivalDateTime={arrivalDateTime}
```

where:

* departure: a departure airport IATA code
* departureDateTime: a departure datetime in the departure airport timezone in ISO format
* arrival: an arrival airport IATA code
* arrivalDateTime: an arrival datetime in the arrival airport timezone in ISO format

for example:
[http://localhost:8080/realworld/interconnections?departure=DUB&arrival=WRO&departureDateTime=2018-03-01T07:00&arrivalDateTime=2018-03-03T21:00][Example]

[Example]:
  http://localhost:8080/realworld/interconnections?departure=DUB&arrival=WRO&departureDateTime=2019-04-01T00:00&arrivalDateTime=2019-04-01T23:59

## Build

From now on assume `alias gw='./gradlew'`.

* Build: `./gradlew installDist`
* Rebuild: `./gradlew clean installDist`
* Run: `./gradlew run`
* Watch: `./gradlew --no-daemon --continuous runService`
* Test: `./gradlew test`

## Testing

MockK

## TODO

* Support only direct flights `directOnly` in `findRoutes`
* Implement two versions of the `routes` services, with and without caching (or disable in config)
* Check values assigned to model fields
* Check connections between years (31 dec)
* Add more BDD tests
* Use error handler in controller instead try/catch block
* Create native executable using GraalVM
