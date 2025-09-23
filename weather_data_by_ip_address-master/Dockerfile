# Use a Java 17 JDK image compatible with M1/M2
FROM eclipse-temurin:17-jdk-focal

# Set working directory inside container
WORKDIR /app

# Copy the jar file into the container
COPY target/weather-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8081

# Run the app
ENTRYPOINT ["java","-jar","app.jar"]
