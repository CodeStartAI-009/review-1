
# Weather Insights by IP: A Spring Boot Application

This project is a Spring Boot application that provides weather information based on the user's IP address.
It fetches the user's IP address, determines their location, and then retrieves the weather data for that location using
the OpenWeather One Call API 3.0.

## Features

- Fetches the user's IP address using the client's HTTP request.
- Determines the user's location using the [ipapi](https://ipapi.co/) service.
- Retrieves current weather data for the user's location using the OpenWeather One Call API 3.0.
- Handles errors and provides meaningful responses for common HTTP errors such as 401 (Unauthorized) and 404 (Not Found).

## Prerequisites

- Java 8 or higher
- Maven
- An OpenWeather One Call API 3.0 subscription and API key

## Getting Started

### Clone the Repository

```bash
git clone git@github.com:patzu/weather_data_by_ip_address.git
cd weather-app
```

### Configure API Keys

Update the `application.properties` file located in `src/main/resources` with your API keys:

```properties
openweathermap.api.key=YOUR_ONE_CALL_API_KEY
```

### Build and Run the Application

```bash
mvn clean install
mvn spring-boot:run
```

### Test the Endpoint

You can test the endpoint using an HTTP client like Postman or the IntelliJ IDEA HTTP client. Make a GET request to the following URL:

```
http://localhost:8080/api/weather
```

## Project Structure

- **Controller**
  - `WeatherController`: Handles HTTP requests and returns weather data.

- **Service**
  - `IpService`: Fetches the user's location based on the IP address.
  - `WeatherService`: Retrieves weather data based on the user's location.

- **DTOs (Data Transfer Objects)**
  - `WeatherDto`: Contains weather data to be sent in the response.
  - `ErrorResponseDto`: Contains error details to be sent in the response.


## Dependencies

- Spring Boot
- Spring Web
- Lombok

## Error Handling

The application handles common HTTP errors such as:
- **401 Unauthorized**: Ensures that the correct API key and subscription plan are used.
- **404 Not Found**: Checks if the endpoint URL is correct.
- **429 Too Many Requests**: Manages API call limits.
