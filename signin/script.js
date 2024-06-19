function singIn(event) {
    // event.preventDefault();
    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");

    const cred = {
        login: loginInput.value,
        password: passwordInput.value,
    };

    if (cred.login != "" && cred.password != "") {
        const date = new Date();
        date.setDate(date.getDate() + 4);
        // cookie
        // document.cookie = `user=${JSON.stringify(cred)}; path=/; expires=${date.toString()}`;

        // local storage
        localStorage.setItem("user", JSON.stringify(cred));
        loginInput.value = "";
        passwordInput.value = "";
    }
}
