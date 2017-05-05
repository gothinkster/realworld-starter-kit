package com.realworld.client

import com.realworld.client.router.ApplicationRouter
import org.scalajs.dom

import scala.scalajs.js

object RealWorld extends js.JSApp {
  def main(): Unit = {
    ApplicationRouter.router().renderIntoDOM(dom.document.getElementById("root"))
  }
}
