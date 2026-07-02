document.addEventListener("DOMContentLoaded", function (){
    let suppliedPassword = document.getElementById("upassword")
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

document.getElementById("wrktr-login-form").addEventListener("submit", userLogin);

async function userLogin(e) {
    e.preventDefault(); // stop page reload

    let iUsername = document.getElementById("uemail").value.trim().toLowerCase();
    let iPassword = document.getElementById("upassword").value  ;
    let msg = document.getElementById("login-msg");

    // Basic validation
    if (!iUsername || !iPassword) {
        msg.textContent = "Please fill in all required fields";
        return;
    }

    // 🔹 Simple hash function (for learning only)
    function simpleHash(password) {
        return btoa(password); // encode to base64 (NOT secure, just demo)
    }


    try {

        const response = await fetch(
            "http://localhost:4000/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: iUsername,
                    password: simpleHash(iPassword)
                })
            }
        );

        console.log(response);

        const data = await response.json();

        if (!data.success) {
            msg.textContent = "Invalid email or password";
            return;
        }

        const loggedUser = data.user;

        if (!loggedUser) {
            console.log("No user returned:", data);
            return;
        }

        localStorage.setItem("loggedCWDUser", JSON.stringify(loggedUser));

        window.location.href = "wrktr-user-full.html";

            
        
    } catch (err) {  

        console.log("FETCH ERROR:");

        console.log(err);
    }

}

// document.getElementById("teecha-login-form").reset();
