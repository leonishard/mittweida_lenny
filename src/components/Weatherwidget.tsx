import {useEffect, useState} from "react";


export default function WeatherWidget(){
    const [ currentTemp, setCurrentTemp] = useState<number>();

    useEffect(() => {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=52&lon=13&appid=790fbf732a669117659c0f148bcdb7c2&units=metric")
            .then(async response => {
                console.log(response);
                const data = await response.json();
                console.log(data.main.temp);
                setCurrentTemp(data.main.temp);
            }).catch(error => {
            console.log(error);
        })});

    return (
        <div>

            <h4> {currentTemp}°C </h4>
        </div>
    )}


