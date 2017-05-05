package com.realworld.client.views

import com.realworld.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react.extra.router.{Resolution, RouterCtl}
import japgolly.scalajs.react.vdom.html_<^._

// scalastyle:off
object MainLayout {

  def layout(c: RouterCtl[Loc], r: Resolution[Loc]): VdomElement = {
    <.div(
      Header.header(c, r),
      // the vertically center area
      r.render(),
      Footer.footer()
    )
  }

}
