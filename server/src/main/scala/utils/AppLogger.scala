package utils

import org.slf4j.LoggerFactory
import play.api.Logger
//import utils.Logging.metrics
//import utils.metrics.Instrumented

object AppLogger /*extends Instrumented*/ {
  //  private[this] val traceMeter = metrics.meter("log.trace")
  //  private[this] val debugMeter = metrics.meter("log.debug")
  //  private[this] val infoMeter = metrics.meter("log.info")
  //  private[this] val warnMeter = metrics.meter("log.warn")
  //  private[this] val errorMeter = metrics.meter("log.error")

  private[this] var callback: Option[(Int, String) => Unit] = None

  def setCallback(f: (Int, String) => Unit) = callback = Some(f)

  case class CustomLogger(name: String) extends Logger(LoggerFactory.getLogger(name)) {
    override def trace(message: => String) = {
      //      traceMeter.mark()
      super.trace(message)
    }
    override def trace(message: => String, error: => Throwable) = {
      //      traceMeter.mark()
      super.trace(message, error)
    }
    override def debug(message: => String) = {
      //      debugMeter.mark()
      super.debug(message)
    }
    override def debug(message: => String, error: => Throwable) = {
      //      debugMeter.mark()
      super.debug(message, error)
    }
    override def info(message: => String) = {
      callback.foreach(_(1, message))
      //      infoMeter.mark()
      super.info(message)
    }
    override def info(message: => String, error: => Throwable) = {
      callback.foreach(_(1, message))
      //      infoMeter.mark()
      super.info(message, error)
    }
    override def warn(message: => String) = {
      callback.foreach(_(2, message))
      //      warnMeter.mark()
      super.warn(message)
    }
    override def warn(message: => String, error: => Throwable) = {
      callback.foreach(_(2, message))
      //      warnMeter.mark()
      super.warn(message, error)
    }
    override def error(message: => String) = {
      callback.foreach(_(3, message))
      //      errorMeter.mark()
      super.error(message)
    }
    override def error(message: => String, error: => Throwable) = {
      callback.foreach(_(3, message))
      //      errorMeter.mark()
      super.error(message, error)
    }
    def errorThenThrow(message: => String) = {
      this.error(message)
      throw new IllegalStateException(message)
    }
    def errorThenThrow(message: => String, error: => Throwable) = {
      this.error(message, error)
      throw error
    }
  }
}

trait AppLogger {
  protected[this] val log = AppLogger.CustomLogger(s"realworld.${this.getClass.getSimpleName.replace("$", "")}")
}
