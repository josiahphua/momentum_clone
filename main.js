import "./style.scss";
import "regenerator-runtime/runtime";
let axios = require('axios');
let moment = require('moment')

const unsplashUrl = "https://api.unsplash.com/photos"
const unsplashKey = "<KEY HERE>"

const weatherUrl = "http://api.openweathermap.org/data/2.5"
const weatherKey = "<KEY HERE>";

const quoteUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"

async function unsplash() {
    try {
        let res = await axios.get(`${unsplashUrl}/random`, {
            headers: {
                Authorization: `Client-ID ${unsplashKey}`
            }
        })
        // console.log(res.data.urls.regular);
        let container = document.querySelector("body");
        container.style.backgroundImage = `url(${res.data.urls.regular})`
        // container.style.backgroundImage = `url(https://images.unsplash.com/photo-1600719425246-c73dd7e0748b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE3NjMyNn0)`

    } catch (error) {
        console.log(error)
    }
}

async function weather() {
    try {
        let res = await axios.get(`${weatherUrl}/weather?q=Singapore&units=metric&appid=${weatherKey}`)
        let {
            main,
            weather
        } = res.data;
        // console.log(main);
        // console.log(weather);
        document.querySelector(".temp").textContent = ` ${Math.round(main.temp)} °C`
        document.querySelector(".weather__icon").src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
        document.querySelector(".weather__desc").textContent = ` ${weather[0].description}`

    } catch (error) {
        console.log(error);
    }
}

async function qotd() {
    try {
        let res = await axios.post(`${quoteUrl}`)
        document.querySelector(".quote").textContent = `"${res.data.quoteText}"`;
    } catch (error) {
        console.log(error)
    }
}

document.querySelector(".date").textContent = moment().format('Do MMMM YYYY')
document.querySelector(".time").textContent = moment().format('h:mm:ss a')
setInterval(() => {
    document.querySelector(".time").textContent = moment().format('h:mm:ss a')
}, 1000)

let tod = ["morning", "afternoon", "evening"];
let greeting = "";
let name = "Siu Sing"
let hour = parseInt(moment().format('HH'));
console.log(hour)
if (hour >= 0 && hour < 12) {
    greeting = `Good ${tod[0]}, ${name}`;
} else if (hour >= 12 && hour < 17) {
    greeting = `Good ${tod[1]}, ${name}`;
} else {
    greeting = `Good ${tod[2]}, ${name}`;
}
document.querySelector(".greeting").textContent = greeting;

unsplash();
weather();
qotd();
// app();