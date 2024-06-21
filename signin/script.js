function signIn(event) {
    event.preventDefault();

    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");

    const loginValue = loginInput.value.trim();
    const passwordValue = passwordInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = '';
    
    let isError = false;

    if (loginValue === '') {
        errorMessage.innerHTML += 'Username/Email is required.<br>';
        isError = true;
    } else if (!emailRegex.test(loginValue)) {
        errorMessage.innerHTML += 'Invalid email format.<br>';
        isError = true;
    }

    if (passwordValue === '') {
        errorMessage.innerHTML += 'Password is required.<br>';
        isError = true;
    } else if (passwordValue.length < 8) {
        errorMessage.innerHTML += 'Password must be at least 8 characters.<br>';
        isError = true;
    } else if (!/[A-Z]/.test(passwordValue)) {
        errorMessage.innerHTML += 'Password must contain at least one uppercase letter.<br>';
        isError = true;
    } else if (!/[a-z]/.test(passwordValue)) {
        errorMessage.innerHTML += 'Password must contain at least one lowercase letter.<br>';
        isError = true;
    } else if (!/\d/.test(passwordValue)) {
        errorMessage.innerHTML += 'Password must contain at least one digit.<br>';
        isError = true;
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(passwordValue)) {
        errorMessage.innerHTML += 'Password must contain at least one special character.<br>';
        isError = true;
    }

    if (isError) {
        return false;
    }

    const credentials = {
        login: loginValue,
        password: passwordValue
    };

    localStorage.setItem("user", JSON.stringify(credentials));

    loginInput.value = '';
    passwordInput.value = '';

    window.location.href = "/index.html";

    return true; 
}
