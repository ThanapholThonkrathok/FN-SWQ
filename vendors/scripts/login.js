const firebaseConfigLoginweb = {
    apiKey: "AIzaSyBuIvI9x3Dcsrpl6cULwCtNtZJWRrVrSBo",
    authDomain: "waterproject-218e8.firebaseapp.com",
    databaseURL: "https://waterproject-218e8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "waterproject-218e8",
    storageBucket: "waterproject-218e8.appspot.com",
    messagingSenderId: "850188820168",
    appId: "1:850188820168:web:dc8536e99014d5d5504ffd",
};




// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfigLoginweb);
  }
  
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  
  // Function to handle user login
  function loginWithEmailAndPassword(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  
  // Function to fetch user data from Firestore by email
  function getUserDataByEmail(email) {
    return firestore.collection("users").where("email", "==", email).get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          return querySnapshot.docs[0].data();
        } else {
          return null; // User not found
        }
      })
      .catch(error => {
        console.error("Error getting user data:", error);
        throw error;
      });
  }
  
  // Function to display user data after successful login
  function displayUserData(userData) {
    console.log("User data:", userData);
    // Display user data in UI or perform other actions
  }
  
  // After successful login, fetch user data from Firestore and display it
  function handleSuccessfulLogin(email) {
    getUserDataByEmail(email)
      .then(userData => {
        if (userData) {
          displayUserData(userData);
        } else {
          console.error("User data not found");
          // Handle case where user data is not found
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        // Handle error while fetching user data
      });
  }
  
  // Event listener for login form submission
  document.getElementById("login-form").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get user input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Call function to login with Firebase Authentication
    loginWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        console.log("User logged in:", user.uid);
        // Fetch and display user data from Firestore
        handleSuccessfulLogin(email);
      })
      .catch((error) => {
        // Login error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
      });
  });

  // Function to store user data in localStorage
function storeUserDataInLocalStorage(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

// After successful login, fetch user data from Firestore and store it in localStorage
function handleSuccessfulLogin(email) {
    getUserDataByEmail(email)
        .then(userData => {
            if (userData) {
                storeUserDataInLocalStorage(userData);
                redirect();
            } else {
                console.error("User data not found");
                // Handle case where user data is not found
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            // Handle error while fetching user data
        });
}

// Function to redirect to index.html
function redirect() {
    window.location.href = 'index.html';
}
