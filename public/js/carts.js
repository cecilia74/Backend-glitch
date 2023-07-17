
function postToCart(_id) {
    const PORT = 8080;
    let cartId = localStorage.getItem("3").toString();
    let cId = cartId ? cartId._id : null;
    const API_URL1 = `http://localhost:${PORT}/api`;
    const url = `${API_URL1}/carts/${cId}/product/${_id}`;
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
        res.alert("added");
    })
    .catch((error) => {
        alert(JSON.stringify(error));
    });


if (!cartId) {
    alert("no id");
    const url = API_URL1 + "/carts";
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
        alert(JSON.stringify(localStorage.setItem("3", data)));
        alert(JSON.stringify(data));
    })
    .catch((error) => {
alert(JSON.stringify(error));
    });
}

}