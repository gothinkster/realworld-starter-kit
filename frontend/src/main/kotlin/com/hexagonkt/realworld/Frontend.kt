package com.hexagonkt.realworld

import kotlinx.html.a
import kotlinx.html.div
import kotlinx.html.dom.create
import kotlinx.html.i
import kotlinx.html.js.div
import kotlin.browser.document
import kotlin.browser.window

fun main() {
    window.setInterval({
        val myDiv = document.create.div("col-md-4") {
            div("link") {
                a("/quick_start.html") {
                    div("feature-icon") {
                        i("fa fa-smile-o fa-4")
                    }
                    div("feature-text feature-title") { +"Simple to Use" }
                    div("feature-text") {
                        +"""
                            Hexagon is focused in allowing you to use the features you use the most
                            in your daily coding in the easiest way.
                        """
                    }
                }
            }
        }

        document.getElementById("firstRow")?.appendChild(myDiv)
    }, 1000)
}
