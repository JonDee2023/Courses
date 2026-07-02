document.addEventListener("DOMContentLoaded", function (){
    let suppliedPassword = document.getElementById("cr8-password")
    let toggleElt = document.getElementById("toggle-password")

    toggleElt.addEventListener("click", function (){
        if (suppliedPassword.type === "password") {
            suppliedPassword.type = "text";
            toggleElt.textContent = "Hide";

    } else{
        suppliedPassword.type = "password";
        toggleElt.textContent = "👁";
    }

    });
    
});

document.addEventListener("DOMContentLoaded", function (){
    let suppliedPassword = document.getElementById("con-password")
    let toggleElts = document.getElementById("toggles-password")

    toggleElts.addEventListener("click", function (){
        if (suppliedPassword.type === "password") {
            suppliedPassword.type = "text";
            toggleElts.textContent = "Hide";

    } else{
        suppliedPassword.type = "password";
        toggleElts.textContent = "👁";
    }

    });
    
});

let userHeading = document.getElementById("user-h1");


// Get logged-in tutor email from login storage (temporary but simple)
const loggedUserEmail = localStorage.getItem("loggedCACLHA-CWD-User");



// Load Church Service units
document.addEventListener(
    "DOMContentLoaded",
    loadServiceUnits
);


async function loadServiceUnits() {

    try {

        const response = await fetch(
            "http://localhost:4000/api/service-units"
        );

        const units = await response.json();

        const unitSelect1 =
            document.getElementById("unit1");

        const unitSelect2 =
            document.getElementById("unit2");

        units.forEach(unit => {

            // create first option
            const option1 =
                document.createElement("option");

            option1.value = unit.unit_name;
            option1.textContent = unit.unit_name;

            unitSelect1.appendChild(option1);

            // create second option (NEW COPY)
            const option2 =
                document.createElement("option");

            option2.value = unit.unit_name;
            option2.textContent = unit.unit_name;

            unitSelect2.appendChild(option2);

        });

    } catch (err) {

        console.error(err);

    }
}


document.getElementById("wrktr-signup-form").addEventListener("submit", userSignup);
async function userSignup(event) {

    event.preventDefault();

    let userFirstName = document.getElementById("userfn").value.trim();
    let userLastName = document.getElementById("userln").value.trim();
    let userSex = document.getElementById("usersex").value.trim();
    let userPhoneNumber = document.getElementById("userphone").value.trim();
    let userEmail = document.getElementById("useremail").value.trim().toLowerCase();
    let userDoB = document.getElementById("userdob").value;
    let userDoS = document.getElementById("userdonb").value;
    let userDoI = document.getElementById("userdoind").value;
    let userPryUnit = document.getElementById("unit1").value;
    let userSecUnit = document.getElementById("unit2").value;
    let faithTestimony = document.getElementById("faith-testimony").value;

    //let userDP = document.getElementById("userdp").files[0];
    let userCr8Password = document.getElementById("cr8-password").value;
    let userConfPassword = document.getElementById("con-password").value;

    // 🔹 Basic validation
    if (!userFirstName || !userLastName || !userEmail || !userPhoneNumber || !userCr8Password || !userConfPassword) {
        alert("Please fill in all required fields.");
        return; // stop execution
    }

    if (userCr8Password !== userConfPassword){
            alert("Passwords do not match, enter same password in both fields.");
        return;
        }

    else {
        alert("Input data taken");
      
    }


    // 🔹 Simple hash function (for learning only)
    function simpleHash(password) {
        return btoa(password); // encode to base64 (NOT secure, just demo)
    }

    

    const response = await fetch("http://localhost:4000/api/signup", {

    method: "POST",

    headers: {"Content-type": "application/json"},

    body: JSON.stringify({
        firstname: userFirstName,
        lastname: userLastName,
        sex: userSex,
        email: userEmail,
        phone: userPhoneNumber,
        dob: userDoB,
        donb: userDoS,
        doind: userDoI,
        unit: userPryUnit+ ", "+ userSecUnit,
        password: simpleHash(userCr8Password),
        faithtestimony: faithTestimony

    })
})
    
    const data = await response.json();

    console.log(data);

    console.log("Signup script loaded");

    const emailError = document.getElementById("email-error");

    if (!response.ok) {

        emailError.textContent = data.message;
        return;
    }

    emailError.textContent = "";

    //const data = await response.json();

    document
        .getElementById(
            "submission-message"
        )
        .textContent =
        data.message;

    if(response.ok){


    document.getElementById("wrktr-signup-form").reset();

} 
}


    