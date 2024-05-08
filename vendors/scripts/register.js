const firebaseConfigLogin = {
  apiKey: "AIzaSyBuIvI9x3Dcsrpl6cULwCtNtZJWRrVrSBo",
  authDomain: "waterproject-218e8.firebaseapp.com",
  databaseURL: "https://waterproject-218e8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "waterproject-218e8",
  storageBucket: "waterproject-218e8.appspot.com",
  messagingSenderId: "850188820168",
  appId: "1:850188820168:web:dc8536e99014d5d5504ffd",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfigLogin);

const firestore = firebase.firestore();

// Function to handle user registration
function registerWithEmailAndPassword(email, password) {
  // Check password strength
  if (password.length < 6) {
    console.error("Password must be at least 6 characters long");
    return Promise.reject(new Error("Password must be at least 6 characters long"));
  }

  // Check password complexity (e.g., must contain at least one digit and one special character)
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/;
  if (!passwordRegex.test(password)) {
    console.error("Password must contain at least one digit and one special character");
    return Promise.reject(new Error("Password must contain at least one digit and one special character"));
  }

  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

// Function to write user data to Firestore
function writeUserData(email, username, fullName, phoneNumber, city, state) {
  firestore.collection("users").add({
    email: email,
    username: username,
    fullName: fullName,
    phoneNumber: phoneNumber, // Change to "male" or "female" based on selection
    city: city,
    state: state
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

// Function to handle next button click
function handleNextButtonClick() {
  var email = document.getElementById('email').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var fullName = document.getElementById('fullName').value;
  var phoneNumber = document.getElementById('phoneNumber').value;
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;

  // Select overview elements
  var overviewEmail = document.getElementById('overview-email');
  var overviewUsername = document.getElementById('overview-username');
  var overviewPassword = document.getElementById('overview-password');
  var overviewFullName = document.getElementById('overview-fullname');
  var overviewphoneNumber = document.getElementById('overview-phoneNumber');
  var overviewCity = document.getElementById('overview-city');
  var overviewState = document.getElementById('overview-state');

  // Check if all overview elements exist
  if (!overviewEmail || !overviewUsername || !overviewPassword || !overviewFullName || !overviewphoneNumber || !overviewCity || !overviewState) {
    console.error("One or more overview elements are missing");
    return;
  }

  // Set text content of overview elements
  overviewEmail.textContent = email;
  overviewUsername.textContent = username;
  overviewPassword.textContent = password;
  overviewFullName.textContent = fullName;
  overviewphoneNumber.textContent = phoneNumber; // Check if gender is selected and set to "male" or "female"
  overviewCity.textContent = city;
  overviewState.textContent = state;
}

// Function to handle registration process 
function handleRegistration() {
  const emailInput = document.getElementById("email");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const fullNameInput = document.getElementById("fullName");
  const phoneNumberInput = document.getElementById("phoneNumber"); // Male checkbox input
  const cityInput = document.getElementById("city");
  const stateInput = document.getElementById("state");

  // Check if all required inputs are available
  if (!emailInput || !usernameInput || !passwordInput || !fullNameInput || !cityInput || !stateInput || !phoneNumberInput) {
    console.error("One or more required inputs are missing");
    return;
  }

  const email = emailInput.value;
  const username = usernameInput.value;
  const password = passwordInput.value;
  const fullName = fullNameInput.value;
  const phoneNumber = phoneNumberInput.value; // Set gender based on checkbox selection
  const city = cityInput.value;
  const state = stateInput.value;

  if (!email.trim()) {
    console.error("Email is required");
    return;
  }

  if (!isValidEmail(email)) {
    console.error("Invalid email format");
    return;
  }

  handleNextButtonClick(); // Display data immediately after clicking Next

  registerWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User registered:", user.uid);
      writeUserData(email, username, fullName, phoneNumber, city, state); // Write user data to Firestore
      document.getElementById('success-modal-btn').click();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Registration error:", errorCode, errorMessage);
    });
}
