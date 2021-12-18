//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//fda3f1baf5a3681b52670b0e2f18989f
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');
    const currentWeatherItemsEl = document.getElementById('current-weather-items');
    const timezone = document.getElementById('time-zone');
    const countryEl = document.getElementById('country');
    const weatherForecastEl = document.getElementById('weather-forecast');
    const currentTempEl = document.getElementById('current-temp');
    const weatherTempEl = document.getElementById('weather-temp');

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const API_key = 'fda3f1baf5a3681b52670b0e2f18989f';

    setInterval(() => {
        const time = new Date();
        const month = time.getMonth();
        const date = time.getDate();
        const day = time.getDay();
        const hour = time.getHours();
        const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
        const minutes = time.getMinutes();
        const ampm = hour >=12 ? 'PM' : 'AM'
    
        timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
    
        dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
    
    }, 1000);
    getWeatherData()
    function getWeatherData () {
        navigator.geolocation.getCurrentPosition((success) => {
    
            let {latitude, longitude } = success.coords;
    
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
    
            console.log(data)
            showWeatherData(data);
            })
    
        })
    }
    function showWeatherData (data){
        let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    
        timezone.innerHTML = data.timezone;
        countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'
    
        currentWeatherItemsEl.innerHTML = 
        `<div class="weather-item">
            <div>Humidity</div>
            <div>${humidity}%</div>
        </div>
        <div class="weather-item">
            <div>Pressure</div>
            <div>${pressure}</div>
        </div>
        <div class="weather-item">
            <div>Wind Speed</div>
            <div>${wind_speed}</div>
        </div>
        <div class="weather-item">
            <div>Sunrise</div>
            <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-item">
            <div>Sunset</div>
            <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
        </div>
    
    `;
    
    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
        </div>
        
        `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })
    weatherForecastEl.innerHTML = otherDayForcast;
}

    const weatherApi = {
        key: "fda3f1baf5a3681b52670b0e2f18989f",
        baseUrl: "https://api.openweathermap.org/data/2.5/weather"
    
    }
    const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', function(){
    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value); 
        document.quaryselector('.weather-body').style.display = "block";
    }
});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('sunz.jpg')";

    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('cloudz.jpg')";

    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('haze1z.jpg')";

    }     else if(weatherType.textContent == 'Rain') {

        document.body.style.backgroundImage = "url('rainz.jpg')";

    } else if(weatherType.textContent == 'Snow') {

        document.body.style.backgroundImage = "url('snowz.jpg')";

    } else if(weatherType.textContent == 'Smoke') {

        document.body.style.backgroundImage = "url('smoke1z.jpg')";


    } 
}

// Date manage
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}