function getCookie() {
    const cookie = document.cookie;
    const res = {};
    const rows = cookie.split("; ");

    for (let i = 0; i < rows.length; i++) {
        const data = rows[i].split("=");
        res[data[0]] = data[1];
    }

    return res;
}


window.onload = () => {

    const json = localStorage.getItem("user");
    const user = JSON.parse(json);

    const userButtons = document.getElementById("userButtons");

    if (user != null) {
        const buttonProfile = document.createElement("button");
        buttonProfile.onclick = () => {
            window.location.href = "/profile";
        };
        buttonProfile.innerText = "Profile";
        buttonProfile.setAttribute("type", "button");
        buttonProfile.setAttribute("class", "btn btn-warning me-2");

        const buttonLogout = document.createElement("button");
        buttonLogout.innerText = "Logout";
        buttonLogout.setAttribute("type", "button");
        buttonLogout.setAttribute("class", "btn btn-outline-light");
        buttonLogout.onclick = () => {
            localStorage.removeItem("user");
            window.location.href = "/signin";
        };

        userButtons.appendChild(buttonProfile);
        userButtons.appendChild(buttonLogout);
    } else {
        const buttonLogin = document.createElement("button");
        buttonLogin.innerText = "Login";
        buttonLogin.setAttribute("type", "button");
        buttonLogin.setAttribute("class", "btn btn-outline-light me-2");
        buttonLogin.onclick = () => {
            console.log("test");
            window.location.href = "/signin";
        };

        const buttonRegister = document.createElement("button");
        buttonRegister.innerText = "Sign up";
        buttonRegister.setAttribute("type", "button");
        buttonRegister.setAttribute("class", "btn btn-warning");

        userButtons.appendChild(buttonLogin);
        userButtons.appendChild(buttonRegister);
    }
};

