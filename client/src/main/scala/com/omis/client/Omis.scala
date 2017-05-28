package com.omis.client

import com.omis.client.router.ApplicationRouter
import org.scalajs.dom

import scala.scalajs.js

object Omis extends js.JSApp {

  def main(): Unit = {
    //    require()
    println("Application started")
    ApplicationRouter.router().renderIntoDOM(dom.document.getElementById("root"))
  }
}
