const mockData = [
  { x: '2024-06-21 10:00:00', y: 2.5 },
  { x: '2024-06-21 11:00:00', y: 3.0 },
  { x: '2024-06-21 12:00:00', y: 3.5 },
  { x: '2024-06-21 13:00:00', y: 4.0 },
  { x: '2024-06-21 14:00:00', y: 4.5 },
  { x: '2024-06-21 15:00:00', y: 5.0 },
  { x: '2024-06-21 16:00:00', y: 5.5 },
];

// ตัวเลือกการตั้งค่า ApexCharts
const options4 = {
  chart: {
      height: 350,
      type: "line",
      parentHeightOffset: 0,
      fontFamily: "Poppins, sans-serif",
      toolbar: { show: false },
  },
  title: {
		text: '60 นาที',
		align: 'left',
		style: {
			fontSize: "16px",
			color: '#666'
		}
	},
  colors: ["#1b00ff"],
  grid: { borderColor: "#c7d2dd", strokeDashArray: 5 },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ["transparent"] },
  series: [{ name: "TDS", data: mockData }],
  xaxis: {
      type: 'datetime',
      labels: { style: { colors: ["#353535"], fontSize: "16px" } },
      axisBorder: { color: "#8fa6bc" },
  },
  yaxis: { show: true },
  legend: {
      horizontalAlign: "right",
      position: "top",
      fontSize: "16px",
      labels: { colors: "#353535" },
      markers: { width: 10, height: 10, radius: 15 },
  },
  fill: { opacity: 1 },
  tooltip: { enabled: true },
};

// สร้างกราฟด้วย ApexCharts
const chart4 = new ApexCharts(document.querySelector("#chart4"), options4);
chart4.render();