
const firebaseConfig = {
    apiKey: "AIzaSyBuIvI9x3Dcsrpl6cULwCtNtZJWRrVrSBo",
    authDomain: "waterproject-218e8.firebaseapp.com",
    databaseURL: "https://waterproject-218e8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "waterproject-218e8",
    storageBucket: "waterproject-218e8.appspot.com",
    messagingSenderId: "850188820168",
    appId: "1:850188820168:web:dc8536e99014d5d5504ffd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();



// Set interval to call A function every 3 seconds
setInterval(function () {
    A();
}, 3000);

// A function to fetch data and send it to Firebase Realtime Database
function A() {
    fetch('http://202.29.238.30:1880/getdata')
        .then(function (response) {
            if (response.status == 200) {
                response.json().then(json => {
                    console.log(json);

                    // Extract data
                    const temperature = parseFloat(json["Temp"]).toFixed(2);
                    const doValue = parseFloat(json["DO"]).toFixed(2);
                    const phValue = parseFloat(json["pH"]).toFixed(2);
                    const tdsValue = parseFloat(json["TDS"]).toFixed(2);

                    // Update HTML elements
                    document.getElementById("Temp").innerHTML = temperature;
                    document.getElementById("DO").innerHTML = doValue;
                    document.getElementById("pH").innerHTML = phValue;
                    document.getElementById("TDS").innerHTML = tdsValue;

                    // Check if it's time to send data to Firebase (every 5 minutes)
                    const currentTime = new Date().getTime();
                    const lastSentTime = localStorage.getItem('lastSentTime');
                    if (!lastSentTime || currentTime - lastSentTime >= 300000) {
                        // Send data to Firebase Realtime Database
                        database.ref('sensorData').push({
                            temperature: temperature,
                            doValue: doValue,
                            phValue: phValue,
                            tdsValue: tdsValue
                        });

                        // Update last sent time in local storage
                        localStorage.setItem('lastSentTime', currentTime);
                    }
                });
                return;
            } else {
                throw new Error('Request failed.');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}



