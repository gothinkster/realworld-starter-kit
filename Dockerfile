FROM openjdk:17-slim

MAINTAINER srbe

WORKDIR /home/root/realworld

EXPOSE 8080 8081

COPY target/dropwizard-realworld-example-app-1.0-SNAPSHOT.jar app.jar
COPY config.yml config.yml

ENTRYPOINT ["sh", "-c", "java -jar app.jar db migrate config.yml && java -jar app.jar server config.yml"]
