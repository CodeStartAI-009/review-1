 # backend/Dockerfile
FROM eclipse-temurin:17-jdk-alpine   # Use an existing supported version
WORKDIR /app
COPY target/weather-backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
