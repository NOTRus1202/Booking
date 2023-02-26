  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
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
  const db = getFirestore(app);

  document.getElementById("btnSearch").addEventListener("click", async function(){

    let contentdiv = document.getElementById("contents");
    let inputBookingId = document.getElementById("searchBookingId").value;
    let firstName = document.getElementById("searchFname");
    let lastName = document.getElementById("searchLname");
    let telephone = document.getElementById("searchTelephone");
    let email = document.getElementById("searchEmail");
    let service = document.getElementById("searchService");
    let passenger = document.getElementById("seachNumberofPassengers");
    let companyName = document.getElementById("searchCompanyName");
    let companyAdd = document.getElementById("searchCompanyAddress");
    let pickUpAddress = document.getElementById("searchPickup");
    let dropOffAddress = document.getElementById("searchDropoff");

    var docRef = doc(db, "Bookings", inputBookingId);
    console.log("Document data:", inputBookingId);
    var docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      contentdiv.style = "visibility: visible"
      firstName.innerHTML = docSnap.data().firstName;
      lastName.innerHTML = docSnap.data().lastName;
      telephone.innerHTML = docSnap.data().telephone;
      email.innerHTML = docSnap.data().email;
      service.innerHTML = docSnap.data().service;
      passenger.innerHTML = docSnap.data().noOfPassenger;
      companyName.innerHTML = docSnap.data().companyName;
      companyAdd.innerHTML = docSnap.data().companyAddress;
      pickUpAddress.innerHTML = docSnap.data().pickUpAddress;
      dropOffAddress.innerHTML = docSnap.data().dropOffAddress;

      
    } else { 
      var myModal = new bootstrap.Modal(document.getElementById('errorModal'), {
        keyboard: false
      });
      
      myModal.show();
      } 
  });

 

// var docRef = doc(db, "cities", "SF");
// var docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document! SF" );
// }

//  docRef = doc(db, "cities", "LA");
//  docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document! LA");
// }