// SELECT MEMBERSHIP PLAN

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


// FORM SUBMISSION

document.getElementById("gymForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Please enter a valid 10 digit phone number.");
        return;
    }

    document.querySelector(".popup-box h2").innerText =
        "YOU'RE IN, " + name.toUpperCase() + ".";

    document.getElementById("popup").classList.add("show");

    this.reset();
});


// CLOSE POPUP

function closePopup() {
    document.getElementById("popup").classList.remove("show");
}


// BMI CALCULATOR

function calculateBMI() {

    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);

    const result = document.getElementById("bmiResult");

    if (!height || !weight || height <= 0 || weight <= 0) {
        result.innerText = "Enter valid height and weight.";
        return;
    }

    const heightMeter = height / 100;

    const bmi = weight / (heightMeter * heightMeter);

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
        "YOUR BMI: " + bmi.toFixed(1) +
        "<br>" +
        category;
}
