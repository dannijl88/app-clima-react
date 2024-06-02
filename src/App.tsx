import { useState } from "react"
import sun from "./assets/icons/sun.svg"
import cloud from "./assets/icons/cloud.svg"
import rain from "./assets/icons/rain.svg"
import wind from "./assets/icons/wind.svg"
import storm from "./assets/icons/storm.svg"

interface Welcome {
  weather: Weather[];
  main:    Main;
  name:    string;
  wind:    Wind;
}

interface Wind {
  speed: number; 
}

interface Main {
  temp:       number;
  feels_like: number;
  temp_min:   number;
  temp_max:   number;
  pressure:   number;
  humidity:   number;
}

interface Weather {
  id:          number;
  main:        string;
  description: string;
  icon:        string;
}

function App() {
  const [data, setData] = useState<Welcome>({
    weather: [
      {
        id: 200,
        main: '',
        description: '',
        icon: '01d',
      },
    ],
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    name: "",
    wind: {
      speed: 0,
    },
  })
  const [city, setCity] = useState("")
  const API_KEY = "af8984956396371dd6f2f269166932f9"
  const API:string =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=es&units=metric`
  
  const getWeather = async () => {
    const response = await fetch(API)
    const data = await response.json()
    console.log(data)
    setData(data)
  }
  
  return (
    <div className="bg-sky-600 h-screen flex flex-col gap-10 justify-center items-center">
      <h1 className="text-center text-5xl text-white font-bold">App Clima React</h1>
      <div className="bg-gray-800 border-2 w-1/2 border-gray-200 p-4 rounded-lg">
        <form className="flex flex-col gap-2 mb-4" onSubmit={(e)=>{e.preventDefault();getWeather()}}>
          <input className="text-center h-10" required type="text" placeholder="Introduce Ciudad" onChange={(e)=>setCity(e.target.value)} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buscar
          </button>
        </form>
        <div className="flex flex-wrap">
          {city && 
            <div className="w-1/2 flex flex-col gap-2 text-white text-xl">  
              <h2 className="text-white text-5xl text-center">{city && data.name}</h2>
              <p className="text-center text-5xl font-bold">
                {data.main.temp} ºC
              </p>
              <div className="w-20 h-20 block mx-auto">
                {
                  data.weather[0].main === 'Clear' && <img className="w-20 h-20" src={sun} alt="sun" />
                }
                {
                  data.weather[0].main == 'Rain' && <img className="w-20 h-20" src={rain} alt="rain" />
                }
                {
                  data.weather[0].main == 'Clouds' && <img className="w-20 h-20" src={cloud} alt="cloud" />
                }
                {
                  data.weather[0].main == 'Storm' && <img className="w-20 h-20" src={storm} alt="storm" />
                }
                {
                  data.weather[0].main == 'Wind' && <img className="w-20 h-20" src={wind} alt="wind" />
                }
              </div>
              <p className="text-center text-2xl">{data.weather[0].description}</p>
            </div> 
          }
          {
            city &&
            <div className="w-1/2 flex flex-col gap-2 text-white text-xl border-l-2 items-center">
            <p>
              Sensación térmica: {data.main.feels_like} ºC
            </p>
            <p>
              Min: {data.main.temp_min} ºC
            </p>
            <p>
              Max: {data.main.temp_max} ºC
            </p>
            <p>
              Humedad: {data.main.humidity} %
            </p>
            <p>
              Presión: {data.main.pressure} hPa
            </p>
            <p>
              Viento: {data.wind.speed} m/s
            </p>
          </div>
          }
        </div>
        
      </div>
    </div>
      
  )
}

export default App