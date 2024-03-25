
FROM openjdk:17-jdk-alpine


WORKDIR /app


COPY target/*.jar /app/inwin.jar


ENTRYPOINT exec java $JAVA_OPTS -jar inwin.jar
