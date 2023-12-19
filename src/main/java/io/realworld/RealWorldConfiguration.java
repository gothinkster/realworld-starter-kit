package io.realworld;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.core.Configuration;
import io.dropwizard.db.DataSourceFactory;
import io.realworld.security.JwtConfiguration;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public class RealWorldConfiguration extends Configuration {
    private final DataSourceFactory dataSourceFactory;
    private final JwtConfiguration jwt;

    public RealWorldConfiguration(@JsonProperty("datasource") @Valid @NotNull final DataSourceFactory dataSourceFactory,
                                  @JsonProperty("jwt") @Valid @NotNull final JwtConfiguration jwt) {
        this.dataSourceFactory = dataSourceFactory;
        this.jwt = jwt;
    }

    public DataSourceFactory getDataSourceFactory() {
        return dataSourceFactory;
    }

    public JwtConfiguration getJwt() {
        return jwt;
    }
}
