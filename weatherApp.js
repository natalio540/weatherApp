
function getLocation() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
          let  lat =position.coords.latitude; 
          let  lon =position.coords.longitude;

            WeatherForecast(lat,lon);
        });
    }else{
        alert("'browser doesn't support geolocation' ")
    }
}getLocation()


function WeatherForecast(lat,lon){
    let key= "4b200622d8744cdac7c2180c08c36be3";
    let url= 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat +'&lon='+lon+'&units=metric&appid='+key+'&lang=es';
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            let iconWeatherConditions = [],
                forecastDay = [],
                daysMinMax =[],
                weatherToday= data.current.temp,
                mainCondition = data.current.weather[0].id,
                description = data.current.weather[0].description,
                feels_like = data.current.feels_like,
                icon = data.current.weather[0].icon;
                humidity = data.current.humidity,
                wind = data.current.wind_speed,
                iconToday ="http://openweathermap.org/img/wn/"+icon+"@2x.png"
                days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                d = new Date(),
                months =["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
                today = d.getDate() + " de " + months[d.getMonth()] + " de " + d.getFullYear();
                console.log(mainCondition);
                
            for (x in data.daily){ 
                let d = new Date(data.daily[x].dt * 1000);
                let dayName = days[d.getDay()];
                forecastDay.push(dayName);
                if (x>=1 && x <=3){
                    let min= data.daily[x].temp.min;
                    let max= data.daily[x].temp.max;
                    daysMinMax.push([min,max])
                    let iconForecast = data.daily[x].weather[0].icon
                    iconWeatherConditions.push(iconForecast)
                    }    
                }   

                /* template  the current weather  */
                document.querySelector('#temp').innerHTML = `${Math.round(weatherToday)}º`;
                document.querySelector('#description').innerHTML = `${description}` ;
                document.querySelector('#humidity').innerHTML = `${humidity}% humedad`;
                document.querySelector('#wind').innerHTML = `${wind}m/s`;
                document.querySelector('#feels_like').innerHTML = `${Math.round(feels_like)}º <i class="fas fa-temperature-low" 4x></i>`;  
                document.querySelector('.iconToday').innerHTML = "<img src="+iconToday+">";

                /* change the background color of the current weather */
            switch(true){
                case mainCondition >200 && mainCondition <550:
                    document.querySelector("#header").style.background="#616161"//rainy
                    break
                case mainCondition >600 && mainCondition <650:

                    document.querySelector("#header").style.background="#00467F"//snow
                    break  
                case mainCondition >=801 && mainCondition <=804:
                    document.querySelector("#header").style.background="#B79891" //clouds
                    break
                case mainCondition ===800:
                    document.querySelector("#header").style.background="#ffe259" //sunny
                    break      
            }
            
        
            /* asign a date */
            document.querySelector('#today').innerHTML = `${today}`;
            document.querySelector('#nxtday1').innerHTML = `${forecastDay[1]}`;
            document.querySelector('#nxtday2').innerHTML = `${forecastDay[2]}`;
            document.querySelector('#nxtday3').innerHTML = `${forecastDay[3]}`;
             
            /* asign a min max to the next days */
            let minElements = document.getElementsByClassName('min');
            let maxElements = document.getElementsByClassName('max');                               
            for(let [i, temperatura] of daysMinMax.entries()) {
            minElements[i].textContent = ` ${Math.round(temperatura[0])}º`
            maxElements[i].textContent = ` ${Math.round(temperatura[1])}º` 
            
            }
            /* asign an icon to the next days */
            var iconsHtml = document.getElementsByClassName('icons')                                
            for(let [x,icons] of iconWeatherConditions.entries()){
                let ico = "http://openweathermap.org/img/wn/"+icons+"@2x.png"
                iconsHtml[x].innerHTML = "<img src="+ico+" width ='40px'>"
                                                 
            }

            });
       }
      
       function search() {
        
            let city = document.querySelector("#search-input").value;
            let key= "4b200622d8744cdac7c2180c08c36be3";
            let url= 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+key+'&units=metric&lang=es';
            fetch(url)
                .then(res => {
                    if (!res.ok){alert("ciudad no encontrada")}
                    return res.json()})

                .then(data =>{
                    let lat = data.coord.lat;
                    let lon = data.coord.lon;
                    document.querySelector('#ciudad').innerHTML = `${city.toUpperCase()}`;
                    WeatherForecast(lat,lon);
                   
                            })
        
            document.querySelector("#search-input").value=""
        } 


                        
                        



                        