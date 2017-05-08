package com.realworld.client

import com.realworld.client.router.ApplicationRouter
import japgolly.scalajs.react.WebpackRequire
import org.scalajs.dom

import scala.scalajs.js

object RealWorld extends js.JSApp {

  def require(): Unit = {
    WebpackRequire.React
    WebpackRequire.ReactDOM
    ()
  }

  def main(): Unit = {
    require()
    ApplicationRouter.router().renderIntoDOM(dom.document.getElementById("root"))
  }
}
