import { Before, setWorldConstructor } from '@cucumber/cucumber'
import RealWorld, { NestJSInternalDriver } from './custom-world.cucumber'

setWorldConstructor(RealWorld)

Before(async function (scenario) {
  this.init(scenario, NestJSInternalDriver())
})

import { Given } from '@cucumber/cucumber'
Given("I'm viewing the admin settings", async function () {
  this.a = 2
})
Given("I'm viewing the admaain settings", async function () {})
