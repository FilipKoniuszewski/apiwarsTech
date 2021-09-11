window.addEventListener("load", e=> {
    const usernameInput = document.getElementById("email-register")
    const passwordInput = document.getElementById("password-register")
    const modalText = document.getElementsByClassName("modal-body text-center")[0];
    const loginWindow = document.getElementById("login-window")
    const modal = document.querySelector(".modal");
    const wrongData = document.querySelector(".wrong-data");

    loginWindow.addEventListener("submit", e => {
        if (usernameInput.value && passwordInput.value) {
            return;
        } else {
            console.log("TY KURWO JEBANA")
            modalText.innerHTML = "Please, fill in both fields.";
        }
        $(modal).modal()
        e.preventDefault();

    })
    if (wrongData) {
        if (wrongData.innerHTML === "usernameTaken") {
            modalText.innerHTML = "Username already exists, please choose another one!";
            $(modal).modal()
        } else if (wrongData.innerHTML === "incorrectLoginData") {
            modalText.innerHTML = "Wrong username or password.";
            $(modal).modal()
        } else if (wrongData.innerHTML === "registerSuccessful"){
            modalText.innerHTML = "Successful registration. Log in to continue.";
            $(modal).modal()
        }
    }
})
