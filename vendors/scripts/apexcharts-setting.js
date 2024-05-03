var options = {
	series: [{
		name: 'pH',
		data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
	},{
		name: 'TDS',
		data: [5, 8, 50, 8, 40, 11, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
	},{
		name: 'DO',
		data: [25, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
	},{
		name: 'Temp',
		data: [10, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
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
		categories: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
	},
	title: {
		text: '24 Hour',
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
			gradientToColors: [ '#1b00ff'],
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
var chart = new ApexCharts(document.querySelector("#chart1"), options);
chart.render();

var options2 = {
	series: [{
		name: 'pH',
		data: [31, 40, 28, 51, 42, 109, 100]
	}, {
		name: 'TDS',
		data: [45, 35, 45, 32, 34, 52, 41]
	},{
		name: 'DO',
		data: [35, 25, 45, 32, 34, 52, 41]
	},{
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
		categories: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
	},
	tooltip: {
		enabled: true
	},
};
var chart = new ApexCharts(document.querySelector("#chart2"), options2);
chart.render();

var options3 = {
	series: [{
		name: 'pH',
		data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 52, 63, 78]
	}, {
		name: 'TDS',
		data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 52, 63, 52]
	}, {
		name: 'DO',
		data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 25, 36, 12]
	},{
		name: 'Temp',
		data: [50, 41, 36, 26, 45, 48, 52, 53, 41, 25, 36, 12]
	}],
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
		categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
	},
	fill: {
		opacity: 1
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return "$" + val + "thousands"
			}
		}
	}
};
var chart = new ApexCharts(document.querySelector("#chart3"), options3);
chart.render();

var options4 = {
	series: [{
		data: [44, 55, 41, 64, 22, 43, 21]
	}, {
		data: [53, 32, 33, 52, 13, 44, 32]
	}],
	chart: {
		type: 'bar',
		height: 430,
		toolbar: {
			show: false,
		}
	},
	grid: {
		show: false,
		padding: {
			left: 0,
			right: 0
		}
	},
	plotOptions: {
		bar: {
			horizontal: true,
			dataLabels: {
				position: 'top',
			},
		}
	},
	dataLabels: {
		enabled: true,
		offsetX: -6,
		style: {
			fontSize: '12px',
			colors: ['#fff']
		}
	},
	stroke: {
		show: true,
		width: 1,
		colors: ['#fff']
	},
	xaxis: {
		categories: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
	},
};
var chart = new ApexCharts(document.querySelector("#chart4"), options4);
chart.render();

var options8 = {
	series: [44, 55, 41, 17],
	chart: {
		type: 'donut',
	},
	labels: ['pH', 'DO', 'TDS', 'Temp'],
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
var chart = new ApexCharts(document.querySelector("#chart8"), options8);
chart.render();

var options9 = {
	series: [76, 67, 61, 90],
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
	labels: ['pH', 'DO', 'TDS', 'Temp'],
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
		formatter: function(seriesName, opts) {
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
var chart = new ApexCharts(document.querySelector("#chart9"), options9);
chart.render();

