// Fetching Data of Geo and forecast API
weatherForm.addEventListener('submit', (e) => {
	
	//Defining Meassage Containers
	const htmlLocation = document.getElementById('location');
	const htmlForecast = document.getElementById('forecast');
	const weatherMsg = document.getElementById('weatherMsg');
	const spinner = document.getElementById('spinner');
	const htmlError = document.getElementById('errorMsg');


	const weatherForm = document.getElementById('weatherForm');
	const search = document.getElementById('inputLocation');

	e.preventDefault();

	const serchInput = search.value;

	showSpinner();

	htmlLocation.textContent = '';
	htmlForecast.textContent = '';

	fetch('http://alexisplayground.com:1234/weather?adress=' + serchInput).then( (response) => {
		
		response.json().then( (data) => {
				
			if (data.error) {

				hideWeatherMsg();
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

				htmlLocation.textContent = location;
				htmlForecast.textContent = forecast;
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
		htmlError.className = htmlError.className.replace("d-block", "d-none");
	};

	function showWeatherMsg() {
		weatherMsg.className = weatherMsg.className.replace("d-none", "d-block");
	};

	function hideWeatherMsg() {
		weatherMsg.className = weatherMsg.className.replace("d-block", "d-none");
	};
});

