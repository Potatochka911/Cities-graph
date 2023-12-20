const chartElem = document.getElementById('bar-chart')

var chart = new Chart(chartElem, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Temperature',
			data: [],
			borderColor: "#BB2222",
			borderWidth: 1,
			tension: 0.4
		},
		{
			label: 'Temperature',
			data: [],
			borderColor: "#005599",
			borderWidth: 1,
			tension: 0.4
		}]
	},
	options: {
		scales: {
			y: {
				beginAtZero: true
			}
		}
	}
});

var activeCity = 0;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Oct"];

var request = new XMLHttpRequest();
request.open("GET", "https://raw.githubusercontent.com/RFUNN/JSON_Data/main/climate.json");
request.responseType = "json";
request.send();

var citiesArray;

request.onload = function () {
	citiesArray = request.response;

	restart_graph(activeCity);
}

function restart_graph(cityNum) {
	var cityObj = citiesArray[cityNum];
	for (var i = 0; i < 12; i++) {
		chart.data.labels[i] = months[i];
		chart.data.datasets[0].data[i] = cityObj.monthlyAvg[i].high;
		chart.data.datasets[0].label = `Temperature ${cityObj.city} (high)`
		chart.data.datasets[1].data[i] = cityObj.monthlyAvg[i].low;
		chart.data.datasets[1].label = `Temperature ${cityObj.city} (low)`
	}
	document.querySelector("button.city.active").innerHTML = citiesArray[cityNum].city;
	chart.update();
}

function citySwitch(argument) {
	if (argument > 0)
	{
		if (activeCity < citiesArray.length-1) {
			activeCity ++;
		} else {
			activeCity = 0;
		}
	} else {
		if (activeCity > 0) {
			activeCity --;
		} else {
			activeCity = citiesArray.length-1;
		}
	}
	restart_graph(activeCity);
}