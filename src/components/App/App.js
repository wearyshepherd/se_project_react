import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import './App.css';

function App() {
 const [temp, setTemp] = useState(null);
 const [city, setCity] = useState(null);

 useEffect(() => {
    async function fetchData() {
      try {
        const response = await getForecastWeather();
        setTemp(parseWeatherData(response));
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
 }, []);

 useEffect(() => {
    async function fetchCity() {
      try {
        const response = await getCityWeather();
        setCity(parseCityData(response));
      } catch (err) {
        console.error(err);
      }
    }
    fetchCity();
 }, []);

 const handleCreateModal = async () => {
    try {
      const response = await getCityWeather();
      setCity(parseCityData(response));
    } catch (err) {
      console.error(err);
    }
 };

 return (
    <div className="App">
      <Header onCreateModal={handleCreateModal} weatherCity={city} />
    </div>
 );
}

export default App;
