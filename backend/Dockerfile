
#
# BUILD
#
FROM oracle/graalvm-ce:1.0.0-rc14 as build
USER root
WORKDIR /build

ADD . /build
RUN ./gradlew all

#
# RUNTIME
#
FROM openjdk:11
LABEL description="realworld API"
USER root

ENV TZ Europe/Madrid
ENV PROJECT backend

# Machine setup
VOLUME /tmp
EXPOSE 9090

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Project install
COPY --from=build /build/$PROJECT/build/install/$PROJECT /opt/$PROJECT
RUN touch /opt/$PROJECT

# Process execution
WORKDIR /opt/$PROJECT
ENTRYPOINT /opt/$PROJECT/bin/$PROJECT
