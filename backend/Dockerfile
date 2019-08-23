
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
COPY backend/build/install/$PROJECT /opt/$PROJECT
RUN touch /opt/$PROJECT

# Process execution
WORKDIR /opt/$PROJECT
ENTRYPOINT /opt/$PROJECT/bin/$PROJECT
