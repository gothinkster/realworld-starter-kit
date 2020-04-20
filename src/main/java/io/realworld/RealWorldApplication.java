package io.realworld;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.dropwizard.Application;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.chained.ChainedAuthFilter;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.jdbi3.JdbiFactory;
import io.dropwizard.jersey.setup.JerseyEnvironment;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.realworld.core.ArticleService;
import io.realworld.core.CommentService;
import io.realworld.core.ProfileService;
import io.realworld.core.UserService;
import io.realworld.db.ArticleRepository;
import io.realworld.db.CommentRepository;
import io.realworld.db.TagRepository;
import io.realworld.db.UserRepository;
import io.realworld.resources.*;
import io.realworld.resources.exceptionhandling.ApplicationExceptionMapper;
import io.realworld.security.*;
import org.jdbi.v3.core.Jdbi;

import java.util.List;

import static io.realworld.security.JwtAuthFilter.TOKEN_PREFIX;

public class RealWorldApplication extends Application<RealWorldConfiguration> {

    public static void main(final String[] args) throws Exception {
        new RealWorldApplication().run(args);
    }

    @Override
    public String getName() {
        return "RealWorld";
    }

    @Override
    public void initialize(final Bootstrap<RealWorldConfiguration> bootstrap) {
        bootstrap.addBundle(new MigrationsBundle<>() {
            @Override
            public DataSourceFactory getDataSourceFactory(final RealWorldConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        });

        enableConfigSubstitutionWithEnvVariables(bootstrap);
    }

    @Override
    public void run(final RealWorldConfiguration config, final Environment env) {
        final Jdbi jdbi = new JdbiFactory().build(env, config.getDataSourceFactory(), "database");

        final PasswordEncoder passwordEncoder = new PasswordEncoder();
        final JwtTokenService jwtTokenService = new JwtTokenService(config.getJwt());

        final ArticleRepository articleRepository = jdbi.onDemand(ArticleRepository.class);
        final CommentRepository commentRepository = jdbi.onDemand(CommentRepository.class);
        final UserRepository userRepository = jdbi.onDemand(UserRepository.class);
        final TagRepository tagRepository = jdbi.onDemand(TagRepository.class);

        final ArticleService articleService = new ArticleService(articleRepository, userRepository, commentRepository, tagRepository);
        final CommentService commentService = new CommentService(commentRepository, articleRepository, userRepository);
        final ProfileService profileService = new ProfileService(userRepository);
        final UserService userService = new UserService(userRepository, passwordEncoder, jwtTokenService);

        env.jersey().register(new ArticleResource(articleService));
        env.jersey().register(new CommentResource(commentService));
        env.jersey().register(new ProfileResource(profileService));
        env.jersey().register(new UserResource(userService));
        env.jersey().register(new UsersResource(userService));
        env.jersey().register(new TagsResource(tagRepository));

        env.jersey().register(new ApplicationExceptionMapper());

        configureJsonMapper(env.getObjectMapper());
        configureJwtAuth(env.jersey(), jwtTokenService);
    }

    private void configureJwtAuth(final JerseyEnvironment env, final JwtTokenService jwtTokenService) {
        env.register(new AuthValueFactoryProvider.Binder<>(UserPrincipal.class));
        env.register(new AuthDynamicFeature(new ChainedAuthFilter<JwtToken, UserPrincipal>(
                List.of(new JwtAuthFilter.Builder<UserPrincipal>()
                        .setPrefix(TOKEN_PREFIX)
                        .setAuthenticator(jwtTokenService)
                        .buildAuthFilter()))));
    }

    private void configureJsonMapper(final ObjectMapper mapper) {
        mapper.enable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        mapper.enable(DeserializationFeature.UNWRAP_ROOT_VALUE);
        mapper.registerModule(new JavaTimeModule());
    }

    private void enableConfigSubstitutionWithEnvVariables(final Bootstrap<RealWorldConfiguration> bootstrap) {
        final var envVarSubst = new EnvironmentVariableSubstitutor(true);
        final var provider = new SubstitutingSourceProvider(bootstrap.getConfigurationSourceProvider(), envVarSubst);
        bootstrap.setConfigurationSourceProvider(provider);
    }
}
