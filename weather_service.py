import requests

API_KEY = "8c56c02289b06a0239b3503dce068b95"

def get_weather(city="Hyderabad"):

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)
    data = response.json()

    # If API failed or key not active yet
    if "main" not in data:
        return "Weather information is currently unavailable."

    temperature = data["main"]["temp"]
    description = data["weather"][0]["description"]
    humidity = data["main"]["humidity"]

    return f"The current temperature in {city} is {temperature}°C with {description}. Humidity is {humidity}%."