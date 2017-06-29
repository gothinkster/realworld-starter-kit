package modules

import com.mohiva.play.silhouette.api.crypto._
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services._
import com.mohiva.play.silhouette.api.util.{PasswordHasherRegistry, _}
import com.mohiva.play.silhouette.api.{Environment, EventBus, Silhouette, SilhouetteProvider}
import com.mohiva.play.silhouette.crypto.{JcaCookieSigner, JcaCookieSignerSettings, JcaCrypter, JcaCrypterSettings}
import com.mohiva.play.silhouette.impl.authenticators._
import com.mohiva.play.silhouette.impl.util._
import com.mohiva.play.silhouette.password.BCryptPasswordHasher
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import com.mohiva.play.silhouette.persistence.repositories.DelegableAuthInfoRepository
import com.softwaremill.macwire._
import net.ceedubs.ficus.Ficus._
import net.ceedubs.ficus.readers.ArbitraryTypeReader._
import play.api.Configuration
import play.api.libs.concurrent.Execution.Implicits._
import utils.auth.DefaultEnv
import com.mohiva.play.silhouette.impl.providers._
import com.mohiva.play.silhouette.impl.services._
import play.api.cache.{CacheApi, EhCacheComponents}
import play.api.libs.ws.WSClient
import play.api.libs.ws.ahc.AhcWSComponents
import services.{PasswordInfoService, UserService}
import net.ceedubs.ficus.readers.EnumerationReader._

trait SilhouetteModule extends SilhouetteActionConfig with EhCacheComponents with AhcWSComponents {

  def configuration: Configuration

  def defaultCacheApi: CacheApi

  def wsClient: WSClient

  def userService: UserService

  def passwordInfoService: PasswordInfoService

  lazy val cacheLayer = wire[PlayCacheLayer]
  lazy val httpLayer = wire[PlayHTTPLayer]
  lazy val settings = GravatarServiceSettings()
  lazy val avatarService = wire[GravatarService]

  //  lazy val passwordInfoDAO = wire[PasswordInfoService]
  lazy val authInfoRepository = wireWith(SilhouetteAuthInfoRepository.apply _)
  lazy val passwordHasher = new BCryptPasswordHasher
  lazy val passwordHasherRegistry = new PasswordHasherRegistry(passwordHasher, Nil)
  lazy val credentialsProvider: CredentialsProvider = wireWith(SilhouetteCredentialsProvider.apply _)

  lazy val fingerprintGenerator = new DefaultFingerprintGenerator(false)
  lazy val jcaCookieSignerSettings = new JcaCookieSignerSettings("silhouette.authenticator.cookieSigner")
  lazy val jcacookieSigner = new JcaCookieSigner(jcaCookieSignerSettings)
  lazy val idGenerator = new SecureRandomIDGenerator
  lazy val authenticatorEncoder = new Base64AuthenticatorEncoder()
  lazy val clock = Clock()
  lazy val authenticatorService = wireWith(SilhouetteAuthenticatorService.apply _)
  lazy val eventBus = EventBus()
  lazy val silhouetteEnvironment = wireWith(SilhouetteEnvironment.apply _)
  lazy val silhouette: Silhouette[DefaultEnv] = wire[SilhouetteProvider[DefaultEnv]]

  object SilhouetteAuthenticatorService {
    def apply(
      idGenerator: IDGenerator,
      clock: Clock, configuration: Configuration
    ): AuthenticatorService[JWTAuthenticator] = {
      val config = configuration.underlying.as[JWTAuthenticatorSettings]("silhouette.authenticator")
      val crypterConfig = configuration.underlying.as[JcaCrypterSettings]("silhouette.authenticator.crypter")
      val encoder = new CrypterAuthenticatorEncoder(new JcaCrypter(crypterConfig))
      new JWTAuthenticatorService(config, None, encoder, idGenerator, clock)
    }
  }

  object SilhouetteEnvironment {
    def apply(
      userService: UserService,
      authenticatorService: AuthenticatorService[JWTAuthenticator],
      eventBus: EventBus
    ): Environment[DefaultEnv] = {
      Environment[DefaultEnv](userService, authenticatorService, Seq(), eventBus)
    }
  }

  object SilhouetteAuthInfoRepository {
    def apply(
      passwordInfoDAO: DelegableAuthInfoDAO[PasswordInfo]
    ): AuthInfoRepository = {
      new DelegableAuthInfoRepository(
        passwordInfoDAO
      )
    }
  }

  object SilhouetteCredentialsProvider {
    def apply(
      authInfoRepository: AuthInfoRepository,
      passwordHasherRegistry: PasswordHasherRegistry
    ): CredentialsProvider = {

      new CredentialsProvider(authInfoRepository, passwordHasherRegistry)
    }
  }

}