$(document).ready(function () {
    function hideSubmitForm() {
        $("#weatherForm").removeClass('show');
    }

    function showubmitForm() {
        $("#weatherForm").addClass('show');
    }

    showubmitForm();

    // Fetching Data of Geo and forecast API
    $("#weatherForm").submit(function (e) {

        e.preventDefault();

        const search = $('#inputLocation').val();
        const serchInput = search

        showSpinner();

        fetch('/weather?adress=' + serchInput).then((response) => {

            response.json().then((data) => {

                if (data.error) {

                    hideSpinner();
                    showErrorMsg();
                    $("#errorMsg").html(data.error);

                } else {
                    hideErrorMsg();
                    hideSubmitForm();
                    hideSpinner();

                    //Defining variables
                    // Time
                    var timeFormatet = data[0].forecast.today.timeFormatet.split(",");
                    //locatioin
                    var location = data[0].location;
                    //shortCode
                    var shortCode = data[0].shortCodeFormatted;
                    //Temp
                    var weatherTemp = data[0].forecast.today.temperature + ' ';
                    var splitWeatherTemp = weatherTemp.split('.')
                    //summary
                    var weatherDesc = data[0].forecast.today.summaryFormatet
                    //precipitation
                    var precipitation = data[0].forecast.today.precipProbability
                    //humidity
                    var humidity = data[0].forecast.today.humidity
                    //windspeed
                    var windSpeed = data[0].forecast.today.windSpeed
                    //Background Image
                    var weahterBackgroundPath = '/img/weatherBackgrounds/';
                    var weahterBackgroundSulfix = '.jpg';
                    var weatherBackgroundNameToday = data[0].forecast.today.icon;
                    var weatherBackgroundSrcToday = weahterBackgroundPath + weatherBackgroundNameToday + weahterBackgroundSulfix;

                    updateData();
                    updateWeekDays();
                    updateIcons();
                    updateBackground();
                    showWeatherWidget();

                    //Update Data for the first view
                    function updateData() {
                        //Time
                        $('.date-dayname').html(timeFormatet[0]);
                        $('.date-day').html(timeFormatet[1]);
                        //locatioin
                        $('.location').html(location + ',');
                        //shortCode
                        $('.shortCode').html(shortCode);
                        //Temp
                        $('#weatherTemp').html(splitWeatherTemp[0]);
                        //summary
                        $('.weather-desc').html(weatherDesc);
                        //precipitation
                        $('.precipitation .value').html(precipitation + ' %');
                        //humidity
                        $('.humidity .value').html(humidity + ' %');
                        //windspeed
                        $('.wind .value').html(windSpeed + ' km/h');
                    };

                    function updateWeekDays() {

                        $('.week-list li').removeClass('active');
                        $('.week-list li:nth-child(1)').addClass('active');

                        //weekTemp + WeekDay Update

                        var weatherTemp = data[0].forecast.today.temperature + ' ';
                        var splitWeatherTemp = weatherTemp.split('.')
                        $('.week-list li:nth-child(1) .day-temp').html(splitWeatherTemp[0] + '°C');
                        var weekday = data[0].forecast.today.weekday;
                        $(".week-list li:nth-child(1) .day-name").html(weekday);

                        var weatherTempTomorrow = data[0].forecast.tomorrow.temperatureTomorrow + ' ';
                        var splitWeatherTempTomorrow = weatherTempTomorrow.split('.')
                        $(".week-list li:nth-child(2) .day-temp").html(splitWeatherTempTomorrow[0] + '°C');
                        var weekdayTomorrow = data[0].forecast.tomorrow.weekdayTomorrow;
                        $(".week-list li:nth-child(2) .day-name").html(weekdayTomorrow);

                        var weatherTempTomorrow2 = data[0].forecast.tomorrow2.temperatureTomorrow2 + ' ';
                        var splitWeatherTempTomorrow2 = weatherTempTomorrow2.split('.')
                        $(".week-list li:nth-child(3) .day-temp").html(splitWeatherTempTomorrow2[0] + '°C');
                        var weekdayTomorrow2 = data[0].forecast.tomorrow2.weekdayTomorrow2;
                        $(".week-list li:nth-child(3) .day-name").html(weekdayTomorrow2);

                        var weatherTempTomorrow3 = data[0].forecast.tomorrow3.temperatureTomorrow3 + ' ';
                        var splitWeatherTempTomorrow3 = weatherTempTomorrow3.split('.')
                        $(".week-list li:nth-child(4) .day-temp").html(splitWeatherTempTomorrow3[0] + '°C');
                        var weekdayTomorrow3 = data[0].forecast.tomorrow3.weekdayTomorrow3;
                        $(".week-list li:nth-child(4) .day-name").html(weekdayTomorrow3);

                    };

                    function updateIcons() {

                        // Add Icons
                        var weatherIconPath = '/img/weatherIcons/';
                        var weatherIconSulfix = '.svg';

                        var weatherIconNameToday = data[0].forecast.today.icon
                        var weatherIconSrcToday = weatherIconPath + weatherIconNameToday + weatherIconSulfix;
                        $('.weather-icon-today').attr('src', weatherIconSrcToday);
                        $('.week-list li:nth-child(1) .day-icon').attr('src', weatherIconSrcToday);

                        var weatherIconNameTomorrow = data[0].forecast.tomorrow.iconTomorrow
                        var weatherIconSrcTomorrow = weatherIconPath + weatherIconNameTomorrow + weatherIconSulfix;
                        $('.week-list li:nth-child(2) .day-icon').attr('src', weatherIconSrcTomorrow);


                        var weatherIconNameTomorrow2 = data[0].forecast.tomorrow2.iconTomorrow2
                        var weatherIconSrcTomorrow2 = weatherIconPath + weatherIconNameTomorrow2 + weatherIconSulfix;
                        $('.week-list li:nth-child(3) .day-icon').attr('src', weatherIconSrcTomorrow2);


                        var weatherIconNameTomorrow3 = data[0].forecast.tomorrow3.iconTomorrow3
                        var weatherIconSrcTomorrow3 = weatherIconPath + weatherIconNameTomorrow3 + weatherIconSulfix;
                        $('.week-list li:nth-child(4) .day-icon').attr('src', weatherIconSrcTomorrow3);
                    };

                    function updateBackground() {
                        $('.weather-side').css("background-image", 'url(' + weatherBackgroundSrcToday + ')');
                    };

                    function updateIconDaily() {
                        $('.weather-icon-today').attr('src', weatherIconSrcToday);
                    };

                    function updateDataTomorrow() {

                        //Defining variables
                        // Time
                        timeFormatet = data[0].forecast.tomorrow.timeTomorrowFormatet.split(",");
                        //DailyIcon
                        weatherIconPath = '/img/weatherIcons/';
                        weatherIconSulfix = '.svg';
                        weatherIconNameToday = data[0].forecast.tomorrow.iconTomorrow
                        weatherIconSrcToday = weatherIconPath + weatherIconNameToday + weatherIconSulfix;
                        //Temp
                        weatherTemp = data[0].forecast.tomorrow.temperatureTomorrow + ' ';
                        splitWeatherTemp = weatherTemp.split('.')
                        //summary
                        weatherDesc = data[0].forecast.tomorrow.summaryTomorrowFormatet
                        //precipitation
                        precipitation = data[0].forecast.tomorrow.precipProbabilityTomorrow
                        //humidity
                        humidity = data[0].forecast.tomorrow.humidityTomorrow
                        //windspeed
                        windSpeed = data[0].forecast.tomorrow.windSpeedTomorrow
                        //BackgroundImage
                        weahterBackgroundPath = '/img/weatherBackgrounds/';
                        weahterBackgroundSulfix = '.jpg';
                        weatherBackgroundNameToday = data[0].forecast.tomorrow.iconTomorrow
                        weatherBackgroundSrcToday = weahterBackgroundPath + weatherBackgroundNameToday + weahterBackgroundSulfix;

                        updateData();
                        updateIconDaily();
                    };

                    function updateDataTomorrow2() {

                        //Defining variables
                        // Time
                        timeFormatet = data[0].forecast.tomorrow2.timeTomorrowFormatet2.split(",");
                        //DailyIcon
                        weatherIconPath = '/img/weatherIcons/';
                        weatherIconSulfix = '.svg';
                        weatherIconNameToday = data[0].forecast.tomorrow2.iconTomorrow2;
                        weatherIconSrcToday = weatherIconPath + weatherIconNameToday + weatherIconSulfix;
                        //Temp
                        weatherTemp = data[0].forecast.tomorrow2.temperatureTomorrow2 + ' ';
                        splitWeatherTemp = weatherTemp.split('.')
                        //summary
                        weatherDesc = data[0].forecast.tomorrow2.summaryTomorrowFormatet2;
                        //precipitation
                        precipitation = data[0].forecast.tomorrow2.precipProbabilityTomorrow2;
                        //humidity
                        humidity = data[0].forecast.tomorrow2.humidityTomorrow2;
                        //windspeed
                        windSpeed = data[0].forecast.tomorrow2.windSpeedTomorrow2;
                        //BackgroundImage
                        weahterBackgroundPath = '/img/weatherBackgrounds/';
                        weahterBackgroundSulfix = '.jpg';
                        weatherBackgroundNameToday = data[0].forecast.tomorrow2.iconTomorrow2;
                        weatherBackgroundSrcToday = weahterBackgroundPath + weatherBackgroundNameToday + weahterBackgroundSulfix;

                        updateData();
                        updateIconDaily();
                    };

                    function updateDataTomorrow3() {

                        //Defining variables
                        // Time
                        timeFormatet = data[0].forecast.tomorrow3.timeTomorrowFormatet3.split(",");
                        //DailyIcon
                        weatherIconPath = '/img/weatherIcons/';
                        weatherIconSulfix = '.svg';
                        weatherIconNameToday = data[0].forecast.tomorrow3.iconTomorrow3
                        weatherIconSrcToday = weatherIconPath + weatherIconNameToday + weatherIconSulfix;
                        //Temp
                        weatherTemp = data[0].forecast.tomorrow3.temperatureTomorrow3 + ' ';
                        splitWeatherTemp = weatherTemp.split('.')
                        //summary
                        weatherDesc = data[0].forecast.tomorrow3.summaryTomorrowFormatet3
                        //precipitation
                        precipitation = data[0].forecast.tomorrow3.precipProbabilityTomorrow3
                        //humidity
                        humidity = data[0].forecast.tomorrow3.humidityTomorrow3
                        //windspeed
                        windSpeed = data[0].forecast.tomorrow3.windSpeedTomorrow3
                        //BackgroundImage
                        weahterBackgroundPath = '/img/weatherBackgrounds/';
                        weahterBackgroundSulfix = '.jpg';
                        weatherBackgroundNameToday = data[0].forecast.tomorrow3.iconTomorrow3
                        weatherBackgroundSrcToday = weahterBackgroundPath + weatherBackgroundNameToday + weahterBackgroundSulfix;

                        updateData();
                        updateIconDaily();
                    };

                    $('.week-list li:nth-child(1)').click(function () {
                        $('.week-list li').removeClass('active');
                        $(this).addClass('active');
                        hideSideWidget();
                        //Defining variables
                        // Time
                        timeFormatet = data[0].forecast.today.timeFormatet.split(",");
                        // Add Icons
                        weatherIconPath = '/img/weatherIcons/';
                        weatherIconSulfix = '.svg';
                        weatherIconNameToday = data[0].forecast.today.icon
                        weatherIconSrcToday = weatherIconPath + weatherIconNameToday + weatherIconSulfix;

                        //Temp
                        weatherTemp = data[0].forecast.today.temperature + ' ';
                        splitWeatherTemp = weatherTemp.split('.')
                        //summary
                        weatherDesc = data[0].forecast.today.summaryFormatet
                        //precipitation
                        precipitation = data[0].forecast.today.precipProbability
                        //humidity
                        humidity = data[0].forecast.today.humidity
                        //windspeed
                        windSpeed = data[0].forecast.today.windSpeed
                        //BackgroundImage
                        weahterBackgroundPath = '/img/weatherBackgrounds/';
                        weahterBackgroundSulfix = '.jpg';
                        weatherBackgroundNameToday = data[0].forecast.today.icon
                        weatherBackgroundSrcToday = weahterBackgroundPath + weatherBackgroundNameToday + weahterBackgroundSulfix;

                        setTimeout(function () {
                            updateData();
                            updateIconDaily();
                            updateBackground();
                            showSideWidget();
                        }, 500);

                    });

                    $('.week-list li:nth-child(2)').click(function () {
                        hideSideWidget();
                        $('.week-list li').removeClass('active');
                        $(this).addClass('active');
                        hideSideWidget();

                        setTimeout(function () {
                            updateDataTomorrow();
                            updateBackground();
                            showSideWidget();
                        }, 500);
                    });


                    $('.week-list li:nth-child(3)').click(function () {
                        hideSideWidget();
                        $('.week-list li').removeClass('active');
                        $(this).addClass('active');
                        setTimeout(function () {
                            updateDataTomorrow2();
                            updateBackground();
                            showSideWidget();
                        }, 500);
                    });


                    $('.week-list li:nth-child(4)').click(function () {
                        hideSideWidget();
                        $('.week-list li').removeClass('active');
                        $(this).addClass('active');
                        setTimeout(function () {
                            updateDataTomorrow3();
                            updateBackground();
                            showSideWidget();
                        }, 500);
                    });

                    $('.location-button').click(function () {
                        showubmitForm();
                        hideWeatherWidget();
                    });

                };
            });

            function hideWeatherWidget() {
                hideSideWidget();
                $('#wheaterWidget').removeClass('show');
            }

            function showWeatherWidget() {
                showSideWidget();
                $('#wheaterWidget').addClass('show');
            }

            function hideSideWidget() {
                $('.weather-side').removeClass('show');
            }

            function showSideWidget() {
                $('.weather-side').addClass('show');
            }

            function showErrorMsg() {
                $("#errorMsg").removeClass('d-none');
                $("#errorMsg").addClass('d-inline-block');
            };

            function hideErrorMsg() {
                $("#errorMsg").removeClass('d-inline-block');
                $("#errorMsg").addClass('d-none');
            };
        });

        // Show loding icon
        function showSpinner() {
            $("#spinner").removeClass('d-none');
            $("#spinner").addClass('d-inline-block');
        };

        function hideSpinner() {
            $("#spinner").removeClass('d-inline-block');
            $("#spinner").addClass('d-none');
        };
    });
});
