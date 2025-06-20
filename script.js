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
        const city = "Your Area"; // You can get real city from another API if needed

        document.querySelector(".temperature").textContent = `🌡️ ${temp}°C`;
        document.querySelector(".city").textContent = city;
      });
  }, err => {
    console.error("Geo failed", err);
  });
}

getWeather();
updateTime();
setInterval(updateTime, 1000); // update every 1 sec
