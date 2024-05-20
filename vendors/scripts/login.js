document.addEventListener('DOMContentLoaded', function() {
  // Firebase configuration
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
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth(app);
  const firestore = firebase.firestore(app);

  // สร้าง UUID สำหรับเซสชันปัจจุบัน
  const sessionUUID = uuidv4();
  sessionStorage.setItem('sessionUUID', sessionUUID);

  // Function เพื่อเก็บข้อมูลผู้ใช้ใน sessionStorage โดยใช้ UUID ของเซสชันปัจจุบัน
  function storeUserDataInSessionStorage(userData) {
    const sessionUUID = sessionStorage.getItem('sessionUUID');
    if (sessionUUID) {
      sessionStorage.setItem(sessionUUID, JSON.stringify(userData));
    } else {
      console.error('Session UUID not found.');
    }
  }

  // Function สำหรับการเข้าสู่ระบบด้วย Firebase Authentication
  function loginWithEmailAndPassword(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // Function สำหรับการดึงข้อมูลผู้ใช้จาก Firestore โดยใช้อีเมล
  function getUserDataByEmail(email) {
    return firestore.collection("users").where("email", "==", email).get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          return querySnapshot.docs[0].data();
        } else {
          return null; // ไม่พบผู้ใช้
        }
      })
      .catch(error => {
        console.error("Error getting user data:", error);
        throw error;
      });
  }

  // Function สำหรับเรียกใช้หลังจากเข้าสู่ระบบเรียบร้อย
  function handleSuccessfulLogin(email) {
    getUserDataByEmail(email)
      .then(userData => {
        if (userData) {
          storeUserDataInSessionStorage(userData);
          redirect();
        } else {
          console.error("User data not found");
          // จัดการกรณีที่ไม่พบข้อมูลผู้ใช้
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        // จัดการข้อผิดพลาดขณะดึงข้อมูลผู้ใช้
      });
  }

  // Function เพื่อเปลี่ยนเส้นทางไปยัง index.html
  function redirect() {
    window.location.href = 'index.html';
  }

  // Event listener สำหรับการส่งคำขอล็อกอิน
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // ป้องกันการส่งคำขอฟอร์ม

    // รับค่าอีเมลและรหัสผ่านจากผู้ใช้
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // เรียกใช้ฟังก์ชันเข้าสู่ระบบด้วย Firebase Authentication
    loginWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // เข้าสู่ระบบสำเร็จ
        const user = userCredential.user;
        console.log("User logged in:", user.uid);
        // ดึงข้อมูลผู้ใช้จาก Firestore และแสดงผล
        handleSuccessfulLogin(email);
      })
      .catch((error) => {
        // เกิดข้อผิดพลาดในการเข้าสู่ระบบ
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
      });
  });
});
