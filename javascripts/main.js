$(document).ready(function() {

	const apiKey = "";

	$("#check-forecast").on("click", (e) => {
		const userZip = $("#enter-zip").val();
		loadWeather(userZip).then((results) => {
			console.log(results);
			writeWeatherToDom(results);
		}).catch((error) => {
			alert("Please enter a valid zip code!");
			console.log(error);
		});
	});


	const loadWeather = (zipCode) => {
	return new Promise ((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${apiKey}`)
		.done((data) => resolve(data))
		.fail((error) => reject(error));
		});
	};

	const load3DayForecast = (zipCode) => {
	return new Promise ((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}`)
		.done((data) => resolve(data))
		.fail((error) => reject(error));
		});
	};



	const writeWeatherToDom = (results) => {
		let weatherString = "";

		weatherString += `<h2>${results.name}</h2>`;

		weatherString += `<div><strong>Temperature: </strong>${results.main.temp}</div>`;
		weatherString += `<div><strong>Air Pressure: </strong>${results.main.pressure}</div>`;
		weatherString += `<div><strong>Wind Speed: </strong>${results.wind.speed}</div>`;
		for (let i=0; i < results.weather.length; i++) {
			weatherString += `<div><strong>Condition: </strong>${results.weather[0].description}</div>`;
		}

		$("#weather-container").html(weatherString);
	};





















});