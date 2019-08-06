package com.hexagonkt.realworld

import io.cucumber.junit.Cucumber
import io.cucumber.junit.CucumberOptions
import org.junit.runner.RunWith

@RunWith(Cucumber::class)
@CucumberOptions(
    strict = true,
    plugin = [
        "html:build/reports/cucumber",
        "json:build/reports/cucumber/cucumber.json"
    ],
    features = [ "src/test/resources/features" ]
)
class FeaturesTest
