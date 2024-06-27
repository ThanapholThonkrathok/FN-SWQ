// Your web app's Firebase configuration
const firebaseConfigApex = {
	apiKey: "AIzaSyBuIvI9x3Dcsrpl6cULwCtNtZJWRrVrSBo",
	authDomain: "waterproject-218e8.firebaseapp.com",
	databaseURL:
		"https://waterproject-218e8-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "waterproject-218e8",
	storageBucket: "waterproject-218e8.appspot.com",
	messagingSenderId: "850188820168",
	appId: "1:850188820168:web:dc8536e99014d5d5504ffd",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfigApex);

// Reference to your Realtime Database
const database = firebase.database();





var options = {
	series: [{
		name: 'pH',
		data: [],
	}, {
		name: 'TDS',
		data: [],
	}, {
		name: 'DO',
		data: [],
	}, {
		name: 'Temp',
		data: [],
	}
	],
	chart: {
		height: 350,
		type: 'line',
		toolbar: {
			show: false,
		}
	},
	grid: {
		show: true,
		padding: {
			left: 0,
			right: 0
		}
	},
	stroke: {
		width: 7,
		curve: 'smooth'
	},
	xaxis: {
		categories: [],
	},
	title: {
		text: '24 ชั่วโมง',
		align: 'left',
		style: {
			fontSize: "16px",
			color: '#666'
		}
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'dark',
			gradientToColors: ['#1b00ff'],
			shadeIntensity: 1,
			type: 'horizontal',
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 100, 100, 100]
		},
	},
	markers: {
		size: 4,
		colors: ["#FFA41B"],
		strokeColors: "#fff",
		strokeWidth: 2,
		hover: {
			size: 7,
		}
	},

};


var databaseRef = firebase.database().ref("data1Hr");


databaseRef.on("value", function (snapshot) {
	var newData = snapshot.val(); 
	var pHData = [];
	var TDSData = [];
	var DOData = [];
	var TempData = [];

	
	for (var key in newData) {
		if (newData.hasOwnProperty(key)) {
			
			pHData.push({ x: key, y: newData[key].pH });
			TDSData.push({ x: key, y: newData[key].TDS });
			DOData.push({ x: key, y: newData[key].DO });
			TempData.push({ x: key, y: newData[key].Temp });
		}
	}

	
	options.series = [
		{ name: "pH", data: pHData },
		{ name: "TDS", data: TDSData },
		{ name: "DO", data: DOData },
		{ name: "Temp", data: TempData },
	];

	
	var chart = new ApexCharts(document.querySelector("#chart1"), options);
	chart.render();

});
var options = {
	series: [{
		name: 'pH',
		data: [],
	}, {
		name: 'TDS',
		data: [],
	}, {
		name: 'DO',
		data: [],
	}, {
		name: 'Temp',
		data: [],
	}
	],
	chart: {
		height: 350,
		type: 'line',
		toolbar: {
			show: false,
		}
	},
	grid: {
		show: true,
		padding: {
			left: 0,
			right: 0
		}
	},
	stroke: {
		width: 7,
		curve: 'smooth'
	},
	xaxis: {
		categories: [],
	},
	title: {
		text: '24 ชั่วโมง',
		align: 'left',
		style: {
			fontSize: "16px",
			color: '#666'
		}
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'dark',
			gradientToColors: ['#1b00ff'],
			shadeIntensity: 1,
			type: 'horizontal',
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 100, 100, 100]
		},
	},
	markers: {
		size: 4,
		colors: ["#FFA41B"],
		strokeColors: "#fff",
		strokeWidth: 2,
		hover: {
			size: 7,
		}
	},

};


var databaseRef = firebase.database().ref("data1Hr");


databaseRef.on("value", function (snapshot) {
	var newData = snapshot.val(); 
	var pHData = [];
	var TDSData = [];
	var DOData = [];
	var TempData = [];

	
	for (var key in newData) {
		if (newData.hasOwnProperty(key)) {
			
			pHData.push({ x: key, y: newData[key].pH });
			TDSData.push({ x: key, y: newData[key].TDS });
			DOData.push({ x: key, y: newData[key].DO });
			TempData.push({ x: key, y: newData[key].Temp });
		}
	}

	
	options.series = [
		{ name: "TDS", data: TDSData },
	];

	
	var chart = new ApexCharts(document.querySelector("#chart11"), options);
	chart.render();
});







var options2 = {
	series: [{
		name: 'pH',
		data: [31, 40, 28, 51, 42, 109, 100]
	}, {
		name: 'TDS',
		data: [45, 35, 45, 32, 34, 52, 41]
	}, {
		name: 'DO',
		data: [35, 25, 45, 32, 34, 52, 41]
	}, {
		name: 'Temp',
		data: [25, 10, 45, 32, 34, 52, 41]
	}],
	chart: {
		height: 350,
		type: 'area',
		toolbar: {
			show: false,
		}
	},
	grid: {
		show: true,
		padding: {
			left: 0,
			right: 0
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	xaxis: {
		categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	},
	tooltip: {
		enabled: true
	},
};

var databaseRef = firebase.database().ref("data1Week");


databaseRef.on("value", function (snapshot) {
	var newData = snapshot.val(); 
	var pHData = [];
	var TDSData = [];
	var DOData = [];
	var TempData = [];

	
	for (var key in newData) {
		if (newData.hasOwnProperty(key)) {
			
			pHData.push({ x: key, y: newData[key].pH });
			TDSData.push({ x: key, y: newData[key].TDS });
			DOData.push({ x: key, y: newData[key].DO });
			TempData.push({ x: key, y: newData[key].Temp });
		}
	}

	
	options2.series = [
		{ name: "pH", data: pHData },
		{ name: "TDS", data: TDSData },
		{ name: "DO", data: DOData },
		{ name: "Temp", data: TempData },
	];

	
	var chart = new ApexCharts(document.querySelector("#chart2"), options2);
	chart.render();
});

var options2 = {
	series: [{
		name: 'pH',
		data: [31, 40, 28, 51, 42, 109, 100]
	}, {
		name: 'TDS',
		data: [45, 35, 45, 32, 34, 52, 41]
	}, {
		name: 'DO',
		data: [35, 25, 45, 32, 34, 52, 41]
	}, {
		name: 'Temp',
		data: [25, 10, 45, 32, 34, 52, 41]
	}],
	chart: {
		height: 350,
		type: 'area',
		toolbar: {
			show: false,
		}
	},
	grid: {
		show: true,
		padding: {
			left: 0,
			right: 0
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	xaxis: {
		categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	},
	tooltip: {
		enabled: true
	},
};

var databaseRef = firebase.database().ref("data1Week");


databaseRef.on("value", function (snapshot) {
	var newData = snapshot.val(); 
	var pHData = [];
	var TDSData = [];
	var DOData = [];
	var TempData = [];

	
	for (var key in newData) {
		if (newData.hasOwnProperty(key)) {
			
			pHData.push({ x: key, y: newData[key].pH });
			TDSData.push({ x: key, y: newData[key].TDS });
			DOData.push({ x: key, y: newData[key].DO });
			TempData.push({ x: key, y: newData[key].Temp });
		}
	}

	
	options2.series = [
		{ name: "TDS", data: TDSData },
	];

	
	var chart = new ApexCharts(document.querySelector("#chart22"), options2);
	chart.render();
});








	var options3 = {
	  series: [
		{
		  name: "pH",
		  data: [],
		},
		{
		  name: "TDS",
		  data: [],
		},
		{
		  name: "DO",
		  data: [],
		},
		{
		  name: "Temp",
		  data: [],
		},
	  ],
	  chart: {
		type: 'bar',
		height: 350,
		toolbar: {
		  show: false,
		}
	  },
	  plotOptions: {
		bar: {
		  horizontal: false,
		  columnWidth: '25%',
		  endingShape: 'rounded'
		},
	  },
	  dataLabels: {
		enabled: false
	  },
	  stroke: {
		show: true,
		width: 2,
		colors: ['transparent']
	  },
	  grid: {
		show: true,
		padding: {
		  left: 0,
		  right: 0
		}
	  },
	  xaxis: {
		categories: [],
	  },
	  fill: {
		opacity: 1
	  },
	  tooltip: {
		y: {
		  formatter: function (val) {
			return "" + val + ""
		  }
		}
	  }
	};
  

var databaseRef = firebase.database().ref("data1Month");


databaseRef.on("value", function (snapshot) {
	var newData = snapshot.val(); 
	var pHData = [];
	var TDSData = [];
	var DOData = [];
	var TempData = [];

	
	for (var key in newData) {
		if (newData.hasOwnProperty(key)) {
			
			pHData.push({ x: key, y: newData[key].pH });
			TDSData.push({ x: key, y: newData[key].TDS });
			DOData.push({ x: key, y: newData[key].DO });
			TempData.push({ x: key, y: newData[key].Temp });
		}
	}

	
	options3.series = [
		{ name: "pH", data: pHData },
		{ name: "TDS", data: TDSData },
		{ name: "DO", data: DOData },
		{ name: "Temp", data: TempData },
	];

	
	var chart = new ApexCharts(document.querySelector("#chart3"), options3);
	chart.render();
});

var options3 = {
	series: [
	  {
		name: "pH",
		data: [],
	  },
	  {
		name: "TDS",
		data: [],
	  },
	  {
		name: "DO",
		data: [],
	  },
	  {
		name: "Temp",
		data: [],
	  },
	],
	chart: {
	  type: 'bar',
	  height: 350,
	  toolbar: {
		show: false,
	  }
	},
	plotOptions: {
	  bar: {
		horizontal: false,
		columnWidth: '25%',
		endingShape: 'rounded'
	  },
	},
	dataLabels: {
	  enabled: false
	},
	stroke: {
	  show: true,
	  width: 2,
	  colors: ['transparent']
	},
	grid: {
	  show: true,
	  padding: {
		left: 0,
		right: 0
	  }
	},
	xaxis: {
	  categories: [],
	},
	fill: {
	  opacity: 1
	},
	tooltip: {
	  y: {
		formatter: function (val) {
		  return "" + val + ""
		}
	  }
	}
  };


var databaseRef = firebase.database().ref("data1Month");


databaseRef.on("value", function (snapshot) {
  var newData = snapshot.val(); 
  var pHData = [];
  var TDSData = [];
  var DOData = [];
  var TempData = [];

  
  for (var key in newData) {
	  if (newData.hasOwnProperty(key)) {
		  
		  pHData.push({ x: key, y: newData[key].pH });
		  TDSData.push({ x: key, y: newData[key].TDS });
		  DOData.push({ x: key, y: newData[key].DO });
		  TempData.push({ x: key, y: newData[key].Temp });
	  }
  }

  
  options3.series = [
	  { name: "TDS", data: TDSData },

  ];

  
  var chart = new ApexCharts(document.querySelector("#chart33"), options3);
  chart.render();
});

  
  
  


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function fetchDataAndRenderChart() {
	firebase.database().ref('data').once('value')
		.then(function (snapshot) {
			var data = snapshot.val();
			if (data) {
				// เลือกเฉพาะค่าที่ต้องการจากข้อมูล
				var selectedData = {
					'pH': data.pH,
					'DO': data.DO,
					'TDS': data.TDS,
					'Temp': data.Temp
				};

				var values = Object.values(selectedData);
				var labels = Object.keys(selectedData);

				var options = {
					series: values,
					chart: {
						type: 'donut',
					},
					labels: labels,
					responsive: [{
						breakpoint: 480,
						options: {
							chart: {
								width: 200
							},
							legend: {
								position: 'bottom'
							}
						}
					}]
				};

				var chart = new ApexCharts(document.querySelector("#chart8"), options);
				chart.render();
			} else {
				console.log("No data available");
			}
		})
		.catch(function (error) {
			console.error("Error fetching data:", error);
		});
}

// เรียกใช้งานฟังก์ชันเพื่อดึงข้อมูลและสร้างกราฟครั้งแรก
fetchDataAndRenderChart();

setInterval(fetchDataAndRenderChart, 300000);






// ฟังก์ชันสำหรับดึงข้อมูลจาก Firebase Realtime Database และอัพเดทกราฟ
function fetchDataAndRenderChartRa() {
	firebase.database().ref('data').once('value')
	  .then(function(snapshot) {
		var data = snapshot.val();
		if (data) {
		  // เลือกเฉพาะค่าที่ต้องการจากข้อมูล
		  var selectedData = {
			'pH': data.pH,
			'DO': data.DO,
			'TDS': data.TDS,
			'Temp': data.Temp
		  };
		  
		  var values = Object.values(selectedData);
		  var labels = Object.keys(selectedData);
		  
		  var options = {
			series: values,
			chart: {
			  height: 390,
			  type: 'radialBar',
			},
			plotOptions: {
			  radialBar: {
				offsetY: 0,
				startAngle: 0,
				endAngle: 270,
				hollow: {
				  margin: 5,
				  size: '40%',
				  background: 'transparent',
				  image: undefined,
				},
				dataLabels: {
				  name: {
					show: false,
				  },
				  value: {
					show: false,
				  }
				}
			  }
			},
			colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
			labels: labels,
			legend: {
			  show: true,
			  floating: true,
			  fontSize: '14px',
			  position: 'left',
			  offsetX: 40,
			  offsetY: 15,
			  labels: {
				useSeriesColors: true,
			  },
			  markers: {
				size: 0
			  },
			  formatter: function (seriesName, opts) {
				return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
			  },
			  itemMargin: {
				vertical: 3
			  }
			},
			responsive: [{
			  breakpoint: 480,
			  options: {
				legend: {
				  show: false
				}
			  }
			}]
		  };
		  
		  var chart = new ApexCharts(document.querySelector("#chart9"), options);
		  chart.render();
		} else {
		  console.log("No data available");
		}
	  })
	  .catch(function(error) {
		console.error("Error fetching data:", error);
	  });
  }
  
  // เรียกใช้งานฟังก์ชันเพื่อดึงข้อมูลและอัพเดทกราฟครั้งแรก
  fetchDataAndRenderChartRa();
  
  // เรียกใช้งานฟังก์ชัน fetchDataAndRenderChart() ทุก 5 วินาที
  setInterval(fetchDataAndRenderChartRa, 300000);
  

