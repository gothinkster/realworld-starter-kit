package utils.web

import play.api.http.HttpFilters
import play.api.mvc.EssentialFilter
import play.filters.csrf.CSRFFilter
import play.filters.gzip.GzipFilter
import play.filters.headers.SecurityHeadersFilter

/**
 * Provides filters.
 */
class Filters( /*csrfFilter: CSRFFilter, corsFilter: CORSFilter, */ securityHeadersFilter: SecurityHeadersFilter,
    gzipFilter: GzipFilter /*, customLoggerFilter: LoggingFilter*/ ) extends HttpFilters {
  override def filters: Seq[EssentialFilter] = Seq(securityHeadersFilter /*, csrfFilter ,corsFilter*/ , gzipFilter)
}
