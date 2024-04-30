const firebaseConLogin = {
  apiKey: "AIzaSyBuIvI9x3Dcsrpl6cULwCtNtZJWRrVrSBo",
  authDomain: "waterproject-218e8.firebaseapp.com",
  databaseURL:"https://waterproject-218e8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "waterproject-218e8",
  storageBucket: "waterproject-218e8.appspot.com",
  messagingSenderId: "850188820168",
  appId: "1:850188820168:web:dc8536e99014d5d5504ffd",
};

firebase.initializeApp(firebaseConLogin);

// Function to handle user registration
function registerWithEmailAndPassword(email, password) {
  // Call Firebase's createUserWithEmailAndPassword method
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

// ตรวจสอบรูปแบบของอีเมลก่อนที่จะทำการลงทะเบียนผู้ใช้
const emailInput = document.getElementById("email").value;
const passwordInput = document.getElementById("password").value;

// Function to validate email format
function isValidEmail(email) {
    // Regular expression to validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
}

// Function to handle user registration
function registerWithEmailAndPassword(email, password) {
  // Call Firebase's createUserWithEmailAndPassword method
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

// Function to handle registration process
function handleRegistration() {
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;

    if (!emailInput.trim()) {
        console.error("Email is required");
    } else {
        if (!isValidEmail(emailInput)) {
            console.error("Invalid email format");
        } else {
            registerWithEmailAndPassword(emailInput, passwordInput)
              .then((userCredential) => {
                const user = userCredential.user;
                console.log("User registered:", user.uid);
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Registration error:", errorCode, errorMessage);
              });
        }
    }
}




