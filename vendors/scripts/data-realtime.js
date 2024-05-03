// Your web app's Firebase configuration
const firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);

// Reference to your Realtime Database
const database = firebase.database();

// Function to send data to Realtime Database
function sendDataToDatabase(data) {
  // Set data to a specific path in your database, replacing existing data
  database.ref("data").set(data);
}

// Function to fetch data from the specified URL and send it to the database
function fetchDataAndSendToDatabase() {
  fetch("http://202.29.238.30:1880/getdata")
    .then((response) => response.json())
    .then((data) => {
      // Send fetched data to the Realtime Database
      sendDataToDatabase(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Call the function initially to start the process
fetchDataAndSendToDatabase();

// Set interval to fetch and send data every 3 seconds
setInterval(fetchDataAndSendToDatabase, 1000);

// Function to update the HTML with fetched numerical data for a specific parameter
function updateHTMLWithNumericData(parameter, data) {
  // Get the element by its ID
  const element = document.getElementById("display" + parameter);
  // Update the HTML content with the fetched numerical data
  element.innerText = data[parameter];
}

// Function to fetch data from Realtime Database and update HTML for all numerical parameters
function fetchDataAndUpdateHTML() {
  // Reference to the 'data' node in your database
  const dataRef = database.ref("data");

  // Fetch data from the database
  dataRef.once("value", (snapshot) => {
    const data = snapshot.val();
    // Update HTML with fetched numerical data for each parameter
    updateHTMLWithNumericData("DO", data);
    updateHTMLWithNumericData("TDS", data);
    updateHTMLWithNumericData("pH", data);
    updateHTMLWithNumericData("Temp", data);
  });
}

// Call the function initially to display data on page load
fetchDataAndUpdateHTML();

// Set interval to fetch and update data every 3 seconds
setInterval(fetchDataAndUpdateHTML, 1000);

// Function to fetch data from the URL and push to Firebase Realtime Database
let counter = 5; // เริ่มต้นที่ 5

const fetchDataAndPushToDatabase = () => {
  fetch("http://202.29.238.30:1880/getdata")
    .then((response) => response.json())
    .then((data) => {
      // สร้างชื่อของข้อมูลใหม่ด้วยตัวเลขที่เพิ่มขึ้นทีละห้า
      const newDataKey = counter;

      // ตั้งค่าข้อมูลที่มี key ที่สร้างขึ้น
      firebase
        .database()
        .ref("data5min/" + newDataKey)
        .set(data)
        .then(() => {
          // เพิ่มค่า counter ทีละ 5
          counter += 5;

          // เมื่อ newDataKey ถึง 60 ให้ลบข้อมูลทั้งหมด
          if (newDataKey >= 60) {
            firebase.database().ref("data5min").remove();
            counter = 5; // เริ่มต้นนับใหม่ที่ 5
          }
        });
    })
    .catch((error) => console.error("Error fetching data:", error));
};

// เรียกใช้ fetchDataAndPushToDatabase ทุกๆ 5 นาที
setInterval(fetchDataAndPushToDatabase, 300000);

let counterHr = 1;

const fetchDataAndPushToDatabasHr = () => {
  fetch("http://202.29.238.30:1880/getdata")
    .then((response) => response.json())
    .then((data) => {
      // สร้างชื่อของข้อมูลใหม่ด้วยตัวเลขที่เพิ่มขึ้นทีละห้า
      const newDataKeyHr = counterHr;

      // ตั้งค่าข้อมูลที่มี key ที่สร้างขึ้น
      firebase
        .database()
        .ref("data1Hr/" + newDataKeyHr)
        .set(data)
        .then(() => {
          // เพิ่มค่า counter ทีละ 1
          counterHr += 1;

          // เมื่อ newDataKey ถึง 60 ให้ลบข้อมูลทั้งหมด
          if (newDataKeyHr >= 24) {
            firebase.database().ref("data1Hr").remove();
            counterHr = 1; // เริ่มต้นนับใหม่ที่ 1
          }
        });
    })
    .catch((error) => console.error("Error fetching data:", error));
};

// เรียกใช้ fetchDataAndPushToDatabase ทุกๆ 5 นาที
setInterval(fetchDataAndPushToDatabasHr, 300000);


const fetchDataAndPushToDatabaseMonth = () => {
  fetch("http://202.29.238.30:1880/getdata")
    .then((response) => response.json())
    .then((data) => {
      const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
      const now = new Date();
      const monthAbbreviation = monthNames[now.getMonth()]; // หาชื่อย่อของเดือนปัจจุบัน

      firebase
        .database()
        .ref("data1Month/" + monthAbbreviation)
        .set(data)
        .then(() => {
          // ไม่ต้องเพิ่ม counter หรือเงื่อนไขเพิ่มเติม
        });
    })
    .catch((error) => console.error("Error fetching data:", error));
};

// เรียกใช้ fetchDataAndPushToDatabaseMonth ทุกๆ 1 เดือน
setInterval(fetchDataAndPushToDatabaseMonth, 3000); // ประมาณ 1 เดือน (จำนวนวินาที)






var options5 = {
  chart: {
    height: 350,
    type: "bar",
    parentHeightOffset: 0,
    fontFamily: "Poppins, sans-serif",
    toolbar: {
      show: false,
    },
  },
  colors: ["#1b00ff", "#f56767", "#33D1FF", "#33FFB2"],
  grid: {
    borderColor: "#c7d2dd",
    strokeDashArray: 5,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "100%", // กำหนดให้แท่งมีขนาดเท่ากันทั้งหมด
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
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
  xaxis: {
    categories: [],
    tickAmount: 4,
    labels: {
      style: {
        colors: ["#353535"],
        fontSize: "16px",
      },
    },
    axisBorder: {
      color: "#8fa6bc",
    },
  },
  yaxis: {
    show: false,
  },
  legend: {
    horizontalAlign: "right",
    position: "top",
    fontSize: "16px",
    offsetY: 0,
    labels: {
      colors: "#353535",
    },
    markers: {
      width: 10,
      height: 10,
      radius: 15,
    },
    itemMargin: {
      vertical: 0, // กำหนดให้ไม่มีความห่างในแต่ละชุดข้อมูล
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: false,
  },
};

// สร้างตัวแปรเก็บ reference ของ Firebase Realtime Database
var databaseRef = firebase.database().ref("data5min");

// เพิ่ม event listener เพื่อดักเหตุการณ์การเปลี่ยนแปลงในข้อมูล
databaseRef.on("value", function (snapshot) {
  var newData = snapshot.val(); // ดึงข้อมูลทั้งหมดจาก Firebase Realtime Database
  var pHData = [];
  var TDSData = [];
  var DOData = [];
  var TempData = [];

  // วนลูปเพื่อนำข้อมูลที่ดึงมาไปใช้ในรูปแบบที่ ApexCharts ต้องการ
  for (var key in newData) {
    if (newData.hasOwnProperty(key)) {
      // เก็บข้อมูลตามค่าของแกน x แต่ละค่า
      pHData.push({ x: key, y: newData[key].pH });
      TDSData.push({ x: key, y: newData[key].TDS });
      DOData.push({ x: key, y: newData[key].DO });
      TempData.push({ x: key, y: newData[key].Temp });
    }
  }

  // อัปเดตข้อมูลใน options5 ของคุณ
  options5.series = [
    { name: "pH", data: pHData },
    { name: "TDS", data: TDSData },
    { name: "DO", data: DOData },
    { name: "Temp", data: TempData },
  ];

  // เรียกใช้งาน ApexCharts เพื่อแสดงผล
  var chart5 = new ApexCharts(document.querySelector("#chart5"), options5);
  chart5.render();
});

