
let cartId = localStorage.getItem("e-id");
const PORT = 8080;

const API_URL = `http://localhost:${PORT}/api`;
function postToCart(_id) {

    const url = API_URL + "/carts/" + cartId + "/product/" + _id;
    const data = {};
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
    .then((response) => response.json())
    .then((res) => {
        console.log(res);
        alert("added");
    })
    .catch((error) => {
        console.error(error);
        alert(JSON.stringify(error));
    });
}

if (!cartId) {
    alert("no id");
    const url = API_URL + "/carts";
    const data = {};
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
        console.log("Response:", data);
        alert(JSON.stringify(localStorage.setItem("carritoid", data._id)));
        alert(JSON.stringify(data));
        alert(JSON.parse(localStorage.getItem("carritoid")))
    })
    .catch((error) => {
        console.error("Error:", error);
        alert(JSON.stringify(error));
    });
}


