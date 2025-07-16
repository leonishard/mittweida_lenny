import useSWR from "swr";
import {fetcher} from "./fethcher.ts";

export default function WeatherWidgetSWR(){
    const {error, isLoading, data} = useSWR("https://api.openweathermap.org/data/2.5/weather?lat=52&lon=13&appid=790fbf732a669117659c0f148bcdb7c2&units=metric", fetcher)

    if (error){
        return null;
    }

    if (isLoading){
        return null;
    }

    console.log(data)

    return(
        <h1>Current temp: {data}</h1>
    );
}