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
    database.ref('data').set(data);
}

// Function to fetch data from the specified URL and send it to the database
function fetchDataAndSendToDatabase() {
    fetch('http://202.29.238.30:1880/getdata')
        .then(response => response.json())
        .then(data => {
            // Send fetched data to the Realtime Database
            sendDataToDatabase(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function initially to start the process
fetchDataAndSendToDatabase();

// Set interval to fetch and send data every 3 seconds
setInterval(fetchDataAndSendToDatabase, 1000);




// Function to update the HTML with fetched numerical data for a specific parameter
function updateHTMLWithNumericData(parameter, data) {
    // Get the element by its ID
    const element = document.getElementById('display' + parameter);
    // Update the HTML content with the fetched numerical data
    element.innerText = data[parameter];
}

// Function to fetch data from Realtime Database and update HTML for all numerical parameters
function fetchDataAndUpdateHTML() {
    // Reference to the 'data' node in your database
    const dataRef = database.ref('data');

    // Fetch data from the database
    dataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        // Update HTML with fetched numerical data for each parameter
        updateHTMLWithNumericData('DO', data);
        updateHTMLWithNumericData('TDS', data);
        updateHTMLWithNumericData('pH', data);
        updateHTMLWithNumericData('Temp', data);
    });
}

// Call the function initially to display data on page load
fetchDataAndUpdateHTML();

// Set interval to fetch and update data every 3 seconds
setInterval(fetchDataAndUpdateHTML, 1000);


function sendDataPeriodically() {
    // Function to send data to the database
    function sendDataToDatabase(data) {
        // Set data to a specific path in your database, replacing existing data
        database.ref('data15min').set(data); // เปลี่ยนชื่อของเส้นทางในฐานข้อมูลเป็น 'data15min'
    }

    // Function to fetch data from the specified URL and send it to the database
    function fetchDataAndSendToDatabase() {
        fetch('http://202.29.238.30:1880/getdata')
            .then(response => response.json())
            .then(data => {
                // Send fetched data to the Realtime Database
                sendDataToDatabase(data);
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => {
                // Call the function again after 5 minutes
                setTimeout(fetchDataAndSendToDatabase, 300000); // 5 minutes in milliseconds
            });
    }

    // Call the function initially to start the process
    fetchDataAndSendToDatabase();
}

// Start sending data periodically
sendDataPeriodically();


