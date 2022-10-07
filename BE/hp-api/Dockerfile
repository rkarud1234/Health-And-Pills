FROM openjdk:17-ea-11-jdk-slim

VOLUME /tmp
COPY build/libs/hp-api-0.0.1-SNAPSHOT.jar hp-api.jar

ENV GOOGLE_APPLICATION_CREDENTIALS /home/vision.json

ENTRYPOINT ["java","-jar","hp-api.jar"]