// Fetching Data of Geo and forecast API
weatherForm.addEventListener('submit', (e) => {
	
	//Defining Meassage Containers
	const htmlLocation = document.getElementById('location');

	const forecastList = document.getElementById('forecastList');

	const weatherMsg = document.getElementById('weatherMsg');
	const spinner = document.getElementById('spinner');
	const htmlError = document.getElementById('errorMsg');

	const weatherForm = document.getElementById('weatherForm');
	const search = document.getElementById('inputLocation');

	const weatherIconDaily = document.getElementById('weather-icon-result');

	e.preventDefault();

	const serchInput = search.value;

	showSpinner();

	htmlLocation.textContent = '';
	forecastList.innerHTML = '';
	// remove img ccontent
	$('#weatherIconFigure').each(function() {
		if ($(this).find('img').length) {
		   weatherIconDaily.parentNode.removeChild(weatherIconDaily);
		   figcaptionIcon.parentNode.removeChild(figcaptionIcon);
		}
	});

	hideWeatherMsg();
	//hideSpinner();
	//showErrorMsg();

	fetch('/weather?adress=' + serchInput).then( (response) => {
		
		response.json().then( (data) => {
				
			if (data.error) {

				// hideWeatherMsg();
				hideSpinner();
				showErrorMsg();

				htmlError.textContent = data.error;

			} else {
				
				hideErrorMsg();
				hideSpinner();
				showWeatherMsg();

				//Variables for Wheater Msg
				const location = (data[0].location);
				const forecast = (data[0].forecast);

				const splitForecast = forecast.split(" – ");
				
				// Displays Location Msg
				htmlLocation.textContent = location;

				// Displays Details belong to the location
				// for loop should run through spelling list array and create list items in "splitForecast"
				var i;
				for (i = 1; i < splitForecast.length; i++ ) {
					var newLI = document.createElement("li"), // create a new li
					splitForecastList = document.getElementById("forecastList"), // cache the unordered list
					newContent = document.createTextNode(splitForecast[i]); // grab the splitForecast list item
					
					// add the splitForecast list item to the li
					newLI.appendChild(newContent);

					splitForecastList.appendChild(newLI);
				}

				addWheathericon();

				htmlError.className = htmlError.className.replace("d-block", "d-none");

				function addWheathericon() {

					const weatherIconPath = '/img/weatherIcons/';
					const weatherIconName = splitForecast[0];
					const weatherIconSulfix = '.svg';
					const weatherIconSrc = weatherIconPath + weatherIconName + weatherIconSulfix;
					var image = document.createElement("img");
					var caption = document.createElement("figcaption");
					var imageParent = document.getElementById("weatherIconFigure");
					image.className = "weather-icon-result";
					image.id = "weather-icon-result";
					caption.id = "figcaptionIcon";
					image.src = weatherIconSrc
					image.alt = weatherIconName 
					caption.innerHTML = weatherIconName;   
					imageParent.appendChild(image);
					imageParent.appendChild(caption);
				}

			};
		});
	});

	// Show & Hide functions
	function showSpinner() {
		spinner.className = "spinner-border d-inline-block";
		setTimeout(() => {
			spinner.className = spinner.className.replace("d-inline-block", "d-none");
		}, 3000);
	};

	function hideSpinner() {
		spinner.className = spinner.className.replace("d-inline-block", "d-none");
	};

	function showErrorMsg() {
		htmlError.className = "alert alert-danger col-md-6 offset-md-3 d-none";
		htmlError.className = htmlError.className.replace("d-none", "d-block");
	};

	function hideErrorMsg() {
		htmlError.className= "alert alert-danger col-md-6 offset-md-3 d-block";
		htmlError.className = htmlError.className.replace("d-block", "d-none");
	};

	function showWeatherMsg() {
		weatherMsg.className = "d-none m-auto";
		weatherMsg.className = weatherMsg.className.replace("d-none", "d-inline-block");
	};

	function hideWeatherMsg() {
		weatherMsg.className = "d-inline-block m-auto";
		weatherMsg.className = weatherMsg.className.replace("d-inline-block", "d-none");
	};
});

