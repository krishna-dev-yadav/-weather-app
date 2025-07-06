import React, { useState, useEffect } from 'react';
import { WiRain, WiHumidity } from 'react-icons/wi';
import { FiSearch } from 'react-icons/fi';
import { FaWind } from 'react-icons/fa';

const App = () => {
    const [city, setCity] = useState('');
    const [searchedCity, setSearchedCity] = useState('New Delhi');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const API_KEY = "e4cb2a94d8b52523223893bd6858f488";

    const fetchWeather = async (queryCity) => {
        const searchFor = queryCity || city;
        if (!searchFor) return;
        setWeatherData(null);
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchFor}&appid=${API_KEY}&units=metric`);
            if (!res.ok) throw new Error("City not found");
            const data = await res.json();
            setWeatherData(data);
            setSearchedCity(searchFor);
            setCity('');
            setError(null);

        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        }
    };

    useEffect(() => {
        fetchWeather('New Delhi');
    }, []);

    return (
        <div className="bg-[url('/clodimage.jpg')] bg-cover bg-center min-h-screen flex flex-col">
            <nav className="flex justify-between items-center p-4 backdrop-blur-sm bg-black/20 text-white">
                <div className="flex gap-3 items-center">
                    <img src="/cloud.png" alt="Cloud Logo" className="h-10" />
                    <p className="text-lg font-semibold">Weatherclik</p>
                </div>
                <div className="flex gap-6">
                    <p className="cursor-pointer hover:text-blue-300">About Us</p>
                    <p className="cursor-pointer hover:text-blue-300">Country</p>
                </div>
            </nav>
            <main className="flex-grow flex items-center justify-center p-4">
                <section className="text-center space-y-6 bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30 w-full max-w-sm">
                    <div className="relative">
                        <input
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') fetchWeather();
                            }}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            placeholder="Type city"
                            className="w-full px-3 py-2 rounded-md bg-white/30 text-black placeholder-black outline-none"
                        />
                        <button onClick={fetchWeather} disabled={!city.trim()}>
                            <FiSearch className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 text-white" />
                        </button>
                    </div>
                    {error && <p className='text-red-500'>{error}</p>}
                    {weatherData && !error && (
                        <>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    {searchedCity.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </h1>
                                <h2 className="text-white text-sm">{new Date().toDateString()}</h2>
                                <WiRain className="text-9xl mx-auto text-white" />
                                <p className="text-lg font-medium text-white">{weatherData.weather[0].main}</p>
                            </div>
                            <div>
                                <h1 className="text-5xl font-bold text-white">{weatherData.main.temp}°C</h1>
                                <div className="flex justify-between items-center w-full p-4 mt-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
                                    <div className="flex items-center gap-2 text-white">
                                        <WiHumidity className="text-3xl" />
                                        <div className="flex flex-col items-start">
                                            <span>Humidity</span>
                                            <span className="font-semibold">{weatherData.main.humidity}%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-white">
                                        <FaWind className="text-2xl" />
                                        <div className="flex flex-col items-start">
                                            <span>Wind</span>
                                            <span className="font-semibold">{weatherData.wind.speed} KM/H</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default App;
