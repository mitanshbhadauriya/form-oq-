// =====================================================
// FIREBASE
// =====================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBymyZMfHqY1zBCSw62Qx9X4z59rAEXUAw",
    authDomain: "do-it-gym.firebaseapp.com",
    projectId: "do-it-gym",
    storageBucket: "do-it-gym.firebasestorage.app",
    messagingSenderId: "261383526259",
    appId: "1:261383526259:web:70a0c9f837167c03e9d706"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// =====================================================
// SELECT MEMBERSHIP PLAN
// =====================================================

function selectPlan(planName) {

    const planSelect = document.getElementById("plan");

    const plans = {
        "Starter": "Starter - ₹999/month",
        "Beast Mode": "Beast Mode - ₹1,499/month",
        "Elite": "Elite - ₹2,499/month"
    };

    if (plans[planName]) {
        planSelect.value = plans[planName];
    }

    document.getElementById("join").scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        document.getElementById("name").focus();
    }, 700);
}

window.selectPlan = selectPlan;


// =====================================================
// FORM
// =====================================================

const gymForm = document.getElementById("gymForm");

gymForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    // -----------------------------
    // GET VALUES
    // -----------------------------

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const age =
        Number(document.getElementById("age").value);

    const gender =
        document.getElementById("gender").value;

    const goal =
        document.getElementById("goal").value;

    const plan =
        document.getElementById("plan").value;


    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (name.length < 2) {

        alert("Please enter your full name.");

        return;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10 digit mobile number."
        );

        return;
    }


    if (age < 10 || age > 100) {

        alert("Please enter a valid age between 10 and 100.");

        return;
    }


    if (!gender || !goal || !plan) {

        alert(
            "Please complete all required fields."
        );

        return;
    }


    // -----------------------------
    // BUTTON LOADING
    // -----------------------------

    const submitButton =
        gymForm.querySelector(".submit-btn");

    submitButton.disabled = true;

    submitButton.innerText =
        "SUBMITTING...";


    try {

        // -----------------------------
        // SAVE TO FIRESTORE
        // -----------------------------

        await addDoc(
            collection(db, "members"),
            {

                name: name,

                email: email,

                phone: phone,

                age: age,

                gender: gender,

                goal: goal,

                plan: plan,

                location: "Indore, Madhya Pradesh",

                createdAt: serverTimestamp()

            }
        );


        // -----------------------------
        // SUCCESS POPUP
        // -----------------------------

        document.getElementById("popupMessage").innerHTML =
            "Welcome to DO IT, <strong>" +
            escapeHTML(name) +
            "</strong>.<br><br>" +
            "Your registration has been received.";


        document
            .getElementById("popup")
            .classList
            .add("show");


        // -----------------------------
        // RESET FORM
        // -----------------------------

        gymForm.reset();


    } catch (error) {

        console.error(
            "Firebase registration error:",
            error
        );


        alert(
            "We couldn't complete your registration right now.\n\n" +
            "Please check your internet connection and try again."
        );


    } finally {

        submitButton.disabled = false;

        submitButton.innerText =
            "JOIN DO IT →";
    }

});


// =====================================================
// HTML ESCAPE
// =====================================================

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =====================================================
// CLOSE POPUP
// =====================================================

function closePopup() {

    document
        .getElementById("popup")
        .classList
        .remove("show");
}

window.closePopup = closePopup;


// =====================================================
// CLOSE POPUP WHEN CLICKING OUTSIDE
// =====================================================

document
    .getElementById("popup")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closePopup();

        }

    });


// =====================================================
// BMI CALCULATOR
// =====================================================

function calculateBMI() {

    const height =
        parseFloat(
            document.getElementById("height").value
        );

    const weight =
        parseFloat(
            document.getElementById("weight").value
        );

    const result =
        document.getElementById("bmiResult");


    if (
        !height ||
        !weight ||
        height < 50 ||
        height > 250 ||
        weight < 10 ||
        weight > 300
    ) {

        result.innerHTML =
            "Enter a valid height and weight.";

        return;
    }


    const heightMeter =
        height / 100;


    const bmi =
        weight /
        (heightMeter * heightMeter);


    let category;


    if (bmi < 18.5) {

        category = "UNDERWEIGHT";

    } else if (bmi < 25) {

        category = "HEALTHY RANGE";

    } else if (bmi < 30) {

        category = "OVERWEIGHT";

    } else {

        category = "OBESE RANGE";

    }


    result.innerHTML =
        "YOUR BMI: " +
        bmi.toFixed(1) +
        "<br>" +
        category;
}


window.calculateBMI = calculateBMI;


// =====================================================
// PHONE INPUT
// =====================================================

document
    .getElementById("phone")
    .addEventListener("input", function() {

        this.value =
            this.value.replace(/\D/g, "");

    });


// =====================================================
// HEADER SCROLL EFFECT
// =====================================================

window.addEventListener("scroll", function() {

    const header =
        document.getElementById("header");

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.25)";

    } else {

        header.style.boxShadow =
            "none";

    }

});
