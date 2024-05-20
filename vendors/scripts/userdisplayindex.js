
document.addEventListener('DOMContentLoaded', function() {
    // ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้จาก sessionStorage
    function getUserDataFromSessionStorage() {
      const sessionUUID = sessionStorage.getItem('sessionUUID');
      if (sessionUUID) {
        const userData = sessionStorage.getItem(sessionUUID);
        if (userData) {
          return JSON.parse(userData);
        } else {
          console.error('User data not found in sessionStorage.');
          return null;
        }
      } else {
        console.error('Session UUID not found.');
        return null;
      }
    }
  
    // ฟังก์ชันเพื่อแสดงข้อมูลผู้ใช้ใน HTML
    function displayUserData(userData) {
      if (userData) {
        document.getElementById('username').textContent = userData.username;
        document.getElementById('email').textContent = userData.email;
        document.getElementById('fullName').textContent = userData.fullName;
        document.getElementById('city').textContent = userData.city;
        document.getElementById('state').textContent = userData.state;
        document.getElementById('phoneNumber').textContent = userData.phoneNumber;
        document.getElementById('contry').textContent = userData.country;
        document.getElementById('postalCode').textContent = userData.postalCode;
      } else {
        console.error('No user data to display.');
      }
    }
  
    // ดึงข้อมูลผู้ใช้จาก sessionStorage และแสดงใน HTML
    const userData = getUserDataFromSessionStorage();
    displayUserData(userData);
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
        apiKey: "AIzaSyBuIvI9x3Dcsrpl6cULwCtNtZJWRrVrSBo",
        authDomain: "waterproject-218e8.firebaseapp.com",
        databaseURL: "https://waterproject-218e8-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "waterproject-218e8",
        storageBucket: "waterproject-218e8.appspot.com",
        messagingSenderId: "850188820168",
        appId: "1:850188820168:web:dc8536e99014d5d5504ffd",
    };

    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth(app);
    const firestore = firebase.firestore(app);

    const sessionUUID = sessionStorage.getItem('sessionUUID');

    function getUserDataFromSessionStorage() {
        if (sessionUUID) {
            const userData = sessionStorage.getItem(sessionUUID);
            if (userData) {
                return JSON.parse(userData);
            } else {
                console.error('User data not found in sessionStorage.');
                return null;
            }
        } else {
            console.error('Session UUID not found.');
            return null;
        }
    }

    function storeUserDataInSessionStorage(userData) {
        if (sessionUUID) {
            sessionStorage.setItem(sessionUUID, JSON.stringify(userData));
        } else {
            console.error('Session UUID not found.');
        }
    }

    function updateUserDataInFirestore(email, userData) {
        const userDocRef = firestore.collection("users").where("email", "==", email);
        return userDocRef.get()
            .then(querySnapshot => {
                if (querySnapshot.empty) {
                    console.error('No user found with the given email.');
                    return;
                }
                querySnapshot.forEach(doc => {
                    doc.ref.update(userData)
                        .then(() => {
                            console.log('User data updated in Firestore');
                        })
                        .catch(error => {
                            console.error("Error updating user data in Firestore:", error);
                        });
                });
            })
            .catch(error => {
                console.error("Error finding user in Firestore:", error);
            });
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        
        const userData = {
            fullName: document.getElementById('full-name').value,
            country: document.getElementById('coun-try').value,
            state: document.getElementById('sta-te').value,
            postalCode: document.getElementById('postal-code').value,
            phoneNumber: document.getElementById('phone-number').value,
            city: document.getElementById('ci-ty').value
        };

        // อัปเดต sessionStorage
        storeUserDataInSessionStorage(userData);

        // รับ user ID จาก Firestore
        const currentUser = auth.currentUser;
        if (currentUser) {
            updateUserDataInFirestore(currentUser.email, userData)
                .then(() => {
                    console.log(currentUser.uid);
                    console.log('User data updated in Firestore and sessionStorage');
                })
                .catch(error => {
                    console.error('Error updating user data in Firestore:', error);
                });
        } else {
            console.error('No user is currently signed in');
        }
    }
    
    document.getElementById('profile-form').addEventListener('submit', handleFormSubmit);

    // ตรวจสอบว่ามีข้อมูลใน sessionStorage หรือไม่
    let existingUserData = getUserDataFromSessionStorage();
    if (!existingUserData) {
        // ถ้าไม่มีข้อมูล สร้างข้อมูลใหม่
        existingUserData = {
            fullName: '',
            email: '',
            country: '',
            state: '',
            postalCode: '',
            phoneNumber: '',
            city: ''
        };
        // บันทึกข้อมูลใหม่ลงใน sessionStorage
        storeUserDataInSessionStorage(existingUserData);
    }

    // เติมข้อมูลในฟอร์มด้วยข้อมูลที่มีอยู่
    document.getElementById('full-name').value = existingUserData.fullName || '';
    document.getElementById('email').value = existingUserData.email || '';
    document.getElementById('coun-try').value = existingUserData.country || '';
    document.getElementById('sta-te').value = existingUserData.state || '';
    document.getElementById('postal-code').value = existingUserData.postalCode || '';
    document.getElementById('phone-number').value = existingUserData.phoneNumber || '';
    document.getElementById('ci-ty').value = existingUserData.city || '';
});

