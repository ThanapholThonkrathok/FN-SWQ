
const userDataString = localStorage.getItem('userData');

if (userDataString) {
    
    const userData = JSON.parse(userDataString);


    document.getElementById('username').textContent = userData.username;
    document.getElementById('email').textContent = userData.email;
    document.getElementById('fullName').textContent = userData.fullName;
    document.getElementById('state').textContent = userData.state;
    document.getElementById('phoneNumber').textContent = userData.phoneNumber;
    document.getElementById('city').textContent = userData.city;

    
    
    console.log(userData);    
} else {
    console.error("User data not found in localStorage");
    
}
