package com.hexagonkt.realworld

import org.junit.runner.RunWith
import cucumber.api.CucumberOptions
import cucumber.api.junit.Cucumber

@RunWith(Cucumber::class)
@CucumberOptions(
    plugin = [
        "html:build/reports/cucumber",
        "json:build/reports/cucumber/cucumber.json"
    ],
    features = [ "src/test/resources/features" ]
)
class FeaturesTest
