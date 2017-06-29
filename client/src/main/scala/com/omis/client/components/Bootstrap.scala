package com.omis.client.components

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import org.scalajs.dom.ext.KeyCode
import org.querki.jquery._
import org.querki.jsext.{JSOptionBuilder, OptMap}
import scala.language.{implicitConversions, reflectiveCalls}
import scala.scalajs.js
import org.querki.jsext.noOpts

/**
 * Common Bootstrap components for scalajs-react
 */
object Bootstrap {

  // shorthand for styles
  @js.native
  trait BootstrapJQuery extends JQuery {
    def modal(action: String): BootstrapJQuery = js.native

    def modal(options: js.Any): BootstrapJQuery = js.native

    def popover(options: PopoverOptions): Any = js.native

    def tooltip(options: TooltipOptions): Any = js.native
  }

  @js.native
  trait PopoverOptions extends js.Object

  class PopoverOptionBuilder(val dict: OptMap) extends JSOptionBuilder[PopoverOptions, PopoverOptionBuilder](new PopoverOptionBuilder(_)) {
    def animation(v: Boolean) = jsOpt("animation", v)

    def html(v: Boolean) = jsOpt("html", v)

    def selector(v: String) = jsOpt("selector", v)

    def title(v: String) = jsOpt("title", v)

    def title(v: js.Function0[String]) = jsOpt("title", v)

    def content(v: String) = jsOpt("content", v)

    def delay(v: Int) = jsOpt("delay", v)

    def container(v: String) = jsOpt("container", v)
  }

  object PopoverOptions extends PopoverOptionBuilder(noOpts)

  @js.native
  type TooltipOptions = PopoverOptions
  val TooltipOptions = PopoverOptions

  implicit def jq2bootstrap(jq: JQuery): BootstrapJQuery = jq.asInstanceOf[BootstrapJQuery]

  // Common Bootstrap contextual styles
  object CommonStyle extends Enumeration {
    val default, primary, success, info, warning, danger = Value
  }

  object Modal {

    // header and footer are functions, so that they can get access to the the hide() function for their buttons
    case class Props(closed: () => Callback, backdrop: String = "static",
      keyboard: Boolean = true, id: String = "", CSSClass: String = "", headerText: String = "")

    //    val OuterRef = Ref("o")

    class Backend(t: BackendScope[Props, Unit]) {
      def init: Callback = Callback.empty

      //        OuterRef(t).tryFocus

      def closePopup = Callback {
        // instruct Bootstrap to hide the modal
        $(t.getDOMNode.runNow()).modal("hide")

      }

      // jQuery event handler to be fired when the modal has been hidden
      def hidden( /*e: JQueryEventObject, */ /*string: String*/ ): js.Any = {
        // inform the owner of the component that the modal was closed/hidden
        t.props.runNow().closed().runNow()
      }

      def modalClose(e: ReactKeyboardEvent): Callback = {

        def plainKey: CallbackOption[Unit] = // CallbackOption will stop if a key isn't matched
          CallbackOption.keyCodeSwitch(e) {
            case KeyCode.Escape => closePopup
            //  case  KeyCode.Enter => hide
          }

        plainKey >> e.preventDefaultCB
      }

      def render(P: Props, C: PropsChildren) = {
        <.div(^.id := P.id, ^.className := "modal fade", ^.role := "dialog", ^.aria.hidden := true, ^.tabIndex := -1,
          <.div(
            <.div(^.className := "modal-dialog")(
              <.div(^.className := "modal-content", ^.onKeyDown ==> modalClose, ^.className := P.CSSClass,
                <.div(
                  ^.className := "modal-header",
                  <.span(
                    <.button(
                      ^.onClick --> closePopup,
                      ^.className := "btn btn-outline-primary btn-sm pull-xs-right",
                      <.i(^.className := "ion-close")
                    )
                  ), <.div()(P.headerText)
                )),
              <.div(^.className := "modal-body", ^.backgroundColor := "white", C)
            )
          ))
      }
    }

    val component = ScalaComponent.builder[Props]("Modal")
      /*  .stateless*/
      .renderBackendWithChildren[Backend]
      .componentDidMount(_.backend.init)
      .componentDidMount(scope => Callback {
        val P = scope.props
        // instruct Bootstrap to show the modal data-backdrop="static" data-keyboard="false"
        $(scope.getDOMNode).modal(js.Dynamic.literal("backdrop" -> P.backdrop, "keyboard" -> P.keyboard, "show" -> true))
        // register event listener to be notified when the modal is closed
        // jQuery(scope.getDOMNode).on("hidden.bs.modal", null, null, scope.backend.hidden _)
        $(scope.getDOMNode).on("hidden.bs.modal", "", js.undefined, scope.backend.hidden _)
      })
      .configure()
      .build

  }

}
