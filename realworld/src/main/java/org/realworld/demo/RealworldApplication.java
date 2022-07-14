package org.realworld.demo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class RealworldApplication {

  public static void main(String[] args) {
    log.debug("console debug");
    log.info("file log");
    SpringApplication.run(RealworldApplication.class, args);
  }

}
