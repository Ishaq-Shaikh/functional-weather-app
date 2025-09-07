import { IoLocation, IoThermometerOutline } from "react-icons/io5";
import axios from "axios";
import { useState, useEffect } from "react";

const Card = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("udgir");
  const [useLocation, setUseLocation] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let url = "";

        if (useLocation && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4c3154824d04a666c40101ffe8a855ca`;

            const res = await axios.get(url);
            setWeather(res.data);
          });
        } else {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4c3154824d04a666c40101ffe8a855ca`;
          const res = await axios.get(url);
          setWeather(res.data);
        }
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    };

    fetchWeather();
  }, [city, useLocation]);

  if (!weather) {
    return (
      <h1 className="text-white text-center mt-20 text-xl">
        Loading weather...
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <div className="flex gap-20 font-bold">
        <button
          onClick={() => setUseLocation(false)}
          className="select py-2 bg-[#93C5D6] text-[#0F1816] text-[15px] rounded-lg"
        >
          Choose City
        </button>
        <button
          onClick={() => setUseLocation(true)}
          className="select py-2 bg-[#5AC172] text-[#0F1816] text-[15px] rounded-lg"
        >
          Use My Location
        </button>
      </div>

      {!useLocation && (
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="select w-[140px] bg-[#98EDDF] text-[#0F1816] text-[20px] font-semibold rounded-2xl"
        >
          <option value="udgir">Udgir</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="pune">Pune</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="nagpur">Nagpur</option>
          <option value="aurangabad">Aurangabad</option>
          <option value="thane">Thane</option>
          <option value="latur">Latur</option>
          <option value="nanded">Nanded</option>
          <option value="satara">Satara</option>
          <option value="sangli">Sangli</option>
          <option value="vashi">Vashi</option>
        </select>
      )}

      <main className="overflow-hidden min-w-[320px] min-h-[200px] bg-gradient-to-br from-[#AD36CB] to-[#333333] text-[#F2F1F1] rounded-xl shadow-lg p-4">
        <div className="flex items-center relative top-2 left-4 text-lg font-semibold">
          <h1>{weather.name}</h1>
          <IoLocation className="text-[#C1CA73]" />
        </div>

        <div className="flex items-center justify-center gap-2 text-6xl relative top-10">
          <IoThermometerOutline className="text-[#B6EBE5]" />
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            className="h-[50px]"
            alt="Weather Icon"
          />
        </div>

        <div className="flex items-center justify-end relative top-20 right-4 text-sm text-[#9DBCC3]">
          <h1>
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              weekday: "short",
            })}
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Card;
