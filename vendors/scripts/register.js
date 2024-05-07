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
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

// Function to write user data to Firestore
function writeUserData(email, username, fullName, gender, city, state) {
  firestore.collection("users").add({
    email: email,
    username: username,
    fullName: fullName,
    gender: gender,
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
  var gender = document.querySelector('input[name="gender"]:checked');
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;

  document.getElementById('overview-email').textContent = email;
  document.getElementById('overview-username').textContent = username;
  document.getElementById('overview-password').textContent = password;
  document.getElementById('overview-fullname').textContent = fullName;
  document.getElementById('overview-gender').textContent = gender ? gender.value : ''; // Check if gender is selected
  document.getElementById('overview-city').textContent = city;
  document.getElementById('overview-state').textContent = state;
}

// Function to handle registration process
function handleRegistration() {
  const emailInput = document.getElementById("email");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const fullNameInput = document.getElementById("fullName");
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const cityInput = document.getElementById("city");
  const stateInput = document.getElementById("state");

  // Check if all required inputs are available
  if (!emailInput || !usernameInput || !passwordInput || !fullNameInput || !genderInput || !cityInput || !stateInput) {
    console.error("One or more required inputs are missing");
    return;
  }

  const email = emailInput.value;
  const username = usernameInput.value;
  const password = passwordInput.value;
  const fullName = fullNameInput.value;
  const gender = genderInput ? genderInput.value : ''; // Check if gender is selected
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
      writeUserData(email, username, fullName, gender, city, state); // Write user data to Firestore
      document.getElementById('success-modal-btn').click();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Registration error:", errorCode, errorMessage);
    });
}

// When the document is loaded
document.addEventListener("DOMContentLoaded", function() {
  var registerForm = document.querySelector('.tab-wizard2');

  registerForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    handleRegistration(); // Call handleRegistration() function to initiate registration process
  });
});