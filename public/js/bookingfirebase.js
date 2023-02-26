  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
  import { getFirestore , doc , setDoc, getDoc, query, limit, getDocs, collection, orderBy} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD_unt_TL3RS2q1Q1-MkWLbDDvTp3643JU",
    authDomain: "booking-994e5.firebaseapp.com",
    projectId: "booking-994e5",
    storageBucket: "booking-994e5.appspot.com",
    messagingSenderId: "556936366796",
    appId: "1:556936366796:web:d69898571db6e2bdd71069",
    measurementId: "G-94ZPNGQM2E"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  
  document.getElementById("submitButton").addEventListener("click", async function(){

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let telephone = document.getElementById("telephone").value;
    let email = document.getElementById("email").value;
    let service = document.getElementById("service").value;
    let passenger = document.getElementById("passenger").value;
    let companyName = document.getElementById("companyName").value;
    let companyAdd = document.getElementById("companyAdd").value;
    let pickUpAddress = document.getElementById("pickUpAddress").value;
    let dropOffAddress = document.getElementById("dropOffAddress").value;

    if(firstName == "" || lastName=="" || telephone=="" || email=="" || service=="" || passenger=="" || companyName=="" || pickUpAddress=="" || dropOffAddress==""){

      var myModal = new bootstrap.Modal(document.getElementById('error'), {
        keyboard: false
      });
      
      myModal.show();
      

    }else{
       const myCollectionRef = collection(db, "Bookings");
    const q = query(myCollectionRef, orderBy('bookingId', 'desc'), limit(1));
    let lastNum = "" ;

    getDocs(q)
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No documents found');
        return;
      }
  
      // Get the last document ID from the snapshot
      lastNum = snapshot.docs[0].id;
      let num = parseInt(lastNum.slice(1)) + 1;
  
      // Generate the new incremental number
      let numString = num.toString().padStart(8, '0');
      let result = 'B' + numString;
      
      setDoc(doc(db, "Bookings", result), {
        bookingId: result,
        firstName: firstName,
        lastName: lastName,
        telephone: telephone,
        email: email,
        service: service,
        noOfPassenger: passenger,
        companyName: companyName,
        companyAddress: companyAdd,
        pickUpAddress: pickUpAddress,
        dropOffAddress: dropOffAddress,
    }).then(()=>{
      var successModal = new bootstrap.Modal(document.getElementById('successModal'), {
        keyboard: false
      });
      document.getElementById('bookingId').textContent = result;
      successModal.show();
    }).catch((error)=>{
      var failModal = new bootstrap.Modal(document.getElementById('failModal'), {
        keyboard: false
      });
      failModal.show();
    });
    })
    
    .catch(err => {
      console.log('Error getting documents', err);
    });
  

  }});