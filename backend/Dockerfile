
FROM eclipse-temurin:17-jre-alpine
LABEL description="realworld API"

# Project setup
ENV PROJECT backend
ENV TZ UTC

EXPOSE 2010

# Machine setup
VOLUME /tmp
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Project install
USER 1000
ADD --chown=1000:1000 build/distributions/$PROJECT*.tar /opt

# Process execution
WORKDIR /opt/$PROJECT*
ENTRYPOINT /opt/$PROJECT*/bin/$PROJECT
