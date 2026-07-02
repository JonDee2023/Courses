const courseDesc = [
    {img: "foots.png",
     desc: "FAITHFUL SERVICE",
     price: "#30,000"
    },

    {img: "heading.png",
    desc: "FAITHFUL SERVICE",
    price: "#30,500"
    },

    {img: "page1.png",
     desc: "KINGDOM AGENDA",
     price: "#5,000"
    }

    ]


let idx = 0;

function updateCourse(){
        
    document.getElementById("course-img").src = prodDesc[idx].img;
    document.getElementById("course-desc").textContent = prodDesc[idx].desc;
    document.getElementById("course-price").textContent = prodDesc[idx].price;


}

    // next button
document.getElementById("nextBtn").addEventListener("click", ()=>{
    idx = (idx+1) % courseDesc.length;
    updateCourse();
});

    // Previous button
document.getElementById("prevBtn").addEventListener("click", () => {
    idx = (idx - 1 + courseDesc.length) % courseDesc.length;
    updateCourse();
});

//console.log(document.getElementById("nextBtn"));
//console.log(document.getElementById("prevBtn"));

document.addEventListener(
    "DOMContentLoaded",
    loadAvailableCourses
);

async function loadAvailableCourses() {

    try {

        const userId =
            localStorage.getItem("user_id");

        if (!userId) {

            alert(
                "Please login first."
            );

            return;
        }

        const response =
            await fetch(
                `http://localhost:3000/api/my-complaints/${userId}`
            );

        const data =
            await response.json();

        if (!data.success) {

            alert(data.message);

            return;
        }


const response = await fetch("http://localhost:4000/api/get-courses", {

    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        email: verifyEmail
    })
    })

    
    const data = await response.json();

    if (response.ok) {

            alert(data.message);


let cart = JSON.parse(localStorage.getItem("c-cart")) || [];

const buttons = document.getElementsByClassName("cart-btn");

Array.from(buttons).forEach(button => {
    button.addEventListener("click", function () {

        const name = this.dataset.name;
        const price = Number(this.dataset.price);
        const image = this.dataset.image;

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        // Save cart
        localStorage.setItem("c-cart", JSON.stringify(cart));

        
        updateCart();

        alert(`${name} successfully added to cart.`);
    });
});


