const searchElement = document.querySelector(["[data-city-search]"]);
const searchBox = new google.maps.places.SearchBox(searchElement);

searchBox.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0];
  const lat = place.geometry.location.lat();
  const lng = place.geometry.location.lng();

  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
    }),
  })
    .then((res) => res.json())
    .then((data) => setWeatherData(data, place.formatted_address));
});

const icon = new Skycons({ color: "#222" });
const locationElement = document.querySelector(["[data-location]"]);
const statusElement = document.querySelector(["[data-status]"]);
const windElement = document.querySelector(["[data-wind]"]);
const temperatureElement = document.querySelector(["[data-temperature]"]);
const precipitationElement = document.querySelector(["[data-precipitation]"]);

icon.set("icon", "clear-day");
icon.play();

function setWeatherData(data, place) {
  locationElement.textContent = place;
  statusElement.textContent = data.summary;
  windElement.textContent = data.windSpeed;
  temperatureElement.textContent = data.temperature;
  precipitationElement.textContent = data.precipProbability * 100 + "%";
  icon.set("icon", data.icon);
  icon.play();
}
