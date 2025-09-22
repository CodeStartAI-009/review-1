 # Use a multi-platform Alpine-based JDK for ARM64 / AMD64
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/weather-backend-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]
