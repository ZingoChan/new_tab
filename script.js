function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString(undefined, options);
}

function getWeather() {
  if (!navigator.geolocation) {
    console.warn("Geolocation not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&timezone=auto`)
      .then(res => res.json())
      .then(data => {
        const temp = data.current.temperature_2m;
        document.querySelector(".temperature").textContent = `🌡️ ${temp}°C`;
        // ❌ no more: document.querySelector(".city").textContent = city;
      });
  }, err => {
    console.error("Geo failed", err);
  });
}

function getCityName() {
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => {
      const city = data.city || "Unknown";
      const region = data.region || "";
      document.querySelector(".city").textContent = `${city}, ${region}`;
    })
    .catch(() => {
      document.querySelector(".city").textContent = "Unknown City";
    });
}

getCityName();
getWeather();
updateTime();
setInterval(updateTime, 1000); // update every 1 sec
