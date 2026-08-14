// ===============================
// FIREBASE
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

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


// ===============================
// SELECT MEMBERSHIP PLAN
// ===============================

function selectPlan(planName) {

    const planSelect = document.getElementById("plan");

    if (planName === "Starter") {
        planSelect.value = "Starter - ₹999/month";
    }

    if (planName === "Beast Mode") {
        planSelect.value = "Beast Mode - ₹1,499/month";
    }

    if (planName === "Elite") {
        planSelect.value = "Elite - ₹2,499/month";
    }

    document.getElementById("join").scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// FORM SUBMISSION
// ===============================

document.getElementById("gymForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = Number(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const goal = document.getElementById("goal").value;
    const plan = document.getElementById("plan").value;

    // Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10 digit phone number.");
        return;
    }

    // Age validation
    if (age < 10 || age > 100) {
        alert("Please enter a valid age.");
        return;
    }

    // Disable button while saving
    const submitButton = this.querySelector(".submit-btn");
    submitButton.disabled = true;
    submitButton.innerText = "SAVING...";

    try {

        // Save member to Firestore
        await addDoc(collection(db, "members"), {

            name: name,
            email: email,
            phone: phone,
            age: age,
            gender: gender,
            goal: goal,
            plan: plan,

            createdAt: serverTimestamp()
        });

        // Show success popup
        document.querySelector(".popup-box h2").innerText =
            "YOU'RE IN, " + name.toUpperCase() + ".";

        document.getElementById("popup").classList.add("show");

        // Clear form
        this.reset();

    } catch (error) {

        console.error("Firebase error:", error);

        alert(
            "Something went wrong while submitting your registration.\n\n" +
            "Please try again."
        );

    } finally {

        submitButton.disabled = false;
        submitButton.innerText = "JOIN DO IT →";
    }
});


// ===============================
// CLOSE POPUP
// ===============================

function closePopup() {
    document.getElementById("popup").classList.remove("show");
}


// Make closePopup available to HTML onclick
window.closePopup = closePopup;


// ===============================
// MAKE selectPlan AVAILABLE
// ===============================

window.selectPlan = selectPlan;


// ===============================
// BMI CALCULATOR
// ===============================

function calculateBMI() {

    const height = parseFloat(
        document.getElementById("height").value
    );

    const weight = parseFloat(
        document.getElementById("weight").value
    );

    const result = document.getElementById("bmiResult");

    if (!height || !weight || height <= 0 || weight <= 0) {

        result.innerText =
            "Enter valid height and weight.";

        return;
    }

    const heightMeter = height / 100;

    const bmi =
        weight / (heightMeter * heightMeter);

    let category;

    if (bmi < 18.5) {
        category = "UNDERWEIGHT";
    }

    else if (bmi < 25) {
        category = "HEALTHY RANGE";
    }

    else if (bmi < 30) {
        category = "OVERWEIGHT";
    }

    else {
        category = "OBESE RANGE";
    }

    result.innerHTML =
        "YOUR BMI: " +
        bmi.toFixed(1) +
        "<br>" +
        category;
}


// Make BMI function available to HTML onclick
window.calculateBMI = calculateBMI;
