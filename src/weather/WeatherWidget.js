import { useState, useEffect } from 'react';
import './style.scss';

export default function WeatherWidget() {
    const [city, setCity] = useState('Paris');
    const [desc, setDesc] = useState('temps orange');
    const [temperature, setTemperature] = useState('10');
    const [value, setValue] = useState('');


    useEffect(() => {
        const baseUrl = process.env.REACT_APP_BASE_URL;
        const apiKey = process.env.REACT_APP_API_KEY;

        fetch(`${baseUrl}?q=${city}&units=metric&lang=fr&appid=${apiKey}`)
            .then(response => response.json())
            .then(json => {
                const temp = Math.round(json.main.temp)
                setTemperature(temp);
                setDesc(json.weather[0].description);
            })
            .catch(error => console.log(error));
    }, [city]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCity(value);
        setValue('');
    };


    return (
        <div className="weather-widget">
            <div className="weather-widget__infos">
                <p className="weather-widget__city">{city}</p>
                <p className="weather-widget__desc">{desc}</p>
            </div>
            <p className="weather-widget__temperature"><span>{temperature}</span><sup>°C</sup></p>
            <form className="weather-widget__form" onSubmit={handleSubmit}>
                <input
                    className="weather-widget__input"
                    value={value}
                    type="text"
                    placeholder="Votre ville"
                    onChange={(event) => setValue(event.target.value)}
                />
            </form>
        </div>
    );
}
