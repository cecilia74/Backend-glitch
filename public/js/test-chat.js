const socket = io();

const chatBox = document.getElementById("input-msg");
let userEmail = "";

async function main() {
    const { value: email } = await Swal.fire({
        title: "Enter your email",
        input: "text",
        inputLabel: "Your email",
        inputValue: "",
        showCancelButton: false,
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
                return "You need to write something!";
            }
        },
    });
    userEmail = email;
}
    main();

chatBox.addEventListener("keyup", ({ key }) => {

    if (key == "Enter") {
        socket.emit("msg_front_to_back", {
            message: chatBox.value,
            user: userEmail,
        });
        chatBox.value = "";
    }
});

socket.on("listado_de_msgs", (msgs) => {
    // console.log(msgs)
    const divMsg = document.getElementById("div-msgs");
    let format = "";

        msgs.forEach((msg) => {
            format = format + "<p>email " + msg.user + ": " + msg.message + "</p>"

        })
        divMsg.innerHTML = format;

    })

